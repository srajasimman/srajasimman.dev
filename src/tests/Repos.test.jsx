import { render, screen } from '@testing-library/react'
import Repos from '../components/Repos.jsx'
import { describe, it, expect } from 'vitest'

const repos = [
  {
    name: 'self-host',
    description: 'Docker Compose configurations for self-hosting.',
    url: 'https://github.com/srajasimman/self-host',
    tags: ['docker', 'self-hosting'],
  },
  {
    name: 'terraform-aws-github-oidc-iam',
    description: 'Terraform module for GitHub OIDC with AWS IAM.',
    url: 'https://github.com/srajasimman/terraform-aws-github-oidc-iam',
    tags: ['terraform', 'aws'],
  },
]

describe('Repos', () => {
  it('renders all repo names', () => {
    render(<Repos repos={repos} />)
    expect(screen.getByText('self-host')).toBeInTheDocument()
    expect(screen.getByText('terraform-aws-github-oidc-iam')).toBeInTheDocument()
  })

  it('renders repo descriptions', () => {
    render(<Repos repos={repos} />)
    expect(screen.getByText(/Docker Compose configurations/)).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<Repos repos={repos} />)
    expect(screen.getByText('docker')).toBeInTheDocument()
    expect(screen.getByText('terraform')).toBeInTheDocument()
  })
})
