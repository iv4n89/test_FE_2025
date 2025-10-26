import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '../../header';

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <ScrollRestoration />
      <main>
        <Outlet />
      </main>
    </>
  );
};
