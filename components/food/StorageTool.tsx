'use client';
import { useMemo, useState } from 'react';
import { CARD } from './ui';
import { STORAGE_CATEGORIES, STORAGE_INTL } from '@/lib/food-intl';
import { STORAGE_UI, type FoodLang } from '@/lib/food-ui-intl';

// 분류 목록은 lib/food-intl.ts의 STORAGE_CATEGORIES에서 온다 — 첫 항목이 '전체'다

export default function StorageTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = STORAGE_UI[lang];
  const cats = STORAGE_CATEGORIES[lang];
  const rows = STORAGE_INTL[lang];
  const [category, setCategory] = useState(cats[0]);
  const [query, setQuery] = useState('');

  const items = useMemo(() => {
    const q = query.trim();
    // 언어별 행을 직접 걸러 낸다. 한국어 STORAGE를 돌리면서 인덱스로 되짚으면
    // 이름·분류·요령이 한국어로 새어 나온다.
    return rows.filter(
      r => (category === cats[0] || r.category === category) && (!q || r.name.toLowerCase().includes(q.toLowerCase())),
    );
  }, [category, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={ui.searchPlaceholder}
        className="w-full rounded-lg border chip-off px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
      />

      <div className="flex gap-2 overflow-x-auto pb-1 mt-3" style={{ scrollbarWidth: 'none' }}>
        {cats.map(c => (
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
          <div key={s.name} className="rounded-lg border chip-off px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="hub-card-body">
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">{s.name}</span>
                <span className="block text-[11px] text-slate-400 dark:text-slate-500">{s.category}</span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-xs text-slate-500 dark:text-slate-400">{ui.fridge} <b className="text-cyan-600">{s.fridge}</b></span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{ui.freezer} <b className="text-blue-600">{s.freezer}</b></span>
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">💡 {s.tip}</p>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">{ui.notFound}</p>
        )}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.noteTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}<b className="text-slate-800 dark:text-slate-100">{ui.noteBold}</b>
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
          {ui.refreeze}
        </p>
      </div>
    </div>
  );
}
