import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectChip } from '../project-chip';

describe('ProjectChip', () => {
  const baseProject = {
    name: 'Test Project',
    description: 'A test project description',
    techStack: ['React', 'Node.js'],
  };

  it('renders project name and description', () => {
    render(<ProjectChip project={baseProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('renders tech badges', () => {
    render(<ProjectChip project={baseProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders as link when linkedProjectSlug is provided', () => {
    const linked = { ...baseProject, linkedProjectSlug: 'test-slug' };
    render(<ProjectChip project={linked} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/projects/test-slug');
  });

  it('renders as div (no link) when no linkedProjectSlug', () => {
    render(<ProjectChip project={baseProject} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
