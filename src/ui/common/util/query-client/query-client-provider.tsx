import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient } from './query-client';

const PERSISTER_KEY = 'react-query-podcasts-app';

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: PERSISTER_KEY,
});

interface Props {
  children: React.ReactNode;
}

export const QueryProviderClient = ({ children }: Props) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      key={PERSISTER_KEY}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
