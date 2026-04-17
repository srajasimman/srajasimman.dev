// Hero section: full viewport height, hybrid layout.
// Top: cyan label, large name, role title.
// Middle: terminal accent block.
// Bottom: two CTAs.
// Props: basics (object with name, label, email, profiles)

import { useState, useEffect } from 'react'

const TECH_ITEMS = [
  'Cloud-Native',
  'Kubernetes',
  'Terraform',
  'GitHub-Actions',
  'DevSecOps',
  'GitOps',
  'Security',
  'Observability'
]

export default function Hero({ basics }) {
  const [itemIndex, setItemIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = TECH_ITEMS[itemIndex]
    let timeout
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), 80)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), 40)
    } else {
      setDeleting(false)
      setItemIndex(i => (i + 1) % TECH_ITEMS.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, itemIndex])

  const displayedText = TECH_ITEMS[itemIndex].slice(0, charIndex)

  return (
    <section
      id="hero"
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

        {/* Name — first 4 letters "Raja" highlighted in accent */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-primary mb-3">
          <span className="text-accent">{basics.name.slice(0, 4)}</span>{basics.name.slice(4)}
        </h1>

        {/* Role */}
        <p className="text-xl text-secondary mb-8">{basics.label}</p>

        {/* Terminal accent */}
        <div className="inline-block text-left border-l-2 border-accent bg-black/60 px-4 py-3 rounded-r mb-10">
          <span className="font-mono text-muted text-sm">$ </span>
          <span className="font-mono text-accent text-sm">Specializing in </span>
          <span className="font-mono text-sm inline-block w-32">
            <span className="text-primary">{' '}{displayedText}</span><span className="text-accent animate-blink">█</span>
          </span>
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
