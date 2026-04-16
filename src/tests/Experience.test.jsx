import { render, screen } from '@testing-library/react'
import Experience from '../components/Experience.jsx'
import { describe, it, expect } from 'vitest'

const work = [
  {
    name: 'Akkodis India Pvt. Ltd.',
    position: 'Cloud & DevOps Architect',
    location: 'Bangalore, India',
    startDate: '2024-10-01',
    endDate: '2025-06',
    highlights: ['Led cloud infrastructure design', 'Implemented SRE practices'],
  },
  {
    name: 'Opt IT Technologies',
    position: 'Team Lead - SRE',
    location: 'Bangalore',
    startDate: '2021-08-16',
    endDate: '2024-09-30',
    highlights: ['Led SRE team'],
  },
]

describe('Experience', () => {
  it('renders all company names', () => {
    render(<Experience work={work} />)
    expect(screen.getByText('Akkodis India Pvt. Ltd.')).toBeInTheDocument()
    expect(screen.getByText('Opt IT Technologies')).toBeInTheDocument()
  })

  it('renders all role titles', () => {
    render(<Experience work={work} />)
    expect(screen.getByText('Cloud & DevOps Architect')).toBeInTheDocument()
    expect(screen.getByText('Team Lead - SRE')).toBeInTheDocument()
  })
})
