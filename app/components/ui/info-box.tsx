import { ReactNode } from 'react';

type InfoBoxProps = {
  variant: 'info' | 'error';
  title?: string;
  children: ReactNode;
};

const variantStyles = {
  info: {
    container: 'bg-info-50 border-info-100',
    title: 'text-info-800',
    content: 'text-info-700',
  },
  error: {
    container: 'bg-error-50 border-error-200',
    title: 'text-error-800',
    content: 'text-error-800',
  },
};

export function InfoBox({ variant, title, children }: InfoBoxProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`border rounded-lg p-4 text-left ${styles.container}`}>
      {title && (
        <p className={`text-sm font-medium mb-2 ${styles.title}`}>{title}</p>
      )}
      <div className={`text-sm ${styles.content}`}>{children}</div>
    </div>
  );
}
