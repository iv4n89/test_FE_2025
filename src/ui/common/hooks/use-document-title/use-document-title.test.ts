import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDocumentTitle } from './use-document-title';

describe('useDocumentTitle', () => {
  it('should set the document title to the provided value', () => {
    renderHook(() => useDocumentTitle('Test Title'));

    expect(document.title).toBe('Test Title');
  });

  it('should update the document title when the title changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Initial Title' },
    });

    expect(document.title).toBe('Initial Title');

    rerender({ title: 'Updated Title' });
    expect(document.title).toBe('Updated Title');
  });

  it('should not update the document title if the title remains the same', () => {
    const spy = vi.spyOn(document, 'title', 'set');
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Same Title' },
    });

    rerender({ title: 'Same Title' });
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});
