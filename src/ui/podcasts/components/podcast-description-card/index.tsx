import styles from './podcast-description-card.module.css';

interface Props {
  name: string;
  author: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export const PodcastDescriptionCard = ({
  author,
  description,
  image,
  name,
}: Props) => {
  return (
    <div className={styles.podcast_description_card__container}>
      <div className={styles.podcast_description_card__image_wrapper}>
        <img
          src={image.src}
          alt={image.alt}
          className={styles.podcast_description_card__image}
        />
      </div>
      <div className={styles.podcast_description_card__divider}></div>
      <div className={styles.podcast_description_card__info}>
        <h2 className={styles.podcast_description_card__name}>{name}</h2>
        <p className={styles.podcast_description_card__author}>by {author}</p>
      </div>
      <div className={styles.podcast_description_card__divider}></div>
      <div className={styles.podcast_description_card__description}>
        <h3 className={styles.podcast_description_card__description_title}>
          Description:
        </h3>
        <p className={styles.podcast_description_card__description_text}>
          {description}
        </p>
      </div>
    </div>
  );
};
