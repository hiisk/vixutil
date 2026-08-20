import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import PositionSizer from './PositionSizer';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Position Size Calculator — and the odds your stop gets hit',
  description:
    'Size a crypto trade from your account, risk per trade and stop distance, with the margin needed at any leverage. Also shows how likely that stop is to be hit by ordinary volatility, and the win rate your reward ratio demands.',
  alternates: { canonical: '/crypto/position-size-calculator' },
});

const structuredData = [
  webAppJsonLd(
    'Crypto Position Size Calculator',
    'Risk-based position sizing with margin requirements, the probability of the stop being hit by normal volatility, and the breakeven win rate.',
    '/crypto/position-size-calculator',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Position Size Calculator', path: '/crypto/position-size-calculator' },
  ]),
];

export default function PositionSizeCalculatorPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Position Size Calculator</span>
        </div>
      </header>

      <div className="hero-band max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="⚖️" className="h-6 w-6" /></span>
          <h1 className="page-h1">Position Size Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            How much to buy — and <b className="text-slate-700 dark:text-slate-200">how likely that stop is to be hit anyway</b>
          </p>
        </div>

        <PositionSizer />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 계산기는 브라우저에서 동작하므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">How position sizing works</h2>
          <p className="mb-3">
            Sizing by feel goes wrong in a specific way: with a tight stop the position ends up far too large, and with a wide one far too
            small. Reversing the order fixes it. Decide first what a losing trade may cost — your account multiplied by a risk percentage —
            then divide that by the distance from entry to stop. The result is your quantity, and it automatically shrinks as the stop widens
            so the loss stays the same either way.
          </p>
          <p className="mb-3">
            What that formula does <b className="text-slate-700 dark:text-slate-200">not</b>{' '}answer is how often the stop gets hit, and that is
            half the question. A 3% stop is noise on a volatile altcoin and a real signal on a quiet large cap. So this page also samples the
            coin&apos;s measured volatility to estimate how likely ordinary movement is to touch your stop within 7, 30 and 90 days, with no
            directional view involved. A stop that normal noise reaches most of the time is not protecting anything.
          </p>
          <p>
            The last piece is the reward ratio. If a trade risks one unit to make two, it needs to be right only a third of the time to break
            even — the threshold is exactly 1/(R+1). Seeing that number next to the size makes it obvious that improving the ratio moves the
            bar much further than trying to raise a win rate.
          </p>
        </section>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Fees, slippage and funding are excluded, and a position sized this way can still be liquidated before its
            stop if leverage is high enough. All trading decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/position-size-calculator']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
