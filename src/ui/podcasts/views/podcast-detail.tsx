import { useDocumentTitle } from '@/ui/common/hooks/use-document-title/use-document-title';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PodcastDetails } from '../components/podcast-details/podcast-details';
import { usePodcastDetails } from '../hooks/use-podcast-details/use-podcast-details';

export function PodcastDetail() {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { info, episodes } = usePodcastDetails(podcastId || '');

  useDocumentTitle(`Podcaster - Details ${info?.collectionName}`);

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
