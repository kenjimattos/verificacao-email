import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-card text-foreground hover:bg-card/80',
};

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`w-full py-3 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
