import { getPopularPodcasts } from '@/core/podcasts/itunes-service';
import type {
  Entry,
  ItunesPopularResponse,
} from '@/core/podcasts/models/itunes-response-model';
import { usePopularPodcasts } from '@/ui/podcasts/hooks/use-popular-podcasts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/core/podcasts/itunes-service');

describe('usePopularPodcasts', () => {
  let queryClient: QueryClient;

  const mockEntries: Entry[] = [
    {
      'im:name': { label: 'Podcast 1' },
      'im:artist': { label: 'Artist 1' },
      id: { attributes: { 'im:id': '1' } },
    } as Entry,
    {
      'im:name': { label: 'Podcast 2' },
      'im:artist': { label: 'Artist 2' },
      id: { attributes: { 'im:id': '2' } },
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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should return undefined initially', () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: { entry: mockEntries },
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    expect(result.current).toBeUndefined();
  });

  it('should fetch and return popular podcasts', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: { entry: mockEntries },
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current).toEqual(mockEntries);
    });

    expect(getPopularPodcasts).toHaveBeenCalledTimes(1);
  });

  it('should return undefined when feed is missing', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue(
      {} as ItunesPopularResponse
    );

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current).toBeUndefined();
    });
  });

  it('should return undefined when entry is missing', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: {},
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current).toBeUndefined();
    });
  });

  it('should handle empty entries array', async () => {
    vi.mocked(getPopularPodcasts).mockResolvedValue({
      feed: { entry: [] as Entry[] },
    } as ItunesPopularResponse);

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });

  it('should handle API errors', async () => {
    vi.mocked(getPopularPodcasts).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => usePopularPodcasts(), { wrapper });

    await waitFor(() => {
      expect(result.current).toBeUndefined();
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
      expect(result.current).toEqual(mockEntries);
    });

    rerender();

    expect(getPopularPodcasts).toHaveBeenCalledTimes(1);
  });
});
