import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomeSkeleton } from './index';

describe('HomeSkeleton', () => {
  it('renders the search bar skeleton', () => {
    render(<HomeSkeleton />);
    const searchBarSkeleton = screen.getByTestId('search-bar-skeleton');
    expect(searchBarSkeleton).toBeDefined();
  });

  it('renders 50 grid item skeletons', () => {
    render(<HomeSkeleton />);
    const gridSkeletons = screen.getByTestId('grid-skeleton').children;
    expect(gridSkeletons).toHaveLength(50);
  });
});
