'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid, TableWrap,
} from '@/components/CalcShell';
import { calcAnnualLeave, LEAVE_RULES, type AnnualLeaveResult } from '@/lib/annual-leave';

/** 입사일과 기준일 사이의 완성된 근속연수와 개월 수 */
function tenureFrom(joinDate: string, baseDate: string): { years: number; months: number } | null {
  const join = new Date(joinDate);
  const base = new Date(baseDate);
  if (Number.isNaN(join.getTime()) || Number.isNaN(base.getTime()) || base < join) return null;

  let months =
    (base.getFullYear() - join.getFullYear()) * 12 + (base.getMonth() - join.getMonth());
  if (base.getDate() < join.getDate()) months -= 1; // 아직 그 달의 근무일에 도달하지 않았다

  return { years: Math.floor(months / 12), months: Math.max(0, months) };
}

const today = () => new Date().toISOString().slice(0, 10);

export default function AnnualLeavePage() {
  const [joinDate, setJoinDate] = useState('');
  const [baseDate, setBaseDate] = useState(today);
  const [result, setResult] = useState<(AnnualLeaveResult & { years: number; months: number }) | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    if (!joinDate) { setError('입사일을 입력해 주세요.'); setResult(null); return; }
    const t = tenureFrom(joinDate, baseDate || today());
    if (!t) { setError('기준일은 입사일보다 뒤여야 합니다.'); setResult(null); return; }
    setError('');
    setResult({ ...calcAnnualLeave(t.years, t.months), years: t.years, months: t.months });
  }

  // 근속연수별 연차 일수 표 — 내 위치를 한눈에 보여준다
  const table = Array.from({ length: 12 }, (_, i) => {
    const y = i + 1;
    return { year: y, days: calcAnnualLeave(y).days };
  });

  return (
    <CalcShell
      path="/calculator/annual-leave"
      title="연차 계산기"
      description="입사일을 넣으면 근로기준법 기준 연차 발생일수를 계산합니다."
      intro={
        <>
          <h2>근로기준법 제60조 기준</h2>
          <p>
            1년간 <strong>80% 이상 출근</strong>하면 15일의 유급휴가가 생깁니다. 계속근로 1년 미만이거나
            출근율이 80%에 못 미치면 <strong>1개월 개근할 때마다 1일씩, 최대 11일</strong>입니다.
            3년 이상 계속 근무하면 최초 1년을 초과하는 <strong>매 2년마다 1일씩 가산</strong>되고,
            총 한도는 25일입니다.
          </p>
          <h2>회사가 마음대로 줄일 수 없습니다</h2>
          <p>
            연차 일수는 법에 정해져 있어서 회사 규모나 업종에 따라 달라지지 않습니다. 다만{' '}
            <strong>부여 시점</strong>은 다를 수 있습니다. 입사일 기준 대신 회계연도(보통 1월 1일) 기준으로
            운영하는 회사가 많은데, 이 경우 중간에 입사한 사람은 첫 해에 비례 계산으로 받습니다.
            실제 부여일수는 취업규칙을 확인하세요. 법정 기준보다 적게 주는 것은 안 되지만 더 주는 것은 됩니다.
          </p>
          <h2>안 쓴 연차는 어떻게 되나요</h2>
          <p>
            원칙적으로 미사용 연차는 <strong>연차수당</strong>으로 정산받습니다. 다만 회사가 법에 정해진 절차대로{' '}
            <strong>연차사용촉진</strong>을 했다면 수당 지급 의무가 없어질 수 있습니다. 수당 금액이 궁금하다면{' '}
            연차수당 계산기를 쓰세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>입사일</Label>
              <input
                type="date"
                value={joinDate}
                onChange={e => setJoinDate(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label>기준일 (이 날짜 시점의 연차)</Label>
              <input
                type="date"
                value={baseDate}
                onChange={e => setBaseDate(e.target.value)}
                className={inputCls}
              />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                비워두면 오늘 기준으로 계산합니다.
              </p>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
          </div>
        </Card>

        {result && (
          <Card>
            <CardHeader
              title="연차 발생일수"
              sub={`근속 ${result.years}년 ${result.months % 12}개월 · 근로기준법 제60조 기준`}
            />
            <div className="p-4">
              <SummaryGrid>
                <SummaryCard
                  label="발생 연차"
                  value={`${result.days}일`}
                  sub={result.underOneYear ? '1개월 개근 시 1일씩' : `기본 ${LEAVE_RULES.base}일 + 가산 ${result.bonus}일`}
                  variant="primary"
                />
                <SummaryCard
                  label="근속 기간"
                  value={`${result.years}년 ${result.months % 12}개월`}
                  sub={`총 ${result.months}개월`}
                />
                <SummaryCard
                  label="가산 일수"
                  value={result.underOneYear ? '해당 없음' : `${result.bonus}일`}
                  sub={result.underOneYear ? '1년 근속 후부터' : '3년차부터 2년마다 1일'}
                />
                <SummaryCard
                  label={result.capped ? '법정 상한 도달' : '다음 증가 시점'}
                  value={result.capped ? `${LEAVE_RULES.cap}일` : `${result.nextIncreaseYear}년차`}
                  sub={result.capped ? '더 늘지 않습니다' : `${calcAnnualLeave(result.nextIncreaseYear ?? 1).days}일로 증가`}
                  variant={result.capped ? 'green' : 'default'}
                />
              </SummaryGrid>
            </div>

            {result.underOneYear && (
              <div className="px-5 pb-5">
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-xl p-4">
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-1">
                    아직 1년 미만 근속입니다
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                    1년 미만이면 <strong>1개월을 개근할 때마다 1일</strong>씩, 최대 {LEAVE_RULES.underOneYearMax}일까지 발생합니다.
                    현재 {result.months}개월 근무해 {result.days}일이 발생했습니다.
                    입사 1년이 되면 별도로 {LEAVE_RULES.base}일이 새로 생깁니다.
                  </p>
                </div>
              </div>
            )}

            <div className="px-5 pb-5">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">근속연수별 연차 일수</p>
              <TableWrap>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 font-semibold">근속연수</th>
                      <th className="text-right py-2 px-3 font-semibold">연차 일수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map(row => {
                      const isMine = !result.underOneYear && row.year === result.years;
                      return (
                        <tr
                          key={row.year}
                          className={`border-b border-slate-100 dark:border-slate-800 last:border-0 ${isMine ? 'bg-blue-50 dark:bg-blue-950/30 dark:bg-blue-950/50 font-bold text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'}`}
                        >
                          <td className="py-2 px-3">
                            {row.year}년차{isMine && ' ← 내 위치'}
                          </td>
                          <td className="text-right py-2 px-3">{row.days}일</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </TableWrap>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                이후로도 2년마다 1일씩 늘어 21년차에 법정 상한 {LEAVE_RULES.cap}일에 도달합니다.
              </p>
            </div>
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
