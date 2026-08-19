'use client';
import { useState } from 'react';
import { Card, Label, inputCls, TabBar } from '@/components/CalcShell';
import { PERCENT } from '@/lib/calc-l10n/percent';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'ratio' | 'part' | 'change';

export default function PercentIntl({ lang }: { lang: CalcLang }) {
  const c = PERCENT[lang].ui;
  const [mode, setMode] = useState<Mode>('ratio');
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: { value: number; suffix: string; up?: boolean } | null = ((): { value: number; suffix: string; up?: boolean } | null => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return null;
    if (mode === 'ratio') {
      if (y === 0) return null;
      return ({ value: (x / y) * 100, suffix: '%' });
    } else if (mode === 'part') {
      return ({ value: (y * x) / 100, suffix: '' });
    } else {
      if (x === 0) return null;
      const change = ((y - x) / x) * 100;
      return ({ value: Math.abs(change), suffix: '%', up: change >= 0 });
    }
  
    return null;
  })();
  const fmt = (n: number) => n.toLocaleString(localeTag(lang), { maximumFractionDigits: 4 });



  function switchMode(m: Mode) {
    setMode(m);
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{labels[mode][0]}</Label>
            <input type="number" value={a} onChange={e => setA(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{labels[mode][1]}</Label>
            <input type="number" value={b} onChange={e => setB(e.target.value)} className={inputCls} />
          </div>
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
