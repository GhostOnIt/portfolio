import { useState } from 'react';
import type { Field } from './fields';

const inputCls =
  'w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500';
const labelCls = 'block text-sm font-medium text-zinc-300 mb-1';
const hintCls = 'text-xs text-zinc-500 mb-1';
const sourceLangCls = 'mb-1 text-xs font-mono text-zinc-500';

type Props = {
  fields: Field[];
  value: Record<string, any>;
  onChange: (next: Record<string, any>) => void;
  errors?: Record<string, string>;
};

export function DynamicForm({ fields, value, onChange, errors = {} }: Props) {
  const setField = (name: string, v: any) => onChange({ ...value, [name]: v });
  const setLocalizedSource = (name: string, v: any) => onChange({ ...value, [name]: { en: v } });

  return (
    <div className="space-y-5">
      {fields.map((f) => (
        <div key={f.name}>
          <label className={labelCls}>
            {f.label}
            {f.required && <span className="text-emerald-400"> *</span>}
          </label>
          {f.hint && <p className={hintCls}>{f.hint}</p>}

          {f.type === 'text' && f.options && (
            <select
              className={inputCls}
              value={value[f.name] ?? ''}
              onChange={(e) => setField(f.name, e.target.value)}
            >
              <option value="">Select...</option>
              {f.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {f.type === 'text' && !f.options && (
            <input
              type="text"
              className={inputCls}
              value={value[f.name] ?? ''}
              onChange={(e) => setField(f.name, e.target.value)}
            />
          )}

          {f.type === 'textarea' && (
            <textarea
              className={`${inputCls} font-mono`}
              rows={f.rows ?? 4}
              value={value[f.name] ?? ''}
              onChange={(e) => setField(f.name, e.target.value)}
            />
          )}

          {f.type === 'number' && (
            f.min != null || f.max != null ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min={f.min ?? 0}
                  max={f.max ?? 100}
                  className="w-full accent-emerald-500"
                  value={value[f.name] ?? 0}
                  onChange={(e) => setField(f.name, Number(e.target.value))}
                />
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{f.min ?? 0}</span>
                  <span className="rounded bg-zinc-800 px-2 py-1 text-zinc-200">{value[f.name] ?? 0}</span>
                  <span>{f.max ?? 100}</span>
                </div>
              </div>
            ) : (
              <input
                type="number"
                className={inputCls}
                value={value[f.name] ?? 0}
                onChange={(e) => setField(f.name, e.target.value === '' ? 0 : Number(e.target.value))}
              />
            )
          )}

          {f.type === 'boolean' && (
            <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={!!value[f.name]}
                onChange={(e) => setField(f.name, e.target.checked)}
              />
              <span className="h-6 w-11 rounded-full bg-zinc-700 transition after:ml-1 after:mt-1 after:block after:h-4 after:w-4 after:rounded-full after:bg-zinc-300 after:transition peer-checked:bg-emerald-600 peer-checked:after:translate-x-5" />
              {value[f.name] ? 'Yes' : 'No'}
            </label>
          )}

          {f.type === 'date' && (
            <input
              type="date"
              className={inputCls}
              value={value[f.name] ?? ''}
              onChange={(e) => setField(f.name, e.target.value)}
            />
          )}

          {f.type === 'tags' && (
            <TagsField
              value={Array.isArray(value[f.name]) ? value[f.name] : []}
              onChange={(next) => setField(f.name, next)}
            />
          )}

          {f.type === 'localized' && (
            <>
              <p className={sourceLangCls}>Source content</p>
              <input
                type="text"
                className={inputCls}
                value={value[f.name]?.en ?? ''}
                onChange={(e) => setLocalizedSource(f.name, e.target.value)}
              />
            </>
          )}

          {f.type === 'localizedTextarea' && (
            <>
              <p className={sourceLangCls}>Source content</p>
              <textarea
                className={`${inputCls} font-mono`}
                rows={f.rows ?? 4}
                value={value[f.name]?.en ?? ''}
                onChange={(e) => setLocalizedSource(f.name, e.target.value)}
              />
            </>
          )}

          {f.type === 'localizedList' && (
            <>
              <p className={sourceLangCls}>Source content</p>
              <textarea
                className={`${inputCls} font-mono`}
                rows={f.rows ?? 4}
                value={Array.isArray(value[f.name]?.en) ? value[f.name].en.join('\n') : ''}
                onChange={(e) =>
                  setLocalizedSource(
                    f.name,
                    e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                  )
                }
              />
            </>
          )}

          {f.type === 'json' && (
            <JsonField value={value[f.name]} onChange={(v) => setField(f.name, v)} rows={f.rows ?? 6} />
          )}

          {errors[f.name] && <p className="mt-1 text-xs text-red-400">{errors[f.name]}</p>}
        </div>
      ))}
    </div>
  );
}

function TagsField({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const [draft, setDraft] = useState('');

  const addTag = () => {
    const next = draft.trim();
    if (!next || value.includes(next)) return;
    onChange([...value, next]);
    setDraft('');
  };

  return (
    <div className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2">
      <div className="mb-2 flex flex-wrap gap-2">
        {value.length === 0 && <span className="text-sm text-zinc-500">No items yet.</span>}
        {value.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(value.filter((item) => item !== tag))}
            className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200 transition hover:bg-red-900/50 hover:text-red-200"
            title="Remove"
          >
            {tag} x
          </button>
        ))}
      </div>
      <input
        type="text"
        className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
        placeholder="Type and press Enter"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
          }
        }}
        onBlur={addTag}
      />
    </div>
  );
}

function JsonField({ value, onChange, rows }: { value: any; onChange: (v: any) => void; rows: number }) {
  const [text, setText] = useState(() => JSON.stringify(value ?? {}, null, 2));
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <textarea
        className={`${inputCls} font-mono`}
        rows={rows}
        value={text}
        onChange={(e) => {
          const next = e.target.value;
          setText(next);
          try {
            onChange(next.trim() === '' ? {} : JSON.parse(next));
            setError(null);
          } catch {
            setError('Invalid JSON');
          }
        }}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
