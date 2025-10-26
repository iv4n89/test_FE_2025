import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ItunesRepository } from '@/core/podcasts/itunes-repository';
import { fetchWithCors } from '@/core/common/fetch-with-cors';
import type {
  ItunesLookupResponse,
  ItunesPopularResponse,
} from '@/core/podcasts/models/itunes-response-model';

vi.mock('@/core/common/fetch-with-cors');

describe('ItunesRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('getMostPopularPodcasts', () => {
    it('should fetch most popular podcasts successfully', async () => {
      const mockResponse: ItunesPopularResponse = {
        feed: {
          entry: [
            { id: { attributes: { 'im:id': '1' } } },
            { id: { attributes: { 'im:id': '2' } } },
          ],
        },
      } as ItunesPopularResponse;

      vi.mocked(fetchWithCors).mockResolvedValue(mockResponse);

      const result = await ItunesRepository.getMostPopularPodcasts();

      expect(result).toEqual(mockResponse);
      expect(fetchWithCors).toHaveBeenCalledWith({
        url: `${import.meta.env.VITE_API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`,
        method: 'GET',
      });
    });

    it('should handle errors when fetching most popular podcasts', async () => {
      const error = new Error('Network error');
      vi.mocked(fetchWithCors).mockRejectedValue(error);

      await expect(ItunesRepository.getMostPopularPodcasts()).rejects.toThrow(
        error
      );

      expect(console.error).toHaveBeenCalledWith(
        '%c[ItunesRepository] Error fetching most popular podcasts:',
        'color: red;',
        error
      );
    });
  });

  describe('getPodcastById', () => {
    it('should fetch podcast by ID successfully', async () => {
      const mockResponse: ItunesLookupResponse = {
        resultCount: 1,
        results: [{ trackId: 123, collectionName: 'Test Podcast' }],
      } as ItunesLookupResponse;

      vi.mocked(fetchWithCors).mockResolvedValue(mockResponse);

      const result = await ItunesRepository.getPodcastById('123');

      expect(result).toEqual(mockResponse.results);
      expect(fetchWithCors).toHaveBeenCalledWith({
        url: `${import.meta.env.VITE_API_URL}/lookup?id=123&media=podcast&entity=podcastEpisode&limit=1000`,
        method: 'GET',
      });
    });

    it('should handle errors when fetching podcast by ID', async () => {
      const error = new Error('Not found');
      vi.mocked(fetchWithCors).mockRejectedValue(error);

      await expect(ItunesRepository.getPodcastById('999')).rejects.toThrow(
        error
      );

      expect(console.error).toHaveBeenCalledWith(
        '%c[ItunesRepository] Error fetching podcast by ID:',
        'color: red;',
        error
      );
    });
  });
});
