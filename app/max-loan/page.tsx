'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function MaxLoanPage() {
  const [annualIncome, setAnnualIncome] = useState('');
  const [rate, setRate] = useState('');
  const [loanYears, setLoanYears] = useState('30');
  const [existing, setExisting] = useState('');
  const [dti, setDti] = useState('40');
  const [result, setResult] = useState<null | {
    maxLoan: number; monthlyPayment: number; totalInterest: number; allowableMonthly: number;
  }>(null);

  function calculate() {
    const income = Number(annualIncome);
    const r = Number(rate) / 100 / 12;
    const n = Number(loanYears) * 12;
    const existingMonthly = Number(existing || 0);
    if (income <= 0 || Number(rate) <= 0) return;

    const monthlyIncome = income / 12;
    const allowableMonthly = monthlyIncome * Number(dti) / 100 - existingMonthly;
    if (allowableMonthly <= 0) { setResult(null); return; }

    const maxLoan = allowableMonthly * (1 - Math.pow(1 + r, -n)) / r;
    const totalPayment = allowableMonthly * n;
    const totalInterest = totalPayment - maxLoan;

    setResult({ maxLoan, monthlyPayment: allowableMonthly, totalInterest, allowableMonthly });
  }

  return (
    <CalcShell title="대출 가능 금액 계산기" description="소득 기준 DTI 대출 가능 최대 금액">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>연 소득 (원)</Label>
              <input type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)}
                placeholder="예: 60,000,000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>대출 금리 (%)</Label>
                <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                  placeholder="예: 4.5" className={inputCls} min="0" step="0.1" />
              </div>
              <div>
                <Label>대출 기간</Label>
                <select value={loanYears} onChange={e => setLoanYears(e.target.value)} className={inputCls}>
                  {[10, 15, 20, 25, 30, 35, 40].map(n => (
                    <option key={n} value={n}>{n}년</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label>기존 대출 월 상환액 (원)</Label>
              <input type="number" value={existing} onChange={e => setExisting(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
            </div>
            <div>
              <Label>DTI 기준 (%)</Label>
              <select value={dti} onChange={e => setDti(e.target.value)} className={inputCls}>
                <option value="40">40% (일반 기준)</option>
                <option value="50">50%</option>
                <option value="60">60%</option>
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">최대 대출 가능 금액</p>
              <p className="text-white text-3xl font-black">{fmt(result.maxLoan)}원</p>
              <p className="text-blue-200 text-sm mt-1">월 상환액 {fmt(result.monthlyPayment)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="월 허용 상환액" value={`${fmt(result.allowableMonthly)}원`} />
              <SummaryCard label="총 이자" value={`${fmt(result.totalInterest)}원`} variant="red" />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
