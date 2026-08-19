'use client';
import { useState } from 'react';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 버튼을 없애 실시간이
 * 되면서 빈 칸으로 열면 폼만 있고 결과가 없는 화면이 된다 — 무엇을 보여 주는
 * 계산기인지 열어 보고도 모른다. 값을 미리 넣어 두면 열자마자 한 벌이 돌아가고
 * 사람은 그 위에 자기 숫자를 덮어쓴다. 값은 내가 지어내지 않고 저자가 이미
 * 골라 둔 예시를 그대로 올렸다.
 */
import CalcShell, { Card, Label, inputCls, SummaryCard } from '@/components/CalcShell';
import { monthlyHours as statutoryMonthlyHours, weeklyHolidayHours } from '@/lib/statutory-hours';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function ParttimePage() {
  const [hourly, setHourly] = useState('10320');
  const [dailyHours, setDailyHours] = useState('4');
  const [weekDays, setWeekDays] = useState('5');

  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: null | {
    weeklyHours: number; hasHoliday: boolean; holidayPay: number;
    daily: number; weeklyBase: number; weeklyTotal: number; monthly: number;
  } = ((): null | {
    weeklyHours: number; hasHoliday: boolean; holidayPay: number;
    daily: number; weeklyBase: number; weeklyTotal: number; monthly: number;
  } => {
    const h = Number(hourly);
    const dh = Number(dailyHours);
    const wd = Number(weekDays);
    if (h <= 0 || dh <= 0) return null;

    const weeklyHours = dh * wd;
    const hasHoliday = weeklyHours >= 15;
    const holidayHours = weeklyHolidayHours(weeklyHours);
    const holidayPay = h * holidayHours;
    const weeklyBase = h * weeklyHours;
    const weeklyTotal = weeklyBase + holidayPay;
    const monthlyHours = statutoryMonthlyHours(weeklyHours);

    return ({
      weeklyHours,
      hasHoliday,
      holidayPay,
      daily: h * dh,
      weeklyBase,
      weeklyTotal,
      monthly: Math.round(h * monthlyHours),
    });
  
    return null;
  })();


  return (
    <CalcShell
      path="/calculator/parttime"
      title="알바 급여 계산기"
      description="시급·근무시간 기준 주급·월급 계산"
      intro={
        <>
          <h2>주휴수당까지 넣어서 계산합니다</h2>
          <p>
            아르바이트도 <strong>주 15시간 이상</strong> 일하면 주휴수당을 받습니다. 시급제라서 안 준다거나
            아르바이트는 대상이 아니라는 말은 맞지 않습니다. 이 계산기는 주휴수당을 포함한 금액을 보여주므로,
            사장님이 말한 금액과 다르다면 주휴수당이 빠졌을 가능성이 큽니다.
          </p>
          <h2>월급 환산에 365 ÷ 7 ÷ 12를 씁니다</h2>
          <p>
            한 달을 4주로 잡으면 실제보다 적게 나옵니다. 1년은 52주가 조금 넘어서 한 달 평균이{' '}
            <strong>약 4.35주</strong>이기 때문입니다. 주급에 4를 곱한 값과 이 계산기 결과가 다른 이유입니다.
          </p>
          <h2>알바도 최저임금과 근로계약서 대상입니다</h2>
          <p>
            <strong>근로계약서를 쓰지 않는 것 자체가 위반</strong>이고, 5인 미만 사업장이어도 최저임금과
            주휴수당은 지켜야 합니다. 다만 연장·야간·휴일 <strong>가산수당</strong>은 5인 미만 사업장에
            적용되지 않으므로 본인이 일하는 곳의 규모를 알아둘 필요가 있습니다. 이 계산기는 세전 기준이며,
            근무 형태에 따라 4대보험 가입 여부가 갈립니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>시급 (원)</Label>
              <input type="number" value={hourly} onChange={e => setHourly(e.target.value)}
                placeholder="예: 10,320" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>일 근무시간</Label>
                <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} className={inputCls}>
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n}>{n}시간</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>주 근무일수</Label>
                <select value={weekDays} onChange={e => setWeekDays(e.target.value)} className={inputCls}>
                  {[1,2,3,4,5,6,7].map(n => (
                    <option key={n} value={n}>{n}일</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-2xl p-5 ${result.hasHoliday ? 'bg-blue-600' : 'bg-slate-700'}`}>
              <p className="text-blue-200 text-xs mb-1">월 급여 (주휴 {result.hasHoliday ? '포함' : '미포함'})</p>
              <p className="text-white text-3xl font-black">{fmt(result.monthly)}원</p>
              {result.hasHoliday
                ? <p className="text-blue-200 text-sm mt-1">주 {result.weeklyHours}h → 주휴수당 발생</p>
                : <p className="text-red-300 text-sm mt-1">주 {result.weeklyHours}h · 주 15h 미만으로 주휴수당 미발생</p>
              }
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="일급" value={`${fmt(result.daily)}원`} />
              <SummaryCard label="주급 (기본)" value={`${fmt(result.weeklyBase)}원`} />
              {result.hasHoliday && (
                <SummaryCard label="주휴수당" value={`+${fmt(result.holidayPay)}원`} variant="green" />
              )}
              <SummaryCard label="주급 합계" value={`${fmt(result.weeklyTotal)}원`} variant={result.hasHoliday ? 'primary' : 'default'} />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
