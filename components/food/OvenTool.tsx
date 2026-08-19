'use client';
import { useMemo, useState } from 'react';
import { cToF, fToC, gasMark, toAirFryer } from '@/lib/food';
import { CARD, NumberField, Result, Stat } from './ui';
import { OVEN_UI, type FoodLang } from '@/lib/food-ui-intl';

const PRESETS = [160, 170, 180, 190, 200, 220];

export default function OvenTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = OVEN_UI[lang];
  const [celsius, setCelsius] = useState(180);
  const [minutes, setMinutes] = useState(25);
  const [input, setInput] = useState<'c' | 'f'>('c');
  const [fahrenheit, setFahrenheit] = useState(350);

  const c = input === 'c' ? celsius : fToC(fahrenheit);
  const air = useMemo(() => toAirFryer(c, minutes), [c, minutes]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {(['c', 'f'] as const).map((v, i) => (
          <button
            key={v}
            onClick={() => setInput(v)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              input === v
                ? 'border-orange-300 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.modes[i]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {input === 'c'
          ? <NumberField label={ui.temp} value={celsius} onChange={setCelsius} unit="℃" step={5} />
          : <NumberField label={ui.temp} value={fahrenheit} onChange={setFahrenheit} unit="°F" step={25} />}
        <NumberField label={ui.time} value={minutes} onChange={setMinutes} unit={ui.minUnit} step={5} />
      </div>

      <Result sub={ui.gasMarkSub(gasMark(c), minutes)}>
        {c}<span className="text-xl">℃</span> = {cToF(c)}<span className="text-xl">°F</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label={ui.celsius} value={`${c}℃`} accent="text-orange-600" />
        <Stat label={ui.fahrenheit} value={`${cToF(c)}°F`} />
        <Stat label={ui.gasMark} value={gasMark(c)} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.airTitle}</p>
        <p className="text-2xl font-bold text-red-600">
          {ui.airValue(air.celsius, air.minutes)}
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.airNote}
        </p>
      </div>

      <div className="grid grid-cols-6 gap-2 mt-4">
        {PRESETS.map(p => (
          <button
            key={p}
            onClick={() => { setInput('c'); setCelsius(p); }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            {p}℃
          </button>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
