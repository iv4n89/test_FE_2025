import { fetchWithCors } from '@/core/common/fetch-with-cors';
import type {
  ItunesDetailsResponse,
  ItunesLookupResponse,
  ItunesPopularResponse,
} from './models/itunes-response-model';

export const ItunesRepository = {
  url: `${import.meta.env.VITE_API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`,
  async getMostPopularPodcasts(): Promise<ItunesPopularResponse | undefined> {
    try {
      const response = await fetchWithCors<null, ItunesPopularResponse>({
        url: ItunesRepository.url,
        method: 'GET',
      });

      if (!response) throw new Error('No response from Itunes API');

      return response;
    } catch (error) {
      console.error(
        '%c[ItunesRepository] Error fetching most popular podcasts:',
        'color: red;',
        error
      );
    }
  },
  async getPodcastById(
    id: string
  ): Promise<ItunesDetailsResponse[] | undefined> {
    try {
      const response = await fetchWithCors<null, ItunesLookupResponse>({
        url: `${import.meta.env.VITE_API_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=1000`,
        method: 'GET',
      });

      if (!response || response.resultCount === 0) {
        throw new Error('No podcast found with the given ID');
      }

      return response.results;
    } catch (error) {
      console.error(
        '%c[ItunesRepository] Error fetching podcast by ID:',
        'color: red;',
        error
      );
    }
  },
};
