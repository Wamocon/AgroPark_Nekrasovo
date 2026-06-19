# HTML Pitch-Deck QA Report
**Page reviewed:** `public/proposal.html` (also duplicated as `proposal.html`)  
**Date:** 18. Juni 2026  
**Method:** Visual inspection (desktop / tablet / mobile), axe-core accessibility audit, Playwright performance metrics, Vercel deployment check  
**Reviewer verdict:** ⚠️ **Visually strong, but NOT client-ready yet.** Several functional, content, accessibility and deployment issues must be fixed before pitching.

---

## 1. Executive Summary

| Area | Score | Comment |
|------|-------|---------|
| Visual Design | 8/10 | Premium palette, good hierarchy, convincing dashboard mock-up |
| Content Structure | 7/10 | Clear 6-section flow, strong value prop, data-driven |
| Content Quality | 5/10 | Multiple German umlaut errors, unsupported claims, missing source citations |
| Functionality | 5/10 | One tab component is broken, ROI calculator has locale bug |
| Accessibility | 4/10 | 5 axe violations, missing landmarks, empty alt text |
| SEO / Shareability | 3/10 | No meta description, no Open Graph, no favicon |
| Legal / Compliance | 3/10 | No privacy link, no imprint, "confidential" badge on public URL |
| Deployment | 2/10 | Vercel deployment is behind SSO — clients cannot open it |

**Bottom line:** The page *looks* professional at first glance, but a client will immediately notice the broken tabs, missing chart, German spelling errors and the fact that the live link does not open. Fix the **critical** items below first; the visual polish can stay.

---

## 2. Critical Issues (Fix Before Client Pitch)

### 2.1 Consultant-framework tabs are broken
- **What:** The four tabs under *"Von der Analyse zur messbaren Wertschöpfung"* call `showCF()`, but that function is **not defined**.
- **Impact:** Clicking tabs 2–4 does nothing. Looks unfinished in a live demo.
- **Fix:** Add the missing JS:
  ```js
  function showCF(n) {
    document.querySelectorAll('.cf-tab').forEach((t, i) => t.classList.toggle('active', i === n));
    document.querySelectorAll('.cf-panel').forEach((p, i) => p.classList.toggle('active', i === n));
  }
  ```

### 2.2 `de_02_umsatz.svg` fails to render
- **What:** The revenue-structure chart in Section 02 loads with dimensions `0×0` (verified in Playwright). The left column is blank.
- **Impact:** A key visual for the business-case section is missing.
- **Fix:** Regenerate / re-export the SVG with a valid `viewBox` and intrinsic width/height, or replace with a PNG.

### 2.3 German umlauts are missing throughout
- **Examples found:**
  - `Ubersicht` → should be `Übersicht`
  - `fur` → `für` (appears dozens of times)
  - `uber` → `über`
  - `gefuhrt` → `geführt`
  - `offentlich` contexts, etc.
- **Impact:** For a German-language strategy paper pitched to a German/Russian client, this looks careless and unprofessional.
- **Fix:** Do a global search/replace for the common substitutions, or ensure the file is saved as UTF-8 with real umlaut characters.

### 2.4 Live Vercel deployment is inaccessible
- **What:** `https://agro-park-nekrasovo-lcvxcs33h-walerimoretz-langs-projects.vercel.app/` returns **401 Unauthorized** and requires Vercel SSO.
- **Impact:** A client cannot open the link you just deployed.
- **Fix:** Either remove SSO protection from the Vercel project, or deploy `public/proposal.html` as a standalone static site (e.g. Vercel static deploy from the `public/` folder, or Netlify Drop).

### 2.5 Missing privacy / imprint links
- **What:** The page targets a German/EU audience but has no Datenschutz, Impressum or cookie notice.
- **Impact:** Legal exposure; German clients expect this on any business page.
- **Fix:** Add footer links to `legal-docs/datenschutzerklaerung.md`, `legal-docs/impressum.md` and a minimal cookie banner if tracking is added later.

---

## 3. Major Issues (Should Fix Before Pitch)

### 3.1 Heading structure is broken
- **What:** Section titles use styled `<div class="sec-title">` instead of real headings. The document jumps from `<h1>` directly to `<h4>` in the consultant framework.
- **Impact:** Bad for screen readers, SEO and document outline.
- **Fix:** Convert `.sec-title` to `<h2>` and the numbered sub-headings (`3.1`, etc.) to `<h3>`.

### 3.2 Missing meta data
- **What:** No `<meta name="description">`, no Open Graph tags, no Twitter cards, no favicon.
- **Impact:** Link previews in WhatsApp/Telegram/LinkedIn look empty; search engines have no snippet.
- **Fix:** Add at least:
  ```html
  <meta name="description" content="Digitale Transformationsstrategie für AgroPark Nekrasovo: KI-Chatbot, Online-Buchung, SEO/GEO/AEO und ROI-Plan.">
  <meta property="og:title" content="Strategiepapier: Digitale Transformation | AgroPark Nekrasovo">
  <meta property="og:description" content="...">
  <meta property="og:type" content="website">
  <link rel="icon" href="/favicon.ico">
  ```

