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
