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
