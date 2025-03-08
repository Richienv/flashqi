import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Learn Chinese with <span className="text-blue-600">FlashQi</span>
              </h1>
              <p className="mt-6 text-xl text-slate-600">
                Master Mandarin Chinese with our effective flashcard system that uses spaced repetition to optimize your learning.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link href="/dashboard/flashcards">
                  <Button variant="outline" size="lg">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Features</h2>
              <p className="mt-4 text-lg text-slate-600">Everything you need to learn Chinese effectively</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Spaced Repetition</h3>
                <p className="text-slate-600">Our smart algorithm presents cards at optimal intervals to maximize retention.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Structured Lessons</h3>
                <p className="text-slate-600">Learn progressively with carefully designed lessons that build on each other.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Community Discussion</h3>
                <p className="text-slate-600">Learn with others by leaving comments and discussing difficult concepts.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">FlashQi</span>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <Link href="/about" className="text-slate-300 hover:text-white">
                About
              </Link>
              <Link href="/privacy" className="text-slate-300 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-300 hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="text-slate-300 hover:text-white">
                Contact
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-slate-400 text-sm">© 2024 FlashQi. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
