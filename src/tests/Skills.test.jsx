import { render, screen } from '@testing-library/react'
import Skills from '../components/Skills.jsx'
import { describe, it, expect } from 'vitest'

const skills = [
  { name: 'Cloud Computing', level: 'Master', keywords: ['AWS Cloud', 'Azure Cloud', 'Google Cloud'] },
  { name: 'DevOps', level: 'Master', keywords: ['Docker', 'Kubernetes'] },
]

describe('Skills', () => {
  it('renders each category name', () => {
    render(<Skills skills={skills} />)
    expect(screen.getByText('Cloud Computing')).toBeInTheDocument()
    expect(screen.getByText('DevOps')).toBeInTheDocument()
  })

  it('renders keywords', () => {
    render(<Skills skills={skills} />)
    expect(screen.getByText(/AWS Cloud/)).toBeInTheDocument()
    expect(screen.getByText(/Docker/)).toBeInTheDocument()
  })
})
