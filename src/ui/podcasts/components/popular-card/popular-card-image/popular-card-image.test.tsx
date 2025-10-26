import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PopularCardImage } from '@/ui/podcasts/components/popular-card/popular-card-image';

describe('PopularCardImage', () => {
  it('renders image with correct src and alt', () => {
    render(
      <PopularCardImage src="test-image.jpg" alt="Test Alt" testid="image" />
    );
    const img = screen.getByTestId('image').querySelector('img');
    expect(img).toBeDefined();
    expect(img?.getAttribute('src')).toBe('test-image.jpg');
    expect(img?.getAttribute('alt')).toBe('Test Alt');
  });
});
