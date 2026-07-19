'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import {
  calcConversion, REGIONS, RENT_MULTIPLIER,
  type ConversionResult,
} from '@/lib/deposit-conversion';

const w = (n: number) => Math.round(n).toLocaleString();
const eok = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 100_000_000) return `${(n / 100_000_000).toFixed(2).replace(/\.?0+$/, '')}억원`;
  return `${w(n)}원`;
};

export default function DepositConversionPage() {
  const [deposit, setDeposit] = useState(0);
  const [rent, setRent] = useState(0);
  const [regionId, setRegionId] = useState(REGIONS[0].id);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const region = REGIONS.find(r => r.id === regionId)!;

  function calculate() {
    if (deposit <= 0 && rent <= 0) return;
    setResult(calcConversion(deposit, rent, region));
  }

  return (
    <CalcShell
      path="/calculator/deposit-conversion"
            title="환산보증금 계산기"
      description="상가 임대차의 환산보증금을 계산하고 지역별 기준금액과 비교합니다."
      intro={
        <>
          <h2>환산보증금이란</h2>
          <p>
            상가 임대차에서 <strong>보증금 + (월세 × 100)</strong>으로 계산한 금액입니다. 보증금과
            월세를 하나의 숫자로 합쳐 임차 규모를 재는 기준이라고 보면 됩니다. 보증금 5,000만원에
            월세 200만원이면 환산보증금은 2억 5,000만원입니다.
          </p>
          <h2>왜 계산하나요</h2>
          <p>
            <strong>상가건물 임대차보호법</strong>의 여러 보호 규정이 이 금액을 기준으로 적용 여부가
            갈리기 때문입니다. 지역별 기준금액은 <strong>서울 9억원</strong>, 과밀억제권역·부산{' '}
            <strong>6.9억원</strong>, 광역시 등 <strong>5.4억원</strong>, 그 밖의 지역{' '}
            <strong>3.7억원</strong>입니다. 내 계약이 이 선의 위인지 아래인지가 출발점입니다.
          </p>
          <h2>기준을 넘어도 보호가 전부 사라지지는 않습니다</h2>
          <p>
            기준금액을 초과하면 법의 <strong>일부</strong> 규정만 적용됩니다. 어떤 조항이 남고 어떤
            조항이 빠지는지는 법 개정에 따라 달라지고 해석도 갈리므로, 계약 전에 확인이 필요합니다.
            금액이 기준선에 가깝다면 특히 그렇습니다. 이 계산기는 환산보증금 자체를 구하고 기준과
            비교해주는 도구이며, 구체적인 권리 판단은 전문가 상담을 받으세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>지역</Label>
              <select
                value={regionId}
                onChange={e => { setRegionId(e.target.value); setResult(null); }}
                className={selectCls}
              >
                {REGIONS.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.label} — 기준 {eok(r.threshold)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>보증금 (원)</Label>
              <CommaInput value={deposit} onChange={setDeposit} placeholder="예: 100,000,000" />
            </div>

            <div>
              <Label>월세 (원)</Label>
              <CommaInput value={rent} onChange={setRent} placeholder="예: 5,000,000" />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                월세에 {RENT_MULTIPLIER}을 곱해 보증금으로 환산합니다.
              </p>
            </div>

            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <Card>
            <CardHeader
              title="환산보증금"
              sub={`${region.label} 기준 · 상가건물임대차보호법`}
            />

            <div className="p-4">
              <SummaryGrid>
                <SummaryCard
                  label="환산보증금"
                  value={eok(result.converted)}
                  sub={`${w(result.converted)}원`}
                  variant="primary"
                />
                <SummaryCard
                  label="지역 기준금액"
                  value={eok(result.threshold)}
                  sub={region.label}
                />
                <SummaryCard
                  label="월세 환산분"
                  value={eok(result.fromRent)}
                  sub={`월세 × ${RENT_MULTIPLIER}`}
                />
                <SummaryCard
                  label={result.withinThreshold ? '기준까지 여유' : '기준 초과액'}
                  value={eok(Math.abs(result.margin))}
                  sub={result.withinThreshold ? '기준금액 이하' : '기준금액 초과'}
                  variant={result.withinThreshold ? 'green' : 'red'}
                />
              </SummaryGrid>
            </div>

            <div className="px-5 pb-4">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">보증금</span>
                  <span className="font-semibold">{w(deposit)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">월세 {w(rent)}원 × {RENT_MULTIPLIER}</span>
                  <span className="font-semibold">+{w(result.fromRent)}원</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5 font-bold text-slate-800 dark:text-slate-100">
                  <span>환산보증금</span>
                  <span>{w(result.converted)}원</span>
                </div>
              </div>
            </div>

            {result.withinThreshold ? (
              <div className="px-5 pb-5">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-4">
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200 mb-1">
                    ✅ 지역 기준금액 이하입니다
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    환산보증금이 기준금액({eok(result.threshold)}) 이하이면 상가건물임대차보호법의
                    보호를 더 폭넓게 받습니다. 다만 어떤 조항이 어디까지 적용되는지는 개정 이력이
                    복잡하므로, 중요한 판단이라면 법령 원문이나 전문가 확인을 함께 받으세요.
                  </p>
                </div>
              </div>
            ) : (
              <div className="px-5 pb-5">
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-xl p-4">
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-1">
                    ⚠️ 기준금액을 {eok(-result.margin)} 초과합니다
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                    {result.maxRentToStayWithin === null ? (
                      <>보증금만으로 이미 기준금액을 넘어, 월세를 낮춰도 기준 이하로 맞출 수 없습니다.</>
                    ) : (
                      <>
                        같은 보증금이라면 월세를 <strong>{w(result.maxRentToStayWithin)}원</strong> 이하로
                        낮춰야 기준 이하가 됩니다. 기준을 넘으면 보호 범위가 달라지므로,
                        계약 조건을 정할 때 보증금과 월세의 배분을 함께 검토해 볼 만합니다.
                      </>
                    )}
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
