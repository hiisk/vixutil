import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import WeekdayBoard from './WeekdayBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Best Day of the Week to Buy Crypto — tested, not asserted',
  description:
    'Average and median returns by weekday for Bitcoin and any Binance coin, with a t-statistic, the multiple-comparison baseline, and a check on whether outliers are driving the average.',
  alternates: { canonical: '/crypto/day-of-week' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Day-of-Week Returns',
    'Weekday return statistics with significance testing and outlier checks for any Binance coin.',
    '/crypto/day-of-week',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Day of Week', path: '/crypto/day-of-week' },
  ]),
];

export default function DayOfWeekPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Day of Week</span>
        </div>
      </header>

      <div className="hero-band max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="📆" className="h-6 w-6" /></span>
          <h1 className="page-h1">Best Day of the Week</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            With the <b className="text-slate-700 dark:text-slate-200">test that usually gets skipped</b>
          </p>
        </div>

        <WeekdayBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 전체 이력을 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">The sample is large. The signal is not.</h2>
          <p className="mb-3">
            &quot;Buy on Monday, sell on Friday&quot; is repeated often enough to feel established, and it is easy to check. Nine years of
            Bitcoin gives roughly 470 observations of each weekday, which sounds like plenty. The difficulty is scale: an effect of a tenth of
            a percent has to be detected inside daily swings of three to four percent, and no amount of counting separates those.
          </p>
          <p className="mb-3">
            That is why this page reports a t-statistic next to each average rather than a ranking. It also reports the median beside the mean,
            because the two disagreeing is the clearest sign that a handful of violent days are producing the result. A weekday whose mean is
            several times its median has an average, not a tendency — and since crypto returns are fat-tailed, the t-test itself overstates
            significance in exactly those cases.
          </p>
          <p>
            The last caution is arithmetic rather than statistical. Seven weekdays tested at a 5% threshold produce about a third of a false
            positive by chance, so one flagged day is unremarkable and even two deserve scrutiny before belief. Crypto also lacks the
            machinery that creates weekday effects elsewhere — no closes, no settlement cycle, no scheduled reporting — so there is little for
            such an effect to arise from in the first place.
          </p>
        </section>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Weekday averages describe the past and are dwarfed by daily volatility even where they look favourable.
            Days are assigned by UTC close, so a different timezone convention will shift the table. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/day-of-week']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
