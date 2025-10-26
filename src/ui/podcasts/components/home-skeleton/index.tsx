import { Skeleton } from '@/ui/common/components/skeleton';
import styles from './home-skeleton.module.css';

export const HomeSkeleton = () => {
  return (
    <div className={styles.home_skeleton__container}>
      <div
        className={styles.home_skeleton__search_bar}
        data-testid="search-bar-skeleton"
      >
        <Skeleton width="300px" height="40px" borderRadius="8px" />
      </div>
      <div className={styles.home_skeleton__grid} data-testid="grid-skeleton">
        {Array.from({ length: 50 }).map((_, index) => (
          <Skeleton
            width="100%"
            height="200px"
            borderRadius="8px"
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
