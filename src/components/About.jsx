// About section: pull-quote left, summary right, stat pills below.
// Props: summary (string)

import { useIntersection } from '../hooks/useIntersection.js'

const STATS = [
  { label: '17+ Years', sub: 'Experience' },
  { label: 'Multi-Cloud', sub: 'AWS · GCP · Azure' },
  { label: 'Mission-Critical', sub: 'Infrastructure' },
]

export default function About({ summary }) {
  const [ref, visible] = useIntersection()

  // Trim summary to ~220 chars for a punchy paragraph
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
