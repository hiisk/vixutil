'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, RatioBar } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CarInstallmentPage() {
  const [price, setPrice] = useState(35_000_000);
  const [down, setDown] = useState(0);
  const [months, setMonths] = useState('60');
  const [rate, setRate] = useState('5');

  const [result, setResult] = useState<{
    loan: number;
    monthly: number;
    totalPay: number;
    totalInterest: number;
  } | null>(null);

  function calculate() {
    const p = price;
    const d = down;
    const n = Number(months);
    const r = Number(rate) / 100 / 12;
    if (p <= 0 || Number(rate) <= 0) return;

    const loan = p - d;
    const monthly = r === 0 ? loan / n : loan * r / (1 - Math.pow(1 + r, -n));
    const totalPay = monthly * n + d;
    const totalInterest = monthly * n - loan;
    setResult({ loan, monthly, totalPay, totalInterest });
  }

  return (
    <CalcShell title="자동차 할부 계산기" description="차량 가격·금리·기간 기준 월 할부금 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>차량 가격 (원)</Label>
              <CommaInput value={price} onChange={setPrice} placeholder="예: 35,000,000" />
            </div>
            <div>
              <Label>선수금 / 계약금 (원)</Label>
              <CommaInput value={down} onChange={setDown} placeholder="예: 5,000,000" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>할부 기간</Label>
                <select value={months} onChange={e => setMonths(e.target.value)} className={inputCls}>
                  {[12, 24, 36, 48, 60, 72, 84].map(n => (
                    <option key={n} value={n}>{n}개월 ({n / 12}년)</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>연 이자율 (%)</Label>
                <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                  placeholder="예: 5.9" className={inputCls} min="0" step="0.1" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">월 할부금</p>
              <p className="text-white text-3xl font-black">{fmt(result.monthly)}원</p>
              <p className="text-blue-200 text-sm mt-1">총 {months}개월 납부</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="대출 원금" value={`${fmt(result.loan)}원`} />
              <SummaryCard label="총 이자" value={`${fmt(result.totalInterest)}원`} variant="red" />
              <SummaryCard label="총 납부액 (선수금 포함)" value={`${fmt(result.totalPay)}원`} />
            </div>
            <Card className="p-4">
              <RatioBar a={result.loan} b={result.totalInterest} labelA="원금" labelB="이자" />
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
