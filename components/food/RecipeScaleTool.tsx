'use client';
import { useMemo, useState } from 'react';
import { CARD, NumberField, useCopy } from './ui';

/**
 * 레시피 배율 — 글 속의 숫자만 골라 곱한다.
 *
 * 단위가 붙은 숫자만 바꾼다. "180도로 20분"의 180까지 곱하면 오븐이 360도가
 * 되므로, 온도(도·℃)와 시간(분·초)은 건드리지 않는다.
 */
const KEEP_UNITS = /^(도|℃|°C|분|초|시간|인분|%|번|회|cm|mm)/;

/** 1/2, ½ 같은 분수도 숫자로 본다 */
const FRACTIONS: Record<string, number> = {
  '½': 0.5, '⅓': 1 / 3, '⅔': 2 / 3, '¼': 0.25, '¾': 0.75,
};

function scaleLine(line: string, factor: number): string {
  // 유니코드 분수를 먼저 숫자로 바꾼다
  let text = line;
  for (const [glyph, value] of Object.entries(FRACTIONS)) {
    text = text.replaceAll(glyph, String(value));
  }
  // "1/2" 형태
  text = text.replace(/(\d+)\s*\/\s*(\d+)/g, (_m, a, b) => String(Number(a) / Number(b)));

  return text.replace(/(\d+(?:\.\d+)?)(\s*)([^\s\d]*)/g, (match, num: string, space: string, rest: string) => {
    if (KEEP_UNITS.test(rest)) return match;
    const scaled = Number(num) * factor;
    const rounded = scaled >= 10 ? Math.round(scaled) : Math.round(scaled * 10) / 10;
    return `${rounded}${space}${rest}`;
  });
}

export default function RecipeScaleTool() {
  const [text, setText] = useState('');
  const [from, setFrom] = useState(2);
  const [to, setTo] = useState(4);
  const { copied, copy } = useCopy();

  const factor = from > 0 ? to / from : 1;
  const result = useMemo(
    () => text.split('\n').map(line => scaleLine(line, factor)).join('\n'),
    [text, factor],
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="원래 레시피" value={from} onChange={setFrom} unit="인분" min={1} />
        <NumberField label="만들 양" value={to} onChange={setTo} unit="인분" min={1} />
      </div>

      <p className="mt-3 text-center text-sm font-bold text-amber-600">
        모든 재료를 {factor >= 1 ? `${Math.round(factor * 100) / 100}배로 늘립니다` : `${Math.round(factor * 100) / 100}배로 줄입니다`}
      </p>

      <label className="block mt-4">
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">레시피 붙여넣기</span>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={7}
          placeholder={'돼지고기 300g\n양파 1개\n간장 2큰술\n설탕 1/2큰술\n180도로 20분'}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-400 leading-relaxed"
        />
      </label>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{to}인분 재료</span>
          <button
            onClick={() => copy(result)}
            disabled={!result}
            className={`text-xs font-bold disabled:opacity-40 ${copied ? 'text-emerald-600' : 'text-amber-600'}`}
          >
            {copied ? '✅ 복사했습니다' : '복사하기'}
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed min-h-[8rem] text-slate-800 dark:text-slate-100">
          {result || <span className="text-slate-300 dark:text-slate-600">위에 레시피를 붙여 넣으세요</span>}
        </div>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">온도와 시간은 바꾸지 않습니다</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          &lsquo;180도로 20분&rsquo;의 숫자까지 곱하면 오븐이 360도가 됩니다. 도·분·초·인분이 붙은 숫자는 그대로 둡니다.
          다만 양이 두 배가 되면 익는 데 시간이 더 걸리므로, 오븐 요리는 시간을 조금 늘리고 중간에
          확인하세요. 소금·향신료는 배율대로 넣으면 짜질 수 있어 조금 적게 시작하는 편이 안전합니다.
        </p>
      </div>
    </div>
  );
}
