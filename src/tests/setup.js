import '@testing-library/jest-dom'

// Mock IntersectionObserver for tests
global.IntersectionObserver = class IntersectionObserver {
  constructor(cb) { this.cb = cb }
  observe(el) { this.cb([{ isIntersecting: true, target: el }]) }
  unobserve() {}
  disconnect() {}
}
