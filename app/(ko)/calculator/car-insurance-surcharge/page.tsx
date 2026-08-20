'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import {
  ACCIDENT_KINDS, calcSurcharge, SURCHARGE_YEARS,
  type AccidentKind, type SurchargeResult,
} from '@/lib/car-insurance-surcharge';

const won = (n: number) => n.toLocaleString('ko-KR');

export default function SurchargePage() {
  const [premium, setPremium] = useState('80');
  const [kind, setKind] = useState<AccidentKind>('property-big');
  const [noClaim, setNoClaim] = useState('5');
  const [repair, setRepair] = useState('150');
  const [result, setResult] = useState<SurchargeResult | null>(null);

  function calculate() {
    setResult(calcSurcharge(
      (Number(premium) || 0) * 10000,
      kind,
      Number(noClaim) || 0,
      (Number(repair) || 0) * 10000,
    ));
  }

  return (
    <CalcShell
      path="/calculator/car-insurance-surcharge"
      title="자동차 보험 할증 계산기"
      description="사고 뒤 3년간 더 낼 보험료를 계산해 자비 처리와 비교합니다"
      intro={
        <>
          <h2>진짜 물음은 「보험으로 할까, 자비로 낼까」입니다</h2>
          <p>
            작은 접촉사고에서 사람들이 실제로 고민하는 것은 수리비가 아니라 <strong>앞으로
            3년간 더 낼 보험료</strong>입니다. 그런데 그 3년치를 아무도 계산해 주지 않아,
            대개 감으로 정하게 됩니다. 이 계산기는 둘을 나란히 놓고 손익분기 수리비를 냅니다.
          </p>
          <h2>오르는 이유가 둘인데 따로 놉니다</h2>
          <p>
            하나는 <strong>할증등급</strong>입니다. 사고 내용에 따라 점수가 매겨지고 1점당
            대략 6.8%가 오릅니다. 다른 하나는 <strong>무사고 할인 소멸</strong>입니다.
            그동안 쌓은 할인이 끊기고 3년에 걸쳐 다시 쌓아야 하는데, 사람들이 놓치는 것은
            대개 이쪽입니다. 오래 무사고였던 사람일수록 사고 한 번이 더 아픈 이유입니다.
          </p>
          <h2>회사마다 다릅니다</h2>
          <p>
            보험료율은 회사·담보·연령·차종에 따라 크게 갈립니다. 여기 값은 업계에서 흔히
            쓰이는 <strong>근사치</strong>이고, 정확한 금액은 보험사 견적으로만 알 수 있습니다.
            판단의 방향을 잡는 데 쓰세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="지금 상황" />
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>연 보험료 (만원)</Label>
                <input type="number" value={premium} onChange={e => setPremium(e.target.value)} min="0" className={inputCls} />
              </div>
              <div>
                <Label>무사고 햇수</Label>
                <input type="number" value={noClaim} onChange={e => setNoClaim(e.target.value)} min="0" max="20" className={inputCls} />
              </div>
            </div>
            <div>
              <Label>사고 유형</Label>
              <select value={kind} onChange={e => setKind(e.target.value as AccidentKind)} className={selectCls}>
                {ACCIDENT_KINDS.map(k => (
                  <option key={k.id} value={k.id}>{k.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>수리비 (만원)</Label>
              <input type="number" value={repair} onChange={e => setRepair(e.target.value)} min="0" className={inputCls} />
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>할증 계산</PrimaryBtn>

        {result && (
          <>
            <SummaryGrid>
              <SummaryCard
                label={`${SURCHARGE_YEARS}년간 더 내는 보험료`}
                value={`${won(Math.round(result.totalExtra / 10000))}만원`}
                variant="primary"
              />
              <SummaryCard label="등급 하락 몫" value={`${won(Math.round(result.fromPoints / 10000))}만원`} />
              <SummaryCard label="무사고 할인 소멸 몫" value={`${won(Math.round(result.fromNoClaim / 10000))}만원`} />
              <SummaryCard
                label="손익분기 수리비"
                value={`${won(Math.round(result.breakEvenRepair / 10000))}만원`}
              />
              <SummaryCard
                label="이 수리비라면"
                value={result.verdict === 'self' ? '자비가 이득' : '보험이 이득'}
                variant={result.verdict === 'self' ? 'green' : 'default'}
              />
            </SummaryGrid>

            <Card className="p-5">
              <CardHeader title="해마다 얼마씩" />
              <div className="kv-table">
                {result.years.map(y => (
                  <div key={y.year} className="kv-row">
                    <span>{y.year}년차</span>
                    <span className="tabular-nums font-bold">
                      {won(Math.round(y.premium / 10000))}만원
                      <span className="ml-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                        +{won(Math.round(y.extra / 10000))}만원
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="note mt-3">
                할증등급은 3년 내내 같은 비율로 붙고, 무사고 할인은 해마다 조금씩 회복합니다.
                그래서 1년차가 가장 비싸고 뒤로 갈수록 줄어듭니다.
              </p>
            </Card>

            <p className="note-warn">
              보험료율은 회사·담보·연령·차종에 따라 크게 다릅니다. 여기 값은 근사치이고,
              실제 금액은 보험사 견적으로만 알 수 있습니다. 또 자비로 처리하기로 했다면
              사고 접수 전에 정해야 합니다 — 접수 뒤 취소해도 기록이 남는 경우가 있습니다.
            </p>
          </>
        )}
      </div>
    </CalcShell>
  );
}
