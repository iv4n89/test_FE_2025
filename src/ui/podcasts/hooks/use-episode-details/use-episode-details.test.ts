import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { useEpisodeDetails } from './index';
import { usePodcastDetails } from '../use-podcast-details';
import { usePopularPodcasts } from '../use-popular-podcasts';

vi.mock('../use-podcast-details', () => ({
  usePodcastDetails: vi.fn(),
}));

vi.mock('../use-popular-podcasts', () => ({
  usePopularPodcasts: vi.fn(),
}));

describe('useEpisodeDetails', () => {
  const mockPodcastId = '12345';
  const mockEpisodeId = '2';
  const mockPodcastDescription = 'Mock Podcast Description';
  const mockEpisode = {
    kind: 'podcast-episode',
    trackId: 2,
    trackName: 'Episode 1',
  };
  const mockPodcastInfo = {
    kind: 'podcast',
    trackId: 1,
    trackName: 'Podcast 1',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (usePopularPodcasts as Mock).mockReturnValue({
      getPodcastDescriptionById: vi.fn(() => mockPodcastDescription),
    });

    (usePodcastDetails as Mock).mockReturnValue({
      findEpisodeById: vi.fn(() => mockEpisode),
      info: mockPodcastInfo,
    });
  });

  it('should return episode details, podcast info, and description', () => {
    const { result } = renderHook(() =>
      useEpisodeDetails({ podcastId: mockPodcastId, episodeId: mockEpisodeId })
    );

    expect(result.current).toEqual({
      description: mockPodcastDescription,
      episode: mockEpisode,
      info: mockPodcastInfo,
    });
  });

  it('should return undefined for episode if episode ID is not found', () => {
    (usePodcastDetails as Mock).mockReturnValue({
      findEpisodeById: vi.fn(() => undefined),
      info: mockPodcastInfo,
    });

    const { result } = renderHook(() =>
      useEpisodeDetails({ podcastId: mockPodcastId, episodeId: '999' })
    );

    expect(result.current.episode).toBeUndefined();
    expect(result.current.info).toEqual(mockPodcastInfo);
    expect(result.current.description).toEqual(mockPodcastDescription);
  });

  it('should handle missing podcast description gracefully', () => {
    (usePopularPodcasts as Mock).mockReturnValue({
      getPodcastDescriptionById: vi.fn(() => undefined),
    });

    const { result } = renderHook(() =>
      useEpisodeDetails({ podcastId: mockPodcastId, episodeId: mockEpisodeId })
    );

    expect(result.current.description).toBeUndefined();
    expect(result.current.episode).toEqual(mockEpisode);
    expect(result.current.info).toEqual(mockPodcastInfo);
  });

  it('should handle invalid podcast ID gracefully', () => {
    (usePodcastDetails as Mock).mockReturnValue({
      findEpisodeById: vi.fn(() => undefined),
      info: undefined,
    });

    const { result } = renderHook(() =>
      useEpisodeDetails({ podcastId: 'invalid-id', episodeId: mockEpisodeId })
    );

    expect(result.current.description).toEqual(mockPodcastDescription);
    expect(result.current.episode).toBeUndefined();
    expect(result.current.info).toBeUndefined();
  });
});
