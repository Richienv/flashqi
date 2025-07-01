'use client';
import React, { type JSX } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}

export function TextShimmer({
  children,
  as: Component = 'div',
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) {
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);

  return (
    <MotionComponent
      className={cn(
        'relative inline-block bg-gradient-to-r from-transparent via-gray-900 dark:via-gray-100 to-transparent bg-clip-text text-transparent bg-[length:200%_100%]',
        className
      )}
      animate={{
        backgroundPosition: ['200% 0%', '-200% 0%'],
      }}
      transition={{
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      {children}
    </MotionComponent>
  );
} 