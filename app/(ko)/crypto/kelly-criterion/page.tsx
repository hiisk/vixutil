import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import KellyCalculator from './KellyCalculator';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Kelly Criterion Calculator — and why to bet less than it says',
  description:
    'Compute the Kelly bet size from your win rate and reward ratio, then compare quarter, half and full Kelly on growth kept versus the chance of ever halving the account.',
  alternates: { canonical: '/crypto/kelly-criterion' },
});

const structuredData = [
  webAppJsonLd(
    'Kelly Criterion Calculator',
    'Kelly bet sizing with fractional Kelly comparison of growth rate against drawdown probability.',
    '/crypto/kelly-criterion',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Kelly Criterion', path: '/crypto/kelly-criterion' },
  ]),
];

export default function KellyPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <JsonLd data={structuredData} />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Kelly Criterion</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="🎯" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Kelly Criterion Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            The optimal bet size, and <b className="text-slate-700 dark:text-slate-200">why nobody uses all of it</b>
          </p>
        </div>

        <KellyCalculator />

        <ReferralCards lang="en" placement="result" />

        {/*
          정적 렌더 영역. 위 계산기는 클라이언트 상태에 의존하므로
          자바스크립트 없는 크롤러에겐 아래 본문이 페이지의 실질 내용이다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Optimal, and almost never advisable</h2>
          <p className="mb-3">
            The Kelly criterion answers a narrow question precisely: given a known edge, what fraction of capital maximises the long-run
            growth rate? The formula is (p·b − q) ÷ b, and betting more than it prescribes lowers growth rather than raising it. That much is
            settled mathematics, not opinion.
          </p>
          <p className="mb-3">
            What the formula does not do is account for being wrong about the inputs. Every term in it is an estimate drawn from a finite
            record, and the cost of overestimating an edge is far larger than the reward for underestimating it — growth reaches zero at
            roughly twice the Kelly fraction, so the usable range is narrow on one side and forgiving on the other. Sizing below the optimum
            is the cheap mistake.
          </p>
          <p>
            The volatility is the other objection, and it is the one people meet first. Betting the full fraction carries a one-in-two chance
            of the account halving at some point, and that figure holds regardless of how good the strategy is. Fractional Kelly exists
            because a strategy abandoned during a drawdown compounds at zero, whatever its theoretical growth rate was.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. The output is a mathematical optimum under assumptions — a known and constant edge, independent trades,
            infinitely divisible bets — that real trading violates in every particular. Treat it as an upper bound on sensible size, never a
            recommendation. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/kelly-criterion']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
