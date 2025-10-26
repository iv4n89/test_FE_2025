import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePodcastSearch } from '@/ui/podcasts/hooks/use-podcast-search';
import type { Entry } from '@/core/podcasts/models/itunes-response-model';

describe('usePodcastSearch', () => {
  const mockPodcasts: Entry[] = [
    {
      'im:name': { label: 'The Daily Show' },
      'im:artist': { label: 'Comedy Central' },
      id: { attributes: { 'im:id': '1' } },
    } as Entry,
    {
      'im:name': { label: 'Tech Talk' },
      'im:artist': { label: 'Silicon Valley Podcasts' },
      id: { attributes: { 'im:id': '2' } },
    } as Entry,
    {
      'im:name': { label: 'Morning News' },
      'im:artist': { label: 'Daily Media' },
      id: { attributes: { 'im:id': '3' } },
    } as Entry,
  ];

  describe('initialization', () => {
    it('should initialize with empty search term', () => {
      const { result } = renderHook(() => usePodcastSearch(mockPodcasts));

      expect(result.current.searchTerm).toBe('');
    });

    it('should return all podcasts when search term is empty', () => {
      const { result } = renderHook(() => usePodcastSearch(mockPodcasts));

      expect(result.current.filteredPodcasts).toEqual(mockPodcasts);
      expect(result.current.resultCount).toBe(3);
    });

    it('should handle empty podcasts array', () => {
      const { result } = renderHook(() => usePodcastSearch([]));

      expect(result.current.filteredPodcasts).toEqual([]);
      expect(result.current.resultCount).toBe(0);
    });

    it('should handle undefined podcasts', () => {
      const { result } = renderHook(() => usePodcastSearch());

      expect(result.current.filteredPodcasts).toEqual([]);
      expect(result.current.resultCount).toBe(0);
    });
  });

  describe('search functionality', () => {
    it('should filter podcasts by name', () => {
      const { result } = renderHook(() => usePodcastSearch(mockPodcasts));

      act(() => {
        result.current.setSearchTerm('Tech');
      });

      expect(result.current.searchTerm).toBe('Tech');
      expect(result.current.filteredPodcasts).toHaveLength(1);
      expect(result.current.filteredPodcasts[0]['im:name'].label).toBe(
        'Tech Talk'
      );
      expect(result.current.resultCount).toBe(1);
    });

    it('should filter podcasts by artist', () => {
      const { result } = renderHook(() => usePodcastSearch(mockPodcasts));

      act(() => {
        result.current.setSearchTerm('Comedy');
      });

      expect(result.current.filteredPodcasts).toHaveLength(1);
      expect(result.current.filteredPodcasts[0]['im:artist'].label).toBe(
        'Comedy Central'
      );
    });

    it('should be case insensitive', () => {
      const { result } = renderHook(() => usePodcastSearch(mockPodcasts));

      act(() => {
        result.current.setSearchTerm('DAILY');
      });

      expect(result.current.filteredPodcasts).toHaveLength(2);
    });

    it('should return empty array when no matches found', () => {
      const { result } = renderHook(() => usePodcastSearch(mockPodcasts));

      act(() => {
        result.current.setSearchTerm('NonExistent');
      });

      expect(result.current.filteredPodcasts).toEqual([]);
      expect(result.current.resultCount).toBe(0);
    });

    it('should return all podcasts when search term is cleared', () => {
      const { result } = renderHook(() => usePodcastSearch(mockPodcasts));

      act(() => {
        result.current.setSearchTerm('Tech');
      });

      expect(result.current.filteredPodcasts).toHaveLength(1);

      act(() => {
        result.current.setSearchTerm('');
      });

      expect(result.current.filteredPodcasts).toEqual(mockPodcasts);
      expect(result.current.resultCount).toBe(3);
    });

    it('should handle partial matches', () => {
      const { result } = renderHook(() => usePodcastSearch(mockPodcasts));

      act(() => {
        result.current.setSearchTerm('dai');
      });

      expect(result.current.filteredPodcasts).toHaveLength(2);
    });
  });
});
