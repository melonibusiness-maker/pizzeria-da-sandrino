# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

A single-page marketing website for **Pizzeria da Sandrino**, a pizzeria and
restaurant in Uri (SS), Sardinia. It is a static site — plain HTML, CSS, and a
small vanilla-JS file, with no build step, framework, or dependencies. All
user-facing copy is in **Italian**; keep it that way.

The site is a one-page scroll with anchored sections: hero, a scrolling
marquee, "Chi Siamo" (about), "Il Menu", "Galleria", "Recensioni" (reviews),
and "Dove Siamo" (location/contact + embedded Google Map).

## Project layout

```
index.html                  Entire page markup (single file, all sections)
styles.css                  All styles; design tokens in :root at the top
script.js                   Vanilla JS: footer year, scroll-reveal, nav hide-on-scroll
img/                        JPG assets (hero, gallery, menu reference photo)
.github/workflows/pages.yml GitHub Pages deploy workflow
.nojekyll                   Disables Jekyll so files are served as-is
```

There is no `package.json`, no bundler, and no test suite. What you see is what
ships.

## How to run it

Open `index.html` directly in a browser, or serve the folder over HTTP for the
Google Fonts / Maps embed and relative asset paths to behave normally:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

No install, build, or compile step exists — don't add one unless explicitly
asked.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which uploads the repo
root as a Pages artifact and deploys it to GitHub Pages. There is no build; the
whole directory is published verbatim. `.nojekyll` is present so GitHub does not
run Jekyll over the files. Changes to any file at the root go live on the next
push to `main`.

## Conventions

- **Language:** All content, `alt` text, and section copy is Italian. Match the
  existing warm, local tone. `<html lang="it">`.
- **Styling:** Single stylesheet, no preprocessor. Reuse the CSS custom
  properties defined in `:root` (`--ink`, `--paper`, `--gold`, `--radius`,
  `--ease`, etc.) rather than hard-coding colors, radii, or easing curves.
- **Type:** Two Google Fonts — `Fraunces` (serif, used via `.display` and
  headings) and `Outfit` (sans, body). Preconnect + stylesheet links live in
  `<head>`.
- **BEM-ish class names:** Blocks and elements follow `block__element` /
  `block--modifier` (e.g. `nav__inner`, `btn--primary`, `menu__item`). Keep new
  markup consistent with this.
- **Responsive:** Layout uses CSS grid with `clamp()` for fluid spacing/type and
  a handful of `@media` breakpoints (mainly 900px and 820px). The nav collapses
  its link list below 820px.
- **Motion:** Scroll-triggered reveals use the `.reveal` class (JS adds
  `.is-visible` via IntersectionObserver). Add `.reveal` to elements that should
  animate in. Both the marquee and reveals respect
  `prefers-reduced-motion: reduce`.
- **Accessibility:** Every image has meaningful `alt` text; the decorative
  marquee is `aria-hidden`. Preserve these when editing.
- **No dependencies:** Keep the site dependency-free. Vanilla JS only; don't
  introduce npm packages, frameworks, or a build pipeline without being asked.

## Editing the menu

The menu lives directly in `index.html` under `<section class="menu" id="menu">`,
split into three groups (`Le Classiche`, `Le Speciali di Sandrino`,
`Dal Mare & Calzone`). Each item follows this pattern:

```html
<li>
  <div class="menu__item">
    <span class="menu__name">Margherita</span>
    <span class="menu__desc">Pomodoro, mozzarella</span>
  </div>
  <span class="menu__price">€6,00</span>
</li>
```

Prices use the euro sign and a comma decimal separator (`€8,50`). The
"Ventotto pizze" ("28 pizzas") count in the hero and about section should stay in
sync with the actual number of pizzas listed if items are added or removed.

## Business facts to keep consistent

These values appear in multiple places (hero, about, footer, info section,
`<meta description>`) — update all occurrences together if they change:

- **Address:** Via Sassari 179, 07040 Uri (SS)
- **Phone:** 079 966 1193 (`tel:+390799661193`) · **Mobile:** 392 287 7222
- **Hours:** every evening from 19:00, closed Mondays ("Chiuso il lunedì")
- **Rating:** 4,8 on Google (34 reviews)
- **Socials:** Instagram (`pizzeria_da_sandrino`), Facebook
- **Services:** free delivery, takeaway, dine-in

## Git & workflow

- Deploys happen from `main` via GitHub Actions (see Deployment above).
- Development for this task happens on branch `claude/claude-md-docs-xfnunt`.
- Do not open a pull request unless explicitly asked.
