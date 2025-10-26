import { Link } from 'react-router-dom';
import styles from './podcast-details-episode-table.module.css';
import { formatDate } from '@/ui/common/util/format-date';
import { formatDuration } from '@/ui/common/util/format-duration';
import { ShadowedBox } from '@/ui/common/components/shadowed-box';

interface Props {
  episodes: Episode[];
  podcastId: string;
}

export const PodcastDetailsEpisodeTable = ({ episodes, podcastId }: Props) => {
  return (
    <ShadowedBox>
      <table className={styles.podcast_details_episode_table}>
        <thead>
          <tr className={styles.podcast_details_episode_table__header}>
            <th className={styles.podcast_details_episode_table__headerCell}>
              Title
            </th>
            <th className={styles.podcast_details_episode_table__headerCell}>
              Date
            </th>
            <th className={styles.podcast_details_episode_table__headerCell}>
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode, index) => (
            <tr
              key={episode.trackId}
              className={
                index % 2 === 0
                  ? styles.podcast_details_episode_table__rowEven
                  : styles.podcast_details_episode_table__rowOdd
              }
            >
              <td className={styles.podcast_details_episode_table__cell}>
                <Link
                  to={`/podcast/${podcastId}/episode/${episode.trackId}`}
                  className={styles.podcast_details_episode_table__link}
                >
                  {episode.trackName}
                </Link>
              </td>
              <td className={styles.podcast_details_episode_table__cell}>
                {formatDate(episode.releaseDate)}
              </td>
              <td className={styles.podcast_details_episode_table__cell}>
                {formatDuration(episode.trackTimeMillis)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ShadowedBox>
  );
};
