import { useSuspenseQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { usePopularPodcasts } from '../use-popular-podcasts/use-popular-podcasts';
import { usePodcastDetails } from './use-podcast-details';

vi.mock('@tanstack/react-query', () => ({
  useSuspenseQuery: vi.fn(),
}));

vi.mock('../use-popular-podcasts/use-popular-podcasts', () => ({
  usePopularPodcasts: vi.fn(),
}));

vi.mock('@/core/podcasts/itunes-service', () => ({
  getPodcastDetails: vi.fn(),
}));

describe('usePodcastDetails', () => {
  const mockPodcastId = '12345';
  const mockPodcastDescription = 'Mock Podcast Description';
  const mockQueryData = [
    {
      kind: 'podcast',
      trackId: 1,
      trackName: 'Podcast 1',
    },
    {
      kind: 'podcast-episode',
      trackId: 2,
      trackName: 'Episode 1',
    },
    {
      kind: 'podcast-episode',
      trackId: 3,
      trackName: 'Episode 2',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    (usePopularPodcasts as Mock).mockReturnValue({
      getPodcastDescriptionById: vi.fn(() => mockPodcastDescription),
    });

    (useSuspenseQuery as Mock).mockReturnValue({
      data: mockQueryData,
    });
  });

  it('should return podcast info with description', () => {
    const { result } = renderHook(() => usePodcastDetails(mockPodcastId));

    expect(result.current.info).toEqual({
      kind: 'podcast',
      trackId: 1,
      trackName: 'Podcast 1',
      description: mockPodcastDescription,
    });
  });

  it('should return a list of episodes', () => {
    const { result } = renderHook(() => usePodcastDetails(mockPodcastId));

    expect(result.current.episodes).toEqual([
      {
        kind: 'podcast-episode',
        trackId: 2,
        trackName: 'Episode 1',
      },
      {
        kind: 'podcast-episode',
        trackId: 3,
        trackName: 'Episode 2',
      },
    ]);
  });

  it('should find an episode by ID', () => {
    const { result } = renderHook(() => usePodcastDetails(mockPodcastId));

    const episode = result.current.findEpisodeById('2');
    expect(episode).toEqual({
      kind: 'podcast-episode',
      trackId: 2,
      trackName: 'Episode 1',
    });
  });

  it('should return undefined if episode ID is not found', () => {
    const { result } = renderHook(() => usePodcastDetails(mockPodcastId));

    const episode = result.current.findEpisodeById('999');
    expect(episode).toBeUndefined();
  });

  it('should handle empty query data gracefully', () => {
    (useSuspenseQuery as Mock).mockReturnValue({
      data: [],
    });

    const { result } = renderHook(() => usePodcastDetails(mockPodcastId));

    expect(result.current.info).toEqual({
      description: mockPodcastDescription,
    });
    expect(result.current.episodes).toEqual([]);
  });

  it('should handle missing podcast description gracefully', () => {
    (usePopularPodcasts as Mock).mockReturnValue({
      getPodcastDescriptionById: vi.fn(() => undefined),
    });

    const { result } = renderHook(() => usePodcastDetails(mockPodcastId));

    expect(result.current.info).toEqual({
      kind: 'podcast',
      trackId: 1,
      trackName: 'Podcast 1',
      description: undefined,
    });
  });

  it('should handle invalid podcast ID gracefully', () => {
    (useSuspenseQuery as Mock).mockReturnValue({
      data: null,
    });

    const { result } = renderHook(() => usePodcastDetails('invalid-id'));

    expect(result.current.info).toEqual({
      description: mockPodcastDescription,
    });
    expect(result.current.episodes).toEqual([]);
  });
});
