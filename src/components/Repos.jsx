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
              key={repo.name}
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
