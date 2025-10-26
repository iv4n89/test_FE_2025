import { describe, it, expect } from 'vitest';
import { formatDate } from './format-date';

describe('formatDate', () => {
  it('should format a valid date string correctly', () => {
    const dateString = '2023-10-05';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe('10/05/2023');
  });

  it('should handle invalid date strings gracefully', () => {
    const invalidDateString = 'invalid-date';
    const formattedDate = formatDate(invalidDateString);
    expect(formattedDate).toBe('Invalid Date');
  });

  it('should handle empty date strings gracefully', () => {
    const emptyDateString = '';
    const formattedDate = formatDate(emptyDateString);
    expect(formattedDate).toBe('Invalid Date');
  });

  it('should format a date string with time correctly', () => {
    const dateStringWithTime = '2023-10-05T14:48:00.000Z';
    const formattedDate = formatDate(dateStringWithTime);
    expect(formattedDate).toBe('10/05/2023');
  });
});
