'use client';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import { SEARCH_INTL_UI, type SearchIntlItem, type SearchIntlLang } from '@/lib/search-index-intl';
import { SECTION_LABEL, SECTION_ORDER } from '@/lib/search-section-labels';

/**
 * 번역 언어 통합 검색 화면.
 *
 * 한국어 GlobalSearch는 SECTION_META와 '전체' 필터가 한국어에 묶여 있어 그대로
 * 쓸 수 없다. 정렬 규칙(제목 완전일치 → 앞부분 일치 → 제목 포함 → 설명 포함)은
 * 같게 두고 문구와 섹션 라벨만 갈아 끼운다.
 *
 * 섹션 라벨은 그 섹션 허브의 제목과 같은 낱말로 맞춘다 — 검색 결과의 꼬리표와
 * 눌러서 도착한 페이지의 제목이 다른 말이면 같은 곳으로 안 읽힌다.
 */

/** 제목이 앞에서 맞을수록, 그다음 제목 포함, 마지막이 설명 포함 순으로 올린다. */
function score(item: SearchIntlItem, q: string): number {
  const title = item.title.toLowerCase();
  const desc = item.desc.toLowerCase();
  if (title === q) return 0;
  if (title.startsWith(q)) return 1;
  if (title.includes(q)) return 2;
  if (desc.includes(q)) return 3;
  return -1;
}

/** empty — 질의가 없을 때 검색창 아래에 놓는 것(섹션 바로가기). 한국어 쪽과 같다. */
export default function GlobalSearchIntl({ items, lang, empty }: { items: SearchIntlItem[]; lang: SearchIntlLang; empty?: ReactNode }) {
  const ui = SEARCH_INTL_UI[lang];
  const labels = SECTION_LABEL[lang];
  const ALL = '__all__';

  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string>(ALL);

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
    const c: Record<string, number> = {};
    for (const r of results) c[r.section] = (c[r.section] ?? 0) + 1;
    return c;
  }, [results]);

  const shown = active === ALL ? results : results.filter(r => r.section === active);
  const allLabel = ui.all;

  return (
    <div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </span>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setActive(ALL); }}
          placeholder={ui.placeholder}
          aria-label={ui.heading}
          className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-lg pl-12 pr-4 py-3.5 text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 transition-colors bg-white dark:bg-slate-900"
        />
      </div>

      {results.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {[ALL, ...SECTION_ORDER]
            .filter(s => s === ALL || counts[s])
            .map(s => {
              const n = s === ALL ? results.length : counts[s];
              return (
                <button
                  key={s}
                  onClick={() => setActive(s)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-colors ${
                    active === s
                      ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {s === ALL ? allLabel : labels[s] ?? s} {n}
                </button>
              );
            })}
        </div>
      )}

      <div className="mt-5">
        {!trimmed ? (
          <div>
            <p className="mb-5 text-center text-sm text-slate-400 dark:text-slate-500">{ui.hint}</p>
            {empty}
          </div>
        ) : shown.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">🤔</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-700 dark:text-slate-200">&lsquo;{query.trim()}&rsquo;</span>
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">{ui.noResult}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {shown.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
              >
                <span className="shrink-0 w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                  <ToolIcon emoji={item.icon} className="w-5 h-5 text-slate-700 dark:text-slate-200" title={item.title} />
                </span>
                <span className="hub-card-body">
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sec transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      {labels[item.section] ?? item.section}
                    </span>
                  </span>
                  <span className="block note-xs mt-0.5 line-clamp-1">{item.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
