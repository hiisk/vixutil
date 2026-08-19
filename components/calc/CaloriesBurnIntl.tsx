'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { CALORIES_BURN } from '@/lib/calc-l10n/calories-burn';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

// MET: Compendium of Physical Activities (Ainsworth et al. 2011)
const METS: [string, number][] = [
  ['e1', 2.8], ['e2', 3.8], ['e3', 8.0], ['e4', 11.5], ['e5', 7.5], ['e6', 12.0],
  ['e7', 6.0], ['e8', 9.8], ['e9', 11.0], ['e10', 2.5], ['e11', 3.0], ['e12', 8.0],
  ['e13', 6.0], ['e14', 3.5], ['e15', 6.0], ['e16', 10.0], ['e17', 7.3], ['e18', 3.3],
];

const FOODS: [string, number][] = [['f1', 285], ['f2', 140], ['f3', 270], ['f4', 105]];

export default function CaloriesBurnIntl({ lang }: { lang: CalcLang }) {
  const c = CALORIES_BURN[lang].ui;
  const tag = localeTag(lang);
  const [weight, setWeight] = useState('');
  const [exercise, setExercise] = useState('e2');
  const [duration, setDuration] = useState('30');
  const [result, setResult] = useState<{ kcal: number; met: number } | null>(null);

  const fmt = (n: number) => Math.round(n).toLocaleString(tag);

  function calculate() {
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    const met = METS.find(([k]) => k === exercise)?.[1];
    if (!(w > 0) || !(d > 0) || met === undefined) return;
    setResult({ kcal: met * w * (d / 60), met });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.exercise}</Label>
            <select value={exercise} onChange={e => setExercise(e.target.value)} className={selectCls}>
              {METS.map(([key, met]) => (
                <option key={key} value={key}>{c[key]} · {met} {c.metLabel}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.weight}</Label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.duration}</Label>
              <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.result}</p>
            <p className="stat-value">{fmt(result.kcal)} {c.unit}</p>
            {/* 지방 1g은 대략 7.7kcal — 체지방 1kg에 7,700kcal이라는 흔한 어림값과 같은 근거다. */}
            <p className="stat-sub mt-2">
              {c.fat} {fmt(result.kcal / 7.7)} {c.fatUnit}
            </p>
          </div>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.compare}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
              {FOODS.map(([key, kcal]) => (
                <SummaryCard
                  key={key}
                  label={c[key]}
                  value={`${(result.kcal / kcal).toLocaleString(tag, { maximumFractionDigits: 1 })}×`}
                />
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
