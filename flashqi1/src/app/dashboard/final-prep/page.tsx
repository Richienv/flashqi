import FinalPrepFlashcardSwiper from '@/components/tests/FinalPrepFlashcardSwiper';

export default function FinalPrepPage() {
  return (
    <div className="h-screen min-h-screen flex items-center justify-center bg-neutral-900 dark:bg-[#0e0e0e] relative overflow-hidden">
      {/* Animated mesh blobs background */}
      <div className="absolute top-1/2 left-1/2 w-[44vmin] h-[44vmin] rounded-full pointer-events-none" style={{background: 'linear-gradient(97deg, #2563eb 80%, transparent 100%)', filter: 'blur(3vmin)', opacity: 0.45, transform: 'translate(-60%, -59%) rotate(12deg) scale(1)'}}></div>
      <div className="absolute top-1/2 left-1/2 w-[38vmin] h-[48vmin] rounded-full pointer-events-none" style={{background: 'linear-gradient(120deg, #6366f1 95%, transparent 100%)', filter: 'blur(2vmin)', opacity: 0.45, transform: 'translate(-45%, -45%) rotate(-12deg) scale(1)'}}></div>
      <div className="absolute top-1/2 left-1/2 w-[36vmin] h-[36vmin] rounded-full bg-white dark:bg-gray-200 mix-blend-overlay pointer-events-none" style={{filter: 'blur(2vmin)', opacity: 0.10, transform: 'translate(-42%, -49%) scale(1)'}}></div>
      <div className="absolute top-1/2 left-1/2 w-[34vmin] h-[34vmin] rounded-full pointer-events-none" style={{background: 'linear-gradient(105deg, #fb923c 85%, transparent 100%)', filter: 'blur(1.5vmin)', opacity: 0.35, transform: 'translate(-48%, -54%) scale(1)'}}></div>
      {/* Center the flashcard swiper directly */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <FinalPrepFlashcardSwiper />
      </div>
    </div>
  );
} 