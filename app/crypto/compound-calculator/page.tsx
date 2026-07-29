import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import CompoundCalculator from './CompoundCalculator';

export const metadata: Metadata = {
  title: 'Crypto Compound & Staking Calculator — APR vs APY, and the price risk',
  description:
    'Compound a crypto yield properly, convert between APR and APY, and see the price fall that would erase the whole return — with how likely that fall is for the coin you are earning it in.',
  alternates: { canonical: '/crypto/compound-calculator' },
};

const structuredData = [
  webAppJsonLd(
    'Crypto Compound & Staking Calculator',
    'Compound interest with APR to APY conversion, plus the break-even price drop and its modelled probability for the underlying coin.',
    '/crypto/compound-calculator',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Compound Calculator', path: '/crypto/compound-calculator' },
  ]),
];

export default function CompoundCalculatorPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Compound Calculator</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🌱</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Compound &amp; Staking Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            APR vs APY — and <b className="text-slate-700 dark:text-slate-200">the price fall that erases both</b>
          </p>
        </div>

        <CompoundCalculator />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 계산기는 브라우저에서 변동성을 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Two things a yield number hides</h2>
          <p className="mb-3">
            The first is the difference between APR and APY. APR is the rate before compounding, APY is what you actually receive once
            interest earns interest — 12% APR compounded daily is 12.75% APY. Products advertise whichever number looks better, so comparing
            one platform&apos;s APR against another&apos;s APY manufactures a gap that does not exist. This page converts both ways and shows
            the difference explicitly.
          </p>
          <p className="mb-3">
            The second is much larger. Yield paid in a token increases the number of coins you hold, not the value of the position. A 12%
            return is erased not by a 12% price fall but by a 10.7% one, because the loss applies to the grown balance rather than to what you
            put in. And crypto price movement dwarfs any rate on offer: this page reads the coin&apos;s measured volatility and reports how
            likely that break-even fall is within a year.
          </p>
          <p>
            Neither point argues against earning yield. They argue against reading the yield as the outcome. On an asset whose ordinary annual
            swing is fifty to a hundred percent, a double-digit rate is a rounding adjustment to a decision that was really about the token —
            and it is worth knowing that before locking anything up.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Lock-up periods, unbonding delays, smart-contract risk, validator slashing, and rates funded by token
            emissions rather than revenue are all excluded from this arithmetic. All decisions and risks are your own.
          </p>
        </div>

        <ReferralCards lang="en" heading="Exchange sign-up bonuses" />

        <Faq items={SECTION_FAQ['crypto/compound-calculator']} lang="en" />
      </div>
      <SiteFooter lang="en" />
    </div>
  );
}
