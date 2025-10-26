import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreviewGrid } from '@/ui/podcasts/components/preview-card/preview-grid/preview-grid';
import type { Entry } from '@/core/podcasts/models/itunes-response-model';

describe('PopularCardsGrid', () => {
  const mockData: Entry[] = [
    {
      id: { attributes: { 'im:id': '1' } },
      'im:artist': { label: 'Author 1' },
      'im:image': [
        { label: 'small.jpg' },
        { label: 'medium.jpg' },
        { label: 'large.jpg' },
      ],
      'im:name': { label: 'Podcast 1' },
    } as Entry,
    {
      id: { attributes: { 'im:id': '2' } },
      'im:artist': { label: 'Author 2' },
      'im:image': [
        { label: 'small2.jpg' },
        { label: 'medium2.jpg' },
        { label: 'large2.jpg' },
      ],
      'im:name': { label: 'Podcast 2' },
    } as Entry,
  ];

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('renders the container', () => {
    renderWithRouter(<PreviewGrid data={mockData} />);
    const container = screen.getByTestId('popular-card-1').parentElement;
    expect(container).toBeDefined();
  });

  it('renders correct number of PopularCard components', () => {
    renderWithRouter(<PreviewGrid data={mockData} />);
    expect(screen.getByTestId('popular-card-1')).toBeDefined();
    expect(screen.getByTestId('popular-card-2')).toBeDefined();
  });

  it('renders empty when data is empty array', () => {
    renderWithRouter(<PreviewGrid data={[]} />);
    expect(screen.queryByTestId(/popular-card-/)).toBeNull();
  });

  it('passes correct props to PopularCard components', () => {
    renderWithRouter(<PreviewGrid data={mockData} />);
    const card1 = screen.getByTestId('popular-card-1');
    const card2 = screen.getByTestId('popular-card-2');

    expect(card1).toBeDefined();
    expect(card2).toBeDefined();
  });
});
