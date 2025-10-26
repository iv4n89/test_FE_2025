import { ShadowedBox } from '@/ui/common/components/shadowed-box/shadowed-box';
import { sanitizeString } from '@/ui/common/util/sanitize-string/sanitize-string';
import styles from './episode-card.module.css';

interface Props {
  name: string;
  description: string;
  audioUrl: string;
}

export const EpisodeCard = ({ audioUrl, description, name }: Props) => {
  return (
    <ShadowedBox className={styles.podcast_episode__container}>
      <div>
        <h2>{name}</h2>
        <div
          className={styles.podcast_episode__description}
          dangerouslySetInnerHTML={{ __html: sanitizeString(description) }}
        ></div>
      </div>
      <audio
        src={audioUrl}
        controls
        className={styles.podcast_episode__audio_player}
        data-testid="podcast-episode-audio-player"
      />
    </ShadowedBox>
  );
};
