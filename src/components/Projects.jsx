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
