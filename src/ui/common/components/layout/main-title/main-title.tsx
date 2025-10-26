import { Link } from 'react-router-dom';
import styles from './main-title.module.css';

export const MainTitle = () => {
  return (
    <Link to="/" className={styles.main_title__link} data-testid="main-title">
      <span className={styles.main_title__title}>Podcaster</span>
    </Link>
  );
};
