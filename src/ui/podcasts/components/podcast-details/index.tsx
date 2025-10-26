import type {
  ITunesEpisode,
  ItunesLookupResult,
} from '@/core/podcasts/models/itunes-response-model';
import styles from './podcast-details.module.css';
import { PodcastDescriptionCard } from '../podcast-description-card';
import { PodcastDetailsEpisodeCountBadge } from './podcast-details-episode-count-badge';
import { PodcastDetailsEpisodeTable } from './podcast-details-episode-table';

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
    <div className={styles.podcast_details__container}>
      <aside className={styles.podcast_details__sidebar}>
        <PodcastDescriptionCard
          author={info.artistName}
          description={description}
          image={{
            src: info.artworkUrl600,
            alt: info.collectionName,
          }}
          name={info.collectionName}
        />
      </aside>
      <section className={styles.podcast_details__main}>
        <PodcastDetailsEpisodeCountBadge count={info?.trackCount || 0} />
        <PodcastDetailsEpisodeTable
          episodes={episodes}
          podcastId={podcastId || ''}
        />
      </section>
    </div>
  );
};
