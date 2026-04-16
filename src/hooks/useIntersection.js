import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, isVisible].
 * Attach ref to a DOM element. isVisible becomes true once
 * the element enters the viewport (fires once, never resets).
 */
export function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}
