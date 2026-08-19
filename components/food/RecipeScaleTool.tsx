'use client';
import { useMemo, useState } from 'react';
import { CARD, NumberField, useCopy } from './ui';
import { RECIPE_SCALE_UI, type FoodLang } from '@/lib/food-ui-intl';

/**
 * 레시피 배율 — 글 속의 숫자만 골라 곱한다.
 *
 * 단위가 붙은 숫자만 바꾼다. "180도로 20분"의 180까지 곱하면 오븐이 360도가
 * 되므로, 온도(도·℃)와 시간(분·초)은 건드리지 않는다.
 */
// 곱하면 안 되는 단위는 언어마다 다르다 — lib/food-ui-intl.ts에서 온다

/** 1/2, ½ 같은 분수도 숫자로 본다 */
const FRACTIONS: Record<string, number> = {
  '½': 0.5, '⅓': 1 / 3, '⅔': 2 / 3, '¼': 0.25, '¾': 0.75,
};

function scaleLine(line: string, factor: number, keepUnits: RegExp): string {
  // 유니코드 분수를 먼저 숫자로 바꾼다
  let text = line;
  for (const [glyph, value] of Object.entries(FRACTIONS)) {
    text = text.replaceAll(glyph, String(value));
  }
  // "1/2" 형태
  text = text.replace(/(\d+)\s*\/\s*(\d+)/g, (_m, a, b) => String(Number(a) / Number(b)));

  return text.replace(/(\d+(?:\.\d+)?)(\s*)([^\s\d]*)/g, (match, num: string, space: string, rest: string) => {
    if (keepUnits.test(rest)) return match;
    const scaled = Number(num) * factor;
    const rounded = scaled >= 10 ? Math.round(scaled) : Math.round(scaled * 10) / 10;
    return `${rounded}${space}${rest}`;
  });
}

export default function RecipeScaleTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = RECIPE_SCALE_UI[lang];
  const [text, setText] = useState('');
  const [from, setFrom] = useState(2);
  const [to, setTo] = useState(4);
  const { copied, copy } = useCopy();

  const factor = from > 0 ? to / from : 1;
  const result = useMemo(
    () => text.split('\n').map(line => scaleLine(line, factor, ui.keepUnits)).join('\n'),
    [text, factor, ui.keepUnits],
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <NumberField label={ui.fromLabel} value={from} onChange={setFrom} unit={ui.servingUnit} min={1} />
        <NumberField label={ui.toLabel} value={to} onChange={setTo} unit={ui.servingUnit} min={1} />
      </div>

      <p className="mt-3 text-center text-sm font-bold text-amber-600">
        {factor >= 1 ? ui.scaleUp(Math.round(factor * 100) / 100) : ui.scaleDown(Math.round(factor * 100) / 100)}
      </p>

      <label className="block mt-4">
        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{ui.pasteLabel}</span>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={7}
          placeholder={ui.placeholder}
          className="w-full rounded-lg border chip-off px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-400 leading-relaxed"
        />
      </label>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{ui.resultLabel(to)}</span>
          <button
            onClick={() => copy(result)}
            disabled={!result}
            className={`text-xs font-bold disabled:opacity-40 ${copied ? 'text-emerald-600' : 'text-amber-600'}`}
          >
            {copied ? ui.copied : ui.copy}
          </button>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed min-h-[8rem] text-slate-800 dark:text-slate-100">
          {result || <span className="text-slate-300 dark:text-slate-600">{ui.empty}</span>}
        </div>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.noteTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
