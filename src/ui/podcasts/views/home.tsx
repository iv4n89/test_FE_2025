import React, { startTransition } from 'react';
import { PopularCardsGrid } from '../components/popular-cards-grid';
import { SearchBar } from '../components/search-bar';
import { usePodcastSearch } from '../hooks/use-podcast-search';
import { usePopularPodcasts } from '../hooks/use-popular-podcasts';
import { HomeSkeleton } from '../components/home-skeleton';

export default function Home() {
  const { data: popularPodcasts, isLoading } = usePopularPodcasts();
  const { filteredPodcasts, resultCount, searchTerm, setSearchTerm } =
    usePodcastSearch(popularPodcasts);

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchTerm(value);
    });
  };

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <React.Suspense fallback={<HomeSkeleton />}>
      <SearchBar
        onChange={handleSearch}
        value={searchTerm}
        resultCount={resultCount}
        testid="podcast-search-bar"
      />
      <PopularCardsGrid data={filteredPodcasts} />
    </React.Suspense>
  );
}
