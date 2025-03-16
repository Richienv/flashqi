import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with subtle zoom animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url(/bg-flashqi.jpeg)',
          animation: 'slowZoom 20s ease-in-out infinite alternate'
        }}
      >
        <div className="absolute inset-0 bg-black/85" /> {/* Increased overlay opacity from 70% to 85% for a dimmer background */}
      </div>
      
      {/* Navbar - Minimalist with fade-in animation */}
      <header className="relative z-10 w-full py-6 px-8 animate-fade-in">
        <div className="flex justify-between items-center">
          {/* Brand Logo/Name */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">FlashQi</span>
          </Link>
          
          {/* Sign In Button - Top Right */}
          <Link href="/auth/login">
            <Button variant="ghost" className="text-white hover:bg-white/10 transition-all duration-300">
              Sign In
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Hero Content - Centered with staggered animations */}
      <main className="relative z-10 flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center px-4 max-w-2xl">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Zhejiang Level 1 <AuroraText className="text-5xl font-bold md:text-6xl" colors={["#38bdf8", "#a855f7", "#2dd4bf", "#0070F3", "#6366f1"]}>Blueprint</AuroraText>
          </h1>
          <p className="text-xl text-white/90 mb-10 animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Crush your Zhejiang Level 1 dictation test with our flashcard - Powered by spaced repetition
          </p>
          <div className="flex justify-center animate-slide-up opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            <Link href="/dashboard/flashcards">
              <Button 
                variant="primary" 
                size="lg" 
                className="px-10 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      {/* Visual Navigation Indicator with pulse animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in" style={{ animationDelay: '1.2s' }}>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-white opacity-100 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 z-10 animate-bounce hidden md:block opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
        <p className="text-white text-sm tracking-widest uppercase rotate-90 transform origin-bottom-left">Scroll</p>
      </div>
    </div>
  );
}
