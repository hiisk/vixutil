'use client';
import { ToolIconDefs, ToolIconRef } from '@/components/ToolIconSprite';
import Ad from '@/components/Ad';
import { useState } from 'react';
import Link from 'next/link';
import type { CardItem } from '@/lib/card';
import { thumbSurface } from '@/lib/thumbnail';

const CATEGORIES = ['성격', '연애·결혼', '직장·커리어', '금융·재테크', '건강·생활', '자기계발', '취미·라이프스타일'];

function TestCard({ t }: { t: CardItem }) {
  return (
    <Link href={`/test/${t.slug}`}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      {/*
        파스텔 띠를 걷고 아이콘을 본문 안으로 내렸다 (2026-08-20). 까닭은
        globals.css의 .card-thumb 머리말 — 판 색이 슬러그마다 달라 격자가
        무지개가 됐고, 카드 높이의 절반을 장식이 먹고 있었다.
      */}
      <div className="flex items-start gap-2.5 p-3 sm:p-3.5">
        <span className={`card-thumb ${thumbSurface(t.slug, 'test')}`}>
          <ToolIconRef emoji={t.icon} className="card-thumb-icon" />
        </span>
        <div className="min-w-0 flex-1">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight group-hover:text-sec transition-colors mb-1">{t.title}</h3>
          <p className="note-xs line-clamp-1 sm:line-clamp-2">{t.desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default function TestSearch({ tests }: { tests: CardItem[] }) {
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const filtered = trimmed
    ? tests.filter(t => t.title.includes(trimmed) || t.desc.includes(trimmed))
    : null;

  const grouped = CATEGORIES.map(cat => ({
    name: cat,
    items: tests.filter(t => t.category === cat),
  })).filter(g => g.items.length > 0);

  const uncategorized = tests.filter(t => !CATEGORIES.includes(t.category));

  return (
    <>
      {/* 도형은 여기 한 번만 — 카드는 <use>로 가리킨다 */}
      <ToolIconDefs emojis={tests.map(t => t.icon)} />

      <div className="relative mb-10">
        <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 dark:text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="테스트 검색..."
          className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 pl-10 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-3.5 text-slate-500 dark:text-slate-400 hover:text-slate-600 transition-colors"
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
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              <span className="text-violet-600 font-bold">{filtered.length}개</span> 검색 결과
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {filtered.map(t => <TestCard key={t.slug} t={t} />)}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-20">
            &apos;{trimmed}&apos;에 해당하는 테스트가 없어요.
          </p>
        )
      ) : (
        <div className="flex flex-col gap-12">
          {grouped.map((group, gi) => (
            <div key={group.name}>
              {/*
                이 허브만 광고를 첫 분류 «앞»에 둔다. 다른 허브는 첫 분류를 다 본
                자리에 두는데, 여기는 첫 분류 하나가 일곱 화면이라 그 뒤에 두면
                결국 아무도 못 본다(푸터에 있을 때 93%였다).
              */}
              {gi === 0 && <Ad />}
              <section>
                <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                  {group.name}
                  <span className="text-xs font-bold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30 px-2.5 py-0.5 rounded-full">{group.items.length}</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {group.items.map(t => <TestCard key={t.slug} t={t} />)}
                </div>
              </section>
            </div>
          ))}
          {uncategorized.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">기타</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {uncategorized.map(t => <TestCard key={t.slug} t={t} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
