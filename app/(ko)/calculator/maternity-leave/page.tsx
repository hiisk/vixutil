'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, selectCls, SummaryCard } from '@/components/CalcShell';
import {
  MISCARRIAGE_LEAVE, calcMaternityLeave, calcSpouseLeave, miscarriageLeaveDays,
  monthlyMinimumWage,
} from '@/lib/maternity-leave';

const fmt = (n: number) => Math.round(n).toLocaleString();

type Kind = 'birth' | 'miscarriage' | 'spouse';

export default function MaternityLeavePage() {
  const [kind, setKind] = useState<Kind>('birth');
  const [wage, setWage] = useState('3000000');
  const [multiple, setMultiple] = useState(false);
  const [priorityFirm, setPriorityFirm] = useState(true);
  const [weeks, setWeeks] = useState('20');
  const [weeklyHours, setWeeklyHours] = useState('40');
  /* 고시로 바뀌는 값은 비워 두고, 비어 있으면 lib의 지금 값을 쓴다 */
  const [cap, setCap] = useState('');
  const [floor, setFloor] = useState('');

  const monthlyWage = Number(wage) || 0;
  const hours = Number(weeklyHours) || 40;

  const leave = calcMaternityLeave({
    monthlyWage,
    multiple,
    priorityFirm,
    weeklyHours: hours,
    totalDays: kind === 'miscarriage' ? miscarriageLeaveDays(Number(weeks) || 0) : undefined,
    monthlyCap: Number(cap) > 0 ? Number(cap) : undefined,
    monthlyFloor: Number(floor) > 0 ? Number(floor) : undefined,
  });
  const spouse = calcSpouseLeave({ monthlyWage, weeklyHours: hours });

  return (
    <CalcShell
      path="/calculator/maternity-leave"
      title="출산전후휴가 급여 계산기"
      description="출산전후휴가 90일(다태아 120일) 동안 받는 금액을 구간별로 계산합니다"
      intro={
        <>
          <h2>출산전후휴가와 육아휴직은 다른 제도입니다</h2>
          <p>
            출산전후휴가는 출산을 전후해 쓰는 <strong>90일</strong>(다태아 120일)의 휴가로, 근로기준법이
            정한 것입니다. 육아휴직은 그 뒤에 아이를 돌보기 위해 쓰는 별도의 휴직이고 급여 셈도 다릅니다.
            두 제도를 이어서 쓰는 것이 보통이라 헷갈리기 쉬운데, 이 계산기가 다루는 것은 앞쪽입니다.
            뒤쪽은 <Link href="/calculator/parental-leave">육아휴직 급여 계산기</Link>에서 보세요.
          </p>

          <h2>출산 후에 45일을 남겨 두어야 합니다</h2>
          <p>
            90일을 아무렇게나 나눠 쓸 수 없습니다. 반드시 <strong>출산 후에 45일 이상</strong>이 남아야
            하고(다태아는 60일), 그래서 출산 전에 미리 쓸 수 있는 날은 최대 45일입니다. 출산이 예정보다
            늦어지면 출산 전에 쓴 날이 늘어나므로 뒤쪽 45일을 보장하려면 총 휴가가 90일을 넘게 되는데,
            그 초과분은 무급입니다. 예정일보다 이르게 나올 수 있으니 앞쪽을 다 쓰지 않는 편이 안전합니다.
          </p>

          <h2>앞 60일은 통상임금, 뒤 30일은 상한이 걸립니다</h2>
          <p>
            휴가 중 최초 <strong>60일</strong>(다태아 75일)은 유급이라 통상임금 전액을 보장받습니다.
            우선지원대상기업이면 그 기간의 급여도 고용보험이 상한액까지 대신 주고 회사가 차액을 메우며,
            그 밖의 기업이면 회사가 전액을 냅니다. <strong>어느 쪽이든 근로자가 받는 금액은 같고</strong>{' '}
            누가 부담하는지만 다릅니다. 남은 30일(다태아 45일)은 고용보험이 상한액 한도로만 주고 회사가
            메우지 않으므로, 통상임금이 상한액보다 높으면 그만큼 덜 받습니다.
          </p>

          <h2>지금은 하한액이 상한액보다 높습니다</h2>
          <p>
            하한액은 최저임금에 연동되고 상한액은 따로 고시됩니다. 최저임금이 오르는데 상한액 고시가
            그대로면 <strong>하한이 상한을 넘어섭니다</strong> — 지금이 그런 상태로, 최저시급의 월 환산액이
            상한액 고시보다 큽니다. 이 계산기는 그럴 때 하한을 적용하고 그 사실을 결과에 표시합니다.
            상한·하한 칸을 비워 두면 지금 값을 쓰고, 통지서에 적힌 값이 다르면 직접 넣으세요.
          </p>

          <h2>이 계산의 한계</h2>
          <p>
            <strong>우선지원대상기업 요건은 이 계산기가 판단하지 않습니다</strong> — 업종별 상시근로자 수
            기준이고 사람 수를 세는 규칙도 따로 있어서, 예·아니오로 받습니다. 고용센터에서 확인하세요.
            통상임금이 무엇인지도 회사마다 다툼이 있는 부분입니다(상여·수당의 포함 여부). 실제 지급액은
            신청 시점의 고시와 고용센터 심사로 정해지므로, 여기 나온 값은 <strong>어림</strong>입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>어떤 휴가인가요</Label>
              <select value={kind} onChange={e => setKind(e.target.value as Kind)} className={selectCls}>
                <option value="birth">출산전후휴가</option>
                <option value="miscarriage">유산·사산 휴가</option>
                <option value="spouse">배우자 출산휴가</option>
              </select>
            </div>
            <div>
              <Label>월 통상임금 (원)</Label>
              <input type="number" min="0" value={wage} onChange={e => setWage(e.target.value)}
                className={inputCls} placeholder="휴가 시작일 기준" />
            </div>
            <div>
              <Label>주 소정근로시간</Label>
              <input type="number" min="0" value={weeklyHours} onChange={e => setWeeklyHours(e.target.value)}
                className={inputCls} />
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                하한액과 통상시급을 낼 때 씁니다. 단시간근로자는 하한도 함께 낮아집니다.
              </p>
            </div>

            {kind === 'birth' && (
              <label className="flex cursor-pointer select-none items-center gap-2">
                <input type="checkbox" checked={multiple} onChange={e => setMultiple(e.target.checked)}
                  className="h-4 w-4 accent-blue-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">다태아 (120일·유급 75일)</span>
              </label>
            )}

            {kind === 'miscarriage' && (
              <div>
                <Label>임신기간 (주)</Label>
                <input type="number" min="1" max="45" value={weeks} onChange={e => setWeeks(e.target.value)}
                  className={inputCls} />
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  {MISCARRIAGE_LEAVE.map(m => (Number.isFinite(m.untilWeek)
                    ? `${m.untilWeek}주까지 ${m.days}일`
                    : `그 뒤 ${m.days}일`)).join(' · ')}
                </p>
              </div>
            )}

            {kind !== 'spouse' && (
              <label className="flex cursor-pointer select-none items-center gap-2">
                <input type="checkbox" checked={priorityFirm}
                  onChange={e => setPriorityFirm(e.target.checked)} className="h-4 w-4 accent-blue-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">우선지원대상기업</span>
              </label>
            )}
          </div>
        </Card>

        {kind === 'spouse' ? (
          <>
            <div className="rounded-2xl bg-blue-600 p-5">
              <p className="mb-1 text-xs text-blue-200">배우자 출산휴가 {spouse.days}일 (근로일)</p>
              <p className="text-3xl font-black text-white">{fmt(spouse.total)}원</p>
              <p className="mt-1 text-sm text-blue-200">유급이므로 통상임금 전액입니다</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="통상시급" value={`${fmt(spouse.hourly)}원`} />
              <SummaryCard label="1일 통상임금 (8시간)" value={`${fmt(spouse.dailyWage)}원`} />
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 근로일로 세는 휴가라 월 통상임금 ÷ 30이 아니라 통상시급 × 8시간으로 셈합니다. 고용보험이
                그중 얼마를 회사 대신 주는지는 지원 일수와 상한액이 개정을 거듭해 여기서 세지 않았습니다.
              </p>
            </Card>
          </>
        ) : (
          <>
            <div className="rounded-2xl bg-blue-600 p-5">
              <p className="mb-1 text-xs text-blue-200">
                휴가 {leave.totalDays}일 동안 받는 돈 (유급 {leave.paidDays}일 + 무급 {leave.unpaidDays}일)
              </p>
              <p className="text-3xl font-black text-white">{fmt(leave.total)}원</p>
              <p className="mt-1 text-sm text-blue-200">
                고용보험 {fmt(leave.eiTotal)}원 · 회사 {fmt(leave.employerTotal)}원
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="1일 통상임금" value={`${fmt(leave.dailyWage)}원`} />
              <SummaryCard label="고용보험 30일분" value={`${fmt(leave.eiMonthly)}원`} />
              <SummaryCard label="출산 후 최소 일수" value={`${leave.afterBirthMinDays}일`} />
              <SummaryCard label="통상임금 대비 부족액" value={`${fmt(leave.shortfall)}원`} />
            </div>

            {leave.blocks.length > 0 && (
              <Card className="p-5">
                <CardHeader title="구간별 내역" />
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-500 dark:text-slate-400">
                        <th className="py-1 text-left font-medium">구간</th>
                        <th className="py-1 text-right font-medium">고용보험</th>
                        <th className="py-1 text-right font-medium">회사</th>
                        <th className="py-1 text-right font-medium">받는 돈</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leave.blocks.map(b => (
                        <tr key={b.label}>
                          <td className="py-1">
                            {b.label} <span className="text-slate-400">{b.paid ? '유급' : '무급'}</span>
                          </td>
                          <td className="py-1 text-right">{fmt(b.ei)}원</td>
                          <td className="py-1 text-right">{fmt(b.employer)}원</td>
                          <td className="py-1 text-right font-bold">{fmt(b.total)}원</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {(leave.capped || leave.flooredUp || leave.floorAboveCap) && (
              <Card className="p-4">
                <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-slate-600 dark:text-slate-300">
                  {leave.capped && (
                    <li>
                      통상임금이 상한액({fmt(leave.monthlyCap)}원)보다 높아 무급기간에{' '}
                      {fmt(leave.shortfall)}원이 모자랍니다.
                    </li>
                  )}
                  {leave.flooredUp && (
                    <li>통상임금이 하한액({fmt(leave.monthlyFloor)}원)보다 낮아 하한이 적용됐습니다.</li>
                  )}
                  {leave.floorAboveCap && (
                    <li>
                      하한액({fmt(leave.monthlyFloor)}원)이 상한액({fmt(leave.monthlyCap)}원)보다 큽니다 —
                      최저임금은 올랐는데 상한액 고시가 그대로인 상태입니다. 통지서 값과 다르면 아래에서
                      직접 넣으세요.
                    </li>
                  )}
                </ul>
              </Card>
            )}

            <Card className="p-5">
              <CardHeader title="고시 금액 직접 넣기" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>30일분 상한액 (원)</Label>
                  <input type="number" min="0" value={cap} onChange={e => setCap(e.target.value)}
                    className={inputCls} placeholder="비우면 지금 고시값" />
                </div>
                <div>
                  <Label>30일분 하한액 (원)</Label>
                  <input type="number" min="0" value={floor} onChange={e => setFloor(e.target.value)}
                    className={inputCls} placeholder={`비우면 ${fmt(monthlyMinimumWage(undefined, hours))}원`} />
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                * 상한·하한은 해마다 고시로 바뀝니다. 통지서나 고용보험 안내에 적힌 값이 다르면 그것이
                맞습니다.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
