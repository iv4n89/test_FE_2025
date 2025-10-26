import { useParams } from 'react-router-dom';
import { DescriptionCard } from '../components/description-card/description-card';
import { DetailsContainer } from '../components/details-container/details-container';
import { EpisodeCard } from '../components/episode-card/episode-card';
import { useEpisodeDetails } from '../hooks/use-episode-details/use-episode-details';

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
    <DetailsContainer testid="episode-details">
      <DescriptionCard
        data={info}
        description={description || ''}
        isLinksActive
      />
      <EpisodeCard
        name={episode?.trackName || ''}
        description={episode?.description || ''}
        audioUrl={episode?.episodeUrl || ''}
      />
    </DetailsContainer>
  );
}
