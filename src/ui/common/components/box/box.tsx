interface Props {
  padding?:
    | number
    | { top?: number; right?: number; bottom?: number; left?: number };
  margin?:
    | number
    | { top?: number; right?: number; bottom?: number; left?: number };
  children: React.ReactNode;
  testid?: string;
}

export const Box = ({ children, margin, padding, testid }: Props) => {
  return (
    <div
      style={{
        ...(padding !== undefined && typeof padding === 'number'
          ? { padding }
          : {}),
        ...(margin !== undefined && typeof margin === 'number'
          ? { margin }
          : {}),
        ...(padding !== undefined && typeof padding === 'object'
          ? {
              paddingTop: padding.top,
              paddingRight: padding.right,
              paddingBottom: padding.bottom,
              paddingLeft: padding.left,
            }
          : {}),
        ...(margin !== undefined && typeof margin === 'object'
          ? {
              marginTop: margin.top,
              marginRight: margin.right,
              marginBottom: margin.bottom,
              marginLeft: margin.left,
            }
          : {}),
      }}
      data-testid={testid}
    >
      {children}
    </div>
  );
};
