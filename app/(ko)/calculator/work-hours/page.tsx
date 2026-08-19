'use client';
import { useState } from 'react';
import CalcShell, { Card } from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

/**
 * 출퇴근 시각에서 근무시간을 뺀다.
 *
 * 자정을 넘기는 야간 근무가 있으므로, 퇴근이 출근보다 이르면 하루를 더한다.
 * 휴게시간은 근로기준법이 정한 최소치(4시간에 30분, 8시간에 1시간)를 기본값으로
 * 두되 입력해서 바꿀 수 있게 한다 — 실제 휴게는 사업장마다 다르다.
 */
function minutesOf(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

const fmt = (mins: number) => `${Math.floor(mins / 60)}시간 ${mins % 60}분`;

/** 근로기준법이 정한 최소 휴게 — 4시간에 30분, 8시간에 1시간 */
function legalBreak(workMins: number): number {
  if (workMins >= 480) return 60;
  if (workMins >= 240) return 30;
  return 0;
}

export default function WorkHoursPage() {
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('18:00');
  const [breakMin, setBreakMin] = useState('');

  const s = minutesOf(start);
  const e = minutesOf(end);

  const result = (() => {
    if (s === null || e === null) return null;
    // 퇴근이 출근보다 이르면 자정을 넘긴 것으로 본다
    const span = e >= s ? e - s : e + 24 * 60 - s;
    const suggested = legalBreak(span);
    const br = breakMin === '' ? suggested : Math.max(0, Number(breakMin));
    const work = Math.max(0, span - br);
    return { span, br, suggested, work, overnight: e < s };
  })();

  const overtime = result ? Math.max(0, result.work - 480) : 0;

  return (
    <CalcShell
      path="/calculator/work-hours"
      title="근무시간 계산기"
      description="출퇴근 시각으로 하루 근무시간과 휴게시간을 계산합니다"
      intro={
        <>
          <h2>휴게시간은 근무시간에서 빠집니다</h2>
          <p>
            아홉 시에 출근해 여섯 시에 퇴근하면 회사에 머문 시간은 아홉 시간이지만, 점심 한 시간은
            근무시간이 아닙니다. 그래서 흔히 말하는 <strong>&ldquo;하루 8시간&rdquo;</strong>이 나옵니다.
            급여와 연장수당은 모두 휴게를 뺀 시간으로 셈합니다.
          </p>
          <h2>법이 정한 최소 휴게</h2>
          <p>
            근로기준법은 근로시간이 <strong>4시간이면 30분 이상</strong>,{' '}
            <strong>8시간이면 1시간 이상</strong>의 휴게를 근로시간 도중에 주도록 정하고 있습니다.
            이 계산기는 그 최소치를 기본값으로 넣어 두고, 실제 휴게가 다르면 직접 고칠 수 있게 했습니다.
          </p>
          <h2>자정을 넘기는 근무</h2>
          <p>
            퇴근 시각이 출근보다 이르면 자정을 넘긴 것으로 보고 계산합니다. 다만 밤 10시부터 다음 날
            6시 사이의 야간근로에는 가산수당이 따로 붙으므로, 금액은 야근수당 계산기에서 확인하세요.
          </p>
          <h2>이 숫자는 하루치입니다</h2>
          <p>
            주 단위 한도(법정근로 40시간, 연장 포함 52시간)는 하루치를 합쳐서 봐야 합니다. 하루가
            8시간을 넘으면 그만큼이 연장근로로 잡히며, 이 계산기는 그 초과분을 따로 보여 줍니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangPicker current="ko" route="/calculator/work-hours" available={ALL_LOCALES10} />
        </div>
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">출근</label>
              <input
                type="time"
                value={start}
                onChange={e2 => setStart(e2.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-lg font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">퇴근</label>
              <input
                type="time"
                value={end}
                onChange={e2 => setEnd(e2.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-lg font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              휴게시간(분){result && breakMin === '' && <span className="font-normal"> — 비우면 법정 최소 {result.suggested}분</span>}
            </label>
            <input
              type="number"
              value={breakMin}
              onChange={e2 => setBreakMin(e2.target.value)}
              placeholder={result ? String(result.suggested) : '60'}
              min={0}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-lg font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri text-center">
              <p className="stat-sub mb-2">근무시간</p>
              <p className="text-slate-900 dark:text-slate-50 text-5xl font-black">{fmt(result.work)}</p>
              {result.overnight && <p className="stat-sub mt-3">자정을 넘긴 근무로 계산했습니다</p>}
            </div>

            <Card>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">회사에 머문 시간</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{fmt(result.span)}</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">휴게시간</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{result.br}분</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">8시간 초과분</span>
                  <span className={`font-semibold ${overtime > 0 ? 'text-orange-600' : 'text-slate-800 dark:text-slate-100'}`}>
                    {overtime > 0 ? fmt(overtime) : '없음'}
                  </span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">주 5일 환산</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{fmt(result.work * 5)}</span>
                </div>
              </div>
            </Card>

            {overtime > 0 && (
              <Card className="p-5 border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-950/30">
                <p className="text-sm text-orange-800 dark:text-orange-200 leading-relaxed">
                  하루 8시간을 넘긴 <strong>{fmt(overtime)}</strong>은 연장근로입니다. 연장근로에는 통상임금의
                  50% 이상을 더해 지급해야 하며, 주 단위로도 한도가 있으니 합계를 함께 보세요.
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
