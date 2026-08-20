import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import AthBoard from './AthBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'How far is each coin from its all-time high?',
  description:
    'Live board of how far every major crypto sits below its all-time high, and the gain required to get back — because a 50% drop needs a 100% gain, not a 50% one. Computed in your browser from Binance daily closes.',
  alternates: { canonical: '/crypto/all-time-high' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto All-Time High Tracker',
    'Distance from all-time high and the gain required to recover it, for every major Binance coin.',
    '/crypto/all-time-high',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'All-Time High Tracker', path: '/crypto/all-time-high' },
  ]),
];

export default function AllTimeHighPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">All-Time High</span>
        </div>
      </header>

      <div className="hero-band max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🏔️" className="h-6 w-6" /></span>
          <h1 className="page-h1">Distance from all-time high</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            And the gain it takes to get back — <b className="text-slate-700 dark:text-slate-200">not the same number</b>
          </p>
        </div>

        <AthBoard />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 시세를 받아 그리므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">Why a drop and its recovery are different numbers</h2>
          <p className="mb-3">
            Losing half your money means the remaining half has to double to break even. Down 50% requires up 100%; down 80% requires up 400%;
            down 95% requires up 1,900%. The two figures are not symmetric because the loss is measured against the old price and the recovery
            against the new, smaller one. This is the single most misread number in a drawdown, so this page never shows one without the other.
          </p>
          <p className="mb-3">
            The practical consequence is that deep drawdowns are much harder to escape than they look. A coin sitting 90% below its high is not
            &quot;90% of the way&quot; to recovery when it doubles — doubling takes it to 80% below, still needing a further 400%. Sorting the table by
            required gain rather than by drawdown makes that ordering visible, and the two orderings are not the same.
          </p>
          <p>
            One caveat about the highs themselves. They are the highest daily close in the Binance history available for each coin, so they exclude
            intraday spikes and any price from before the coin listed on Binance. A token that peaked on another exchange, or earlier in its life,
            will show a high beneath its true record. Using daily closes keeps these numbers on the same basis as every forecast on this site, which
            matters more than matching a headline figure from a different source.
          </p>
        </section>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. A large required gain describes arithmetic, not opportunity — a coin down 95% is not therefore due a 1,900%
            rise, and many never recover at all. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/all-time-high']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
