import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { BaseLayout } from '@/ui/common/components/layout/base-layout';
import Home from '@/ui/podcasts/views/home';
import { preloadPodcastDetail } from './preloaders';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => {
          preloadPodcastDetail();
          return null;
        },
      },
      {
        path: 'podcast/:podcastId',
        lazy: async () => {
          const { default: PodcastDetail } = await import(
            '@/ui/podcasts/views/podcast-detail'
          );
          return { Component: PodcastDetail };
        },
      },
    ],
  },
];

export const Routes = createBrowserRouter(routes);
