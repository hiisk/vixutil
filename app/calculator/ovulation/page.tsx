'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
}

export default function OvulationPage() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycle, setCycle] = useState('28');
  const [periodDays, setPeriodDays] = useState('5');
  const [result, setResult] = useState<null | {
    nextPeriod: Date; ovulation: Date; fertilityStart: Date; fertilityEnd: Date; safeEnd: Date;
  }>(null);

  function calculate() {
    if (!lastPeriod) return;
    const last = new Date(lastPeriod);
    const c = Number(cycle);
    const pd = Number(periodDays);

    const nextPeriod = addDays(last, c);
    const ovulation = addDays(nextPeriod, -14);
    const fertilityStart = addDays(ovulation, -5);
    const fertilityEnd = addDays(ovulation, 1);
    const safeEnd = addDays(last, pd);

    setResult({ nextPeriod, ovulation, fertilityStart, fertilityEnd, safeEnd });
  }

  return (
    <CalcShell
      path="/calculator/ovulation"
      title="배란일 계산기"
      description="마지막 생리일 기준 배란일·가임기 계산"
      intro={
        <>
          <h2>피임 목적으로 쓰면 안 됩니다</h2>
          <p>
            <strong>여기서 나오는 &ldquo;안전기&rdquo;는 피임 수단이 아닙니다.</strong> 달력만으로 하는
            주기법은 피임 실패율이 높은 방법으로 알려져 있습니다. 배란은 스트레스·수면·질병·체중 변화로
            쉽게 앞뒤로 밀리고, 예측한 날에 배란이 일어난다는 보장이 없기 때문입니다. 피임이 목적이라면
            반드시 신뢰할 수 있는 피임법을 쓰고 필요하면 의료진과 상의하세요.
          </p>
          <h2>계산 방식</h2>
          <p>
            배란일은 <strong>다음 생리 예정일에서 14일을 뺀 날</strong>로 잡습니다. 배란 후 생리까지의
            기간(황체기)이 사람마다 비교적 일정해서 이렇게 역산합니다. 가임기는 배란일{' '}
            <strong>5일 전부터 1일 후까지</strong>로 봅니다. 정자가 여성의 몸 안에서 며칠 살아남을 수
            있는 반면 난자의 수명은 훨씬 짧기 때문에, 가임기가 배란일 앞쪽으로 길게 잡히는 것입니다.
          </p>
          <h2>주기가 불규칙하면 맞지 않습니다</h2>
          <p>
            이 계산은 <strong>주기가 일정하다는 가정</strong> 위에 있습니다. 주기가 들쭉날쭉하면 다음 생리
            예정일부터 틀리므로 배란일도 함께 어긋납니다. 임신을 계획 중이라면 달력보다{' '}
            <strong>배란테스트기나 기초체온</strong>이 더 정확하고, 주기가 크게 불규칙하다면 원인을 확인할
            겸 진료를 받아보는 것이 좋습니다. 이 계산기는 참고용이며 의학적 조언이 아닙니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>마지막 생리 시작일</Label>
              <input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>생리 주기 (일)</Label>
                <select value={cycle} onChange={e => setCycle(e.target.value)} className={inputCls}>
                  {Array.from({ length: 15 }, (_, i) => i + 21).map(n => (
                    <option key={n} value={n}>{n}일</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>생리 기간 (일)</Label>
                <select value={periodDays} onChange={e => setPeriodDays(e.target.value)} className={inputCls}>
                  {[3,4,5,6,7,8].map(n => (
                    <option key={n} value={n}>{n}일</option>
                  ))}
                </select>
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">배란 예정일</p>
              <p className="text-white text-2xl font-black">{formatDate(result.ovulation)}</p>
            </div>
            <Card>
              <div className="divide-y divide-slate-100">
                {[
                  { label: '다음 생리 예정일', value: formatDate(result.nextPeriod), color: 'text-slate-800 dark:text-slate-100' },
                  { label: '가임기 시작', value: formatDate(result.fertilityStart), color: 'text-emerald-600' },
                  { label: '가임기 종료', value: formatDate(result.fertilityEnd), color: 'text-emerald-600' },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3.5 flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{r.label}</span>
                    <span className={`font-bold ${r.color}`}>{r.value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-red-400 font-semibold mb-1">⚠ 주의사항</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                이 계산기는 평균적인 주기를 기반으로 한 참고용 계산입니다.
                실제 배란일은 개인마다 다를 수 있으며, 의학적 진단이 아닙니다.
                정확한 정보는 전문의와 상담하세요.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
