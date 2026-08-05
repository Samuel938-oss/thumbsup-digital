/* ============================================================
   ThumbsUp Digital — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll behavior ─────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const stickyBar = document.getElementById('sticky-bar');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', y > 20);
    }
    if (stickyBar) {
      stickyBar.classList.toggle('visible', y > window.innerHeight * 0.6);
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav toggle ───────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate hamburger to X
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* ── Active nav link ─────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Fade-up scroll animations ───────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => io.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── pageshow: handle bfcache restores and back navigation ─── */
  window.addEventListener('pageshow', function (e) {
    // On bfcache restore the page snaps back to wherever the user was.
    // Scroll to top so no section is skipped or sitting above the viewport.
    if (e.persisted) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // Force every still-hidden fade-up element visible regardless of cause.
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.classList.add('visible');
    });
  });

  /* ── Counter animation ───────────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const isDecimal = String(target).includes('.');
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = ease * target;
      el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-target]');
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

  /* ── Chat mockup animation ───────────────────────────────── */
  function runChatAnimation() {
    const msgs = document.querySelectorAll('.msg');
    const opts = document.querySelector('.chat-options');
    const typing = document.querySelector('.msg-typing');
    if (!msgs.length) return;

    const delays = [600, 1200, 1600, 2800, 3600];
    msgs.forEach((m, i) => {
      setTimeout(() => {
        if (typing && m === typing) return; // handled separately
        m.classList.add('show');
      }, delays[i] || i * 700);
    });

    // typing indicator shows, then hides, then bot reply shows
    if (typing) {
      setTimeout(() => typing.classList.add('show'), 1600);
      setTimeout(() => {
        typing.classList.remove('show');
        typing.style.display = 'none';
        const botReply = document.querySelector('.msg-bot-reply');
        if (botReply) botReply.classList.add('show');
      }, 2800);
    }

    if (opts) {
      setTimeout(() => opts.classList.add('show'), 3600);
    }
  }

  // Run once on load, then loop every 9 seconds
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(runChatAnimation, 400);
  });

  /* ── FAQ accordion ───────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });


  /* ── Smooth scroll for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Meta event de-duplication ────────────────────────────────
     Every conversion is sent twice: once by the browser pixel and once
     by the server (Conversions API). Sharing one event_id lets Meta
     merge them into a single conversion instead of double-counting.
     The server copy is what survives ad blockers and iOS.             */
  const newEventId = () =>
    (crypto.randomUUID ? crypto.randomUUID()
                       : 'e' + Date.now() + Math.random().toString(16).slice(2));

  const readCookie = (name) => {
    const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? m.pop() : undefined;
  };

  // Fire-and-forget: tracking must never delay or break the user's flow.
  function sendToCapi(payload) {
    try {
      fetch('/api/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({
          source_url: location.href,
          fbp: readCookie('_fbp'),
          fbc: readCookie('_fbc'),
        }, payload)),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }

  /* ── Meta Pixel: Calendly booking ─────────────────────────────
     Calendly posts messages to the parent window as the visitor moves
     through the widget. 'event_scheduled' is the only one that means a
     booking actually landed on the calendar — that's the conversion.
     Origin is checked so a rogue iframe can't fake conversions.        */
  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://calendly.com') return;
    const type = e.data && e.data.event;
    if (typeof type !== 'string' || !type.startsWith('calendly.')) return;
    if (type !== 'calendly.event_scheduled') return;

    const eventId = newEventId();
    if (window.fbq) {
      fbq('track', 'Schedule', { content_name: '15 Min Strategy Call' }, { eventID: eventId });
    }
    sendToCapi({
      event_name: 'Schedule',
      event_id: eventId,
      content_name: '15 Min Strategy Call',
    });
  });

  /* ── Meta Pixel: Contact on booking / direct-contact clicks ── */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link || !window.fbq) return;
    const href = link.getAttribute('href') || '';
    let method = null;
    if (/calendly\.com/i.test(href))       method = 'calendly';
    else if (/^(https?:)?\/\/wa\.me|whatsapp/i.test(href)) method = 'whatsapp';
    else if (href.startsWith('tel:'))      method = 'phone';
    else if (href.startsWith('mailto:'))   method = 'email';
    if (method) fbq('track', 'Contact', { contact_method: method });
  });

  /* ── Form submit feedback ────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Sending...</span>';
      btn.disabled = true;

      try {
        const fd = new FormData(contactForm);
        const payload = {};
        fd.forEach((v, k) => { payload[k] = v; });

        // Shared id + browser cookies so /api/lead can send the server-side
        // copy of this Lead and Meta can de-duplicate the pair.
        const eventId = newEventId();
        payload.event_id = eventId;
        payload.source_url = location.href;

        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          // Meta Pixel: sólo tras confirmar que el lead llegó al servidor.
          // El servidor manda su copia con este mismo eventId (ver api/lead.js).
          if (window.fbq) {
            fbq('track', 'Lead', { content_name: 'Free Lead Leak Audit' }, { eventID: eventId });
          }
          // The landing page listens for this to swap in the calendar (step 2).
          contactForm.dispatchEvent(new CustomEvent('lead:success', { bubbles: true }));
          btn.innerHTML = '&#10003; Message Sent!';
          btn.style.background = 'linear-gradient(135deg, #06D6A0, #00B4D8)';
          contactForm.reset();
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
          }, 4000);
        } else {
          throw new Error('Server error');
        }
      } catch {
        btn.innerHTML = 'Error — try again';
        btn.style.background = 'rgba(239,68,68,0.8)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }
    });
  }

})();
