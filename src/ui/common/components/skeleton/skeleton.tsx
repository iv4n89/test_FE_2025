import type React from 'react';
import styles from './skeleton.module.css';

interface Props {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  testid?: string;
}

export const Skeleton = ({
  borderRadius,
  className,
  height,
  width,
  testid,
}: Props) => {
  return (
    <div
      className={`${styles.skeleton} ${className || ''}`}
      style={{
        width,
        height,
        borderRadius,
      }}
      data-testid={testid}
    ></div>
  );
};
