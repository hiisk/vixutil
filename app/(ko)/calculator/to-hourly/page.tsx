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

/* 최저시급은 lib/minimum-wage.ts 하나에서 온다 — 해마다 바뀌므로 사본을 두지 않는다 */
import { MIN_HOURLY_WAGE as MIN_WAGE_2026 } from '@/lib/minimum-wage';
import { monthlyHours as statutoryMonthlyHours } from '@/lib/statutory-hours';
const fmt = (n: number) => Math.round(n).toLocaleString();

export default function ToHourlyPage() {
  const [monthly, setMonthly] = useState('3000000');
  const [weeklyHours, setWeeklyHours] = useState('40');
  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: null | {
    hourly: number; daily: number; monthlyHours: number; vsMin: number;
  } = ((): null | {
    hourly: number; daily: number; monthlyHours: number; vsMin: number;
  } => {
    const m = Number(monthly);
    const w = Number(weeklyHours);
    if (m <= 0 || w <= 0) return null;

    // 주휴시간은 lib/statutory-hours.ts에서 온다 — 여기 적어 두었을 때 주 44시간이 229h로 나와
    // 선택지 라벨(월 226h)과 어긋났다
    const monthlyHours = statutoryMonthlyHours(w);
    const hourly = m / monthlyHours;
    return ({
      hourly,
      daily: hourly * 8,
      monthlyHours: Math.round(monthlyHours),
      vsMin: ((hourly - MIN_WAGE_2026) / MIN_WAGE_2026) * 100,
    });
  
    return null;
  })();



  return (
    <CalcShell
      path="/calculator/to-hourly"
      title="시급 계산기"
      description="월급을 시급으로 환산"
      intro={
        <>
          <h2>월급을 209로 나눕니다</h2>
          <p>
            시급 환산의 기준이 되는 <strong>209시간</strong>은 주 40시간에 <strong>주휴 8시간</strong>을
            더해 월로 환산한 값(48 × 365 ÷ 7 ÷ 12)입니다. 한 달을 4주로 보고 160시간으로 나누면
            시급이 실제보다 높게 나옵니다.
          </p>
          <h2>최저임금 위반 여부를 볼 때</h2>
          <p>
            월급제라도 시급으로 환산했을 때 <strong>최저시급(2026년 10,320원)</strong>에 못 미치면
            안 됩니다. 다만 최저임금에 산입되는 임금의 범위가 법으로 정해져 있어서, 상여금이나
            복리후생비가 섞인 급여 구조라면 단순 나눗셈만으로 판단하기 어렵습니다.
          </p>
          <h2>소정근로시간이 다르면 209가 아닙니다</h2>
          <p>
            주 40시간보다 적게 일하기로 계약했다면 그에 맞는 시간으로 나눠야 합니다. 연장근로수당은
            여기서 나온 시급이 아니라 <strong>통상시급</strong>을 기준으로 계산하는데, 통상임금에
            포함되는 항목이 따로 있어 총급여와는 다릅니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>월급 (원)</Label>
              <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
                placeholder="예: 3,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>주 소정근로시간</Label>
              <select value={weeklyHours} onChange={e => setWeeklyHours(e.target.value)} className={inputCls}>
                <option value="40">40시간 (법정 전일제 — 월 209h)</option>
                <option value="35">35시간 (월 183h)</option>
                <option value="44">44시간 (월 226h)</option>
                <option value="20">20시간 (월 104h)</option>
              </select>
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">시급</p>
              <p className="stat-value">{fmt(result.hourly)}원</p>
              <p className={`text-sm mt-1 ${result.vsMin >= 0 ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                최저시급 대비 {result.vsMin >= 0 ? '+' : ''}{result.vsMin.toFixed(1)}%
                ({result.vsMin >= 0 ? '기준 이상' : '최저시급 미달 ⚠️'})
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="일급 (8시간)" value={`${fmt(result.daily)}원`} />
              <SummaryCard label="월 소정근로시간" value={`${result.monthlyHours}시간`} />
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                2026년 최저시급: {MIN_WAGE_2026.toLocaleString()}원 · 주 {weeklyHours}시간 기준 월 {result.monthlyHours}시간 적용
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
