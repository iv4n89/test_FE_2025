import styles from './popular-card-image.module.css';

interface Props {
  src: string;
  alt: string;
}

export const PopularCardImage = ({ alt, src }: Props) => {
  return (
    <div className={styles.popular_card_image__wrapper}>
      <img src={src} alt={alt} className={styles.popular_card_image__image} />
    </div>
  );
};
