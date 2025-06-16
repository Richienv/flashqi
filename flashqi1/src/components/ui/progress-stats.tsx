'use client';

import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: 'blue' | 'green' | 'amber' | 'default';
  className?: string;
}

export function StatCard({ label, value, color = 'default', className }: StatCardProps) {
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    amber: "text-amber-600 dark:text-amber-400",
    default: "text-slate-900 dark:text-slate-100"
  };

  return (
    <div className={cn("bg-white dark:bg-[#101010] border border-slate-200 dark:border-gray-800 rounded-lg p-4 shadow-sm dark:shadow-gray-900/20", className)}>
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</h3>
      <p className={cn("text-3xl font-bold", colorClasses[color])}>{value}</p>
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'amber';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabels = true,
  size = 'md',
  color = 'blue',
  className
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };
  
  const colorClasses = {
    blue: "bg-blue-600 dark:bg-blue-500",
    green: "bg-green-600 dark:bg-green-500",
    amber: "bg-amber-600 dark:bg-amber-500"
  };
  
  return (
    <div className={className}>
      {showLabels && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-600 dark:text-slate-400">Progress</span>
          <span className="text-slate-600 dark:text-slate-400">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-slate-200 dark:bg-gray-700 rounded-full", heightClasses[size])}>
        <div
          className={cn("rounded-full transition-all duration-300", heightClasses[size], colorClasses[color])}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
} 