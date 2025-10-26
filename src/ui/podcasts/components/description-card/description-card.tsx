import type { ItunesLookupResult } from '@/core/podcasts/models/itunes-response-model';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './description-card.module.css';
import { ShadowedBox } from '@/ui/common/components/shadowed-box/shadowed-box';

interface Props {
  data: ItunesLookupResult;
  description: string;
  isLinksActive?: boolean;
  testid?: string;
}

export const DescriptionCard = ({
  data,
  description,
  isLinksActive = false,
  testid,
}: Props) => {
  const LinkContainer = isLinksActive
    ? ({ children }: { children: React.ReactNode }) => (
        <Link
          className={styles.podcast_description_card__link}
          to={`/podcast/${data.collectionId}`}
        >
          {children}
        </Link>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className={styles.podcast_description_card__link}>{children}</div>
      );

  return (
    <ShadowedBox
      testid={testid}
      className={styles.podcast_description_card__container}
    >
      <div className={styles.podcast_description_card__image_wrapper}>
        <LinkContainer>
          <img
            src={data.artworkUrl600}
            alt={data.collectionName}
            className={styles.podcast_description_card__image}
          />
        </LinkContainer>
      </div>
      <div className={styles.podcast_description_card__divider}></div>
      <div className={styles.podcast_description_card__info}>
        <LinkContainer>
          <h2 className={styles.podcast_description_card__name}>
            {data.collectionName}
          </h2>
        </LinkContainer>
        <LinkContainer>
          <p className={styles.podcast_description_card__author}>
            by {data.artistName}
          </p>
        </LinkContainer>
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
    </ShadowedBox>
  );
};
