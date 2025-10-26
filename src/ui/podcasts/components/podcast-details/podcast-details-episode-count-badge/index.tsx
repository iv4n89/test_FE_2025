import styles from './podcast-details-episode-count-badge.module.css';

interface Props {
  count: number;
}

export const PodcastDetailsEpisodeCountBadge = ({ count }: Props) => {
  return (
    <div className={styles.podcast_details_episode_count_badge__container}>
      <span className={styles.podcast_details_episode_count_badge__label}>
        Episodes:
      </span>
      <span className={styles.podcast_details_episode_count_badge__count}>
        {count}
      </span>
    </div>
  );
};
