import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import CompareBoard from './CompareBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Compare Two Cryptocurrencies — returns, risk and whether they differ at all',
  description:
    'Compare any two Binance coins side by side: returns across several windows, volatility, beta to Bitcoin, distance from all-time high, worst drawdown, and the correlation that decides whether holding both is really one position.',
  alternates: { canonical: '/crypto/compare' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Coin Comparison',
    'Side-by-side comparison of two cryptocurrencies across multiple return windows plus volatility, beta, drawdown and correlation.',
    '/crypto/compare',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Compare Coins', path: '/crypto/compare' },
  ]),
];

export default function ComparePage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Compare</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="⚖️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Compare two coins</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Including whether they are <b className="text-slate-700 dark:text-slate-200">really different bets</b>
          </p>
        </div>

        <CompareBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 비교는 브라우저에서 시세를 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Bitcoin vs Ethereum, and every other pairing</h2>
          <p className="mb-3">
            Pick two coins and this page puts their returns next to each other over 30 days, 90 days, one year and two years, alongside
            volatility, beta to Bitcoin, how far each sits below its all-time high, the worst drawdown in its history, and what each did on
            the days Bitcoin fell hard. Everything is computed in your browser from Binance daily closes.
          </p>
          <p className="mb-3">
            Several windows are shown rather than one because the window usually decides the winner. A comparison that leads with a single
            return figure has quietly made a choice on your behalf, and if the lead changes between one month and two years then the headline
            was a choice of period rather than a property of the asset. Where that happens, the page says so.
          </p>
          <p>
            The number most comparisons omit is the correlation between the two. When it sits above roughly 0.7 — as it does for most
            large-cap crypto pairs — the coins mostly differ in how much they move rather than in when, so picking between them is closer to
            choosing exposure than to choosing a different bet, and owning both is not diversification. That figure decides whether the rest
            of the table is answering an interesting question at all.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Every figure here describes the past, and coins with shorter histories are being judged on shorter and
            often easier samples. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/compare']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
