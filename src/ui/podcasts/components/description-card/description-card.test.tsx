import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { DescriptionCard } from './description-card';
import type { ItunesLookupResult } from '@/core/podcasts/models/itunes-response-model';

describe('PodcastDescriptionCard', () => {
  const mockData: ItunesLookupResult = {
    collectionId: 12345,
    collectionName: 'Test Podcast',
    artistName: 'Test Author',
    artworkUrl600: 'http://example.com/image.jpg',
  } as ItunesLookupResult;

  it('renders podcast details correctly', () => {
    render(
      <MemoryRouter>
        <DescriptionCard
          data={mockData}
          description="This is a test description."
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Podcast')).toBeDefined();
    expect(screen.getByText('by Test Author')).toBeDefined();
    expect(screen.getByText('Description:')).toBeDefined();
    expect(screen.getByText('This is a test description.')).toBeDefined();
    expect(screen.getByAltText('Test Podcast').getAttribute('src')).toBe(
      'http://example.com/image.jpg'
    );
  });

  it('renders links when isLinksActive is true', () => {
    render(
      <MemoryRouter>
        <DescriptionCard
          data={mockData}
          description="This is a test description."
          isLinksActive={true}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Test Podcast').closest('a')?.getAttribute('href')
    ).toBe('/podcast/12345');
    expect(
      screen.getByText('by Test Author').closest('a')?.getAttribute('href')
    ).toBe('/podcast/12345');
    expect(
      screen.getByAltText('Test Podcast').closest('a')?.getAttribute('href')
    ).toBe('/podcast/12345');
  });

  it('does not render links when isLinksActive is false', () => {
    render(
      <MemoryRouter>
        <DescriptionCard
          data={mockData}
          description="This is a test description."
          isLinksActive={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Podcast').closest('a')).toBeNull();
    expect(screen.getByText('by Test Author').closest('a')).toBeNull();
    expect(screen.getByAltText('Test Podcast').closest('a')).toBeNull();
  });

  it('applies testid if provided', () => {
    render(
      <MemoryRouter>
        <DescriptionCard
          data={mockData}
          description="This is a test description."
          testid="podcast-card"
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('podcast-card')).toBeDefined();
  });
});
