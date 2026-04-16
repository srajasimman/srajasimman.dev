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
