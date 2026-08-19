'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { commonWage, monthlyHours, weeklyHolidayHours } from '@/lib/statutory-hours';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function WorkHours209Page() {
  const [weekly, setWeekly] = useState('40');
  const [pay, setPay] = useState('');
  const [result, setResult] = useState<null | (ReturnType<typeof commonWage> & { holiday: number; raw: number })>(null);

  function calculate() {
    const w = Number(weekly);
    const p = Number(pay);
    if (w <= 0 || w > 68 || p <= 0) return;
    setResult({ ...commonWage(p, w), holiday: weeklyHolidayHours(w), raw: monthlyHours(w) });
  }

  return (
    <CalcShell
      path="/calculator/work-hours-209"
      title="소정근로시간 계산기"
      description="209시간이 나오는 셈과 통상시급·연장수당"
      intro={
        <>
          <h2>209시간은 이렇게 나옵니다</h2>
          <p>
            주 40시간을 일하면 <strong>주휴 8시간</strong>이 붙어 한 주가 48시간입니다. 그것을 한 해로
            펴서(48 × 365 ÷ 7) 열두 달로 나누면 <strong>208.57시간</strong>이 나오고, 근로자에게 불리하지
            않게 올려 209시간을 씁니다. 급여명세서에 늘 보이는 그 수입니다.
          </p>
          <h2>통상시급이 모든 수당의 뿌리입니다</h2>
          <p>
            월 통상임금을 소정근로시간으로 나눈 값이 통상시급이고, <strong>연장·야간·휴일수당이 전부
            여기서 나옵니다</strong>. 그래서 이 수가 틀리면 수당이 통째로 틀립니다. 연장근로는 통상시급의
            1.5배, 밤 10시부터 새벽 6시까지의 야간근로도 1.5배이며, <strong>연장이면서 야간이면 두
            가산이 함께 붙어 2배</strong>가 됩니다.
          </p>
          <h2>주 15시간이 갈림길입니다</h2>
          <p>
            한 주에 15시간 이상 일해야 주휴수당이 붙습니다. 14시간과 15시간 사이에서 월 소정근로시간이
            한 번에 뜁니다 — 단시간 근로에서 시간을 조금 늘리는 것이 크게 유리해지는 자리입니다.
            실수령액까지 보려면{' '}
            <Link href="/calculator/salary" className="underline">실수령액 계산기</Link>를 쓰세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>주 소정근로시간</Label>
              <input type="number" value={weekly} onChange={e => setWeekly(e.target.value)}
                placeholder="예: 40" className={inputCls} min="1" max="68" step="0.5" />
            </div>
            <div>
              <Label>월 통상임금 (원)</Label>
              <input type="number" value={pay} onChange={e => setPay(e.target.value)}
                placeholder="예: 2500000" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">월 소정근로시간</p>
              <p className="stat-value">{result.hoursRounded}시간</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                올리기 전 {result.raw.toFixed(2)}시간 · 통상시급 {fmt(result.hourly)}원
              </p>
            </div>
            <Card>
              <CardHeader title="셈한 과정" />
              <div className="divide-y divide-slate-100">
                {[
                  ['주 소정근로시간', `${weekly}시간`],
                  ['주휴시간', `${result.holiday.toFixed(1)}시간`],
                  ['한 주 합계', `${(Number(weekly) + result.holiday).toFixed(1)}시간`],
                  ['한 달 평균 주수', '4.345주 (365 ÷ 7 ÷ 12)'],
                  ['월 소정근로시간', `${result.raw.toFixed(2)} → ${result.hoursRounded}시간`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <CardHeader title="1시간의 값" />
              <div className="divide-y divide-slate-100">
                {[
                  ['통상시급', result.hourly],
                  ['연장근로 (1.5배)', result.overtime],
                  ['야간근로 (1.5배)', result.night],
                  ['연장이면서 야간 (2배)', result.overtimeNight],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            {result.holiday === 0 && (
              <Card className="p-4">
                <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  주 15시간 미만이라 주휴수당이 붙지 않습니다
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  한 주에 15시간을 채우면 하루치 임금이 주휴수당으로 더해집니다.
                </p>
              </Card>
            )}
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 통상임금에 무엇이 들어가는지는 수당의 성격에 따라 갈립니다 · 정확한 판단은 급여 담당자나 노무사에게 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
