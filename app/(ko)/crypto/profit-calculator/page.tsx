import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import ProfitCalculator from './ProfitCalculator';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Crypto Profit Calculator — with fees, and your real break-even',
  description:
    'Work out the profit or loss on a crypto trade including the fee charged on both entry and exit, plus the break-even price those fees actually create. Long and short, any leverage, computed in your browser.',
  alternates: { canonical: '/crypto/profit-calculator' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Profit Calculator',
    'Profit and loss on a crypto trade with entry and exit fees included, plus the resulting break-even price, for long or short positions at any leverage.',
    '/crypto/profit-calculator',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Profit Calculator', path: '/crypto/profit-calculator' },
  ]),
];

export default function ProfitCalculatorPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Profit Calculator</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="🧮" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Crypto Profit Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            With fees — and <b className="text-slate-700 dark:text-slate-200">the break-even price they create</b>
          </p>
        </div>

        <ProfitCalculator />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 계산기는 브라우저에서 동작하므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Why break-even sits above your entry</h2>
          <p className="mb-3">
            Put in an entry, an exit and a position size and this page returns the profit or loss, the return on the margin actually used,
            and the fees paid. The part most profit calculators omit is the fee itself, which is charged twice — once when the position opens
            and once when it closes. Leaving it out produces a figure that is always slightly too flattering and, near the entry price,
            flatly wrong about whether the trade made money.
          </p>
          <p className="mb-3">
            Because both sides are charged, coming back to your entry price is a loss, not a wash. Break-even is entry × (1 + fee) / (1 − fee)
            for a long — at 0.1% per side that is about 0.2002% above entry, slightly more than double the one-way fee, because the exit fee
            applies to the larger exit amount rather than to your entry. That gap is trivial on a single position held for months and decisive
            for anyone trading several times a day.
          </p>
          <p>
            Leverage is shown separately for the same reason. It does not change the profit in dollars: once the position size is set, a given
            price move pays the same amount regardless of leverage. What changes is the margin posted, and therefore the percentage return
            quoted on it. Treating a higher ROI from leverage as a bigger gain is the same category error as ignoring fees.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Funding payments on perpetual positions, slippage and any withdrawal costs are excluded, and a leveraged
            position can be liquidated before it reaches your exit price. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/profit-calculator']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
