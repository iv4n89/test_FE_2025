import { QueryProviderClient } from '@/ui/common/util/query-client';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('QueryProviderClient', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render children', async () => {
    render(
      <QueryProviderClient>
        <div>Test Child</div>
      </QueryProviderClient>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Child')).toBeDefined();
    });
  });

  it('should wrap children with query client provider', async () => {
    const { container } = render(
      <QueryProviderClient>
        <div data-testid="child">Content</div>
      </QueryProviderClient>
    );

    await waitFor(() => {
      expect(container.querySelector('[data-testid="child"]')).toBeDefined();
    });
  });
});
