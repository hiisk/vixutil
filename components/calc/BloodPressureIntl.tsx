'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { BLOOD_PRESSURE } from '@/lib/calc-l10n/life2';
import type { CalcLang } from '@/lib/calc-l10n/types';

// WHO / ESH 구간. 위 칸이 수축기 상한, 아래 칸이 이완기 상한이다.
const BANDS = [
  { sys: 90, dia: 60, key: 0, tone: 'sky' },
  { sys: 120, dia: 80, key: 1, tone: 'emerald' },
  { sys: 130, dia: 85, key: 2, tone: 'emerald' },
  { sys: 140, dia: 90, key: 3, tone: 'amber' },
  { sys: 160, dia: 100, key: 4, tone: 'orange' },
  { sys: 180, dia: 110, key: 5, tone: 'rose' },
  { sys: Infinity, dia: Infinity, key: 6, tone: 'rose' },
];

const TONES: Record<string, string> = {
  sky: 'bg-sky-500', emerald: 'bg-emerald-600', amber: 'bg-amber-500',
  orange: 'bg-orange-500', rose: 'bg-rose-600',
};

export default function BloodPressureIntl({ lang }: { lang: CalcLang }) {
  const c = BLOOD_PRESSURE[lang].ui;
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [result, setResult] = useState<{ key: number; tone: string; sys: number; dia: number } | null>(null);

  function calculate() {
    const s = parseFloat(systolic);
    const d = parseFloat(diastolic);
    if (!(s > 0) || !(d > 0)) return;
    // 저혈압은 둘 다 낮아야 한다. 그 밖에는 두 값 중 높은 쪽 구간을 따른다.
    if (s < 90 && d < 60) { setResult({ key: 0, tone: 'sky', sys: s, dia: d }); return; }
    const band = BANDS.slice(1).find(b => s < b.sys && d < b.dia) ?? BANDS[BANDS.length - 1];
    setResult({ key: band.key, tone: band.tone, sys: s, dia: d });
  }

  const labels = [c.c0, c.c1, c.c2, c.c3, c.c4, c.c5, c.c6];
  const details = [c.d0, c.d1, c.d2, c.d3, c.d4, c.d5, c.d6];

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <Label>{c.systolic}</Label>
            <input type="number" value={systolic} onChange={e => setSystolic(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.diastolic}</Label>
            <input type="number" value={diastolic} onChange={e => setDiastolic(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <div className={`rounded-lg p-6 text-center ${TONES[result.tone]}`}>
          <p className="text-white/70 text-xs mb-1">{c.result}</p>
          <p className="text-white text-3xl font-black">{labels[result.key]}</p>
          <p className="text-white/80 text-sm mt-1">{result.sys} / {result.dia} {c.unit}</p>
          <p className="text-white/80 text-sm mt-3 leading-relaxed">{details[result.key]}</p>
        </div>
      )}
    </div>
  );
}
