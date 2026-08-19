'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import ReferralCards from '@/components/ReferralCards';
import ShareButton from '@/components/ShareButton';
import PageGlow from '@/components/PageGlow';
import { SECTION_FAQ } from '@/lib/section-faq';
import { BIRTH_INFO, getBirthInfo, type BirthInfo } from '@/lib/birth-stone';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

export default function BirthStonePage() {
  const [result, setResult] = useState<BirthInfo | null>(null);

  function pick(month: number) {
    setResult(getBirthInfo(month));
    setTimeout(() => document.getElementById('bs-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-fuchsia-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">탄생석·탄생화</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/birth-stone" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="💎" className="h-6 w-6" /></span>
          <h1 className="page-h1">탄생석·탄생화</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">태어난 달의 보석과 꽃, 그리고 그 의미를 확인하세요</p>
        </div>

        {/* 월 선택 */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
          {BIRTH_INFO.map(b => (
            <button
              key={b.month}
              onClick={() => pick(b.month)}
              className={`rounded-xl py-2.5 text-sm font-bold border transition-all ${result?.month === b.month
                ? 'bg-sec border-transparent'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-fuchsia-300'}`}
            >
              {b.month}월
            </button>
          ))}
        </div>

        {result && (
          <div id="bs-result" className="bs-pop">
            {/* 보석 히어로 */}
            <div
              className="relative rounded-xl text-white p-8 mb-4 text-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${result.color}, ${result.color}bb)` }}
            >
              <div className="text-7xl mb-2 drop-shadow-sm">{result.emoji}</div>
              <div className="text-xs font-bold text-white/85">{result.month}월의 탄생석 · {result.stoneEn}</div>
              <div className="text-3xl font-black drop-shadow">{result.stone}</div>
              <div className="inline-block mt-3 text-xs font-bold bg-white/25 rounded-full px-4 py-1.5">
                {result.stoneMeaning}
              </div>
            </div>

            {/* 탄생화 */}
            <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5 mb-4">
              <div className="flex items-center gap-3">
                <ToolIcon emoji="🌸" className="w-9 h-9 text-slate-800 dark:text-slate-100" />
                <div>
                  <div className="text-xs font-bold text-slate-400">{result.month}월의 탄생화</div>
                  <div className="text-lg font-black text-slate-800 dark:text-slate-100">{result.flower}</div>
                  <div className="text-sm text-fuchsia-600 dark:text-fuchsia-300 font-medium">꽃말 · {result.flowerMeaning}</div>
                </div>
              </div>
            </div>

            {/* 성향 */}
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-5 mb-6">
              <div className="text-xs font-black text-fuchsia-600 mb-2">{result.month}월에 태어난 당신은</div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.blurb}</p>
            </div>

            <div className="mb-6">
              <ShareButton
                title={`${result.month}월 탄생석은 ${result.stone}, 탄생화는 ${result.flower}`}
                description="내 생월의 보석과 꽃, 그 의미는? — 탄생석·탄생화"
                type="fortune"
              />
            </div>

            <ReferralCards placement="result" />
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6">
          탄생석·탄생화는 널리 알려진 정보이며, 성향 설명은 재미로 보는 참고용입니다.
        </p>

        <Faq items={SECTION_FAQ['fortune/birth-stone']} />
      </div>
      <SiteFooter referral={false} />

      <style jsx>{`
        @keyframes bsPop { 0% { opacity: 0; transform: translateY(10px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .bs-pop { animation: bsPop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  );
}
