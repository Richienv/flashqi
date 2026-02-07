'use client';

import { useState, useEffect, useCallback } from 'react';
import { HSK_LEVELS, HskWord } from '@/data/hsk-levels';

interface UserRow {
  id: string;
  email: string;
  name: string;
  created_at: string;
  last_sign_in: string | null;
  email_confirmed: boolean;
  visited_checkout: boolean;
  visited_checkout_at: string | null;
  premium: { plan: string; active: boolean; expires: string; coupon: string } | null;
}

interface CouponRow {
  id: string;
  code: string;
  plan_type: string;
  is_used: boolean;
  used_by: string | null;
  used_at: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<'users' | 'lessons' | 'coupons'>('users');

  // Users
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [togglingUser, setTogglingUser] = useState<string | null>(null);

  // Coupons
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [couponsError, setCouponsError] = useState('');
  const [genPlan, setGenPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [genCount, setGenCount] = useState(1);
  const [genLoading, setGenLoading] = useState(false);
  const [genResult, setGenResult] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Lessons
  const [levels, setLevels] = useState(() => HSK_LEVELS.map(l => ({ ...l, words: [...l.words] })));
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [editingWord, setEditingWord] = useState<{ levelIdx: number; wordIdx: number } | null>(null);
  const [editForm, setEditForm] = useState<HskWord>({ hanzi: '', pinyin: '', english: '' });
  const [addingWord, setAddingWord] = useState(false);
  const [newWord, setNewWord] = useState<HskWord>({ hanzi: '', pinyin: '', english: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError('');
    try {
      const res = await fetch(`/api/admin/users?key=${encodeURIComponent(adminKey)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(data.users || []);
    } catch (e: any) {
      setUsersError(e.message);
    } finally {
      setUsersLoading(false);
    }
  }, [adminKey]);

  const fetchCoupons = useCallback(async () => {
    setCouponsLoading(true);
    setCouponsError('');
    try {
      const res = await fetch(`/api/admin/coupons?key=${encodeURIComponent(adminKey)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCoupons(data.coupons || []);
    } catch (e: any) {
      setCouponsError(e.message);
    } finally {
      setCouponsLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    if (!authenticated) return;
    const controller = new AbortController();
    fetchUsers();
    fetchCoupons();
    // Auto-refresh on window focus
    const handleFocus = () => {
      fetchUsers();
      fetchCoupons();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      controller.abort('Component unmounted');
      window.removeEventListener('focus', handleFocus);
    };
  }, [authenticated, fetchUsers, fetchCoupons]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim().length > 0) setAuthenticated(true);
  };

  const handleGenerate = async () => {
    setGenLoading(true);
    setGenResult([]);
    setCopied(false);
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminKey, planType: genPlan, count: genCount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setGenResult(data.codes || []);
      fetchCoupons();
    } catch (e: any) {
      setCouponsError(e.message);
    } finally {
      setGenLoading(false);
    }
  };

  const togglePremium = async (user: UserRow) => {
    setTogglingUser(user.id);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminKey,
          userId: user.id,
          action: user.premium ? 'downgrade' : 'upgrade',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchUsers();
    } catch (e: any) {
      setUsersError(e.message);
    } finally {
      setTogglingUser(null);
    }
  };

  const startEdit = (levelIdx: number, wordIdx: number) => {
    setEditingWord({ levelIdx, wordIdx });
    setEditForm({ ...levels[levelIdx].words[wordIdx] });
  };

  const saveEdit = () => {
    if (!editingWord) return;
    const updated = [...levels];
    updated[editingWord.levelIdx].words[editingWord.wordIdx] = { ...editForm };
    setLevels(updated);
    setEditingWord(null);
  };

  const removeWord = (levelIdx: number, wordIdx: number) => {
    const updated = [...levels];
    updated[levelIdx].words.splice(wordIdx, 1);
    setLevels(updated);
  };

  const addWord = () => {
    if (!newWord.hanzi.trim() || !newWord.pinyin.trim() || !newWord.english.trim()) return;
    const updated = [...levels];
    updated[selectedLevel].words.push({ ...newWord });
    setLevels(updated);
    setNewWord({ hanzi: '', pinyin: '', english: '' });
    setAddingWord(false);
  };

  const fmt = (d: string | null) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredWords = levels[selectedLevel].words.filter(w => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return w.hanzi.includes(q) || w.pinyin.toLowerCase().includes(q) || w.english.toLowerCase().includes(q);
  });

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-6 text-center">
          <div>
            <h1 className="shimmer-text text-3xl font-light tracking-wide mb-1">FlashQi</h1>
            <p className="text-xs text-slate-400 font-light tracking-widest uppercase">Admin</p>
          </div>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Secret key"
            className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none text-center"
          />
          <button type="submit" className="w-full py-2">
            <span className="shimmer-text text-sm font-light tracking-wide">Enter</span>
          </button>
        </form>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="shimmer-text text-xl font-light tracking-wide">FlashQi</h1>
            <span className="text-[10px] text-slate-400 tracking-widest uppercase">Admin</span>
          </div>
          <button onClick={() => { setAuthenticated(false); setAdminKey(''); }} className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-100 px-6">
        <div className="max-w-6xl mx-auto flex gap-8">
          {(['users', 'lessons', 'coupons'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-sm font-light capitalize transition-colors ${tab === t ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* ─── USERS TAB ─── */}
        {tab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-slate-400 font-light">{users.length} registered</p>
              <button onClick={fetchUsers} disabled={usersLoading} className="text-xs text-slate-500 hover:text-slate-900 disabled:opacity-40 transition-colors">
                {usersLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            {usersError && <p className="text-xs text-red-500 mb-3">{usersError}</p>}

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Email', 'Name', 'Signed Up', 'Last Login', 'Status', 'Checkout', 'Premium', ''].map(h => (
                      <th key={h} className="pb-3 text-[10px] uppercase tracking-widest text-slate-400 font-medium pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 group">
                      <td className="py-3 pr-4 text-sm font-light text-slate-900">{u.email}</td>
                      <td className="py-3 pr-4 text-sm font-light text-slate-500">{u.name || '-'}</td>
                      <td className="py-3 pr-4 text-xs text-slate-400">{fmt(u.created_at)}</td>
                      <td className="py-3 pr-4 text-xs text-slate-400">{fmt(u.last_sign_in)}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${u.email_confirmed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                          {u.email_confirmed ? 'Confirmed' : 'Unconfirmed'}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        {u.visited_checkout ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600" title={u.visited_checkout_at ? fmt(u.visited_checkout_at) : ''}>
                            Visited
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-300">-</span>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        {u.premium ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                            {u.premium.plan}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-300">Free</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => togglePremium(u)}
                          disabled={togglingUser === u.id}
                          className={`text-[10px] px-3 py-1 rounded-full transition-colors disabled:opacity-40 ${
                            u.premium
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          }`}
                        >
                          {togglingUser === u.id ? '...' : u.premium ? 'Downgrade' : 'Upgrade'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && !usersLoading && (
                    <tr><td colSpan={8} className="py-12 text-center text-sm text-slate-400 font-light">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── LESSONS TAB ─── */}
        {tab === 'lessons' && (
          <div>
            {/* Level selector */}
            <div className="flex gap-3 mb-5 flex-wrap">
              {levels.map((level, idx) => (
                <button
                  key={level.id}
                  onClick={() => { setSelectedLevel(idx); setEditingWord(null); setAddingWord(false); setSearchQuery(''); }}
                  className={`px-4 py-2 rounded-full text-xs font-light transition-colors ${
                    selectedLevel === idx
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {level.title} <span className="text-slate-400 ml-1">({level.words.length})</span>
                </button>
              ))}
            </div>

            {/* Search + Add */}
            <div className="flex items-center gap-3 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search words..."
                className="flex-1 border-b border-slate-200 bg-transparent pb-2 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
              />
              <button
                onClick={() => { setAddingWord(true); setEditingWord(null); }}
                className="text-xs px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors"
              >
                + Add Word
              </button>
            </div>

            {/* Add word form */}
            {addingWord && (
              <div className="bg-slate-50 rounded-xl p-4 mb-4 flex items-end gap-3 flex-wrap">
                <div className="flex-1 min-w-[100px]">
                  <label className="block text-[10px] text-slate-400 mb-1">Hanzi</label>
                  <input value={newWord.hanzi} onChange={e => setNewWord({ ...newWord, hanzi: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-slate-400" placeholder="你好" />
                </div>
                <div className="flex-1 min-w-[100px]">
                  <label className="block text-[10px] text-slate-400 mb-1">Pinyin</label>
                  <input value={newWord.pinyin} onChange={e => setNewWord({ ...newWord, pinyin: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-slate-400" placeholder="nǐ hǎo" />
                </div>
                <div className="flex-1 min-w-[100px]">
                  <label className="block text-[10px] text-slate-400 mb-1">English</label>
                  <input value={newWord.english} onChange={e => setNewWord({ ...newWord, english: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-slate-400" placeholder="hello" />
                </div>
                <button onClick={addWord} className="text-xs px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">Save</button>
                <button onClick={() => setAddingWord(false)} className="text-xs px-3 py-2 text-slate-500 hover:text-slate-900 transition-colors">Cancel</button>
              </div>
            )}

            {/* Words table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 w-8 text-[10px] uppercase tracking-widest text-slate-400 font-medium">#</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Hanzi</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Pinyin</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">English</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWords.map((word, wIdx) => {
                    const realIdx = levels[selectedLevel].words.indexOf(word);
                    const isEditing = editingWord?.levelIdx === selectedLevel && editingWord?.wordIdx === realIdx;
                    return (
                      <tr key={`${word.hanzi}-${wIdx}`} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-2.5 text-xs text-slate-300">{realIdx + 1}</td>
                        {isEditing ? (
                          <>
                            <td className="py-2.5 pr-2">
                              <input value={editForm.hanzi} onChange={e => setEditForm({ ...editForm, hanzi: e.target.value })}
                                className="w-full border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-slate-400" />
                            </td>
                            <td className="py-2.5 pr-2">
                              <input value={editForm.pinyin} onChange={e => setEditForm({ ...editForm, pinyin: e.target.value })}
                                className="w-full border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-slate-400" />
                            </td>
                            <td className="py-2.5 pr-2">
                              <input value={editForm.english} onChange={e => setEditForm({ ...editForm, english: e.target.value })}
                                className="w-full border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-slate-400" />
                            </td>
                            <td className="py-2.5 text-right whitespace-nowrap">
                              <button onClick={saveEdit} className="text-[10px] text-green-600 hover:text-green-800 mr-3">Save</button>
                              <button onClick={() => setEditingWord(null)} className="text-[10px] text-slate-400 hover:text-slate-700">Cancel</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-2.5 text-base font-medium text-slate-900">{word.hanzi}</td>
                            <td className="py-2.5 text-sm font-light text-slate-500">{word.pinyin}</td>
                            <td className="py-2.5 text-sm font-light text-slate-600">{word.english}</td>
                            <td className="py-2.5 text-right whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEdit(selectedLevel, realIdx)} className="text-[10px] text-slate-500 hover:text-slate-900 mr-3">Edit</button>
                              <button onClick={() => removeWord(selectedLevel, realIdx)} className="text-[10px] text-red-400 hover:text-red-600">Remove</button>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                  {filteredWords.length === 0 && (
                    <tr><td colSpan={5} className="py-8 text-center text-sm text-slate-400 font-light">No words found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── COUPONS TAB ─── */}
        {tab === 'coupons' && (
          <div>
            {/* Generate */}
            <div className="bg-slate-50 rounded-xl p-5 mb-6">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-3">Generate Codes</p>
              <div className="flex items-end gap-3 flex-wrap">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Plan</label>
                  <select value={genPlan} onChange={e => setGenPlan(e.target.value as 'monthly' | 'yearly')}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-900 focus:outline-none focus:border-slate-400">
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Count</label>
                  <input type="number" min={1} max={50} value={genCount}
                    onChange={e => setGenCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                    className="w-20 border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-900 focus:outline-none focus:border-slate-400" />
                </div>
                <button onClick={handleGenerate} disabled={genLoading}
                  className="bg-slate-900 text-white text-xs px-5 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-colors">
                  {genLoading ? 'Generating...' : 'Generate'}
                </button>
              </div>

              {genResult.length > 0 && (
                <div className="mt-4 bg-white rounded-lg border border-slate-200 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-green-600 font-medium mb-2">Generated</p>
                  <div className="flex flex-wrap gap-2">
                    {genResult.map(code => (
                      <span key={code} className="font-mono text-sm bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-slate-900 tracking-widest">{code}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => { navigator.clipboard.writeText(genResult.join('\n')); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="mt-2 text-[10px] text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy all'}
                  </button>
                </div>
              )}
            </div>

            {/* Coupon list */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-slate-400 font-light">{coupons.length} total codes</p>
              <button onClick={fetchCoupons} disabled={couponsLoading} className="text-xs text-slate-500 hover:text-slate-900 disabled:opacity-40 transition-colors">
                {couponsLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            {couponsError && <p className="text-xs text-red-500 mb-3">{couponsError}</p>}

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Code', 'Plan', 'Status', 'Created', 'Used At', 'Used By'].map(h => (
                      <th key={h} className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(c => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="py-3 pr-4 font-mono text-sm tracking-widest text-slate-900">{c.code}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500 capitalize">{c.plan_type}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.is_used ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-600'}`}>
                          {c.is_used ? 'Used' : 'Available'}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-xs text-slate-400">{fmt(c.created_at)}</td>
                      <td className="py-3 pr-4 text-xs text-slate-400">{fmt(c.used_at)}</td>
                      <td className="py-3 text-xs text-slate-400 truncate max-w-[120px]">{c.used_by || '-'}</td>
                    </tr>
                  ))}
                  {coupons.length === 0 && !couponsLoading && (
                    <tr><td colSpan={6} className="py-12 text-center text-sm text-slate-400 font-light">No coupons yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
        tbody tr:hover td:last-child { opacity: 1 !important; }
      `}</style>
    </div>
  );
}