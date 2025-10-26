import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Routes } from './ui/common/router/index.routes';
import { QueryProviderClient } from './ui/common/util/query-client/query-client-provider';

function App() {
  return (
    <>
      <QueryProviderClient>
        <RouterProvider router={Routes} />
      </QueryProviderClient>
    </>
  );
}

export default App;
