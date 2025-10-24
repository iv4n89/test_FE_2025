import { fetchWithCors } from '@/core/common/fetch-with-cors';
import type {
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

      return response;
    } catch (error) {
      console.error(
        '%c[ItunesRepository] Error fetching most popular podcasts:',
        'color: red;',
        error
      );
    }
  },
  async getPodcastById(id: string): Promise<ItunesLookupResponse | undefined> {
    try {
      const response = await fetchWithCors<null, ItunesLookupResponse>({
        url: `${import.meta.env.VITE_API_URL}/lookup?id=${id}`,
        method: 'GET',
      });

      return response;
    } catch (error) {
      console.error(
        '%c[ItunesRepository] Error fetching podcast by ID:',
        'color: red;',
        error
      );
    }
  },
};
