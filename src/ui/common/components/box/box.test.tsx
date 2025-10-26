import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Box } from '@/ui/common/components/box/box';

describe('Box', () => {
  it('renders children', () => {
    render(<Box>Test content</Box>);
    expect(screen.getByText('Test content')).toBeDefined();
  });

  it('applies numeric padding', () => {
    render(
      <Box padding={10} testid="box">
        Content
      </Box>
    );
    const div = screen.getByTestId('box');
    expect(div.style.padding).toBe('10px');
  });

  it('applies numeric margin', () => {
    render(
      <Box margin={20} testid="box">
        Content
      </Box>
    );
    const div = screen.getByTestId('box');
    expect(div.style.margin).toBe('20px');
  });

  it('applies object padding', () => {
    render(
      <Box padding={{ top: 10, right: 20, bottom: 30, left: 40 }} testid="box">
        Content
      </Box>
    );
    const div = screen.getByTestId('box');
    expect(div.style.paddingTop).toBe('10px');
    expect(div.style.paddingRight).toBe('20px');
    expect(div.style.paddingBottom).toBe('30px');
    expect(div.style.paddingLeft).toBe('40px');
  });

  it('applies object margin', () => {
    render(
      <Box testid="box" margin={{ top: 5, right: 15, bottom: 25, left: 35 }}>
        Content
      </Box>
    );
    const div = screen.getByTestId('box');
    expect(div.style.marginTop).toBe('5px');
    expect(div.style.marginRight).toBe('15px');
    expect(div.style.marginBottom).toBe('25px');
    expect(div.style.marginLeft).toBe('35px');
  });

  it('applies partial object padding', () => {
    render(
      <Box testid="box" padding={{ top: 10 }}>
        Content
      </Box>
    );
    const div = screen.getByTestId('box');
    expect(div.style.paddingTop).toBe('10px');
  });

  it('applies partial object margin', () => {
    render(
      <Box testid="box" margin={{ left: 15 }}>
        Content
      </Box>
    );
    const div = screen.getByTestId('box');
    expect(div.style.marginLeft).toBe('15px');
  });
});
