import { useState } from 'react';
import type { Field } from './fields';

const LANGS: { code: 'en' | 'fr' | 'ja'; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ja', label: 'JA' },
];

const inputCls =
  'w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500';
const labelCls = 'block text-sm font-medium text-zinc-300 mb-1';
const hintCls = 'text-xs text-zinc-500 mb-1';

type Props = {
  fields: Field[];
  value: Record<string, any>;
  onChange: (next: Record<string, any>) => void;
};

export function DynamicForm({ fields, value, onChange }: Props) {
  const setField = (name: string, v: any) => onChange({ ...value, [name]: v });
  const setLocalized = (name: string, lang: string, v: any) =>
    onChange({ ...value, [name]: { ...(value[name] ?? {}), [lang]: v } });

  return (
    <div className="space-y-5">
      {fields.map((f) => (
        <div key={f.name}>
          <label className={labelCls}>
            {f.label}
            {f.required && <span className="text-emerald-400"> *</span>}
          </label>
          {f.hint && <p className={hintCls}>{f.hint}</p>}

          {f.type === 'text' && (
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
            <input
              type="number"
              className={inputCls}
              value={value[f.name] ?? 0}
              onChange={(e) => setField(f.name, e.target.value === '' ? 0 : Number(e.target.value))}
            />
          )}

          {f.type === 'boolean' && (
            <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-emerald-500 focus:ring-emerald-500"
                checked={!!value[f.name]}
                onChange={(e) => setField(f.name, e.target.checked)}
              />
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
            <input
              type="text"
              className={inputCls}
              value={Array.isArray(value[f.name]) ? value[f.name].join(', ') : ''}
              onChange={(e) =>
                setField(
                  f.name,
                  e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                )
              }
            />
          )}

          {f.type === 'localized' && (
            <div className="space-y-2">
              {LANGS.map((l) => (
                <div key={l.code} className="flex items-center gap-2">
                  <span className="w-8 shrink-0 text-xs font-mono text-zinc-500">{l.label}</span>
                  <input
                    type="text"
                    className={inputCls}
                    value={value[f.name]?.[l.code] ?? ''}
                    onChange={(e) => setLocalized(f.name, l.code, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {f.type === 'localizedTextarea' && (
            <div className="space-y-2">
              {LANGS.map((l) => (
                <div key={l.code}>
                  <span className="text-xs font-mono text-zinc-500">{l.label}</span>
                  <textarea
                    className={`${inputCls} font-mono`}
                    rows={f.rows ?? 4}
                    value={value[f.name]?.[l.code] ?? ''}
                    onChange={(e) => setLocalized(f.name, l.code, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {f.type === 'localizedList' && (
            <div className="space-y-2">
              {LANGS.map((l) => (
                <div key={l.code}>
                  <span className="text-xs font-mono text-zinc-500">{l.label}</span>
                  <textarea
                    className={`${inputCls} font-mono`}
                    rows={f.rows ?? 4}
                    value={Array.isArray(value[f.name]?.[l.code]) ? value[f.name][l.code].join('\n') : ''}
                    onChange={(e) =>
                      setLocalized(
                        f.name,
                        l.code,
                        e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {f.type === 'json' && (
            <JsonField value={value[f.name]} onChange={(v) => setField(f.name, v)} rows={f.rows ?? 6} />
          )}
        </div>
      ))}
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
