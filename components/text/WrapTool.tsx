'use client';
import { useMemo, useState } from 'react';
import { sampleFromPlaceholder } from '@/lib/text-tools';
import { rewrap, type WrapMode } from '@/lib/text-more';
import { CARD, CopyBox, InputArea, Stat, Toggle } from './ui';
import { WRAP_UI } from '@/lib/text-more-ui';
import type { TextLang } from '@/lib/text-intl';

const WIDTHS = [40, 60, 80, 100];

export default function WrapTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = WRAP_UI[lang];
  /* 열자마자 한 벌이 돌아가게 — 플레이스홀더가 예시일 때만 쓴다(lib/text-tools.ts) */
  const [text, setText] = useState(() => sampleFromPlaceholder(ui.placeholder));
  const [mode, setMode] = useState<WrapMode>('wrap');
  const [width, setWidth] = useState(60);
  const [keepWords, setKeepWords] = useState(true);

  const result = useMemo(() => rewrap(text, { mode, width, keepWords }), [text, mode, width, keepWords]);

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={7} label={ui.inputLabel} lang={lang} placeholder={ui.placeholder} />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.modeTitle}</p>
        <div className="grid grid-cols-2 gap-2">
          {(['wrap', 'unwrap'] as const).map((m, i) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                mode === m
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
              }`}
            >
              {ui.modes[i]}
            </button>
          ))}
        </div>

        {mode === 'wrap' && (
          <>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.widthLabel}</p>
            <div className="grid grid-cols-4 gap-2">
              {WIDTHS.map(w => (
                <button
                  key={w}
                  onClick={() => setWidth(w)}
                  className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                    width === w
                      ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <Toggle checked={keepWords} onChange={setKeepWords} label={ui.keepWords} hint={ui.keepWordsHint} />
            </div>
          </>
        )}
      </div>

      {text && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Stat label={ui.lines} value={result.lines} accent="text-indigo-600" />
          <Stat label={ui.longest} value={result.longest} />
        </div>
      )}

      <CopyBox value={result.text} label={ui.outputLabel} rows={7} lang={lang} />
    </div>
  );
}
