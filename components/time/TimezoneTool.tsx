'use client';
import { useMemo, useState } from 'react';
import { CITIES, dayPart, findCity, offsetHours } from '@/lib/cities';
import { CARD, useMounted } from './ui';

/**
 * 시차 계산 — 하루를 통째로 늘어놓는다.
 *
 * "지금 거기 몇 시"만 답하면 회의 시간을 못 잡는다. 24칸을 나란히 놓고 양쪽
 * 모두 업무 시간인 칸을 색으로 드러내면, 잡을 수 있는 시간이 몇 개인지가
 * 한눈에 보인다.
 */
export default function TimezoneTool() {
  const [fromId, setFromId] = useState('seoul');
  const [toId, setToId] = useState('newyork');
  const [hour, setHour] = useState(14);
  const mounted = useMounted();

  const from = findCity(fromId)!;
  const to = findCity(toId)!;

  const diff = useMemo(() => (mounted ? offsetHours(to.zone, from.zone, Date.now()) : 0), [to.zone, from.zone, mounted]);

  const rows = useMemo(() => {
    return Array.from({ length: 24 }, (_, h) => {
      const there = (h + Math.round(diff) + 24) % 24;
      const dayShift = Math.floor((h + Math.round(diff)) / 24);
      return {
        here: h,
        there,
        dayShift,
        both: dayPart(h) === 'work' && dayPart(there) === 'work',
      };
    });
  }, [diff]);

  const converted = (hour + Math.round(diff) + 24) % 24;
  const shift = Math.floor((hour + Math.round(diff)) / 24);
  const overlap = rows.filter(r => r.both);

  const select = (value: string, onChange: (v: string) => void, label: string) => (
    <label className="block">
      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
      >
        {CITIES.map(c => (
          <option key={c.id} value={c.id}>{c.flag} {c.city} ({c.country})</option>
        ))}
      </select>
    </label>
  );

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        {select(fromId, setFromId, '기준 도시')}
        {select(toId, setToId, '상대 도시')}
      </div>

      <div className="mt-4 rounded-2xl bg-slate-900 text-white px-6 py-8 text-center">
        <p className="text-sm text-white/60 mb-1">{from.city} {String(hour).padStart(2, '0')}:00 은</p>
        <p className="text-5xl font-black tabular-nums">
          {String(converted).padStart(2, '0')}:00
        </p>
        <p className="text-sm text-white/70 mt-2">
          {to.city} 기준 {shift > 0 ? '다음 날' : shift < 0 ? '전날' : '같은 날'}
          {mounted && ` · 시차 ${diff > 0 ? '+' : ''}${diff}시간`}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{from.city} 시각</span>
          <span className="text-sm font-black text-indigo-600 tabular-nums">{String(hour).padStart(2, '0')}:00</span>
        </div>
        <input
          type="range" min={0} max={23} value={hour}
          onChange={e => setHour(Number(e.target.value))}
          className="w-full accent-indigo-500" aria-label="기준 시각"
        />
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">
        하루 비교 — 초록 칸은 양쪽 모두 업무 시간입니다 ({overlap.length}시간)
      </p>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {rows.map(r => (
          <button
            key={r.here}
            onClick={() => setHour(r.here)}
            className={`w-full flex items-center gap-3 px-4 py-1.5 text-left border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors ${
              r.here === hour
                ? 'bg-indigo-100 dark:bg-indigo-950/60'
                : r.both
                  ? 'bg-emerald-50 dark:bg-emerald-950/30'
                  : 'bg-white dark:bg-slate-900'
            }`}
          >
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 tabular-nums w-14">
              {String(r.here).padStart(2, '0')}:00
            </span>
            <span className="text-slate-300 dark:text-slate-600 text-xs">→</span>
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 tabular-nums w-14">
              {String(r.there).padStart(2, '0')}:00
            </span>
            {r.dayShift !== 0 && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500">{r.dayShift > 0 ? '다음 날' : '전날'}</span>
            )}
            {r.both && <span className="ml-auto text-[10px] font-bold text-emerald-600">둘 다 업무 시간</span>}
          </button>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          시차는 서머타임이 반영된 실제 값입니다. 미국·유럽은 3월과 11월 사이에 한 시간씩 당겨지므로,
          한 달 뒤 회의라면 그 사이에 서머타임이 바뀌지 않는지 확인하세요.
        </p>
      </div>
    </div>
  );
}
