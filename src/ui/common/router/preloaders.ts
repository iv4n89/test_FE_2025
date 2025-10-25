let podcastDetailPromise: Promise<ReactComponentModule> | null = null;

export const preloadPodcastDetail = () => {
  if (!podcastDetailPromise) {
    podcastDetailPromise = import('@/ui/podcasts/views/podcast-detail');
  }
  return podcastDetailPromise;
};
