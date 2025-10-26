import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPopularPodcasts, getPodcastDetails } from './itunes-service';
import { ItunesRepository } from './itunes-repository';
import type {
  ItunesLookupResponse,
  ItunesPopularResponse,
} from './models/itunes-response-model';

vi.mock('./itunes-repository');

describe('itunes-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPopularPodcasts', () => {
    it('should fetch popular podcasts successfully', async () => {
      const mockPodcasts = {
        feed: {
          entry: [
            { id: { attributes: { 'im:id': '1' } } },
            { id: { attributes: { 'im:id': '2' } } },
          ],
        },
      } as ItunesPopularResponse;

      vi.mocked(ItunesRepository.getMostPopularPodcasts).mockResolvedValue(
        mockPodcasts
      );

      const result = await getPopularPodcasts();

      expect(result).toEqual(mockPodcasts);
      expect(ItunesRepository.getMostPopularPodcasts).toHaveBeenCalledOnce();
    });

    it('should propagate errors from repository', async () => {
      const error = new Error('Failed to fetch podcasts');
      vi.mocked(ItunesRepository.getMostPopularPodcasts).mockRejectedValue(
        error
      );

      await expect(getPopularPodcasts()).rejects.toThrow(
        'Failed to fetch podcasts'
      );
      expect(ItunesRepository.getMostPopularPodcasts).toHaveBeenCalledOnce();
    });
  });

  describe('getPodcastDetails', () => {
    it('should fetch podcast details by id successfully', async () => {
      const mockPodcast = {
        resultCount: 1,
        results: [{ trackId: 123, collectionName: 'Test Podcast' }],
      } as ItunesLookupResponse;

      vi.mocked(ItunesRepository.getPodcastById).mockResolvedValue(
        mockPodcast.results
      );

      const result = await getPodcastDetails('123');

      expect(result).toEqual(mockPodcast.results);
      expect(ItunesRepository.getPodcastById).toHaveBeenCalledWith('123');
      expect(ItunesRepository.getPodcastById).toHaveBeenCalledOnce();
    });

    it('should propagate errors from repository', async () => {
      const error = new Error('Podcast not found');
      vi.mocked(ItunesRepository.getPodcastById).mockRejectedValue(error);

      await expect(getPodcastDetails('999')).rejects.toThrow(
        'Podcast not found'
      );
      expect(ItunesRepository.getPodcastById).toHaveBeenCalledWith('999');
    });
  });
});
