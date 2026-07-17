'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import SiteFooter from '@/components/SiteFooter';
import { CATS } from '@/lib/calculator-catalog';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';

export default function CalculatorHub() {
  const [query, setQuery] = useState('');
  const total = CATS.reduce((s, c) => s + c.calcs.length, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATS;
    return CATS.map(cat => ({
      ...cat,
      calcs: cat.calcs.filter(c =>
        c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      ),
    })).filter(cat => cat.calcs.length > 0);
  }, [query]);

  const isSearching = query.trim().length > 0;
  const searchTotal = filtered.reduce((s, c) => s + c.calcs.length, 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400" />

      {/* 헤더 */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-14 flex items-center gap-4">
            <span className="font-black text-blue-600 text-lg shrink-0">calc.</span>
            {/* 카테고리 탭 */}
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 min-w-0">
              {CATS.map(c => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  onClick={() => setQuery('')}
                  className="shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 px-2.5 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors whitespace-nowrap"
                >
                  {c.icon} {c.label}
                </a>
              ))}
            </nav>
            {/* 언어 전환 */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-xs font-bold text-blue-600 px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30">KO</span>
              <Link href="/calculator/en" className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-700 px-2 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">EN</Link>
              <Link href="/calculator/ja" className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-700 px-2 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">JA</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4">
        {/* 히어로 + 검색 */}
        <section className="py-10 sm:py-14 border-b border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Korean Calculator</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-3">
            실생활 계산기 모음
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            직장인·세금·금융·부동산·생활·자동차·공과금·개발자 — <strong className="text-slate-700 dark:text-slate-200">{total}개</strong> 계산기
          </p>
          {/* 검색창 */}
          <div className="relative max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="계산기 검색... (예: 세금, 대출, BMI)"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-950"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {isSearching && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              &ldquo;{query}&rdquo; 검색 결과: <strong className="text-slate-600 dark:text-slate-300">{searchTotal}개</strong>
            </p>
          )}
        </section>

        {/* 카테고리별 섹션 */}
        <div className="py-8 flex flex-col gap-14">
          {filtered.map(cat => (
            <section key={cat.id} id={cat.id}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h2 className="font-black text-slate-900 dark:text-slate-100 text-lg leading-tight">{cat.label} 계산기</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{cat.desc}</p>
                </div>
                <span className={`ml-auto shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${cat.accent}`}>
                  {cat.calcs.length}개
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {cat.calcs.map(c => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-700 transition-colors">
                        {c.title}
                      </h3>
                      {(c as { hot?: boolean }).hot && (
                        <span className="shrink-0 ml-1 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded-full">HOT</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{c.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {isSearching && searchTotal === 0 && (
            <div className="py-20 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-slate-500 dark:text-slate-400 font-medium">&ldquo;{query}&rdquo;에 해당하는 계산기가 없어요</p>
              <button onClick={() => setQuery('')} className="mt-3 text-sm text-blue-600 hover:underline">전체 보기</button>
            </div>
          )}
        </div>

        <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
          <p className="text-xs text-slate-300 dark:text-slate-600">2026년 기준 · 참고용 계산기입니다</p>
        </footer>

        <Faq items={SECTION_FAQ.calculator} />
      </div>
      <SiteFooter />
    </div>
  );
}
