'use client';
import { useMemo, useState } from 'react';
import { maskPersonal, DEFAULT_MASK, type MaskOptions } from '@/lib/text-more';
import { CARD, CopyBox, InputArea, Stat, Toggle } from './ui';
import { MASK_UI } from '@/lib/text-more-ui';
import type { TextLang } from '@/lib/text-intl';

const CHARS = ['*', '●', '■', 'X'];

export default function MaskTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = MASK_UI[lang];
  const [text, setText] = useState('');
  const [options, setOptions] = useState<MaskOptions>(DEFAULT_MASK);

  const result = useMemo(() => maskPersonal(text, options), [text, options]);
  const set = (patch: Partial<MaskOptions>) => setOptions(prev => ({ ...prev, ...patch }));
  const total = Object.values(result.counts).reduce((a, b) => a + b, 0);

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={7} label={ui.inputLabel} lang={lang} placeholder={ui.placeholder} />

      <div className={`${CARD} mt-4`}>
        <Toggle checked={!!options.name} onChange={v => set({ name: v })} label={ui.name} hint={ui.nameHint} />
        <Toggle checked={!!options.phone} onChange={v => set({ phone: v })} label={ui.phone} hint={ui.phoneHint} />
        <Toggle checked={!!options.rrn} onChange={v => set({ rrn: v })} label={ui.rrn} hint={ui.rrnHint} />
        <Toggle checked={!!options.card} onChange={v => set({ card: v })} label={ui.card} hint={ui.cardHint} />
        <Toggle checked={!!options.email} onChange={v => set({ email: v })} label={ui.email} hint={ui.emailHint} />

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.charTitle}</p>
        <div className="grid grid-cols-4 gap-2">
          {CHARS.map(c => (
            <button
              key={c}
              onClick={() => set({ char: c })}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                (options.char ?? '*') === c
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {text && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label={ui.masked} value={total} accent={total > 0 ? 'text-indigo-600' : undefined} />
          <Stat label={ui.phone} value={result.counts.phone} />
          <Stat label={ui.email} value={result.counts.email} />
        </div>
      )}

      <CopyBox value={result.text} label={ui.outputLabel} rows={7} lang={lang} />
    </div>
  );
}
