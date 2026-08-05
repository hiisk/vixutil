'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { calcInterestTax, calcDepositAfterTax } from '@/lib/interest-tax';

const w = (n: number) => Math.round(n).toLocaleString();

type Mode = 'interest' | 'deposit';

export default function InterestTaxPage() {
  const [mode, setMode] = useState<Mode>('interest');
  const [interest, setInterest] = useState(1_000_000);
  const [principal, setPrincipal] = useState(10_000_000);
  const [rate, setRate] = useState('4.0');
  const [months, setMonths] = useState('12');
  const [result, setResult] = useState<ReturnType<typeof calcInterestTax> | null>(null);

  function calculate() {
    if (mode === 'interest') {
      if (interest <= 0) return;
      setResult(calcInterestTax(interest));
    } else {
      if (principal <= 0) return;
      setResult(calcDepositAfterTax({ principal, annualRate: Number(rate) || 0, months: Number(months) || 0 }));
    }
  }

  return (
    <CalcShell
      path="/calculator/interest-tax"
      title="이자소득세 계산기"
      description="예금·적금 이자에서 떼는 15.4% 세금과 세후 실수령액을 계산합니다"
      intro={
        <>
          <h2>통장에 찍히는 건 세금을 뗀 뒤입니다</h2>
          <p>
            예금·적금 이자에는 <strong>소득세 14% + 지방소득세 1.4% = 15.4%</strong>가 원천징수됩니다.
            은행이 이자를 줄 때 알아서 떼고 나머지만 입금하므로, 세전 이자 100만원이면 실제로는{' '}
            <strong>84만 6천원</strong>이 들어옵니다.
          </p>
          <h2>세전 이자만 있어도, 예금 조건만 있어도 됩니다</h2>
          <p>
            받을(받은) 이자 금액을 알면 그대로 넣고, 아직 이자를 모르면 <strong>원금·금리·기간</strong>을
            넣어 세전 이자부터 계산할 수 있습니다. 예금은 단리 기준입니다.
          </p>
          <h2>연 2,000만원을 넘으면 달라집니다</h2>
          <p>
            이자·배당을 합한 금융소득이 연 <strong>2,000만원을 넘으면</strong> 초과분이 다른 소득과
            합산돼 종합과세됩니다. 세율이 더 높아질 수 있어, 이 경우 15.4% 단순 계산과 달라진다는
            점을 결과에서 알려드립니다. 비과세·세금우대 상품(ISA, 비과세종합저축 등)은 세율이
            다르므로 이 계산에 해당하지 않습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { v: 'interest' as const, label: '이자 금액으로' },
              { v: 'deposit' as const, label: '예금 조건으로' },
            ].map(o => (
              <button
                key={o.v}
                onClick={() => { setMode(o.v); setResult(null); }}
                className={`rounded-xl border p-3 text-sm font-bold transition-all ${
                  mode === o.v
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          {mode === 'interest' ? (
            <div>
              <Label>세전 이자 (원)</Label>
              <CommaInput value={interest} onChange={setInterest} placeholder="예: 1,000,000" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div>
                <Label>예치 원금 (원)</Label>
                <CommaInput value={principal} onChange={setPrincipal} placeholder="예: 10,000,000" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>연이율 (%)</Label>
                  <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1" min="0" className={inputCls} />
                </div>
                <div>
                  <Label>기간 (개월)</Label>
                  <input type="number" value={months} onChange={e => setMonths(e.target.value)} min="0" className={inputCls} />
                </div>
              </div>
            </div>
          )}
        </Card>

        <PrimaryBtn onClick={calculate}>세금·실수령 계산</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                세후 실수령 이자
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {w(result.netInterest)}<span className="text-lg font-bold ml-1">원</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                세전 {w(result.grossInterest)}원 · 세금 {w(result.totalTax)}원 (15.4%)
              </p>
            </Card>

            {result.overThreshold && (
              <Card className="p-4 border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/20">
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  ⚠️ 금융소득이 연 2,000만원을 넘으면 초과분이 종합과세됩니다. 위 금액은 15.4%
                  원천징수 기준일 뿐, 실제 세부담은 다른 소득에 따라 더 커질 수 있습니다.
                </p>
              </Card>
            )}

            <Card className="p-5">
              <CardHeader title="세금 내역" />
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">세전 이자</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.grossInterest)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">소득세 (14%)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">−{w(result.incomeTax)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">지방소득세 (1.4%)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">−{w(result.localTax)}원</span>
                </div>
              </div>

              <SummaryGrid>
                <SummaryCard label="세전 이자" value={`${w(result.grossInterest)}원`} />
                <SummaryCard label="세금 (15.4%)" value={`${w(result.totalTax)}원`} variant="red" />
                <SummaryCard label="실수령" value={`${w(result.netInterest)}원`} variant="primary" />
              </SummaryGrid>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
