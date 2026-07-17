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
    <CalcShell path="/calculator/to-hourly" title="시급 계산기" description="월급을 시급으로 환산">
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
