import { PopularCardsGrid } from '../components/popular-cards-grid';
import { usePopularPodcasts } from '../hooks/use-popular-podcasts';

export default function Home() {
  const popularPodcasts = usePopularPodcasts();

  return <PopularCardsGrid data={popularPodcasts || []} />;
}
