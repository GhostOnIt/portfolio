import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { contentApi } from './api';
import type { ResourceKey } from './api';
import { COLUMNS, RESOURCE_LABELS } from './fields';

function isResourceKey(v: string | undefined): v is ResourceKey {
  return v === 'blog' || v === 'caseStudies' || v === 'projects' || v === 'skillCategories' || v === 'skills';
}

function renderCell(value: any, name: string) {
  if (value == null) return '—';
  if (typeof value === 'boolean') {
    const yes = name === 'published' ? 'Published' : 'Yes';
    const no = name === 'published' ? 'Draft' : 'No';
    return (
      <span className={`inline-flex rounded-full px-2 py-1 text-xs ${value ? 'bg-emerald-950 text-emerald-300' : 'bg-zinc-800 text-zinc-400'}`}>
        {value ? yes : no}
      </span>
    );
  }
  if (typeof value === 'object') return value.en ?? JSON.stringify(value);
  return String(value);
}

export function ResourceList() {
  const { resource } = useParams();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all');

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
  const filteredRows = rows.filter((row) => {
    const text = JSON.stringify(row).toLowerCase();
    const matchesQuery = text.includes(query.trim().toLowerCase());
    const matchesStatus =
      status === 'all' ||
      row.published == null ||
      (status === 'published' ? row.published === true : row.published === false);
    return matchesQuery && matchesStatus;
  });

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
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{RESOURCE_LABELS[resource as ResourceKey]}</h1>
          <p className="mt-1 text-sm text-zinc-500">{rows.length} item{rows.length === 1 ? '' : 's'} total</p>
        </div>
        <Link
          to={`/admin/${resource}/new`}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
        >
          + New
        </Link>
      </div>

      <div className="mb-5 flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900/35 p-4 md:flex-row md:items-center">
        <input
          type="search"
          className="min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
          placeholder={`Search ${RESOURCE_LABELS[resource as ResourceKey].toLowerCase()}...`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {'published' in (rows[0] ?? {}) && (
          <select
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none"
            value={status}
            onChange={(event) => setStatus(event.target.value as typeof status)}
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        )}
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {loading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-700 p-10 text-center">
          <p className="text-zinc-400">No {RESOURCE_LABELS[resource as ResourceKey].toLowerCase()} yet.</p>
          <Link to={`/admin/${resource}/new`} className="mt-4 inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            Create the first one
          </Link>
        </div>
      ) : filteredRows.length === 0 ? (
        <p className="rounded-lg border border-zinc-800 p-6 text-zinc-500">No items match your filters.</p>
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
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-900/40">
                  {cols.map((c) => (
                    <td key={c.name} className="max-w-xs truncate px-4 py-3 text-zinc-200">
                      {renderCell(row[c.name], c.name)}
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
