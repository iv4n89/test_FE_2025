import styles from './popular-card-image.module.css';

interface Props {
  src: string;
  alt: string;
  testid?: string;
}

export const PopularCardImage = ({ alt, src, testid }: Props) => {
  return (
    <div className={styles.popular_card_image__wrapper} data-testid={testid}>
      <img src={src} alt={alt} className={styles.popular_card_image__image} />
    </div>
  );
};
