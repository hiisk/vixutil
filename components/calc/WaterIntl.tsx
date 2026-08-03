'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import { WATER } from '@/lib/calc-l10n/health';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function WaterIntl({ lang }: { lang: CalcLang }) {
  const c = WATER[lang].ui;
  const tag = localeTag(lang);
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('normal');
  const [weather, setWeather] = useState('normal');
  const [ml, setMl] = useState<number | null>(null);

  function calculate() {
    const w = parseFloat(weight);
    if (!(w > 0)) return;
    let total = w * 33;
    if (activity === 'high') total += 400;
    if (weather === 'hot') total += 500;
    if (weather === 'exercise') total += 700;
    setMl(total);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.weight}</Label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.activity}</Label>
              <select value={activity} onChange={e => setActivity(e.target.value)} className={selectCls}>
                <option value="normal">{c.actNormal}</option>
                <option value="high">{c.actHigh}</option>
              </select>
            </div>
            <div>
              <Label>{c.weather}</Label>
              <select value={weather} onChange={e => setWeather(e.target.value)} className={selectCls}>
                <option value="normal">{c.wNormal}</option>
                <option value="hot">{c.wHot}</option>
                <option value="exercise">{c.wExercise}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {ml !== null && (
        <div className="bg-blue-600 rounded-2xl p-6 text-center">
          <p className="text-blue-200 text-xs mb-1">{c.result}</p>
          <p className="text-white text-4xl font-black">
            {(ml / 1000).toLocaleString(tag, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L
          </p>
          <p className="text-blue-200 text-sm mt-2">{c.glasses.replace('{n}', String(Math.round(ml / 250)))}</p>
        </div>
      )}
    </div>
  );
}
