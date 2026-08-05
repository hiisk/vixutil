'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const MIN_WAGE_2026 = 10_320;
const fmt = (n: number) => Math.round(n).toLocaleString();

export default function ToHourlyPage() {
  const [monthly, setMonthly] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('40');
  const [result, setResult] = useState<null | {
    hourly: number; daily: number; monthlyHours: number; vsMin: number;
  }>(null);

  function calculate() {
    const m = Number(monthly);
    const w = Number(weeklyHours);
    if (m <= 0 || w <= 0) return;

    const holidayHours = w >= 15 ? w / 5 : 0;
    const monthlyHours = (w + holidayHours) * (365 / 7 / 12);
    const hourly = m / monthlyHours;
    setResult({
      hourly,
      daily: hourly * 8,
      monthlyHours: Math.round(monthlyHours),
      vsMin: ((hourly - MIN_WAGE_2026) / MIN_WAGE_2026) * 100,
    });
  }

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
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">시급</p>
              <p className="text-white text-3xl font-black">{fmt(result.hourly)}원</p>
              <p className={`text-sm mt-1 ${result.vsMin >= 0 ? 'text-blue-200' : 'text-red-300'}`}>
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
