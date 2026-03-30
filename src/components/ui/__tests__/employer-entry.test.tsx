import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmployerEntry } from '../employer-entry';

const mockJob = {
  company: 'Test Corp',
  role: 'Senior Developer',
  startDate: '2024',
  responsibilities: ['Built APIs', 'Led team'],
  techStack: ['React', 'Node.js'],
  outcomeMetric: 'Shipped 5 products',
  projects: [
    { name: 'Project A', description: 'A project', techStack: ['React'] },
    { name: 'Project B', description: 'B project', techStack: ['Node.js'] },
  ],
};

describe('EmployerEntry', () => {
  it('renders company name and role', () => {
    render(<EmployerEntry job={mockJob} isCurrent={true} defaultExpanded={false} />);
    expect(screen.getByText('Test Corp')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
  });

  it('renders outcome metric', () => {
    render(<EmployerEntry job={mockJob} isCurrent={true} defaultExpanded={false} />);
    expect(screen.getByText('Shipped 5 products')).toBeInTheDocument();
  });

  it('starts expanded when defaultExpanded is true', () => {
    render(<EmployerEntry job={mockJob} isCurrent={true} defaultExpanded={true} />);
    expect(screen.getByText('Built APIs')).toBeInTheDocument();
    expect(screen.getByText('Project A')).toBeInTheDocument();
  });

  it('starts collapsed when defaultExpanded is false', () => {
    render(<EmployerEntry job={mockJob} isCurrent={false} defaultExpanded={false} />);
    expect(screen.queryByText('Built APIs')).not.toBeInTheDocument();
  });

  it('toggles on click', () => {
    render(<EmployerEntry job={mockJob} isCurrent={false} defaultExpanded={false} />);
    expect(screen.queryByText('Built APIs')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Built APIs')).toBeInTheDocument();
  });
});
