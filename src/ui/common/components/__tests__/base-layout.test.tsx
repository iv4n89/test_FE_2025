import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BaseLayout } from '@/ui/common/components/layout/base-layout';

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

vi.mock('@/ui/common/components/header', () => ({
  Header: () => <header data-testid="header">Header Content</header>,
}));

describe('BaseLayout', () => {
  it('renders Header component', () => {
    render(<BaseLayout />);
    expect(screen.getByTestId('header')).toBeDefined();
  });

  it('renders main element', () => {
    const { container } = render(<BaseLayout />);
    const main = container.querySelector('main');
    expect(main).toBeDefined();
  });

  it('renders Outlet component inside main', () => {
    const { container } = render(<BaseLayout />);
    const main = container.querySelector('main');
    const outlet = screen.getByTestId('outlet');
    expect(main?.contains(outlet)).toBe(true);
  });
});
