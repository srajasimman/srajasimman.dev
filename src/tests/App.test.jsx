import { render } from '@testing-library/react'
import App from '../App.jsx'
import { describe, it } from 'vitest'

describe('App', () => {
  it('renders without crashing', () => {
    // App imports data internally — just verify it mounts
    render(<App />)
  })
})
