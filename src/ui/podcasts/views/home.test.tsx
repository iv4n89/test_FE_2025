import type { Entry } from '@/core/podcasts/models/itunes-response-model';
import { usePodcastSearch } from '@/ui/podcasts/hooks/use-podcast-search';
import { usePopularPodcasts } from '@/ui/podcasts/hooks/use-popular-podcasts';
import Home from '@/ui/podcasts/views/home';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/ui/podcasts/hooks/use-popular-podcasts');
vi.mock('@/ui/podcasts/hooks/use-podcast-search');
vi.mock('@/ui/podcasts/components/popular-cards-grid', () => ({
  PopularCardsGrid: ({ data }: { data: Entry[] | undefined }) => (
    <div data-testid="popular-cards-grid">
      {data?.length ? `${data.length} podcasts` : 'No podcasts'}
    </div>
  ),
}));
vi.mock('@/ui/podcasts/components/search-bar', () => ({
  SearchBar: ({
    onChange,
    value,
    resultCount,
    testid,
  }: {
    onChange: (value: string) => void;
    value: string;
    resultCount: number;
    testid: string;
  }) => (
    <input
      data-testid={testid}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`${resultCount} results`}
    />
  ),
}));

describe('Home', () => {
  const mockPopularPodcasts: Entry[] = [
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

  const mockSetSearchTerm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePopularPodcasts).mockReturnValue({
      data: mockPopularPodcasts,
      getPodcastDescriptionById: vi.fn(),
    });
    vi.mocked(usePodcastSearch).mockReturnValue({
      filteredPodcasts: mockPopularPodcasts,
      resultCount: 2,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
    });
  });

  it('should render SearchBar and PopularCardsGrid', () => {
    render(<Home />);

    expect(screen.getByTestId('podcast-search-bar')).toBeDefined();
    expect(screen.getByTestId('popular-cards-grid')).toBeDefined();
  });

  it('should pass popular podcasts to usePodcastSearch', () => {
    render(<Home />);

    expect(usePodcastSearch).toHaveBeenCalledWith(mockPopularPodcasts);
  });

  it('should display filtered podcasts', () => {
    render(<Home />);

    expect(screen.getByTestId('popular-cards-grid').innerHTML).toBe(
      '2 podcasts'
    );
  });

  it('should handle search input', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const searchInput = screen.getByTestId('podcast-search-bar');
    await user.type(searchInput, 'test');

    expect(mockSetSearchTerm).toHaveBeenCalled();
  });

  it('should display search term in SearchBar', () => {
    vi.mocked(usePodcastSearch).mockReturnValue({
      filteredPodcasts: mockPopularPodcasts,
      resultCount: 2,
      searchTerm: 'test search',
      setSearchTerm: mockSetSearchTerm,
    });

    render(<Home />);

    expect(screen.getByTestId('podcast-search-bar').getAttribute('value')).toBe(
      'test search'
    );
  });

  it('should display result count in SearchBar', () => {
    vi.mocked(usePodcastSearch).mockReturnValue({
      filteredPodcasts: [mockPopularPodcasts[0]],
      resultCount: 1,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
    });

    render(<Home />);

    expect(screen.getByText('1 podcasts')).toBeDefined();
  });

  it('should handle empty array popular podcasts', () => {
    vi.mocked(usePopularPodcasts).mockReturnValue({
      data: [],
      getPodcastDescriptionById: vi.fn(),
    });
    vi.mocked(usePodcastSearch).mockReturnValue({
      filteredPodcasts: [],
      resultCount: 0,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
    });

    render(<Home />);

    expect(screen.getByTestId('popular-cards-grid').innerHTML).toBe(
      'No podcasts'
    );
  });

  it('should handle empty filtered podcasts', () => {
    vi.mocked(usePodcastSearch).mockReturnValue({
      filteredPodcasts: [],
      resultCount: 0,
      searchTerm: 'no match',
      setSearchTerm: mockSetSearchTerm,
    });

    render(<Home />);

    expect(screen.getByTestId('popular-cards-grid').innerHTML).toBe(
      'No podcasts'
    );
  });
});
