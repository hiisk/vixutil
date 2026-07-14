'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { CardItem } from '@/lib/card';
import { NEW_GENERATOR_SLUGS } from '@/lib/new-content';
import { thumbGradient } from '@/lib/thumbnail';

const CATEGORIES = ['추천', '이름·브랜드', '문구·아이디어', '랜덤', '계획', '재미', '생활'];

const CAT_META: Record<string, { icon: string; color: string }> = {
  '추천':      { icon: '⭐', color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50' },
  '이름·브랜드':{ icon: '✏️', color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50' },
  '문구·아이디어':{ icon: '💡', color: 'bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-900/50' },
  '랜덤':      { icon: '🎲', color: 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50' },
  '계획':      { icon: '📋', color: 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900/50' },
  '재미':      { icon: '🎉', color: 'bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-900/50' },
  '생활':      { icon: '🏠', color: 'bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900/50' },
};

function GenCard({ g }: { g: CardItem }) {
  return (
    <Link
      href={`/generator/${g.slug}`}
      className="group bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/70 dark:border-slate-700/70 rounded-xl shadow-[0_8px_24px_-12px_rgba(16,185,129,0.22)] overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all"
    >
      {/* OG 이미지를 썸네일로 쓰던 자리 — TestSearch와 같은 이유로 그라데이션+이모지로 대체했다. */}
      <div className={`aspect-video relative overflow-hidden flex items-center justify-center bg-gradient-to-br ${thumbGradient(g.slug, 'generator')}`}>
        {NEW_GENERATOR_SLUGS.has(g.slug) && (
          <span className="absolute top-1.5 left-1.5 z-10 text-[10px] font-black text-white bg-rose-500 px-1.5 py-0.5 rounded-full shadow-sm">
            NEW
          </span>
        )}
        <span className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{g.icon}</span>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight group-hover:text-emerald-700 transition-colors mb-1">{g.title}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-2">{g.desc}</p>
      </div>
    </Link>
  );
}

export default function GeneratorSearch({ generators }: { generators: CardItem[] }) {
  const [query, setQuery]   = useState('');
  const [active, setActive] = useState<string>('전체');

  const cats = ['전체', ...CATEGORIES];

  const trimmed = query.trim();
  const baseList = active === '전체' ? generators : generators.filter(g => g.category === active);
  const filtered = trimmed ? baseList.filter(g => g.title.includes(trimmed) || g.desc.includes(trimmed)) : baseList;

  const grouped = (active === '전체' && !trimmed)
    ? CATEGORIES.map(cat => ({ name: cat, items: generators.filter(g => g.category === cat) })).filter(g => g.items.length > 0)
    : null;

  return (
    <>
      {/* 검색 */}
      <div className="relative mb-5">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="생성기 검색..."
          className="w-full border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 pl-10 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white dark:bg-slate-900"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6" style={{ scrollbarWidth: 'none' }}>
        {cats.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold transition-all border ${
              active === cat
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-300 hover:text-emerald-600'
            }`}
          >
            {cat !== '전체' && <span className="text-xs">{CAT_META[cat]?.icon}</span>}
            {cat}
          </button>
        ))}
      </div>

      {/* 그룹별 or 평면 리스트 */}
      {grouped ? (
        <div className="flex flex-col gap-10">
          {grouped.map(group => {
            const meta = CAT_META[group.name] ?? { icon: '✨', color: '' };
            return (
              <section key={group.name}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">{meta.icon}</span>
                  <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">{group.name}</h2>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {group.items.map(g => <GenCard key={g.slug} g={g} />)}
                </div>
              </section>
            );
          })}
        </div>
      ) : filtered.length > 0 ? (
        <div>
          {(trimmed || active !== '전체') && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              {trimmed && <><span className="text-emerald-600 font-bold">&ldquo;{trimmed}&rdquo;</span> · </>}
              <span className="font-semibold text-slate-600 dark:text-slate-300">{filtered.length}개</span>
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {filtered.map(g => <GenCard key={g.slug} g={g} />)}
          </div>
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-3xl mb-3">🔍</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">&apos;{trimmed}&apos;에 해당하는 생성기가 없어요.</p>
          <button onClick={() => { setQuery(''); setActive('전체'); }} className="mt-3 text-sm text-emerald-600 hover:underline">전체 보기</button>
        </div>
      )}
    </>
  );
}
