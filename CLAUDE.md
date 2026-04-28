# ThumbsUp Digital — Website Project

## Project Overview

**Agency:** ThumbsUp Digital — boutique web dev & AI automation agency
**Location:** Cary, NC (serving the Raleigh-Durham-Chapel Hill Triangle, 60-mile radius)
**Founder:** Solo founder, IT & Cybersecurity college student
**Primary niche:** Med spas and aesthetic clinics
**Domain:** thumbsupdigital.tech (already purchased)
**Deploy target:** GitHub → Vercel (free, auto-deploy on push)

---

## Architecture & Tech Stack

**Languages:** HTML, CSS, Vanilla JavaScript — no frameworks, no build tools
**Hosting:** Vercel (free tier, auto SSL)
**Version control:** GitHub
**Forms:** Formspree → samuel@thumbsupdigital.tech
**Bookings:** Calendly (free tier)
**Payments:** Stripe (3 payment links, one per plan)
**Videos:** Loom (demo + delivery)
**Analytics:** Google Analytics script on all pages

---

## Site Structure — 5 Pages

| Page | File | Priority |
|------|------|----------|
| Home | `index.html` | 1 |
| Services | `services.html` | 2 |
| Pricing | `pricing.html` | 3 |
| Contact | `contact.html` | 4 |
| About | `about.html` | 5 |

**Build order:** Home → Services → Pricing → Contact → About

---

## Design System

**Visual identity (derived from logo):**
- Background: Dark navy/charcoal — `#0D1117` or `#0A0E1A`
- Primary accent: Blue-to-teal gradient — `#00B4D8` → `#06D6A0`
- Text: White `#FFFFFF` for headings, `#B0B8C8` for body
- Cards/surfaces: `#111827` or `#161D2F`
- Borders: subtle `#1E2A3A`
- CTA buttons: gradient fill (blue to teal) with white text
- No gold — the brand is tech-forward, precision, blue/teal

**Logo files:**
- Full logo: `assets/images/Logo_design_for_202604261215.jpeg` (horizontal: hexagon icon + "ThumbsUp Digital" wordmark)
- Favicon: use the small standalone hexagon icon visible at the bottom of the logo file
- Request SVG/PNG version from designer when possible for crisp rendering

**Photo file:**
- About page: `assets/images/Chico_trabajando_en_202604261226.jpeg`

**Typography:** To be confirmed via UI/UX skill. Direction: strong geometric sans-serif for headings, readable sans for body.
**Style direction:** Modern, tech-premium, dark mode. Feels like a SaaS product, not a local agency. Conversion-focused.
**Mobile-first:** All layouts start from mobile, scale up

**Brand voice:** Direct, results-obsessed, no corporate fluff. Speaks to small business owners who are losing money to missed calls and no-shows.

---

## Home Page — Section Map

1. **Nav (sticky)** — Logo left, links (Services · About · Pricing · Contact), gold CTA "Book a Free Call" → Calendly. Shrinks with dark solid bg on scroll.
2. **Hero** — Headline: *"Your Med Spa Is Losing Customers After 5PM. We Fix That."* | Sub: AI-powered websites and automation that books appointments, recovers missed calls, and generates Google reviews — 24/7. | CTA primary: "Book Your Free Strategy Call" | CTA secondary: "Watch the Demo" (Loom placeholder) | Visual: chatbot animation/mockup at 11pm.
3. **Problem Section — "The Silent Revenue Leak"** — 3 icon cards: missed call at 6pm / web visitor at 10pm / 47 clients, 0 reviews.
4. **Solution Section — "Three AI Agents. Zero Extra Staff."** — 3 bot cards with 4-step flow each.
5. **How It Works — 5-day delivery timeline.**
6. **Results Section** — Stats: 60 sec response / 10–30 reviews/mo / 24/7 booking / 5-day delivery. Testimonial placeholder.
7. **Pricing Preview** — 3 plan cards, blue/teal gradient accent on Growth (most popular). Stripe buttons disabled (links TBD).
8. **About Teaser** — 2–3 lines + photo (`Chico_trabajando_en_202604261226.jpeg`). Link to About page.
9. **Final CTA (full-width, gradient bg)** — *"Every missed call after 5PM is a customer worth $300–$2,000 walking to your competitor."* Dark button: "Let's Fix That — Book a Free 15-Min Call" → Calendly
10. **Footer** — Logo + tagline, nav links, email, service area, copyright 2026.

---

## Services Page — Section Map

1. Intro (2 lines)
2. Website section — 5-page site, features: Schema JSON-LD, Open Graph, sticky booking bar, exit-intent popup (first-visit discount), before/after gallery with lightbox
3. AI System — 3 bots with detailed visual flows
4. Delivery Process — 5-day timeline + onboarding call + ongoing management (2–3 hrs/mo)
5. Tech Stack logos — GHL, Vercel, GitHub, Stripe, Google, Formspree
6. CTA → Calendly

---

## Pricing Page — Section Map

**3 Plans:**

| Plan | Setup | Monthly | Contract |
|------|-------|---------|----------|
| Starter | $500 | $500/mo | 3 months |
| AI Growth ⭐ (most popular) | $1,000 | $800/mo | 6 months |
| Full System | $1,500 | $1,200/mo | 6 months |

**FAQ (7 questions):**
1. Do I need to sign a long-term contract?
2. What happens if I already have a website?
3. How do the AI bots connect to my existing phone number?
4. Can the chatbot handle my specific services and pricing?
5. What does ongoing management include?
6. How do I know if it's working?
7. What if I want to cancel?

