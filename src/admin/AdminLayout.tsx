import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Briefcase, ChevronDown, FileText, FolderTree, Home, Mail, User, Wrench } from 'lucide-react';
import { useAuth } from './AuthContext';

const PUBLIC_LANG = 'en';
const ADMIN_LINKS = [
  { path: '/admin/blog', label: 'Blog posts' },
  { path: '/admin/caseStudies', label: 'Case studies' },
  { path: '/admin/projects', label: 'Projects' },
];

const PUBLIC_LINKS = [
  { path: `/${PUBLIC_LANG}`, label: 'Home', icon: Home },
  { path: `/${PUBLIC_LANG}/about`, label: 'About', icon: User },
  { path: `/${PUBLIC_LANG}/skills`, label: 'Skills', icon: Wrench },
  { path: `/${PUBLIC_LANG}/projects`, label: 'Projects', icon: Briefcase },
  { path: `/${PUBLIC_LANG}/blog`, label: 'Blog', icon: BookOpen },
  { path: `/${PUBLIC_LANG}/case-studies`, label: 'Case studies', icon: FileText },
  { path: `/${PUBLIC_LANG}/contact`, label: 'Contact', icon: Mail },
];

export function AdminLayout() {
  const { email, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [skillsOpen, setSkillsOpen] = useState(() => location.pathname.startsWith('/admin/skills') || location.pathname.startsWith('/admin/skillCategories'));

  const onLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 text-sm transition ${
      isActive ? 'bg-emerald-600/20 text-emerald-300' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
    }`;

  const publicLinkCls =
    'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100';
  const skillsActive = location.pathname.startsWith('/admin/skills') || location.pathname.startsWith('/admin/skillCategories');

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <aside className="flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-900/60 p-4">
        <NavLink to="/admin" end className="mb-6 block text-lg font-semibold text-zinc-100">
          Portfolio CMS
        </NavLink>

        <nav className="space-y-1">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-600">
            Admin
          </p>
          <NavLink to="/admin" end className={linkCls}>
            Dashboard
          </NavLink>
          {ADMIN_LINKS.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkCls}>
              {item.label}
            </NavLink>
          ))}

          <div>
            <button
              type="button"
              onClick={() => setSkillsOpen((open) => !open)}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition ${
                skillsActive ? 'bg-emerald-600/20 text-emerald-300' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Skills
              </span>
              <ChevronDown className={`h-4 w-4 transition ${skillsOpen ? 'rotate-180' : ''}`} />
            </button>
            {skillsOpen && (
              <div className="mt-1 space-y-1 border-l border-zinc-800 pl-3">
                <NavLink to="/admin/skills" className={linkCls}>
                  All skills
                </NavLink>
                <NavLink to="/admin/skillCategories" className={linkCls}>
                  <span className="inline-flex items-center gap-2">
                    <FolderTree className="h-4 w-4" />
                    Categories
                  </span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        <nav className="mt-8 space-y-1">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-600">
            Public site
          </p>
          {PUBLIC_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path} className={publicLinkCls}>
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
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

      <main className="h-screen flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
