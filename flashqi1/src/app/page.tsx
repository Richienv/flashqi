"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Fixed particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 5, top: 10 }, { left: 15, top: 25 }, { left: 25, top: 8 },
  { left: 35, top: 45 }, { left: 45, top: 15 }, { left: 55, top: 60 },
  { left: 65, top: 30 }, { left: 75, top: 70 }, { left: 85, top: 20 },
  { left: 95, top: 50 }, { left: 10, top: 80 }, { left: 20, top: 55 },
  { left: 30, top: 90 }, { left: 40, top: 35 }, { left: 50, top: 75 },
  { left: 60, top: 5 }, { left: 70, top: 85 }, { left: 80, top: 40 },
  { left: 90, top: 65 }, { left: 12, top: 95 },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-sans bg-white"
    >
      {/* Minimal animated light wash */}
      <div
        className="absolute -left-24 top-24 h-80 w-80 rounded-full blur-[140px] opacity-70 animate-soft-float"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(96,165,250,0) 70%)",
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
        }}
      />
      <div
        className="absolute -right-24 top-1/2 h-72 w-72 rounded-full blur-[140px] opacity-60 animate-soft-float-delayed"
        style={{
          background: "radial-gradient(circle, rgba(147,197,253,0.18) 0%, rgba(147,197,253,0) 70%)",
          transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.18)_1px,transparent_0)] [background-size:28px_28px] opacity-40" />

      {/* Floating particles */}
      {PARTICLE_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + (i % 3)}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="p-6 sm:p-10" />

        {/* Hero - Center of the universe */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-5xl">
            {/* Floating Chinese characters */}
            {/* Main headline with gradient text */}
            <h1 className="relative">
              <span className="block text-5xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700 leading-[1.1] tracking-tight mb-4">
                Chinese with ZJU Curriculum + AI
              </span>
            </h1>

            {/* Subtle description */}
            <p className="mt-8 text-lg sm:text-xl text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
              Learn Zhejiang University Mandarin with focused AI practice.
              <span className="text-slate-800"> Simple. Minimal. Effective.</span>
            </p>

            {/* CTA Button - 2026 flat glass style */}
            <div className="mt-12">
              <Link
                href="/dashboard/flashcards"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-slate-900 font-light text-lg tracking-wide transition-all duration-500"
              >
                <span className="relative z-10 shimmer-text font-bold">Start Learning</span>
                <span className="text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all duration-300">→</span>
              </Link>
            </div>

            <div className="mt-4 text-[10px] tracking-widest shimmer-text text-center">
              -created by Richie Kid novell
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <div className="w-6 h-10 border border-slate-300 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-slate-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        .shimmer-text {
          display: inline-block;
          background: linear-gradient(120deg, rgba(15,61,150,0.9) 0%, rgba(86,171,255,0.95) 35%, rgba(15,61,150,0.85) 60%, rgba(86,171,255,1) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 120% 0; }
          100% { background-position: -120% 0; }
        }
        @keyframes soft-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-18px);
          }
        }
        .animate-soft-float {
          animation: soft-float 12s ease-in-out infinite;
        }
        .animate-soft-float-delayed {
          animation: soft-float 16s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
