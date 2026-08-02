'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { BMI } from '@/lib/calc-l10n/bmi';
import type { CalcLang } from '@/lib/calc-l10n/types';

/**
 * BMI — 다국어판.
 *
 * 구간이 한국어판과 다르다. 여기는 WHO 국제 기준(18.5·25·30·35·40)이고,
 * 한국어판은 대한비만학회 기준(18.5·23·25·30·35)이다. 같은 화면처럼 보이지만
 * 나누는 자리가 달라서, 한쪽 숫자를 다른 쪽에 옮겨 쓰면 판정이 뒤집힌다.
 * 자세한 사정은 lib/calc-l10n/bmi.ts 주석에 적었다.
 */
const BANDS: { max: number; band: string; sub: string; color: string; bg: string; bar: string }[] = [
  { max: 18.5, band: 'b0', sub: 's0', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50', bar: 'bg-blue-500' },
  { max: 25, band: 'b1', sub: 's1', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50', bar: 'bg-emerald-500' },
  { max: 30, band: 'b2', sub: 's2', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50', bar: 'bg-amber-400' },
  { max: 35, band: 'b3', sub: 's3', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/50', bar: 'bg-orange-500' },
  { max: 40, band: 'b4', sub: 's4', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50', bar: 'bg-red-500' },
  { max: Infinity, band: 'b5', sub: 's5', color: 'text-red-800 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-950/40 border-red-300', bar: 'bg-red-700' },
];

const SCALE = { min: 14, max: 42 };

export default function BmiIntl({ lang }: { lang: CalcLang }) {
  const c = BMI[lang].ui;
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; band: typeof BANDS[0]; idealMin: number; idealMax: number } | null>(null);

  function calculate() {
    const h = Number(height) / 100;
    const w = Number(weight);
    if (!h || !w) return;
    const bmi = w / (h * h);
    setResult({
      bmi,
      band: BANDS.find(b => bmi < b.max) ?? BANDS[BANDS.length - 1],
      idealMin: 18.5 * h * h,
      idealMax: 24.9 * h * h,
    });
  }

  const pct = result ? Math.min(100, Math.max(0, (result.bmi - SCALE.min) / (SCALE.max - SCALE.min) * 100)) : 0;

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.body}</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{c.height}</Label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className={inputCls} />
          </div>
          <div>
            <Label>{c.weight}</Label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inputCls} />
          </div>
        </div>
        <div className="mt-4">
          <PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn>
        </div>
      </Card>

      {result && (
        <>
          <div className={`rounded-2xl border px-5 py-5 ${result.band.bg}`}>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{c.bmiLabel}</p>
            <p className={`text-4xl font-black ${result.band.color}`}>{result.bmi.toFixed(1)}</p>
            <p className={`text-base font-bold mt-1 ${result.band.color}`}>{c[result.band.band]}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c[result.band.sub]}</p>

            <div className="mt-4 h-2 w-full bg-white/70 dark:bg-slate-900/70 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${result.band.bar}`} style={{ width: `${pct}%` }} />
            </div>
          </div>

          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">{c.range}</p>
            <p className="text-lg font-black text-slate-900 dark:text-slate-100">
              {result.idealMin.toFixed(1)} – {result.idealMax.toFixed(1)} kg
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.table}</p>
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {BANDS.map((b, i) => {
                const lo = i === 0 ? null : BANDS[i - 1].max;
                const hi = b.max === Infinity ? null : b.max;
                return (
                  <div key={b.band} className={`flex justify-between items-center py-2.5 text-sm ${b === result.band ? 'font-bold' : ''}`}>
                    <span className={b === result.band ? b.color : 'text-slate-500 dark:text-slate-400'}>{c[b.band]}</span>
                    <span className="font-mono text-slate-700 dark:text-slate-200">
                      {lo === null ? `< ${hi}` : hi === null ? `≥ ${lo}` : `${lo} – ${hi}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
