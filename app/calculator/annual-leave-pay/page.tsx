'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard, TableWrap,
} from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

/** 근속연수에 따른 연차 발생일수 */
function calcLeaveDays(years: number): number {
  if (years < 1) return Math.min(11, Math.floor(years * 12)); // 월 1일, 최대 11일
  if (years === 1) return 15;
  // 2년마다 +1일, 최대 25일
  const extra = Math.floor((years - 1) / 2);
  return Math.min(25, 15 + extra);
}

interface Result {
  dailyWage: number;
  leaveDays: number;
  totalPay: number;
}

export default function AnnualLeavePayPage() {
  const [mode, setMode] = useState<'monthly' | 'direct'>('monthly');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [directDailyWage, setDirectDailyWage] = useState('');
  const [yearsOfService, setYearsOfService] = useState('');
  const [unusedDays, setUnusedDays] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const years = Number(yearsOfService);
    const unused = Number(unusedDays);
    if (years < 0 || unused < 0) return;

    let dailyWage: number;
    if (mode === 'monthly') {
      const monthly = Number(monthlySalary);
      if (!monthly) return;
      dailyWage = (monthly / 209) * 8;
    } else {
      const direct = Number(directDailyWage);
      if (!direct) return;
      dailyWage = direct;
    }

    const leaveDays = calcLeaveDays(years);
    const totalPay = dailyWage * unused;

    setResult({ dailyWage, leaveDays, totalPay });
  }

  // 연차 발생일수표 (1~15년)
  const leaveTable = Array.from({ length: 15 }, (_, i) => ({
    years: i + 1,
    days: calcLeaveDays(i + 1),
  }));

  return (
    <CalcShell path="/calculator/annual-leave-pay" title="연차수당 계산기" description="근속연수·미사용 연차 → 연차수당">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">통상임금 입력 방식</p>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setMode('monthly')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                mode === 'monthly'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              월 기본급으로 계산
            </button>
            <button
              type="button"
              onClick={() => setMode('direct')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                mode === 'direct'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              1일 통상임금 직접 입력
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {mode === 'monthly' ? (
              <div>
                <Label>월 기본급 (원)</Label>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={e => setMonthlySalary(e.target.value)}
                  placeholder="예: 3,000,000"
                  className={inputCls}
                />
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">1일 통상임금 = 월 기본급 ÷ 209 × 8</p>
              </div>
            ) : (
              <div>
                <Label>1일 통상임금 (원)</Label>
                <input
                  type="number"
                  value={directDailyWage}
                  onChange={e => setDirectDailyWage(e.target.value)}
                  placeholder="예: 114,833"
                  className={inputCls}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>근속연수 (년)</Label>
                <input
                  type="number"
                  value={yearsOfService}
                  onChange={e => setYearsOfService(e.target.value)}
                  placeholder="예: 3"
                  className={inputCls}
                />
              </div>
              <div>
                <Label>미사용 연차일수 (일)</Label>
                <input
                  type="number"
                  value={unusedDays}
                  onChange={e => setUnusedDays(e.target.value)}
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
            <SummaryGrid>
              <SummaryCard
                label="1일 통상임금"
                value={`${fmt(result.dailyWage)}원`}
              />
              <SummaryCard
                label="연차 발생일수 (근속기준)"
                value={`${result.leaveDays}일`}
                sub={`근속 ${yearsOfService}년 기준`}
              />
              <SummaryCard
                label="미사용 연차일수"
                value={`${unusedDays}일`}
              />
              <SummaryCard
                label="연차수당 합계"
                value={`${fmt(result.totalPay)}원`}
                variant="primary"
              />
            </SummaryGrid>
          </>
        )}

        <Card>
          <CardHeader title="근속연수별 연차 발생일수표" sub="1~15년 기준" />
          <TableWrap>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">근속연수</th>
                  <th className="px-4 py-2.5 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">연차 발생일수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leaveTable.map(row => (
                  <tr
                    key={row.years}
                    className={`${result && Number(yearsOfService) === row.years ? 'bg-blue-50 dark:bg-blue-950/30' : ''}`}
                  >
                    <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{row.years}년</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-slate-800 dark:text-slate-100">
                      {row.days}일
                      {result && Number(yearsOfService) === row.years && (
                        <span className="ml-1.5 text-xs text-blue-600 font-bold">← 현재</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
          <div className="px-4 py-3 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800">
            * 1년 미만: 월 1일 (최대 11일) / 1년: 15일 / 이후 2년마다 1일 추가 (최대 25일)
          </div>
        </Card>
      </div>
    </CalcShell>
  );
}
