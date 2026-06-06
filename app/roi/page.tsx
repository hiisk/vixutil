'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();
const pct = (n: number) => n.toFixed(2) + '%';

export default function RoiPage() {
  const [mode, setMode] = useState<'simple' | 'annualized'>('simple');
  const [buy, setBuy] = useState('');
  const [sell, setSell] = useState('');
  const [fee, setFee] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<null | {
    profit: number; roi: number; cagr?: number; isGain: boolean;
  }>(null);

  function calculate() {
    const b = Number(buy);
    const s = Number(sell);
    const f = Number(fee || 0);
    if (b <= 0 || s <= 0) return;

    const profit = s - b - f;
    const roi = (profit / b) * 100;
    let cagr: number | undefined;

    if (mode === 'annualized') {
      const y = Number(years);
      if (y > 0) cagr = (Math.pow(s / b, 1 / y) - 1) * 100;
    }

    setResult({ profit, roi, cagr, isGain: profit >= 0 });
  }

  return (
    <CalcShell title="투자 수익률 계산기" description="매수·매도 금액 기준 수익률 및 연환산 수익률(CAGR)">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'simple', label: '단순 수익률' },
            { value: 'annualized', label: '연환산 (CAGR)' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'simple' | 'annualized'); setResult(null); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>매수 금액 (원)</Label>
              <input type="number" value={buy} onChange={e => setBuy(e.target.value)}
                placeholder="예: 10,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>매도 금액 (원)</Label>
              <input type="number" value={sell} onChange={e => setSell(e.target.value)}
                placeholder="예: 13,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>수수료·세금 합계 (원, 선택)</Label>
              <input type="number" value={fee} onChange={e => setFee(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
            </div>
            {mode === 'annualized' && (
              <div>
                <Label>보유기간 (년)</Label>
                <input type="number" value={years} onChange={e => setYears(e.target.value)}
                  placeholder="예: 3" className={inputCls} min="0" step="0.5" />
              </div>
            )}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-2xl p-5 ${result.isGain ? 'bg-blue-600' : 'bg-rose-500'}`}>
              <p className="text-white/70 text-xs mb-1">순손익</p>
              <p className="text-white text-3xl font-black">
                {result.isGain ? '+' : ''}{fmt(result.profit)}원
              </p>
              <p className="text-white/70 text-sm mt-1">수익률 {pct(result.roi)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="수익률" value={pct(result.roi)} variant={result.isGain ? 'green' : 'red'} />
              {result.cagr !== undefined && (
                <SummaryCard label="연환산 CAGR" value={pct(result.cagr)} variant={result.isGain ? 'green' : 'red'} />
              )}
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
