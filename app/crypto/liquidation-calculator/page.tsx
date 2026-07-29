import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import LiquidationCalculator from './LiquidationCalculator';

export const metadata: Metadata = {
  title: 'Liquidation Calculator — price, and the odds of getting there',
  description:
    'Calculate the liquidation price of a leveraged crypto position from entry, leverage and margin — then see the probability of actually hitting it within 7, 30 and 90 days, from each coin’s measured volatility. Long and short, isolated margin, added margin.',
  alternates: { canonical: '/crypto/liquidation-calculator' },
};

const structuredData = [
  webAppJsonLd(
    'Crypto Liquidation Calculator',
    'Liquidation price for a leveraged futures position, plus the probability of reaching it computed from the coin’s measured volatility. Runs entirely in your browser.',
    '/crypto/liquidation-calculator',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Liquidation Calculator', path: '/crypto/liquidation-calculator' },
  ]),
];

export default function LiquidationCalculatorPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Liquidation Calculator</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">⚠️</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Crypto Liquidation Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            The liquidation price — and <b className="text-slate-700 dark:text-slate-200">the probability of reaching it</b>
          </p>
        </div>

        <LiquidationCalculator />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 계산기는 브라우저에서 동작하므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">How to use this liquidation calculator</h2>
          <p className="mb-3">
            A leveraged position is closed by the exchange when losses eat into the margin far enough that what is left equals the
            <b className="text-slate-700 dark:text-slate-200"> maintenance margin</b>. This calculator finds that price from your entry, leverage, margin and
            maintenance margin rate, for both long and short positions, and lets you add margin to push it further away. Everything is
            computed in your browser and nothing you type is stored or sent anywhere.
          </p>
          <p>
            Most liquidation calculators stop at the price. But &quot;your liquidation is at $80,000&quot; does not tell you whether that is
            dangerous — a 20% drawdown is routine in a volatile coin and rare in a quiet one. So this page also gives the
            <b className="text-slate-700 dark:text-slate-200"> probability of touching that price within 7, 30 and 90 days</b>, computed from each coin&apos;s own
            measured volatility. The same leverage carries very different risk depending on what you put it on, and that number shows it directly.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. This figure excludes trading fees, funding payments, tiered maintenance margin and the exchange&apos;s
            insurance-fund mechanics, so it is an <b className="text-slate-700 dark:text-slate-200">optimistic estimate</b> — real liquidation comes sooner.
            Check your exchange&apos;s own liquidation price before placing an order. All trading decisions and risks are your own.
          </p>
        </div>

        <ReferralCards lang="en" heading="Exchange sign-up bonuses" />

        <Faq items={SECTION_FAQ['crypto/liquidation-calculator']} />
      </div>
      <SiteFooter />
    </div>
  );
}
