'use client';
import { useState } from 'react';
import { DONENESS, searMinutes } from '@/lib/food';
import { CARD, NumberField, Stat } from './ui';

export default function SteakTool() {
  const [pick, setPick] = useState('medium-rare');
  const [thickness, setThickness] = useState(2.5);

  const doneness = DONENESS.find(d => d.id === pick)!;
  const minutes = searMinutes(thickness, pick);
  const rest = Math.max(3, Math.round(thickness * 2));

  return (
    <div>
      <div className="flex flex-col gap-2">
        {DONENESS.map(d => (
          <button
            key={d.id}
            onClick={() => setPick(d.id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              pick === d.id
                ? 'border-red-300 bg-red-50 dark:bg-red-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-red-200'
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className={`block text-sm font-black ${pick === d.id ? 'text-red-700 dark:text-red-300' : 'text-slate-800 dark:text-slate-100'}`}>
                {d.name}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{d.desc}</span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block text-lg font-black text-slate-800 dark:text-slate-100 tabular-nums">{d.final}℃</span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500">최종 중심</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 text-white px-6 py-8 text-center">
        <p className="text-sm text-white/70 mb-1">{doneness.name} — 불에서 꺼낼 때</p>
        <p className="text-5xl font-black tabular-nums">{doneness.pull}℃</p>
        <p className="text-sm text-white/80 mt-2">휴지 후 {doneness.final}℃가 됩니다</p>
      </div>

      <div className="mt-4">
        <NumberField label="고기 두께" value={thickness} onChange={setThickness} unit="cm" step={0.5} min={1} />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label="한 면 굽기" value={`약 ${minutes}분`} accent="text-red-600" />
        <Stat label="휴지 시간" value={`${rest}분`} accent="text-rose-600" />
        <Stat label="꺼내는 온도" value={`${doneness.pull}℃`} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">왜 목표보다 낮게 꺼내나요</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          불에서 내린 뒤에도 겉의 열이 안으로 퍼지며 중심 온도가 3~5도 더 오릅니다. 목표 온도에서
          꺼내면 한 단계 더 익은 고기가 됩니다. 꺼낸 뒤 두께의 두 배쯤 되는 시간만큼 쉬게 두면 육즙이
          고기 전체로 퍼져 썰었을 때 흐르지 않습니다.
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          굽는 시간은 팬 온도·고기 온도·기름 양에 따라 크게 달라지는 어림값입니다. 정확히 하려면
          심부 온도계를 쓰세요. 다진 고기와 가금류는 식중독 위험 때문에 속까지 완전히 익혀야 합니다.
        </p>
      </div>
    </div>
  );
}
