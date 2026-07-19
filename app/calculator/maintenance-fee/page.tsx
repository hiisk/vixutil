'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import {
  calcMaintenance, COMMON_KEYS, INDIVIDUAL_KEYS, FEE_LABELS,
  type FeeInput, type FeeKey, type MaintenanceResult,
} from '@/lib/maintenance-fee';

const w = (n: number) => Math.round(n).toLocaleString();

export default function MaintenanceFeePage() {
  const [area, setArea] = useState('84.95');
  const [fees, setFees] = useState<FeeInput>({});
  const [result, setResult] = useState<MaintenanceResult | null>(null);

  function setFee(key: FeeKey, v: number) {
    setFees(prev => ({ ...prev, [key]: v }));
  }

  function calculate() {
    const a = Number(area);
    const r = calcMaintenance(fees, Number.isFinite(a) ? a : 0);
    setResult(r.total > 0 ? r : null);
  }

  return (
    <CalcShell
      path="/calculator/maintenance-fee"
      title="관리비 계산기"
      description="아파트 관리비를 항목별로 나눠 ㎡당 단가와 비중을 봅니다"
      intro={
        <>
          <h2>총액만 보면 비교가 안 됩니다</h2>
          <p>
            관리비가 20만원이라는 사실만으로는 많은지 적은지 알 수 없습니다. 집 크기가 다르기 때문입니다.
            평수가 다른 집끼리 견주려면 <strong>전용면적으로 나눈 ㎡당 단가</strong>가 있어야 합니다.
            이 계산기는 그 단가와 항목별 비중을 보여줍니다.
          </p>
          <h2>공용관리비와 개별사용료는 성격이 다릅니다</h2>
          <p>
            <strong>공용관리비</strong>(일반관리비·경비비·청소비·승강기유지비 등)는 단지 전체가 나눠 내는
            몫이라 우리 집이 아껴도 잘 줄지 않습니다. 반면 <strong>개별사용료</strong>(난방·급탕·전기·수도)는
            쓴 만큼 내는 돈이라 줄이면 바로 반영됩니다. 관리비를 낮추고 싶다면 어느 쪽이 큰지부터 봐야
            헛수고를 안 합니다.
          </p>
          <h2>여름·겨울에 오르는 건 대개 개별사용료입니다</h2>
          <p>
            계절에 따라 관리비가 크게 흔들린다면 난방·급탕·냉방 전기가 원인일 가능성이 높습니다.
            공용관리비는 계절을 타지 않는 편이라, 여름과 겨울 고지서를 각각 넣어 비교하면 어디서
            차이가 나는지가 드러납니다.
          </p>
          <h2>정확한 비교는 K-apt에서</h2>
          <p>
            적정 단가는 지역·연식·단지 규모·경비 방식에 따라 크게 달라져서 하나의 기준값을 제시하기
            어렵습니다. <strong>공동주택관리정보시스템(K-apt)</strong>에 단지별·항목별 평균이 공개돼 있으니,
            여기서 나온 우리 집 단가를 들고 같은 조건의 단지와 비교하면 정확합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="전용면적" />
          <Label>전용면적 (㎡)</Label>
          <input
            type="number"
            value={area}
            onChange={e => setArea(e.target.value)}
            placeholder="예: 84.95"
            step="0.01"
            min="0"
            className={inputCls}
          />
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            공급면적(분양 평수)이 아니라 등기부·계약서의 전용면적을 넣어야 단가가 맞습니다
          </p>
        </Card>

        <Card className="p-5">
          <CardHeader title="공용관리비" />
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            단지 전체가 나눠 내는 몫 · 모르는 항목은 비워두세요
          </p>
          <div className="grid grid-cols-2 gap-3">
            {COMMON_KEYS.map(key => (
              <div key={key}>
                <Label>{FEE_LABELS[key]}</Label>
                <CommaInput value={fees[key] ?? 0} onChange={v => setFee(key, v)} placeholder="0" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="개별사용료" />
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            우리 집이 쓴 만큼 내는 몫 · 아끼면 바로 줄어듭니다
          </p>
          <div className="grid grid-cols-2 gap-3">
            {INDIVIDUAL_KEYS.map(key => (
              <div key={key}>
                <Label>{FEE_LABELS[key]}</Label>
                <CommaInput value={fees[key] ?? 0} onChange={v => setFee(key, v)} placeholder="0" />
              </div>
            ))}
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>관리비 분석</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                합계
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {w(result.total)}<span className="text-lg font-bold ml-1">원</span>
              </p>
              <div className="mt-4" />
              <SummaryGrid>
                <SummaryCard label="㎡당" value={`${w(result.perSqm)}원`} />
                <SummaryCard label="평당" value={`${w(result.perPyeong)}원`} />
                <SummaryCard label="공용관리비" value={`${w(result.common)}원`} sub={`${result.commonShare.toFixed(0)}%`} />
                <SummaryCard label="개별사용료" value={`${w(result.individual)}원`} sub={`${(100 - result.commonShare).toFixed(0)}%`} />
              </SummaryGrid>
            </Card>

            <Card className="p-5">
              <CardHeader title="항목별 비중" />
              <div className="flex flex-col gap-2.5">
                {result.items.map(item => (
                  <div key={item.key}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                      <span className="text-slate-900 dark:text-slate-100 font-bold tabular-nums">
                        {w(item.amount)}원
                        <span className="text-xs text-slate-400 dark:text-slate-500 ml-1.5 font-medium">
                          {item.share.toFixed(1)}%
                        </span>
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${Math.max(1, item.share)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {result.top && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                  가장 큰 항목은 <strong className="text-slate-700 dark:text-slate-200">{result.top.label}</strong>
                  으로 전체의 {result.top.share.toFixed(0)}%입니다.{' '}
                  {(INDIVIDUAL_KEYS as readonly string[]).includes(result.top.key)
                    ? '개별사용료라 사용량을 줄이면 바로 반영됩니다.'
                    : '공용관리비라 개인이 아껴도 잘 줄지 않습니다. 관리사무소나 입주자대표회의를 통해 확인할 항목입니다.'}
                </p>
              )}
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
