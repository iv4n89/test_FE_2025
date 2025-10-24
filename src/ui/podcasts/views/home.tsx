import { usePopularPodcasts } from '../hooks/use-popular-podcasts';

export default function Home() {
  const { popularPodcasts } = usePopularPodcasts();

  return <pre>{JSON.stringify(popularPodcasts, null, 2)}</pre>;
}
