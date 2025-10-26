import { useParams } from 'react-router-dom';
import { PodcastDetails } from '../components/podcast-details';
import { usePodcastDetails } from '../hooks/use-podcast-details';
import React from 'react';

export function PodcastDetail() {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { info, episodes } = usePodcastDetails(podcastId || '');

  if (!info) {
    return null;
  }

  return (
    <React.Suspense fallback={<></>}>
      <PodcastDetails
        episodes={episodes}
        info={info}
        description={info.description || ''}
        podcastId={podcastId || ''}
      />
    </React.Suspense>
  );
}

export default PodcastDetail;
