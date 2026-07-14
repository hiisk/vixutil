'use client';
import { useState } from 'react';
import CalcShell, {
  Card, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard,
} from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

interface Result {
  weeklyHours: number;
  eligible: boolean;
  weeklyHolidayPay: number;
  weeklyPay: number;
  monthlyPay: number;
  monthlyHolidayTotal: number;
}

export default function WeeklyHolidayPage() {
  const [hourlyWage, setHourlyWage] = useState('');
  const [dailyHours, setDailyHours] = useState('');
  const [workDays, setWorkDays] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const wage = Number(hourlyWage);
    const hours = Number(dailyHours);
    const days = Number(workDays);
    if (!wage || !hours || !days) return;

    const weeklyHours = hours * days;
    const eligible = weeklyHours >= 15;

    // 주휴수당: 주40h 이상이면 8×시급, 미만이면 (주당소정근로시간/40)×8×시급
    const weeklyHolidayPay = eligible
      ? (weeklyHours >= 40 ? 8 * wage : (weeklyHours / 40) * 8 * wage)
      : 0;

    const weeklyPay = wage * weeklyHours + weeklyHolidayPay;
    // 월급 = 주급 × (365/12/7)
    const monthlyPay = weeklyPay * (365 / 12 / 7);
    const monthlyHolidayTotal = weeklyHolidayPay * (365 / 12 / 7);

    setResult({ weeklyHours, eligible, weeklyHolidayPay, weeklyPay, monthlyPay, monthlyHolidayTotal });
  }

  return (
    <CalcShell title="주휴수당 계산기" description="시급·주 근무시간 → 주휴수당 및 월 환산 급여">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">근무 조건</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>시급 (원)</Label>
              <input
                type="number"
                value={hourlyWage}
                onChange={e => setHourlyWage(e.target.value)}
                placeholder="예: 10,320"
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>1일 근무시간 (시간)</Label>
                <input
                  type="number"
                  value={dailyHours}
                  onChange={e => setDailyHours(e.target.value)}
                  placeholder="예: 8"
                  className={inputCls}
                />
              </div>
              <div>
                <Label>주 근무일수 (일)</Label>
                <input
                  type="number"
                  value={workDays}
                  onChange={e => setWorkDays(e.target.value)}
                  placeholder="예: 5"
                  className={inputCls}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            {!result.eligible && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 text-sm text-amber-700 dark:text-amber-300 font-semibold">
                ⚠️ 주 {result.weeklyHours}시간 근무 — 주 15시간 미만은 주휴수당 미발생
              </div>
            )}
            <SummaryGrid>
              <SummaryCard
                label="주휴수당"
                value={`${fmt(result.weeklyHolidayPay)}원`}
                sub={result.eligible ? `주 ${result.weeklyHours}h 기준` : '해당없음'}
                variant={result.eligible ? 'primary' : 'default'}
              />
              <SummaryCard
                label="주급 (주휴포함)"
                value={`${fmt(result.weeklyPay)}원`}
              />
              <SummaryCard
                label="월급 (주휴포함)"
                value={`${fmt(result.monthlyPay)}원`}
                sub="365/12/7 환산"
                variant="green"
              />
              <SummaryCard
                label="월 주휴수당 합계"
                value={`${fmt(result.monthlyHolidayTotal)}원`}
              />
            </SummaryGrid>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">계산 내역</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">주당 소정근로시간</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{result.weeklyHours}시간</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">주휴수당 지급 조건</span>
                  <span className={`font-semibold ${result.eligible ? 'text-emerald-600' : 'text-red-500'}`}>
                    {result.eligible ? '충족 (주 15h 이상)' : '미충족 (주 15h 미만)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">시급 × 주 근무시간</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {fmt(Number(hourlyWage) * result.weeklyHours)}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">주휴수당</span>
                  <span className="font-semibold text-blue-600">+{fmt(result.weeklyHolidayPay)}원</span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
