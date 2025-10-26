import { Link } from 'react-router-dom';
import { PreviewImage } from './preview-image/preview-image';
import styles from './preview-card.module.css';

interface Props {
  title: string;
  image: {
    src: string;
    alt: string;
  };
  author: string;
  id: string;
  testid?: string;
}

export const PreviewCard = ({ author, id, image, title, testid }: Props) => {
  return (
    <Link
      to={`/podcast/${id}`}
      className={styles.popular_card__container}
      data-testid={testid}
    >
      <PreviewImage src={image.src} alt={image.alt} />
      <div className={styles.popular_card__content}>
        <h3 className={styles.popular_card__title}>{title}</h3>
        <p className={styles.popular_card__author}>{author}</p>
      </div>
    </Link>
  );
};
