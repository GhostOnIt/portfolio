import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { RESOURCE_LABELS } from './fields';
import type { ResourceKey } from './api';

const RESOURCES: ResourceKey[] = ['blog', 'caseStudies', 'projects', 'skills'];

export function AdminLayout() {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 text-sm transition ${
      isActive ? 'bg-emerald-600/20 text-emerald-300' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
    }`;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <aside className="flex w-60 shrink-0 flex-col border-r border-zinc-800 bg-zinc-900/40 p-4">
        <NavLink to="/admin" end className="mb-6 block text-lg font-semibold text-zinc-100">
          Portfolio CMS
        </NavLink>
        <nav className="space-y-1">
          <NavLink to="/admin" end className={linkCls}>
            Dashboard
          </NavLink>
          {RESOURCES.map((r) => (
            <NavLink key={r} to={`/admin/${r}`} className={linkCls}>
              {RESOURCE_LABELS[r]}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-zinc-800 pt-4">
          {email && <p className="mb-2 truncate text-xs text-zinc-500">{email}</p>}
          <button
            onClick={onLogout}
            className="w-full rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
