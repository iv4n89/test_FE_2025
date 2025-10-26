import { usePodcastDetails } from '../use-podcast-details/use-podcast-details';
import { usePopularPodcasts } from '../use-popular-podcasts/use-popular-podcasts';

interface Props {
  podcastId: string;
  episodeId: string;
}

export const useEpisodeDetails = ({ episodeId, podcastId }: Props) => {
  const { getPodcastDescriptionById } = usePopularPodcasts();
  const { findEpisodeById, info } = usePodcastDetails(podcastId);

  const description = getPodcastDescriptionById(podcastId);
  const episode = findEpisodeById(episodeId);

  return {
    description,
    episode,
    info,
  };
};
