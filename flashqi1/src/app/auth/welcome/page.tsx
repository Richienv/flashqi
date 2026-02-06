'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const SOURCES = ['Friend', 'Xiaohongshu', 'Instagram', 'Other'];
const APPS = ['Duolingo', 'Pleco', 'HelloChinese', 'Anki', 'None', 'Other'];
const CAMPUSES = ['Zhejiang University', 'Tsinghua University', 'Peking University', 'Fudan University', 'Other'];
const ROLES = ['Student', 'Worker', 'Other'];
const COUNTRIES = ['China', 'USA', 'Indonesia', 'Malaysia', 'Singapore', 'Korea', 'Japan', 'Other'];
const TARGETS = ['Finish Level 1', 'Pass HSK 2', 'Pass HSK 3', 'Get a job in China', 'Travel in China', 'Just to learn'];

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    source: '',
    apps: [] as string[],
    campus: '',
    role: '',
    country: '',
    target: '',
  });

  const questions = [
    {
      key: 'source',
      question: 'How did you hear about FlashQi?',
      options: SOURCES,
      multiple: false,
    },
    {
      key: 'apps',
      question: 'What language apps have you used?',
      options: APPS,
      multiple: true,
    },
    {
      key: 'campus',
      question: 'Which university are you from?',
      options: CAMPUSES,
      multiple: false,
    },
    {
      key: 'role',
      question: 'Are you a student or worker?',
      options: ROLES,
      multiple: false,
    },
    {
      key: 'country',
      question: 'Which country are you from?',
      options: COUNTRIES,
      multiple: false,
    },
    {
      key: 'target',
      question: "What's your learning goal?",
      options: TARGETS,
      multiple: false,
    },
  ];

  const currentQ = questions[step];

  const handleSelect = (option: string) => {
    if (currentQ.multiple) {
      const current = answers[currentQ.key as keyof typeof answers] as string[];
      if (current.includes(option)) {
        setAnswers({ ...answers, [currentQ.key]: current.filter(o => o !== option) });
      } else {
        setAnswers({ ...answers, [currentQ.key]: [...current, option] });
      }
    } else {
      setAnswers({ ...answers, [currentQ.key]: option });
    }
  };

  const isSelected = (option: string) => {
    const val = answers[currentQ.key as keyof typeof answers];
    if (currentQ.multiple) return (val as string[]).includes(option);
    return val === option;
  };

  const canProceed = () => {
    const val = answers[currentQ.key as keyof typeof answers];
    if (currentQ.multiple) return (val as string[]).length > 0;
    return !!val;
  };

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('user_surveys').upsert({
            user_id: user.id,
            source: answers.source,
            apps_used: answers.apps,
            campus: answers.campus,
            role: answers.role,
            country: answers.country,
            target: answers.target,
            completed_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });
        }
      } catch (e) {
        console.error('Survey save error:', e);
      } finally {
        setLoading(false);
        router.push('/dashboard/flashcards');
      }
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-slate-100">
        <div className="h-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {step === 0 && (
            <div className="text-center mb-8">
              <h1 className="shimmer-text text-3xl font-light tracking-wide mb-2">Welcome to FlashQi</h1>
              <p className="text-sm text-slate-400 font-light">Let's personalize your experience</p>
            </div>
          )}

          <div className="mb-8">
            <p className="text-lg text-slate-900 font-light text-center mb-6">{currentQ.question}</p>
            <div className="space-y-3">
              {currentQ.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-light transition-all ${
                    isSelected(option)
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="px-6 py-2.5 rounded-full disabled:opacity-40 transition-all"
            >
              <span className="shimmer-text text-sm font-light">
                {loading ? 'Saving...' : step === questions.length - 1 ? 'Start Learning' : 'Next'}
              </span>
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {questions.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-slate-900' : i < step ? 'bg-slate-400' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
      </div>

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
        @keyframes shimmer {
          0% { background-position: 120% 0; }
          100% { background-position: -120% 0; }
        }
      `}</style>
    </div>
  );
}
