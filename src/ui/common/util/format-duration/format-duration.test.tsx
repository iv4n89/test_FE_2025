import { describe, it, expect } from 'vitest';
import { formatDuration } from './format-duration';

describe('formatDuration', () => {
  it('formats duration with hours, minutes, and seconds', () => {
    const result = formatDuration(3661000); // 1 hour, 1 minute, 1 second
    expect(result).toBe('1:01:01');
  });

  it('formats duration with minutes and seconds only', () => {
    const result = formatDuration(61000); // 1 minute, 1 second
    expect(result).toBe('1:01');
  });

  it('formats duration with seconds only', () => {
    const result = formatDuration(15000); // 15 seconds
    expect(result).toBe('0:15');
  });

  it('formats duration with zero milliseconds', () => {
    const result = formatDuration(0); // 0 seconds
    expect(result).toBe('0:00');
  });

  it('pads single-digit minutes and seconds with leading zeros', () => {
    const result = formatDuration(9000); // 9 seconds
    expect(result).toBe('0:09');
  });
});
