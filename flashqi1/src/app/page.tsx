import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/flashqi-main-logo.png"
                alt="FlashQi"
                width={28}
                height={28}
                className="transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-light text-white tracking-wide">FlashQi</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="#features" className="text-slate-300 hover:text-white text-sm font-light transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-slate-300 hover:text-white text-sm font-light transition-colors">
                About
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 font-light">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-thin text-white mb-6 tracking-tight">
              Actually Learn Chinese
              <span className="block text-blue-400 font-extralight">That Sticks</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Skip the boring textbooks. Master 2,900+ Chinese characters through AI-powered spaced repetition that actually works. 
              Built for Zhejiang Level 1 prep (and crushing your exams).
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard/flashcards">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-light text-lg transition-all duration-300 hover:scale-105">
                  Start Learning (Free)
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:bg-white/5 px-8 py-3 font-light text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-thin text-white mb-4">Why FlashQi Hits Different</h2>
            <p className="text-slate-400 font-light text-lg max-w-2xl mx-auto">
              Real features that actually help you learn faster (not just flashy marketing)
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Smart Spaced Repetition</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                AI figures out exactly when you'll forget something and shows it to you right before. No more cramming - just 15 mins/day for 97% retention rate.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V4M7 4H17M7 4L5 6M17 4L19 6M5 6V20C5 21.1046 5.89543 22 7 22H17C17.1046 22 18 21.1046 18 20V6M5 6H19" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">2,900+ Interactive Cards</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Every card has Hanzi + Pinyin + English + real example sentences. Swipe through them like TikTok, but actually productive.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Voice Recognition That Works</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Actually get your tones right. Real-time feedback tells you if you sound like a native or a confused tourist. 85% accuracy improvement guaranteed.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Write Like You Mean It</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Master all 214 radicals with guided stroke order. AI recognizes your handwriting in real-time - no more chicken scratch that embarrasses you.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Track Your Wins</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                See exactly which 847 characters you've mastered, your 30-day streak, and how you're destroying your learning goals. Pure dopamine.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-2">Battle Your Friends</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Real-time multiplayer flashcard battles. Finally settle who's actually better at Chinese. Loser buys bubble tea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-thin text-white mb-4">Built Different, Built Better</h2>
              <p className="text-slate-400 font-light text-lg">
                Real science meets real results. No fluff, just what actually works.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-light text-white mb-6">The Science That Actually Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 font-light">
                      <strong className="text-white">97% retention rate:</strong> Spaced repetition that's actually smart, not just random intervals like other apps
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 font-light">
                      <strong className="text-white">4x faster learning:</strong> Visual + audio + writing practice = your brain actually remembers stuff
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 font-light">
                      <strong className="text-white">15 minutes daily:</strong> That's literally one TikTok scroll session but you'll actually be fluent in a year
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
                <h4 className="text-lg font-light text-white mb-4">Who's Actually Using This:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300 font-light">3,400+ students crushing Zhejiang Level 1</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300 font-light">HSK prep that doesn't suck</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300 font-light">College kids avoiding textbook hell</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300 font-light">Anyone tired of wasting time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-thin text-white mb-6">
            Stop Procrastinating. Start Winning.
          </h2>
          <p className="text-xl text-slate-300 font-light mb-8">
            6,800+ people already flexing their Chinese skills. Your move.
          </p>
          <Link href="/dashboard/flashcards">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-light transition-all duration-300 hover:scale-105">
              Let's Go (It's Free)
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/flashqi-main-logo.png"
                alt="FlashQi"
                width={24}
                height={24}
              />
              <span className="text-slate-400 font-light">© 2024 FlashQi. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-slate-400 hover:text-white font-light text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white font-light text-sm">
                Terms
              </Link>
              <Link href="/contact" className="text-slate-400 hover:text-white font-light text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
