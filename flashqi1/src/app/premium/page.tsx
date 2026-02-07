'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type PlanType = 'monthly' | 'yearly';

export default function PremiumCheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
  const [couponCode, setCouponCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [step, setStep] = useState<'select' | 'contact' | 'redeem'>('select');

  const plans = {
    monthly: {
      name: 'Monthly',
      price: 29,
      currency: '¥',
      period: '/month',
      features: ['All HSK 1-5 vocabulary', 'Unlimited AI translations', 'Spaced repetition', 'Progress tracking'],
    },
    yearly: {
      name: 'Yearly',
      price: 199,
      originalPrice: 348,
      currency: '¥',
      period: '/year',
      savings: '43%',
      features: ['All HSK 1-5 vocabulary', 'Unlimited AI translations', 'Spaced repetition', 'Progress tracking', 'Priority support'],
    },
  };

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
      const response = await fetch('/api/redeem-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim().toUpperCase() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to redeem coupon');
      }

      setRedeemSuccess(true);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/flashcards" className="text-slate-500 hover:text-slate-700 transition-colors">
            ← Back
          </Link>
          <span className="text-sm text-slate-400">Secure Checkout</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success State */}
        {redeemSuccess ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to Premium! 🎉</h2>
            <p className="text-slate-600 mb-8">Your account has been upgraded. Redirecting to flashcards...</p>
            <div className="animate-pulse text-blue-500">Loading...</div>
          </div>
        ) : (
          <>
            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                Upgrade to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">Premium</span>
              </h1>
              <p className="text-slate-600">Unlock all HSK vocabulary and unlimited features</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {['Select Plan', 'Contact & Pay', 'Redeem Code'].map((label, i) => {
                const stepIndex = i;
                const currentIndex = step === 'select' ? 0 : step === 'contact' ? 1 : 2;
                const isActive = stepIndex === currentIndex;
                const isCompleted = stepIndex < currentIndex;
                
                return (
                  <div key={label} className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        isActive ? 'bg-blue-100 text-blue-600' : isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {isCompleted ? '✓' : i + 1}
                      </div>
                      <span className="text-sm font-medium hidden sm:inline">{label}</span>
                    </div>
                    {i < 2 && <div className="w-8 h-px bg-slate-200" />}
                  </div>
                );
              })}
            </div>

            {/* Step 1: Select Plan */}
            {step === 'select' && (
              <div className="space-y-6">
                {/* Quick Redeem Code Option */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Already have a code?</p>
                        <p className="text-sm text-slate-500">Redeem your premium code instantly</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep('redeem')}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white rounded-xl font-medium text-sm transition-all shadow-md shadow-amber-500/20"
                    >
                      Redeem Code
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-sm text-slate-400 font-medium">Or choose a plan</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Monthly Plan */}
                  <div
                    onClick={() => setSelectedPlan('monthly')}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPlan === 'monthly'
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800">{plans.monthly.name}</h3>
                        <p className="text-slate-500 text-sm">Pay monthly, cancel anytime</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === 'monthly' ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                      }`}>
                        {selectedPlan === 'monthly' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-slate-800">{plans.monthly.currency}{plans.monthly.price}</span>
                      <span className="text-slate-500">{plans.monthly.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {plans.monthly.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Yearly Plan */}
                  <div
                    onClick={() => setSelectedPlan('yearly')}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPlan === 'yearly'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {/* Best Value Badge */}
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold rounded-full">
                      BEST VALUE - SAVE {plans.yearly.savings}
                    </div>
                    
                    <div className="flex justify-between items-start mb-4 mt-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800">{plans.yearly.name}</h3>
                        <p className="text-slate-500 text-sm">Best for serious learners</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === 'yearly' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                      }`}>
                        {selectedPlan === 'yearly' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-slate-800">{plans.yearly.currency}{plans.yearly.price}</span>
                      <span className="text-slate-500">{plans.yearly.period}</span>
                      <span className="ml-2 text-slate-400 line-through text-sm">{plans.yearly.currency}{plans.yearly.originalPrice}</span>
                    </div>
                    <ul className="space-y-2">
                      {plans.yearly.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setStep('contact')}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-500/25"
                >
                  Continue with {plans[selectedPlan].name} Plan
                </button>
              </div>
            )}

            {/* Step 2: Contact & Pay */}
            {step === 'contact' && (
              <div className="max-w-xl mx-auto space-y-8">
                {/* Selected Plan Summary */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-800">Selected Plan</h3>
                    <button onClick={() => setStep('select')} className="text-blue-500 text-sm hover:underline">
                      Change
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-700">{plans[selectedPlan].name} Premium</p>
                      <p className="text-sm text-slate-500">{selectedPlan === 'yearly' ? '12 months access' : '1 month access'}</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">
                      {plans[selectedPlan].currency}{plans[selectedPlan].price}
                    </p>
                  </div>
                </div>

                {/* Contact Instructions */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
                    How to Complete Your Purchase
                  </h3>

                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 mb-1">Contact via WeChat</h4>
                        <p className="text-slate-600 text-sm mb-3">
                          Add me on WeChat and send your payment for the {plans[selectedPlan].name} plan.
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.406-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-green-800">WeChat ID: richienv</p>
                              <p className="text-sm text-green-600">Search and add to chat</p>
                            </div>
                          </div>
                          <p className="text-xs text-green-700">
                            💡 Tip: Send "{selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'} Premium - {user?.email || 'your email'}" with your payment
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 mb-1">Receive Your Code</h4>
                        <p className="text-slate-600 text-sm">
                          Once payment is confirmed, I'll send you a unique redemption code within <strong>3 minutes</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 mb-1">Redeem & Enjoy</h4>
                        <p className="text-slate-600 text-sm">
                          Enter the code below to instantly activate your Premium subscription.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Already have code? */}
                <button
                  onClick={() => setStep('redeem')}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-amber-500/25"
                >
                  I Have a Redemption Code →
                </button>

                <p className="text-center text-sm text-slate-500">
                  Questions? Contact us on WeChat: <strong>richienv</strong>
                </p>
              </div>
            )}

            {/* Step 3: Redeem Code */}
            {step === 'redeem' && (
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Enter Your Code</h2>
                  <p className="text-slate-600 mt-2">Paste the 8-character code you received</p>
                </div>

                <div>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setRedeemError(null);
                    }}
                    placeholder="XXXXXXXX"
                    maxLength={8}
                    className={`w-full px-6 py-4 text-center text-2xl font-mono tracking-widest rounded-xl border-2 transition-all outline-none ${
                      couponCode.length > 0
                        ? 'border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50'
                        : 'border-slate-200 bg-white'
                    } focus:border-amber-500 focus:ring-4 focus:ring-amber-100`}
                  />
                </div>

                {redeemError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-red-600">{redeemError}</p>
                  </div>
                )}

                <button
                  onClick={handleRedeem}
                  disabled={isRedeeming || couponCode.length < 8}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRedeeming ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Activating...
                    </span>
                  ) : (
                    'Activate Premium'
                  )}
                </button>

                <button
                  onClick={() => setStep('contact')}
                  className="w-full py-3 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  ← Back to payment instructions
                </button>

                {!user && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="text-blue-700 text-sm">
                      Please <Link href="/auth/login" className="underline font-medium">log in</Link> first to redeem your code.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
