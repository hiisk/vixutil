import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import RuinCalculator from './RuinCalculator';

export const metadata: Metadata = {
  title: 'Risk of Ruin Calculator — the same edge at different bet sizes',
  description:
    'Work out the probability of losing a given share of your account from a win rate, a reward ratio and a risk per trade — and see how far the answer moves when only the bet size changes.',
  alternates: { canonical: '/crypto/risk-of-ruin' },
};

const structuredData = [
  webAppJsonLd(
    'Risk of Ruin Calculator',
    'Gambler’s ruin probability from win rate, reward ratio and risk per trade, solved in closed form, with a comparison across bet sizes.',
    '/crypto/risk-of-ruin',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Risk of Ruin', path: '/crypto/risk-of-ruin' },
  ]),
];

export default function RiskOfRuinPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Risk of Ruin</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="💀" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Risk of Ruin</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            The same edge, <b className="text-slate-700 dark:text-slate-200">wildly different outcomes</b>, from bet size alone
          </p>
        </div>

        <RuinCalculator />

        {/*
          이 페이지는 순수 계산이라 서버에서 그려도 되지만, 입력 상호작용이 필요해
          클라이언트 컴포넌트로 둔다. 아래 설명은 서버에서 정적으로 렌더된다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Bet size decides more than the edge does</h2>
          <p className="mb-3">
            Risk of ruin is the probability that a run of losses takes an account down to some level you would not continue from. It depends
            on three things: how often you win, how much a win pays relative to a loss, and what fraction of the account each trade risks.
            The first two get all the attention. The third moves the answer far more.
          </p>
          <p className="mb-3">
            The comparison table holds the edge fixed and varies only the bet size, and the chance of ruin changes by orders of magnitude
            across it. That is why the same strategy can be perfectly survivable for one trader and fatal for another, and why arguments about
            entries are usually arguments about the least important input.
          </p>
          <p>
            One limit is worth stating clearly. If expectancy is negative — if the win rate is below the break-even level that the reward ratio
            demands — then ruin is certain given enough trades, and betting smaller only postpones it. The common advice to reduce size treats a
            size problem as though it could fix an edge problem, and it cannot.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. The model assumes independent trades with a fixed win rate and reward ratio; real losses cluster, which
            makes ruin more likely than shown. Win rates entered from memory or from a short record are usually too optimistic. All decisions
            and risks are your own.
          </p>
        </div>

        <ReferralCards lang="en" heading="Exchange sign-up bonuses" />

        <Faq items={SECTION_FAQ['crypto/risk-of-ruin']} lang="en" />
      </div>
      <SiteFooter lang="en" />
    </div>
  );
}
