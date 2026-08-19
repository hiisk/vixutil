import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import RebalanceBoard from './RebalanceBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Crypto Rebalancing Simulator — did it actually help?',
  description:
    'Backtest weekly, monthly and quarterly rebalancing of an equal-weight crypto portfolio against simply leaving it alone, with trading fees deducted and both drawdowns shown.',
  alternates: { canonical: '/crypto/rebalancing' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Rebalancing Simulator',
    'Historical comparison of periodic rebalancing against buy-and-hold for an equal-weight crypto portfolio, net of fees.',
    '/crypto/rebalancing',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Rebalancing', path: '/crypto/rebalancing' },
  ]),
];

export default function RebalancingPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rebalancing</span>
        </div>
      </header>

      <div className="hero-band max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="⚗️" className="h-6 w-6" /></span>
          <h1 className="page-h1">Rebalancing Simulator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            The advice is everywhere — <b className="text-slate-700 dark:text-slate-200">this measures whether it worked</b>
          </p>
        </div>

        <RebalanceBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 시뮬레이터는 브라우저에서 시세를 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Rebalancing is a bet on mean reversion</h2>
          <p className="mb-3">
            Returning a portfolio to fixed weights sells whatever went up and buys whatever went down. That is profitable when assets take turns
            leading, because it trims the expensive holding and adds to the cheap one. It is costly when one asset simply keeps winning, because
            it repeatedly cuts the winner and funds the laggard. Which case you are in decides the outcome entirely, and crypto has mostly been
            the second, though the margin over any particular window is often small and can go either way — which is the reason to run the
            comparison rather than accept a rule of thumb.
          </p>
          <p className="mb-3">
            The claim that rebalancing reduces risk is conditional in the same way. During a sustained decline it makes drawdown worse, since
            every rebalance moves money into the asset that is falling. It only cushions drawdown when the assets mean-revert against each
            other. Both drawdown columns are shown side by side so that direction is visible instead of assumed.
          </p>
          <p>
            Fees are deducted because omitting them flatters rebalancing, and the effect scales with frequency — weekly rebalancing trades
            roughly thirteen times as often as quarterly for the same portfolio. Taxes are not modelled, and where each rebalance counts as a
            disposal they can outweigh every other effect on this page.
          </p>
        </section>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. This is a backtest over one window and a handful of coins that survived to be listed today; coins that
            failed are absent from the comparison entirely. Slippage and taxes are excluded. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/rebalancing']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
