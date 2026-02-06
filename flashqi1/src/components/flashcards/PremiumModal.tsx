'use client';

import { useState } from 'react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function PremiumModal({ isOpen, onClose, featureName = 'HSK Vocabulary' }: PremiumModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-amber-200/60 p-6 relative animate-in fade-in zoom-in duration-200 overflow-hidden">
        {/* Gold shimmer background accent */}
        <div className="absolute top-0 left-0 right-0 h-1 gold-shimmer-bar" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Crown icon */}
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

        {/* Features */}
        <div className="space-y-2.5 mb-5">
          {[
            'All HSK 1–5 vocabulary decks (2,500+ words)',
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

        {/* Plan toggle */}
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
            <div className="text-xs opacity-70">¥28/mo</div>
          </button>
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`flex-1 py-2.5 rounded-xl text-center text-sm transition-all relative ${
              selectedPlan === 'yearly'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
          >
            {selectedPlan === 'yearly' && (
              <span className="absolute -top-2 right-2 text-[9px] bg-amber-400 text-white px-1.5 py-0.5 rounded-full font-medium">
                SAVE 40%
              </span>
            )}
            <div className="font-medium">Yearly</div>
            <div className="text-xs opacity-70">¥198/yr</div>
          </button>
        </div>

        {/* Subscribe button */}
        <button
          onClick={() => {
            // TODO: Integrate with payment provider
            alert('Premium subscription coming soon! Stay tuned.');
          }}
          className="w-full py-3 rounded-xl text-center gold-shimmer-btn transition-all hover:shadow-md"
        >
          <span className="text-sm font-medium text-white tracking-wide">
            Subscribe Now
          </span>
        </button>

        <p className="text-center text-[10px] text-slate-400 mt-3">
          Cancel anytime · 7-day free trial
        </p>

        <style jsx>{`
          .gold-shimmer-text {
            display: inline-block;
            background: linear-gradient(120deg, #b8860b 0%, #ffd700 30%, #b8860b 50%, #ffd700 80%, #b8860b 100%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: goldShimmer 3s ease-in-out infinite;
          }
          .gold-shimmer-bar {
            background: linear-gradient(90deg, transparent, #ffd700, #b8860b, #ffd700, transparent);
            background-size: 200% 100%;
            animation: goldShimmer 3s ease-in-out infinite;
          }
          .gold-shimmer-btn {
            background: linear-gradient(120deg, #b8860b 0%, #daa520 30%, #b8860b 60%, #daa520 100%);
            background-size: 200% 100%;
            animation: goldShimmer 3s ease-in-out infinite;
          }
          @keyframes goldShimmer {
            0% { background-position: 120% 0; }
            100% { background-position: -120% 0; }
          }
        `}</style>
      </div>
    </div>
  );
}
