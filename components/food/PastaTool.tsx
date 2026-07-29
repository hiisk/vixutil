'use client';
import { useMemo, useState } from 'react';
import { CARD, NumberField, Result, Stat } from './ui';

const SHAPES = [
  { id: 'spaghetti', label: '스파게티', minutes: 9 },
  { id: 'linguine', label: '링귀네', minutes: 10 },
  { id: 'penne', label: '펜네', minutes: 11 },
  { id: 'fusilli', label: '푸실리', minutes: 11 },
  { id: 'farfalle', label: '파르팔레', minutes: 11 },
  { id: 'fettuccine', label: '페투치네', minutes: 8 },
];

export default function PastaTool() {
  const [gram, setGram] = useState(200);
  const [shape, setShape] = useState('spaghetti');
  const [aldente, setAldente] = useState(true);

  const pick = SHAPES.find(s => s.id === shape)!;
  const result = useMemo(() => ({
    // 면 100g에 물 1L, 소금 10g이 기본 비율
    water: Math.round((gram / 100) * 1000),
    salt: Math.round((gram / 100) * 10),
    minutes: aldente ? pick.minutes - 1 : pick.minutes,
  }), [gram, pick, aldente]);

  return (
    <div>
      <NumberField label="면" value={gram} onChange={setGram} unit="g" step={50} min={50} />
      <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        1인분은 보통 80~100g입니다 (많이 먹으면 120g)
      </p>

      <Result sub={`면 100g당 물 1L · 소금 10g 기준`}>
        물 {(result.water / 1000).toFixed(1)}<span className="text-xl">L</span> · 소금 {result.salt}<span className="text-xl">g</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label="물" value={`${result.water}ml`} accent="text-yellow-600" />
        <Stat label="소금" value={`${result.salt}g`} accent="text-amber-600" />
        <Stat label="삶는 시간" value={`${result.minutes}분`} accent="text-orange-600" />
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">면 종류</p>
      <div className="grid grid-cols-3 gap-2">
        {SHAPES.map(s => (
          <button
            key={s.id}
            onClick={() => setShape(s.id)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              shape === s.id
                ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-3 mt-4 cursor-pointer">
        <input type="checkbox" checked={aldente} onChange={e => setAldente(e.target.checked)} className="w-4 h-4 accent-amber-500" />
        <span className="text-sm text-slate-700 dark:text-slate-200">
          알덴테로 (1분 덜 삶기)
          <span className="block text-[11px] text-slate-400 dark:text-slate-500">소스와 볶을 예정이라면 켜세요</span>
        </span>
      </label>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">소금을 왜 이렇게 많이 넣나요</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          면에 간이 배는 유일한 기회이기 때문입니다. 대부분은 물과 함께 버려지고 면에 남는 양은 적습니다.
          물이 팔팔 끓은 뒤에 소금을 넣고, 면을 넣기 전에 한 번 저어 녹이세요.
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          면수는 버리지 말고 한 국자 남겨 두세요. 전분이 녹아 있어 소스와 면이 겉돌지 않게 잡아 줍니다.
        </p>
      </div>
    </div>
  );
}
