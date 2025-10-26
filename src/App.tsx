import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Routes } from './ui/common/router/routes';
import { QueryProviderClient } from './ui/common/util/query-client/query-client-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <QueryProviderClient>
        <RouterProvider router={Routes} />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </QueryProviderClient>
    </>
  );
}

export default App;
