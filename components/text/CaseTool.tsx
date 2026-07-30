'use client';
import { useMemo, useState } from 'react';
import { convertCase } from '@/lib/text-clean';
import { CARD, CopyRow, InputArea } from './ui';
import { CASE_UI, type TextLang } from '@/lib/text-ui-intl';

const ROWS: { key: keyof ReturnType<typeof convertCase> }[] = [
  { key: 'upper' as const },
  { key: 'lower' as const },
  { key: 'title' as const },
  { key: 'sentence' as const },
  { key: 'camel' as const },
  { key: 'pascal' as const },
  { key: 'snake' as const },
  { key: 'kebab' as const },
  { key: 'constant' as const },
  { key: 'toggle' as const },
];

export default function CaseTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = CASE_UI[lang];
  const [text, setText] = useState('');
  const result = useMemo(() => convertCase(text), [text]);

  return (
    <div>
      <InputArea
        value={text}
        onChange={setText}
        rows={4}
        label={ui.inputLabel}
        lang={lang}
        placeholder={ui.placeholder}
      />

      <div className="flex flex-col gap-2 mt-4">
        {ROWS.map((r, i) => (
          <CopyRow key={r.key} label={ui.labels[i]} value={text ? result[r.key] : ''} hint={ui.hints[i] || undefined} lang={lang} />
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.noteTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
