import type { Entry } from '@/core/podcasts/models/itunes-response-model';
import { PreviewCard } from '../preview-card';
import styles from './preview-grid.module.css';

interface Props {
  data: Entry[];
}

export const PreviewGrid = ({ data }: Props) => {
  return (
    <div className={styles.popular_cards_grid__container}>
      {data?.map((podcast) => (
        <PreviewCard
          id={podcast.id.attributes['im:id']}
          author={podcast['im:artist'].label}
          image={{
            src: podcast['im:image']?.at(-1)?.label || '',
            alt: podcast['im:name'].label,
          }}
          title={podcast['im:name'].label}
          testid={`popular-card-${podcast.id.attributes['im:id']}`}
          key={podcast.id.attributes['im:id']}
        />
      ))}
    </div>
  );
};
