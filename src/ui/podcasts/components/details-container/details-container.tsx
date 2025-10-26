import styles from './details-container.module.css';

interface Props {
  children: React.ReactNode;
  testid?: string;
}

export const DetailsContainer = ({ children, testid }: Props) => {
  return (
    <div className={styles.podcast_details__container} data-testid={testid}>
      {children}
    </div>
  );
};
