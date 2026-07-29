'use client';
import { useMemo, useState } from 'react';
import { STORAGE } from '@/lib/food';
import { CARD } from './ui';

const CATEGORIES = ['전체', '육류', '수산물', '유제품', '조리식품', '채소·과일'];

export default function StorageTool() {
  const [category, setCategory] = useState('전체');
  const [query, setQuery] = useState('');

  const items = useMemo(() => {
    const q = query.trim();
    return STORAGE.filter(
      s => (category === '전체' || s.category === category) && (!q || s.name.includes(q)),
    );
  }, [category, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="재료 이름으로 찾기 — 닭, 우유, 두부…"
        className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
      />

      <div className="flex gap-2 overflow-x-auto pb-1 mt-3" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold border transition-colors ${
              category === c
                ? 'border-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {items.map(s => (
          <div key={s.name} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{s.name}</span>
                <span className="block text-[11px] text-slate-400 dark:text-slate-500">{s.category}</span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-xs text-slate-500 dark:text-slate-400">냉장 <b className="text-cyan-600">{s.fridge}</b></span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">냉동 <b className="text-blue-600">{s.freezer}</b></span>
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">💡 {s.tip}</p>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">찾는 재료가 목록에 없습니다</p>
        )}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">기간은 품질 기준입니다</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          여기 적힌 기간은 &lsquo;맛과 질감이 유지되는&rsquo; 기준입니다. 냉동은 그 뒤에도 상하지는 않지만 맛이
          떨어집니다. 반대로 냉장은 기간 안이라도 온도가 높거나 여러 번 열었다면 더 빨리 상할 수 있으니,
          <b className="text-slate-800 dark:text-slate-100"> 냄새와 색을 먼저 확인하세요.</b>
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
          해동한 식품을 다시 얼리지 마세요. 녹는 동안 늘어난 세균이 그대로 남습니다.
        </p>
      </div>
    </div>
  );
}
