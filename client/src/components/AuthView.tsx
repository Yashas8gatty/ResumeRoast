import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className=" select-none">
        <img src="/rr_logo.png" alt="Resume Roast" className="h-40 w-auto" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl p-8">

          {/* Header */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-black text-primary mb-1.5">
              {mode === 'login' ? 'Welcome back 👋' : 'Get Roasted 🔥'}
            </h1>
            <p className="text-sm text-secondary">
              {mode === 'login'
                ? 'Log in to see your roast history'
                : 'Create your account and get brutally honest feedback'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-error/5 border border-error/20 mb-5">
              <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-error font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
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
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-primary placeholder-secondary/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-primary placeholder-secondary/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
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
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-primary placeholder-secondary/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="auth-submit"
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> {mode === 'login' ? 'Logging in…' : 'Creating account…'}</>
              ) : (
                mode === 'login' ? '🔓 Log In' : '🔥 Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-xs text-secondary">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              </span>
            </div>
          </div>

          <button
            id="auth-switch"
            type="button"
            onClick={switchMode}
            className="w-full py-3 rounded-xl border border-neutral-200 text-sm font-bold text-primary hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-150"
          >
            {mode === 'login' ? '✨ Create Free Account' : '← Back to Login'}
          </button>
        </div>

        <p className="text-center text-xs text-secondary mt-5 opacity-60">
          Your resume data is stored securely. We only save your score and PDF.
        </p>
      </div>
    </div>
  );
}
