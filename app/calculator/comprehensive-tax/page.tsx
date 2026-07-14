'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';

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

function earningDeduction(a: number) {
  if (a <= 500) return a * 0.7;
  if (a <= 1500) return 350 + (a - 500) * 0.4;
  if (a <= 4500) return 750 + (a - 1500) * 0.15;
  if (a <= 10000) return 1200 + (a - 4500) * 0.05;
  return Math.min(2000, 1475 + (a - 10000) * 0.02);
}

function calcTax(taxable: number) {
  const b = BRACKETS.find(br => taxable <= br.limit)!;
  return Math.max(0, taxable * b.rate - b.deduct) * 10000;
}

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function ComprehensiveTaxPage() {
  const [type, setType] = useState<'work' | 'business'>('work');
  const [income, setIncome] = useState('');
  const [dependents, setDependents] = useState('1');
  const [expenseRate, setExpenseRate] = useState('30');
  const [extra, setExtra] = useState('');
  const [result, setResult] = useState<null | {
    grossDeduction: number; personalDeduction: number; extraDeduction: number;
    taxable: number; incomeTax: number; localTax: number; total: number;
    rate: number;
  }>(null);

  function calculate() {
    const v = Number(income);
    if (v <= 0) return;
    const a = v / 10000;

    let grossDeduction = 0;
    if (type === 'work') {
      grossDeduction = earningDeduction(a) * 10000;
    } else {
      grossDeduction = v * Number(expenseRate) / 100;
    }

    const personalDeduction = Number(dependents) * 150 * 10000;
    const extraDeduction = Number(extra || 0);
    const taxableWon = Math.max(0, v - grossDeduction - personalDeduction - extraDeduction);
    const taxable = taxableWon / 10000;
    const incomeTax = calcTax(taxable);
    const localTax = incomeTax * 0.1;

    setResult({
      grossDeduction, personalDeduction, extraDeduction,
      taxable: taxableWon, incomeTax, localTax,
      total: incomeTax + localTax,
      rate: v > 0 ? (incomeTax + localTax) / v * 100 : 0,
    });
  }

  return (
    <CalcShell title="종합소득세 계산기" description="2024년 세율 기준 예상 종합소득세 계산">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'work', label: '근로소득' },
            { value: 'business', label: '사업소득' },
          ]}
          value={type}
          onChange={v => { setType(v as 'work' | 'business'); setResult(null); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>연간 총 소득 (원)</Label>
              <input type="number" value={income} onChange={e => setIncome(e.target.value)}
                placeholder="예: 50,000,000" className={inputCls} min="0" />
            </div>
            {type === 'business' && (
              <div>
                <Label>필요경비율 (%)</Label>
                <select value={expenseRate} onChange={e => setExpenseRate(e.target.value)} className={inputCls}>
                  <option value="20">20%</option>
                  <option value="30">30% (기본)</option>
                  <option value="40">40%</option>
                  <option value="50">50%</option>
                  <option value="60">60%</option>
                </select>
              </div>
            )}
            <div>
              <Label>인적공제 인원 (본인 포함)</Label>
              <select value={dependents} onChange={e => setDependents(e.target.value)} className={inputCls}>
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}명 {n === 1 ? '(본인만)' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>추가공제 합계 (의료비·교육비·기부금 등, 원)</Label>
              <input type="number" value={extra} onChange={e => setExtra(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">납부 예상 세금 합계</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
              <p className="text-blue-200 text-sm mt-1">실효세율 {result.rate.toFixed(1)}%</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="소득세" value={`${fmt(result.incomeTax)}원`} variant="red" />
              <SummaryCard label="지방소득세 (10%)" value={`${fmt(result.localTax)}원`} variant="red" />
            </div>
            <Card>
              <CardHeader title="공제 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: type === 'work' ? '근로소득공제' : '필요경비', value: result.grossDeduction },
                  { label: `인적공제 (${dependents}명)`, value: result.personalDeduction },
                  ...(result.extraDeduction > 0 ? [{ label: '추가공제', value: result.extraDeduction }] : []),
                ].map(row => (
                  <div key={row.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{row.label}</span>
                    <span className="font-semibold text-emerald-600">-{fmt(row.value)}원</span>
                  </div>
                ))}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 flex justify-between font-bold text-sm">
                  <span>과세표준</span>
                  <span>{fmt(result.taxable)}원</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">* 간이 계산 결과입니다. 세액공제(근로·자녀·연금 등) 미적용. 정확한 세액은 세무사 상담을 권장합니다.</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
