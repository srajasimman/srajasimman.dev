# Portfolio Website Design Spec
**Date:** 2026-04-16
**Subject:** srajasimman.dev v2 — Personal Portfolio

---

## Overview

A modern, high-performance personal portfolio website for Rajasimman S — Cloud & DevOps Architect. Built as a static single-page application, fully driven by JSON data sources. Designed to reflect engineering excellence: minimal, confident, fast.

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Visual direction | Minimal/Engineering | Cyan on near-black, sharp type, no gimmicks |
| Stack | React 18 + Vite + Tailwind CSS v3 | Static export, zero backend, optimal Lighthouse |
| Hero style | Hybrid | Bold name/title + single terminal accent line |
| Navigation | Minimal header + scroll | No sticky nav competing with content |
| Skills display | Grid cards | Structured, scannable, system-diagram feel |

---

## Visual Identity

- **Background:** `#0a0a0a` (near-black), `#111827` for alternating sections
- **Accent:** `#06b6d4` (cyan-500) — links, borders, highlights, CTAs
- **Text:** `#f9fafb` primary · `#9ca3af` secondary · `#4b5563` muted
- **Fonts:** Inter (body) + JetBrains Mono (terminal accents, code labels)
- **Borders:** `#1f2937` for separators and card edges
- **Radius:** `rounded-md` (4–6px) — sharp but not harsh

---

## Data Sources

All content is rendered from structured data — no hardcoded strings in components.

| File | Purpose |
|------|---------|
| `src/data/resume.json` | Personal info, work, education, skills, projects, references |
| `src/data/repos.json` | Open source GitHub repositories |

---

## Tech Stack

- **Framework:** React 18
- **Build tool:** Vite 5
- **Styling:** Tailwind CSS v3
- **Fonts:** Inter + JetBrains Mono via Google Fonts (`font-display: swap`)
- **Deployment:** Static export (`vite build`) → GitHub Pages / Cloudflare Pages / S3+CloudFront
- **No** animation libraries, icon packs beyond inline SVG, or UI component libraries

---

## Project Structure

```
srajasimman.dev_v2/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   ├── resume.json
│   │   └── repos.json
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Repos.jsx
│   │   ├── References.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Sections

### 1. Header
- Slim, non-sticky. Sits above the hero, fades into page.
- Left: monogram `RS` in cyan
- Right: anchor links — `Projects`, `Contact`, GitHub icon link
- No background on scroll — transparent always

### 2. Hero
- Full viewport height (`min-h-screen`), vertically centered content
- Structure (top to bottom):
  1. Small caps label: `CLOUD · DEVOPS · SRE` in cyan, letter-spaced
  2. Large bold name: `Rajasimman S` (white, ~5xl–7xl)
  3. Role title: `Cloud & DevOps Architect` (gray, xl)
  4. Terminal accent block:
     ```
     $ Specializing in  SRE · GitOps · IaC · Cloud-Native
     ```
     JetBrains Mono, left cyan border, dark background
  5. Two CTAs: `View Projects ↓` (filled cyan) + `Contact` (ghost border)
- Animation: fade-in + `translateY(10px → 0)` on load, CSS only, 0.6s

### 3. About
- Two-column on desktop, single column on mobile
- Left: large pull-quote — *"Design systems that don't need babysitting."* in cyan
- Right: 2–3 sentence summary from `resume.json` basics.summary, condensed
- Three stat pills below: `17+ Years Experience` · `Multi-Cloud` · `Mission-Critical Infra`

### 4. Skills
- Section heading: `Skills` with cyan underline accent
- 2×3 grid of cards (2 cols desktop, 1 col mobile)
- Categories: Cloud Computing · DevOps · SRE & SysOps · Scripting · AI Tools
- Each card:
  - Cyan top border (2px)
  - Category name in cyan small caps
  - Keywords as comma-separated muted text
- Data: `resume.json` → `skills[]`

### 5. Experience
- Vertical timeline, most recent first
- Each entry:
  - Left: date range (muted, mono font) + thin vertical line
  - Right: role title (bold white) · company name (cyan link) · location (muted)
  - 3–4 bullet highlights from `resume.json` → `work[].highlights`
- Data: `resume.json` → `work[]`

### 6. Projects (Featured)
- Three featured cards from `resume.json` → `projects[]`
- Each card:
  - Project name + date range
  - Description (truncated to 3 lines, expand on click)
  - Highlight bullets (top 3)
  - External link icon → project URL
  - Subtle hover: `translateY(-2px)`, border brightens to cyan

### 7. Open Source Repos
- Grid (3 cols desktop, 2 tablet, 1 mobile) from `repos.json`
- Each card: repo name · description · tag pills · GitHub arrow link
- Tag pills: dark cyan background, cyan border, small text

### 8. References
- 3-column grid on desktop, 1 column mobile
- Each card: quote text · name · title (from `resume.json` → `references[]`)
- Left border accent in cyan, italic quote text

### 9. Contact
- Centered, minimal
- Tagline: *"Open to opportunities, collaborations, and interesting problems."*
- Three links: Email · LinkedIn · GitHub — icon + text, spaced horizontally
- No contact form (reduces complexity, no backend needed)

### 10. Footer
- Single line, centered
- `© 2026 Rajasimman S · Built with React & Tailwind`

---

## Animations

All CSS-only or native `IntersectionObserver`. No GSAP, Framer Motion, or AOS.

| Element | Animation |
|---------|-----------|
| Hero content | Fade-in + translateY on mount |
| Section headings | Fade-in on scroll (IntersectionObserver) |
| Cards | `hover:translateY(-2px)` + border brightens |
| Terminal cursor | CSS blink (`@keyframes blink`) |

---

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- All sections have `aria-label`
- Color contrast meets WCAG AA (cyan `#06b6d4` on `#0a0a0a` passes)
- Links have descriptive text or `aria-label`
- `prefers-reduced-motion` respected — animations disabled when set

---

## Performance Targets

- Tailwind purge: only used classes in final bundle
- No images (text-only design) → near-instant first paint
- Google Fonts: `font-display: swap`, preconnect hints in `<head>`
- Target: Lighthouse Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95

---

## SEO

- `<title>`: `Rajasimman S — Cloud & DevOps Architect`
- `<meta name="description">`: drawn from `resume.json` basics.summary (first 160 chars)
- Open Graph tags: title, description, type
- Semantic landmark regions for crawlability

---

## Out of Scope

- Contact form (no backend)
- Dark/light toggle (dark-only by design)
- Blog / CMS
- Certifications section (no certifications data in source JSON)
- Authentication or dynamic data fetching
