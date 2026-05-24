import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { contentApi } from './api';
import type { ResourceKey } from './api';
import { DEFAULTS, FIELDS, RESOURCE_LABELS } from './fields';
import { DynamicForm } from './DynamicForm';

function isResourceKey(v: string | undefined): v is ResourceKey {
  return v === 'blog' || v === 'caseStudies' || v === 'projects' || v === 'skills';
}

function normalizeSourceContent(resource: ResourceKey, data: Record<string, any>) {
  if (resource === 'skills') return data;

  const next = { ...data };
  for (const field of FIELDS[resource]) {
    if (!['localized', 'localizedTextarea', 'localizedList'].includes(field.type)) continue;

    const current = next[field.name];
    if (field.type === 'localizedList') {
      next[field.name] = { en: Array.isArray(current?.en) ? current.en : [] };
    } else {
      next[field.name] = { en: typeof current?.en === 'string' ? current.en : '' };
    }
  }

  return next;
}

export function ResourceEditor() {
  const { resource, id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const numericId = isNew ? undefined : Number(id);

  const valid = isResourceKey(resource);
  const [value, setValue] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!valid) return;
    if (isNew) {
      setValue(DEFAULTS[resource as ResourceKey]());
      setLoading(false);
      return;
    }
    setLoading(true);
    contentApi
      .get(resource as ResourceKey, numericId as number)
      .then((row) => setValue(row))
      .catch((e) => setError(e?.message || 'Failed to load'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, id]);

  if (!valid) return <Navigate to="/admin" replace />;

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = normalizeSourceContent(resource as ResourceKey, value);
      if (isNew) {
        await contentApi.create(resource as ResourceKey, payload);
      } else {
        await contentApi.update(resource as ResourceKey, numericId as number, payload);
      }
      navigate(`/admin/${resource}`);
    } catch (e: any) {
      setError(e?.message || 'Save failed');
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-3 text-sm text-zinc-500">
        <Link to={`/admin/${resource}`} className="hover:text-zinc-300">
          {RESOURCE_LABELS[resource as ResourceKey]}
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{isNew ? 'New' : `Edit #${numericId}`}</span>
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : (
        <>
          <DynamicForm fields={FIELDS[resource as ResourceKey]} value={value} onChange={setValue} />

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={onSave}
              disabled={saving}
              className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <Link
              to={`/admin/${resource}`}
              className="rounded-md border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
            >
              Cancel
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
