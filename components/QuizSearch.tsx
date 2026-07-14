'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { CardItem } from '@/lib/card';
import { NEW_QUIZ_SLUGS } from '@/lib/new-content';

const CATEGORIES = ['상식', '역사', '세계지리', '언어', '기술·IT', '스포츠', '과학', '엔터테인먼트', '영화', '트렌드', '추억', '생활', '생활·건강', '환경·경제'];

function QuizCard({ q }: { q: CardItem }) {
  return (
    <Link href={`/quiz/${q.slug}`}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-amber-300 hover:shadow-md transition-all">
      {/* OG 이미지를 썸네일로 쓰던 자리 — TestSearch와 같은 이유로 그라데이션+이모지로 대체했다. */}
      <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500">
        {NEW_QUIZ_SLUGS.has(q.slug) && (
          <span className="absolute top-1.5 left-1.5 z-10 text-[10px] font-black text-white bg-rose-500 px-1.5 py-0.5 rounded-full shadow-sm">
            NEW
          </span>
        )}
        <span className="text-4xl drop-shadow-sm" aria-hidden="true">{q.icon}</span>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight group-hover:text-amber-700 transition-colors mb-1">{q.title}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-2">{q.desc}</p>
      </div>
    </Link>
  );
}

export default function QuizSearch({ quizzes }: { quizzes: CardItem[] }) {
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const filtered = trimmed
    ? quizzes.filter(q => q.title.includes(trimmed) || q.desc.includes(trimmed))
    : null;

  const grouped = CATEGORIES.map(cat => ({
    name: cat,
    items: quizzes.filter(q => q.category === cat),
  })).filter(g => g.items.length > 0);

  const uncategorized = quizzes.filter(q => !CATEGORIES.includes(q.category));

  return (
    <>
      <div className="relative mb-10">
        <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="퀴즈 검색..."
          className="w-full border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 pl-10 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 transition-colors"
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
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              <span className="text-amber-600 font-bold">{filtered.length}개</span> 검색 결과
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {filtered.map(q => <QuizCard key={q.slug} q={q} />)}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-20">
            &apos;{trimmed}&apos;에 해당하는 퀴즈가 없어요.
          </p>
        )
      ) : (
        <div className="flex flex-col gap-12">
          {grouped.map(group => (
            <section key={group.name}>
              <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                {group.name}
                <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {group.items.map(q => <QuizCard key={q.slug} q={q} />)}
              </div>
            </section>
          ))}
          {uncategorized.length > 0 && (
            <section>
              <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-4">기타</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {uncategorized.map(q => <QuizCard key={q.slug} q={q} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
