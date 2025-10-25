import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Inline } from '@/ui/common/components/inline';

describe('Inline', () => {
  it('renders children', () => {
    const { getByText } = render(<Inline>Test content</Inline>);
    expect(getByText('Test content')).toBeDefined();
  });

  it('applies gap', () => {
    render(
      <Inline testid="inline" gap={16}>
        Content
      </Inline>
    );
    const div = screen.getByTestId('inline');
    expect(div.style.gap).toBe('16px');
  });

  it('applies justifyContent', () => {
    render(
      <Inline testid="inline" justifyContent="center">
        Content
      </Inline>
    );
    const div = screen.getByTestId('inline');
    expect(div.style.justifyContent).toBe('center');
  });

  it('applies alignItems', () => {
    render(
      <Inline testid="inline" alignItems="flex-end">
        Content
      </Inline>
    );
    const div = screen.getByTestId('inline');
    expect(div.style.alignItems).toBe('flex-end');
  });

  it('applies fullWidth class', () => {
    render(
      <Inline testid="inline" fullWidth>
        Content
      </Inline>
    );
    const div = screen.getByTestId('inline');
    expect(div.className).toContain('inline__container_fullwidth');
  });

  it('does not apply fullWidth class when false', () => {
    render(
      <Inline testid="inline" fullWidth={false}>
        Content
      </Inline>
    );
    const div = screen.getByTestId('inline');
    expect(div.className).not.toContain('inline__container_fullwidth');
  });

  it('applies testid', () => {
    render(<Inline testid="inline-test">Content</Inline>);
    expect(screen.getByTestId('inline-test')).toBeDefined();
  });

  it('applies multiple style props together', () => {
    render(
      <Inline
        testid="inline"
        gap={20}
        justifyContent="space-between"
        alignItems="center"
      >
        Content
      </Inline>
    );
    const div = screen.getByTestId('inline');
    expect(div.style.gap).toBe('20px');
    expect(div.style.justifyContent).toBe('space-between');
    expect(div.style.alignItems).toBe('center');
  });
});
