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
    <CalcShell
      path="/calculator/annual-leave-pay"
      title="연차수당 계산기"
      description="근속연수·미사용 연차 → 연차수당"
      intro={
        <>
          <h2>계산 방식</h2>
          <p>
            연차수당은 <strong>1일 통상임금 × 미사용 연차 일수</strong>입니다. 1일 통상임금은{' '}
            <strong>월 통상임금 ÷ 209 × 8</strong>로 구합니다. 209는 주 40시간에 주휴 8시간을 더해 월로
            환산한 시간이고, 여기에 하루 8시간을 곱해 하루치를 냅니다.
          </p>
          <h2>연차는 며칠 생기나요</h2>
          <p>
            1년 미만이면 <strong>1개월 개근마다 1일씩 최대 11일</strong>, 1년 이상이면 <strong>15일</strong>
            에서 시작해 3년 이상부터 <strong>2년마다 1일씩</strong> 붙어 최대 25일까지 늘어납니다.
            근로기준법에 정해진 일수라 회사가 임의로 줄일 수 없습니다.
          </p>
          <h2>안 썼다고 무조건 받는 건 아닙니다</h2>
          <p>
            회사가 법에 정해진 절차대로 <strong>연차사용촉진</strong>을 했는데도 근로자가 쓰지 않았다면
            수당 지급 의무가 사라질 수 있습니다. 절차는 서면 통보 시기까지 정해져 있어서, 형식을 지키지
            않은 구두 독려만으로는 인정되지 않습니다. 반대로 회사가 촉진을 하지 않았다면 미사용 연차는
            수당으로 정산받습니다.
          </p>
          <h2>퇴사할 때</h2>
          <p>
            퇴사 시점에 남은 연차는 수당으로 받습니다. 이 <strong>퇴직 전 연차수당은 퇴직금 계산의
            평균임금에도 반영</strong>되므로 퇴직금 계산기에 연차수당을 함께 넣어야 정확합니다.
            5인 미만 사업장은 연차 규정 자체가 적용되지 않습니다.
          </p>
        </>
      }
    >
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
