// Contact section: social links + Formspree contact form.
// Props: basics (object with email, profiles)

import { useState } from 'react'
import { useIntersection } from '../hooks/useIntersection.js'

const FORMSPREE_URL = 'https://formspree.io/f/mpwdqgjq'

export default function Contact({ basics }) {
  const [ref, visible] = useIntersection()
  const linkedin = basics.profiles.find(p => p.network === 'LinkedIn')
  const github = basics.profiles.find(p => p.network === 'Github')

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 px-6 bg-surface2"
    >
      <div
        ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3 text-center">
          contact
        </p>
        <h2 className="text-3xl font-bold text-primary mb-4 text-center">
          Let's Connect
        </h2>
        <p className="text-secondary text-base mb-8 text-center">
          Open to opportunities, collaborations, and interesting problems.
        </p>

        {/* Social links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
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

        {/* Contact form */}
        {status === 'success' ? (
          <div className="border border-accent rounded p-8 text-center">
            <p className="text-accent font-mono text-sm mb-1">$ message sent</p>
            <p className="text-secondary text-sm">Thanks! I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-muted uppercase tracking-widest mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-surface border border-border rounded px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-mono text-xs text-muted uppercase tracking-widest mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-surface border border-border rounded px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block font-mono text-xs text-muted uppercase tracking-widest mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full bg-surface border border-border rounded px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-xs text-muted uppercase tracking-widest mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full bg-surface border border-border rounded px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-xs font-mono">Something went wrong. Please try again or email directly.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-accent text-surface font-bold px-6 py-3 rounded text-sm hover:bg-accent-dim transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
