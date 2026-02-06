'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function PremiumModal({ isOpen, onClose, featureName = 'HSK Vocabulary' }: PremiumModalProps) {
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
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || 'Invalid code');
        return;
      }
      setCouponSuccess(true);
      setCouponError('');
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
        <div className="absolute top-0 left-0 right-0 h-1 gold-shimmer-bar" />

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
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-light text-slate-900 mb-1">Welcome to Premium!</p>
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
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span className="absolute -top-2 right-2 text-[9px] save-badge text-white px-1.5 py-0.5 rounded-full font-medium">
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
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono tracking-widest text-center text-slate-900 placeholder:text-slate-300 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                />
                <button
                  onClick={handleRedeemCoupon}
                  disabled={couponCode.length !== 8 || couponLoading}
                  className="gold-shimmer-btn px-4 py-2 rounded-lg text-xs font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-md"
                >
                  {couponLoading ? '...' : 'Redeem'}
                </button>
              </div>
              {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
              <p className="text-[10px] text-slate-400 mt-1">Enter your 8-digit premium code</p>
            </div>

            <p className="text-center text-[10px] text-slate-400 mt-2">
              Purchase a code to unlock Premium instantly
            </p>
          </>
        )}

        <style jsx>{`
          .gold-shimmer-text {
            display: inline-block;
            background: linear-gradient(
              120deg,
              #8b6914 0%, #b8860b 5%, #daa520 9%, #ffd700 13%, #fff5c0 16%, #ffd700 19%,
              #b8860b 23%, #daa520 27%, #ffd700 31%, #ffe680 34%, #ffd700 37%,
              #b8860b 41%, #daa520 45%, #ffd700 49%, #fff5c0 52%, #ffd700 55%,
              #b8860b 59%, #daa520 63%, #ffd700 67%, #ffe680 70%, #ffd700 73%,
              #b8860b 77%, #daa520 81%, #ffd700 85%, #fff5c0 88%, #ffd700 91%,
              #b8860b 95%, #8b6914 100%
            );
            background-size: 300% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: goldShimmer 4s linear infinite;
          }
          .gold-shimmer-bar {
            background: linear-gradient(
              90deg,
              transparent 0%, #8b6914 5%, #ffd700 10%, #fff5c0 14%, #ffd700 18%,
              #b8860b 22%, #daa520 26%, #ffd700 30%, #ffe680 34%, #ffd700 38%,
              #b8860b 42%, #daa520 46%, #ffd700 50%, #fff5c0 54%, #ffd700 58%,
              #b8860b 62%, #daa520 66%, #ffd700 70%, #ffe680 74%, #ffd700 78%,
              #b8860b 82%, #ffd700 86%, #fff5c0 90%, #ffd700 94%, transparent 100%
            );
            background-size: 300% 100%;
            animation: goldShimmer 4s linear infinite;
          }
          .gold-shimmer-btn {
            background: linear-gradient(
              120deg,
              #8b6914 0%, #b8860b 5%, #daa520 10%, #ffd700 14%, #fff1a8 17%, #ffd700 20%,
              #b8860b 25%, #daa520 30%, #ffd700 34%, #ffe066 37%, #ffd700 40%,
              #b8860b 45%, #daa520 50%, #ffd700 54%, #fff1a8 57%, #ffd700 60%,
              #b8860b 65%, #daa520 70%, #ffd700 74%, #ffe066 77%, #ffd700 80%,
              #b8860b 85%, #daa520 90%, #ffd700 94%, #fff1a8 97%, #8b6914 100%
            );
            background-size: 300% 100%;
            animation: goldShimmer 4s linear infinite;
            box-shadow: 0 0 14px rgba(255, 215, 0, 0.35), inset 0 0 6px rgba(255, 255, 255, 0.15);
            text-shadow: 0 1px 2px rgba(139, 105, 20, 0.6);
          }
          .save-badge {
            background: linear-gradient(
              120deg,
              #b8860b 0%, #ffd700 20%, #fff1a8 40%, #ffd700 60%, #b8860b 80%, #ffd700 100%
            );
            background-size: 300% 100%;
            animation: goldShimmer 4s linear infinite;
          }
          @keyframes goldShimmer {
            0% { background-position: 300% 0; }
            100% { background-position: -300% 0; }
          }
        `}</style>
      </div>
    </div>
  );
}
