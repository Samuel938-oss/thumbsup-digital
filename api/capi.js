/* ── Browser-originated Conversions API relay ──────────────────
   Used for events the server never sees on its own — currently the
   Calendly booking, which completes inside an iframe.

   The browser pixel sends the same event with the same event_id, so
   Meta merges the two into one conversion.
──────────────────────────────────────────────────────────────── */
const { buildUserData, sendEvent } = require('./_meta');

// Only events the landing actually fires. An open relay would let anyone
// pump junk conversions into the pixel and wreck ad optimisation.
const ALLOWED = new Set(['Schedule', 'Lead']);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const eventName = String(body.event_name || '');
  const eventId = String(body.event_id || '').trim();

  if (!ALLOWED.has(eventName) || !eventId) {
    return res.status(400).json({ error: 'Bad event' });
  }

  const userData = buildUserData(req, {
    contact: body.contact,
    name: body.name,
    fbp: body.fbp,
    fbc: body.fbc,
  });

  await sendEvent({
    eventName,
    eventId,
    sourceUrl: String(body.source_url || ''),
    userData,
    customData: { content_name: String(body.content_name || '') },
  });

  // Always 200: tracking is best-effort and must never surface as a
  // user-visible error.
  return res.status(200).json({ ok: true });
};
