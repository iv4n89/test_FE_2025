import { useIsFetching } from '@tanstack/react-query';
import { Box } from '../box';
import { Inline } from '../inline';
import { LoadingDot } from '../loading-dot';
import { MainTitle } from '../main-title';
import styles from './header.module.css';

export const Header = () => {
  const isFetching = useIsFetching();

  return (
    <header className={styles.header__container}>
      <Inline alignItems="center" justifyContent="space-between" fullWidth>
        <MainTitle />
        {(isFetching && (
          <Box padding={{ left: 8, right: 8 }}>
            <LoadingDot />
          </Box>
        )) ||
          null}
      </Inline>
    </header>
  );
};
