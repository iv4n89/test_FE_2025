import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/ui/podcasts/components/search-bar/search-bar';

describe('SearchBar', () => {
  it('renders input with correct placeholder', () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        resultCount={0}
        testid="search-bar"
      />
    );
    const input = screen.getByPlaceholderText('Filter podcasts...');
    expect(input).toBeDefined();
  });

  it('renders result count badge', () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        resultCount={42}
        testid="search-bar"
      />
    );
    const badge = screen.getByText('42');
    expect(badge).toBeDefined();
  });

  it('displays the correct value', () => {
    render(
      <SearchBar
        value="test value"
        onChange={() => {}}
        resultCount={0}
        testid="search-bar"
      />
    );
    const input = screen.getByPlaceholderText(
      'Filter podcasts...'
    ) as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SearchBar
        value=""
        onChange={onChange}
        resultCount={0}
        testid="search-bar"
      />
    );
    const input = screen.getByPlaceholderText('Filter podcasts...');
    await user.type(input, 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });
});
