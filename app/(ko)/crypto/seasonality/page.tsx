import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import SeasonalityBoard from './SeasonalityBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Crypto Monthly Seasonality — with the sample size that kills it',
  description:
    'Median return by calendar month for Bitcoin and any Binance coin, shown next to the number of years behind each figure and the probability of seeing that split from a fair coin. "Uptober" and "September is weak", measured properly.',
  alternates: { canonical: '/crypto/seasonality' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Monthly Seasonality',
    'Median monthly returns by calendar month with per-month sample sizes and binomial significance, for any Binance coin.',
    '/crypto/seasonality',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Seasonality', path: '/crypto/seasonality' },
  ]),
];

export default function SeasonalityPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Seasonality</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="🗓️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Monthly Seasonality</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Shown with the <b className="text-slate-700 dark:text-slate-200">sample size</b> that usually gets left out
          </p>
        </div>

        <SeasonalityBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 전체 이력을 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Nine Octobers is nine observations</h2>
          <p className="mb-3">
            This page groups a coin&apos;s daily closes into calendar months and reports the median return for each, along with how many years
            were up. That much is standard. What is usually missing is the count beside it: a monthly seasonality figure does not rest on
            thousands of days of data, it rests on the number of times that month has occurred. Bitcoin&apos;s Binance history covers about nine
            years, so every monthly figure here is built from roughly nine numbers.
          </p>
          <p className="mb-3">
            Nine is small enough that ordinary randomness produces striking-looking patterns. Seven up years out of nine reads as a strong
            tendency and happens by chance often enough to need no explanation, which is why a p-value sits beside each month — the probability
            of seeing a split that lopsided, or more, from a fair coin. Most named crypto seasonal patterns do not survive that column.
          </p>
          <p>
            The second problem is that twelve months are examined at once. Testing twelve things against a 5% threshold yields about 0.6
            apparent hits from randomness alone, so finding one dramatic month in the calendar is the expected result of looking rather than a
            finding. Altcoins are worse still: a coin listed three years ago has three observations per month, which is not seasonality but
            three coincidences. The table is shown so that thinness is visible, not so it can be traded.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Monthly groupings describe a handful of past observations per month and carry no forecast. Returns are
            computed from Binance daily closes and exclude any period before the coin listed there. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/seasonality']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
