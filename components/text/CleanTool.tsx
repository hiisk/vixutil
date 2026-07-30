'use client';
import { useMemo, useState } from 'react';
import { cleanText, DEFAULT_CLEAN, type CleanOptions } from '@/lib/text-clean';
import { CARD, CopyBox, InputArea, Toggle } from './ui';
import { CLEAN_UI, type TextLang } from '@/lib/text-ui-intl';

const OPTIONS: { key: keyof CleanOptions }[] = [
  { key: 'invisible' as const },
  { key: 'oddSpace' as const },
  { key: 'collapseSpaces' as const },
  { key: 'trimLines' as const },
  { key: 'blankLines' as const },
  { key: 'joinLines' as const },
  { key: 'smartQuotes' as const },
  { key: 'stripHtml' as const },
];

export default function CleanTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = CLEAN_UI[lang];
  const [text, setText] = useState('');
  const [options, setOptions] = useState<CleanOptions>(DEFAULT_CLEAN);

  const result = useMemo(() => cleanText(text, options), [text, options]);
  const entries = Object.entries(result.counts);
  const shrunk = text.length - result.text.length;

  return (
    <div>
      <InputArea
        value={text}
        onChange={setText}
        rows={7}
        label={ui.inputLabel}
        lang={lang}
        placeholder={ui.placeholder}
      />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{ui.whatTitle}</p>
        <div className="grid sm:grid-cols-2 gap-x-4">
          {OPTIONS.map((o, i) => (
            <Toggle
              key={o.key}
              checked={!!options[o.key]}
              onChange={v => setOptions(prev => ({ ...prev, [o.key]: v }))}
              label={ui.labels[i]}
              hint={ui.hints[i] || undefined}
            />
          ))}
        </div>
      </div>

      {text && (
        <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
            {entries.length === 0 ? ui.nothing : shrunk > 0 ? ui.shrunk(shrunk) : ui.cleaned}
          </p>
          {entries.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {entries.map(([label, n]) => (
                <span
                  key={label}
                  className="rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 dark:text-indigo-300"
                >
                  {label} {n}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <CopyBox value={result.text} label={ui.outputLabel} rows={7} lang={lang} />
    </div>
  );
}
