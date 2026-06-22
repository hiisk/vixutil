'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Generator } from '@/lib/types';

const CATEGORIES = ['추천', '이름·브랜드', '문구·아이디어', '랜덤', '계획'];

const CAT_META: Record<string, { icon: string; color: string }> = {
  '추천':      { icon: '⭐', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  '이름·브랜드':{ icon: '✏️', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  '문구·아이디어':{ icon: '💡', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  '랜덤':      { icon: '🎲', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  '계획':      { icon: '📋', color: 'bg-teal-50 text-teal-700 border-teal-200' },
};

function GenCard({ g }: { g: Generator }) {
  const meta = CAT_META[g.category] ?? { icon: '✨', color: 'bg-slate-50 text-slate-700 border-slate-200' };
  return (
    <Link
      href={`/generator/${g.slug}`}
      className="group flex flex-col bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xl">{g.icon}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${meta.color}`}>{g.category}</span>
      </div>
      <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors mb-1 leading-tight">
        {g.title}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">{g.desc}</p>
      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-500">
        생성하기
        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}

export default function GeneratorSearch({ generators }: { generators: Generator[] }) {
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
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="생성기 검색..."
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 pl-10 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
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
                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
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
                  <h2 className="text-sm font-black text-slate-800">{group.name}</h2>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
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
            <p className="text-xs text-slate-400 mb-4">
              {trimmed && <><span className="text-emerald-600 font-bold">&ldquo;{trimmed}&rdquo;</span> · </>}
              <span className="font-semibold text-slate-600">{filtered.length}개</span>
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {filtered.map(g => <GenCard key={g.slug} g={g} />)}
          </div>
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-3xl mb-3">🔍</p>
          <p className="text-sm text-slate-400">&apos;{trimmed}&apos;에 해당하는 생성기가 없어요.</p>
          <button onClick={() => { setQuery(''); setActive('전체'); }} className="mt-3 text-sm text-emerald-600 hover:underline">전체 보기</button>
        </div>
      )}
    </>
  );
}
