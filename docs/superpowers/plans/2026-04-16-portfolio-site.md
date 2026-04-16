# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready static portfolio site for Rajasimman S using React 18 + Vite + Tailwind CSS, fully driven by JSON data sources.

**Architecture:** Single-page application with 10 sections assembled in `App.jsx`. Each section is an isolated component that receives data as props. All content sourced from `src/data/resume.json` and `src/data/repos.json` — zero hardcoded strings in components.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, Vitest, @testing-library/react, Inter + JetBrains Mono (Google Fonts)

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Entry point, meta tags, font preconnects, SEO |
| `vite.config.js` | Vite config with React plugin |
| `tailwind.config.js` | Custom colors, fonts, extend theme |
| `src/index.css` | Tailwind directives, base resets, custom classes |
| `src/main.jsx` | React DOM root mount |
| `src/App.jsx` | Imports data, assembles all section components |
| `src/data/resume.json` | Copy of project-root resume.json |
| `src/data/repos.json` | Copy of project-root repos.json |
| `src/components/Header.jsx` | Slim non-sticky nav: logo + anchor links |
| `src/components/Hero.jsx` | Full-vh hero with hybrid terminal accent |
| `src/components/About.jsx` | Pull-quote + summary + stat pills |
| `src/components/Skills.jsx` | 2×3 grid of skill category cards |
| `src/components/Experience.jsx` | Vertical timeline of work history |
| `src/components/Projects.jsx` | Three featured project cards |
| `src/components/Repos.jsx` | Grid of open source repo cards |
| `src/components/References.jsx` | Quote cards grid |
| `src/components/Contact.jsx` | Centered links: email, LinkedIn, GitHub |
| `src/components/Footer.jsx` | Single-line copyright |
| `src/hooks/useIntersection.js` | IntersectionObserver hook for scroll animations |
| `src/tests/App.test.jsx` | Smoke test: App renders without crashing |
| `src/tests/Hero.test.jsx` | Hero renders name and terminal accent |
| `src/tests/Skills.test.jsx` | Skills renders all category names |
| `src/tests/Experience.test.jsx` | Experience renders all company names |
| `src/tests/Projects.test.jsx` | Projects renders all project names |
| `src/tests/Repos.test.jsx` | Repos renders all repo names |

---

## Task 1: Scaffold project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.jsx`

- [ ] **Step 1: Initialize the project**

```bash
cd /Users/srajasimman/Projects/Personal/srajasimman.dev_v2
npm create vite@latest . -- --template react
# When prompted: select "React" then "JavaScript"
# Answer "y" to overwrite if asked (only non-essential files will conflict)
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Tailwind**

Replace the contents of `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0a0a0a',
        surface2: '#111827',
        accent: '#06b6d4',
        'accent-dim': '#0891b2',
        border: '#1f2937',
        muted: '#4b5563',
        secondary: '#9ca3af',
        primary: '#f9fafb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Configure Vite**

Replace `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
  },
})
```

- [ ] **Step 5: Write index.css**

Replace `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: #0a0a0a;
    color: #f9fafb;
  }

  * {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer utilities {
  .animate-fade-up {
    animation: fadeUp 0.6s ease forwards;
  }

  .animate-blink {
    animation: blink 1s step-end infinite;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

- [ ] **Step 6: Write index.html**

Replace `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Rajasimman S — Cloud & DevOps Architect with 17+ years building scalable, observable, and cost-efficient cloud-native platforms across AWS, GCP, and Azure." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Rajasimman S — Cloud & DevOps Architect" />
    <meta property="og:description" content="Cloud & DevOps Architect specializing in SRE, GitOps, IaC, and Cloud-Native platforms." />
    <title>Rajasimman S — Cloud & DevOps Architect</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Write main.jsx**

Replace `src/main.jsx` with:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 8: Create test setup file**

```bash
mkdir -p src/tests
```

Create `src/tests/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 9: Copy data files**

```bash
mkdir -p src/data
cp resume.json src/data/resume.json
cp repos.json src/data/repos.json
```

- [ ] **Step 10: Write a smoke test**

Create `src/tests/App.test.jsx`:

```jsx
import { render } from '@testing-library/react'
import App from '../App.jsx'
import { describe, it } from 'vitest'