**Comparison table:** ThumbsUp Digital vs. hiring a part-time receptionist
**CTA:** One button per plan → corresponding Stripe payment link

---

## Contact Page — Section Map

1. Inline Calendly widget — "15 Min Strategy Call"
2. Contact form (Formspree) — Fields: Name, Business Name, Email, Phone, Situation (dropdown: No website / Have website but no AI / Have both but want to upgrade)
3. Contact info + service area
4. Trust line: *"You'll hear back from me personally within 24 hours — not an assistant, not a bot. Me."*

---

## About Page — Section Map

1. Story: College student, IT & Cybersecurity, Cary NC
2. Why I built this: Triangle-area businesses deserve the same AI tech as big competitors
3. How I work: Solo, direct, no middlemen — you always talk to me
4. My promise: Measurable results every month
5. Photo placeholder
6. CTA → Calendly

---

## Technical Requirements

- **Mobile-first, 100% responsive**
- **Performance target:** < 2.5s load on mobile
- **Schema JSON-LD** for local SEO (Cary NC, med spa, Triangle)
- **Meta title + description** optimized per page
- **Open Graph tags** on every page
- **Sitemap** (`sitemap.xml`)
- **Favicon** with ThumbsUp Digital logo
- **SSL:** automatic via Vercel

### File structure
```
/
├── index.html
├── services.html
├── pricing.html
├── contact.html
├── about.html
├── sitemap.xml
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    └── icons/
```

---

## Integrations — Status Tracker

| Tool | Integration point | Status |
|------|-------------------|--------|
| Calendly | Nav CTA, Hero CTA, Final CTA, Contact widget | ✅ `https://calendly.com/samuel-thumbsupdigital/30min` |
| Stripe | Pricing page — 3 payment links | ⏳ Links pending — buttons rendered but disabled for now |
| Formspree | Contact form | ✅ `https://formspree.io/f/mjgjznzr` |
| Loom | Hero "Watch Demo" + Services | ⏳ Video not recorded — button hidden/placeholder |
| Google Analytics | Script all pages | ✅ `G-TW6WSBNVEM` |
| Google Search Console | Sitemap submission | ⏳ Post-launch |

---

## Formspree Setup (do this before launch)

1. Go to [formspree.io](https://formspree.io) and sign up with `samuel@thumbsupdigital.tech`
2. Click **"New Form"** — give it a name like "ThumbsUp Digital Contact"
3. Copy the endpoint URL — it looks like `https://formspree.io/f/XXXXXXXX`
4. Paste that URL as the `action` attribute in the contact form HTML
5. Free tier = 50 submissions/month, no credit card needed

The form HTML already has the right fields; just drop in the endpoint.

---

## Testimonials

- **Status:** Placeholder testimonials in place until real clients provide reviews
- Section exists on Home (Results) and Pricing pages
- 3 placeholder testimonials created for med spa personas in the Triangle area
- Replace with real names/businesses/quotes as clients come in (month 2–3)
- Before/after gallery section: **skipped entirely for launch** — add in month 2–3 when real client results exist

---

## Copy — Confirmed Headlines

- **Hero:** "Your Med Spa Is Losing Customers After 5PM. We Fix That."
- **Services H1:** "One System. Three AI Agents. Zero Missed Opportunities."
- **About H1:** "You Work Directly With Me. Always."
- **Pricing H1:** "Results You Can Measure Every Month — Or Your Money Back."

---

## UI/UX Design Skill

This project uses the **UI/UX Pro Max** skill for design intelligence.

**Skill:** [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
**Version:** 2.5.0
**Install (run once before building):**
```bash
npx uipro-cli init --ai claude
```

### How to use it in this project

Before building any page or component, run the design system command:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "med spa aesthetic clinic beauty wellness conversion landing" --design-system --persist -p "ThumbsUp Digital"
```

This generates `design-system/MASTER.md` — the source of truth for colors, typography, spacing, and style decisions across all 5 pages.

For page-specific overrides (e.g., Pricing page):
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "pricing SaaS conversion dark premium" --design-system --persist -p "ThumbsUp Digital" --page "pricing"
```

### Domain search reference

| Need | Command |
|------|---------|
| Style direction | `--domain style` |
| Color palette | `--domain color` |
| Font pairings | `--domain typography` |
| Landing page structure | `--domain landing` |
| UX best practices | `--domain ux` |
| Product type | `--domain product` |

### Stack
Always use `--stack html-tailwind` (closest to plain HTML/CSS for this project).

### Design priority rules (from skill)
1. Accessibility — contrast 4.5:1, keyboard nav, aria labels
2. Touch & interaction — min 44×44px targets, loading feedback
3. Performance — WebP/AVIF images, lazy load, CLS < 0.1
4. Style — match product type, consistent, SVG icons (no emoji)
5. Layout — mobile-first breakpoints, no horizontal scroll
6. Typography — base 16px, line-height 1.5, semantic color tokens
7. Animation — 150–300ms duration, respect prefers-reduced-motion

---

## Contact & Delivery Info

- **Agency email:** samuel@thumbsupdigital.tech
- **Service area:** Cary, Raleigh, Durham, Chapel Hill & surrounding Triangle area
- **Founder Calendly:** *(to be provided)*
- **Copyright:** © 2026 ThumbsUp Digital
