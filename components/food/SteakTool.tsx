'use client';
import { useState } from 'react';
import { DONENESS, searMinutes } from '@/lib/food';
import { CARD, NumberField, Stat } from './ui';
import { DONENESS_INTL } from '@/lib/food-intl';
import { STEAK_UI, type FoodLang } from '@/lib/food-ui-intl';

export default function SteakTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = STEAK_UI[lang];
  const names = DONENESS_INTL[lang];
  const [pick, setPick] = useState('medium-rare');
  const [thickness, setThickness] = useState(2.5);

  const doneness = DONENESS.find(d => d.id === pick)!;
  const minutes = searMinutes(thickness, pick);
  const rest = Math.max(3, Math.round(thickness * 2));

  return (
    <div>
      <div className="flex flex-col gap-2">
        {DONENESS.map(d => (
          <button
            key={d.id}
            onClick={() => setPick(d.id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              pick === d.id
                ? 'border-red-300 bg-red-50 dark:bg-red-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-red-200'
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className={`block text-sm font-black ${pick === d.id ? 'text-red-700 dark:text-red-300' : 'text-slate-800 dark:text-slate-100'}`}>
                {d.name}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{d.desc}</span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block text-lg font-black text-slate-800 dark:text-slate-100 tabular-nums">{d.final}℃</span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500">{ui.finalCenter}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 text-white px-6 py-8 text-center">
        <p className="text-sm text-white/70 mb-1">{ui.pullAt(names[doneness.id].name)}</p>
        <p className="text-5xl font-black tabular-nums">{doneness.pull}℃</p>
        <p className="text-sm text-white/80 mt-2">{ui.afterRest(doneness.final)}</p>
      </div>

      <div className="mt-4">
        <NumberField label={ui.thickness} value={thickness} onChange={setThickness} unit="cm" step={0.5} min={1} />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label={ui.perSide} value={ui.aboutMin(minutes)} accent="text-red-600" />
        <Stat label={ui.restTime} value={ui.minSuffix(rest)} accent="text-rose-600" />
        <Stat label={ui.pullTemp} value={`${doneness.pull}℃`} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.whyTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.why}
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
