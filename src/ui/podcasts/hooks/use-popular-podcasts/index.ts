import { getPopularPodcasts } from '@/core/podcasts/itunes-service';
import type { Entry } from '@/core/podcasts/models/itunes-response-model';
import React, { useState } from 'react';

export const usePopularPodcasts = () => {
  const [popularPodcasts, setPopularPodcasts] = useState<Entry[] | undefined>(
    undefined
  );

  const fetchPopularPodcasts = async () => {
    const data = await getPopularPodcasts();
    setPopularPodcasts(data?.feed?.entry);
  };

  React.useEffect(() => {
    fetchPopularPodcasts();
  }, []);

  return {
    popularPodcasts,
  };
};
