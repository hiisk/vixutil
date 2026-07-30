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
import { getTodayColor, ymdOf, type TodayColorResult } from '@/lib/lucky-color';

export default function TodayColorPage() {
  const [name, setName] = useState('');
  const [result, setResult] = useState<TodayColorResult | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setResult(getTodayColor(name, ymdOf(new Date())));
    setTimeout(() => document.getElementById('tc-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">오늘의 행운 색</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <ToolIcon emoji="🎨" className="w-12 h-12 mx-auto mb-2 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">오늘의 행운 색</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">오늘 당신에게 힘이 되는 색과 피하면 좋은 색 — 매일 바뀝니다</p>
        </div>

        <form onSubmit={run} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">이름 (선택 — 비우면 오늘 모두의 색)</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="예) 홍길동"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-violet-400 focus:outline-none mb-3"
          />
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white text-sm font-black py-3.5 transition-all active:scale-[0.99] shadow-md shadow-violet-200 dark:shadow-none">
            오늘의 행운 색 보기 🎨
          </button>
        </form>

        {result && (
          <div id="tc-result" className="tc-pop">
            {/* 행운의 색 히어로 */}
            <div
              className="relative rounded-3xl p-8 mb-4 text-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${result.lucky.hex}, ${result.lucky.hex}cc)` }}
            >
              <div className="text-xs font-bold text-white/80 mb-1 drop-shadow">오늘의 행운 색</div>
              <div className="text-4xl font-black text-white drop-shadow mb-2">{result.lucky.name}</div>
              <div className="inline-block text-sm font-bold text-white bg-white/25 rounded-full px-4 py-1.5">
                {result.lucky.meaning}
              </div>
              <div className="flex justify-center gap-1.5 mt-4">
                {result.lucky.keywords.map(k => (
                  <span key={k} className="text-[11px] font-bold text-white/90 bg-white/20 rounded-full px-2.5 py-0.5">#{k}</span>
                ))}
              </div>
            </div>

            {/* 활용 팁 */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5 mb-4">
              <div className="text-xs font-black text-violet-600 mb-1">오늘의 활용 팁 💡</div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.lucky.tip}</p>
            </div>

            {/* 피해야 할 색 */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-4 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full shrink-0 border border-slate-200 dark:border-slate-600" style={{ background: result.avoid.hex }} />
              <div>
                <div className="text-xs font-bold text-slate-400">오늘 피하면 좋은 색</div>
                <div className="text-sm font-black text-slate-700 dark:text-slate-200">{result.avoid.name}</div>
              </div>
            </div>

            <div className="mb-6">
              <ShareButton
                title={`오늘의 행운 색은 ${result.lucky.name}!`}
                description="오늘 나에게 힘이 되는 색은? — 오늘의 행운 색"
                type="fortune"
              />
            </div>

            <ReferralCards placement="result" />
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6">
          오늘의 행운 색은 재미로 보는 참고용입니다. 과학적 근거가 있는 예측이 아닙니다.
        </p>

        <Faq items={SECTION_FAQ['fortune/today-color']} />
      </div>
      <SiteFooter />

      <style jsx>{`
        @keyframes tcPop { 0% { opacity: 0; transform: translateY(10px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .tc-pop { animation: tcPop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  );
}
