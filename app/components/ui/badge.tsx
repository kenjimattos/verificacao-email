import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  href?: string;
};

export function Badge({ children, href }: BadgeProps) {
  const className = "px-2 py-1 bg-card text-muted text-xs rounded hover:bg-card/80 transition-colors";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return <span className={className}>{children}</span>;
}
