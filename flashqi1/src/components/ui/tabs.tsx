'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string | number;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string | number;
  onChange: (tabId: string | number) => void;
  variant?: 'pill' | 'underline';
  className?: string;
}

export function Tabs({ 
  tabs, 
  activeTab, 
  onChange, 
  variant = 'pill',
  className 
}: TabsProps) {
  return (
    <div className={cn("overflow-x-auto hide-scrollbar", className)}>
      <div className="flex space-x-2 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              variant === 'pill' 
                ? cn(
                    "py-2 px-6 rounded-full text-sm font-medium",
                    activeTab === tab.id 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )
                : cn(
                    "py-2 px-4 text-sm font-medium border-b-2",
                    activeTab === tab.id 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                  )
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// A scrollable container for horizontal content
export function ScrollArea({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("overflow-x-auto hide-scrollbar", className)}>
      <div className="flex space-x-4 py-2 px-4">
        {children}
      </div>
    </div>
  );
} 