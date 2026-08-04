const { buildUserData, sendEvent } = require('./_meta');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const name = String(body.name || '').trim();
  const business = String(body.business || '').trim();
  const phone = String(body.phone || '').trim();
  const email = String(body.email || '').trim();
  const businessType = String(body.business_type || '').trim();
  // Unchecked boxes never reach us, so any truthy value means consent was given.
  const consent = Boolean(body.consent);
  const gotcha = String(body._gotcha || '').trim();

  // Honeypot: los humanos lo dejan vacío, los bots lo rellenan.
  // Fingimos éxito para no darles pistas.
  if (gotcha) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !business || !phone || !email || !businessType || !consent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const url = process.env.N8N_WEBHOOK_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!url || !secret) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': secret,
      },
      body: JSON.stringify({
        name,
        business,
        phone,
        email,
        business_type: businessType,
        consent: true,
        consent_text:
          'I agree to be contacted by ThumbsUp Digital by phone, text, or email about my free audit. ' +
          'Message and data rates may apply. Reply STOP to opt out.',
        consent_timestamp: new Date().toISOString(),
      }),
    });
    if (!r.ok) {
      return res.status(502).json({ error: 'Upstream error' });
    }

    // Meta Conversions API. Fires only once the lead is safely in n8n, so
    // the count matches reality. Awaited because Vercel freezes the
    // function the moment we respond. Never throws.
    const eventId = String(body.event_id || '').trim();
    if (eventId) {
      await sendEvent({
        eventName: 'Lead',
        eventId,
        sourceUrl: String(body.source_url || ''),
        userData: buildUserData(req, { email, phone, name }),
        customData: { content_name: 'Free Lead Leak Audit' },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ error: 'Upstream unreachable' });
  }
};
