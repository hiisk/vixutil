'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const BRACKETS = [
  { limit: 1400, rate: 0.06, deduct: 0 },
  { limit: 5000, rate: 0.15, deduct: 126 },
  { limit: 8800, rate: 0.24, deduct: 576 },
  { limit: 15000, rate: 0.35, deduct: 1544 },
  { limit: 30000, rate: 0.38, deduct: 1994 },
  { limit: 50000, rate: 0.40, deduct: 2594 },
  { limit: 100000, rate: 0.42, deduct: 3594 },
  { limit: Infinity, rate: 0.45, deduct: 6594 },
];

function calcNormalTax(taxableManwon: number) {
  const b = BRACKETS.find(br => taxableManwon <= br.limit)!;
  return Math.max(0, taxableManwon * b.rate - b.deduct) * 10000;
}

function longTermDeductRate(years: number, isOne: boolean) {
  if (years < 3) return 0;
  if (isOne) return Math.min(0.8, (years - 2) * 0.08);
  return Math.min(0.3, (years - 2) * 0.05);
}

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CapitalGainsPage() {
  const [acquire, setAcquire] = useState('');
  const [transfer, setTransfer] = useState('');
  const [years, setYears] = useState('3');
  const [houseType, setHouseType] = useState<'one' | 'multi' | 'non'>('one');
  const [result, setResult] = useState<null | {
    gain: number; ltdRate: number; ltd: number; basic: number;
    taxBase: number; tax: number; local: number; total: number;
  }>(null);

  function calculate() {
    const acq = Number(acquire);
    const tra = Number(transfer);
    if (acq <= 0 || tra <= 0) return;

    const expense = acq * 0.03;
    const gain = tra - acq - expense;
    if (gain <= 0) { setResult(null); return; }

    const y = Number(years);
    const isOne = houseType === 'one';
    const ltdRate = longTermDeductRate(y, isOne);
    const ltd = gain * ltdRate;
    const basic = 2_500_000;
    const taxBase = Math.max(0, gain - ltd - basic);

    let tax = 0;
    if (y < 2 && houseType !== 'non') {
      tax = taxBase * 0.7;
    } else {
      tax = calcNormalTax(taxBase / 10000);
    }

    const local = tax * 0.1;
    setResult({ gain, ltdRate, ltd, basic, taxBase, tax, local, total: tax + local });
  }

  return (
    <CalcShell title="양도소득세 간편 계산기" description="취득가·양도가·보유기간 기준 예상 양도소득세">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>취득가액 (원)</Label>
              <input type="number" value={acquire} onChange={e => setAcquire(e.target.value)}
                placeholder="예: 300,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>양도가액 (원)</Label>
              <input type="number" value={transfer} onChange={e => setTransfer(e.target.value)}
                placeholder="예: 500,000,000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>보유기간</Label>
                <select value={years} onChange={e => setYears(e.target.value)} className={inputCls}>
                  {[1,2,3,4,5,6,7,8,10,12,15].map(n => (
                    <option key={n} value={n}>{n}년</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>구분</Label>
                <select value={houseType} onChange={e => setHouseType(e.target.value as 'one' | 'multi' | 'non')} className={inputCls}>
                  <option value="one">1가구 1주택</option>
                  <option value="multi">다주택</option>
                  <option value="non">비주택 (토지·상가)</option>
                </select>
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">예상 양도소득세 (지방세 포함)</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="양도차익" value={`${fmt(result.gain)}원`} />
              <SummaryCard label="과세표준" value={`${fmt(result.taxBase)}원`} />
              <SummaryCard label="양도소득세" value={`${fmt(result.tax)}원`} variant="red" />
              <SummaryCard label="지방소득세 (10%)" value={`${fmt(result.local)}원`} variant="red" />
            </div>
            <Card>
              <CardHeader title="계산 과정" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '양도차익', value: fmt(result.gain) + '원' },
                  { label: `장기보유특별공제 (${(result.ltdRate * 100).toFixed(0)}%)`, value: `-${fmt(result.ltd)}원` },
                  { label: '기본공제', value: `-${fmt(result.basic)}원` },
                  { label: '과세표준', value: fmt(result.taxBase) + '원', bold: true },
                ].map(row => (
                  <div key={row.label} className={`px-5 py-3 flex justify-between text-sm ${(row as {bold?:boolean}).bold ? 'bg-slate-50 font-bold' : ''}`}>
                    <span className="text-slate-600">{row.label}</span>
                    <span className="font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400">* 필요경비 취득가 3% 적용. 실제 영수증 경비가 있으면 세무사 상담 권장.</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
