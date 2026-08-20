'use client';
import { useMemo, useState } from 'react';
import { CARD, NumberField, Result, Stat } from './ui';
import { PASTA_UI, type FoodLang } from '@/lib/food-ui-intl';

const SHAPES = [
  { id: 'spaghetti', minutes: 9 },
  { id: 'linguine', minutes: 10 },
  { id: 'penne', minutes: 11 },
  { id: 'fusilli', minutes: 11 },
  { id: 'farfalle', minutes: 11 },
  { id: 'fettuccine', minutes: 8 },
];

export default function PastaTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = PASTA_UI[lang];
  const [gram, setGram] = useState(200);
  const [shape, setShape] = useState('spaghetti');
  const [aldente, setAldente] = useState(true);

  const pick = SHAPES.find(s => s.id === shape)!;
  const result = useMemo(() => ({
    // 면 100g에 물 1L, 소금 10g이 기본 비율
    water: Math.round((gram / 100) * 1000),
    salt: Math.round((gram / 100) * 10),
    minutes: aldente ? pick.minutes - 1 : pick.minutes,
  }), [gram, pick, aldente]);

  return (
    <div>
      <NumberField label={ui.noodle} value={gram} onChange={setGram} unit="g" step={50} min={50} />
      <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        {ui.servingNote}
      </p>

      <Result sub={ui.ratioSub}>
        {ui.waterWord} {(result.water / 1000).toFixed(1)}<span className="text-xl">L</span> · {ui.saltWord} {result.salt}<span className="text-xl">g</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label={ui.waterLabel} value={`${result.water}ml`} accent="text-yellow-600" />
        <Stat label={ui.saltLabel} value={`${result.salt}g`} accent="text-amber-600" />
        <Stat label={ui.timeLabel} value={ui.minSuffix(result.minutes)} accent="text-orange-600" />
      </div>

      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-5 mb-2">{ui.shapeTitle}</p>
      <div className="grid grid-cols-3 gap-2">
        {SHAPES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setShape(s.id)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              shape === s.id
                ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.shapes[i]}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-3 mt-4 cursor-pointer">
        <input type="checkbox" checked={aldente} onChange={e => setAldente(e.target.checked)} className="w-4 h-4 accent-amber-500" />
        <span className="text-sm text-slate-700 dark:text-slate-200">
          {ui.alDente}
          <span className="block text-[11px] text-slate-500 dark:text-slate-400">{ui.alDenteNote}</span>
        </span>
      </label>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.saltTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.saltNote}
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.waterNote}
        </p>
      </div>
    </div>
  );
}
