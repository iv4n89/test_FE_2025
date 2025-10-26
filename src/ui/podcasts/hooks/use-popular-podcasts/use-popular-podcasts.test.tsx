import { getPopularPodcasts } from '@/core/podcasts/itunes-service';
import type {
  Entry,
  ItunesPopularResponse,
} from '@/core/podcasts/models/itunes-response-model';
import { usePopularPodcasts } from '@/ui/podcasts/hooks/use-popular-podcasts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Suspense } from 'react';

vi.mock('@/core/podcasts/itunes-service');

describe('usePopularPodcasts', () => {
  let queryClient: QueryClient;

  const mockEntries: Entry[] = [
    {
      'im:name': { label: 'Podcast 1' },
      'im:artist': { label: 'Artist 1' },
      id: { attributes: { 'im:id': '1' } },
      summary: { label: 'Description 1' },
    } as Entry,
    {
      'im:name': { label: 'Podcast 2' },
      'im:artist': { label: 'Artist 2' },
      id: { attributes: { 'im:id': '2' } },
      summary: { label: 'Description 2' },
    } as Entry,
  ];

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </QueryClientProvider>
  );

  it('should fetch and return popular podcasts', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: { entry: mockEntries },
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockEntries);
    });

    expect(getPopularPodcasts).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when entry is missing', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: {},
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });

  it('should handle empty entries array', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: { entry: [] as Entry[] },
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });

  it('should cache results for 24 hours', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: { entry: mockEntries },
    } as ItunesPopularResponse);

    const { result, rerender } = renderHook(() => usePopularPodcasts(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockEntries);
    });

    rerender();

    expect(getPopularPodcasts).toHaveBeenCalledTimes(1);
  });

  it('should get podcast description by id', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: { entry: mockEntries },
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockEntries);
    });

    const description = result.current.getPodcastDescriptionById('1');
    expect(description).toBe('Description 1');
  });

  it('should return undefined for non-existent podcast id', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: { entry: mockEntries },
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockEntries);
    });

    const description = result.current.getPodcastDescriptionById('999');
    expect(description).toBeUndefined();
  });
});
