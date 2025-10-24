import { useQuery } from '@tanstack/react-query';
import { PODCAST_QUERIES } from '../../consts/queries';
import { getPopularPodcasts } from '@/core/podcasts/itunes-service';

export const usePopularPodcasts = () => {
  const query = useQuery({
    queryKey: [PODCAST_QUERIES.POPULAR],
    queryFn: () => getPopularPodcasts(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return query.data ? { popularPodcasts: query.data } : { popularPodcasts: [] };
};
