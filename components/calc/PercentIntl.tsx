'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';
import { PERCENT } from '@/lib/calc-l10n/percent';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'ratio' | 'part' | 'change';

export default function PercentIntl({ lang }: { lang: CalcLang }) {
  const c = PERCENT[lang].ui;
  const [mode, setMode] = useState<Mode>('ratio');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<{ value: number; suffix: string; up?: boolean } | null>(null);

  const fmt = (n: number) => n.toLocaleString(localeTag(lang), { maximumFractionDigits: 4 });

  function calculate() {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;
    if (mode === 'ratio') {
      if (y === 0) return;
      setResult({ value: (x / y) * 100, suffix: '%' });
    } else if (mode === 'part') {
      setResult({ value: (y * x) / 100, suffix: '' });
    } else {
      if (x === 0) return;
      const change = ((y - x) / x) * 100;
      setResult({ value: Math.abs(change), suffix: '%', up: change >= 0 });
    }
  }

  function switchMode(m: Mode) {
    setMode(m);
    setResult(null);
    setA('');
    setB('');
  }

  const labels: Record<Mode, [string, string]> = {
    ratio: [c.valueX, c.valueY],
    part: [c.percent, c.valueY],
    change: [c.from, c.to],
  };

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'ratio' as Mode, label: c.tabRatio },
          { value: 'part' as Mode, label: c.tabPart },
          { value: 'change' as Mode, label: c.tabChange },
        ]}
        value={mode}
        onChange={switchMode}
      />

      <Card className="p-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <Label>{labels[mode][0]}</Label>
            <input type="number" value={a} onChange={e => setA(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{labels[mode][1]}</Label>
            <input type="number" value={b} onChange={e => setB(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4">
          <PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn>
        </div>
      </Card>

      {result && (
        <Card className="p-5 text-center">
          <p className="label-caps mb-2">{c.result}</p>
          <p className={`text-4xl font-black ${result.up === undefined ? 'text-blue-600' : result.up ? 'text-rose-600' : 'text-sky-600'}`}>
            {fmt(result.value)}{result.suffix}
          </p>
          {result.up !== undefined && (
            <p className={`text-sm font-bold mt-1 ${result.up ? 'text-rose-500' : 'text-sky-500'}`}>
              {result.up ? c.up : c.down}
            </p>
          )}
        </Card>
      )}
    </div>
  );
}