describe('App', () => {
  it('renders without crashing', () => {
    // App imports data internally — just verify it mounts
    render(<App />)
  })
})
```

- [ ] **Step 11: Write minimal App.jsx to make test pass**

Create `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'

export default function App() {
  return (
    <div className="bg-surface text-primary font-sans">
      <main>{resume.basics.name}</main>
    </div>
  )
}
```

- [ ] **Step 12: Run the smoke test**

```bash
npx vitest run src/tests/App.test.jsx
```

Expected: PASS

- [ ] **Step 13: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:5173 — you should see "Rajasimman S" on a black background.

- [ ] **Step 14: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold React + Vite + Tailwind portfolio project"
```

---

## Task 2: useIntersection hook

**Files:**
- Create: `src/hooks/useIntersection.js`

- [ ] **Step 1: Write the hook**

Create `src/hooks/useIntersection.js`:

```js
import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, isVisible].
 * Attach ref to a DOM element. isVisible becomes true once
 * the element enters the viewport (fires once, never resets).
 */
export function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useIntersection.js
git commit -m "feat: add useIntersection hook for scroll animations"
```

---

## Task 3: Header component

**Files:**
- Create: `src/components/Header.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/Header.jsx`:

```jsx
// Slim non-sticky header. Transparent background, fades into hero.
// Props: name (string), profiles (array of {network, url})

export default function Header({ name, profiles }) {
  const github = profiles.find(p => p.network === 'Github')
  const initials = name.split(' ').map(n => n[0]).join('')

  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-6 py-5 flex items-center justify-between">
      <span className="font-mono text-accent font-bold tracking-widest text-sm">
        {initials}
      </span>
      <nav aria-label="Primary navigation" className="flex items-center gap-6">
        <a
          href="#projects"
          className="text-secondary text-sm hover:text-primary transition-colors duration-200"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="text-secondary text-sm hover:text-primary transition-colors duration-200"
        >
          Contact
        </a>
        {github && (
          <a
            href={github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-secondary hover:text-accent transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        )}
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Wire into App.jsx**

Replace `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <p className="pt-20 px-6">{basics.name}</p>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.jsx src/App.jsx
git commit -m "feat: add Header component"
```

---

## Task 4: Hero component

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `src/tests/Hero.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/tests/Hero.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero.jsx'
import { describe, it, expect } from 'vitest'

