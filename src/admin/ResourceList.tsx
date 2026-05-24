import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { contentApi } from './api';
import type { ResourceKey } from './api';
import { COLUMNS, RESOURCE_LABELS } from './fields';

function isResourceKey(v: string | undefined): v is ResourceKey {
  return v === 'blog' || v === 'caseStudies' || v === 'projects' || v === 'skills';
}

function renderCell(value: any) {
  if (value == null) return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return value.en ?? JSON.stringify(value);
  return String(value);
}

export function ResourceList() {
  const { resource } = useParams();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const valid = isResourceKey(resource);

  const load = useCallback(() => {
    if (!valid) return;
    setLoading(true);
    contentApi
      .list(resource as ResourceKey)
      .then(setRows)
      .catch((e) => setError(e?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [resource, valid]);

  useEffect(() => {
    load();
  }, [load]);

  if (!valid) return <Navigate to="/admin" replace />;

  const cols = COLUMNS[resource as ResourceKey];

  const onDelete = async (id: number) => {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    try {
      await contentApi.remove(resource as ResourceKey, id);
      load();
    } catch (e: any) {
      alert(e?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{RESOURCE_LABELS[resource as ResourceKey]}</h1>
        <Link
          to={`/admin/${resource}/new`}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
        >
          + New
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {loading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-zinc-500">No items yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/60 text-zinc-400">
              <tr>
                {cols.map((c) => (
                  <th key={c.name} className="px-4 py-3 font-medium">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-900/40">
                  {cols.map((c) => (
                    <td key={c.name} className="max-w-xs truncate px-4 py-3 text-zinc-200">
                      {renderCell(row[c.name])}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/${resource}/${row.id}`} className="text-emerald-400 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="ml-4 text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
