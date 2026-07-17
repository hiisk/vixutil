'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

interface LoanRow { amount: string; rate: string; years: string; type: '주택' | '기타' }

export default function DsrPage() {
  const [annualIncome, setAnnualIncome] = useState('');
  const [loans, setLoans] = useState<LoanRow[]>([
    { amount: '', rate: '', years: '30', type: '주택' }
  ]);
  const [result, setResult] = useState<null | {
    dsr: number; annualRepay: number;
    loanDetails: { amount: number; monthly: number; annual: number }[];
  }>(null);

  function updateLoan(i: number, field: keyof LoanRow, val: string) {
    setLoans(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  }

  function calculate() {
    const income = Number(annualIncome);
    if (income <= 0) return;

    const loanDetails = loans.map(l => {
      const amount = Number(l.amount);
      const r = Number(l.rate) / 100 / 12;
      const n = Number(l.years) * 12;
      if (amount <= 0 || r <= 0 || n <= 0) return { amount: 0, monthly: 0, annual: 0 };
      const monthly = amount * r / (1 - Math.pow(1 + r, -n));
      return { amount, monthly, annual: monthly * 12 };
    });

    const annualRepay = loanDetails.reduce((s, l) => s + l.annual, 0);
    const dsr = (annualRepay / income) * 100;
    setResult({ dsr, annualRepay, loanDetails });
  }

  return (
    <CalcShell path="/calculator/dsr" title="DSR 계산기" description="총부채원리금상환비율 — 대출 상환 능력 비율">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="mb-4">
            <Label>연 소득 (원)</Label>
            <input type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)}
              placeholder="예: 60,000,000" className={inputCls} min="0" />
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">대출 목록</p>
          {loans.map((l, i) => (
            <div key={i} className="mb-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <Label>대출금액</Label>
                  <input type="number" value={l.amount} onChange={e => updateLoan(i, 'amount', e.target.value)}
                    placeholder="원" className={inputCls} min="0" />
                </div>
                <div>
                  <Label>금리 (%)</Label>
                  <input type="number" value={l.rate} onChange={e => updateLoan(i, 'rate', e.target.value)}
                    placeholder="%" className={inputCls} min="0" step="0.1" />
                </div>
                <div>
                  <Label>기간</Label>
                  <select value={l.years} onChange={e => updateLoan(i, 'years', e.target.value)} className={inputCls}>
                    {[5,10,15,20,25,30,35,40].map(n => <option key={n} value={n}>{n}년</option>)}
                  </select>
                </div>
                <div>
                  <Label>종류</Label>
                  <select value={l.type} onChange={e => updateLoan(i, 'type', e.target.value as '주택' | '기타')} className={inputCls}>
                    <option value="주택">주택담보</option>
                    <option value="기타">기타대출</option>
                  </select>
                </div>
              </div>
              {loans.length > 1 && (
                <button onClick={() => setLoans(prev => prev.filter((_, idx) => idx !== i))}
                  className="text-xs text-red-400 hover:text-red-600">삭제</button>
              )}
            </div>
          ))}
          {loans.length < 5 && (
            <button onClick={() => setLoans(prev => [...prev, { amount: '', rate: '', years: '30', type: '주택' }])}
              className="text-sm text-blue-600 font-semibold hover:underline mb-4 block">
              + 대출 추가
            </button>
          )}
          <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
        </Card>

        {result && (
          <>
            <div className={`rounded-2xl p-5 ${result.dsr <= 40 ? 'bg-blue-600' : result.dsr <= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}>
              <p className="text-white/70 text-xs mb-1">DSR</p>
              <p className="text-white text-3xl font-black">{result.dsr.toFixed(1)}%</p>
              <p className="text-white/70 text-sm mt-1">
                {result.dsr <= 40 ? '✓ 규제 기준(40%) 이하' : result.dsr <= 50 ? '⚠ 40% 초과 — 일반 대출 제한' : '✕ 50% 초과 — 대출 어려움'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="연간 원리금 상환" value={`${fmt(result.annualRepay)}원`} variant="red" />
              <SummaryCard label="월 상환액 합계" value={`${fmt(result.annualRepay / 12)}원`} />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
