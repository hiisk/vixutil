'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { PROTEIN } from '@/lib/calc-l10n/health2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

const LEVELS = [
  { id: 'sedentary', min: 0.8, max: 1.0 },
  { id: 'light', min: 1.2, max: 1.6 },
  { id: 'regular', min: 1.4, max: 1.8 },
  { id: 'muscle', min: 1.6, max: 2.2 },
] as const;

export default function ProteinIntl({ lang }: { lang: CalcLang }) {
  const c = PROTEIN[lang].ui;
  const tag = localeTag(lang);
  const [weight, setWeight] = useState('');
  const [level, setLevel] = useState<string>('regular');
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);

  const fmt = (n: number) => Math.round(n).toLocaleString(tag);
  const labels: Record<string, [string, string]> = {
    sedentary: [c.l1, c.l1s], light: [c.l2, c.l2s], regular: [c.l3, c.l3s], muscle: [c.l4, c.l4s],
  };

  function calculate() {
    const w = parseFloat(weight);
    const l = LEVELS.find(x => x.id === level)!;
    if (!(w > 0)) return;
    setResult({ min: w * l.min, max: w * l.max });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div>
          <Label>{c.weight}</Label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputCls} />
        </div>
        <div className="mt-4">
          <Label>{c.level}</Label>
          <div className="flex flex-col gap-2 mt-1">
            {LEVELS.map(l => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLevel(l.id)}
                className={`text-left px-4 py-2.5 rounded-xl border transition-colors ${
                  level === l.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <span className="text-sm font-semibold">{labels[l.id][0]}</span>
                <span className={`block text-xs ${level === l.id ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                  {labels[l.id][1]}
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
            <p className="text-blue-200 text-xs mb-1">{c.perDay}</p>
            <p className="text-white text-4xl font-black">{fmt(result.min)}–{fmt(result.max)} {c.unit}</p>
          </div>
          <SummaryCard
            label={c.perMeal}
            value={`${fmt(result.min / 3)}–${fmt(result.max / 3)} ${c.unit}`}
            variant="green"
          />
        </>
      )}
    </div>
  );
}
