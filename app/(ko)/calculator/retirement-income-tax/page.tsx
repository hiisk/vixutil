'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { calcRetirementTax, type RetirementTaxResult } from '@/lib/retirement-income-tax';

const w = (n: number) => Math.round(n).toLocaleString();

export default function RetirementIncomeTaxPage() {
  const [payout, setPayout] = useState(50_000_000);
  const [years, setYears] = useState('10');
  const [months, setMonths] = useState('0');
  const [result, setResult] = useState<RetirementTaxResult | null>(null);

  function calculate() {
    const serviceMonths = (Number(years) || 0) * 12 + (Number(months) || 0);
    if (payout <= 0 || serviceMonths <= 0) return;
    setResult(calcRetirementTax({ payout, serviceMonths }));
  }

  return (
    <CalcShell
      path="/calculator/retirement-income-tax"
      title="퇴직소득세 계산기"
      description="퇴직금에서 실제로 떼이는 퇴직소득세와 세후 실수령액을 계산합니다"
      intro={
        <>
          <h2>퇴직소득세는 일반 소득세와 계산법이 다릅니다</h2>
          <p>
            퇴직금은 오랜 기간에 걸쳐 쌓인 돈을 한 번에 받는 것이라, 그 해 소득으로 한꺼번에
            과세하면 세율이 과하게 높아집니다. 그래서 퇴직소득세는 <strong>연분연승</strong>이라는
            방식을 씁니다 — 근속연수로 나눠 1년치로 환산한 뒤 세율을 매기고, 다시 근속연수만큼
            곱합니다. 덕분에 <strong>오래 일할수록 같은 금액이라도 세부담이 낮아집니다</strong>.
          </p>
          <h2>근속연수공제가 먼저 빠집니다</h2>
          <p>
            과세하기 전에 근속연수에 따라 일정액을 공제합니다. 근속 20년이면 4,000만원이 공제되고,
            그보다 퇴직금이 적으면 <strong>세금이 아예 없습니다</strong>. 20~30년 근속에 퇴직금이
            그리 크지 않은 경우 퇴직소득세가 0인 일이 흔합니다.
          </p>
          <h2>지방소득세가 10% 더 붙습니다</h2>
          <p>
            산출된 퇴직소득세의 <strong>10%</strong>가 지방소득세로 추가됩니다. 이 계산기는 둘을
            나눠 보여주고 합계도 함께 냅니다.
          </p>
          <h2>이 계산기가 다루지 않는 것</h2>
          <p>
            2012년 이전 근속분에 대한 <strong>정산 특례</strong>, 임원 퇴직금 한도초과분의 근로소득
            전환은 반영하지 않았습니다. IRP로 이연하면 퇴직소득세를 당장 내지 않고 <strong>연금
            수령 시 30~40% 감면</strong>된 세율로 나눠 낼 수 있는데, 이 역시 별도 계산이 필요합니다.
            결과는 일반적인 경우의 추정치이며, 정확한 세액은 원천징수영수증을 확인하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="퇴직 정보" />
          <div className="flex flex-col gap-3">
            <div>
              <Label>퇴직금 (원)</Label>
              <CommaInput value={payout} onChange={setPayout} placeholder="예: 50,000,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                비과세 항목을 뺀 퇴직소득금액 기준
              </p>
            </div>
            <div>
              <Label>근속 기간</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number" value={years} onChange={e => setYears(e.target.value)}
                    min="0" className={inputCls}
                  />
                  <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">년</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number" value={months} onChange={e => setMonths(e.target.value)}
                    min="0" max="11" className={inputCls}
                  />
                  <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">개월</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                1년 미만은 1년으로 올려 계산합니다 (예: 10년 3개월 → 11년)
              </p>
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>퇴직소득세 계산</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                총 세금
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {w(result.totalTax)}<span className="text-lg font-bold ml-1">원</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                실효세율 {result.effectiveRate.toFixed(2)}% · 세후 {w(result.netPayout)}원 수령
              </p>
            </Card>

            <Card className="p-5">
              <CardHeader title="계산 과정" />
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">근속연수 (올림)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{result.years}년</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">근속연수공제</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">−{w(result.serviceDeduction)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">환산급여</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.convertedSalary)}원</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>환산급여공제</span>
                  <span className="tabular-nums">−{w(result.convertedDeduction)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">과세표준</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.taxBase)}원</span>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">퇴직소득세</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.incomeTax)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">지방소득세 (10%)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.localTax)}원</span>
                </div>
              </div>

              <SummaryGrid>
                <SummaryCard label="퇴직금" value={`${w(payout)}원`} />
                <SummaryCard label="총 세금" value={`${w(result.totalTax)}원`} variant="red" />
                <SummaryCard label="세후 수령액" value={`${w(result.netPayout)}원`} variant="primary" />
                <SummaryCard label="실효세율" value={`${result.effectiveRate.toFixed(2)}%`} />
              </SummaryGrid>

              {result.totalTax === 0 && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 leading-relaxed">
                  근속연수공제({w(result.serviceDeduction)}원)가 퇴직금보다 커서 과세표준이 생기지 않습니다. 낼 세금이 없습니다.
                </p>
              )}
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
