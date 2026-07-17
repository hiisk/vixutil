'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const FREQ_MAP: Record<string, { label: string; times: number }> = {
  monthly: { label: '월배당', times: 12 },
  quarterly: { label: '분기배당', times: 4 },
  semi: { label: '반기배당', times: 2 },
  annual: { label: '연배당', times: 1 },
};

export default function DividendPage() {
  const [invest, setInvest] = useState('');
  const [rate, setRate] = useState('');
  const [freq, setFreq] = useState('quarterly');
  const [taxed, setTaxed] = useState(true);
  const [targetMonthly, setTargetMonthly] = useState('');
  const [result, setResult] = useState<null | {
    annual: number; annualAfterTax: number; perPayment: number; perPaymentAfterTax: number;
  }>(null);
  const [needInvest, setNeedInvest] = useState<number | null>(null);

  function calculate() {
    const inv = Number(invest);
    const r = Number(rate) / 100;
    if (inv <= 0 || r <= 0) return;
    const annual = inv * r;
    const annualAfterTax = taxed ? annual * 0.846 : annual;
    const times = FREQ_MAP[freq].times;
    setResult({
      annual, annualAfterTax,
      perPayment: annual / times,
      perPaymentAfterTax: annualAfterTax / times,
    });
    const tm = Number(targetMonthly);
    if (tm > 0) {
      const annualNeed = tm * 12;
      const grossNeed = taxed ? annualNeed / 0.846 : annualNeed;
      setNeedInvest(grossNeed / r);
    } else {
      setNeedInvest(null);
    }
  }

  return (
    <CalcShell path="/calculator/dividend" title="배당금 계산기" description="배당수익률 기준 예상 배당금 및 필요 투자금 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>투자금액 (원)</Label>
              <input type="number" value={invest} onChange={e => setInvest(e.target.value)}
                placeholder="예: 100,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>배당수익률 (%)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 4.0" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>배당 주기</Label>
              <select value={freq} onChange={e => setFreq(e.target.value)} className={inputCls}>
                {Object.entries(FREQ_MAP).map(([k, v]) => (
                  <option key={k} value={k}>{v.label} (연 {v.times}회)</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={taxed} onChange={e => setTaxed(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">배당소득세 15.4% 차감</span>
            </label>
            <div>
              <Label>목표 월 배당금 (역산용, 선택)</Label>
              <input type="number" value={targetMonthly} onChange={e => setTargetMonthly(e.target.value)}
                placeholder="예: 500,000" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">연간 배당금 (세후)</p>
              <p className="text-white text-3xl font-black">{fmt(result.annualAfterTax)}원</p>
              <p className="text-blue-200 text-sm mt-1">{FREQ_MAP[freq].label} 1회 {fmt(result.perPaymentAfterTax)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="연간 배당금 (세전)" value={`${fmt(result.annual)}원`} />
              <SummaryCard label="배당소득세" value={taxed ? `-${fmt(result.annual - result.annualAfterTax)}원` : '미적용'} variant="red" />
            </div>
            {needInvest && (
              <Card className="p-4">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">목표 월 배당 달성을 위한 필요 투자금</p>
                <p className="text-2xl font-black text-blue-600">{fmt(needInvest)}원</p>
              </Card>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
