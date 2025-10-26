import type {
  ITunesEpisode,
  ItunesLookupResult,
} from '@/core/podcasts/models/itunes-response-model';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PodcastDetails } from './podcast-details';

vi.mock('../details-container/details-container', () => ({
  DetailsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="details-container">{children}</div>
  ),
}));

vi.mock('../description-card/description-card', () => ({
  DescriptionCard: ({
    data,
    description,
  }: {
    data: unknown;
    description: string;
  }) => (
    <div data-testid="description-card">
      {JSON.stringify(data)} - {description}
    </div>
  ),
}));

vi.mock('./count-badge/count-badge', () => ({
  CountBadge: ({ count }: { count: number }) => (
    <div data-testid="count-badge">{count}</div>
  ),
}));

vi.mock('./episode-table/episode-table', () => ({
  EpisodeTable: ({
    episodes,
    podcastId,
  }: {
    episodes: unknown[];
    podcastId: string;
  }) => (
    <div data-testid="episode-table">
      {JSON.stringify(episodes)} - {podcastId}
    </div>
  ),
}));

describe('PodcastDetails', () => {
  const mockProps = {
    info: { trackCount: 10 } as ItunesLookupResult,
    description: 'Sample description',
    episodes: [
      {
        trackId: 1,
        trackName: 'Episode 1',
        artworkUrl600: '',
        collectionId: 1,
        collectionName: '',
        description: '',
        kind: '',
        releaseDate: '',
        trackTimeMillis: 0,
      },
    ] as ITunesEpisode[],
    podcastId: '123',
  };

  it('renders DetailsContainer', () => {
    render(<PodcastDetails {...mockProps} />);
    expect(screen.getByTestId('details-container')).toBeDefined();
  });

  it('renders DescriptionCard', () => {
    render(<PodcastDetails {...mockProps} />);
    const descriptionCard = screen.getByTestId('description-card');
    expect(descriptionCard).toBeDefined();
  });

  it('renders CountBadge', () => {
    render(<PodcastDetails {...mockProps} />);
    const countBadge = screen.getByTestId('count-badge');
    expect(countBadge).toBeDefined();
  });

  it('renders EpisodeTable', () => {
    render(<PodcastDetails {...mockProps} />);
    const episodeTable = screen.getByTestId('episode-table');
    expect(episodeTable).toBeDefined();
  });
});
