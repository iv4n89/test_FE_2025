import { useParams } from 'react-router-dom';
import { PodcastDescriptionCard } from '../components/podcast-description-card';
import { PodcastDetailsContainer } from '../components/podcast-details-container';
import { PodcastEpisode } from '../components/podcast-episode';
import { useEpisodeDetails } from '../hooks/use-episode-details';

export default function Episode() {
  const { episodeId, podcastId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();

  const { description, episode, info } = useEpisodeDetails({
    episodeId: episodeId ?? '',
    podcastId: podcastId ?? '',
  });

  if (!episodeId || !podcastId) {
    return null;
  }

  return (
    <PodcastDetailsContainer testid="episode-details">
      <PodcastDescriptionCard
        data={info}
        description={description || ''}
        isLinksActive
      />
      <PodcastEpisode
        name={episode?.trackName || ''}
        description={episode?.description || ''}
        audioUrl={episode?.episodeUrl || ''}
      />
    </PodcastDetailsContainer>
  );
}
