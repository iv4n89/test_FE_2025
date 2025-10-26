import { getPodcastDetails } from '@/core/podcasts/itunes-service';
import type { ItunesLookupResult } from '@/core/podcasts/models/itunes-response-model';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { PODCAST_QUERIES } from '../../consts/queries';
import { usePopularPodcasts } from '../use-popular-podcasts';

export const usePodcastDetails = (podcastId: string) => {
  const { getPodcastDescriptionById } = usePopularPodcasts();

  const query = useSuspenseQuery({
    queryKey: [PODCAST_QUERIES.DETAILS, podcastId],
    queryFn: () => getPodcastDetails(podcastId),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const info = React.useMemo(() => {
    return query.data?.at(0) as ItunesLookupResult;
  }, [query.data]);

  const episodes = React.useMemo(() => {
    return (
      query.data?.filter((podcast) => podcast.kind === 'podcast-episode') || []
    );
  }, [query.data]);

  const findEpisodeById = React.useCallback(
    (id: string) => episodes.find((e) => e.trackId === parseInt(id)),
    [episodes]
  );

  return {
    info: {
      ...info,
      description: getPodcastDescriptionById(podcastId),
    },
    episodes,
    findEpisodeById,
  };
};
