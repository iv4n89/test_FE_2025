import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EpisodeTable } from './episode-table';

vi.mock('@/ui/common/components/shadowed-box/shadowed-box', () => ({
  ShadowedBox: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="shadowed-box">{children}</div>
  ),
}));

vi.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} data-testid="link">
      {children}
    </a>
  ),
}));

vi.mock('@/ui/common/util/format-date/format-date', () => ({
  formatDate: vi.fn((date: string) => `FormattedDate(${date})`),
}));

vi.mock('@/ui/common/util/format-duration/format-duration', () => ({
  formatDuration: vi.fn((duration: number) => `FormattedDuration(${duration})`),
}));

describe('EpisodeTable', () => {
  const mockEpisodes = [
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
    {
      trackId: 2,
      trackName: 'Episode 2',
      artworkUrl600: '',
      collectionId: 2,
      collectionName: '',
      description: '',
      kind: '',
      releaseDate: '',
      trackTimeMillis: 0,
    },
  ];

  const podcastId = '123';

  it('renders ShadowedBox component', () => {
    render(<EpisodeTable episodes={mockEpisodes} podcastId={podcastId} />);
    expect(screen.getByTestId('shadowed-box')).toBeDefined();
  });

  it('renders table headers', () => {
    render(<EpisodeTable episodes={mockEpisodes} podcastId={podcastId} />);
    expect(screen.getByText('Title')).toBeDefined();
    expect(screen.getByText('Date')).toBeDefined();
    expect(screen.getByText('Duration')).toBeDefined();
  });

  it('renders episodes in rows', () => {
    render(<EpisodeTable episodes={mockEpisodes} podcastId={podcastId} />);
    mockEpisodes.forEach((episode) => {
      expect(screen.getByText(episode.trackName)).toBeDefined();
      expect(
        screen.getAllByText(`FormattedDate(${episode.releaseDate})`)?.[0]
      ).toBeDefined();
      expect(
        screen.getAllByText(
          `FormattedDuration(${episode.trackTimeMillis})`
        )?.[0]
      ).toBeDefined();
    });
  });

  it('renders links for each episode', () => {
    render(<EpisodeTable episodes={mockEpisodes} podcastId={podcastId} />);
    mockEpisodes.forEach((episode) => {
      const link = screen.getByText(episode.trackName).closest('a');
      expect(link?.getAttribute('href')).toBe(
        `/podcast/${podcastId}/episode/${episode.trackId}`
      );
    });
  });
});
