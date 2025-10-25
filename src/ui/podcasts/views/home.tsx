import { startTransition } from 'react';
import { PopularCardsGrid } from '../components/popular-cards-grid';
import { SearchBar } from '../components/search-bar';
import { usePodcastSearch } from '../hooks/use-podcast-search';
import { usePopularPodcasts } from '../hooks/use-popular-podcasts';

export default function Home() {
  const popularPodcasts = usePopularPodcasts();
  const { filteredPodcasts, resultCount, searchTerm, setSearchTerm } =
    usePodcastSearch(popularPodcasts);

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchTerm(value);
    });
  };

  return (
    <>
      <SearchBar
        onChange={handleSearch}
        value={searchTerm}
        resultCount={resultCount}
        testid="podcast-search-bar"
      />
      <PopularCardsGrid data={filteredPodcasts} />
    </>
  );
}
