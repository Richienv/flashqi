'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/auth-context';
import confetti from 'canvas-confetti';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function PremiumModal({ isOpen, onClose, featureName = 'HSK Vocabulary' }: PremiumModalProps) {
  const router = useRouter();
  const { user, refreshPremiumStatus } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRedeemCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (code.length !== 8) {
      setCouponError('Code must be 8 characters');
      return;
    }
    if (!/^[A-Z0-9]{8}$/.test(code)) {
      setCouponError('Code must be alphanumeric (A-Z, 0-9)');
      return;
    }

    setCouponLoading(true);
    setCouponError('');

    try {
      const res = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, userId: user?.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || 'Invalid code');
        return;
      }
      setCouponSuccess(true);
      setCouponError('');
      await refreshPremiumStatus();
      // Gold confetti burst
      const gold = ['#FFD700', '#DAA520', '#FFA500', '#B8860B', '#FFE066'];
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: gold });
      setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 }, colors: gold }), 300);
    } catch {
      setCouponError('Network error. Try again.');
    } finally {
      setCouponLoading(false);
    }
  };

  const monthlyPrice = 25;
  const yearlyPrice = Math.round(monthlyPrice * 12 * 0.6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-amber-200/60 p-6 relative animate-in fade-in zoom-in duration-200 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 gold-static-bar" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z" />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-xl font-light text-slate-900 mb-1">
          <span className="gold-shimmer-text">Upgrade to Premium</span>
        </h2>
        <p className="text-center text-xs text-slate-400 mb-5">
          Unlock {featureName} and more
        </p>

        {couponSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-amber-50 flex items-center justify-center">
              <svg className="w-7 h-7 gold-shimmer-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-light text-slate-900 mb-1">Welcome to <span className="gold-shimmer-text font-medium">Premium</span>!</p>
            <p className="text-xs text-slate-400">All features are now unlocked.</p>
            <button onClick={onClose} className="mt-4 text-sm text-slate-500 hover:text-slate-900">Close</button>
          </div>
        ) : (
          <>
            <div className="space-y-2.5 mb-5">
              {[
                'All HSK 1-5 vocabulary decks (2,500+ words)',
                'Unlimited AI translations per day',
                'Priority AI translation speed',
                'Exclusive study analytics',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-600 font-light">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`flex-1 py-2.5 rounded-xl text-center text-sm transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="font-medium">Monthly</div>
                <div className="text-xs opacity-70">&yen;{monthlyPrice}/mo</div>
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`flex-1 py-2.5 rounded-xl text-center text-sm transition-all relative ${
                  selectedPlan === 'yearly'
                    ? 'bg-transparent border-2 border-amber-400 text-amber-600'
                    : 'bg-transparent border border-slate-200 text-slate-500 hover:border-amber-300'
                }`}
              >
                <span className="absolute -top-2 right-2 text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                  SAVE 40%
                </span>
                <div className="font-medium">Yearly</div>
                <div className="text-xs opacity-70">&yen;{yearlyPrice}/yr</div>
              </button>
            </div>

            {/* Coupon code input */}
            <div className="mb-3">
              <label className="block text-[10px] uppercase tracking-[0.15em] text-slate-400 mb-1.5">Redeem Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8));
                    setCouponError('');
                  }}
                  placeholder="XXXXXXXX"
                  maxLength={8}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-mono tracking-widest text-center placeholder:text-slate-300 focus:outline-none transition-all duration-300 ${couponCode.length > 0 ? 'border border-amber-400 bg-amber-50 text-amber-800' : 'border border-slate-200 bg-white text-slate-900 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30'}`}
                />
                <button
                  onClick={handleRedeemCoupon}
                  disabled={couponCode.length !== 8 || couponLoading}
                  className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-md"
                >
                  {couponLoading ? '...' : 'Redeem'}
                </button>
              </div>
              {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
              <p className="text-[10px] text-slate-400 mt-1">Enter your 8-digit premium code</p>
            </div>

            <button
              onClick={() => { onClose(); router.push('/premium'); }}
              className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium transition-all gold-shimmer-btn text-white shadow-md hover:shadow-lg"
            >
              Go to Checkout
            </button>

            <p className="text-center text-[10px] text-slate-400 mt-2">
              Purchase a code to unlock Premium instantly
            </p>
          </>
        )}

        <style jsx>{`
          .gold-shimmer-text {
            display: inline-block;
            background: linear-gradient(120deg, #b45309, #d97706);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .gold-static-bar {
            background: linear-gradient(90deg, transparent 0%, #daa520 15%, #ffd700 50%, #daa520 85%, transparent 100%);
          }
          .gold-shimmer-btn {
            background: linear-gradient(
              120deg,
              #8b6914 0%, #b8860b 10%, #daa520 20%, #ffd700 30%, #fff1a8 40%, #ffd700 50%,
              #daa520 60%, #b8860b 70%, #ffd700 80%, #fff1a8 90%, #8b6914 100%
            );
            background-size: 200% 100%;
            animation: goldShimmer 3s linear infinite;
            box-shadow: 0 0 14px rgba(255, 215, 0, 0.35);
          }
          @keyframes goldShimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
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
          .coupon-input-gold {
            background: #fffbeb;
            border-color: #fbbf24;
            color: #b45309;
          }
        `}</style>
      </div>
    </div>
  );
}
