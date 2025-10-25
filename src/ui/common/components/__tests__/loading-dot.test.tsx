import { LoadingDot } from '@/ui/common/components/loading-dot';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('LoadingDot', () => {
  it('renders element', () => {
    render(<LoadingDot />);
    expect(screen.getByTestId('loading-dot')).toBeDefined();
  });
});
