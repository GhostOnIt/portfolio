import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { contentApi } from './api';
import type { ResourceKey } from './api';
import { DEFAULTS, FIELDS, RESOURCE_LABELS } from './fields';
import type { Field } from './fields';
import { DynamicForm } from './DynamicForm';

function isResourceKey(v: string | undefined): v is ResourceKey {
  return v === 'blog' || v === 'caseStudies' || v === 'projects' || v === 'skillCategories' || v === 'skills';
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function getFieldText(value: any) {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.length > 0 ? 'ok' : '';
  if (value && typeof value === 'object') {
    if (Array.isArray(value.en)) return value.en.length > 0 ? 'ok' : '';
    return typeof value.en === 'string' ? value.en.trim() : '';
  }
  if (typeof value === 'number') return Number.isFinite(value) ? 'ok' : '';
  if (typeof value === 'boolean') return 'ok';
  return '';
}

function validateResource(resource: ResourceKey, data: Record<string, any>) {
  const errors: Record<string, string> = {};
  for (const field of FIELDS[resource]) {
    if (field.required && !getFieldText(data[field.name])) {
      errors[field.name] = `${field.label} is required.`;
    }
    if (field.name === 'slug' && getFieldText(data[field.name]) && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(data[field.name]))) {
      errors[field.name] = 'Slug can only contain lowercase letters, numbers, and hyphens.';
    }
  }
  return errors;
}

function renderMarkdown(markdown: string) {
  if (!markdown.trim()) return <p className="text-zinc-500">Nothing to preview yet.</p>;

  return (
    <div className="space-y-3 text-sm leading-6 text-zinc-300">
      {markdown.split('\n').map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-2" />;
        if (trimmed.startsWith('### ')) return <h4 key={index} className="text-base font-semibold text-zinc-100">{trimmed.slice(4)}</h4>;
        if (trimmed.startsWith('## ')) return <h3 key={index} className="text-lg font-semibold text-zinc-100">{trimmed.slice(3)}</h3>;
        if (trimmed.startsWith('# ')) return <h2 key={index} className="text-xl font-semibold text-zinc-100">{trimmed.slice(2)}</h2>;
        if (trimmed.startsWith('- ')) return <p key={index} className="pl-4 text-zinc-300">- {trimmed.slice(2)}</p>;
        return <p key={index}>{trimmed}</p>;
      })}
    </div>
  );
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
  skillCategories: {
    main: [
      {
        title: 'Category',
        description: 'Create reusable categories for skills. The slug is what skills store internally.',
        fields: ['label', 'slug', 'icon', 'color'],
      },
    ],
    sidebar: [
      { title: 'Display', fields: ['visible', 'sortOrder'] },
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
  const currentResource: ResourceKey = valid ? resource : 'blog';
  const [value, setValue] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(false);
  const [skillCategoryOptions, setSkillCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!valid) return;
    if (isNew) {
      setValue(DEFAULTS[resource as ResourceKey]());
      setDirty(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    contentApi
      .get(resource as ResourceKey, numericId as number)
      .then((row) => {
        setValue(row);
        setDirty(false);
      })
      .catch((e) => setError(e?.message || 'Failed to load'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, id]);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  useEffect(() => {
    if (!valid || currentResource !== 'skills') return;
    contentApi
      .list('skillCategories')
      .then((categories) => {
        const options = categories
          .filter((category) => category.visible !== false)
          .map((category) => category.slug)
          .filter(Boolean);
        setSkillCategoryOptions(options);
      })
      .catch(() => setSkillCategoryOptions([]));
  }, [valid, currentResource]);

  useEffect(() => {
    if (!valid || currentResource === 'skills' || value.slug) return;
    const title = getFieldText(value.title);
    if (!title) return;
    setValue((prev) => ({ ...prev, slug: slugify(title) }));
  }, [valid, currentResource, value.title, value.slug]);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const validation = validateResource(resource as ResourceKey, value);
      setFieldErrors(validation);
      if (Object.keys(validation).length > 0) {
        setSaving(false);
        setError('Please fix the highlighted fields before saving.');
        return;
      }

      const payload = normalizeSourceContent(resource as ResourceKey, value);
      if (isNew) {
        await contentApi.create(resource as ResourceKey, payload);
      } else {
        await contentApi.update(resource as ResourceKey, numericId as number, payload);
      }
      setDirty(false);
      setNotice('Saved successfully.');
      if (isNew) navigate(`/admin/${resource}`);
    } catch (e: any) {
      setError(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const layout = EDITOR_LAYOUT[currentResource];
  const fieldsForSection = (names: string[]) => {
    const fields = pickFields(currentResource, names);
    if (currentResource !== 'skills' || skillCategoryOptions.length === 0) return fields;
    return fields.map((field) =>
      field.name === 'category' ? { ...field, options: skillCategoryOptions } : field,
    );
  };
  const mainPreview = useMemo(() => {
    if (!layout) return null;
    const previewFields = layout.main.flatMap((section) => section.fields);
    return previewFields.map((name) => {
      const field = FIELDS[currentResource].find((item) => item.name === name);
      if (!field) return null;
      const current = value[name];
      const text = field.type === 'localizedList'
        ? Array.isArray(current?.en) ? current.en.map((item: string) => `- ${item}`).join('\n') : ''
        : typeof current?.en === 'string' ? current.en : typeof current === 'string' ? current : '';
      return { name, label: field.label, text };
    }).filter(Boolean) as { name: string; label: string; text: string }[];
  }, [currentResource, layout, value]);

  const updateValue = (next: Record<string, any>) => {
    setValue(next);
    setDirty(true);
    setNotice(null);
  };

  const confirmLeave = (event: React.MouseEvent) => {
    if (!dirty) return;
    if (!confirm('You have unsaved changes. Leave without saving?')) {
      event.preventDefault();
    }
  };

  if (!valid) return <Navigate to="/admin" replace />;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="sticky top-0 z-20 -mx-8 mb-6 flex flex-col gap-4 border-b border-zinc-800 bg-zinc-950/95 px-8 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
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
            onClick={confirmLeave}
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
            {notice && <p className="rounded-md border border-emerald-700/40 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">{notice}</p>}
            {currentResource !== 'skills' && (
              <div className="inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-1 text-sm">
                <button
                  type="button"
                  onClick={() => setPreview(false)}
                  className={`rounded px-3 py-1.5 ${!preview ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-zinc-100'}`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className={`rounded px-3 py-1.5 ${preview ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-zinc-100'}`}
                >
                  Preview
                </button>
              </div>
            )}
            {layout?.main.map((section) => (
              <EditorSection key={section.title} title={section.title} description={section.description}>
                {preview ? (
                  <div className="space-y-6">
                    {mainPreview.map((item) => (
                      <div key={item.name}>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">{item.label}</p>
                        {renderMarkdown(item.text)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <DynamicForm
                    fields={fieldsForSection(section.fields)}
                    value={value}
                    onChange={updateValue}
                    errors={fieldErrors}
                  />
                )}
              </EditorSection>
            ))}
            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
            {layout?.sidebar.map((section) => (
              <EditorSection key={section.title} title={section.title} description={section.description}>
                <DynamicForm
                  fields={fieldsForSection(section.fields)}
                  value={value}
                  onChange={updateValue}
                  errors={fieldErrors}
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
