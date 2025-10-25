import type { Entry } from '@/core/podcasts/models/itunes-response-model';
import { PopularCard } from '../popular-card';
import styles from './popular-cards-grid.module.css';

interface Props {
  data: Entry[];
}

export const PopularCardsGrid = ({ data }: Props) => {
  return (
    <div className={styles.popular_cards_grid__container}>
      {data?.map((podcast) => (
        <PopularCard
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
