import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import FundingBoard from './FundingBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Funding Rates — annualised with each coin’s real settlement interval',
  description:
    'Live Binance perpetual funding rates for every USDT pair, annualised using each symbol’s actual settlement interval rather than assuming 8 hours. See what funding costs on a position you size, and where the current rate sits against that coin’s own history.',
  alternates: { canonical: '/crypto/funding-rates' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Funding Rates',
    'Binance perpetual funding rates annualised per symbol using its real settlement interval, with a position cost calculator and historical percentile.',
    '/crypto/funding-rates',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Funding Rates', path: '/crypto/funding-rates' },
  ]),
];

export default function FundingRatesPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Funding Rates</span>
        </div>
      </header>

      <div className="hero-band max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="💸" className="h-6 w-6" /></span>
          <h1 className="page-h1">Crypto Funding Rates</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Annualised with <b className="text-slate-700 dark:text-slate-200">each coin&apos;s real settlement interval</b>
          </p>
        </div>

        <FundingBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 시세를 받아 그리므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">What a funding rate is</h2>
          <p className="mb-3">
            A perpetual futures contract never expires, so nothing forces its price back to spot. Funding is the mechanism that does it:
            at fixed intervals, one side pays the other in proportion to the gap between the perpetual and the index. When the perpetual
            trades above spot the rate is positive and longs pay shorts; when it trades below, shorts pay longs. It is not a fee the
            exchange collects — it moves between traders.
          </p>
          <p className="mb-3">
            The number shown on an exchange is per settlement, which makes it look small. Annualising is the honest way to see its size,
            and that is where most funding tables go wrong: they multiply by three settlements a day for every symbol. Binance does not
            run every contract on an 8-hour schedule — a large share settle every 4 hours, and a handful every hour. Annualising one of
            those as if it were 8-hourly reports exactly half the real figure. This page reads each symbol&apos;s actual interval and uses it.
          </p>
          <p>
            Size alone still does not tell you whether a rate is unusual, because different coins live at different baselines. So selecting
            a row also shows where the current rate sits against that coin&apos;s own past settlements. A rate in the 95th percentile for its
            own history is informative; the same number in the middle of its usual range is not.
          </p>
        </section>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Funding rates change every settlement and only the next one is fixed; annualised figures assume a rate
            that will not hold. Fees, borrow costs and slippage are excluded throughout. All trading decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/funding-rates']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
