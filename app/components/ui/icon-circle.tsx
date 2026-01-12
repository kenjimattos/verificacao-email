import { ComponentType } from 'react';

type IconCircleProps = {
  icon: ComponentType<{ className?: string }>;
  size?: 'sm' | 'md';
  variant?: 'primary' | 'primary-light' | 'secondary';
};

const sizeStyles = {
  sm: {
    container: 'w-16 h-16',
    icon: 'w-8 h-8',
  },
  md: {
    container: 'w-20 h-20',
    icon: 'w-10 h-10 stroke-[2]',
  },
};

const variantStyles = {
  primary: {
    container: 'bg-primary',
    icon: 'text-white',
  },
  'primary-light': {
    container: 'bg-primary/10',
    icon: 'text-primary',
  },
  secondary: {
    container: 'bg-secondary',
    icon: 'text-white',
  },
};

export function IconCircle({ icon: Icon, size = 'md', variant = 'primary' }: IconCircleProps) {
  const sizeStyle = sizeStyles[size];
  const variantStyle = variantStyles[variant];

  return (
    <div className={`${sizeStyle.container} mx-auto rounded-full flex items-center justify-center ${variantStyle.container}`}>
      <Icon className={`${sizeStyle.icon} ${variantStyle.icon}`} />
    </div>
  );
}