### 3.3 Accessibility violations (axe-core)
- **5 violations found:**
  1. **color-contrast** (serious) — 8 nodes, likely orange tags / light text.
  2. **heading-order** (moderate) — h1 → h4 jump.
  3. **label** (critical) — ROI inputs have visible `<label>` but no `for` attribute linking to the input.
  4. **landmark-one-main** (moderate) — no `<main>` landmark.
  5. **region** (moderate) — sections not wrapped in landmarks.
- **Fix:** Add `for="roiVisitors"` etc., wrap content in `<main>`, add `<header>`/`<footer>`, add a skip-link, and ensure orange `.tg-o` text meets 4.5:1 contrast.

### 3.4 Empty alt text on all charts
- **What:** All `<img>` tags use `alt=""`.
- **Impact:** Screen-reader users get no context for the data visualisations.
- **Fix:** Write descriptive alt text summarising each chart, e.g. `alt="Diagramm: Globaler Agritech-Markt wächst von 22,4 Mrd. $ (2026) auf 50 Mrd. $ (2033)."`

### 3.5 ROI calculator uses locale-dependent formatting
- **What:** `toLocaleString()` produced `$1,08,000` (Indian grouping) in the test environment.
- **Impact:** Numbers look wrong on some devices/browsers.
- **Fix:** Force a consistent locale: `(n).toLocaleString('de-DE')` or use `'en-US'`.

### 3.6 Mobile navigation has no menu
- **What:** On screens ≤768 px the nav links are hidden (`display:none`) with no hamburger menu.
- **Impact:** Mobile users cannot jump to sections.
- **Fix:** Add a hamburger button that toggles the nav-links on mobile.

### 3.7 Counter animations show "0" on load / print
- **What:** Animated counters start at `0` and only update when scrolled into view. Full-page screenshots and print output show zeros.
- **Impact:** If the client prints or screenshots the deck, key numbers are missing.
- **Fix:** Set the final number as fallback text inside the element, or add `@media print` styles that disable animations and show final values.

---

## 4. Content & Professionalism Observations

### 4.1 Overly aggressive / unsupported claims
- **Examples:**
  - "+200 % Buchungs-Conversion"
  - "+300 % Traffic"
  - "90 % FAQ-Automatisierung"
  - "Break-even 4–8 Monate"
- **Risk:** Experienced clients will ask for the source. Without citations these damage credibility.
- **Fix:** Add footnotes or a "Methodik & Quellen" appendix referencing the studies/case studies behind each number, or soften to "projeziert" / "basierend auf Branchenbenchmarks".

### 4.2 "Vertrauliches Strategiepapier" on a public URL
- **What:** The hero badge says *"Vertrauliches Strategiepapier"* but the page is publicly deployed.
- **Fix:** Remove the word "vertraulich" if it is public, or gate the page with a password if it really is confidential.

### 4.3 "OpenClaw" is unclear
- **What:** The tech cards mention "KI-Chatbot (OpenClaw)".
- **Risk:** Clients may not know what OpenClaw is (it appears to be a made-up or internal name).
- **Fix:** Use generic language: "KI-Chatbot (RAG-basiert)" or explain OpenClaw in a tooltip.

### 4.4 Duplicate chart in marketing section
- **What:** `de_04_sichtbarkeit.svg` is embedded twice (Abb. 5 and Abb. 6) with different captions.
- **Fix:** Either create a second distinct chart for Abb. 6 or remove the duplicate.

### 4.5 CTA is weak
- **What:** The final CTA button only triggers `window.print()`.
- **Fix:** Add a real conversion action: mailto link, Calendly booking, or a short contact form. Keep the print option as a secondary link.

---

## 5. Positive Findings

- **Fast load time:** FCP ≈ 249 ms, full load ≈ 351 ms on local server.
- **Clean, cohesive visual design:** Good color system (`#1B4332` + `#D4A373`), professional typography, consistent card language.
- **Responsive layout:** Breakpoints at 1100 px and 768 px work; mobile view is readable.
- **Interactive demo:** The live-dashboard mock-up and workflow stepper add credibility.
- **No console errors** from the loaded scripts.

---

## 6. Recommended Action Plan

### Before any client sees it (P0)
1. Fix `showCF()` so consultant tabs work.
2. Fix or replace `de_02_umsatz.svg`.
3. Fix all German umlauts (`Ü`, `ü`, `ö`, `ä`, `ß`).
4. Make the deployment publicly accessible (remove SSO or deploy standalone).
5. Add privacy + imprint links.

### Before a final pitch (P1)
6. Convert section titles to proper `<h2>` / `<h3>` headings.
7. Add meta description, Open Graph tags and favicon.
8. Fix axe accessibility violations (labels, contrast, landmarks).
9. Add descriptive `alt` text to charts.
10. Fix ROI number formatting to a fixed locale.
11. Add mobile hamburger menu.
12. Soften unsupported claims or add source citations.

### Polish (P2)
13. Remove "vertraulich" badge or gate the page.
14. Replace duplicate marketing chart.
15. Strengthen final CTA with a real contact action.
16. Add print styles so counters and charts render correctly on paper/PDF.

---

## 7. Final Verdict

**Is it ready to pitch?** **No — not yet.**

The design is polished and the narrative is strong, but the broken tabs, missing revenue chart, German spelling errors, inaccessible live URL and missing legal links are all things a client will notice in the first 60 seconds. After the P0 fixes above, it becomes a credible, professional pitch deck. After P1 fixes, it is best-in-class for a 2026 digital strategy proposal.
