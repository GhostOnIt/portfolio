import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { contentApi } from './api';
import type { ResourceKey } from './api';
import { DEFAULTS, FIELDS, RESOURCE_LABELS } from './fields';
import type { Field } from './fields';
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

type FieldSection = {
  title: string;
  description?: string;
  fields: string[];
};

const EDITOR_LAYOUT: Record<ResourceKey, { main: FieldSection[]; sidebar: FieldSection[] }> = {
  blog: {
    main: [
      {
        title: 'Article',
        description: 'Write the visible blog content from one source language.',
        fields: ['title', 'excerpt', 'content'],
      },
    ],
    sidebar: [
      { title: 'Publish', fields: ['published', 'featured', 'date'] },
      { title: 'Organization', fields: ['slug', 'category', 'difficulty', 'readTime', 'tags'] },
      { title: 'Media and stats', fields: ['heroImage', 'views', 'likes', 'comments'] },
    ],
  },
  caseStudies: {
    main: [
      {
        title: 'Story',
        description: 'Structure the case study like a readable project narrative.',
        fields: ['title', 'subtitle', 'challenge', 'solution', 'impact', 'architecturePattern'],
      },
    ],
    sidebar: [
      { title: 'Publish', fields: ['published', 'featured', 'sortOrder'] },
      { title: 'Timeline', fields: ['slug', 'category', 'timelineStart', 'timelineEnd', 'timelineDuration'] },
      { title: 'Technical details', fields: ['technologies', 'architectureComponents', 'impactMetrics'] },
    ],
  },
  projects: {
    main: [
      {
        title: 'Project',
        description: 'Keep the project description focused and easy to scan.',
        fields: ['title', 'description'],
      },
    ],
    sidebar: [
      { title: 'Publish', fields: ['published', 'sortOrder'] },
      { title: 'Details', fields: ['slug', 'category', 'technologies'] },
      { title: 'Links and media', fields: ['image', 'githubLink', 'websiteLink'] },
    ],
  },
  skills: {
    main: [
      {
        title: 'Skill',
        fields: ['name', 'icon', 'level'],
      },
    ],
    sidebar: [
      { title: 'Organization', fields: ['category', 'sortOrder'] },
    ],
  },
};

function pickFields(resource: ResourceKey, names: string[]): Field[] {
  const fieldsByName = new Map(FIELDS[resource].map((field) => [field.name, field]));
  return names.map((name) => fieldsByName.get(name)).filter((field): field is Field => Boolean(field));
}

function EditorSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-900/35">
      <div className="border-b border-zinc-800 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-200">{title}</h2>
        {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
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

  const currentResource = resource as ResourceKey;
  const layout = valid ? EDITOR_LAYOUT[currentResource] : null;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-800 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3 text-sm text-zinc-500">
            <Link to={`/admin/${resource}`} className="hover:text-zinc-300">
              {RESOURCE_LABELS[currentResource]}
            </Link>
            <span>/</span>
            <span className="text-zinc-300">{isNew ? 'New' : `Edit #${numericId}`}</span>
          </div>
          <h1 className="text-2xl font-semibold text-zinc-100">
            {isNew ? `New ${RESOURCE_LABELS[currentResource].toLowerCase()}` : `Edit ${RESOURCE_LABELS[currentResource].toLowerCase()}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={`/admin/${resource}`}
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
          >
            Cancel
          </Link>
          <button
            onClick={onSave}
            disabled={saving || loading}
            className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            {layout?.main.map((section) => (
              <EditorSection key={section.title} title={section.title} description={section.description}>
                <DynamicForm
                  fields={pickFields(currentResource, section.fields)}
                  value={value}
                  onChange={setValue}
                />
              </EditorSection>
            ))}
            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
            {layout?.sidebar.map((section) => (
              <EditorSection key={section.title} title={section.title} description={section.description}>
                <DynamicForm
                  fields={pickFields(currentResource, section.fields)}
                  value={value}
                  onChange={setValue}
                />
              </EditorSection>
            ))}
            <section className="rounded-lg border border-emerald-700/40 bg-emerald-950/20 p-4">
              <p className="text-sm text-zinc-300">
                Content is saved in one source language. Skills keep their existing simple structure.
              </p>
              <button
                onClick={onSave}
                disabled={saving}
                className="mt-4 w-full rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </section>
          </aside>
        </div>
      )}
    </div>
  );
}
