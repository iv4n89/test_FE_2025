import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

const PERSITER_KEY = 'react-query-podcasts-app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: PERSITER_KEY,
});

interface Props {
  children: React.ReactNode;
}

export const QueryProviderClient = ({ children }: Props) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      key={PERSITER_KEY}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
