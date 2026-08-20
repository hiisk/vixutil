'use client';
import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
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
    <div className="page-wrap">
      <PageGlow accent="blue" />
      <div className="h-1 topbar" />

      {/* 헤더 */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-14 flex items-center gap-4">
            <span className="font-bold text-blue-600 text-lg shrink-0">calc.</span>
            {/* 카테고리 탭 */}
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 min-w-0">
              {CATS.map(c => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  onClick={() => setQuery('')}
                  className="shrink-0 flex items-center min-h-11 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 px-2.5 rounded-full hover:bg-sec-soft transition-colors whitespace-nowrap"
                >
                  <ToolIcon emoji={c.icon} className="inline-block w-3.5 h-3.5 -mt-0.5 mr-1 align-middle" />
                  {c.label}
                </a>
              ))}
            </nav>
            {/* 언어 전환 — 여기 백일곱 개 중 나라를 안 타는 것만 번역돼 있다 */}
            <div className="shrink-0">
              <LangPicker current="ko" route="/calculator" available={ALL_LOCALES10} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4">
        {/* 히어로 + 검색 */}
        <section className="py-7 sm:py-10 border-b border-slate-100 dark:border-slate-800">
          {/* 홈에서 누른 그 칸과 같은 타일 — 낱장 머리와도 같은 모양이다 */}
          <div className="hero-band ">
            <PageHero
              title="실생활 계산기 모음"
              desc={`직장인·세금·금융·부동산·생활·자동차·공과금·개발자 — ${total}개 계산기`}
              icon="🧮"
            />
          </div>
          {/* 검색창 */}
          <div className="relative max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="계산기 검색... (예: 세금, 대출, BMI)"
              className="fld w-full pl-10! pr-10! py-3"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {isSearching && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              &ldquo;{query}&rdquo; 검색 결과: <strong className="text-slate-600 dark:text-slate-300">{searchTotal}개</strong>
            </p>
          )}
        </section>

        {/* 카테고리별 섹션 */}
        <div className="py-8 flex flex-col gap-9 sm:gap-14">
          {filtered.map((cat, catIndex) => (
            <section key={cat.id} id={cat.id}>
              <div className="flex items-center gap-3 mb-5">
                <ToolIcon emoji={cat.icon} className="text-slate-800 dark:text-slate-100 w-7 h-7" />
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-tight">{cat.label} 계산기</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{cat.desc}</p>
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
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 sm:p-4 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight text-balance line-clamp-2 group-hover:text-sec transition-colors">
                        {c.title}
                      </h3>
                      {(c as { hot?: boolean }).hot && (
                        <span className="shrink-0 ml-1 text-xs font-bold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded-full">HOT</span>
                      )}
                    </div>
                    <p className="note-xs line-clamp-2">{c.desc}</p>
                  </Link>
                ))}
              </div>

              {/*
                분류가 다른 섹션으로 이어질 때만 뜬다. 단위변환이 그렇다 —
                여기 여섯 개뿐인데 /convert에 138종이 있는데도 가는 길이
                없었다(lib/calculator-catalog.ts의 more 참고).
              */}
              {cat.more && (
                <Link
                  href={cat.more.href}
                  className="group mt-3 flex items-center justify-between gap-2 rounded-xl border chip-off px-4 py-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sec transition-colors">
                    {cat.more.label}
                  </span>
                  <svg className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400 group-hover:translate-x-0.5 transition-transform"
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}

              {/*
                광고는 첫 분류 바로 뒤다. 푸터에 두었더니 이 허브에서 스크롤
                깊이가 90%(16화면)였다 — 거기까지 내려가는 사람은 없다. 허브는
                누르는 버튼이 없으니 «결과 직후»라는 자리도 없어서, 목록 첫
                덩이를 다 본 자리에 둔다.
              */}
              {catIndex === 0 && <Ad />}
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
          <p className="text-xs text-slate-500 dark:text-slate-400">2026년 기준 · 참고용 계산기입니다</p>
        </footer>

        <Faq items={SECTION_FAQ.calculator} />
      </div>
      <SiteFooter referral={false} />
    </div>
  );
}
