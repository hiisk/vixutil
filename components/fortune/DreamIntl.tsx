'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import type { DreamEntry } from '@/lib/dream-data';
import { DREAM_DATA_EN, DREAM_CATEGORIES_EN } from '@/lib/dream-en';
import { dreamDataOf, dreamCategoriesOf, spreadDream } from '@/lib/dream-l10n/index';
import type { DreamCopy } from '@/lib/dream-l10n/types';
import { t, type Lang } from '@/lib/fortune-intl';

type IntlLang = Exclude<Lang, 'ko'>;

/** 길흉 라벨 — 색은 한국어 LUCK_INFO와 같은 계열을 쓴다 */
const LUCK_LABEL: Record<IntlLang, Record<string, string>> = {
  en: { '2': 'Very good', '1': 'Good', '0': 'Neutral', '-1': 'Caution', '-2': 'Warning' },
  ...spreadDream('luck'),
};

const LUCK_STYLE: Record<string, string> = {
  '2': 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-900/50',
  '1': 'text-teal-700 bg-teal-50 border-teal-200 dark:text-teal-300 dark:bg-teal-950/30 dark:border-teal-900/50',
  '0': 'text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700',
  '-1': 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-300 dark:bg-orange-950/30 dark:border-orange-900/50',
  '-2': 'text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950/30 dark:border-red-900/50',
};

type DreamUi = DreamCopy['ui'];

const COPY: Record<IntlLang, DreamUi> = {
  en: {
    title: 'Dream Dictionary',
    lead: 'Twenty dream symbols that show up across cultures, and what they are usually read as',
    search: 'Search a symbol…',
    all: 'All',
    none: 'Nothing matched that search.',
    note: 'Dream interpretation has no scientific standing. What is described here is what these symbols are traditionally read as, and which situations they tend to be reported in — not a prediction.',
  },
  ...spreadDream('ui'),
};

export default function DreamIntl({ lang }: { lang: IntlLang }) {
  const c = COPY[lang];
  const data: DreamEntry[] = lang === 'en' ? DREAM_DATA_EN : dreamDataOf(lang);
  const categories: string[] = lang === 'en' ? DREAM_CATEGORIES_EN : dreamCategoriesOf(lang);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter(d => {
      if (category && d.category !== category) return false;
      if (!q) return true;
      return d.keyword.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q);
    });
  }, [data, search, category]);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="page-back hover:text-indigo-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={"/fortune/dream"} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🌙" className="h-6 w-6" /></span>
          <div className="hero-band">
            <PageHero title={c.title} desc={c.lead} />
          </div>
        </div>

        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={c.search}
          className="w-full rounded-lg border chip-off px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:border-indigo-400 focus:outline-none mb-4"
        />

        <div className="flex flex-wrap gap-2 mb-6">
          <button type="button" onClick={() => setCategory(null)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${category === null
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
            {c.all}
          </button>
          {categories.map(cat => (
            <button key={cat} type="button" onClick={() => setCategory(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${category === cat
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-12">{c.none}</p>
        ) : (
          <div className="space-y-2">
            {filtered.map(d => {
              const open = openId === d.id;
              return (
                <div key={d.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button type="button" onClick={() => setOpenId(open ? null : d.id)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-2xl shrink-0">{d.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{d.keyword}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${LUCK_STYLE[String(d.luck)]}`}>
                          {LUCK_LABEL[lang][String(d.luck)]}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{d.summary}</p>
                    </div>
                    <svg aria-hidden="true" className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {open && (
                    <div className="px-5 pb-5 pt-1 space-y-2 border-t border-slate-100 dark:border-slate-800">
                      {d.detail.map((p, i) => (
                        <p key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8">
          <ReferralCards lang="en" placement="result" />
        </div>

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{c.note}</p>
      </div>
    </div>
  );
}
