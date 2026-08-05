import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import DepthBoard from './DepthBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Crypto Slippage Calculator — walk the live order book',
  description:
    'See what a market order really costs on any Binance pair: average fill price, slippage in basis points by order size, resting liquidity near the mid, and the cost to move the price.',
  alternates: { canonical: '/crypto/slippage' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Slippage & Order Book Depth',
    'Live order-book slippage by order size, depth bands and cost to move the price for any Binance pair.',
    '/crypto/slippage',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Slippage', path: '/crypto/slippage' },
  ]),
];

export default function SlippagePage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Slippage</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="📶" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Slippage &amp; Order Book Depth</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            The cost everyone checks <b className="text-slate-700 dark:text-slate-200">after</b> the trade
          </p>
        </div>

        <DepthBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          정적 렌더 영역. 위 보드는 실시간 호가창을 받아 계산하므로
          자바스크립트를 실행하지 않는 크롤러에겐 아래 본문이 페이지의 내용이다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">The fee is the small number</h2>
          <p className="mb-3">
            Exchange fees are advertised, compared and argued about to the second decimal place. Slippage is neither advertised nor easy to
            look up, and on anything other than the deepest pairs it is the larger of the two by a wide margin. A market order does not
            execute at the price on the screen; it consumes resting orders one level at a time, and the average of those levels is what you
            actually pay.
          </p>
          <p className="mb-3">
            The relationship is not linear either. Doubling the order size more than doubles the slippage, because the book thins out as you
            move away from the mid. That is why the same trade that costs a basis point at retail size can cost fifty at institutional size,
            and why the useful question is never &quot;what is the spread&quot; but &quot;how much money is resting within one percent of
            here&quot;.
          </p>
          <p>
            It is also charged twice. Every position pays it entering and pays it again leaving, so a round trip on a thin pair can start
            several percent underwater before the market has done anything at all. For short-horizon strategies this is frequently the
            difference between a backtest that works and a live account that does not.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Figures come from a single live order-book snapshot and assume resting orders do not move, which is not
            how markets behave under size. Treat them as a lower bound on real execution cost. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/slippage']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
