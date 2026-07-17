'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, selectCls, PrimaryBtn,
  SummaryCard, SummaryGrid, TableWrap,
} from '@/components/CalcShell';

const w = (n: number) => Math.round(n).toLocaleString();

function calcIncomeTax(taxableIncome: number): number {
  const brackets = [
    { limit: 1400,    rate: 0.06,  deduct: 0 },
    { limit: 5000,    rate: 0.15,  deduct: 126 },
    { limit: 8800,    rate: 0.24,  deduct: 576 },
    { limit: 15000,   rate: 0.35,  deduct: 1544 },
    { limit: 30000,   rate: 0.38,  deduct: 1994 },
    { limit: 50000,   rate: 0.40,  deduct: 2594 },
    { limit: 100000,  rate: 0.42,  deduct: 3594 },
    { limit: Infinity, rate: 0.45, deduct: 6594 },
  ];
  const b = brackets.find(br => taxableIncome <= br.limit)!;
  return Math.max(0, taxableIncome * b.rate - b.deduct);
}

type Industry = 'service' | 'retail' | 'food' | 'mfg' | 'it' | 'custom';

const INDUSTRY_OPTIONS: { value: Industry; label: string; rate: number }[] = [
  { value: 'service', label: '서비스업 (단순경비율 64.1%)', rate: 64.1 },
  { value: 'retail',  label: '도소매 (단순경비율 90.2%)',   rate: 90.2 },
  { value: 'food',    label: '음식점 (단순경비율 78.7%)',    rate: 78.7 },
  { value: 'mfg',     label: '제조업 (단순경비율 83.4%)',    rate: 83.4 },
  { value: 'it',      label: 'IT/전문직 (단순경비율 60.7%)', rate: 60.7 },
  { value: 'custom',  label: '직접입력', rate: 0 },
];

interface Result {
  revenue: number;
  expenseRate: number;
  expenses: number;
  businessIncome: number;
  basicDeduction: number;
  taxBase: number;
  incomeTax: number;
  localTax: number;
  totalTax: number;
  healthInsurance: number;
  effectiveRate: number;
}

export default function BusinessIncomePage() {
  const [revenue, setRevenue] = useState('');
  const [industry, setIndustry] = useState<Industry>('service');
  const [customRate, setCustomRate] = useState('');
  const [dependents, setDependents] = useState('0');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const rev = Number(revenue);
    if (!rev || rev <= 0) return;

    const opt = INDUSTRY_OPTIONS.find(o => o.value === industry)!;
    const expenseRate = industry === 'custom' ? (Number(customRate) || 0) : opt.rate;
    const expenses = rev * (expenseRate / 100);
    const businessIncome = rev - expenses;
    const basicDeduction = 1_500_000 * (1 + Number(dependents));
    const taxBase = Math.max(0, businessIncome - basicDeduction);
    const incomeTax = calcIncomeTax(taxBase / 10000) * 10000;
    const localTax = incomeTax * 0.1;
    const totalTax = incomeTax + localTax;
    const healthInsurance = businessIncome * 0.0709;
    const effectiveRate = rev > 0 ? (totalTax / rev) * 100 : 0;

    setResult({
      revenue: rev, expenseRate, expenses, businessIncome,
      basicDeduction, taxBase, incomeTax, localTax, totalTax,
      healthInsurance, effectiveRate,
    });
  }

  return (
    <CalcShell path="/calculator/business-income" title="사업소득세 계산기" description="개인사업자 연소득 → 예상 사업소득세">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>연 매출 (원)</Label>
              <input
                type="number"
                value={revenue}
                onChange={e => setRevenue(e.target.value)}
                placeholder="예: 50,000,000"
                className={inputCls}
              />
            </div>
            <div>
              <Label>업종 구분</Label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value as Industry)}
                className={selectCls}
              >
                {INDUSTRY_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {industry === 'custom' && (
              <div>
                <Label>경비율 (%)</Label>
                <input
                  type="number"
                  value={customRate}
                  onChange={e => setCustomRate(e.target.value)}
                  placeholder="예: 70"
                  className={inputCls}
                  min="0"
                  max="100"
                />
              </div>
            )}
            <div>
              <Label>부양가족 수 (본인 제외)</Label>
              <select
                value={dependents}
                onChange={e => setDependents(e.target.value)}
                className={selectCls}
              >
                {[0,1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}명{n === 0 ? ' (없음)' : ''}</option>
                ))}
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <SummaryGrid>
              <SummaryCard label="사업소득" value={`${w(result.businessIncome)}원`} />
              <SummaryCard label="과세표준" value={`${w(result.taxBase)}원`} />
              <SummaryCard label="총 세금" value={`${w(result.totalTax)}원`} variant="red" />
              <SummaryCard label="실효세율" value={`${result.effectiveRate.toFixed(1)}%`} variant="primary" sub="매출 대비" />
            </SummaryGrid>

            <Card>
              <CardHeader title="세금 계산 내역" sub="2026년 기준" />
              <div className="divide-y divide-slate-100">
                <TableWrap>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="px-5">
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">연 매출</td>
                        <td className="px-5 py-3 text-right font-semibold text-slate-800 dark:text-slate-100">{w(result.revenue)}원</td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-slate-950">
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">필요경비 ({result.expenseRate.toFixed(1)}%)</td>
                        <td className="px-5 py-3 text-right font-semibold text-blue-600">-{w(result.expenses)}원</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">사업소득</td>
                        <td className="px-5 py-3 text-right font-semibold text-slate-800 dark:text-slate-100">{w(result.businessIncome)}원</td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-slate-950">
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">기본공제 (150만×{1 + Number(dependents)}명)</td>
                        <td className="px-5 py-3 text-right font-semibold text-blue-600">-{w(result.basicDeduction)}원</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 font-bold text-slate-700 dark:text-slate-200">과세표준</td>
                        <td className="px-5 py-3 text-right font-bold text-slate-800 dark:text-slate-100">{w(result.taxBase)}원</td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-slate-950">
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">소득세</td>
                        <td className="px-5 py-3 text-right font-semibold text-red-500">{w(result.incomeTax)}원</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">지방소득세 (×10%)</td>
                        <td className="px-5 py-3 text-right font-semibold text-red-500">{w(result.localTax)}원</td>
                      </tr>
                      <tr className="bg-red-50 dark:bg-red-950/30">
                        <td className="px-5 py-3 font-bold text-slate-800 dark:text-slate-100">총 세금</td>
                        <td className="px-5 py-3 text-right font-black text-red-500">{w(result.totalTax)}원</td>
                      </tr>
                    </tbody>
                  </table>
                </TableWrap>
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  * 건강보험료(지역가입자 추산): 약 {w(result.healthInsurance)}원 (사업소득×7.09%)
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  * 단순경비율 적용 기준 · 실제 세액은 신고 방식에 따라 다를 수 있습니다.
                </p>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
