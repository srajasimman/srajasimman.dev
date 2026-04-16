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
