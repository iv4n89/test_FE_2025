import { useParams } from 'react-router-dom';
import { PodcastDescriptionCard } from '../components/podcast-description-card';
import { PodcastDetailsContainer } from '../components/podcast-details-container';
import { useEpisodeDetails } from '../hooks/use-episode-details';

export default function Episode() {
  const { episodeId, podcastId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();

  const { description, info } = useEpisodeDetails({
    episodeId: episodeId ?? '',
    podcastId: podcastId ?? '',
  });

  if (!episodeId || !podcastId) {
    return;
  }

  return (
    <PodcastDetailsContainer testid="episode-details">
      <PodcastDescriptionCard
        data={info}
        description={description || ''}
        isLinksActive
      />
    </PodcastDetailsContainer>
  );
}
