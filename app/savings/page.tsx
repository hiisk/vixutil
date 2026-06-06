'use client';
import { useState, useEffect } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function SavingsPage() {
  const [monthly, setMonthly] = useState(500_000);
  const [rate, setRate] = useState('4');
  const [months, setMonths] = useState('24');
  const [result, setResult] = useState<null | {
    principal: number; interest: number; tax: number; total: number;
  }>(null);

  function calculate() {
    const m = monthly;
    const r = Number(rate) / 100 / 12;
    const n = Number(months);
    if (m <= 0 || Number(rate) <= 0 || n <= 0) return;

    const principal = m * n;
    // 적금 단리 이자 계산: 각 회차별 납입액에 잔여기간 이자 합산
    const interest = m * n * (n + 1) / 2 * (Number(rate) / 100 / 12);
    const tax = interest * 0.154;
    setResult({ principal, interest, tax, total: principal + interest - tax });
  }

  useEffect(() => { calculate(); }, []);

  return (
    <CalcShell title="적금 계산기" description="월 납입금·금리·기간 기준 만기금액 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>월 납입금액 (원)</Label>
              <CommaInput value={monthly} onChange={setMonthly} placeholder="예: 500,000" />
            </div>
            <div>
              <Label>연 이자율 (%)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 4.0" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>납입기간</Label>
              <select value={months} onChange={e => setMonths(e.target.value)} className={inputCls}>
                {[6, 12, 18, 24, 36, 48, 60].map(n => (
                  <option key={n} value={n}>{n}개월 ({n / 12 >= 1 ? `${n / 12}년` : `${n}개월`})</option>
                ))}
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">만기 수령액 (세후)</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="납입 원금" value={`${fmt(result.principal)}원`} />
              <SummaryCard label="세전 이자" value={`${fmt(result.interest)}원`} variant="green" />
              <SummaryCard label="이자소득세 (15.4%)" value={`-${fmt(result.tax)}원`} variant="red" />
              <SummaryCard label="세후 이자" value={`${fmt(result.interest - result.tax)}원`} variant="green" />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
