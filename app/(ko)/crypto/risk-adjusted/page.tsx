import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import RiskAdjustedBoard from './RiskAdjustedBoard';

export const metadata: Metadata = {
  title: 'Risk-Adjusted Crypto Returns — Sharpe, Sortino and Calmar side by side',
  description:
    'Sharpe, Sortino and Calmar ratios for the largest crypto assets over 180 days to 2 years, shown together with how many places each coin moves between them — because the three ratios frequently disagree.',
  alternates: { canonical: '/crypto/risk-adjusted' },
};

const structuredData = [
  webAppJsonLd(
    'Risk-Adjusted Crypto Returns',
    'Sharpe, Sortino and Calmar ratios for major cryptocurrencies with rank disagreement between the three measures.',
    '/crypto/risk-adjusted',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Risk-Adjusted Returns', path: '/crypto/risk-adjusted' },
  ]),
];

export default function RiskAdjustedPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Risk-Adjusted</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="📐" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Risk-Adjusted Returns</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Three ratios — and <b className="text-slate-700 dark:text-slate-200">how much they disagree</b>
          </p>
        </div>

        <RiskAdjustedBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 시세를 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">&quot;Best risk-adjusted&quot; depends on the definition of risk</h2>
          <p className="mb-3">
            Return alone ranks assets by how much they went up, which says nothing about what holding them felt like. Risk-adjusted ratios
            divide return by some measure of risk, and the choice of measure changes the answer. This page computes three of them for the
            largest crypto assets and, more importantly, shows how far apart their rankings are.
          </p>
          <p className="mb-3">
            Sharpe divides by total standard deviation. It is the most quoted and the least suited to crypto: it assumes a normal
            distribution that fat-tailed daily returns violate, and it treats a violent rally as risk. Sortino divides only by downside
            deviation, which removes the second objection. Calmar divides annual return by the worst drawdown actually endured, which avoids
            distributional assumptions entirely but rests on a single historical episode.
          </p>
          <p>
            None of the three is right in general, so the rank-spread column is the point of the page. A coin near the top under one ratio and
            far down under another is not a discovery about the coin; it is a demonstration that any single ranking you were shown elsewhere
            was a choice of definition presented as a measurement.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Every ratio here is computed from past returns over a chosen window, and past return in particular does
            not persist. The risk-free rate is taken as zero. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/risk-adjusted']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
