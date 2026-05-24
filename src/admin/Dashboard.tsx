import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentApi } from './api';
import type { ResourceKey } from './api';
import { RESOURCE_LABELS } from './fields';

const RESOURCES: ResourceKey[] = ['blog', 'caseStudies', 'projects', 'skills'];

export function Dashboard() {
  const [counts, setCounts] = useState<Partial<Record<ResourceKey, number>>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all(RESOURCES.map((r) => contentApi.list(r).then((rows) => [r, rows.length] as const)))
      .then((pairs) => setCounts(Object.fromEntries(pairs) as Record<ResourceKey, number>))
      .catch((e) => setError(e?.message || 'Failed to load'));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RESOURCES.map((r) => (
          <Link
            key={r}
            to={`/admin/${r}`}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-emerald-600/50 hover:bg-zinc-900"
          >
            <p className="text-sm text-zinc-400">{RESOURCE_LABELS[r]}</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-100">
              {counts[r] ?? '—'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
