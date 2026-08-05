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
    <CalcShell
      path="/calculator/business-income"
      title="사업소득세 계산기"
      description="개인사업자 연소득 → 예상 사업소득세"
      intro={
        <>
          <h2>매출이 아니라 소득에 세금이 붙습니다</h2>
          <p>
            사업소득세는 <strong>매출 − 필요경비</strong>에 매깁니다. 경비를 얼마로 인정받느냐가 세금을
            좌우하는데, 장부를 쓰지 않으면 국세청이 정한 <strong>경비율</strong>로 추정해서 계산합니다.
          </p>
          <h2>업종마다 경비율이 다릅니다</h2>
          <p>
            같은 매출이어도 업종에 따라 세금이 크게 갈립니다. 단순경비율이{' '}
            <strong>도소매 90.2%</strong>, <strong>제조업 83.4%</strong>, <strong>음식점 78.7%</strong>,{' '}
            <strong>서비스업 64.1%</strong>, <strong>IT·전문직 60.7%</strong> 순으로 다르기 때문입니다.
            도소매는 물건을 떼오는 원가가 크다고 보는 것이고, 전문직은 원가가 적다고 보는 것입니다.
          </p>
          <h2>단순경비율은 아무나 못 씁니다</h2>
          <p>
            매출이 일정 규모를 넘으면 <strong>기준경비율</strong> 대상이 되고, 더 커지면 장부 작성이
            의무입니다. 기준경비율은 인정 폭이 훨씬 좁아서 세금이 확 늘어납니다. 또{' '}
            <strong>실제 경비가 경비율보다 많다면 장부를 쓰는 편이 유리</strong>합니다. 장부를 쓰면
            적자가 났을 때 그걸 인정받을 수도 있습니다.
          </p>
          <h2>이게 전부가 아닙니다</h2>
          <p>
            세율은 <strong>6%에서 45%</strong>까지 8단계 누진이고, 산출세액에{' '}
            <strong>지방소득세 10%</strong>가 더 붙습니다. 실제 신고에서는 인적공제·연금보험료공제·
            노란우산공제 등이 반영되고, 사업소득 외에 다른 소득이 있으면 합산해서 세율이 올라갑니다.
            이 계산기는 <strong>추정치</strong>이며 정확한 세액은 신고할 때 확정됩니다.
          </p>
        </>
      }
    >
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
