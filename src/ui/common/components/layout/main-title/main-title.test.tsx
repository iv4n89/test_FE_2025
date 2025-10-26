import { MainTitle } from '@/ui/common/components/layout/main-title/main-title';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

describe('MainTitle', () => {
  it('renders the title text', () => {
    render(
      <MemoryRouter>
        <MainTitle />
      </MemoryRouter>
    );
    expect(screen.getByText('Podcaster')).toBeDefined();
  });

  it('renders a link to home', () => {
    render(
      <MemoryRouter>
        <MainTitle />
      </MemoryRouter>
    );
    const link = screen.getByTestId('main-title');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/');
  });
});
