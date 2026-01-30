"use client";

import Link from "next/link";
import Image from "next/image";
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
      className="relative min-h-screen overflow-hidden bg-[#030014]"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-violet-500/20 via-transparent to-transparent animate-spin-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-conic from-cyan-500/20 via-transparent to-transparent animate-spin-reverse" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating orbs that follow mouse */}
      <div
        className="absolute w-96 h-96 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
          left: "20%",
          top: "30%",
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-[100px] transition-transform duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)",
          right: "15%",
          top: "40%",
          transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full blur-[80px] transition-transform duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(244,114,182,0.25) 0%, transparent 70%)",
          left: "50%",
          bottom: "20%",
          transform: `translate(${mousePosition.x}px, ${-mousePosition.y * 2}px)`,
        }}
      />

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
        {/* Minimal navigation */}
        <nav className="flex justify-between items-center p-6 sm:p-10">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-500/50 blur-xl rounded-full group-hover:bg-violet-400/60 transition-all" />
              <Image
                src="/flashqi-main-logo.png"
                alt="FlashQi"
                width={32}
                height={32}
                className="relative transition-transform group-hover:scale-110 group-hover:rotate-12"
              />
            </div>
            <span className="text-lg font-light text-white/90 tracking-widest uppercase">
              FlashQi
            </span>
          </Link>

          <Link
            href="/auth/login"
            className="text-white/70 hover:text-white text-sm tracking-wider transition-all hover:tracking-widest"
          >
            Sign In →
          </Link>
        </nav>

        {/* Hero - Center of the universe */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-5xl">
            {/* Floating Chinese characters */}
            <div className="relative mb-8">
              <span
                className="absolute -left-20 -top-16 text-7xl sm:text-9xl font-bold text-white/[0.03] select-none animate-float"
                style={{ animationDelay: "0s" }}
              >
                中
              </span>
              <span
                className="absolute -right-16 -top-8 text-6xl sm:text-8xl font-bold text-white/[0.03] select-none animate-float"
                style={{ animationDelay: "1s" }}
              >
                文
              </span>
              <span
                className="absolute left-1/4 -bottom-20 text-5xl sm:text-7xl font-bold text-white/[0.03] select-none animate-float"
                style={{ animationDelay: "2s" }}
              >
                学
              </span>
            </div>

            {/* Main headline with gradient text */}
            <h1 className="relative">
              <span className="block text-5xl sm:text-7xl lg:text-8xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 leading-[1.1] tracking-tight mb-4">
                Master Chinese
              </span>
              <span className="block text-4xl sm:text-6xl lg:text-7xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 animate-gradient-x">
                Without the pain
              </span>
            </h1>

            {/* Subtle description */}
            <p className="mt-8 text-lg sm:text-xl text-white/40 font-light max-w-xl mx-auto leading-relaxed">
              AI-powered spaced repetition. 2,900+ characters.
              <span className="text-white/60"> Actually works.</span>
            </p>

            {/* CTA Button - 2026 flat glass style */}
            <div className="mt-12">
              <Link
                href="/dashboard/flashcards"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-white/90 font-light text-lg tracking-wide transition-all duration-500 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white"
              >
                <span className="relative z-10">Start Learning</span>
                <span className="text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300">→</span>

                {/* Subtle gradient line at bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-2/3 transition-all duration-500" />
              </Link>
            </div>

            {/* Subtle stats */}
            <div className="mt-16 flex items-center justify-center gap-12 text-white/30 text-sm tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400/50 rounded-full animate-pulse" />
                <span>6,800+ learners</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-400/50 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                <span>97% retention</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                <span>15 min/day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        .bg-gradient-conic {
          background: conic-gradient(from 0deg, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
