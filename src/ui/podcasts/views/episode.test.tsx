import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Episode from './episode';
import { useEpisodeDetails } from '../hooks/use-episode-details/use-episode-details';

vi.mock('../hooks/use-episode-details', () => ({
  useEpisodeDetails: vi.fn(),
}));

describe('Episode', () => {
  it('renders episode details when data is available', () => {
    (useEpisodeDetails as Mock).mockReturnValue({
      description: 'Episode description',
      episode: {
        trackName: 'Episode 1',
        description: 'This is the first episode',
        episodeUrl: 'http://example.com/audio.mp3',
      },
      info: { collectionName: 'Podcast Title', artistName: 'Author Name' },
    });

    render(
      <MemoryRouter initialEntries={['/podcast/1/episode/2']}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<Episode />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('episode-details')).toBeDefined();
    expect(screen.getByText('Podcast Title')).toBeDefined();
    expect(screen.getByText('Episode description')).toBeDefined();
    expect(screen.getByText('Episode 1')).toBeDefined();
    expect(screen.getByText('This is the first episode')).toBeDefined();
  });

  it('does not render when episodeId or podcastId is missing', () => {
    (useEpisodeDetails as Mock).mockReturnValue({
      description: '',
      episode: null,
      info: null,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/podcast/1/episode/']}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<Episode />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });
});
