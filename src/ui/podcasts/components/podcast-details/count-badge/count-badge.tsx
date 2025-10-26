import { ShadowedBox } from '@/ui/common/components/shadowed-box/shadowed-box';
import styles from './count-badge.module.css';

interface Props {
  count: number;
}

export const CountBadge = ({ count }: Props) => {
  return (
    <ShadowedBox
      className={styles.podcast_details_episode_count_badge__container}
    >
      <span className={styles.podcast_details_episode_count_badge__label}>
        Episodes:
      </span>
      <span className={styles.podcast_details_episode_count_badge__count}>
        {count}
      </span>
    </ShadowedBox>
  );
};
