import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`p-3 bg-card rounded-lg ${className} text-left space-y-4`}>
      {children}
    </div>
  );
}
