import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import IlCalculator from './IlCalculator';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Impermanent Loss Calculator — with the fees needed to cover it',
  description:
    'Exact impermanent loss for any price move, plus the fee income and daily trading volume a pool needs before providing liquidity beats simply holding.',
  alternates: { canonical: '/crypto/impermanent-loss' },
});

const structuredData = [
  webAppJsonLd(
    'Impermanent Loss Calculator',
    'Exact constant-product impermanent loss with fee break-even and required pool volume.',
    '/crypto/impermanent-loss',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Impermanent Loss', path: '/crypto/impermanent-loss' },
  ]),
];

export default function ImpermanentLossPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="sky" />
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Impermanent Loss</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="💧" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Impermanent Loss Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            And the <b className="text-slate-700 dark:text-slate-200">fees it takes to cover it</b>
          </p>
        </div>

        <IlCalculator />

        <ReferralCards lang="en" placement="result" />

        {/*
          정적 렌더 영역. 위 계산기는 클라이언트 상태에 의존하므로
          자바스크립트 없는 크롤러에겐 아래 본문이 페이지의 실질 내용이다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 note-sm [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">Small, symmetric, and always negative</h2>
          <p className="mb-3">
            Providing liquidity to a constant-product pool means agreeing to sell whichever asset is rising and buy whichever is falling,
            automatically and continuously. The result is that you end up with less of the winner than you would have held. The size of that
            gap has an exact formula rather than an estimate: 2√r ÷ (1 + r), where r is the relative price at withdrawal.
          </p>
          <p className="mb-3">
            Two features of that formula matter more than its magnitude. It is symmetric, so a halving and a doubling cost identically, and
            it is negative for every value of r except exactly one. Being right about which way the pair moves does not help — the pool
            charges you for the move either way, and only fee income can offset it.
          </p>
          <p>
            That is why an advertised yield means little on its own. The fee side of the ledger depends on trading volume that has not
            happened yet, while the loss side depends only on where prices end up. A pool paying well during a quiet period can turn into a
            loss the moment the pair actually moves, which is usually the same moment the volume that justified the yield arrives.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. This models a constant-product pool only, and excludes token rewards, gas, concentrated-liquidity
            behaviour, and the risk that a pooled asset depegs or the contract is exploited. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/impermanent-loss']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
