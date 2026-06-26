import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Flame, Sparkles } from 'lucide-react';

export function AuthView() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) { setError('Name is required.'); setLoading(false); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
        await signup(name.trim(), email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login');
    setError(null);
    setName(''); setEmail(''); setPassword('');
  };

  return (
    <div className="h-screen w-screen bg-bg grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden select-none">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none" />

      {/* LEFT COLUMN: Informative Panel (Promo & Live Roast Mockup) */}
      <div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-8 xl:p-12 bg-neutral-50/40 relative overflow-hidden border-r border-neutral-200/50 h-full">

        {/* Brand & Headline container */}
        <div className="space-y-4">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-white shadow-subtle self-start transition-all hover:scale-105">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold text-primary">Constructive Sarcasm Powered</span>
          </div>

          {/* Headline */}
          <div>
            <h2 className="text-3xl xl:text-4xl font-black tracking-tight text-primary leading-tight font-heading">
              Stop sending boring resumes.<br />
              <span className="text-accent bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
                Let's make them burn <Flame className="w-7 h-7 text-accent inline animate-bounce" />
              </span>
            </h2>
            <p className="text-xs xl:text-sm text-secondary mt-2 max-w-lg leading-relaxed">
              Resume Roast reads your resume like a tired recruiter with 87 tabs open. We find your fluff, expose your formatting bugs, and rewrite your bullets with measurable impact.
            </p>
          </div>
        </div>

        {/* Live Roast Interactive Mockup */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-md p-4 xl:p-5 max-w-md relative overflow-hidden my-4 group hover:shadow-lg transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors" />

          <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Live Roast Preview</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-error/10 text-error flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-error animate-ping" /> Brutal Mode Active
            </span>
          </div>

          {/* Score & Impression Mockup */}
          <div className="flex items-center gap-3.5 mb-4 bg-neutral-50/50 p-2.5 rounded-xl border border-neutral-150">
            <div className="w-10 h-10 rounded-full border-4 border-error/20 flex items-center justify-center relative flex-shrink-0 bg-white">
              <div className="absolute inset-0 rounded-full border-4 border-error border-t-transparent animate-spin duration-3000" style={{ transform: 'rotate(72deg)' }} />
              <span className="font-black text-xs text-error">42</span>
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-primary flex items-center gap-1.5">
                Resume Score: Critical Fail
              </p>
              <p className="text-[10px] text-secondary italic leading-tight">
                "This read less like a developer's track record and more like an operations manual for ChatGPT."
              </p>
            </div>
          </div>

          {/* Before & After Bullet Points */}
          <div className="space-y-2">
            {/* Before */}
            <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 relative">
              <span className="absolute -top-2 left-2 px-1.5 py-0.2 rounded-full bg-neutral-200 text-[7px] font-bold text-secondary uppercase tracking-wider">Before (Vague & Passive)</span>
              <p className="text-[11px] text-secondary/70 line-through mt-0.5 pl-1">
                Responsible for writing Jest unit tests for frontend components.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center -my-0.5">
              <span className="text-accent text-[10px] font-bold bg-white px-1.5 rounded-full border border-neutral-100 shadow-xs">↓ Improved by AI</span>
            </div>

            {/* After */}
            <div className="p-2.5 rounded-lg bg-accent/5 border border-accent/20 relative">
              <span className="absolute -top-2 left-2 px-1.5 py-0.2 rounded-full bg-accent text-[7px] font-bold text-white uppercase tracking-wider">After (Metrics-Driven)</span>
              <p className="text-[11px] text-primary font-medium mt-0.5 pl-1">
                Engineered robust Jest testing suite covering <span className="text-accent font-bold">94% of features</span>, reducing production regressions by <span className="text-accent font-bold">32%</span>.
              </p>
            </div>
          </div>

          {/* Mini Stats Footer */}
          <div className="mt-3 pt-2.5 border-t border-neutral-100 flex justify-between items-center text-[9px] text-secondary">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-error" /> ATS Match: <strong className="text-error font-extrabold">2/10</strong> (Avoid tables)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-neutral-400" /> Recruiter Stamp: <strong className="text-neutral-500 font-extrabold line-through uppercase tracking-wider">Rejection Pile</strong>
            </span>
          </div>
        </div>

        {/* Feature Checkboxes */}
        <div className="grid grid-cols-2 gap-3 max-w-lg border-t border-neutral-200/50 pt-4">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-primary leading-tight">ATS Parsing Scan</p>
              <p className="text-[9px] text-secondary leading-snug">Flags structure bugs instantly.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-primary leading-tight">Metrics Injector</p>
              <p className="text-[9px] text-secondary leading-snug">Converts statements to achievements.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-primary leading-tight">Sarcastic Reviewer</p>
              <p className="text-[9px] text-secondary leading-snug">Exposes fluff via recruiter bias.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-primary leading-tight">Score History</p>
              <p className="text-[9px] text-secondary leading-snug">Track changes and revisions.</p>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Authentication Form (Modal Card) */}
      <div className="col-span-1 lg:col-span-5 flex flex-col justify-center items-center px-4 sm:px-12 py-6 bg-white relative z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.015)] h-full overflow-y-auto">

        {/* Mobile-Only Header Brand logo */}
        <div className="lg:hidden mb-4 flex flex-col items-center select-none">
          <img src="/rr_logo.png" alt="Resume Roast" className="h-24 w-auto" />
        </div>

        <div className="w-full max-w-sm">
          {/* Main Auth Card Container */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xl p-5 sm:p-6 relative">
            {/* Smooth glowing blob inside card for premium look */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />

            {/* Header */}
            <div className="mb-5 text-center">
              <h1 className="text-xl sm:text-2xl font-black text-primary mb-1 tracking-tight font-heading">
                {mode === 'login' ? 'Welcome back' : 'Get Roasted '}
              </h1>
              <p className="text-xs text-secondary font-medium">
                {mode === 'login'
                  ? 'Log in to see your roast history'
                  : 'Create your account and get feedback'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 p-2 rounded-lg bg-error/5 border border-error/20 mb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-3.5 h-3.5 text-error flex-shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs text-error font-semibold leading-normal">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[9px] font-extrabold text-primary uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-primary placeholder-secondary/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block text-[9px] font-extrabold text-primary uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-primary placeholder-secondary/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[9px] font-extrabold text-primary uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPass ? 'text' : 'password'}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-primary placeholder-secondary/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                id="auth-submit"
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-orange-500 via-accent to-red-600 hover:from-orange-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loading ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> {mode === 'login' ? 'Logging in…' : 'Creating account…'}</>
                ) : (
                  mode === 'login' ? ' Log In to Account' : 'Create Free Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200/70" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-[9px] font-bold text-secondary uppercase tracking-wider">
                  {mode === 'login' ? "New to Resume Roast?" : 'Already registered?'}
                </span>
              </div>
            </div>

            <button
              id="auth-switch"
              type="button"
              onClick={switchMode}
              className="w-full py-2.5 rounded-xl border border-neutral-200 text-[10px] font-black text-primary hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-150 cursor-pointer shadow-subtle"
            >
              {mode === 'login' ? ' Sign Up & Get Roasted' : '← Back to Login'}
            </button>
          </div>

          <p className="text-center text-[9px] text-secondary mt-4 opacity-60 leading-normal">
            Your resume data is stored securely. We only analyze and save your score, metadata, and PDF. We never share or sell your details.
          </p>
        </div>

      </div>
    </div>
  );
}
