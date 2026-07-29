'use client';
import { useMemo, useState } from 'react';
import { BREW_RATIOS } from '@/lib/food';
import { CARD, NumberField, Result, Stat } from './ui';

const GRIND: Record<string, string> = {
  'filter-light': '중간 굵기 · 2분 30초~3분',
  filter: '중간 굵기 · 2분 30초~3분',
  'filter-strong': '중간보다 조금 곱게 · 3분',
  french: '아주 굵게 · 4분 담근 뒤 눌러 내리기',
  coldbrew: '굵게 · 냉장 12~16시간',
  espresso: '아주 곱게 · 25~30초 추출',
};

export default function CoffeeTool() {
  const [method, setMethod] = useState('filter');
  const [water, setWater] = useState(300);
  const [mode, setMode] = useState<'byWater' | 'byBean'>('byWater');
  const [bean, setBean] = useState(20);

  const pick = BREW_RATIOS.find(b => b.id === method)!;
  const result = useMemo(() => (
    mode === 'byWater'
      ? { bean: Math.round((water / pick.ratio) * 10) / 10, water }
      : { bean, water: Math.round(bean * pick.ratio) }
  ), [mode, water, bean, pick]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        {BREW_RATIOS.map(b => (
          <button
            key={b.id}
            onClick={() => setMethod(b.id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              method === b.id
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-200'
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className={`block text-sm font-black ${method === b.id ? 'text-amber-800 dark:text-amber-300' : 'text-slate-800 dark:text-slate-100'}`}>
                {b.name}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{b.note}</span>
            </span>
            <span className="shrink-0 text-sm font-black text-slate-500 dark:text-slate-400 tabular-nums">1:{b.ratio}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {([['byWater', '물 양으로 계산'], ['byBean', '원두 양으로 계산']] as const).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              mode === v
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3">
        {mode === 'byWater'
          ? <NumberField label={pick.id === 'espresso' ? '추출할 양' : '마실 물'} value={water} onChange={setWater} unit="ml" step={50} />
          : <NumberField label="원두" value={bean} onChange={setBean} unit="g" step={1} />}
      </div>

      <Result sub={GRIND[method]}>
        원두 {result.bean}<span className="text-xl">g</span> · 물 {result.water}<span className="text-xl">ml</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label="원두" value={`${result.bean}g`} accent="text-amber-700" />
        <Stat label="물" value={`${result.water}ml`} />
        <Stat label="비율" value={`1 : ${pick.ratio}`} accent="text-orange-700" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          비율은 시작점일 뿐입니다. 같은 비율이라도 물 온도(90~95℃)와 분쇄도에 따라 맛이 크게 달라집니다.
          쓰고 텁텁하면 굵게 갈거나 물 온도를 낮추고, 싱겁고 신맛만 나면 곱게 갈거나 시간을 늘리세요.
        </p>
      </div>
    </div>
  );
}
