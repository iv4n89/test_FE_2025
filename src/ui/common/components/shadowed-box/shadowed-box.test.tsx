import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ShadowedBox } from './shadowed-box';

describe('ShadowedBox', () => {
  it('renders children correctly', () => {
    render(
      <ShadowedBox>
        <p>Test content</p>
      </ShadowedBox>
    );

    expect(screen.getByText('Test content')).toBeDefined();
  });

  it('applies the provided className', () => {
    const customClass = 'custom-class';
    render(
      <ShadowedBox className={customClass}>
        <p>Test content</p>
      </ShadowedBox>
    );

    const container = screen.getByText('Test content').parentElement;
    expect(container?.classList).toContain(customClass);
  });

  it('sets the data-testid attribute when provided', () => {
    const testId = 'shadowed-box';
    render(
      <ShadowedBox testid={testId}>
        <p>Test content</p>
      </ShadowedBox>
    );

    expect(screen.getByTestId(testId)).toBeDefined();
  });
});
