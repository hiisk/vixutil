import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import AltseasonBoard from './AltseasonBoard';

export const metadata: Metadata = {
  title: 'Altcoin Season Index — with the coin list it is built from',
  description:
    'Live altcoin season index: the share of the top 50 coins outperforming Bitcoin over 30, 90, 180 or 365 days, computed in your browser from Binance data — with every constituent coin and its return shown, not just the headline number.',
  alternates: { canonical: '/crypto/altseason-index' },
};

const structuredData = [
  webAppJsonLd(
    'Altcoin Season Index',
    'Share of the top 50 Binance coins outperforming Bitcoin over a chosen period, with the full constituent list and each coin’s return.',
    '/crypto/altseason-index',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Altcoin Season Index', path: '/crypto/altseason-index' },
  ]),
];

export default function AltseasonIndexPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Altcoin Season Index</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🌗</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Altcoin Season Index</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Shown with <b className="text-slate-700 dark:text-slate-200">every coin it is built from</b>
          </p>
        </div>

        <AltseasonBoard />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 시세를 받아 그리므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">What the altcoin season index measures</h2>
          <p className="mb-3">
            The index counts how many of the top coins have outperformed Bitcoin over a chosen window and expresses it as a percentage.
            The widely used convention takes the top 50 by market capitalisation, excludes stablecoins and wrapped assets, looks back 90 days,
            and calls a reading of 75 or above an altcoin season and 25 or below a Bitcoin season. This page follows that definition and
            computes it in your browser from Binance daily closes.
          </p>
          <p className="mb-3">
            The difference here is that the constituent list is on the page. A single number cannot be checked — you cannot tell which coins
            were counted, whether one of them is a stablecoin that should have been excluded, or whether the reading rests on a handful of
            outliers. Showing every coin and its return next to Bitcoin&apos;s makes the index verifiable rather than something to take on faith.
          </p>
          <p>
            Two properties are worth keeping in mind while reading it. It is purely relative, so during a broad decline in which altcoins fall
            less than Bitcoin the index can read as an altcoin season while everything on the list is down — the returns column makes that visible.
            And the 75 and 25 lines are conventions rather than measured regime boundaries, so a reading a point or two either side of them is
            better read as borderline than as a change of state.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. This index describes past relative performance and carries no forecast. The universe is ranked by trading
            volume rather than market cap, so membership can differ from other trackers. All decisions and risks are your own.
          </p>
        </div>

        <ReferralCards lang="en" heading="Exchange sign-up bonuses" />

        <Faq items={SECTION_FAQ['crypto/altseason-index']} lang="en" />
      </div>
      <SiteFooter lang="en" />
    </div>
  );
}
