'use client';
import { useState } from 'react';
import CalcShell, {
  Card, Label, PrimaryBtn, SummaryGrid, SummaryCard, TabBar, TableWrap, RatioBar,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { CALC_FAQ } from '@/lib/calc-faq';

const fmt = (n: number) => Math.round(n).toLocaleString();

const BRACKETS = [
  { limit: 1400,     rate: 0.06,  deduct: 0 },
  { limit: 5000,     rate: 0.15,  deduct: 126 },
  { limit: 8800,     rate: 0.24,  deduct: 576 },
  { limit: 15000,    rate: 0.35,  deduct: 1544 },
  { limit: 30000,    rate: 0.38,  deduct: 1994 },
  { limit: 50000,    rate: 0.40,  deduct: 2594 },
  { limit: 100000,   rate: 0.42,  deduct: 3594 },
  { limit: Infinity, rate: 0.45,  deduct: 6594 },
];

function earningDeduction(a: number): number {
  if (a <= 500) return a * 0.7;
  if (a <= 1500) return 350 + (a - 500) * 0.4;
  if (a <= 4500) return 750 + (a - 1500) * 0.15;
  if (a <= 10000) return 1200 + (a - 4500) * 0.05;
  return Math.min(2000, 1475 + (a - 10000) * 0.02);
}

interface InsuranceResult {
  // 근로자
  empPension: number;
  empHealth: number;
  empLongCare: number;
  empEmployment: number;
  empTotal: number;
  // 사업주
  erPension: number;
  erHealth: number;
  erLongCare: number;
  erEmployment: number;
  erAccident: number;
  erTotal: number;
  // 합계
  combinedTotal: number;
  // 세금
  incomeTax: number;
  localTax: number;
  totalTax: number;
  // 실수령
  netPay: number;
  // 총인건비
  totalLaborCost: number;
}

function calcInsurance(monthly: number): InsuranceResult {
  const pensionBase = Math.min(monthly, 6_170_000);

  const empPension    = Math.round(pensionBase * 0.045);
  const empHealth     = Math.round(monthly * 0.03545);
  const empLongCare   = Math.round(empHealth * 0.1295);
  const empEmployment = Math.round(monthly * 0.009);
  const empTotal = empPension + empHealth + empLongCare + empEmployment;

  const erPension    = Math.round(pensionBase * 0.045);
  const erHealth     = Math.round(monthly * 0.03545);
  const erLongCare   = Math.round(erHealth * 0.1295);
  const erEmployment = Math.round(monthly * 0.0115); // 150인 미만 사업장
  const erAccident   = Math.round(monthly * 0.0073); // 기본 업종 0.73%
  const erTotal = erPension + erHealth + erLongCare + erEmployment + erAccident;

  const combinedTotal = empTotal + erTotal;

  // 소득세 (연간 환산 후 월 분할)
  const annual = monthly * 12;
  const a = annual / 10000;
  const taxable = Math.max(0, a - earningDeduction(a) - 150);
  const bracket = BRACKETS.find(b => taxable <= b.limit)!;
  const annualTax = Math.max(0, taxable * bracket.rate - bracket.deduct) * 10000;
  const incomeTax = Math.round(annualTax / 12);
  const localTax  = Math.round(incomeTax * 0.1);
  const totalTax  = incomeTax + localTax;

  const netPay = monthly - empTotal - totalTax;
  const totalLaborCost = monthly + erTotal;

  return {
    empPension, empHealth, empLongCare, empEmployment, empTotal,
    erPension, erHealth, erLongCare, erEmployment, erAccident, erTotal,
    combinedTotal, incomeTax, localTax, totalTax,
    netPay, totalLaborCost,
  };
}

type TabValue = 'employee' | 'employer' | 'combined';

interface TableRow {
  label: string;
  rate: string;
  amount: number;
  note?: string;
}

export default function FourInsurancePage() {
  const [salary, setSalary] = useState(3_500_000);
  const [tab, setTab] = useState<TabValue>('employee');

  const [result, setResult] = useState<InsuranceResult | null>(null);

  function calculate() {
    if (salary > 0) setResult(calcInsurance(salary));
  }

  function getRows(): TableRow[] {
    if (!result) return [];
    if (tab === 'employee') {
      return [
        { label: '국민연금', rate: '4.5%', amount: result.empPension, note: '상한 6,170,000원' },
        { label: '건강보험', rate: '3.545%', amount: result.empHealth },
        { label: '장기요양보험', rate: '건보료 × 12.95%', amount: result.empLongCare },
        { label: '고용보험', rate: '0.9%', amount: result.empEmployment },
      ];
    }
    if (tab === 'employer') {
      return [
        { label: '국민연금', rate: '4.5%', amount: result.erPension, note: '상한 6,170,000원' },
        { label: '건강보험', rate: '3.545%', amount: result.erHealth },
        { label: '장기요양보험', rate: '건보료 × 12.95%', amount: result.erLongCare },
        { label: '고용보험', rate: '1.15%', amount: result.erEmployment, note: '150인 미만' },
        { label: '산재보험', rate: '0.73%', amount: result.erAccident, note: '업종별 상이' },
      ];
    }
    return [
      { label: '국민연금 합계', rate: '9.0%', amount: result.empPension + result.erPension },
      { label: '건강보험 합계', rate: '7.09%', amount: result.empHealth + result.erHealth },
      { label: '장기요양 합계', rate: '건보료 × 25.9%', amount: result.empLongCare + result.erLongCare },
      { label: '고용보험 합계', rate: '2.05%', amount: result.empEmployment + result.erEmployment },
      { label: '산재보험', rate: '0.73%', amount: result.erAccident, note: '사업주 전액' },
    ];
  }

  const tabTotal = result
    ? tab === 'employee' ? result.empTotal
    : tab === 'employer' ? result.erTotal
    : result.combinedTotal
    : 0;

  return (
    <CalcShell title="4대보험 계산기" description="2026년 기준 4대보험 근로자·사업자 부담금" faq={CALC_FAQ['four-insurance']}>
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div>
            <Label>월 급여 (원)</Label>
            <CommaInput
              value={salary}
              onChange={setSalary}
              placeholder="예: 3,500,000"
            />
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <SummaryGrid>
              <SummaryCard
                label="근로자 4대보험"
                value={`${fmt(result.empTotal)}원`}
                sub={`급여의 ${((result.empTotal / salary) * 100).toFixed(2)}%`}
                variant="primary"
              />
              <SummaryCard
                label="실수령액"
                value={`${fmt(result.netPay)}원`}
                sub="4대보험+소득세 공제 후"
                variant="green"
              />
              <SummaryCard
                label="사업주 부담"
                value={`${fmt(result.erTotal)}원`}
                sub="4대보험 (산재 포함)"
              />
              <SummaryCard
                label="총 인건비"
                value={`${fmt(result.totalLaborCost)}원`}
                sub="급여 + 사업주 부담"
              />
            </SummaryGrid>

            <Card>
              <div className="p-4">
                <TabBar<TabValue>
                  options={[
                    { value: 'employee', label: '근로자 부담' },
                    { value: 'employer', label: '사업주 부담' },
                    { value: 'combined', label: '합계' },
                  ]}
                  value={tab}
                  onChange={setTab}
                />
              </div>
              <TableWrap>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">보험종류</th>
                      <th className="px-4 py-2.5 text-center text-xs font-bold text-slate-500 uppercase tracking-wide">요율</th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wide">금액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {getRows().map(row => (
                      <tr key={row.label}>
                        <td className="px-4 py-2.5 text-slate-700">
                          {row.label}
                          {row.note && <span className="block text-xs text-slate-400">{row.note}</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center text-slate-500 text-xs">{row.rate}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-slate-800">{fmt(row.amount)}원</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 border-t border-slate-200">
                      <td className="px-4 py-2.5 font-bold text-slate-800" colSpan={2}>
                        {tab === 'employee' ? '근로자 합계' : tab === 'employer' ? '사업주 합계' : '총합계'}
                      </td>
                      <td className="px-4 py-2.5 text-right font-black text-blue-600">{fmt(tabTotal)}원</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
            </Card>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">근로자 / 사업주 부담 비율</p>
              <RatioBar
                a={result.empTotal}
                b={result.erTotal}
                labelA={`근로자 ${fmt(result.empTotal)}원`}
                labelB={`사업주 ${fmt(result.erTotal)}원`}
              />
            </Card>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">소득세 내역</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">근로소득세 (간이세액)</span>
                  <span className="font-semibold text-red-500">-{fmt(result.incomeTax)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">지방소득세 (소득세 × 10%)</span>
                  <span className="font-semibold text-red-500">-{fmt(result.localTax)}원</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 mt-1">
                  <span className="font-bold text-slate-700">소득세 합계</span>
                  <span className="font-black text-red-500">-{fmt(result.totalTax)}원</span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
