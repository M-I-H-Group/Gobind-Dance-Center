<div align="center">

# 🎭 Gobind Dance Academy — Website Documentation

**A static, multi-page marketing site for a traditional dance school. Built with vanilla HTML, CSS, and JavaScript — no build step, no framework.**

> *"Preserving heritage through movement. Over three decades of cinematic choreography, cultural education, and artistic excellence."*

---

### 📑 Quick Navigation

| Section | Jump |
|---|---|
| [🏛 Project Overview](#-project-overview) | Start here |
| [📂 Directory Map](#-directory-map) | Folder structure |
| [🎨 Design System](#-design-system) | Colors, fonts, spacing |
| [🧩 Adding the Navbar](#-how-to-add-the-navbar) | Step-by-step |
| [🧩 Adding the Footer](#-how-to-add-the-footer) | Step-by-step |
| [📄 HTML Pages](#-html-pages) | All 7 pages |
| [🎨 Stylesheets](#-stylesheets) | All 8 CSS files |
| [⚙ JavaScript](#-javascript) | All 8 JS files |
| [🖼 Assets](#-assets) | Images & icons |
| [📐 Responsive System](#-responsive-system) | Breakpoints |
| [✉ Email Setup](#-emailjs-setup) | Forms configuration |
| [🛠 Maintenance Recipes](#-maintenance-recipes) | Common tasks |

</div>

---

## 🏛 Project Overview

This is a **hand-coded, framework-free** website for **Gobind Dance Center** (Elmhurst, NYC + Dharan, Nepal). It uses:

- **HTML** for structure
- **CSS** (split into global + component files) for styling
- **Vanilla JavaScript** (split by concern) for behavior
- **EmailJS** for contact-form delivery
- **External Google Fonts** (Playfair Display + Inter)
- **No build tools, no bundler, no npm** — open `index.html` in a browser and it works

### The 3-Color Design System

The entire UI is built on **three direct hex values** (no CSS variables for color):

| Token | Hex | Role |
|---|---|---|
| **Accent** | `#E48A24` | Buttons, links, active states, accents, borders, focus rings |
| **Text** | `#2A3A8C` | All body text, headings, navbar links, footer text on light bg |
| **White** | `#FFFFFF` | Page background, text on dark bg, button text |

> ⚠️ **Don't change these** — the whole codebase assumes them. If you must rebrand, search-replace all three hexes.

### Typography

| Token | Family | Used for |
|---|---|---|
| `--font-serif` | `Playfair Display` (Google Fonts) | Headings (`h1`–`h6`), card titles, hero titles |
| `--font-sans` | `Inter` (Google Fonts) | Body text, nav links, buttons, form labels |
| `--font-mono` | `Courier New` | Reserved (not used yet) |

Both fonts are loaded once via Google Fonts on every HTML page (see the `<head>` of any file).

---

## 📂 Directory Map

```
Gobind-Final/
│
├── 📄 index.html              ← Home page (hero, offer marquee, stats, CTA)
├── 📄 about.html              ← Founder story
├── 📄 course.html             ← Course grid
├── 📄 gallery.html            ← Visual archive (images + videos)
├── 📄 blog.html               ← Article list
├── 📄 Blog1.html              ← Single-article template
├── 📄 contact.html            ← Contact form + studio info
├── 📄 book-meeting.html       ← Schedule a session / enrollment
│
├── 📁 css/
│   ├── variables.css          ← :root tokens (radius, fonts, shadow, container-max)
│   ├── global.css             ← Reset, typography, container, utility classes
│   ├── animations.css         ← @keyframes + reveal/stagger/parallax/lightbox
│   ├── responsive.css         ← ≤360, 1280, 1440, 1920, 2560 breakpoints
│   ├── style.css              ← (legacy, currently empty/optional)
│   └── components/
│       ├── navbar.css         ← Navbar + mobile menu styles
│       ├── footer.css         ← Footer styles
│       ├── cards.css          ← Course/testimonial/blog/stat/feature/info cards
│       └── forms.css          ← Inputs, selects, textareas, buttons, modals, toasts
│
├── 📁 js/
│   ├── main.js                ← Loads EmailJS SDK, injects lightbox + spinner CSS
│   ├── forms.js               ← Contact form + enrollment form + modal opener
│   ├── emailjs-config.js      ← EmailJS keys + sendContactEmail / sendEnrollmentEmail
│   ├── utilities.js           ← debounce, throttle, scrollToTop, createElement, etc.
│   └── components/
│       ├── navbar.js          ← Navbar HTML + scroll/mobile-menu behavior
│       ├── footer.js          ← Footer HTML with social links + programs
│       ├── scroll.js          ← Reveal, parallax, count-up, text-reveal, scroll-to-top
│       └── modals.js          ← Image lightbox, video lightbox, generic modal
│
├── 📁 assets/
│   ├── image-removebg-preview.png  ← Logo (used in navbar + footer)
│   ├── gobind1.jpg                 ← Hero portrait
│   └── icons/
│       └── Febicone.png            ← Browser tab favicon
│
├── 📄 README.md               ← You are here
├── 📄 footerdesign.md         ← Design notes for footer (planning doc)
└── 📄 Gallerylayout.md        ← Design notes for gallery (planning doc)
```

---

## 🧩 How to Add the Navbar

The navbar is **injected by JavaScript** — you do not write any `<header>` HTML yourself. Just put a single empty `<div>` in your page and `navbar.js` will fill it.

### Step 1 — Add the container in your HTML

Place this **immediately after `<body>`**, before any other content:

```html
<body class="grain-overlay">
  <div id="navbar-container"></div>
  <main class="pt-[72px]">
    <!-- your page content -->
  </main>
</body>
```

The `pt-[72px]` utility is a Tailwind-style class **defined in `global.css`** that adds top-padding to clear the fixed navbar.

### Step 2 — Link the CSS

In your `<head>`, include:

```html
<link rel="stylesheet" href="css/components/navbar.css">
```

### Step 3 — Link the JS

At the bottom of the page (just before `</body>`):

```html
<script src="js/components/navbar.js"></script>
```

> The script **auto-runs on DOMContentLoaded** — no need to call `initNavbar()` manually.

### What you get automatically

| Section | What renders |
|---|---|
| Brand | Logo (`assets/image-removebg-preview.png`, 84×84 px) linking to `index.html` |
| Nav links | Home, About, Courses, Gallery, Blog, Contact — pulled from the `NAV_LINKS` array |
| Active state | Auto-detected from `window.location.pathname`; shows blue underline (`#2A3A8C`) |
| CTA button | "Schedule" with layered icon → links to `book-meeting.html` |
| Mobile toggle | Hamburger / close X icons below 1024 px |
| Mobile menu | Full-screen overlay with staggered link animation |
| Scroll behavior | `transparent` at top → `scrolled` (white blur + orange border) after 40 px |

### Where to edit the navbar

All navbar content lives in **one file**: [`js/components/navbar.js`](js/components/navbar.js)

- **Add / rename / remove a link** → edit the `NAV_LINKS` array (top of file)
- **Change CTA text or destination** → edit the `<a class="navbar-cta">` block in `createNavbarHTML()`
- **Change logo image** → edit `src=` in the `.navbar-brand` block
- **Change visual style** → edit [`css/components/navbar.css`](css/components/navbar.css)

### Adding a new nav link — example

```js
// in js/components/navbar.js
const NAV_LINKS = [
  { label: 'Home', key: 'home', href: 'index.html' },
  { label: 'About', key: 'about', href: 'about.html' },
  { label: 'New Page', key: 'newpage', href: 'newpage.html' }, // ← added
  // ...existing
];
```

Also add a page-key mapping in the `pageMap` object inside `createNavbarHTML()`:

```js
const pageMap = {
  'index.html': 'home',
  'newpage.html': 'newpage', // ← add this
  // ...
};
```

---

## 🧩 How to Add the Footer

Same pattern as the navbar — one empty `<div>` and `footer.js` does the rest.

### Step 1 — Add the container

Place this **just before `</body>`**, after your `</main>`:

```html
  </main>

  <div id="footer-container"></div>

  <script src="js/components/footer.js"></script>
</body>
```

### Step 2 — Link the CSS

```html
<link rel="stylesheet" href="css/components/footer.css">
```

### Step 3 — Link the JS

Already shown in step 1. The script auto-runs.

### What you get automatically

| Section | Content |
|---|---|
| Brand block | Logo + tagline + 4 social icons (Facebook, YouTube, WhatsApp, TikTok) |
| Navigation column | Same links as the navbar (pulled from `FOOTER_LINKS`) |
| Programs column | List of dance programs (pulled from `FOOTER_PROGRAMS`) |
| Studio column | Map link to Google Maps, phone link, "Book a Session" CTA |
| Bottom strip | © auto-updating year + "Elmhurst, New York City • Dharan, Nepal" |

### Where to edit the footer

All footer content lives in **one file**: [`js/components/footer.js`](js/components/footer.js)

- **Add / remove a nav link** → edit `FOOTER_LINKS` (top of file)
- **Add / remove a program** → edit `FOOTER_PROGRAMS` (top of file)
- **Change social URLs** → search for `href="https://` in `createFooterHTML()`
- **Change phone / address / map** → search for the SVG blocks in the `footer-contact` section
- **Change visual style** → edit [`css/components/footer.css`](css/components/footer.css)
- **Change copyright year** → the script auto-uses `new Date().getFullYear()` — no manual update needed

### Adding a new social platform — example

```html
<!-- in createFooterHTML() inside .footer-social -->
<a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38a3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.86 5.86 0 0 0 1.38 2.13 5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0z"/>
    <path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
    <circle cx="18.41" cy="5.59" r="1.44"/>
  </svg>
</a>
```

---

## 📄 HTML Pages

Every page follows the same template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="...">
  <title>...</title>
  <meta name="description" content="...">

  <link rel="icon" type="image/png" href="assets/icons/Febicone.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display...&family=Inter...&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/animations.css">
  <link rel="stylesheet" href="css/style.css">            ← optional legacy
  <link rel="stylesheet" href="css/components/navbar.css">
  <link rel="stylesheet" href="css/components/footer.css">
  <link rel="stylesheet" href="css/components/forms.css">  ← only if page has form
  <link rel="stylesheet" href="css/components/cards.css">  ← only if page has cards

  <style>/* page-specific styles */</style>
</head>
<body class="grain-overlay">
  <div id="navbar-container"></div>
  <main>...</main>
  <div id="footer-container"></div>
  <script src="js/components/footer.js"></script>
  <script src="js/components/scroll.js"></script>
  <script src="js/main.js"></script>
  <!-- page-specific scripts (forms.js, navbar.js, modals.js) -->
</body>
</html>
```

### 1. [index.html](index.html) — Home

**Sections, top to bottom:**

| Section | Class | What it does |
|---|---|---|
| Hero | `.hero` | Title, subtitle, 2 CTAs, founder portrait, "30+ Years of Mastery" badge |
| Featured band | `.featured-band` | 2×4 image grid (collapses to 2 columns) |
| Stats | `.stats` | 4 numbers (Students, Years, Productions, Awards) with border separators |
| Offer marquee | `.marquee` | Auto-scrolling horizontal card track (powered by `marquee` CSS animation) |
| Featured image collage | `.featured-collage` | 3-image mosaic (Bento-grid style) |
| CTA | `.cta` | "Ready to start dancing?" banner |

**Scripts loaded:** `footer.js`, `scroll.js`, `main.js` (plus inline `<script>` for marquee data)

### 2. [about.html](about.html) — About

**Sections:** Hero banner with founder image, biography, philosophy quote, milestone timeline, press logos.

### 3. [course.html](course.html) — Courses

**Sections:** Header (title + intro), program grid (uses `.course-card`).

### 4. [gallery.html](gallery.html) — Visual Archive

**Sections:** Header, filter chips (All, Performance, Behind-the-Scenes, Studio), masonry image grid, video grid.

**How images open:** Clicking an image calls `openImageLightbox(src)` (from `modals.js`); clicking a video calls `openVideoLightbox(youtubeUrl)`.

### 5. [blog.html](blog.html) — Blog

**Sections:** Header, article list (uses `.blog-card` and `.article-item`).

### 6. [Blog1.html](Blog1.html) — Single Article

**Sections:** Back button, badge, title, subtitle, hero image, body, "Explore More" cards (uses `.explore-card`).

> **To add a new article:** copy `Blog1.html`, replace the content in `<main>`, change the `<title>`, and link to it from `blog.html`.

### 7. [contact.html](contact.html) — Contact

**Sections:** Two-column layout — left = contact form (uses `.contact-form-container` with global `.form-*` classes), right = studio info + map + social.

**Form ID:** `#contact-form` (handled by `initContactForm()` in `forms.js`)

### 8. [book-meeting.html](book-meeting.html) — Book a Session

**Sections:** Header, three option cards (Free trial, Enrollment, 1-on-1), booking form.

---

## 🎨 Stylesheets

All CSS follows the same load order on every page:

```
variables.css → global.css → animations.css → style.css (legacy) → components/*
```

### [`css/variables.css`](css/variables.css) — Theme tokens

Defines **non-color** design tokens in `:root`:

```css
:root {
  --radius: 0.125rem;          /* default border-radius */
  --font-sans: 'Inter', ...;   /* body font */
  --font-serif: 'Playfair Display', ...; /* heading font */
  --font-mono: 'Courier New', monospace;
  --shadow-*: ...;             /* 7 shadow sizes (xs → 2xl) */
  --container-max: 1400px;     /* default page max width (overridden at 1920 → 1600, 2560 → 1800) */
}
```

> **There are no color variables.** Colors are hard-coded as `#E48A24`, `#2A3A8C`, `#FFFFFF` throughout.

### [`css/global.css`](css/global.css) — Foundation

**In order:**

| Lines | What |
|---|---|
| 1–15 | Box-sizing reset, `*` margin/padding zero |
| 16–28 | `html { scroll-behavior: smooth }` + `body` baseline |
| 30–55 | Typography rules (`h1`–`h4` use `clamp()` for fluid sizing) |
| 57–78 | Link, list, button reset |
| 80–110 | `.container` (the main max-width wrapper) + responsive padding |
| 113–125 | `.sr-only` (screen-reader only) |
| 127–155 | Border utility classes (`.border`, `.border-t`, `.divide-y`, etc.) |
| 157–175 | Custom orange scrollbar |
| 177–185 | Selection highlight |
| 187–198 | `.grain-overlay::after` (subtle SVG noise texture) |
| 200–220 | Transition utilities (`.transition-all`, `.transition-colors`, …) |
| 225–230 | `:focus-visible` outline |
| 233–290 | Grid utilities (`.grid`, `.grid-cols-1/2/3/4`, responsive `md:`, `lg:` variants) |
| 292–340 | Flexbox + gap utilities |
| 342–385 | Padding/margin utilities (Tailwind-style names) |
| 387–420 | Sizing + position + z-index + display utilities |
| 460–490 | Text utilities (alignment, size, color, weight) |
| 492–515 | Color utilities (`.text-foreground`, `.bg-primary`, etc.) |
| 517–522 | Backdrop blur |
| 525–535 | Overflow / cursor / opacity |
| 565–610 | Interactive states (`.hover:*`, `.disabled:*`) |
| 620–660 | Box-shadow, object-fit, gradients, grid spans, gap |

> **This is a partial Tailwind clone** — built by hand. It exists so pages can compose layouts without writing new CSS for every section.

### [`css/animations.css`](css/animations.css) — All keyframes

| Block | Keyframes + utility classes |
|---|---|
| Fade | `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight` |
| Scale / Slide | `scaleIn`, `slideInUp` |
| Reveal | `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` (paired with `scroll.js`) |
| Stagger | `.stagger-container` + `.stagger-item` |
| Parallax | `.parallax-container img` (uses JS in `scroll.js`) |
| Count-up | `.count-up` (paired with `data-target` / `data-suffix` in `scroll.js`) |
| Loops | `.animate-pulse`, `.animate-spin`, `.animate-bounce` |
| Modals | `.modal-in`, `.modal-out` |
| Lightbox | `.lightbox-in`, `.lightbox-image-in` |
| Toast | `.toast-in`, `.toast-out` |
| Nav indicator | `.nav-indicator` (the orange underline under active link) |
| Mobile menu | `.mobile-menu-in` / `.mobile-menu-out` |
| Accordion | `.accordion-content.open` |
| Spinner | `.spinner`, `.spinner-sm`, `.spinner-lg` |
| Hover effects | `.hover-lift`, `.hover-scale`, `.img-hover-zoom` |
| Validation | `.shake`, `.checkmark-animate` |
| Gallery | `.gallery-item-in`, `.gallery-item-out` |

### [`css/responsive.css`](css/responsive.css) — Global breakpoints

| Breakpoint | What changes |
|---|---|
| `max-width: 360px` | `html` font-size 13px, container padding 0.875rem, button font 10px |
| `min-width: 375–639px` | Single-column grids (utility) |
| `min-width: 1280px` | Container max-width 1240px |
| `min-width: 1440px` | Container max-width 1400px |
| `min-width: 1920px` (2K) | `--container-max: 1600px` (overrides `:root`) |
| `min-width: 2560px` (4K / 75" TV) | `--container-max: 1800px`, larger padding everywhere |
| `@media print` | Hides nav, footer, buttons, toasts |
| `prefers-reduced-motion` | Kills all animations |
| `prefers-contrast: high` | 2px borders on interactive elements |

> **Most page-specific responsive rules live inside the `<style>` block of each HTML file.** This file is the global default.

### [`css/components/navbar.css`](css/components/navbar.css)

| Block | Styles |
|---|---|
| `.navbar` | Fixed top, transparent → scrolled transition, blur on scroll |
| `.navbar-inner` | 88px / 96px / 108px / 120px height (mobile → 4K) |
| `.navbar-brand` | Logo 48 → 56 → 64 → 84 → 96 → 108 px (responsive) |
| `.navbar-nav` | Hidden below 1024px |
| `.nav-link` | Uppercase, letter-spaced, 13px → 17px (responsive) |
| `.nav-link.active` | Blue color + animated underline (`.nav-indicator`) |
| `.navbar-cta` | "Schedule" button — orange default, blue on active page |
| `.navbar-mobile-toggle` | 44×44px tap target, hamburger / X swap |
| `.mobile-menu` | Full-screen overlay, blurred background |
| `.mobile-menu-link` | 18px, uppercase, staggered fade-in (`.mobile-menu-link:nth-child(n)` delays) |
| `.mobile-menu-cta` | "Schedule" button in mobile menu |

### [`css/components/footer.css`](css/components/footer.css)

| Block | Styles |
|---|---|
| `.footer` | Dark blue (`#2A3A8C`) background, white text |
| `.footer-grid` | 1 → 2 → 4 column grid (mobile → tablet → desktop) |
| `.footer-brand-logo` + `.footer-logo-image` | Logo 46 → 52 → 60 → 72 → 84 → 96 px |
| `.footer-social-link` | 40×40 (mobile) → 48×48 → 56×56 (4K) circular buttons with orange hover |
| `.footer-title` | Orange small caps section header |
| `.footer-link` | White link with `→` arrow that fades in on hover |
| `.footer-program-link` | Same as link, no arrow |
| `.footer-contact-icon` | Orange small map/phone icons |
| `.footer-cta` | "Book a Session" orange button — **stays orange on hover** (border turns white, lifts up) |
| `.footer-bottom` | Top-border separator, copyright + location |
| `.footer-copyright` + `.footer-location` | 12px → 16px responsive |

### [`css/components/cards.css`](css/components/cards.css)

| Card class | Used for |
|---|---|
| `.card` / `.card-hover` | Generic card with optional hover lift |
| `.course-card` | Course program card (image + badge + title + desc + meta) |
| `.testimonial-card` | Quote with author block, quote-mark watermark |
| `.blog-card` | Side-by-side image + content (stacks on mobile) |
| `.article-item` | List row for blog index |
| `.stat-card` | Centered number + label |
| `.feature-card` | Icon + title + short description |
| `.info-card` | Title + multiline content with hover shift |

All card paddings, font sizes, and grid columns grow at **1920px and 2560px**.

### [`css/components/forms.css`](css/components/forms.css)

| Block | Styles |
|---|---|
| `.form-group` | Vertical spacing between fields |
| `.form-row` | 1 → 2 column grid (responsive) |
| `.form-label` | Uppercase 11px orange label |
| `.form-label-required::after` | Adds orange ` *` |
| `.form-input` | 14px white field with orange border, focus glow |
| `.form-select` | Same + custom orange chevron SVG |
| `.form-textarea` | Same as input, 120px min-height (160 → 200 on big screens) |
| `.form-error` | Orange 12px error text |
| `.form-success` | Light orange alert box |
| `.btn` + variants | Primary (blue→orange on hover), secondary, ghost, outline, outline-white |
| `.btn-sm` / `.btn-lg` | Size variants |
| `.btn-icon` / `.btn-icon-sm` | Circular icon-only buttons |
| `.modal-overlay` + `.modal` | Centered modal with backdrop |
| `.modal-header` / `.modal-body` / `.modal-footer` | Modal sections |
| `.toast-container` + `.toast` | Bottom-center notification with icon + 5s auto-dismiss |

---

## ⚙ JavaScript

All JS files are **plain ES5/ES6**, no modules, no bundler. They expose functions on `window` for cross-file calls.

### [`js/main.js`](js/main.js) — Entry point

**Does two things:**

1. **Loads EmailJS SDK** from CDN on `DOMContentLoaded`, then calls `initEmailJS()`.
2. **Injects inline `<style>` blocks** for the lightbox and scroll-to-top button (so they work even on pages that don't include `modals.js` or `scroll.js`).

**Exports:** `window.initMain`

### [`js/forms.js`](js/forms.js) — Form handlers

| Function | What it does |
|---|---|
| `initContactForm()` | Wires up `#contact-form`: phone-input digit filter, validation, submit → `sendContactEmail()` → toast |
| `initEnrollmentForm()` | Wires up `#enrollment-form` (created by `openEnrollmentModal`): phone must be 10 digits |
| `openEnrollmentModal(courseName)` | Builds modal HTML, injects it, re-inits the form |
| `initForms()` | Calls both `initContactForm` + `initEnrollmentForm` |

**Called automatically** on DOMContentLoaded.

**To add a new form:** copy `initContactForm`, change the selector, change the field names, change the `sendXyzEmail` call.

### [`js/emailjs-config.js`](js/emailjs-config.js) — Email + toasts

| Export | Purpose |
|---|---|
| `EMAILJS_CONFIG` | Object holding Public Key, Service ID, Template IDs, Calendly URL — **edit this once** |
| `initEmailJS()` | Initializes the SDK (called by `main.js` once SDK loads) |
| `sendContactEmail(params)` | Sends contact-form submission via EmailJS |
| `sendEnrollmentEmail(params)` | Sends enrollment submission |
| `showToast(message, type)` | Creates a `.toast` div, auto-removes after 5s. `type` = `'success'` \| `'error'` \| `'info'` |
| `isValidEmail(email)` | Regex check |
| `isValidPhone(phone)` | 10-digit regex check |

> ⚠️ **You must replace the placeholder keys** in `EMAILJS_CONFIG` with real EmailJS credentials or forms will silently fail. See [EmailJS Setup](#-emailjs-setup).

### [`js/utilities.js`](js/utilities.js) — Helper functions

| Function | Use case |
|---|---|
| `debounce(fn, wait)` | Delay-call a function (e.g. search input) |
| `throttle(fn, limit)` | Rate-limit (e.g. scroll handler) |
| `getCurrentPage()` | Returns `window.location.pathname.split('/').pop()` |
| `getCurrentYear()` | For auto-updating copyright |
| `setActiveNavLink(activePage)` | Adds `.active` class to matching nav/footer links |
| `smoothScrollTo(target, offset)` | Animated scroll to a CSS selector or element |
| `scrollToTop(smooth)` | Animated scroll to page top |
| `isInViewport(el, offset)` | Bounding-rect check |
| `getScrollProgress()` | Returns 0–1 page-scroll percentage |
| `formatDate(date, options)` | `Intl.DateTimeFormat` wrapper |
| `createElement(tag, attrs, children)` | DOM-builder helper |
| `escapeHtml(str)` | XSS-safe text node |
| `generateId()` | Random 9-char ID |
| `copyToClipboard(text)` | Clipboard write with `execCommand` fallback |
| `getQueryParam(param)` | URL search-param getter |
| `updateQueryParam(param, value)` | URL search-param setter |
| `isMobile()` | `window.innerWidth < 768` |
| `isTouchDevice()` | Touch-event / maxTouchPoints check |
| `preloadImages(urls)` | `<img>` warmup |
| `initLazyLoadImages()` | IntersectionObserver-based `<img data-src="…">` loader |
| `initUtilities()` | Auto-runs on DOMContentLoaded — fills `[data-year]` elements with current year |

### [`js/components/navbar.js`](js/components/navbar.js) — Navbar component

**Edit `NAV_LINKS` to add nav items.** Edit `createNavbarHTML()` to change the rendered HTML. See [How to Add the Navbar](#-how-to-add-the-navbar).

| Internal state | Purpose |
|---|---|
| `handleScroll` | Toggles `.transparent` / `.scrolled` class on `<header>` based on `window.scrollY > 40` |
| Mobile menu toggle | Swaps hamburger ↔ X icon, sets `document.body.style.overflow = 'hidden'` |
| Mobile menu close | Reset on `.mobile-menu-close` click or any `.mobile-menu-link` click |

### [`js/components/footer.js`](js/components/footer.js) — Footer component

**Edit `FOOTER_LINKS` and `FOOTER_PROGRAMS` to change columns.** Edit `createFooterHTML()` to change the rendered HTML. See [How to Add the Footer](#-how-to-add-the-footer).

**Auto-injects** the current year into the copyright line.

### [`js/components/scroll.js`](js/components/scroll.js) — Animation triggers

| Function | What it animates |
|---|---|
| `initScrollReveal()` | Watches `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.stagger-item`; adds `.visible` at 10% threshold, -60px rootMargin |
| `initParallax()` | Translates `.parallax-container img` by `center * speed` (default 0.15) on scroll |
| `initCountUp()` | Animates `.count-up[data-target=X data-suffix="+"]` from 0 → X over 2s (60 steps) |
| `initTextReveal()` | Splits `.text-reveal` text into `<span>`s with cascading 0.04s delays |
| `initScrollToTop()` | Auto-creates `#scroll-to-top` button; shows after 600px scroll; click → `window.scrollTo(0, 0)` |

**Usage in HTML:**

```html
<div class="reveal">Fades up on scroll</div>
<div class="reveal-left">Slides in from the left</div>
<div class="parallax-container" data-speed="0.2">
  <img src="bg.jpg" alt="...">
</div>
<span class="count-up" data-target="30" data-suffix="+">0</span>
<h2 class="text-reveal" data-text="Welcome to our studio">Welcome to our studio</h2>
```

### [`js/components/modals.js`](js/components/modals.js) — Modals & lightboxes

| Function | What it creates |
|---|---|
| `initImageLightbox()` | Creates `#image-lightbox` (full-screen black overlay + image) |
| `initVideoLightbox()` | Creates `#video-lightbox` (full-screen overlay + 16:9 iframe) |
| `initModal()` | Creates `#modal-overlay` (centered `.modal` with scale-in animation) |
| `openImageLightbox(src)` | Global — call from any onclick |
| `closeImageLightbox()` | Global |
| `openVideoLightbox(url)` | Global — defaults to YouTube embed URL |
| `closeVideoLightbox()` | Global |
| `openModal(html)` | Global — injects arbitrary HTML, locks body scroll |
| `closeModal()` | Global |

**All close on:** ✕ button, overlay click, Escape key.

**Usage:**

```html
<img src="thumb.jpg" onclick="openImageLightbox('full.jpg')" alt="...">
<button onclick="openVideoLightbox('https://www.youtube.com/embed/xyz')">Play</button>
<button onclick="openModal('<h3>Hi</h3><p>Modal content</p>')">Open</button>
```

---

## 🖼 Assets

| File | Size (approx.) | Used in | Purpose |
|---|---|---|---|
| `assets/image-removebg-preview.png` | ~10 KB | Navbar + footer | Logo with transparent background |
| `assets/gobind1.jpg` | varies | `index.html` hero only | Founder portrait |
| `assets/icons/Febicone.png` | ~5 KB | All HTML `<head>` | Browser tab favicon |

**To swap the logo:**

1. Drop your new PNG (square, transparent background) into `assets/`
2. Update `src="assets/image-removebg-preview.png"` in **2 places**:
   - `js/components/navbar.js` (`.navbar-brand` `<img>`)
   - `js/components/footer.js` (`.footer-brand-logo` `<img>`)

**To swap the favicon:**

1. Drop your new icon into `assets/icons/`
2. Update `<link rel="icon" type="image/png" href="assets/icons/Febicone.png">` in **all 8 HTML files**

---

## 📐 Responsive System

| Breakpoint | Width | Container | Navbar height | Logo |
|---|---|---|---|---|
| `≤ 360px` | Tiny phones (iPhone SE 1st gen) | `padding: 0.875rem`, `html` font 13px | 88px | 48px |
| `375–639px` | Small phones | default | 88px | 56px |
| `640–767px` | Large phones | default | 88px | 64px |
| `768–1023px` | Tablets | `padding: 2.5rem` | 96px | 84px |
| `1024–1279px` | Small laptops | `padding: 1.5rem`, max 1400px | 96px | 84px |
| `1280–1439px` | Laptops | max-width: 1240px | 96px | 84px |
| `1440–1919px` | Desktop | max-width: 1400px | 96px | 84px |
| `1920–2559px` (2K) | Large displays | `--container-max: 1600px`, padding 3rem | 108px | 96px |
| `≥ 2560px` (4K / 75" TV) | TV-class | `--container-max: 1800px`, padding 4rem | 120px | 108px |

**Where responsive lives:**

- **Global** → `css/responsive.css` (breakpoints + container) + `css/global.css` (`.container` + utilities)
- **Navbar** → `css/components/navbar.css`
- **Footer** → `css/components/footer.css`
- **Cards** → `css/components/cards.css`
- **Forms** → `css/components/forms.css`
- **Buttons** → `css/components/forms.css` (`.btn` base)
- **Page-specific** → inside each HTML's `<style>` block (e.g. `index.html` `.offer-card`)

---

## ✉ EmailJS Setup

The contact form and enrollment modal both use [EmailJS](https://www.emailjs.com/) — no backend needed.

### One-time setup

1. Sign up at [emailjs.com](https://www.emailjs.com/) (free tier: 200 emails/month)
2. **Add a service** (Gmail, Outlook, custom SMTP) → copy the **Service ID**
3. **Create two templates** — one for contact, one for enrollment. Use these variable names:
   - **Contact template:** `{{name}}`, `{{email}}`, `{{phone}}`, `{{subject}}`, `{{message}}`
   - **Enrollment template:** `{{course_name}}`, `{{name}}`, `{{phone}}`, `{{address}}`, `{{time}}`
4. Copy your **Public Key** from Account → API Keys

### Paste into [`js/emailjs-config.js`](js/emailjs-config.js)

```js
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'paste_here',
  SERVICE_ID: 'paste_here',
  TEMPLATE_CONTACT: 'paste_here',
  TEMPLATE_ENROLLMENT: 'paste_here',
  CALENDLY_URL: 'https://calendly.com/your-link'
};
```

Save → reload any page → submit the contact form → you should receive an email.

> **The EmailJS SDK is loaded from CDN at runtime** by `js/main.js` — no script tags needed in your HTML.

---

## 🛠 Maintenance Recipes

### "I want to add a new page"

1. Create `newpage.html` — copy `about.html` as a template
2. Change `<title>`, `<meta description>`, body content
3. (Optional) Add a `<style>` block at the bottom of `<head>` for page-specific CSS
4. Add the link to `NAV_LINKS` in `js/components/navbar.js`
5. Add the link to `FOOTER_LINKS` in `js/components/footer.js`
6. Add a `pageMap` entry in `createNavbarHTML()` (`js/components/navbar.js`) so the active state works

### "I want to change the accent color from orange to red"

Search-and-replace `#E48A24` → `#FF0000` in:
- `css/components/navbar.css`
- `css/components/footer.css`
- `css/components/cards.css`
- `css/components/forms.css`
- `css/animations.css` (spinner, nav-indicator, etc.)
- All 8 HTML files (inline `<style>` blocks)
- `js/main.js` (scroll-to-top button)
- `js/components/navbar.js` and `footer.js` (inline SVGs use `stroke="currentColor"` and `fill="currentColor"`, so they're fine, but check for any hardcoded hex)

### "I want to add a new social platform to the footer"

See [Adding a new social platform — example](#adding-a-new-social-platform--example) above.

### "The contact form isn't sending emails"

1. Open browser DevTools → Console → look for EmailJS errors
2. Check that `EMAILJS_CONFIG` values are not still placeholders
3. Confirm your EmailJS template variable names match the ones in `emailjs-config.js` (`name`, `email`, `phone`, `subject`, `message`)
4. Confirm you verified your email address with EmailJS (free tier requires it)
5. Check the EmailJS dashboard → Logs for the failed send

### "The navbar doesn't show the active state on my new page"

Make sure the file is in the **root** of the project (same folder as `index.html`). The script reads `window.location.pathname` and splits on `/`, so files in subfolders need a different `pageMap` entry.

### "I want to change the hero image"

1. Drop the new image into `assets/` (recommended size: 800×1067, portrait 3:4)
2. In `index.html`, find `<img src="\assets\gobind1.jpg"` and change the `src` to your new filename
3. (Optional) Update `max-width` in the `.hero-image` CSS if your image is much wider/narrower

### "I want to disable the grain texture"

Remove the `class="grain-overlay"` from the `<body>` of each HTML file. The texture is defined in `css/global.css` (`.grain-overlay::after`).

### "I want to change the font"

1. In every HTML `<head>`, update the Google Fonts URL with the new family name
2. In `css/variables.css`, update `--font-sans` and `--font-serif`
3. Save → reload

---

## 🧪 Browser Support

| Feature | Minimum browser |
|---|---|
| CSS Grid, Flexbox, Custom properties | All modern (Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+) |
| `clamp()` | Chrome 79+, Firefox 75+, Safari 13.1+, Edge 79+ |
| `color-mix()` (used in shadows) | Chrome 111+, Firefox 113+, Safari 16.2+, Edge 111+ |
| IntersectionObserver | All modern (with `else` fallback in `scroll.js`) |
| EmailJS SDK | IE11+ (uses `var`, no `async/await` issues) |

> **Internet Explorer is not supported.** If you need it, remove `color-mix()` from `css/variables.css` and replace with hard-coded `rgba()` values.

---

## 📜 License

This is a private project for **Gobind Dance Center**. All branding, photography, and content are © Gobind Dance Center.

---

## 📞 Contact for the project

- **Studio:** [40-08 76th St, Elmhurst, NYC](https://maps.app.goo.gl/D6KbNcKLLepX2wMv7)
- **Phone:** [+1 (929) 641-7574](tel:+1(929)641-7574)
- **WhatsApp:** [wa.me/19296417574](https://wa.me/19296417574)
- **Facebook:** [facebook.com/gobind.rai.5](https://facebook.com/gobind.rai.5)
- **YouTube:** [@GobindRaiEntertainment](https://youtube.com/@GobindRaiEntertainment)

---

<div align="center">

**Built with care for the Gobind Dance Center · 2026**

*Last updated: 2026-06-16*

</div>
