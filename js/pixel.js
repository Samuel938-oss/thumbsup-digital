/* ── Meta Pixel — ThumbsUp Digital ─────────────────────────────
   Base code + PageView. Conversion events (Lead, Contact) live in
   main.js, where the form and CTA handlers are.
   Pixel ID lives here only — one place to change it.
──────────────────────────────────────────────────────────────── */
(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  t = b.createElement(e); t.async = true;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

window.TUD_PIXEL_ID = '1054206933794626';
fbq('init', window.TUD_PIXEL_ID);
fbq('track', 'PageView');
