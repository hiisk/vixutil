'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { ymdOf } from '@/lib/lucky-color';
import { LUCKY_COLOR_INFO_EN } from '@/lib/fortune-en';
import { t, type Lang } from '@/lib/fortune-intl';

type IntlLang = Exclude<Lang, 'ko'>;

/**
 * 한국어 lucky-color.ts의 seededInt와 같은 FNV-1a. 색 배열의 순서와 hex를
 * 언어별로 동일하게 맞춰뒀으므로, 같은 날 같은 이름이면 세 언어가 같은 색을 낸다.
 */
function seededInt(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

const COPY = {
  en: {
    title: 'Today’s Lucky Colour',
    lead: 'Enter a name (optional) to get today’s colour — and the one to skip',
    nameLabel: 'Name (optional)',
    namePh: 'Leave blank for everyone’s colour',
    submit: 'See today’s colour',
    luckyLabel: 'Lucky colour',
    avoidLabel: 'Colour to skip today',
    tipLabel: 'Tip',
    note: 'The colour is generated from the name and today’s date, and is for entertainment only.',
  },
} as const;

/** 행운의 색 데이터의 모양 */
type ColorInfo = (typeof LUCKY_COLOR_INFO_EN)[number];

export default function TodayColor({ lang }: { lang: IntlLang }) {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ lucky: ColorInfo; avoid: ColorInfo } | null>(null);
  const c = COPY[lang];
  const colors: readonly ColorInfo[] = LUCKY_COLOR_INFO_EN;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const base = `lucky-color-${name.trim()}-${ymdOf(new Date())}`;
    const li = seededInt(base) % colors.length;
    let ai = seededInt(`${base}-avoid`) % colors.length;
    if (ai === li) ai = (ai + 1) % colors.length;
    setResult({ lucky: colors[li], avoid: colors[ai] });
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-pink-500 to-violet-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <ToolIcon emoji="🎨" className="w-12 h-12 mx-auto mb-2 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{c.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.lead}</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label htmlFor="tc-name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{c.nameLabel}</label>
          <input
            id="tc-name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={c.namePh}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-violet-400 focus:outline-none"
          />
          <button type="submit" className="w-full mt-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-black py-3 transition-colors">
            {c.submit}
          </button>
        </form>

        {result && (
          <div className="space-y-4">
            <div className="rounded-3xl p-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${result.lucky.hex}, ${result.lucky.hex}bb)` }}>
              <div className="text-xs font-bold text-white/85 mb-1">{c.luckyLabel}</div>
              <div className="text-3xl font-black drop-shadow mb-2">{result.lucky.name}</div>
              <p className="text-sm text-white/90">{result.lucky.meaning}</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {result.lucky.keywords.map(k => (
                  <span key={k} className="text-xs font-bold bg-white/25 rounded-full px-3 py-1">#{k}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5">
              <div className="text-xs font-black text-violet-600 mb-2">{c.tipLabel}</div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.lucky.tip}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-5 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0" style={{ background: result.avoid.hex }} />
              <div>
                <div className="text-xs font-bold text-slate-400">{c.avoidLabel}</div>
                <div className="text-base font-black text-slate-800 dark:text-slate-100">{result.avoid.name}</div>
              </div>
            </div>

            <ReferralCards lang="en" placement="result" />
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6">{c.note}</p>
      </div>
    </div>
  );
}
