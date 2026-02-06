'use client';

import { useState, useEffect, useCallback } from 'react';

interface UserRow {
  id: string;
  email: string;
  name: string;
  created_at: string;
  last_sign_in: string | null;
  email_confirmed: boolean;
  premium: {
    plan: string;
    active: boolean;
    expires: string;
    coupon: string;
  } | null;
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

export default function AdminPremiumPage() {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<'users' | 'coupons'>('users');

  // Users
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');

  // Coupons
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [couponsError, setCouponsError] = useState('');

  // Generate
  const [genPlan, setGenPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [genCount, setGenCount] = useState(1);
  const [genLoading, setGenLoading] = useState(false);
  const [genResult, setGenResult] = useState<string[]>([]);

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
    fetchUsers();
    fetchCoupons();
  }, [authenticated, fetchUsers, fetchCoupons]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim().length > 0) {
      setAuthenticated(true);
    }
  };

  const handleGenerate = async () => {
    setGenLoading(true);
    setGenResult([]);
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

  const fmt = (d: string | null) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
          <h1 className="text-2xl font-light text-slate-900 text-center tracking-wide">Admin</h1>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Admin secret key"
            className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
          />
          <button type="submit" className="w-full py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-light text-slate-900 tracking-wide">Admin Dashboard</h1>
          <button onClick={() => setAuthenticated(false)} className="text-xs text-slate-400 hover:text-slate-700">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-slate-100 mb-6">
          <button
            onClick={() => setTab('users')}
            className={`pb-3 text-sm font-light transition-colors ${tab === 'users' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setTab('coupons')}
            className={`pb-3 text-sm font-light transition-colors ${tab === 'coupons' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Coupon Codes ({coupons.length})
          </button>
        </div>

        {/* Users Tab */}
        {tab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-400">{users.length} registered users</span>
              <button onClick={fetchUsers} disabled={usersLoading} className="text-xs text-slate-500 hover:text-slate-900 disabled:opacity-40">
                {usersLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            {usersError && <p className="text-xs text-red-500 mb-3">{usersError}</p>}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Email</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Name</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Sign Up</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Last Login</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Confirmed</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="py-3 text-sm font-light text-slate-900">{u.email}</td>
                      <td className="py-3 text-sm font-light text-slate-600">{u.name || '-'}</td>
                      <td className="py-3 text-xs text-slate-400">{fmt(u.created_at)}</td>
                      <td className="py-3 text-xs text-slate-400">{fmt(u.last_sign_in)}</td>
                      <td className="py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${u.email_confirmed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                          {u.email_confirmed ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-3">
                        {u.premium ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                            {u.premium.plan} ({u.premium.coupon})
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-300">Free</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && !usersLoading && (
                    <tr><td colSpan={6} className="py-8 text-center text-sm text-slate-400">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Coupons Tab */}
        {tab === 'coupons' && (
          <div>
            {/* Generate section */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-3">Generate Codes</h3>
              <div className="flex items-end gap-3 flex-wrap">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Plan</label>
                  <select
                    value={genPlan}
                    onChange={(e) => setGenPlan(e.target.value as 'monthly' | 'yearly')}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-900 focus:outline-none focus:border-slate-400"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Count</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={genCount}
                    onChange={(e) => setGenCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                    className="w-20 border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-900 focus:outline-none focus:border-slate-400"
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={genLoading}
                  className="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-colors"
                >
                  {genLoading ? 'Generating...' : 'Generate'}
                </button>
              </div>

              {genResult.length > 0 && (
                <div className="mt-3 bg-white rounded-lg border border-slate-200 p-3">
                  <p className="text-[10px] uppercase tracking-widest text-green-600 font-medium mb-2">Generated Codes</p>
                  <div className="flex flex-wrap gap-2">
                    {genResult.map((code) => (
                      <span key={code} className="font-mono text-sm bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-slate-900 tracking-widest">
                        {code}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(genResult.join('\n'));
                    }}
                    className="mt-2 text-[10px] text-slate-500 hover:text-slate-900"
                  >
                    Copy all to clipboard
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-400">{coupons.length} total codes</span>
              <button onClick={fetchCoupons} disabled={couponsLoading} className="text-xs text-slate-500 hover:text-slate-900 disabled:opacity-40">
                {couponsLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            {couponsError && <p className="text-xs text-red-500 mb-3">{couponsError}</p>}

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Code</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Plan</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Status</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Created</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Used At</th>
                    <th className="pb-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">Used By</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((c) => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="py-3 font-mono text-sm tracking-widest text-slate-900">{c.code}</td>
                      <td className="py-3 text-xs text-slate-500 capitalize">{c.plan_type}</td>
                      <td className="py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.is_used ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-600'}`}>
                          {c.is_used ? 'Used' : 'Available'}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-slate-400">{fmt(c.created_at)}</td>
                      <td className="py-3 text-xs text-slate-400">{fmt(c.used_at)}</td>
                      <td className="py-3 text-xs text-slate-400 truncate max-w-[120px]">{c.used_by || '-'}</td>
                    </tr>
                  ))}
                  {coupons.length === 0 && !couponsLoading && (
                    <tr><td colSpan={6} className="py-8 text-center text-sm text-slate-400">No coupons yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
