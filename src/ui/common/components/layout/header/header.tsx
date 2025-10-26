import { useIsFetching } from '@tanstack/react-query';
import { Box } from '@/ui/common/components/box/box';
import { Inline } from '@/ui/common/components/inline/inline';
import { LoadingDot } from '../loading-dot/loading-dot';
import { MainTitle } from '../main-title/main-title';
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
