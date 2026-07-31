import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import LongShortBoard from './LongShortBoard';

export const metadata: Metadata = {
  title: 'Long/Short Ratio — accounts, money, and open interest side by side',
  description:
    'Live Binance futures long/short ratios for the biggest markets, showing the account ratio and the position-weighted ratio together — because counting traders is not the same as counting money — alongside open interest.',
  alternates: { canonical: '/crypto/long-short-ratio' },
};

const structuredData = [
  webAppJsonLd(
    'Crypto Long/Short Ratio',
    'Binance futures positioning by account count and by position value, with open interest, for the largest USDT perpetual markets.',
    '/crypto/long-short-ratio',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Long/Short Ratio', path: '/crypto/long-short-ratio' },
  ]),
];

export default function LongShortRatioPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Long/Short Ratio</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="⚔️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Long/Short Ratio</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Where the <b className="text-slate-700 dark:text-slate-200">traders</b> are, and where the <b className="text-slate-700 dark:text-slate-200">money</b> is
          </p>
        </div>

        <LongShortBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 시세를 받아 그리므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Three ratios, three different questions</h2>
          <p className="mb-3">
            Binance publishes long/short positioning in more than one form, and they answer different questions. The global account ratio counts
            traders: what share of accounts holds a long. The top-trader position ratio weights by size: what share of the money in large accounts
            is long. Most trackers pick one of these and label it &quot;the long/short ratio&quot;, which quietly discards the more interesting part.
          </p>
          <p className="mb-3">
            The interesting part is when they disagree. A market where most accounts are long while the large positions lean short is telling you
            that the crowd and the capital are on opposite sides — a very different picture from one where both agree. This page shows both, plus
            the gap between them, plus open interest so you can see whether a lopsided reading sits on a deep market or a thin one.
          </p>
          <p>
            What it deliberately does not do is turn any of this into a signal. The popular version — fade the crowd when positioning gets extreme —
            is testable in principle, but Binance only exposes thirty days of this history, which is a single market mood. A backtest over it would
            return a number that looks like evidence and is not, so no backtest is shown.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Positioning describes where participants currently stand and carries no forecast. The figures cover Binance
            futures only, not the wider market. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/long-short-ratio']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
