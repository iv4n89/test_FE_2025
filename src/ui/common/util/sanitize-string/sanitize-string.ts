import DOMPurify from 'dompurify';

export const sanitizeString = (str?: string) => {
  if (!str || str.length === 0) {
    return '';
  }

  return DOMPurify.sanitize(str);
};
