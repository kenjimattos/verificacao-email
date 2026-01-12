import { ReactNode } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

type AlertProps = {
  variant: 'success' | 'error';
  title: string;
  children: ReactNode;
};

const variants = {
  success: {
    container: 'bg-success-50 border-success-200',
    icon: CheckCircle,
    iconColor: 'text-success-600',
    title: 'text-success-800',
    text: 'text-success-600',
  },
  error: {
    container: 'bg-error-50 border-error-200',
    icon: AlertCircle,
    iconColor: 'text-error-600',
    title: 'text-error-800',
    text: 'text-error-600',
  },
};

export function Alert({ variant, title, children }: AlertProps) {
  const styles = variants[variant];
  const Icon = styles.icon;

  return (
    <div className={`p-4 border rounded-lg flex items-start gap-3 ${styles.container}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${styles.iconColor}`} />
      <div className="text-left">
        <p className={`font-medium ${styles.title}`}>{title}</p>
        <p className={`text-sm mt-1 ${styles.text}`}>{children}</p>
      </div>
    </div>
  );
}
