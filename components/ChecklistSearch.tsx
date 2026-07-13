'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { ChecklistCardItem } from '@/lib/card';
import { NEW_CHECKLIST_SLUGS } from '@/lib/new-content';

const CATEGORIES = ['이사·생활', '취업·직장', '여행', '건강·운동', '재테크', '학습·시험', '행사·기념', '디지털·IT'];

function ChecklistCard({ c }: { c: ChecklistCardItem }) {
  const total = c.itemCount;
  return (
    <Link href={`/checklist/${c.slug}`}
      className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-300 hover:shadow-md transition-all flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl">{c.icon}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          {NEW_CHECKLIST_SLUGS.has(c.slug) && (
            <span className="text-[10px] font-black text-white bg-rose-500 px-1.5 py-0.5 rounded-full shadow-sm">
              NEW
            </span>
          )}
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
            {total}항목
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-sky-700 transition-colors mb-1">
          {c.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{c.desc}</p>
      </div>
    </Link>
  );
}

export default function ChecklistSearch({ checklists }: { checklists: ChecklistCardItem[] }) {
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const filtered = trimmed
    ? checklists.filter(c => c.title.includes(trimmed) || c.desc.includes(trimmed) || c.category.includes(trimmed))
    : null;

  const grouped = CATEGORIES.map(cat => ({
    name: cat,
    items: checklists.filter(c => c.category === cat),
  })).filter(g => g.items.length > 0);

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
          placeholder="체크리스트 검색..."
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 pl-10 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
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
              <span className="text-sky-600 font-bold">{filtered.length}개</span> 검색 결과
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {filtered.map(c => <ChecklistCard key={c.slug} c={c} />)}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-20">
            &apos;{trimmed}&apos;에 해당하는 체크리스트가 없어요.
          </p>
        )
      ) : (
        <div className="flex flex-col gap-10">
          {grouped.map(group => (
            <section key={group.name}>
              <h2 className="text-sm font-black text-slate-700 mb-4 flex items-center gap-2">
                {group.name}
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {group.items.map(c => <ChecklistCard key={c.slug} c={c} />)}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
