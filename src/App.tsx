import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Routes } from './ui/common/router/index.routes';

function App() {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
