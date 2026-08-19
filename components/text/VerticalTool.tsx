'use client';
import { useMemo, useState } from 'react';
import { sampleFromPlaceholder } from '@/lib/text-tools';
import { toVertical } from '@/lib/text-more';
import { CARD, CopyBox, InputArea, Toggle } from './ui';
import { VERTICAL_UI } from '@/lib/text-more-ui';
import type { TextLang } from '@/lib/text-intl';

const GAPS = [0, 1, 2, 3];

export default function VerticalTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = VERTICAL_UI[lang];
  /* 열자마자 한 벌이 돌아가게 — 플레이스홀더가 예시일 때만 쓴다(lib/text-tools.ts) */
  const [text, setText] = useState(() => sampleFromPlaceholder(ui.placeholder));
  const [gap, setGap] = useState(1);
  const [rightToLeft, setRightToLeft] = useState(false);

  const result = useMemo(() => toVertical(text, { gap, rightToLeft }), [text, gap, rightToLeft]);

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={5} label={ui.inputLabel} lang={lang} placeholder={ui.placeholder} />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.gapTitle}</p>
        <div className="grid grid-cols-4 gap-2">
          {GAPS.map(g => (
            <button
              key={g}
              onClick={() => setGap(g)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                gap === g
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <Toggle checked={rightToLeft} onChange={setRightToLeft} label={ui.rtl} hint={ui.rtlHint} />
        </div>
      </div>

      <CopyBox value={result} label={ui.outputLabel} rows={10} mono lang={lang} />
    </div>
  );
}
