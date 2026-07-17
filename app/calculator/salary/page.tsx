'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { CALC_FAQ } from '@/lib/calc-faq';
import { calcSalary, type SalaryResult } from '@/lib/salary';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function SalaryPage() {
  const [annual, setAnnual] = useState(40_000_000);
  const [dependents, setDependents] = useState('1');
  const [mealExempt, setMealExempt] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);

  function calculate() {
    if (annual > 0) setResult(calcSalary(annual, Number(dependents) || 1, mealExempt));
  }

  return (
    <CalcShell path="/calculator/salary" title="실수령액 계산기" description="2026년 4대보험 요율 · 근로소득세법 기준" faq={CALC_FAQ.salary}>
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">기본 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>연봉 (원)</Label>
              <CommaInput value={annual} onChange={setAnnual} placeholder="예: 40,000,000" />
            </div>
          </div>

          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-4 mb-3">공제 옵션</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>부양가족 수 (본인 포함)</Label>
              <select value={dependents} onChange={e => setDependents(e.target.value)}
                className={inputCls}>
                {[1,2,3,4,5,6].map(n => (
                  <option key={n} value={n}>{n}명{n === 1 ? ' (본인만)' : ''}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 py-3 cursor-pointer select-none">
                <input type="checkbox" checked={mealExempt} onChange={e => setMealExempt(e.target.checked)}
                  className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  식대 비과세<br />
                  <span className="text-xs text-slate-400 dark:text-slate-500">월 20만원 공제</span>
                </span>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1 bg-blue-600 rounded-2xl p-5">
                <p className="text-blue-200 text-xs mb-1">월 실수령액</p>
                <p className="text-white text-3xl font-black">{fmt(result.netMonthly)}원</p>
                <p className="text-blue-200 text-sm mt-1">연 {fmt(result.netAnnual)}원</p>
              </div>
              <div className="flex flex-col gap-2">
                <SummaryCard label="월 세전 급여" value={`${fmt(result.monthly)}원`} />
                <SummaryCard label="실효 공제율" value={`${result.effectiveRate.toFixed(1)}%`} variant="red"
                  sub={`월 -${fmt(result.totalDeduction)}원`} />
              </div>
            </div>

            <Card>
              <CardHeader title="공제 상세 내역" sub="2026년 기준" />
              <div className="divide-y divide-slate-100">
                <Section title="4대보험" total={result.totalInsurance}>
                  <Row label="국민연금" rate="4.5%" value={result.pension} />
                  <Row label="건강보험" rate="3.545%" value={result.health} />
                  <Row label="장기요양보험" rate="건강보험료×12.95%" value={result.longCare} />
                  <Row label="고용보험" rate="0.9%" value={result.employment} />
                </Section>
                <Section title="세금" total={result.totalTax}>
                  <Row label="근로소득세" rate="간이세액표 기준" value={result.incomeTax} />
                  <Row label="지방소득세" rate="소득세×10%" value={result.localTax} />
                </Section>
                <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">총 공제액</span>
                  <span className="font-black text-red-500">-{fmt(result.totalDeduction)}원</span>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  * 부양가족 {dependents}명 기본공제 적용
                  {mealExempt ? ' · 식대 비과세 20만원 적용' : ''}
                  {' · '}의료비·교육비 등 추가공제 미반영
                </p>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}

function Section({ title, total, children }: { title: string; total: number; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4">
      <div className="flex justify-between items-center mb-2.5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</p>
        <span className="text-xs font-bold text-red-500">-{Math.round(total).toLocaleString()}원</span>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Row({ label, rate, value }: { label: string; rate: string; value: number }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2">
        <span className="text-slate-700 dark:text-slate-200">{label}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">{rate}</span>
      </div>
      <span className="font-semibold text-red-500">-{Math.round(value).toLocaleString()}원</span>
    </div>
  );
}
