import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import TimingBoard from './TimingBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'What If You Had Sold at the Top? — the cost of missing the best days',
  description:
    'Compare perfect timing, buy and hold, and missing the best days for Bitcoin and any Binance coin — and see how close the best days sit to the worst.',
  alternates: { canonical: '/crypto/sold-at-top' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Market Timing Counterfactual',
    'Perfect timing versus buy and hold versus missing the best days, with proximity analysis of extreme days.',
    '/crypto/sold-at-top',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Sold at the Top', path: '/crypto/sold-at-top' },
  ]),
];

export default function SoldAtTopPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="rose" />
      <JsonLd data={structuredData} />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Sold at the Top</span>
        </div>
      </header>

      <div className="hero-band max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="😤" className="h-6 w-6" /></span>
          <h1 className="page-h1">What If You Had Sold at the Top?</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            And what it costs to <b className="text-slate-700 dark:text-slate-200">be out on the wrong day</b>
          </p>
        </div>

        <TimingBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          정적 렌더 영역. 위 보드는 브라우저에서 전체 이력을 받아 계산하므로
          자바스크립트를 실행하지 않는 크롤러에겐 아래 본문이 페이지의 내용이다.
        */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">The two scenarios are the same scenario</h2>
          <p className="mb-3">
            Everyone who has held through a crash has run the counterfactual: sell at the top, buy back at the bottom, keep the difference.
            The arithmetic of that fantasy is easy to produce and comes out absurd — holding only on the days a coin rose returns a figure
            with more digits than there is money in the world. A result that large is not an ambitious target. It is the calculation telling
            you the assumption is impossible.
          </p>
          <p className="mb-3">
            The version worth measuring is the realistic failure. Attempts to sell the top mostly end with being out of the market for a
            handful of days, and in an asset where returns are concentrated into a few sessions, that is expensive out of all proportion to
            the time involved. Missing twenty days out of several thousand is enough to turn nine years of Bitcoin into nothing.
          </p>
          <p>
            The reason both cannot be had is timing, not skill. The largest single-day gains sit immediately beside the largest single-day
            losses, because violent rebounds are what follow capitulation. Bitcoin&apos;s best day in its listed history came the day after its
            worst. Anyone in cash for the crash was, in all likelihood, still in cash the following morning.
          </p>
        </section>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. These are backward-looking counterfactuals computed on historical closes with no fees, spreads,
            slippage or tax, and past concentration of returns is not a promise about future ones. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/sold-at-top']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
