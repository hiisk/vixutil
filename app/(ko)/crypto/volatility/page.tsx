import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import VolatilityBoard from './VolatilityBoard';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Most Volatile Crypto — right now versus normally',
  description:
    'Realised volatility for the largest crypto assets over 7, 30, 90 and 365 days, with the ratio between the short and long window so you can tell a coin that is always wild from one that is wild this week.',
  alternates: { canonical: '/crypto/volatility' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Volatility Ranking',
    'Annualised realised volatility across four windows for major cryptocurrencies, with the current-to-normal ratio.',
    '/crypto/volatility',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Volatility', path: '/crypto/volatility' },
  ]),
];

export default function VolatilityPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Volatility</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="⚡" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Most Volatile Crypto</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Right now — <b className="text-slate-700 dark:text-slate-200">versus normally</b>
          </p>
        </div>

        <VolatilityBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 보드는 브라우저에서 시세를 받아
          계산하므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">The one thing about price that is genuinely forecastable</h2>
          <p className="mb-3">
            Direction cannot be predicted from past prices to any useful degree — this site measures that repeatedly and reports the coin-flip
            results. Volatility is the exception. It clusters: a week of violent moves is followed by more violent moves more often than not,
            and that relationship is strong enough to be worth acting on when sizing a position or placing a stop.
          </p>
          <p className="mb-3">
            That is why this ranking shows four windows instead of one. A single volatility number conflates &quot;how wild is this coin&quot;
            with &quot;how wild is it being today&quot;. The one-year figure answers the first, the one-week figure the second, and the ratio
            between them separates a permanently turbulent asset from one that is currently in an unusual state.
          </p>
          <p>
            The last column converts the annualised figure back into the size of an ordinary day, because that is the form most people can
            actually use. An annualised 150% sounds abstract; an average move of roughly eight percent per day does not, and it tells you
            immediately whether a three percent stop was ever going to survive.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Volatility describes the size of moves, never their direction — a high reading says nothing about whether
            a coin is about to rise or fall. Figures are annualised standard deviations of daily log returns from Binance closes. All decisions
            and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/volatility']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
