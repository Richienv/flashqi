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
      className="relative min-h-screen overflow-hidden font-sans"
      style={{
        background: "linear-gradient(180deg, #4A9EFF 0%, #87CEEB 40%, #B8E0FF 70%, #E8F4FF 100%)",
      }}
    >
      {/* Sunny sky clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[700px] h-[240px] rounded-full opacity-80 animate-cloud-drift"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
            left: "-15%",
            top: "6%",
          }}
        />
        <div
          className="absolute w-[520px] h-[190px] rounded-full opacity-70 animate-cloud-drift-slow"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
            right: "-10%",
            top: "14%",
          }}
        />
        <div
          className="absolute w-[560px] h-[210px] rounded-full opacity-60 animate-cloud-drift"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
            left: "30%",
            top: "10%",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Sun glow + sky orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-[140px] transition-transform duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(255,221,128,0.55) 0%, rgba(255,221,128,0) 70%)",
          left: "12%",
          top: "8%",
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-[100px] transition-transform duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
          right: "15%",
          top: "40%",
          transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full blur-[80px] transition-transform duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(125,211,252,0.25) 0%, transparent 70%)",
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
              <div className="absolute inset-0 bg-yellow-300/60 blur-xl rounded-full group-hover:bg-yellow-200/70 transition-all" />
              <Image
                src="/flashqi-main-logo.png"
                alt="FlashQi"
                width={32}
                height={32}
                className="relative transition-transform group-hover:scale-110 group-hover:rotate-12"
              />
            </div>
            <span className="text-lg font-light text-white/90 tracking-widest uppercase drop-shadow">
              FlashQi
            </span>
          </Link>

          <Link
            href="/auth/login"
            className="text-white/80 hover:text-white text-sm tracking-wider transition-all hover:tracking-widest drop-shadow"
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
              <span className="block text-5xl sm:text-7xl lg:text-8xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 leading-[1.1] tracking-tight mb-4 drop-shadow">
                Master Chinese
              </span>
            </h1>

            {/* Subtle description */}
            <p className="mt-8 text-lg sm:text-xl text-white/70 font-light max-w-xl mx-auto leading-relaxed drop-shadow">
              AI-powered spaced repetition. 2,900+ characters.
              <span className="text-white/90"> Actually works.</span>
            </p>

            {/* CTA Button - 2026 flat glass style */}
            <div className="mt-12">
              <Link
                href="/dashboard/flashcards"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/70 text-black font-light text-lg tracking-wide transition-all duration-500 hover:bg-white/85 hover:border-white/90 hover:text-black shadow-xl"
              >
                <span className="relative z-10">Start Learning</span>
                <span className="text-black/50 group-hover:text-black/80 group-hover:translate-x-1 transition-all duration-300">→</span>

                {/* Subtle gradient line at bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-2/3 transition-all duration-500" />
              </Link>
            </div>

            {/* Subtle stats */}
            <div className="mt-16 flex items-center justify-center gap-12 text-white/70 text-sm tracking-wider drop-shadow">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                <span>6,800+ learners</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                <span>97% retention</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 bg-sky-200 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                <span>15 min/day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <div className="w-6 h-10 border border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-pulse" />
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
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        .animate-cloud-drift {
          animation: cloud-drift 24s ease-in-out infinite;
        }
        .animate-cloud-drift-slow {
          animation: cloud-drift 38s ease-in-out infinite;
        }
        @keyframes cloud-drift {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(60px);
          }
        }
      `}</style>
    </div>
  );
}
