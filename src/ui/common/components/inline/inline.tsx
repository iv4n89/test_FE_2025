import type React from 'react';
import styles from './inline.module.css';

interface Props {
  gap?: number;
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  children: React.ReactNode;
  fullWidth?: boolean;
  testid?: string;
}

export const Inline = ({
  children,
  alignItems,
  fullWidth,
  gap,
  justifyContent,
  testid,
}: Props) => {
  return (
    <div
      className={`${styles.inline__container} ${fullWidth ? styles.inline__container_fullwidth : ''}`}
      style={{
        gap: gap ? `${gap}px` : undefined,
        justifyContent,
        alignItems,
      }}
      data-testid={testid}
    >
      {children}
    </div>
  );
};
