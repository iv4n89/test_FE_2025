import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PopularCard } from '@/ui/podcasts/components/popular-card';

describe('PopularCard', () => {
  const defaultProps = {
    title: 'Test Podcast',
    image: {
      src: 'test-image.jpg',
      alt: 'Test Image Alt',
    },
    author: 'Test Author',
    id: '123',
  };

  it('renders all content correctly', () => {
    render(
      <MemoryRouter>
        <PopularCard {...defaultProps} testid="card" />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Podcast')).toBeDefined();
    expect(screen.getByText('Test Author')).toBeDefined();

    const img = screen.getByTestId('card').querySelector('img');
    expect(img?.getAttribute('src')).toBe('test-image.jpg');
    expect(img?.getAttribute('alt')).toBe('Test Image Alt');
  });

  it('renders link with correct href', () => {
    render(
      <MemoryRouter>
        <PopularCard {...defaultProps} testid="card" />
      </MemoryRouter>
    );

    const link = screen.getByTestId('card');
    expect(link?.getAttribute('href')).toBe('/podcast/123');
  });
});
