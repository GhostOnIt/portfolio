import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function Login() {
  const { login, authenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (authenticated) return <Navigate to="/admin" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      if (err?.status === 401 || err?.message === 'Invalid credentials') {
        setError('Email ou mot de passe incorrect.');
      } else if (err?.status === 404) {
        setError("Le serveur admin local ne répond pas. Relance l'application avec npm run dev.");
      } else {
        setError(err?.message || 'Connexion impossible.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500';

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-8"
      >
        <div>
          <h1 className="text-xl font-semibold text-zinc-100">Admin sign in</h1>
          <p className="mt-1 text-sm text-zinc-500">Restricted area</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-300">Email</label>
          <input
            type="email"
            autoComplete="username"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-300">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            className={inputCls}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
