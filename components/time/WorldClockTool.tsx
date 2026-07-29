'use client';
import { useState } from 'react';
import {
  CITIES, DEFAULT_CITY_IDS, dateIn, dayPart, DAY_PART_LABEL, findCity, hourIn, offsetHours, timeIn,
} from '@/lib/cities';
import { CARD, useMounted, useNow } from './ui';

const TONE: Record<string, string> = {
  night: 'bg-slate-900 text-white',
  morning: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
  work: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200',
  evening: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200',
};

export default function WorldClockTool() {
  const [ids, setIds] = useState<string[]>(DEFAULT_CITY_IDS);
  const mounted = useMounted();
  const now = useNow(true, 1000);

  const toggle = (id: string) =>
    setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return (
    <div>
      <div className="flex flex-col gap-2">
        {ids.map(id => {
          const c = findCity(id);
          if (!c) return null;
          const hour = mounted && now ? hourIn(c.zone, now) : 12;
          const part = dayPart(hour);
          const diff = mounted && now ? offsetHours(c.zone, 'Asia/Seoul', now) : 0;
          return (
            <div key={id} className={`rounded-2xl px-4 py-3.5 flex items-center gap-3 ${TONE[part]}`}>
              <span className="text-2xl shrink-0">{c.flag}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black">{c.city}</span>
                <span className="block text-[11px] opacity-70">
                  {mounted && now ? dateIn(c.zone, now) : '—'} · {DAY_PART_LABEL[part]}
                  {diff !== 0 && ` · 서울보다 ${diff > 0 ? `${diff}시간 빠름` : `${-diff}시간 느림`}`}
                </span>
              </span>
              <span className="text-xl font-black tabular-nums shrink-0">
                {mounted && now ? timeIn(c.zone, now) : '--:--:--'}
              </span>
            </div>
          );
        })}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">도시 추가·제거</p>
        <div className="flex flex-wrap gap-1.5">
          {CITIES.map(c => (
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
          카드 색은 그곳의 시간대를 뜻합니다 — 초록은 업무 시간, 검정은 한밤중입니다. 연락하기 전에
          색만 봐도 지금 보내도 되는지 알 수 있습니다. 서머타임은 브라우저가 각 나라의 규칙을 알고 있어
          자동으로 반영됩니다.
        </p>
      </div>
    </div>
  );
}
