import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import DcaCalculator from './DcaCalculator';

export const metadata: Metadata = {
  title: 'Crypto DCA Calculator — what if I had invested?',
  description:
    'Backtest dollar-cost averaging into Bitcoin, Ethereum or any Binance coin: what a recurring buy would be worth today, compared against every other possible start date and against a lump sum. Real daily closes, computed in your browser.',
  alternates: { canonical: '/crypto/dca-calculator' },
};

const structuredData = [
  webAppJsonLd(
    'Crypto DCA Calculator',
    'Dollar-cost averaging backtest across every possible start date, with a lump-sum comparison, built from Binance daily closes.',
    '/crypto/dca-calculator',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'DCA Calculator', path: '/crypto/dca-calculator' },
  ]),
];

export default function DcaCalculatorPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">DCA Calculator</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📅</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Crypto DCA Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            What a recurring buy would be worth — and <b className="text-slate-700 dark:text-slate-200">whether that start date was lucky</b>
          </p>
        </div>

        <DcaCalculator />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 계산기는 브라우저에서 동작하므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">What this DCA calculator answers</h2>
          <p className="mb-3">
            Dollar-cost averaging means buying a fixed amount on a fixed schedule regardless of price. Put in an amount, a frequency and a
            period, and this page replays it against real Binance daily closes: how much you would have put in, how many coins you would hold,
            what it would be worth now, and what your average cost would have been. Everything runs in your browser from public market data.
          </p>
          <p className="mb-3">
            The part most calculators leave out is that <b className="text-slate-700 dark:text-slate-200">the start date does most of the work</b>.
            &quot;$100 a week into Bitcoin since 2020&quot; and the same plan started eighteen months later are not two versions of one strategy —
            they are two different outcomes of the same strategy, and the gap between them is usually larger than any difference between
            strategies. So this page runs your plan from <b className="text-slate-700 dark:text-slate-200">every possible start date</b> in the coin&apos;s
            history and shows the whole spread: the worst, the median, the best, and how often it finished in profit at all.
          </p>
          <p>
            It also checks the common claim that DCA beats investing a lump sum. That is a testable statement, not a given: spreading purchases
            lowers your average cost only if the price falls after you begin, and in a market that mostly rose, buying later means buying higher.
            The page reports how often each approach actually won across that coin&apos;s history, alongside the number of genuinely independent
            windows behind the figure — because crypto history is short, and overlapping windows make a small sample look like a large one.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. A backtest describes one particular past with fees, spread and slippage excluded, and coins that failed and
            were delisted are absent from the data entirely. Past results carry no promise about the future. All decisions and risks are your own.
          </p>
        </div>

        <ReferralCards lang="en" heading="Exchange sign-up bonuses" />

        <Faq items={SECTION_FAQ['crypto/dca-calculator']} />
      </div>
      <SiteFooter />
    </div>
  );
}
