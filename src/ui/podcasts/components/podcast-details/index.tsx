import type {
  ITunesEpisode,
  ItunesLookupResult,
} from '@/core/podcasts/models/itunes-response-model';
import { PodcastDescriptionCard } from '../podcast-description-card';
import { PodcastDetailsContainer } from '../podcast-details-container';
import { PodcastDetailsEpisodeCountBadge } from './podcast-details-episode-count-badge';
import { PodcastDetailsEpisodeTable } from './podcast-details-episode-table';
import styles from './podcast-details.module.css';

interface Props {
  info: ItunesLookupResult;
  description: string;
  episodes: ITunesEpisode[];
  podcastId: string;
}

export const PodcastDetails = ({
  episodes,
  info,
  podcastId,
  description,
}: Props) => {
  return (
    <PodcastDetailsContainer data-testid="podcast-details">
      <aside className={styles.podcast_details__sidebar}>
        <PodcastDescriptionCard data={info} description={description} />
      </aside>
      <section className={styles.podcast_details__main}>
        <PodcastDetailsEpisodeCountBadge count={info?.trackCount || 0} />
        <PodcastDetailsEpisodeTable episodes={episodes} podcastId={podcastId} />
      </section>
    </PodcastDetailsContainer>
  );
};
