import { Link } from 'react-router-dom';
import styles from './podcast-details-episode-table.module.css';

interface Props {
  episodes: Episode[];
  podcastId: string;
}

export const PodcastDetailsEpisodeTable = ({ episodes, podcastId }: Props) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.podcast_details_episode_table__container}>
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
    </div>
  );
};
