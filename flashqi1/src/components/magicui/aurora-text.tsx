"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import type { CSSProperties } from "react";
// @ts-ignore
import React, { useEffect, useRef, useState, useMemo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number; // 1 is default speed, 2 is twice as fast, 0.5 is half speed
}

export function AuroraText({
  children,
  className = "",
  colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8", "#a855f7", "#2dd4bf"],
  speed = 1,
}: AuroraTextProps) {
  // Create refs for our components
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // State management
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [uniqueId] = useState(() => `aurora-mask-${Math.random().toString(36).slice(2, 11)}`);
  
  // Set mounted flag on client side
  useEffect(() => {
    setIsMounted(true);
    console.log("Aurora Text: Component mounted");
  }, []);
  
  // Get dimensions from the text element
  useEffect(() => {
    if (!isMounted || !textRef.current) return;
    
    const updateDimensions = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        
        // Only update if we have valid dimensions
        if (rect.width > 0 && rect.height > 0) {
          console.log("Aurora Text: Setting dimensions", { width: rect.width, height: rect.height });
          setDimensions({
            width: rect.width,
            height: rect.height
          });
          setIsReady(true);
        }
      }
    };
    
    // Initial update
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Force multiple updates to ensure we get dimensions
    setTimeout(updateDimensions, 50);
    setTimeout(updateDimensions, 200);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isMounted, children]);
  
  // Canvas animation effect
  useEffect(() => {
    if (!isReady || !canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    let time = 0;
    let animationFrame: number;
    
    // Animation function
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Increment time
      time += 0.01 * speed;
      
      // Draw gradients for each color
      colors.forEach((color, i) => {
        // Calculate position based on time
        const x = canvas.width * (0.5 + Math.sin(time + i * 0.5) * 0.3);
        const y = canvas.height * (0.5 + Math.cos(time + i * 0.7) * 0.3);
        
        // Create gradient
        const radius = Math.max(canvas.width, canvas.height) * 0.8;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        
        // Set gradient colors with high opacity for visibility
        gradient.addColorStop(0, `${color}FF`);
        gradient.addColorStop(0.5, `${color}88`);
        gradient.addColorStop(1, `${color}00`);
        
        // Draw gradient
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      // Continue animation
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Force a redraw after a delay in case of any race conditions
    setTimeout(() => {
      if (ctx && canvas) {
        console.log("Aurora Text: Force redraw");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animate();
      }
    }, 300);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [colors, dimensions, isReady, speed]);
  
  // Don't render anything fancy on server
  if (!isMounted) {
    return (
      <span className={className} style={{ color: 'white' }}>
        {children}
      </span>
    );
  }
  
  // Client-side rendering with effects
  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ position: 'relative' }}
    >
      {/* Hidden version for screen readers */}
      <span className="sr-only">{children}</span>
      
      {/* Visible text that will mask the effects */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textShadow: '0 0 10px rgba(255,255,255,0.5)',
          mixBlendMode: 'normal'
        }}
        aria-hidden="true"
      >
        {children}
      </div>
      
      {/* Canvas effect that will be masked */}
      {isReady && dimensions.width > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            mask: `url(#${uniqueId})`,
            WebkitMask: `url(#${uniqueId})`,
            overflow: 'hidden'
          }}
        >
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              mixBlendMode: 'screen',
              opacity: 0.9
            }}
          />
        </div>
      )}
      
      {/* SVG definitions for the mask */}
      <svg 
        style={{ 
          position: 'absolute', 
          width: 0, 
          height: 0, 
          overflow: 'hidden' 
        }} 
        aria-hidden="true"
      >
        <defs>
          <mask id={uniqueId}>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={dimensions.height * 0.8}
              fontWeight="bold"
            >
              {typeof children === 'string' ? children : String(children)}
            </text>
          </mask>
        </defs>
      </svg>
    </div>
  );
}
