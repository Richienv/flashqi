'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function PremiumCheckoutPage() {
  const { user, refreshPremiumStatus } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [couponCode, setCouponCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const monthlyPrice = 25;
  const yearlyPrice = Math.round(monthlyPrice * 12 * 0.6);

  useEffect(() => {
    if (!user?.id) return;
    const controller = new AbortController();
    fetch('/api/track-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email }),
      signal: controller.signal,
    }).catch(() => {});
    return () => controller.abort('Component unmounted');
  }, [user?.id, user?.email]);

  const handleRedeem = async () => {
    if (!couponCode.trim()) {
      setRedeemError('Please enter a coupon code');
      return;
    }

    if (!user) {
      setRedeemError('Please log in to redeem a coupon');
      return;
    }

    setIsRedeeming(true);
    setRedeemError(null);

    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim().toUpperCase(), userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to redeem coupon');
      }

      setRedeemSuccess(true);
      await refreshPremiumStatus();
      // Gold confetti burst
      const gold = ['#FFD700', '#DAA520', '#FFA500', '#B8860B', '#FFE066'];
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: gold });
      setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 }, colors: gold }), 300);
      setTimeout(() => {
        router.push('/dashboard/flashcards');
      }, 3000);
    } catch (err: any) {
      setRedeemError(err.message);
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6">
      {/* Back link */}
      <div className="w-full max-w-md pt-8 mb-12">
        <Link href="/dashboard/flashcards" className="text-sm text-black hover:text-slate-600 transition-colors font-light">
          &larr; Back
        </Link>
      </div>

      {/* Success State */}
      {redeemSuccess ? (
        <div className="text-center py-20 w-full max-w-md">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-amber-50 flex items-center justify-center">
            <svg className="w-7 h-7 gold-shimmer-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-light tracking-wide mb-3 text-slate-900">Welcome to <span className="gold-shimmer-text">Premium</span></h2>
          <p className="text-sm text-black font-light mb-6">All features are now unlocked. Redirecting...</p>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="shimmer-text text-3xl font-light tracking-wide mb-2">Premium</h1>
            <p className="text-sm text-black font-light">Unlock all features</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {[
              'All HSK 1-5 vocabulary decks (2,500+ words)',
              'Unlimited AI translations per day',
              'Priority AI translation speed',
              'Exclusive study analytics',
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-black font-light">{feature}</span>
              </div>
            ))}
          </div>

          {/* Plan Selection */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`flex-1 py-3 rounded-xl text-center text-sm transition-all ${
                selectedPlan === 'monthly'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-black hover:border-slate-300'
              }`}
            >
              <div className="font-medium">Monthly</div>
              <div className="text-xs opacity-70">&yen;{monthlyPrice}/mo</div>
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`flex-1 py-3 rounded-xl text-center text-sm transition-all relative ${
                selectedPlan === 'yearly'
                  ? 'bg-transparent border-2 border-amber-400 text-amber-700'
                  : 'bg-transparent border border-slate-200 text-black hover:border-amber-300'
              }`}
            >
              <span className="absolute -top-2 right-2 text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                SAVE 40%
              </span>
              <div className="font-medium">Yearly</div>
              <div className="text-xs opacity-70">&yen;{yearlyPrice}/yr</div>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-light">How to purchase</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          {/* Vertical step-by-step chain */}
          <div className="relative mb-10">
            {/* Vertical connector line */}
            <div className="absolute left-[15px] top-8 bottom-8 w-px bg-slate-200"></div>

            {/* Step 1 */}
            <div className="relative flex gap-4 mb-8">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 z-10">
                1
              </div>
              <div className="pt-0.5">
                <p className="text-sm font-medium text-black mb-1.5">Add on WeChat &amp; send payment</p>
                <p className="text-xs text-black font-light mb-3">
                  Search and add the WeChat ID below, then send your payment for the {selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'} plan.
                </p>
                <p className="text-sm mb-2 text-black">
                  WeChat ID: <span className="green-shimmer font-bold tracking-wide">richienv</span>
                </p>
                <p className="text-xs text-black font-light">
                  Send this message: <span className="green-shimmer font-semibold text-xs">&ldquo;{selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'} Premium &ndash; {user?.email || 'your email'}&rdquo;</span>
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex gap-4 mb-8">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 z-10">
                2
              </div>
              <div className="pt-0.5">
                <p className="text-sm font-medium text-black mb-1.5">Receive your premium code</p>
                <p className="text-xs text-black font-light">
                  Once payment is confirmed, you will receive a unique <span className="font-medium">8-digit redemption code</span> within ~3 minutes via WeChat.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 z-10">
                3
              </div>
              <div className="pt-0.5 flex-1">
                <p className="text-sm font-medium text-black mb-1.5">Redeem &amp; unlock instantly</p>
                <p className="text-xs text-black font-light mb-4">
                  Enter your code below and your account will be upgraded to <span className="font-medium">Premium</span> immediately.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8));
                      setRedeemError(null);
                    }}
                    placeholder="XXXXXXXX"
                    maxLength={8}
                    className={`flex-1 border-b bg-transparent pb-3 text-sm font-mono tracking-widest text-center placeholder:text-slate-300 focus:outline-none transition-colors ${
                      couponCode.length > 0
                        ? 'border-amber-400 text-black'
                        : 'border-slate-200 text-black focus:border-slate-900'
                    }`}
                  />
                  <button
                    onClick={handleRedeem}
                    disabled={couponCode.length < 8 || isRedeeming}
                    className="bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    {isRedeeming ? '...' : 'Redeem'}
                  </button>
                </div>
                {redeemError && (
                  <p className="text-xs text-red-500 mt-2 font-light">{redeemError}</p>
                )}
                <p className="text-[10px] text-black mt-2 font-light">Enter your 8-digit premium code</p>
              </div>
            </div>
          </div>

          {!user && (
            <p className="text-center text-xs text-black font-light mb-6">
              Please <Link href="/auth/login" className="text-black hover:text-slate-600 transition-colors underline">log in</Link> first to redeem.
            </p>
          )}

          <p className="text-center text-[10px] text-black font-light mt-4 mb-12">
            Questions? Contact us on WeChat: <span className="green-shimmer font-medium">richienv</span>
          </p>
        </div>
      )}

      <style jsx>{`
        .shimmer-text {
          display: inline-block;
          background: linear-gradient(120deg, rgba(15,61,150,0.9) 0%, rgba(86,171,255,0.95) 35%, rgba(15,61,150,0.85) 60%, rgba(86,171,255,1) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s ease-in-out infinite;
        }
        .green-shimmer {
          display: inline-block;
          background: linear-gradient(120deg, #059669 0%, #10b981 35%, #059669 60%, #34d399 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s ease-in-out infinite;
        }
        .gold-shimmer-text {
          display: inline-block;
          background: linear-gradient(120deg, #b8860b 0%, #ffd700 35%, #b8860b 60%, #ffd700 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s ease-in-out infinite;
        }
        .gold-shimmer-check {
          stroke: #daa520;
          filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.5));
          animation: goldCheckPulse 2s ease-in-out infinite;
        }
        @keyframes goldCheckPulse {
          0%, 100% { stroke: #b8860b; filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.3)); }
          50% { stroke: #ffd700; filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)); }
        }
        @keyframes shimmer {
          0% { background-position: 120% 0; }
          100% { background-position: -120% 0; }
        }
      `}</style>
    </div>
  );
}
