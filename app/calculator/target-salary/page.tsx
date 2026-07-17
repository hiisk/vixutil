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
      path="/calculator/target-salary"
      title="목표 실수령액 → 연봉 계산기"
      description="월 실수령액을 넣으면 필요한 연봉을 역산합니다. 이직·연봉 협상 때 기준이 됩니다."
      intro={
        <>
          <h2>협상 테이블에서 쓰는 방향</h2>
          <p>
            연봉 협상은 계약서에 적히는 <strong>세전 연봉</strong>으로 하는데, 정작 본인에게 중요한 건{' '}
            <strong>매달 통장에 들어오는 돈</strong>입니다. 이 계산기는 그 방향을 뒤집어서, 원하는 월
            실수령액에서 출발해 필요한 세전 연봉을 역산합니다. &ldquo;월 400만원 받으려면 연봉이 얼마여야
            하나&rdquo;에 답하는 도구입니다.
          </p>
          <h2>실수령액은 연봉에 비례하지 않습니다</h2>
          <p>
            소득세가 누진이라 연봉이 오를수록 <strong>공제 비율도 같이 올라갑니다</strong>. 연봉을 10% 올려도
            실수령액은 10% 늘지 않습니다. 목표 실수령액을 높게 잡을수록 필요한 연봉이 더 가파르게 뛰는 이유가
            이것입니다.
          </p>
          <h2>실수령액 계산기와 같은 식입니다</h2>
          <p>
            실수령액 계산기와 동일한 2026년 4대보험 요율·근로소득세법을 반대 방향으로 풀어서 구합니다.
            따라서 여기서 나온 연봉을 실수령액 계산기에 다시 넣으면 원래 목표 금액이 나옵니다. 회사 비과세
            항목과 추가 공제에 따라 실제와 다를 수 있는 <strong>추정치</strong>입니다.
          </p>
        </>
      }
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
