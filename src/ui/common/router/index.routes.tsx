import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { BaseLayout } from '@/ui/common/components/layout/base-layout';
import Home from '@/ui/podcasts/views/home';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

export const Routes = createBrowserRouter(routes);
