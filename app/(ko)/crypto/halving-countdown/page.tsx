import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import HalvingCountdown from './HalvingCountdown';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Bitcoin Halving Countdown — from the live block height',
  description:
    'Live countdown to the next Bitcoin halving, counted in blocks from the current chain height rather than a fixed date — and shown under three different block-time assumptions, because that choice moves the date by weeks.',
  alternates: { canonical: '/crypto/halving-countdown' },
});

const structuredData = [
  webAppJsonLd(
    'Bitcoin Halving Countdown',
    'Blocks remaining until the next Bitcoin halving from the live chain height, with the estimated date under several block-time assumptions.',
    '/crypto/halving-countdown',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Halving Countdown', path: '/crypto/halving-countdown' },
  ]),
];

export default function HalvingCountdownPage() {
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Halving Countdown</span>
        </div>
      </header>

      <div className="hero-band max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="⛏️" className="h-6 w-6" /></span>
          <h1 className="page-h1">Bitcoin Halving Countdown</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Counted in <b className="text-slate-700 dark:text-slate-200">blocks</b>, not guessed from a date
          </p>
        </div>

        <HalvingCountdown />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 카운트다운은 브라우저에서 체인 높이를
          받아 그리므로 자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다.
        */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">A halving is a block height, not a date</h2>
          <p className="mb-3">
            Every 210,000 blocks the reward paid to miners is cut in half. The rule is fixed in the protocol, so the exact block is known
            years ahead — block 1,050,000, then 1,260,000, and so on. What is not known is when those blocks arrive. This page reads the
            current chain height and counts the blocks remaining, so the countdown stays correct as the network speeds up or slows down.
          </p>
          <p className="mb-3">
            Turning blocks into a date needs an assumed block time, and that assumption is where countdowns diverge. Ten minutes is the
            target the difficulty adjustment aims at every 2,016 blocks, not what actually happens: real averages drift either side of it
            for weeks at a time. So rather than picking one number and presenting it as the answer, this page shows the estimate under the
            current epoch&apos;s measured average, the last fifteen blocks, and the theoretical ten minutes — and how far apart they are.
          </p>
          <p>
            There is deliberately no price prediction attached to the event. Bitcoin has had four halvings. Any claim about what happens to
            the price afterwards rests on four observations, each in a completely different market, and four points cannot separate a halving
            effect from everything else going on at the time. The countdown is a fact; the narrative around it is not.
          </p>
        </section>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Block height comes from a public explorer and estimated dates depend on an assumed block time that
            will not hold exactly. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/halving-countdown']} lang="en" />
      </div>
      <Ad lang="en" placement="result" />
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
