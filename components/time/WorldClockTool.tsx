'use client';
import { useState } from 'react';
import {
  DEFAULT_CITY_IDS, dateIn, dayPart, DAY_PART_LABEL_INTL, hourIn, offsetHours, timeIn,
  citiesIn, findCityIn, baseZoneFor, findCity,
} from '@/lib/cities';
import { CARD, useMounted, useNow } from './ui';
import { WORLDCLOCK_UI, type TimeLang } from '@/lib/time-ui-intl';

const TONE: Record<string, string> = {
  night: 'bg-slate-900 text-white',
  morning: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
  work: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200',
  evening: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200',
};

export default function WorldClockTool({ lang = 'ko' }: { lang?: TimeLang } = {}) {
  const ui = WORLDCLOCK_UI[lang];
  const cities = citiesIn(lang);
  const partLabel = DAY_PART_LABEL_INTL[lang];
  const [ids, setIds] = useState<string[]>(DEFAULT_CITY_IDS);
  const mounted = useMounted();
  const now = useNow(true, 1000);

  /* 시차 기준. 한국어는 서울(기존 동작), 영어·중국어는 방문자의 시간대를 쓴다 —
     영어권 사용자에게 "서울보다 3시간 빠름"은 알려주는 바가 거의 없다.
     기준 시간대는 마운트 뒤에만 알 수 있으므로 프리렌더에서는 서울로 둔다. */
  const baseZone = mounted ? baseZoneFor(lang) : 'Asia/Seoul';
  const baseLabel = lang === 'ko'
    ? (findCity('seoul')?.city ?? ui.yourTime)
    : ui.yourTime;

  const toggle = (id: string) =>
    setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return (
    <div>
      <div className="flex flex-col gap-2">
        {ids.map(id => {
          const c = findCityIn(lang, id);
          if (!c) return null;
          const hour = mounted && now ? hourIn(c.zone, now) : 12;
          const part = dayPart(hour);
          const diff = mounted && now ? offsetHours(c.zone, baseZone, now) : 0;
          return (
            <div key={id} className={`rounded-2xl px-4 py-3.5 flex items-center gap-3 ${TONE[part]}`}>
              <span className="text-2xl shrink-0">{c.flag}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black">{c.city}</span>
                <span className="block text-[11px] opacity-70">
                  {mounted && now ? dateIn(c.zone, now, lang) : '—'} · {partLabel[part]}
                  {diff !== 0 && ` · ${diff > 0 ? ui.ahead(baseLabel, diff) : ui.behind(baseLabel, -diff)}`}
                </span>
              </span>
              <span className="text-xl font-black tabular-nums shrink-0">
                {mounted && now ? timeIn(c.zone, now, lang) : '--:--:--'}
              </span>
            </div>
          );
        })}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.manage}</p>
        <div className="flex flex-wrap gap-1.5">
          {cities.map(c => (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold border transition-colors ${
                ids.includes(c.id)
                  ? 'border-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {c.flag} {c.city}
            </button>
          ))}
        </div>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
