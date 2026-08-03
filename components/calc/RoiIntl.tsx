'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { ROI } from '@/lib/calc-l10n/roi';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'simple' | 'annual';

export default function RoiIntl({ lang }: { lang: CalcLang }) {
  const c = ROI[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('simple');
  const [buy, setBuy] = useState('');
  const [sell, setSell] = useState('');
  const [cost, setCost] = useState('');
  const [years, setYears] = useState('3');
  const [result, setResult] = useState<{ profit: number; roi: number; cagr?: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });
  const pct = (n: number) => `${n.toLocaleString(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;

  function calculate() {
    const b = parseFloat(buy);
    const s = parseFloat(sell);
    const f = parseFloat(cost) || 0;
    if (!isFinite(b) || b <= 0 || !isFinite(s)) return;

    const profit = s - b - f;
    const roi = (profit / b) * 100;
    let cagr: number | undefined;
    if (mode === 'annual') {
      const y = parseFloat(years);
      // 손실이 원금을 넘어 평가액이 음수면 제곱근이 정의되지 않는다 — 그때는 연환산을 내지 않는다.
      if (isFinite(y) && y > 0 && s > 0) cagr = (Math.pow(s / b, 1 / y) - 1) * 100;
    }
    setResult({ profit, roi, cagr });
  }

  const gain = result ? result.profit >= 0 : false;

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'simple' as Mode, label: c.tabSimple },
          { value: 'annual' as Mode, label: c.tabAnnual },
        ]}
        value={mode}
        onChange={m => { setMode(m); setResult(null); }}
      />

      <Card className="p-5">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.buy}</Label>
              <input type="number" value={buy} onChange={e => setBuy(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.sell}</Label>
              <input type="number" value={sell} onChange={e => setSell(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.cost}</Label>
              <input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="0" className={inputCls} />
            </div>
            {mode === 'annual' && (
              <div>
                <Label>{c.years}</Label>
                <input type="number" step="0.5" value={years} onChange={e => setYears(e.target.value)} className={inputCls} />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <div className={`rounded-2xl p-5 ${gain ? 'bg-blue-600' : 'bg-rose-500'}`}>
            <p className="text-white/70 text-xs mb-1">{c.profit}</p>
            <p className="text-white text-3xl font-black">{gain ? '+' : ''}{fmt(result.profit)}</p>
            <p className="text-white/70 text-sm mt-1">{c.roi} {pct(result.roi)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard label={c.roi} value={pct(result.roi)} variant={gain ? 'green' : 'red'} />
            {result.cagr !== undefined && (
              <SummaryCard label={c.cagr} value={pct(result.cagr)} variant={result.cagr >= 0 ? 'green' : 'red'} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
