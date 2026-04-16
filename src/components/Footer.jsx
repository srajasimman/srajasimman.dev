// Single-line footer with copyright.

export default function Footer({ name }) {
  return (
    <footer className="py-6 px-6 bg-surface border-t border-border text-center">
      <p className="text-muted text-xs font-mono">
        © {new Date().getFullYear()} {name} · Built with React &amp; Tailwind
      </p>
    </footer>
  )
}
