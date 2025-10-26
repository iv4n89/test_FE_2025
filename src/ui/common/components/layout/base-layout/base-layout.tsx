import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '@/ui/common/components/layout/header/header';

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
