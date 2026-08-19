'use client';
import { useMemo, useState } from 'react';
import { sampleFromPlaceholder } from '@/lib/text-tools';
import { dedupeLines, type DedupeOptions } from '@/lib/text-clean';
import { CARD, CopyBox, InputArea, Stat, Toggle } from './ui';
import { DEDUPE_UI, type TextLang } from '@/lib/text-ui-intl';

export default function DedupeTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = DEDUPE_UI[lang];
  /* 열자마자 한 벌이 돌아가게 — 플레이스홀더가 예시일 때만 쓴다(lib/text-tools.ts) */
  const [text, setText] = useState(() => sampleFromPlaceholder(ui.placeholder));
  const [options, setOptions] = useState<DedupeOptions>({
    dedupe: true, ignoreCase: false, ignoreSpace: true, removeBlank: true, sort: 'none', numbered: false,
  });

  const result = useMemo(() => dedupeLines(text, options), [text, options]);
  const set = (patch: Partial<DedupeOptions>) => setOptions(prev => ({ ...prev, ...patch }));

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
        <Toggle checked={!!options.dedupe} onChange={v => set({ dedupe: v })} label={ui.dedupe} />
        <Toggle checked={!!options.ignoreSpace} onChange={v => set({ ignoreSpace: v })} label={ui.ignoreSpace} hint={ui.ignoreSpaceHint} />
        <Toggle checked={!!options.ignoreCase} onChange={v => set({ ignoreCase: v })} label={ui.ignoreCase} hint={ui.ignoreCaseHint} />
        <Toggle checked={!!options.removeBlank} onChange={v => set({ removeBlank: v })} label={ui.removeBlank} />
        <Toggle checked={!!options.numbered} onChange={v => set({ numbered: v })} label={ui.numbered} hint={ui.numberedHint} />

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.sortTitle}</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { v: 'none' as const },
            { v: 'asc' as const },
            { v: 'desc' as const },
          ] as const).map((s, i) => (
            <button
              key={s.v}
              onClick={() => set({ sort: s.v })}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                options.sort === s.v
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {ui.sortModes[i]}
            </button>
          ))}
        </div>
      </div>

      {text && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label={ui.totalLines} value={result.total} />
          <Stat label={ui.keptLines} value={result.kept} accent="text-indigo-600" />
          <Stat label={ui.removedLines} value={result.removed} accent={result.removed > 0 ? 'text-rose-500' : undefined} />
        </div>
      )}

      <CopyBox value={result.text} label={ui.outputLabel} rows={7} lang={lang} />
    </div>
  );
}
