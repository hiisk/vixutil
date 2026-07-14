'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { calcPensionCredit, PENSION_RULES, type IncomeType, type PensionCreditResult } from '@/lib/pension-credit';

const w = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${Math.round(n / 10_000).toLocaleString()}만원`;

export default function PensionCreditPage() {
  const [incomeType, setIncomeType] = useState<IncomeType>('salary');
  const [income, setIncome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [irp, setIrp] = useState(0);
  const [result, setResult] = useState<PensionCreditResult | null>(null);

  function calculate() {
    if (savings <= 0 && irp <= 0) return;
    setResult(calcPensionCredit({ incomeType, income, savings, irp }));
  }

  const cap = PENSION_RULES.cap[incomeType];
  const incomeLabel = incomeType === 'salary' ? '총급여' : '종합소득금액';

  return (
    <CalcShell
      title="연금저축·IRP 세액공제 계산기"
      description="연금저축·IRP 납입액 → 연말정산 세액공제액. 남은 납입 여력까지 계산합니다."
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>소득 구분</Label>
              <select
                value={incomeType}
                onChange={e => { setIncomeType(e.target.value as IncomeType); setResult(null); }}
                className={selectCls}
              >
                <option value="salary">근로자 (총급여 기준)</option>
                <option value="comprehensive">사업·기타소득자 (종합소득금액 기준)</option>
              </select>
            </div>

            <div>
              <Label>{incomeLabel} (원)</Label>
              <CommaInput value={income} onChange={setIncome} placeholder={`예: ${w(cap)}`} />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                {man(cap)} 이하면 16.5%, 초과하면 13.2%가 적용됩니다.
              </p>
            </div>

            <div>
              <Label>연금저축 연간 납입액 (원)</Label>
              <CommaInput value={savings} onChange={setSavings} placeholder="예: 6,000,000" />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                연금저축은 {man(PENSION_RULES.savingsLimit)}까지만 공제 대상입니다.
              </p>
            </div>

            <div>
              <Label>IRP 연간 납입액 (원)</Label>
              <CommaInput value={irp} onChange={setIrp} placeholder="예: 3,000,000" />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                연금저축과 합쳐 {man(PENSION_RULES.totalLimit)}까지 공제받을 수 있습니다.
              </p>
            </div>

            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <Card>
            <CardHeader
              title="예상 세액공제액"
              sub={`${incomeLabel} ${income > 0 ? w(income) + '원' : '미입력'} 기준 · 지방소득세 포함`}
            />
            <div className="p-4">
              <SummaryGrid>
                <SummaryCard
                  label="세액공제액"
                  value={`${w(result.credit)}원`}
                  sub="연말정산 때 돌려받는 금액"
                  variant="primary"
                />
                <SummaryCard
                  label="적용 공제율"
                  value={`${(result.rate * 100).toFixed(1)}%`}
                  sub={result.rate === PENSION_RULES.highRate ? `${incomeLabel} ${man(cap)} 이하` : `${incomeLabel} ${man(cap)} 초과`}
                />
                <SummaryCard
                  label="공제 대상 납입액"
                  value={`${w(result.eligibleTotal)}원`}
                  sub={`한도 ${man(PENSION_RULES.totalLimit)}`}
                />
                <SummaryCard
                  label={result.excess > 0 ? '한도 초과 납입액' : '남은 납입 여력'}
                  value={`${w(result.excess > 0 ? result.excess : result.roomLeft)}원`}
                  sub={result.excess > 0 ? '공제받지 못합니다' : 'IRP로 채울 수 있습니다'}
                  variant={result.excess > 0 ? 'red' : 'green'}
                />
              </SummaryGrid>
            </div>

            <div className="px-5 pb-4">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">연금저축 인정액</span>
                  <span className="font-semibold">{w(result.eligibleSavings)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">IRP 인정액</span>
                  <span className="font-semibold">{w(result.eligibleIrp)}원</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5">
                  <span className="text-slate-500 dark:text-slate-400">공제 대상 합계</span>
                  <span className="font-semibold">{w(result.eligibleTotal)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">공제율 (×{(result.rate * 100).toFixed(1)}%)</span>
                  <span className="font-semibold text-blue-600">{w(result.credit)}원</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5 font-bold text-slate-800 dark:text-slate-100">
                  <span>예상 세액공제액</span>
                  <span>{w(result.credit)}원</span>
                </div>
              </div>
            </div>

            {result.roomLeft > 0 && (
              <div className="px-5 pb-5">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-4">
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                    💡 {w(result.roomLeft)}원을 더 넣으면 {w(result.creditIfMaxed - result.credit)}원을 더 돌려받습니다
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    한도({man(PENSION_RULES.totalLimit)})를 다 채우면 세액공제액이 {w(result.creditIfMaxed)}원이 됩니다.
                    연금저축이 한도({man(PENSION_RULES.savingsLimit)})에 걸렸다면 나머지는 IRP로 채워야 합니다.
                  </p>
                </div>
              </div>
            )}

            {result.excess > 0 && (
              <div className="px-5 pb-5">
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 rounded-xl p-4">
                  <p className="text-sm font-bold text-red-800 dark:text-red-200 mb-1">
                    ⚠️ {w(result.excess)}원은 공제받지 못합니다
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
                    {savings > PENSION_RULES.savingsLimit
                      ? `연금저축 납입액이 단독 한도(${man(PENSION_RULES.savingsLimit)})를 넘었습니다. 초과분을 IRP로 옮기면 합산 한도(${man(PENSION_RULES.totalLimit)})까지 공제받을 수 있습니다.`
                      : `합산 한도(${man(PENSION_RULES.totalLimit)})를 넘겨 납입했습니다. 초과분은 세액공제 대상이 아닙니다.`}
                  </p>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
