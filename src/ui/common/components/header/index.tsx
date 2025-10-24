import { Box } from '../box';
import { Inline } from '../inline';
import { LoadingDot } from '../loading-dot';
import { MainTitle } from '../main-title';
import styles from './header.module.css';

interface Props {
  isLoading?: boolean;
}

export const Header = ({ isLoading }: Props) => {
  return (
    <header className={styles.header__container}>
      <Inline alignItems="center" justifyContent="space-between" fullWidth>
        <MainTitle />
        {isLoading && (
          <Box padding={{ left: 8, right: 8 }}>
            <LoadingDot />
          </Box>
        )}
      </Inline>
    </header>
  );
};
