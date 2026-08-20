import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import FearGreedBoard from './FearGreedBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Crypto Fear & Greed Index — and whether it actually works',
  description:
    'The live crypto Fear & Greed Index with its percentile against every reading since 2018 — plus a direct backtest of the "buy when there is fear" rule against Bitcoin returns, with the real sample size shown.',
  alternates: { canonical: '/crypto/fear-greed-index' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Fear & Greed Index',
    'Live Fear & Greed Index with historical percentile and a backtest of forward Bitcoin returns by index reading.',
    '/crypto/fear-greed-index',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Fear & Greed Index', path: '/crypto/fear-greed-index' },
  ]),
];

export default function FearGreedPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Fear &amp; Greed</span>
        </div>
      </header>

      <div className="hero-band max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="😱" className="h-6 w-6" /></span>
          <h1 className="page-h1">Crypto Fear &amp; Greed Index</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            With a <b className="text-slate-700 dark:text-slate-200">direct test</b> of whether it has been worth acting on
          </p>
        </div>

        <FearGreedBoard />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 지수와 시세를 받아
          그리므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">A number, and then the obvious question</h2>
          <p className="mb-3">
            The Fear &amp; Greed Index compresses volatility, momentum and volume, social activity, Bitcoin dominance and search interest into a
            single reading from 0 to 100. Plenty of sites display it. Almost none answer the question anybody actually has on seeing it, which is
            whether a low reading has historically been a good moment to buy.
          </p>
          <p className="mb-3">
            That question is testable, so this page tests it: every daily reading since 2018 is joined to Bitcoin&apos;s closing price and grouped
            by category, and the median return over the following 30 and 90 days is reported for each. The percentile beside the current value
            does the same job in the other direction — a reading of 25 means little in isolation and quite a lot once you know what share of the
            last several years sat below it.
          </p>
          <p>
            The sample deserves care rather than confidence. Consecutive days at the same reading are one event, not thirty, so the table counts
            episodes as well as days and the episode number is the honest one. The windows overlap, and the whole history sits inside a single
            Bitcoin era. What the table gives you is a check on a widely repeated claim, not a strategy — and a check is worth more than repeating
            the claim untested.
          </p>
        </section>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Historical groupings describe what happened in one market over a few years and carry no promise about the
            future. The index is published by alternative.me and this page does not control its methodology. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/fear-greed-index']} lang="en" />
      </div>
      <Ad lang="en" placement="result" />
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
