/* ── Meta Conversions API helper ───────────────────────────────
   Shared by /api/lead and /api/capi. Landing page only.

   Sends events server-side so they survive ad blockers, iOS tracking
   restrictions and browsers that drop third-party requests. Each event
   carries an event_id that the browser pixel also sends, so Meta
   deduplicates the pair into a single conversion.

   Files under /api starting with "_" are not routed by Vercel.
──────────────────────────────────────────────────────────────── */
const crypto = require('crypto');

const GRAPH_VERSION = 'v21.0';

const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');

/* Meta requires normalised-then-hashed identifiers. Normalisation rules
   differ per field; getting them wrong silently lowers match quality. */
function hashEmail(raw) {
  const v = String(raw || '').trim().toLowerCase();
  return v.includes('@') ? sha256(v) : null;
}

function hashPhone(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (!d) return null;
  if (d.length === 10) d = '1' + d;        // bare US number → add country code
  if (d.length < 10) return null;          // too short to be real
  return sha256(d);
}

function hashName(raw) {
  const v = String(raw || '').trim().toLowerCase().replace(/[^a-záéíóúñü]/g, '');
  return v ? sha256(v) : null;
}

/* _fbp / _fbc are first-party cookies on our own domain, so the server
   can read them straight off the request. They are the strongest match
   signal available without PII. */
function cookiesFrom(req) {
  const out = {};
  const raw = req.headers && req.headers.cookie;
  if (!raw) return out;
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || undefined;
}

/* The "phone" field on the landing form accepts a phone OR an email,
   so figure out which one we actually got. */
function buildUserData(req, { contact, name, fbp, fbc } = {}) {
  const cookies = cookiesFrom(req);
  const ud = {
    client_ip_address: clientIp(req),
    client_user_agent: req.headers['user-agent'],
  };

  const em = hashEmail(contact);
  if (em) ud.em = [em];
  else {
    const ph = hashPhone(contact);
    if (ph) ud.ph = [ph];
  }

  const fn = hashName(String(name || '').split(/\s+/)[0]);
  if (fn) ud.fn = [fn];

  const bp = fbp || cookies._fbp;
  const bc = fbc || cookies._fbc;
  if (bp) ud.fbp = bp;
  if (bc) ud.fbc = bc;

  return ud;
}

/* Never throws: a tracking failure must not break the lead flow. */
async function sendEvent({ eventName, eventId, sourceUrl, userData, customData }) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return { ok: false, reason: 'not_configured' };

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: sourceUrl,
      action_source: 'website',
      user_data: userData,
      custom_data: customData || {},
    }],
  };
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const r = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    if (!r.ok) {
      const body = await r.text().catch(() => '');
      console.error('[capi] rejected', r.status, body.slice(0, 500));
      return { ok: false, reason: 'rejected' };
    }
    return { ok: true };
  } catch (e) {
    console.error('[capi] unreachable', e && e.message);
    return { ok: false, reason: 'unreachable' };
  }
}

module.exports = { buildUserData, sendEvent };
