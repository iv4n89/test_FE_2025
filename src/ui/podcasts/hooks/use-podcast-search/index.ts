import type { Entry } from '@/core/podcasts/models/itunes-response-model';
import React from 'react';

export const usePodcastSearch = (podcasts: Entry[] = []) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const deferreedSearchTerm = React.useDeferredValue(searchTerm);

  const filteredPodcasts = React.useMemo(() => {
    if (!deferreedSearchTerm) return podcasts;

    const term = deferreedSearchTerm.toLowerCase();
    return podcasts.filter(
      (podcast) =>
        podcast['im:name'].label.toLowerCase().includes(term) ||
        podcast['im:artist'].label.toLowerCase().includes(term)
    );
  }, [deferreedSearchTerm, podcasts]);

  return {
    searchTerm,
    setSearchTerm,
    filteredPodcasts,
    resultCount: filteredPodcasts.length,
  };
};
