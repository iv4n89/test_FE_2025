import type {
  ITunesEpisode,
  ItunesLookupResult,
} from '@/core/podcasts/models/itunes-response-model';
import { DescriptionCard } from '../description-card/description-card';
import { DetailsContainer } from '../details-container/details-container';
import { CountBadge } from './count-badge/count-badge';
import { EpisodeTable } from './episode-table/episode-table';
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
    <DetailsContainer data-testid="podcast-details">
      <aside className={styles.podcast_details__sidebar}>
        <DescriptionCard data={info} description={description} />
      </aside>
      <section className={styles.podcast_details__main}>
        <CountBadge count={info?.trackCount || 0} />
        <EpisodeTable episodes={episodes} podcastId={podcastId} />
      </section>
    </DetailsContainer>
  );
};
