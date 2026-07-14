'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { SECTION_META, type SearchItem, type Section } from '@/lib/search-index';

const SECTIONS: Section[] = ['calculator', 'test', 'quiz', 'generator', 'checklist'];

/** 제목이 앞에서 맞을수록, 그다음 제목 포함, 마지막이 설명 포함 순으로 올린다. */
function score(item: SearchItem, q: string): number {
  const title = item.title.toLowerCase();
  const desc = item.desc.toLowerCase();
  if (title === q) return 0;
  if (title.startsWith(q)) return 1;
  if (title.includes(q)) return 2;
  if (desc.includes(q)) return 3;
  return -1;
}

export default function GlobalSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Section | '전체'>('전체');

  // 다른 페이지에서 ?q=로 넘어오는 경우를 받는다. URL은 프리렌더 시점에 알 수 없다.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q) setQuery(q);
  }, []);

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) return [];
    return items
      .map(item => ({ item, s: score(item, trimmed) }))
      .filter(r => r.s >= 0)
      .sort((a, b) => a.s - b.s || a.item.title.length - b.item.title.length)
      .map(r => r.item);
  }, [items, trimmed]);

  const counts = useMemo(() => {
    const c: Partial<Record<Section, number>> = {};
    for (const r of results) c[r.section] = (c[r.section] ?? 0) + 1;
    return c;
  }, [results]);

  const shown = active === '전체' ? results : results.filter(r => r.section === active);

  return (
    <div>
      <div className="relative mb-5">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={e => { setQuery(e.target.value); setActive('전체'); }}
          placeholder="실업급여, 전세, MBTI, 로또…"
          autoFocus
          className="w-full border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-base text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 transition-colors bg-white"
        />
      </div>

      {trimmed && results.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5" style={{ scrollbarWidth: 'none' }}>
          {(['전체', ...SECTIONS] as const)
            .filter(s => s === '전체' || counts[s as Section])
            .map(s => {
              const label = s === '전체' ? '전체' : SECTION_META[s as Section].label;
              const n = s === '전체' ? results.length : counts[s as Section];
              return (
                <button
                  key={s}
                  onClick={() => setActive(s as Section | '전체')}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-bold border transition-all ${
                    active === s
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {label} <span className={active === s ? 'text-indigo-100' : 'text-slate-400'}>{n}</span>
                </button>
              );
            })}
        </div>
      )}

      {!trimmed ? (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm text-slate-400">
            계산기 · 심리테스트 · 퀴즈 · 생성기 · 체크리스트를<br />한 번에 검색합니다
          </p>
        </div>
      ) : shown.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">🤔</p>
          <p className="text-sm text-slate-500">
            <span className="font-bold text-slate-700">&lsquo;{query.trim()}&rsquo;</span>에 해당하는 결과가 없어요.
          </p>
          <p className="text-xs text-slate-400 mt-1.5">다른 단어로 검색해보세요.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {shown.map(item => {
            const meta = SECTION_META[item.section];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 transition-all hover:border-indigo-200 hover:shadow-sm"
              >
                <span className="shrink-0 w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-lg">
                  {item.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                      {item.title}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${meta.accent}`}>
                      {meta.label}
                    </span>
                  </span>
                  <span className="block text-xs text-slate-400 leading-relaxed mt-0.5 line-clamp-1">{item.desc}</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
