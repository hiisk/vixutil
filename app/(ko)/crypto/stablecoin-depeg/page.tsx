import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import DepegBoard from './DepegBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Stablecoin Depeg Monitor — in basis points, against the right yardstick',
  description:
    'Live deviation from parity for USDC, FDUSD, TUSD and other stablecoins, reported in basis points and measured against USDT — with USDT’s own drift backed out of the median so you can tell which side is moving.',
  alternates: { canonical: '/crypto/stablecoin-depeg' },
});

const structuredData = [
  webAppJsonLd(
    'Stablecoin Depeg Monitor',
    'Basis-point deviation from parity for major stablecoins on Binance, with USDT’s own implied drift inferred from the median.',
    '/crypto/stablecoin-depeg',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Stablecoin Depeg', path: '/crypto/stablecoin-depeg' },
  ]),
];

export default function StablecoinDepegPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Stablecoin Depeg</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="⚓" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="page-h1">Stablecoin Depeg Monitor</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            In basis points — and against <b className="text-slate-700 dark:text-slate-200">the right yardstick</b>
          </p>
        </div>

        <DepegBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 시세를 받아 그리므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Two things most depeg trackers get wrong</h2>
          <p className="mb-3">
            The first is the unit. A stablecoin at 0.9985 is 15 basis points from parity, which a percentage display rounds to 0.15% or, worse,
            to 0.00%. Fifteen basis points is routine market-making; a hundred and fifty is a different event entirely. Reporting in basis
            points is the only way those two look as different as they are.
          </p>
          <p className="mb-3">
            The second is the reference. Binance quotes stablecoins against USDT, so every number on this board is a comparison to USDT
            rather than to a dollar. When USDT itself drifts, all the other rows move the opposite way and a tracker that says nothing about
            it will report a synchronised &quot;depeg&quot; of everything except the one coin actually moving. Taking the median of the others
            and inverting it recovers USDT&apos;s own drift, which is shown at the top.
          </p>
          <p>
            One more constraint follows from the arithmetic: only dollar-pegged tokens belong on a board measured against dollar parity. A
            euro-pegged stablecoin trades near 1.15 against USDT because that is the exchange rate, and reporting it as fourteen hundred basis
            points off peg would be a statement about EUR/USD rather than about the token.
          </p>
          <p>
            Even done properly, the measurement has a hard limit: price is the market&apos;s opinion about whether reserves exist and are
            redeemable, not evidence about it. That opinion has been wrong in both directions before — slow to react in some failures, and
            briefly panicked about tokens that turned out fine.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Figures cover Binance spot markets only; the same token can trade differently elsewhere or redeem at a
            different value entirely. A wide deviation on a thinly traded pair reflects the order book rather than the token. All decisions and
            risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/stablecoin-depeg']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
