'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { calcRentalIncomeTax, type RentalIncomeTaxResult } from '@/lib/rental-income-tax';

const w = (n: number) => Math.round(n).toLocaleString();

export default function RentalIncomeTaxPage() {
  const [annualRent, setAnnualRent] = useState(12_000_000);
  const [registered, setRegistered] = useState(false);
  const [otherOver, setOtherOver] = useState(false);
  const [result, setResult] = useState<RentalIncomeTaxResult | null>(null);

  function calculate() {
    if (annualRent <= 0) return;
    setResult(calcRentalIncomeTax({
      annualRent,
      registered,
      // 공제 판정에는 2천만원 초과 여부만 쓰이므로 경계 위/아래 대표값을 넘긴다.
      otherIncome: otherOver ? 20_000_001 : 0,
    }));
  }

  return (
    <CalcShell
      path="/calculator/rental-income-tax"
      title="주택임대소득세 계산기"
      description="연 2,000만원 이하 임대수입의 분리과세 세금을 계산합니다"
      intro={
        <>
          <h2>연 2,000만원 이하면 14% 분리과세를 고를 수 있습니다</h2>
          <p>
            주택 임대수입이 연 2,000만원 이하면 다른 소득과 합치지 않고 <strong>14% 단일세율로
            분리과세</strong>하는 쪽을 선택할 수 있습니다. 대부분의 개인 집주인이 여기 해당합니다.
            이 계산기는 그 분리과세 세액을 계산합니다.
          </p>
          <h2>세금은 수입 전체가 아니라 과세표준에 붙습니다</h2>
          <p>
            임대수입에서 <strong>필요경비</strong>와 <strong>기본공제</strong>를 뺀 금액에만 세율이
            적용됩니다. 등록임대사업자는 필요경비율 60%·공제 400만원, 미등록은 50%·200만원입니다.
            기본공제는 임대소득 외 종합소득금액이 2,000만원 이하일 때만 적용됩니다.
          </p>
          <h2>등록하면 세금이 크게 줄어듭니다</h2>
          <p>
            연 1,200만원 수입이면 미등록은 세금이 약 <strong>62만원</strong>인데, 등록임대사업자는{' '}
            <strong>약 12만원</strong>으로 줄어듭니다. 다만 등록에는 임대료 인상 제한(5%)과 의무
            임대기간 같은 조건이 따르므로, 세금만 보고 결정할 일은 아닙니다.
          </p>
          <h2>이 계산기의 범위</h2>
          <p>
            연 수입이 2,000만원을 넘으면 분리과세를 쓸 수 없고 <strong>무조건 종합과세</strong>라
            이 계산이 맞지 않습니다(그 경우 경고를 표시합니다). 보증금에 대한{' '}
            <strong>간주임대료</strong>(부부합산 3주택 이상·보증금 합 3억 초과 시)와 소형주택
            세액감면은 반영하지 않았습니다. 결과는 추정치입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="임대 정보" />
          <div className="flex flex-col gap-4">
            <div>
              <Label>연 임대수입 (원)</Label>
              <CommaInput value={annualRent} onChange={setAnnualRent} placeholder="예: 12,000,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                월세 합계 기준 (월 100만원이면 1,200만원)
              </p>
            </div>

            <div>
              <Label>등록임대사업자</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {[
                  { v: true, label: '등록', sub: '경비 60% · 공제 400만' },
                  { v: false, label: '미등록', sub: '경비 50% · 공제 200만' },
                ].map(o => (
                  <button
                    key={String(o.v)}
                    onClick={() => setRegistered(o.v)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      registered === o.v
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <p className={`text-sm font-bold ${registered === o.v ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>{o.label}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{o.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>임대소득 외 종합소득금액</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {[
                  { v: false, label: '2,000만원 이하', sub: '기본공제 적용' },
                  { v: true, label: '2,000만원 초과', sub: '기본공제 없음' },
                ].map(o => (
                  <button
                    key={String(o.v)}
                    onClick={() => setOtherOver(o.v)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      otherOver === o.v
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <p className={`text-sm font-bold ${otherOver === o.v ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>{o.label}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{o.sub}</p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                근로·사업 등 임대소득을 뺀 다른 소득금액 기준
              </p>
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>임대소득세 계산</PrimaryBtn>

        {result && (
          <>
            {result.overThreshold && (
              <Card className="p-4 border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/20">
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  ⚠️ 연 임대수입이 2,000만원을 넘으면 분리과세를 쓸 수 없고 다른 소득과 합산해
                  종합과세됩니다. 아래 금액은 분리과세 기준일 뿐 실제와 다릅니다.
                </p>
              </Card>
            )}

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                예상 세금
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {w(result.totalTax)}<span className="text-lg font-bold ml-1">원</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                실효세율 {result.effectiveRate.toFixed(2)}% (수입 대비)
              </p>
            </Card>

            <Card className="p-5">
              <CardHeader title="계산 과정" />
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">임대수입</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.income)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">− 필요경비 ({(result.expenseRate * 100).toFixed(0)}%)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">−{w(result.necessaryExpense)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">− 기본공제</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    −{w(result.deduction)}원
                  </span>
                </div>
                {!result.deductionApplied && (
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    종합소득 2,000만원 초과라 기본공제가 적용되지 않았습니다.
                  </p>
                )}
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">과세표준</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.taxBase)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">소득세 (14%)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.incomeTax)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">지방소득세 (10%)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.localTax)}원</span>
                </div>
              </div>

              <SummaryGrid>
                <SummaryCard label="임대수입" value={`${w(result.income)}원`} />
                <SummaryCard label="과세표준" value={`${w(result.taxBase)}원`} />
                <SummaryCard label="총 세금" value={`${w(result.totalTax)}원`} variant="primary" />
                <SummaryCard label="실효세율" value={`${result.effectiveRate.toFixed(2)}%`} />
              </SummaryGrid>

              {result.totalTax === 0 && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 leading-relaxed">
                  필요경비와 공제가 수입보다 커서 과세표준이 생기지 않습니다. 낼 세금이 없습니다.
                </p>
              )}
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
