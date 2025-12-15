import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-[600px] w-full p-8 text-center rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}
