'use client';
import { useMemo, useState } from 'react';
import { sampleFromPlaceholder } from '@/lib/text-tools';
import { toSlug, DEFAULT_SLUG, type SlugOptions } from '@/lib/text-more';
import { CARD, CopyRow, InputArea, Toggle } from './ui';
import { SLUG_UI } from '@/lib/text-more-ui';
import type { TextLang } from '@/lib/text-intl';

const LIMITS = [0, 40, 60, 80];

export default function SlugTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = SLUG_UI[lang];
  /* 열자마자 한 벌이 돌아가게 — 플레이스홀더가 예시일 때만 쓴다(lib/text-tools.ts) */
  const [text, setText] = useState(() => sampleFromPlaceholder(ui.placeholder));
  const [options, setOptions] = useState<SlugOptions>(DEFAULT_SLUG);

  const result = useMemo(() => toSlug(text, options), [text, options]);
  const set = (patch: Partial<SlugOptions>) => setOptions(prev => ({ ...prev, ...patch }));

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={3} label={ui.inputLabel} lang={lang} placeholder={ui.placeholder} />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.sepTitle}</p>
        <div className="grid grid-cols-2 gap-2">
          {(['-', '_'] as const).map(s => (
            <button
              key={s}
              onClick={() => set({ separator: s })}
              className={`rounded-xl border py-2.5 text-sm font-bold font-mono transition-colors ${
                options.separator === s
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.maxTitle}</p>
        <div className="grid grid-cols-4 gap-2">
          {LIMITS.map(n => (
            <button
              key={n}
              onClick={() => set({ maxLength: n })}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                options.maxLength === n
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {n === 0 ? ui.noLimit : n}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <Toggle checked={options.lower} onChange={v => set({ lower: v })} label={ui.lower} />
          <Toggle checked={options.romanize} onChange={v => set({ romanize: v })} label={ui.romanize} hint={ui.romanizeHint} />
        </div>
      </div>

      <div className="mt-4">
        <CopyRow label={ui.outputLabel} value={result} lang={lang} />
      </div>
    </div>
  );
}
