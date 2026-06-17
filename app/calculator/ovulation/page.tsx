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
    <CalcShell title="배란일 계산기" description="마지막 생리일 기준 배란일·가임기 계산">
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
                  { label: '다음 생리 예정일', value: formatDate(result.nextPeriod), color: 'text-slate-800' },
                  { label: '가임기 시작', value: formatDate(result.fertilityStart), color: 'text-emerald-600' },
                  { label: '가임기 종료', value: formatDate(result.fertilityEnd), color: 'text-emerald-600' },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3.5 flex justify-between text-sm">
                    <span className="text-slate-500">{r.label}</span>
                    <span className={`font-bold ${r.color}`}>{r.value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-red-400 font-semibold mb-1">⚠ 주의사항</p>
              <p className="text-xs text-slate-500 leading-relaxed">
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
