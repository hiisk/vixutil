'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import {
  DREAM_DATA, POPULAR_KEYWORDS, CATEGORIES, LUCK_INFO,
  type DreamEntry, type DreamCategory,
} from '@/lib/dream-data';

export default function DreamPage() {
  const [search, setSearch]         = useState('');
  const [activeCategory, setCategory] = useState<DreamCategory | '전체'>('전체');
  const [selected, setSelected]     = useState<DreamEntry | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim();
    return DREAM_DATA.filter(d => {
      if (activeCategory !== '전체' && d.category !== activeCategory) return false;
      if (!q) return true;
      return (
        d.keyword.includes(q) ||
        d.summary.includes(q) ||
        d.detail.some(t => t.includes(q)) ||
        (d.related ?? []).some(r => r.includes(q))
      );
    });
  }, [search, activeCategory]);

  function pick(dream: DreamEntry) {
    setSelected(prev => (prev?.id === dream.id ? null : dream));
  }

  const info = selected ? LUCK_INFO[String(selected.luck)] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600" />

      {/* 헤더 */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">꿈 해몽</span>
        </div>
      </header>

      {/* 히어로 + 검색 */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white pt-10 pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-7">
            <div className="text-5xl mb-3">🌙</div>
            <h1 className="text-3xl font-black mb-1.5">꿈 해몽</h1>
            <p className="text-indigo-300 text-sm">어젯밤 꿈의 의미를 알아보세요</p>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg pointer-events-none">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setSelected(null); }}
              placeholder="돼지, 뱀, 불, 나는 꿈…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/10 border border-white/20 dark:border-slate-700/20 text-white placeholder-white/40 text-base focus:outline-none focus:bg-white/15 focus:border-violet-400 transition-all"
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setSelected(null); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">

        {/* 인기 꿈 */}
        {!search && (
          <div className="pt-5 pb-2">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">많이 찾는 꿈</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_KEYWORDS.map(k => (
                <button
                  key={k}
                  onClick={() => { setSearch(k); setSelected(null); }}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-violet-400 hover:text-violet-600 transition-all shadow-sm"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 카테고리 필터 */}
        <div className="py-3 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {(['전체', ...CATEGORIES] as const).map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat as DreamCategory | '전체'); setSelected(null); }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white shadow'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 결과 수 */}
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
          {search
            ? `"${search}" 검색 결과 · ${filtered.length}건`
            : `${filtered.length}가지 꿈`}
        </p>

        {/* 빈 결과 */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-4xl mb-3">🔮</div>
            <p className="text-slate-500 dark:text-slate-400 font-semibold">검색 결과가 없어요</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">다른 키워드로 검색해 보세요</p>
          </div>
        )}

        {/* 카드 그리드 */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-24">
            {filtered.map(dream => {
              const li = LUCK_INFO[String(dream.luck)];
              const isOpen = selected?.id === dream.id;
              return (
                <button
                  key={dream.id}
                  onClick={() => pick(dream)}
                  className={`text-left rounded-2xl border p-4 transition-all duration-200 ${
                    isOpen
                      ? 'border-violet-400 bg-violet-50 dark:bg-violet-950/30 shadow-md ring-1 ring-violet-300'
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-200 hover:shadow-sm'
                  }`}
                >
                  <div className="text-3xl mb-2">{dream.emoji}</div>
                  <div className="text-sm font-black text-slate-900 dark:text-slate-100 mb-1.5">{dream.keyword}</div>
                  <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 border ${li.bg} ${li.color} ${li.border}`}>
                    {li.label}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{dream.summary}</p>
                </button>
              );
            })}
          </div>
        )}

        <Faq items={SECTION_FAQ['fortune/dream']} />
      </div>

      {/* 상세 바텀시트 */}
      {selected && info && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          {/* 딤 배경 */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          {/* 시트 */}
          <div className="relative bg-white dark:bg-slate-900 rounded-t-3xl w-full max-w-2xl max-h-[82vh] overflow-y-auto shadow-2xl">
            {/* 드래그 핸들 */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="px-5 pb-10">
              {/* 헤더 */}
              <div className="flex items-start gap-4 py-5 border-b border-slate-100 dark:border-slate-800">
                <div className="text-5xl">{selected.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">{selected.keyword} 꿈</h2>
                    <span className={`text-sm font-bold px-2.5 py-1 rounded-full border ${info.bg} ${info.color} ${info.border}`}>
                      {info.label}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold leading-snug">{selected.summary}</p>
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 inline-block">#{selected.category}</span>
                </div>
              </div>

              {/* 길흉 바 */}
              <div className="py-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 mb-1.5">
                  <span>대흉</span><span>대길</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${info.bar}`}
                    style={{ width: `${((selected.luck + 2) / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* 상세 해석 */}
              <div className="py-5 space-y-3.5">
                {selected.detail.map((para, i) => (
                  <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{para}</p>
                ))}
              </div>

              {/* 관련 꿈 */}
              {selected.related && selected.related.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-3">관련 꿈 더 보기</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.related.map(rel => (
                      <button
                        key={rel}
                        onClick={() => { setSearch(rel); setSelected(null); }}
                        className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-950/50 hover:text-violet-700 transition-colors"
                      >
                        {rel}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 공유 + 닫기 */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => {
                    const text = `[꿈해몽] ${selected.emoji} ${selected.keyword} 꿈\n${info.label} — ${selected.summary}\n\nvixutil.com/fortune/dream`;
                    if (navigator.share) {
                      navigator.share({ title: `${selected.keyword} 꿈 해몽`, text }).catch(() => {});
                    } else {
                      navigator.clipboard?.writeText(text);
                    }
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-violet-600 font-bold text-white hover:bg-violet-700 transition-colors text-sm"
                >
                  공유하기
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors text-sm"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <SiteFooter />
    </div>
  );
}
