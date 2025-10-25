import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useIsFetching } from '@tanstack/react-query';
import { Header } from '@/ui/common/components/header';
import type React from 'react';

vi.mock('@tanstack/react-query', () => ({
  useIsFetching: vi.fn(),
}));

vi.mock('../box', () => ({
  Box: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="box">{children}</div>
  ),
}));

vi.mock('../inline', () => ({
  Inline: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="inline">{children}</div>
  ),
}));

vi.mock('../loading-dot', () => ({
  LoadingDot: () => <div data-testid="loading-dot">Loading...</div>,
}));

vi.mock('../main-title', () => ({
  MainTitle: () => <div data-testid="main-title">Main Title</div>,
}));

describe('Header', () => {
  it('renders header with MainTitle', () => {
    vi.mocked(useIsFetching).mockReturnValue(0);
    render(<Header />);
    expect(screen.getByTestId('main-title')).toBeDefined();
  });

  it('does not show LoadingDot when isFetching is 0', () => {
    vi.mocked(useIsFetching).mockReturnValue(0);
    render(<Header />);
    expect(screen.queryByTestId('loading-dot')).toBeNull();
  });

  it('wraps LoadingDot in Box when fetching', () => {
    vi.mocked(useIsFetching).mockReturnValue(1);
    render(<Header />);
    expect(screen.getByTestId('box')).toBeDefined();
  });
});
