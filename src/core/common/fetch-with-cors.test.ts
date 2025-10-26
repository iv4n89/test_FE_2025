import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchWithCors } from '@/core/common/fetch-with-cors';

vi.mock('axios');

describe('fetchWithCors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should fetch data successfully with status 200', async () => {
    const mockResponse = {
      status: 200,
      data: {
        contents: JSON.stringify({ message: 'success' }),
      },
    };

    vi.mocked(axios.request).mockResolvedValue(mockResponse);

    const result = await fetchWithCors({
      url: 'https://example.com/api',
      method: 'GET',
    });

    expect(result).toEqual({ message: 'success' });
    expect(axios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.allorigins.win/get?url=https%3A%2F%2Fexample.com%2Fapi',
      params: undefined,
      data: undefined,
      headers: undefined,
    });
  });

  it('should handle POST request with body and headers', async () => {
    const mockResponse = {
      status: 201,
      data: {
        contents: JSON.stringify({ id: 123 }),
      },
    };

    vi.mocked(axios.request).mockResolvedValue(mockResponse);

    const result = await fetchWithCors({
      url: 'https://example.com/api',
      method: 'POST',
      body: { name: 'test' },
      headers: { 'Content-Type': 'application/json' },
      params: { query: 'value' },
    });

    expect(result).toEqual({ id: 123 });
    expect(axios.request).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.allorigins.win/get?url=https%3A%2F%2Fexample.com%2Fapi',
      params: { query: 'value' },
      data: { name: 'test' },
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('should throw error for non-2xx status codes', async () => {
    const mockResponse = {
      status: 404,
      data: {
        contents: null,
      },
    };

    vi.mocked(axios.request).mockResolvedValue(mockResponse);

    const result = await fetchWithCors({
      url: 'https://example.com/api',
      method: 'GET',
    });

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      '%c[fetchWithCors] Error:',
      'color: red;',
      expect.any(Error)
    );
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network error');
    vi.mocked(axios.request).mockRejectedValue(networkError);

    const result = await fetchWithCors({
      url: 'https://example.com/api',
      method: 'GET',
    });

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      '%c[fetchWithCors] Error:',
      'color: red;',
      networkError
    );
  });
});
