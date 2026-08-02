'use client';
import { useMemo, useState } from 'react';
import { Card, Label, inputCls } from '@/components/CalcShell';
import { DEV_REGEX } from '@/lib/calc-l10n/dev-tools4';
import type { CalcLang } from '@/lib/calc-l10n/types';

const FLAGS: { key: string; label: string }[] = [
  { key: 'g', label: 'gGlobal' }, { key: 'i', label: 'gIgnore' },
  { key: 'm', label: 'gMulti' }, { key: 's', label: 'gDotAll' },
];

export default function DevRegexIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_REGEX[lang].ui;
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');

  const { matches, error } = useMemo(() => {
    if (!pattern || !text) return { matches: [], error: '' };
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      return { matches: [...text.matchAll(re)], error: '' };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : c.invalid };
    }
  }, [pattern, flags, text, c.invalid]);

  function toggle(f: string) {
    setFlags(flags.includes(f) ? flags.replace(f, '') : flags + f);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <Label>{c.pattern}</Label>
        <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} className={`${inputCls} font-mono`} />
        <div className="mt-3">
          <Label>{c.flags}</Label>
          <div className="flex flex-wrap gap-1.5">
            {FLAGS.map(f => (
              <button
                key={f.key}
                onClick={() => toggle(f.key)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  flags.includes(f.key)
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {c[f.label]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <Label>{c.test}</Label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={6}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="mt-3 text-xs font-semibold text-rose-600 break-all">{error}</p>}
      </Card>

      {pattern && text && !error && (
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {c.matches} {matches.length > 0 && `(${matches.length})`}
          </p>
          {matches.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">{c.noMatch}</p>
          ) : (
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {matches.slice(0, 100).map((m, i) => (
                <div key={i} className="py-2.5">
                  <div className="flex justify-between items-baseline gap-3">
                    <span className="text-sm font-mono font-bold text-blue-600 break-all">{m[0]}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{c.position} {m.index}</span>
                  </div>
                  {m.length > 1 && (
                    <div className="mt-1.5 flex flex-col gap-0.5">
                      {m.slice(1).map((g, j) => (
                        <div key={j} className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {c.groups} {j + 1}: <span className="text-slate-800 dark:text-slate-100">{g ?? '—'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
