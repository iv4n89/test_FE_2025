import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, type Mock } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PodcastDetail } from './podcast-detail';
import { usePodcastDetails } from '../hooks/use-podcast-details/use-podcast-details';

// Mock the usePodcastDetails hook
vi.mock('../hooks/use-podcast-details', () => ({
  usePodcastDetails: vi.fn(),
}));

describe('PodcastDetail', () => {
  it('renders null when info is not available', () => {
    (usePodcastDetails as Mock).mockReturnValue({
      info: null,
      episodes: [],
    });

    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('podcast-details')).toBeNull();
  });

  it('renders PodcastDetails with correct props when info is available', () => {
    const mockInfo = { title: 'Test Podcast', description: 'Test Description' };
    const mockEpisodes = [{ id: 1, title: 'Episode 1' }];

    (usePodcastDetails as Mock).mockReturnValue({
      info: mockInfo,
      episodes: mockEpisodes,
    });

    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(mockInfo.description)).toBeDefined();
  });
});
