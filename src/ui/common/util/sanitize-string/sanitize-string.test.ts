import { describe, it, expect, vi, type Mock } from 'vitest';
import { sanitizeString } from './index';
import DOMPurify from 'dompurify';

vi.mock('dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: vi.fn((input) => input),
  },
}));

describe('sanitizeString', () => {
  it('should return an empty string if input is undefined', () => {
    const result = sanitizeString(undefined);
    expect(result).toBe('');
  });

  it('should return an empty string if input is an empty string', () => {
    const result = sanitizeString('');
    expect(result).toBe('');
  });

  it('should sanitize and return the input string', () => {
    const input = '<script>alert("XSS")</script>';
    const sanitized = 'alert("XSS")';
    (DOMPurify.sanitize as Mock).mockReturnValueOnce(sanitized);

    const result = sanitizeString(input);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(input);
    expect(result).toBe(sanitized);
  });

  it('should handle strings without special characters', () => {
    const input = 'Hello, World!';
    (DOMPurify.sanitize as Mock).mockReturnValueOnce(input);

    const result = sanitizeString(input);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(input);
    expect(result).toBe(input);
  });
});
