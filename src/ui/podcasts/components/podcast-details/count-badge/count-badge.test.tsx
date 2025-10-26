import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CountBadge } from './count-badge';

vi.mock('@/ui/common/components/shadowed-box/shadowed-box', () => ({
  ShadowedBox: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="shadowed-box" className={className}>
      {children}
    </div>
  ),
}));

describe('CountBadge', () => {
  it('renders the label "Episodes:"', () => {
    render(<CountBadge count={5} />);
    const label = screen.getByText('Episodes:');
    expect(label).toBeDefined();
  });

  it('renders the correct count', () => {
    const count = 10;
    render(<CountBadge count={count} />);
    const countElement = screen.getByText(count.toString());
    expect(countElement).toBeDefined();
  });
});
