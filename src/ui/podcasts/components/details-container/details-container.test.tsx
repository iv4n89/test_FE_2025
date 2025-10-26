import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DetailsContainer } from './details-container';

describe('DetailsContainer', () => {
  it('renders children correctly', () => {
    render(
      <DetailsContainer>
        <p>Test Child</p>
      </DetailsContainer>
    );
    expect(screen.getByText('Test Child')).toBeDefined();
  });

  it('sets the data-testid attribute when provided', () => {
    render(
      <DetailsContainer testid="details-container">
        <p>Content</p>
      </DetailsContainer>
    );
    expect(screen.getByTestId('details-container')).toBeDefined();
  });

  it('does not set the data-testid attribute when not provided', () => {
    const { container } = render(<DetailsContainer>Content</DetailsContainer>);
    const div = container.querySelector('div');
    expect(div?.getAttribute('data-testid')).toBeNull();
  });
});
