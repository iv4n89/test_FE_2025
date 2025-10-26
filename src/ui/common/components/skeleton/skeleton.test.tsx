import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './index';

describe('Skeleton', () => {
  it('renders the component', () => {
    render(<Skeleton testid="skeleton" />);
    const skeletonElement = screen.getByTestId('skeleton');
    expect(skeletonElement).toBeDefined();
  });

  it('applies custom width, height, and borderRadius', () => {
    render(
      <Skeleton
        width="100px"
        height="50px"
        borderRadius="10px"
        testid="skeleton"
      />
    );
    const skeletonElement = screen.getByTestId('skeleton');
    expect(skeletonElement.style.width).toBe('100px');
    expect(skeletonElement.style.height).toBe('50px');
    expect(skeletonElement.style.borderRadius).toBe('10px');
  });

  it('applies additional className', () => {
    render(<Skeleton className="custom-class" testid="skeleton" />);
    const skeletonElement = screen.getByTestId('skeleton');
    expect(skeletonElement.classList).toContain('custom-class');
  });
});
