import { render, screen } from '@testing-library/react'
import Projects from '../components/Projects.jsx'
import { describe, it, expect } from 'vitest'

const projects = [
  {
    name: 'iGOT Karmayogi Bharat | NIC Govt of India',
    startDate: '2023-06-01',
    description: 'Managed SRE and DevOps functions.',
    highlights: ['Led infra', 'Improved monitoring'],
    url: 'https://igotkarmayogi.gov.in/',
  },
  {
    name: 'DIKSHA | NCERT Govt. of India',
    startDate: '2021-08-16',
    endDate: '2023-05-31',
    description: 'Led SRE and DevOps teams.',
    highlights: ['Automated infra'],
    url: 'https://diksha.gov.in/',
  },
]

describe('Projects', () => {
  it('renders all project names', () => {
    render(<Projects projects={projects} />)
    expect(screen.getByText(/iGOT Karmayogi/)).toBeInTheDocument()
    expect(screen.getByText(/DIKSHA/)).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<Projects projects={projects} />)
    expect(screen.getByText(/Managed SRE and DevOps/)).toBeInTheDocument()
  })
})
