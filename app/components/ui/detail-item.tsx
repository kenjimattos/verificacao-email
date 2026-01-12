import { ComponentType, ReactNode } from 'react';

type DetailItemProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
  iconColor?: string;
  valueColor?: string;
};

export function DetailItem({
  icon: Icon,
  label,
  value,
  iconColor = 'text-primary',
  valueColor = '',
}: DetailItemProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <div>
        <small>{label}</small>
        <p className={valueColor}>{value}</p>
      </div>
    </div>
  );
}
