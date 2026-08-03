'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { CALORIE } from '@/lib/calc-l10n/health2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Sex = 'm' | 'f';

export default function CalorieIntl({ lang }: { lang: CalcLang }) {
  const c = CALORIE[lang].ui;
  const tag = localeTag(lang);
  const [sex, setSex] = useState<Sex>('m');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState(1.55);
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const fmt = (n: number) => Math.round(n).toLocaleString(tag);

  const levels = [
    { factor: 1.2, label: c.a1, sub: c.a1s },
    { factor: 1.375, label: c.a2, sub: c.a2s },
    { factor: 1.55, label: c.a3, sub: c.a3s },
    { factor: 1.725, label: c.a4, sub: c.a4s },
    { factor: 1.9, label: c.a5, sub: c.a5s },
  ];

  function calculate() {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!(a > 0) || !(h > 0) || !(w > 0)) return;
    const bmr = sex === 'm' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    setResult({ bmr, tdee: bmr * activity });
  }

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'm' as Sex, label: c.male },
          { value: 'f' as Sex, label: c.female },
        ]}
        value={sex}
        onChange={s => { setSex(s); setResult(null); }}
      />

      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.section}</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>{c.age}</Label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.height}</Label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.weight}</Label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="mt-4">
          <Label>{c.activity}</Label>
          <div className="flex flex-col gap-2 mt-1">
            {levels.map(l => (
              <button
                key={l.factor}
                type="button"
                onClick={() => setActivity(l.factor)}
                className={`text-left px-4 py-2.5 rounded-xl border transition-colors ${
                  activity === l.factor
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <span className="text-sm font-semibold">{l.label}</span>
                <span className={`block text-xs ${activity === l.factor ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                  {l.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-xs mb-1">{c.tdee}</p>
            <p className="text-white text-4xl font-black">{fmt(result.tdee)}</p>
            <p className="text-blue-200 text-xs mt-1">{c.unit}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <SummaryCard label={c.bmr} value={fmt(result.bmr)} />
            <SummaryCard label={c.lose} value={fmt(result.tdee - 500)} sub={c.slow} variant="green" />
            <SummaryCard label={c.gain} value={fmt(result.tdee + 500)} sub={c.fast} />
          </div>
        </>
      )}
    </div>
  );
}
