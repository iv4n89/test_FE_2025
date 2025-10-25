import { Outlet } from 'react-router-dom';
import { Header } from '../../header';

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
