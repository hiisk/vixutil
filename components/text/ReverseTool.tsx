'use client';
import { useMemo, useState } from 'react';
import { reverseText, type ReverseUnit } from '@/lib/text-more';
import { CARD, CopyBox, InputArea } from './ui';
import { REVERSE_UI } from '@/lib/text-more-ui';
import type { TextLang } from '@/lib/text-intl';

const UNITS: ReverseUnit[] = ['char', 'word', 'line'];

export default function ReverseTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = REVERSE_UI[lang];
  const [text, setText] = useState('');
  const [unit, setUnit] = useState<ReverseUnit>('char');

  const result = useMemo(() => reverseText(text, unit), [text, unit]);

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={6} label={ui.inputLabel} lang={lang} placeholder={ui.placeholder} />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.unitTitle}</p>
        <div className="grid grid-cols-3 gap-2">
          {UNITS.map((u, i) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                unit === u
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
              }`}
            >
              {ui.units[i]}
            </button>
          ))}
        </div>
      </div>

      <CopyBox value={result} label={ui.outputLabel} rows={6} lang={lang} />
    </div>
  );
}
