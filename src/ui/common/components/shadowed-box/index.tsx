import type React from 'react';
import styles from './shadowed-box.module.css';

interface Props {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  testid?: string;
}

export const ShadowedBox = ({ children, className, testid }: Props) => {
  return (
    <div
      className={`${styles.shadowed_box__container} ${className?.length ? className : ''}`}
      data-testid={testid}
    >
      {children}
    </div>
  );
};
