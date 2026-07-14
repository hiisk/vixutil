'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { annualForNetMonthly, type SalaryResult } from '@/lib/salary';

const w = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${Math.round(n / 10_000).toLocaleString()}만원`;

export default function TargetSalaryPage() {
  const [target, setTarget] = useState(0);
  const [dependents, setDependents] = useState('1');
  const [mealExempt, setMealExempt] = useState(true);
  const [result, setResult] = useState<{ annual: number; result: SalaryResult } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    if (target <= 0) { setError('목표 실수령액을 입력해 주세요.'); setResult(null); return; }
    const found = annualForNetMonthly(target, Number(dependents), mealExempt);
    if (!found) { setError('그 금액은 현실적인 연봉 범위를 벗어납니다.'); setResult(null); return; }
    setError('');
    setResult(found);
  }

  return (
    <CalcShell
      title="목표 실수령액 → 연봉 계산기"
      description="월 실수령액을 넣으면 필요한 연봉을 역산합니다. 이직·연봉 협상 때 기준이 됩니다."
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>목표 월 실수령액 (원)</Label>
              <CommaInput value={target} onChange={setTarget} placeholder="예: 3,000,000" />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                세금과 4대보험을 뗀 뒤 통장에 들어오는 금액입니다.
              </p>
            </div>

            <div>
              <Label>부양가족 수 (본인 포함)</Label>
              <select
                value={dependents}
                onChange={e => setDependents(e.target.value)}
                className={inputCls}
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n}명</option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={mealExempt}
                onChange={e => setMealExempt(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                식대 비과세 적용 (월 20만원)
              </span>
            </label>

            <PrimaryBtn onClick={calculate}>연봉 계산하기</PrimaryBtn>
            {error && <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>}
          </div>
        </Card>

        {result && (
          <Card>
            <CardHeader
              title="필요한 연봉"
              sub={`월 실수령 ${w(target)}원 기준 · 2026년 요율`}
            />
            <div className="p-4">
              <SummaryGrid>
                <SummaryCard
                  label="필요 연봉"
                  value={man(result.annual)}
                  sub={`${w(result.annual)}원`}
                  variant="primary"
                />
                <SummaryCard
                  label="세전 월급"
                  value={`${w(result.result.monthly)}원`}
                  sub="공제 전"
                />
                <SummaryCard
                  label="월 공제액"
                  value={`${w(result.result.totalDeduction)}원`}
                  sub={`공제율 ${result.result.effectiveRate.toFixed(1)}%`}
                  variant="red"
                />
                <SummaryCard
                  label="실수령액"
                  value={`${w(result.result.netMonthly)}원`}
                  sub={`연 ${man(result.result.netAnnual)}`}
                  variant="green"
                />
              </SummaryGrid>
            </div>

            <div className="px-5 pb-4">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">세전 월급</span>
                  <span className="font-semibold">{w(result.result.monthly)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">4대보험</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">−{w(result.result.totalInsurance)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">소득세 + 지방소득세</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">−{w(result.result.totalTax)}원</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5 font-bold text-slate-800 dark:text-slate-100">
                  <span>월 실수령액</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{w(result.result.netMonthly)}원</span>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl p-4">
                <p className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-1">
                  💡 연봉의 {(100 - result.result.effectiveRate).toFixed(0)}%만 손에 들어옵니다
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  연봉 {man(result.annual)}을 받아도 매달 {w(result.result.totalDeduction)}원이 공제됩니다.
                  연봉이 높아질수록 누진세율 때문에 공제 비율이 더 커지므로,
                  협상할 때는 연봉이 아니라 실수령액으로 비교하는 편이 정확합니다.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