const basics = {
  name: 'Rajasimman S',
  label: 'Cloud and DevOps Solutions Specialist',
  email: 'srajasimman@gmail.com',
  profiles: [
    { network: 'LinkedIn', url: 'https://linkedin.com/in/rajasimman-sha' },
    { network: 'Github', url: 'https://github.com/srajasimman' },
  ],
}

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero basics={basics} />)
    expect(screen.getByText('Rajasimman S')).toBeInTheDocument()
  })

  it('renders the terminal accent line', () => {
    render(<Hero basics={basics} />)
    expect(screen.getByText(/Specializing in/i)).toBeInTheDocument()
  })

  it('renders View Projects link', () => {
    render(<Hero basics={basics} />)
    expect(screen.getByText(/View Projects/i)).toBeInTheDocument()
  })

  it('renders Contact link', () => {
    render(<Hero basics={basics} />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/tests/Hero.test.jsx
```

Expected: FAIL — `Hero.jsx` does not exist yet.

- [ ] **Step 3: Write the component**

Create `src/components/Hero.jsx`:

```jsx
// Hero section: full viewport height, hybrid layout.
// Top: cyan label, large name, role title.
// Middle: terminal accent block.
// Bottom: two CTAs.
// Props: basics (object with name, label, email, profiles)

export default function Hero({ basics }) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
      aria-label="Introduction"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-3xl animate-fade-up">
        {/* Eyebrow */}
        <p className="font-mono text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          Cloud · DevOps · SRE
        </p>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-primary mb-3">
          {basics.name}
        </h1>

        {/* Role */}
        <p className="text-xl text-secondary mb-8">
          Cloud &amp; DevOps Architect
        </p>

        {/* Terminal accent */}
        <div className="inline-block text-left border-l-2 border-accent bg-black/60 px-4 py-3 rounded-r mb-10">
          <span className="font-mono text-muted text-sm">$ </span>
          <span className="font-mono text-accent text-sm">Specializing in</span>
          <span className="font-mono text-primary text-sm">
            {' '}SRE · GitOps · IaC · Cloud-Native
          </span>
          <span className="font-mono text-accent text-sm animate-blink ml-1">█</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="bg-accent text-surface font-bold px-6 py-3 rounded text-sm hover:bg-accent-dim transition-colors duration-200 w-full sm:w-auto text-center"
          >
            View Projects ↓
          </a>
          <a
            href="#contact"
            className="border border-border text-secondary px-6 py-3 rounded text-sm hover:border-accent hover:text-accent transition-colors duration-200 w-full sm:w-auto text-center"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/tests/Hero.test.jsx
```

Expected: PASS (4 tests)

- [ ] **Step 5: Wire into App.jsx**

Replace `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
      </main>
    </div>
  )
}
```

- [ ] **Step 6: Verify visually**

```bash
npm run dev
```

Open http://localhost:5173 — hero should show full viewport, name, terminal line, CTAs, subtle grid bg.

- [ ] **Step 7: Commit**

```bash
git add src/components/Hero.jsx src/tests/Hero.test.jsx src/App.jsx
git commit -m "feat: add Hero section with terminal accent"
```

---

## Task 5: About component

**Files:**
- Create: `src/components/About.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/About.jsx`:

```jsx
// About section: pull-quote left, summary right, stat pills below.
// Props: summary (string), name (string)

import { useIntersection } from '../hooks/useIntersection.js'

const STATS = [
  { label: '17+ Years', sub: 'Experience' },
  { label: 'Multi-Cloud', sub: 'AWS · GCP · Azure' },
  { label: 'Mission-Critical', sub: 'Infrastructure' },
]

export default function About({ summary }) {
  const [ref, visible] = useIntersection()

  // Trim summary to ~200 chars for a punchy paragraph
  const short = summary.length > 220
    ? summary.slice(0, summary.lastIndexOf(' ', 220)) + '…'
    : summary

  return (
    <section
      id="about"
      aria-label="About"
      className="py-24 px-6 bg-surface2"
    >
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-10">
          about
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-14">
          {/* Pull-quote */}
          <div className="flex items-start">
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="text-2xl sm:text-3xl font-bold text-primary leading-snug">
                "Design systems that don't need babysitting."
              </p>
            </blockquote>
          </div>

          {/* Summary */}
          <div className="text-secondary text-base leading-relaxed">
            <p>{short}</p>
          </div>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-4">
          {STATS.map(stat => (
            <div
              key={stat.label}
              className="border border-border rounded px-5 py-3"
            >
              <p className="text-accent font-bold text-sm">{stat.label}</p>
              <p className="text-muted text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire into App.jsx**

Replace `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx src/App.jsx
git commit -m "feat: add About section with pull-quote and stats"
```

---

## Task 6: Skills component

**Files:**
- Create: `src/components/Skills.jsx`
- Create: `src/tests/Skills.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/tests/Skills.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Skills from '../components/Skills.jsx'
import { describe, it, expect } from 'vitest'

const skills = [
  { name: 'Cloud Computing', level: 'Master', keywords: ['AWS Cloud', 'Azure Cloud', 'Google Cloud'] },
  { name: 'DevOps', level: 'Master', keywords: ['Docker', 'Kubernetes'] },
]

describe('Skills', () => {
  it('renders each category name', () => {
    render(<Skills skills={skills} />)
    expect(screen.getByText('Cloud Computing')).toBeInTheDocument()
    expect(screen.getByText('DevOps')).toBeInTheDocument()
  })

  it('renders keywords', () => {
    render(<Skills skills={skills} />)
    expect(screen.getByText(/AWS Cloud/)).toBeInTheDocument()
    expect(screen.getByText(/Docker/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/tests/Skills.test.jsx
```

Expected: FAIL

- [ ] **Step 3: Write the component**

Create `src/components/Skills.jsx`:

```jsx
// Skills section: 2-col grid of category cards.
// Each card: cyan top border, category name, keyword list.
// Props: skills (array of {name, level, keywords})

import { useIntersection } from '../hooks/useIntersection.js'

const CATEGORY_ICONS = {
  'Cloud Computing': '☁',
  'SysOps and SRE': '📡',
  'DevOps': '⚙',
  'AI Tools': '✦',
  'Scripting': '{ }',
}

export default function Skills({ skills }) {
  const [ref, visible] = useIntersection()

  return (
    <section
      id="skills"
      aria-label="Skills"
      className="py-24 px-6 bg-surface"
    >
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3">
          skills
        </p>
        <h2 className="text-3xl font-bold text-primary mb-10">
          Technical Arsenal
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {skills.map(skill => (
            <div
              key={skill.name}
              className="bg-surface2 border border-border border-t-2 border-t-accent rounded p-5 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden="true" className="text-accent text-base">
                  {CATEGORY_ICONS[skill.name] ?? '▸'}
                </span>
                <h3 className="text-accent font-mono text-xs font-semibold tracking-widest uppercase">
                  {skill.name}
                </h3>
              </div>
              <p className="text-secondary text-sm leading-relaxed">
                {skill.keywords.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/tests/Skills.test.jsx
```

Expected: PASS

- [ ] **Step 5: Wire into App.jsx**

Replace `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
        <Skills skills={resume.skills} />
      </main>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Skills.jsx src/tests/Skills.test.jsx src/App.jsx
git commit -m "feat: add Skills section with category grid cards"
```

---

## Task 7: Experience component

**Files:**
- Create: `src/components/Experience.jsx`
- Create: `src/tests/Experience.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/tests/Experience.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Experience from '../components/Experience.jsx'
import { describe, it, expect } from 'vitest'

const work = [
  {
    name: 'Akkodis India Pvt. Ltd.',
    position: 'Cloud & DevOps Architect',
    location: 'Bangalore, India',
    startDate: '2024-10-01',
    endDate: '2025-06',
    highlights: ['Led cloud infrastructure design', 'Implemented SRE practices'],
  },
  {
    name: 'Opt IT Technologies',
    position: 'Team Lead - SRE',
    location: 'Bangalore',
    startDate: '2021-08-16',
    endDate: '2024-09-30',
    highlights: ['Led SRE team'],
  },
]

describe('Experience', () => {
  it('renders all company names', () => {
    render(<Experience work={work} />)
    expect(screen.getByText('Akkodis India Pvt. Ltd.')).toBeInTheDocument()
    expect(screen.getByText('Opt IT Technologies')).toBeInTheDocument()
  })

  it('renders all role titles', () => {
    render(<Experience work={work} />)
    expect(screen.getByText('Cloud & DevOps Architect')).toBeInTheDocument()
    expect(screen.getByText('Team Lead - SRE')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/tests/Experience.test.jsx
```

Expected: FAIL

- [ ] **Step 3: Write the component**

Create `src/components/Experience.jsx`:

```jsx
// Experience section: vertical timeline, most recent first.
// Left column: date range. Right column: role, company, highlights.
// Props: work (array of resume work objects)

import { useIntersection } from '../hooks/useIntersection.js'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  const [year, month] = dateStr.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return month ? `${months[parseInt(month, 10) - 1]} ${year}` : year
}

function formatRange(startDate, endDate) {
  return `${formatDate(startDate)} — ${formatDate(endDate)}`
}

export default function Experience({ work }) {
  const [ref, visible] = useIntersection()

  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="py-24 px-6 bg-surface2"
    >
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3">
          experience
        </p>
        <h2 className="text-3xl font-bold text-primary mb-12">
          Work History
        </h2>

        <div className="space-y-12">
          {work.map((job, i) => (
            <div key={i} className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8">
              {/* Date + line */}
              <div className="flex md:flex-col md:items-end items-center gap-3">
                <span className="font-mono text-muted text-xs whitespace-nowrap">
                  {formatRange(job.startDate, job.endDate)}
                </span>
                <div className="hidden md:block w-px bg-border self-stretch mt-2" />
              </div>

              {/* Content */}
              <div className="border-l border-border pl-6">
                <h3 className="text-primary font-semibold text-lg leading-tight">
                  {job.position}
                </h3>
                <p className="text-accent text-sm mt-0.5 mb-1">{job.name}</p>
                <p className="text-muted text-xs mb-4">{job.location}</p>
                <ul className="space-y-1.5">
                  {job.highlights.slice(0, 4).map((h, j) => (
                    <li key={j} className="text-secondary text-sm flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/tests/Experience.test.jsx
```

Expected: PASS

- [ ] **Step 5: Wire into App.jsx**

Replace `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
        <Skills skills={resume.skills} />
        <Experience work={resume.work} />
      </main>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Experience.jsx src/tests/Experience.test.jsx src/App.jsx
git commit -m "feat: add Experience timeline section"
```

---

## Task 8: Projects component

**Files:**
- Create: `src/components/Projects.jsx`
- Create: `src/tests/Projects.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/tests/Projects.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Projects from '../components/Projects.jsx'
import { describe, it, expect } from 'vitest'

const projects = [
  {
    name: 'iGOT Karmayogi Bharat | NIC Govt of India',
    startDate: '2023-06-01',
    description: 'Managed SRE and DevOps functions.',
    highlights: ['Led infra', 'Improved monitoring'],
    url: 'https://igotkarmayogi.gov.in/',
  },
  {
    name: 'DIKSHA | NCERT Govt. of India',
    startDate: '2021-08-16',
    endDate: '2023-05-31',
    description: 'Led SRE and DevOps teams.',
    highlights: ['Automated infra'],
    url: 'https://diksha.gov.in/',
  },
]

describe('Projects', () => {
  it('renders all project names', () => {
    render(<Projects projects={projects} />)
    expect(screen.getByText(/iGOT Karmayogi/)).toBeInTheDocument()
    expect(screen.getByText(/DIKSHA/)).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<Projects projects={projects} />)
    expect(screen.getByText(/Managed SRE and DevOps/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/tests/Projects.test.jsx
```

Expected: FAIL

- [ ] **Step 3: Write the component**

Create `src/components/Projects.jsx`:

```jsx
// Projects section: featured project cards with description + highlights.
// Props: projects (array of resume project objects)

import { useIntersection } from '../hooks/useIntersection.js'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  const [year] = dateStr.split('-')
  return year
}

export default function Projects({ projects }) {
  const [ref, visible] = useIntersection()

  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="py-24 px-6 bg-surface"
    >
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3">
          projects
        </p>
        <h2 className="text-3xl font-bold text-primary mb-10">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <article
              key={i}
              className="bg-surface2 border border-border rounded p-6 flex flex-col hover:-translate-y-0.5 hover:border-accent transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-primary font-semibold text-sm leading-snug flex-1">
                  {project.name}
                </h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name}`}
                    className="text-muted hover:text-accent transition-colors shrink-0 mt-0.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="font-mono text-muted text-xs mb-3">
                {formatDate(project.startDate)}
                {project.endDate ? ` — ${formatDate(project.endDate)}` : ' — Present'}
              </p>

              <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">
                {project.description.length > 160
                  ? project.description.slice(0, project.description.lastIndexOf(' ', 160)) + '…'
                  : project.description}
              </p>

              <ul className="space-y-1 mt-auto">
                {project.highlights.slice(0, 3).map((h, j) => (
                  <li key={j} className="text-muted text-xs flex gap-1.5">
                    <span className="text-accent shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/tests/Projects.test.jsx
```

Expected: PASS

- [ ] **Step 5: Wire into App.jsx**

Replace `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
        <Skills skills={resume.skills} />
        <Experience work={resume.work} />
        <Projects projects={resume.projects} />
      </main>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Projects.jsx src/tests/Projects.test.jsx src/App.jsx
git commit -m "feat: add Projects section with featured work cards"
```

---

## Task 9: Repos component

**Files:**
- Create: `src/components/Repos.jsx`
- Create: `src/tests/Repos.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/tests/Repos.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import Repos from '../components/Repos.jsx'
import { describe, it, expect } from 'vitest'

const repos = [
  {
    name: 'self-host',
    description: 'Docker Compose configurations for self-hosting.',
    url: 'https://github.com/srajasimman/self-host',
    tags: ['docker', 'self-hosting'],
  },
  {
    name: 'terraform-aws-github-oidc-iam',
    description: 'Terraform module for GitHub OIDC with AWS IAM.',
    url: 'https://github.com/srajasimman/terraform-aws-github-oidc-iam',
    tags: ['terraform', 'aws'],
  },
]

describe('Repos', () => {
  it('renders all repo names', () => {
    render(<Repos repos={repos} />)
    expect(screen.getByText('self-host')).toBeInTheDocument()
    expect(screen.getByText('terraform-aws-github-oidc-iam')).toBeInTheDocument()
  })

  it('renders repo descriptions', () => {
    render(<Repos repos={repos} />)
    expect(screen.getByText(/Docker Compose configurations/)).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<Repos repos={repos} />)
    expect(screen.getByText('docker')).toBeInTheDocument()
    expect(screen.getByText('terraform')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/tests/Repos.test.jsx
```

Expected: FAIL

- [ ] **Step 3: Write the component**

Create `src/components/Repos.jsx`:

```jsx
// Repos section: grid of open source repository cards.
// Props: repos (array from repos.json)

import { useIntersection } from '../hooks/useIntersection.js'

export default function Repos({ repos }) {
  const [ref, visible] = useIntersection()

  return (
    <section
      id="repos"
      aria-label="Open source repositories"
      className="py-24 px-6 bg-surface2"
    >
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3">
          open source
        </p>
        <h2 className="text-3xl font-bold text-primary mb-10">
          GitHub Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <a
              key={i}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface border border-border rounded p-5 flex flex-col hover:-translate-y-0.5 hover:border-accent transition-all duration-200 no-underline"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-primary font-mono text-sm font-medium group-hover:text-accent transition-colors">
                  {repo.name}
                </h3>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted group-hover:text-accent transition-colors shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
              <p className="text-secondary text-xs leading-relaxed flex-1 mb-4">
                {repo.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {repo.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-surface2 border border-border text-accent text-xs px-2 py-0.5 rounded font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/tests/Repos.test.jsx
```

Expected: PASS

- [ ] **Step 5: Wire into App.jsx**

Replace `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Repos from './components/Repos.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
        <Skills skills={resume.skills} />
        <Experience work={resume.work} />
        <Projects projects={resume.projects} />
        <Repos repos={repos} />
      </main>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Repos.jsx src/tests/Repos.test.jsx src/App.jsx
git commit -m "feat: add Repos section with GitHub project cards"
```

---

## Task 10: References component

**Files:**
- Create: `src/components/References.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/References.jsx`:

```jsx
// References section: quote cards in a grid.
// resume.json references[].name contains "Name | Title at Company"
// Split on " | " to separate name from title.
// Props: references (array of {name, reference})

import { useIntersection } from '../hooks/useIntersection.js'

function parseRef(nameField) {
  const [name, title] = nameField.split(' | ')
  return { name: name?.trim() ?? nameField, title: title?.trim() ?? '' }
}

export default function References({ references }) {
  const [ref, visible] = useIntersection()

  return (
    <section
      id="references"
      aria-label="References"
      className="py-24 px-6 bg-surface"
    >
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3">
          references
        </p>
        <h2 className="text-3xl font-bold text-primary mb-10">
          What People Say
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {references.map((item, i) => {
            const { name, title } = parseRef(item.name)
            return (
              <figure
                key={i}
                className="bg-surface2 border border-border border-l-2 border-l-accent rounded p-6 flex flex-col"
              >
                <blockquote className="text-secondary text-sm leading-relaxed italic flex-1 mb-5">
                  "{item.reference}"
                </blockquote>
                <figcaption>
                  <p className="text-primary text-sm font-semibold">{name}</p>
                  <p className="text-muted text-xs mt-0.5">{title}</p>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire into App.jsx**

Replace `src/App.jsx`:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Repos from './components/Repos.jsx'
import References from './components/References.jsx'

export default function App() {
  const { basics } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
        <Skills skills={resume.skills} />
        <Experience work={resume.work} />
        <Projects projects={resume.projects} />
        <Repos repos={repos} />
        <References references={resume.references} />
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/References.jsx src/App.jsx
git commit -m "feat: add References section with quote cards"
```

---

## Task 11: Contact + Footer components

**Files:**
- Create: `src/components/Contact.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Write Contact component**

Create `src/components/Contact.jsx`:

```jsx
// Contact section: centered email + LinkedIn + GitHub links.
// Props: basics (object with email, profiles)

import { useIntersection } from '../hooks/useIntersection.js'

export default function Contact({ basics }) {
  const [ref, visible] = useIntersection()
  const linkedin = basics.profiles.find(p => p.network === 'LinkedIn')
  const github = basics.profiles.find(p => p.network === 'Github')

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 px-6 bg-surface2 text-center"
    >
      <div
        ref={ref}
        className={`max-w-xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3">
          contact
        </p>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Let's Connect
        </h2>
        <p className="text-secondary text-base mb-10">
          Open to opportunities, collaborations, and interesting problems.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={`mailto:${basics.email}`}
            className="flex items-center gap-2 text-secondary hover:text-accent transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {basics.email}
          </a>

          {linkedin && (
            <a
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-accent transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          )}

          {github && (
            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-accent transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write Footer component**

Create `src/components/Footer.jsx`:

```jsx
// Single-line footer with copyright.

export default function Footer() {
  return (
    <footer className="py-6 px-6 bg-surface border-t border-border text-center">
      <p className="text-muted text-xs font-mono">
        © 2026 Rajasimman S · Built with React &amp; Tailwind
      </p>
    </footer>
  )
}
```

- [ ] **Step 3: Wire both into final App.jsx**

Replace `src/App.jsx` with the complete final version:

```jsx
import resume from './data/resume.json'
import repos from './data/repos.json'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Repos from './components/Repos.jsx'
import References from './components/References.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { basics, work, skills, projects, references } = resume
  return (
    <div className="bg-surface text-primary font-sans">
      <Header name={basics.name} profiles={basics.profiles} />
      <main>
        <Hero basics={basics} />
        <About summary={basics.summary} />
        <Skills skills={skills} />
        <Experience work={work} />
        <Projects projects={projects} />
        <Repos repos={repos} />
        <References references={references} />
        <Contact basics={basics} />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Run all tests**

```bash
npx vitest run
```

Expected: All tests PASS

- [ ] **Step 5: Verify full site visually**

```bash
npm run dev
```

Scroll through all sections. Verify:
- Hero loads with fade-in animation
- Terminal accent blinks
- Each section fades in on scroll
- Skills grid renders all 5 categories
- Experience timeline shows all 7 jobs
- Projects shows all 3 cards
- Repos shows all 8 cards with tags
- References shows all 3 quotes
- Contact shows email, LinkedIn, GitHub links
- Footer shows copyright

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.jsx src/components/Footer.jsx src/App.jsx
git commit -m "feat: add Contact and Footer, complete full site assembly"
```

---

## Task 12: Production build + deploy config

**Files:**
- Modify: `vite.config.js`
- Create: `.github/workflows/deploy.yml` (optional — if deploying to GitHub Pages)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: `dist/` folder created with no errors.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview
```

Open http://localhost:4173 — verify site looks identical to dev server.

- [ ] **Step 3: Check bundle size**

```bash
npm run build 2>&1 | grep -E 'gzip|kB'
```

Expected: Total JS gzipped under 150kB. If larger, check for accidental large imports.

- [ ] **Step 4: Create GitHub Pages deploy workflow (optional)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 5: Add .gitignore if not present**

Verify `.gitignore` contains at minimum:

```
node_modules/
dist/
.superpowers/
```

If missing, create it with those entries.

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: add production build config and GitHub Pages deploy workflow"
```

---

## Self-Review Checklist

After implementation, verify:

- [ ] All 10 sections render with real data from JSON (no hardcoded content)
- [ ] `npx vitest run` passes — Hero, Skills, Experience, Projects, Repos, App tests
- [ ] `npm run build` completes with no errors
- [ ] `npm run preview` shows complete site at localhost:4173
- [ ] Animations fire on scroll (IntersectionObserver)
- [ ] Mobile layout tested at 375px width (all grids collapse to 1 col)
- [ ] Links open correctly: email, LinkedIn, GitHub, project URLs
- [ ] Terminal cursor blinks in Hero
- [ ] `prefers-reduced-motion` disables animations (verify in DevTools → Rendering)
