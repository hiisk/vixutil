import Link from 'next/link';
import type { Metadata } from 'next';
import { WORLDCUPS } from '@/lib/worldcup-data';
import { NEW_WORLDCUP_SLUGS } from '@/lib/new-content';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';

export const metadata: Metadata = {
  title: '이상형 월드컵',
  description: '음식·치킨·라면·여행지 등 이상형 월드컵 — 둘 중 하나 고르기로 16강부터 결승까지, 나의 최애를 가려보세요',
  alternates: { canonical: '/worldcup' },
};

const CARD_GRADIENTS = [
  'from-rose-500 to-pink-600',
  'from-amber-400 to-orange-500',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-emerald-400 to-teal-600',
  'from-fuchsia-500 to-rose-500',
  'from-orange-400 to-red-500',
  'from-cyan-500 to-sky-600',
];

export default function WorldcupIndexPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="font-black text-rose-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">이상형 월드컵</span>
          <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">{WORLDCUPS.length}개</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-rose-600 tracking-widest uppercase mb-2">Ideal Worldcup</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">이상형 월드컵</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          둘 중 하나만 고르기 — 16강부터 결승까지, 진짜 <strong className="text-slate-700 dark:text-slate-200">최애</strong>를 가려보세요
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {WORLDCUPS.map((w, i) => (
            <Link
              key={w.slug}
              href={`/worldcup/${w.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}
            >
              {NEW_WORLDCUP_SLUGS.has(w.slug) && (
                <span className="absolute top-2 right-2 text-[10px] font-black bg-white/90 text-rose-600 rounded-full px-2 py-0.5">NEW</span>
              )}
              <div className="text-4xl drop-shadow-lg transition-transform group-hover:scale-110">{w.icon}</div>
              <div>
                <div className="text-lg font-black drop-shadow leading-tight">{w.title}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{w.desc}</div>
                <div className="text-[10px] font-bold text-white/70 mt-2">{w.items.length}강 · {w.category}</div>
              </div>
            </Link>
          ))}
        </div>

        <Faq items={SECTION_FAQ.worldcup} />
      </div>
      <SiteFooter />
    </div>
  );
}
