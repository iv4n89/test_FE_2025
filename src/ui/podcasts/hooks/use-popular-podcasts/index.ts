import { getPopularPodcasts } from '@/core/podcasts/itunes-service';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PODCAST_QUERIES } from '../../consts/queries';

export const usePopularPodcasts = () => {
  const query = useSuspenseQuery({
    queryKey: [PODCAST_QUERIES.POPULAR],
    queryFn: () => getPopularPodcasts(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const getPodcastDescriptionById = (id: string) => {
    return query.data?.feed?.entry.find(
      (podcast) => podcast.id.attributes['im:id'] === id
    )?.summary.label;
  };

  return {
    data: query.data?.feed.entry || [],
    getPodcastDescriptionById,
  };
};
