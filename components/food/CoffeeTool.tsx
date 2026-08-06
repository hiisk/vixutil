'use client';
import { useMemo, useState } from 'react';
import { BREW_RATIOS } from '@/lib/food';
import { CARD, NumberField, Result, Stat } from './ui';
import { BREW_INTL, GRIND_INTL } from '@/lib/food-intl';
import { COFFEE_UI, type FoodLang } from '@/lib/food-ui-intl';


export default function CoffeeTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = COFFEE_UI[lang];
  const brews = BREW_INTL[lang];
  const grinds = GRIND_INTL[lang];
  const [method, setMethod] = useState('filter');
  const [water, setWater] = useState(300);
  const [mode, setMode] = useState<'byWater' | 'byBean'>('byWater');
  const [bean, setBean] = useState(20);

  const pick = BREW_RATIOS.find(b => b.id === method)!;
  const result = useMemo(() => (
    mode === 'byWater'
      ? { bean: Math.round((water / pick.ratio) * 10) / 10, water }
      : { bean, water: Math.round(bean * pick.ratio) }
  ), [mode, water, bean, pick]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        {BREW_RATIOS.map(b => (
          <button
            key={b.id}
            onClick={() => setMethod(b.id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              method === b.id
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-200'
            }`}
          >
            <span className="hub-card-body">
              <span className={`block text-sm font-black ${method === b.id ? 'text-amber-800 dark:text-amber-300' : 'text-slate-800 dark:text-slate-100'}`}>
                {brews[b.id].name}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{brews[b.id].note}</span>
            </span>
            <span className="shrink-0 text-sm font-black text-slate-500 dark:text-slate-400 tabular-nums">1:{b.ratio}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {(['byWater', 'byBean'] as const).map((v, i) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              mode === v
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.modes[i]}
          </button>
        ))}
      </div>

      <div className="mt-3">
        {mode === 'byWater'
          ? <NumberField label={pick.id === 'espresso' ? ui.yieldLabel : ui.drinkWater} value={water} onChange={setWater} unit="ml" step={50} />
          : <NumberField label={ui.beanLabel} value={bean} onChange={setBean} unit="g" step={1} />}
      </div>

      <Result sub={grinds[method]}>
        {ui.beanWord} {result.bean}<span className="text-xl">g</span> · {ui.waterWord} {result.water}<span className="text-xl">ml</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label={ui.beanStat} value={`${result.bean}g`} accent="text-amber-700" />
        <Stat label={ui.waterStat} value={`${result.water}ml`} />
        <Stat label={ui.ratioStat} value={`1 : ${pick.ratio}`} accent="text-orange-700" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
