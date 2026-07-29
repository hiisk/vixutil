'use client';
import { useMemo, useState } from 'react';
import { addDays, formatKo, span } from '@/lib/date-calc';
import { CARD, Stat, useMounted, useNow } from './ui';

/** 안정 시 심박수 70회/분으로 잡은 어림값 */
const BEATS_PER_MINUTE = 70;

export default function LivedTool() {
  const [birth, setBirth] = useState('1995-01-01');
  const mounted = useMounted();
  const now = useNow(true, 1000);

  const info = useMemo(() => {
    if (!mounted || !now) return null;
    const from = new Date(`${birth}T00:00:00`);
    if (Number.isNaN(from.getTime()) || from.getTime() > now) return null;
    const s = span(from, new Date(now));

    // 다음 1000일 단위 기념일
    const nextMilestone = (Math.floor(s.totalDays / 1000) + 1) * 1000;
    return {
      ...s,
      from,
      nextMilestone,
      milestoneDate: addDays(from, nextMilestone),
      milestoneLeft: nextMilestone - s.totalDays,
      beats: Math.round((s.totalMinutes * BEATS_PER_MINUTE) / 1000000),
    };
  }, [birth, now, mounted]);

  return (
    <div>
      <label className="block">
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">생년월일</span>
        <input
          type="date"
          value={birth}
          onChange={e => setBirth(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-pink-400"
        />
      </label>

      {info ? (
        <>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white px-6 py-8 text-center">
            <p className="text-sm text-white/70 mb-1">태어난 지</p>
            <p className="text-4xl font-black">
              {info.years}년 {info.months}개월 {info.days}일
            </p>
            <p className="text-sm text-white/80 mt-2 tabular-nums">
              오늘로 {info.totalDays.toLocaleString()}일째
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            <Stat label="주" value={info.weeks.toLocaleString()} accent="text-pink-600" />
            <Stat label="시간" value={info.totalHours.toLocaleString()} />
            <Stat label="분" value={info.totalMinutes.toLocaleString()} />
            <Stat label="초" value={info.totalSeconds.toLocaleString()} accent="text-rose-600" />
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">다가오는 기념일</p>
            <p className="text-lg font-black text-slate-800 dark:text-slate-100">
              {info.nextMilestone.toLocaleString()}일 — {formatKo(info.milestoneDate)}
            </p>
            <p className="text-sm text-pink-600 font-bold mt-1">{info.milestoneLeft}일 남았습니다</p>
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              그동안 심장은 대략 <b className="text-slate-800 dark:text-slate-100">{info.beats.toLocaleString()}백만 번</b> 뛰었습니다
              (안정 시 70회/분으로 계산한 어림값입니다). 잠으로 보낸 시간은 하루 7시간이라면
              약 {Math.round(info.totalHours * 7 / 24 / 24).toLocaleString()}일쯤 됩니다.
            </p>
          </div>
        </>
      ) : (
        <p className="mt-4 text-center text-sm text-slate-400 dark:text-slate-500">
          {mounted ? '오늘보다 앞선 날짜를 넣어 주세요' : '계산 준비 중…'}
        </p>
      )}
    </div>
  );
}
