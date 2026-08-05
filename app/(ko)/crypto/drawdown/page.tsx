import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import DrawdownBoard from './DrawdownBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Crypto Drawdown & Time Underwater — depth is only half the story',
  description:
    'Every drawdown of 10% or more for any Binance coin, with how long each took to fall and to recover, plus the share of days the asset has spent below a previous high.',
  alternates: { canonical: '/crypto/drawdown' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Drawdown Analysis',
    'Drawdown episodes with decline and recovery duration, and the proportion of days spent below a previous high.',
    '/crypto/drawdown',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Drawdown', path: '/crypto/drawdown' },
  ]),
];

export default function DrawdownPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Drawdown</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="🌊" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Drawdown &amp; Time Underwater</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Depth is quoted everywhere — <b className="text-slate-700 dark:text-slate-200">duration is what you actually live through</b>
          </p>
        </div>

        <DrawdownBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 전체 이력을 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">A 50% drawdown is not one number</h2>
          <p className="mb-3">
            Maximum drawdown is normally reported as a single depth, which makes two very different histories look the same. One asset falls
            half and recovers within a quarter; another falls half and is still below that level three years later. The depth figure is
            identical and the experience of holding them is not remotely comparable.
          </p>
          <p className="mb-3">
            So this page lists every drawdown of ten percent or more with three durations: how long the fall took, how long the recovery took,
            and the total time spent below the old high. The deepest episode and the longest one are frequently different, which is a useful
            thing to see before deciding that depth is the risk you care about.
          </p>
          <p>
            The figure that gets omitted most often is the share of all days spent below a previous high. It tends to be surprisingly large even
            for assets that rose enormously, because new highs are rare by construction — most days sit somewhere under a level you have already
            seen. Knowing that proportion in advance is a better test of whether you can hold something than knowing its worst depth.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Figures use daily closes since the coin listed on Binance, so an earlier peak on another venue is not
            counted and intraday lows are excluded. A drawdown that has not recovered is measured to today and will keep growing. All decisions
            and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/drawdown']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
