import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="px-2 py-1 bg-card text-muted text-xs rounded">
      {children}
    </span>
  );
}
