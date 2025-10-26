import { BaseLayout } from '@/ui/common/components/layout/base-layout/base-layout';
import Home from '@/ui/podcasts/views/home';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        index: true,
        element: <Home />,
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
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        lazy: async () => {
          const { default: Episode } = await import(
            '@/ui/podcasts/views/episode'
          );
          return { Component: Episode };
        },
      },
    ],
  },
];

export const Routes = createBrowserRouter(routes);
