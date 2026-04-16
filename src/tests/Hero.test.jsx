import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero.jsx'
import { describe, it, expect } from 'vitest'

const basics = {
  name: 'Rajasimman S',
  label: 'Cloud and DevOps Solutions Specialist',
  email: 'srajasimman@gmail.com',
  profiles: [
    { network: 'LinkedIn', url: 'https://linkedin.com/in/rajasimman-sha' },
    { network: 'Github', url: 'https://github.com/srajasimman' },
  ],
}

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero basics={basics} />)
    expect(screen.getByText('Rajasimman S')).toBeInTheDocument()
  })

  it('renders the terminal accent line', () => {
    render(<Hero basics={basics} />)
    expect(screen.getByText(/Specializing in/i)).toBeInTheDocument()
  })

  it('renders View Projects link', () => {
    render(<Hero basics={basics} />)
    expect(screen.getByText(/View Projects/i)).toBeInTheDocument()
  })

  it('renders Contact link', () => {
    render(<Hero basics={basics} />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
