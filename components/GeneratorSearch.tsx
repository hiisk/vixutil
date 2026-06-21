'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Generator } from '@/lib/types';

const CATEGORIES = ['이름·브랜드', '추천', '문구·아이디어', '랜덤', '계획'];

function GenCard({ g }: { g: Generator }) {
  return (
    <Link href={`/generator/${g.slug}`}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all">
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100">
        <img
          src={`/generator/${g.slug}/opengraph-image`}
          alt={g.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors mb-1">{g.title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{g.desc}</p>
      </div>
    </Link>
  );
}

export default function GeneratorSearch({ generators }: { generators: Generator[] }) {
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const filtered = trimmed
    ? generators.filter(g => g.title.includes(trimmed) || g.desc.includes(trimmed))
    : null;

  const grouped = CATEGORIES.map(cat => ({
    name: cat,
    items: generators.filter(g => g.category === cat),
  })).filter(g => g.items.length > 0);

  const uncategorized = generators.filter(g => !CATEGORIES.includes(g.category));

  return (
    <>
      <div className="relative mb-10">
        <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="생성기 검색..."
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 pl-10 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {filtered !== null ? (
        filtered.length > 0 ? (
          <div>
            <p className="text-xs text-slate-400 mb-4">
              <span className="text-emerald-600 font-bold">{filtered.length}개</span> 검색 결과
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {filtered.map(g => <GenCard key={g.slug} g={g} />)}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-20">
            &apos;{trimmed}&apos;에 해당하는 생성기가 없어요.
          </p>
        )
      ) : (
        <div className="flex flex-col gap-12">
          {grouped.map(group => (
            <section key={group.name}>
              <h2 className="text-sm font-black text-slate-700 mb-4 flex items-center gap-2">
                {group.name}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {group.items.map(g => <GenCard key={g.slug} g={g} />)}
              </div>
            </section>
          ))}
          {uncategorized.length > 0 && (
            <section>
              <h2 className="text-sm font-black text-slate-700 mb-4">기타</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {uncategorized.map(g => <GenCard key={g.slug} g={g} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
