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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = React.useState(false);
  const [textStyle, setTextStyle] = React.useState<
    Partial<CSSStyleDeclaration>
  >({});
  
  // Generate a stable unique ID for the mask
  const maskId = useMemo(() => 
    `aurora-mask-${Math.random().toString(36).substring(2, 11)}`,
    []
  );

  // Force initialization on mobile with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isReady && textRef.current) {
        // Force dimension calculation after a delay
        const bbox = textRef.current.getBBox();
        if (bbox.width > 0 && bbox.height > 0) {
          setDimensions({
            width: bbox.width,
            height: bbox.height,
          });
          setIsReady(true);
        }
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isReady]);

  // Updated effect to compute all text styles from parent
  useEffect(() => {
    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current);

      // Extract text-related styles
      const relevantStyles = {
        fontSize: computedStyle.fontSize,
        fontFamily: computedStyle.fontFamily,
        fontWeight: computedStyle.fontWeight,
        fontStyle: computedStyle.fontStyle,
        letterSpacing: computedStyle.letterSpacing,
        lineHeight: computedStyle.lineHeight,
        textTransform: computedStyle.textTransform,
        fontVariant: computedStyle.fontVariant,
        fontStretch: computedStyle.fontStretch,
        fontFeatureSettings: computedStyle.fontFeatureSettings,
      };

      requestAnimationFrame(() => {
        setTextStyle(relevantStyles);
      });
    }
  }, [className]);

  // Updated effect to compute font size from both inline and class styles
  useEffect(() => {
    const updateFontSize = () => {
      if (containerRef.current) {
        const computedStyle = window.getComputedStyle(containerRef.current);
        const computedFontSize = parseFloat(computedStyle.fontSize);

        requestAnimationFrame(() => {
          setFontSize(computedFontSize);
        });
      }
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    return () => window.removeEventListener("resize", updateFontSize);
  }, [className]);

  // Update effect to set ready state after dimensions are computed
  useEffect(() => {
    const updateDimensions = () => {
      if (textRef.current) {
        const bbox = textRef.current.getBBox();
        if (bbox.width > 0 && bbox.height > 0) {
          setDimensions({
            width: bbox.width,
            height: bbox.height,
          });
          setIsReady(true);
        }
      }
    };

    // Try immediately and also on next frame to ensure SVG is rendered
    updateDimensions();
    requestAnimationFrame(updateDimensions);
    
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [children, fontSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = Math.max(dimensions.width, 10); // Ensure minimum size
    canvas.height = Math.max(dimensions.height, 10); // Ensure minimum size

    let time = 0;
    const baseSpeed = 0.008; // Original speed as base unit
    let animationFrame: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += baseSpeed * speed;

      // First pass - create base glow with larger radius
      colors.forEach((color, i) => {
        const x =
          canvas.width *
          (0.5 +
            Math.cos(time * 0.8 + i * 1.3) * 0.4 +
            Math.sin(time * 0.5 + i * 0.7) * 0.2);
        const y =
          canvas.height *
          (0.5 +
            Math.sin(time * 0.7 + i * 1.5) * 0.4 +
            Math.cos(time * 0.6 + i * 0.8) * 0.2);

        // Increased spread for wider glow
        const radius = canvas.width * 0.6; // Further increased from 0.5 to 0.6
        
        const gradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          radius,
        );

        // Increased opacity values for maximum visibility
        gradient.addColorStop(0, `${color}FF`); // Full opacity at center
        gradient.addColorStop(0.4, `${color}BB`); // 73% opacity at 40% radius
        gradient.addColorStop(0.8, `${color}44`); // 27% opacity at 80% radius
        gradient.addColorStop(1, "#00000000");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Second pass - add intense central glow with smaller radius
      colors.forEach((color, i) => {
        const x =
          canvas.width *
          (0.5 +
            Math.cos(time * 0.8 + i * 1.3) * 0.4 +
            Math.sin(time * 0.5 + i * 0.7) * 0.2);
        const y =
          canvas.height *
          (0.5 +
            Math.sin(time * 0.7 + i * 1.5) * 0.4 +
            Math.cos(time * 0.6 + i * 0.8) * 0.2);

        // Smaller radius for concentrated central glow
        const innerRadius = canvas.width * 0.2;
        
        const innerGradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          innerRadius,
        );

        // High intensity central glow
        innerGradient.addColorStop(0, `${color}FF`); // Full opacity
        innerGradient.addColorStop(0.7, `${color}88`); // Fade out
        innerGradient.addColorStop(1, "#00000000");

        // Use lighter composite operation for additive glow effect
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = innerGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over"; // Reset composite operation
      });

      animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [dimensions, colors, speed]);

  // String content for more reliable SVG rendering
  const childrenString = typeof children === 'string' ? children : String(children);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block align-middle ${className}`}
      style={{
        width: dimensions.width || "auto",
        height: dimensions.height || "auto",
      }}
    >
      {/* Hidden text for SEO */}
      <span className="sr-only">{children}</span>

      {/* Visual placeholder while canvas loads */}
      <span
        style={{
          opacity: isReady ? 0 : 1,
          transition: "opacity 0.2s ease-in",
          position: isReady ? "absolute" : "relative",
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
        aria-hidden="true"
      >
        {children}
      </span>

      <div
        className="absolute inset-0"
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.2s ease-in",
        }}
        aria-hidden="true"
      >
        <svg
          width={Math.max(dimensions.width, 10)}
          height={Math.max(dimensions.height, 10)}
          className="absolute inset-0"
          style={{
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="black" />
              <text
                ref={textRef}
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                style={textStyle as CSSProperties}
              >
                {childrenString}
              </text>
            </mask>
          </defs>
        </svg>

        <canvas
          ref={canvasRef}
          style={{
            maskImage: `url(#${maskId})`,
            WebkitMaskImage: `url(#${maskId})`,
            mixBlendMode: "normal",
          }}
          className="h-full w-full"
        />
      </div>
    </span>
  );
}
