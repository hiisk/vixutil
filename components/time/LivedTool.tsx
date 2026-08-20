'use client';
import { useMemo, useState } from 'react';
import { addDays, span } from '@/lib/date-calc';
import { CARD, Stat, useMounted, useNow } from './ui';
import { LIVED_UI, type TimeLang } from '@/lib/time-ui-intl';

/** 안정 시 심박수 70회/분으로 잡은 어림값 */
const BEATS_PER_MINUTE = 70;

export default function LivedTool({ lang = 'ko' }: { lang?: TimeLang } = {}) {
  const ui = LIVED_UI[lang];
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
        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{ui.birth}</span>
        <input
          type="date"
          value={birth}
          onChange={e => setBirth(e.target.value)}
          className="w-full rounded-xl border chip-off px-3.5 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-pink-400"
        />
      </label>

      {info ? (
        <>
          <div className="mt-4 rounded-lg bg-sec px-6 py-8 text-center">
            <p className="text-sm text-white/70 mb-1">{ui.livedFor}</p>
            <p className="text-4xl font-bold">
              {ui.ymd(info.years, info.months, info.days)}
            </p>
            <p className="text-sm text-white/80 mt-2 tabular-nums">
              {ui.totalToday(info.totalDays.toLocaleString())}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            <Stat label={ui.week} value={info.weeks.toLocaleString()} accent="text-pink-600" />
            <Stat label={ui.hour} value={info.totalHours.toLocaleString()} />
            <Stat label={ui.minute} value={info.totalMinutes.toLocaleString()} />
            <Stat label={ui.second} value={info.totalSeconds.toLocaleString()} accent="text-rose-600" />
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.milestones}</p>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {ui.milestoneLine(info.nextMilestone.toLocaleString(), info.milestoneDate.toLocaleDateString(ui.locale, { year: 'numeric', month: 'long', day: 'numeric' }))}
            </p>
            <p className="text-sm text-pink-600 font-bold mt-1">{ui.milestoneLeft(info.milestoneLeft)}</p>
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {ui.beatsNote(info.beats.toLocaleString(), Math.round(info.totalHours * 7 / 24 / 24).toLocaleString())}
            </p>
          </div>
        </>
      ) : (
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {mounted ? ui.futureError : ui.computing}
        </p>
      )}
    </div>
  );
}
