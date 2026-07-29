import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import CorrelationBoard from './CorrelationBoard';

export const metadata: Metadata = {
  title: 'Crypto Correlation Matrix — and how much it moves',
  description:
    'Daily return correlation between the major cryptocurrencies over 90 days to 2 years, shown with how far the same pair drifts across sub-periods and what each coin actually did on days Bitcoin fell hard.',
  alternates: { canonical: '/crypto/correlation' },
};

const structuredData = [
  webAppJsonLd(
    'Crypto Correlation Matrix',
    'Correlation of daily returns between major cryptocurrencies, with sub-period instability and downside behaviour against Bitcoin.',
    '/crypto/correlation',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Correlation Matrix', path: '/crypto/correlation' },
  ]),
];

export default function CorrelationPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Correlation</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🕸️</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Crypto Correlation Matrix</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            With <b className="text-slate-700 dark:text-slate-200">how much the number itself moves</b>
          </p>
        </div>

        <CorrelationBoard />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 시세를 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Correlation is a property of a window, not of a pair</h2>
          <p className="mb-3">
            The matrix reports the correlation of daily returns between the major cryptocurrencies over whichever window you select. That
            part is standard, and on its own it invites a mistake: reading a single number as if it described a stable relationship. Split
            the same window into quarters and the figure for a given pair often moves substantially, which means a portfolio built on the
            average was designed for a relationship that did not hold for much of the period.
          </p>
          <p className="mb-3">
            So the second table shows that spread directly. It also reports what each coin did on the days Bitcoin fell more than three
            percent — because diversification is only tested when things fall, and an all-period average hides exactly those days. That
            column deliberately gives a median move rather than a &quot;crash correlation&quot;: restricting a sample to days when one
            variable moved a lot distorts correlation mechanically, so such a figure can rise or fall for reasons unrelated to whether
            diversification worked. How much each coin actually dropped has no such artefact.
          </p>
          <p>
            The broader conclusion for crypto is unflattering. Almost every pair sits well above zero, and the low readings are low by
            degree rather than in kind. A basket of large-cap coins is closer to one position held in several proportions than to a
            diversified portfolio, and the correlations that matter most tend to tighten precisely when you would want them not to.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Correlation measures past linear co-movement over a chosen window and carries no forecast. All figures
            come from Binance daily closes. All decisions and risks are your own.
          </p>
        </div>

        <ReferralCards lang="en" heading="Exchange sign-up bonuses" />

        <Faq items={SECTION_FAQ['crypto/correlation']} lang="en" />
      </div>
      <SiteFooter lang="en" />
    </div>
  );
}
