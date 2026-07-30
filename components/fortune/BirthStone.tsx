'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { BIRTH_INFO_EN } from '@/lib/fortune-en';
import { BIRTH_INFO_ZH } from '@/lib/fortune-zh';
import { t, type Lang } from '@/lib/fortune-intl';

type Info = typeof BIRTH_INFO_EN[number] | typeof BIRTH_INFO_ZH[number];

const COPY = {
  en: {
    title: 'Birthstone & Birth Flower',
    lead: 'Find the gem and flower of your birth month, and what they stand for',
    stoneOf: (m: number) => `Birthstone for ${MONTHS_EN[m - 1]}`,
    flowerOf: (m: number) => `Birth flower for ${MONTHS_EN[m - 1]}`,
    meaning: 'Meaning',
    bornIn: (m: number) => `If you were born in ${MONTHS_EN[m - 1]}`,
    monthLabel: (m: number) => MONTHS_EN[m - 1].slice(0, 3),
    note: 'Birthstones and birth flowers are widely known traditions; the personality notes are just for fun.',
  },
  zh: {
    title: '诞生石与诞生花',
    lead: '查看你出生月份的宝石与花，以及它们的含义',
    stoneOf: (m: number) => `${m}月的诞生石`,
    flowerOf: (m: number) => `${m}月的诞生花`,
    meaning: '花语',
    bornIn: (m: number) => `${m}月出生的你`,
    monthLabel: (m: number) => `${m}月`,
    note: '诞生石与诞生花为广泛流传的说法，性格描述仅供娱乐参考。',
  },
} as const;

const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function BirthStone({ lang }: { lang: Exclude<Lang, 'ko'> }) {
  const [result, setResult] = useState<Info | null>(null);
  const data: readonly Info[] = lang === 'zh' ? BIRTH_INFO_ZH : BIRTH_INFO_EN;
  const c = COPY[lang];
  const hubHref = `/${lang}/fortune`;

  function pick(month: number) {
    setResult(data.find(b => b.month === month) ?? null);
    setTimeout(() => document.getElementById('bs-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={hubHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-fuchsia-600 transition-colors font-medium">
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
          <ToolIcon emoji="💎" className="w-12 h-12 mx-auto mb-2 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{c.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.lead}</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
          {data.map(b => (
            <button
              key={b.month}
              type="button"
              onClick={() => pick(b.month)}
              className={`rounded-xl py-2.5 text-sm font-bold border transition-all ${result?.month === b.month
                ? 'bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white border-transparent'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-fuchsia-300'}`}
            >
              {c.monthLabel(b.month)}
            </button>
          ))}
        </div>

        {result && (
          <div id="bs-result" className="bs-pop">
            <div
              className="relative rounded-3xl text-white p-8 mb-4 text-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${result.color}, ${result.color}bb)` }}
            >
              <div className="text-7xl mb-2 drop-shadow-lg">{result.emoji}</div>
              <div className="text-xs font-bold text-white/85">{c.stoneOf(result.month)}</div>
              <div className="text-3xl font-black drop-shadow">{result.stone}</div>
              <div className="inline-block mt-3 text-xs font-bold bg-white/25 rounded-full px-4 py-1.5">
                {result.stoneMeaning}
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🌸</span>
                <div>
                  <div className="text-xs font-bold text-slate-400">{c.flowerOf(result.month)}</div>
                  <div className="text-lg font-black text-slate-800 dark:text-slate-100">{result.flower}</div>
                  <div className="text-sm text-fuchsia-600 dark:text-fuchsia-300 font-medium">{c.meaning} · {result.flowerMeaning}</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-5 mb-6">
              <div className="text-xs font-black text-fuchsia-600 mb-2">{c.bornIn(result.month)}</div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.blurb}</p>
            </div>

            <ReferralCards lang="en" placement="result" />
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6">{c.note}</p>
      </div>

      <style jsx>{`
        @keyframes bsPop { 0% { opacity: 0; transform: translateY(10px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .bs-pop { animation: bsPop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  );
}
