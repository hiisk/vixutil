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
    <CalcShell
      path="/calculator/salary"
      title="실수령액 계산기"
      description="2026년 4대보험 요율 · 근로소득세법 기준"
      faq={CALC_FAQ.salary}
      intro={
        <>
          <h2>무엇을 계산하나요</h2>
          <p>
            연봉에서 <strong>4대보험과 세금을 빼고 실제로 통장에 들어오는 월 금액</strong>을 계산합니다.
            연봉 계약서에 적힌 숫자를 12로 나눈 값과 실수령액이 다른 이유가 여기에 있습니다.
          </p>
          <h2>적용 요율 (2026년 기준)</h2>
          <p>
            국민연금 <strong>4.5%</strong>(기준소득월액 상한 617만원), 건강보험 <strong>3.545%</strong>,
            장기요양보험 <strong>건강보험료의 12.95%</strong>, 고용보험 <strong>0.9%</strong>를 적용합니다.
            근로소득세는 2023년 개정 소득세법(1,400만원 구간 신설) 기준의 간이세액표 방식으로 계산하고,
            지방소득세는 소득세의 10%입니다.
          </p>
          <h2>실제 급여명세서와 다를 수 있습니다</h2>
          <p>
            회사마다 비과세 항목(식대·차량유지비·연구활동비 등)과 추가 공제 항목이 달라서 이 계산기는{' '}
            <strong>추정치</strong>입니다. 식대 비과세는 월 20만원까지 반영할 수 있게 해뒀지만, 그 밖의 항목은
            회사 규정을 따릅니다. 연말정산에서 부양가족·의료비·기부금 등이 반영되면 최종 세액은 또 달라집니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="label-caps mb-3">기본 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>연봉 (원)</Label>
              <CommaInput value={annual} onChange={setAnnual} placeholder="예: 40,000,000" />
            </div>
          </div>

          <p className="label-caps mt-4 mb-3">공제 옵션</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
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
            {/*
              답이 격자 한 줄을 통째로 쓰고(.stat-pri) 곁 숫자가 그 아래 나란히 선다.
              예전에는 키 큰 답 칸 «옆»에 둘을 세로로 붙이는 구조였는데, 그 묶음이
              왼쪽 한 칸에만 남는다. 묶음을 풀어 격자의 형제로 둔다.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
              <div className="stat-pri">
                <p className="stat-label">월 실수령액</p>
                <p className="stat-value">{fmt(result.netMonthly)}원</p>
                <p className="stat-sub">연 {fmt(result.netAnnual)}원</p>
              </div>
              <SummaryCard label="월 세전 급여" value={`${fmt(result.monthly)}원`} />
              <SummaryCard label="실효 공제율" value={`${result.effectiveRate.toFixed(1)}%`} variant="red"
                sub={`월 -${fmt(result.totalDeduction)}원`} />
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
                  <span className="font-bold text-red-500">-{fmt(result.totalDeduction)}원</span>
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
        <p className="label-caps">{title}</p>
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
