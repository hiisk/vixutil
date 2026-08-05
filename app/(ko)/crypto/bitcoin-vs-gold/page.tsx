import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import GoldBoard from './GoldBoard';

export const metadata: Metadata = {
  title: 'Bitcoin vs Gold — is it really digital gold?',
  description:
    'Volatility, drawdown and correlation for Bitcoin against gold on matched daily data, plus what Bitcoin actually did on gold’s worst days.',
  alternates: { canonical: '/crypto/bitcoin-vs-gold' },
};

const structuredData = [
  webAppJsonLd(
    'Bitcoin vs Gold Comparison',
    'Matched daily comparison of Bitcoin and gold on volatility, drawdown, correlation and stress-day behaviour.',
    '/crypto/bitcoin-vs-gold',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Bitcoin vs Gold', path: '/crypto/bitcoin-vs-gold' },
  ]),
];

export default function BitcoinVsGoldPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Bitcoin vs Gold</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <ToolIcon emoji="🥇" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">Bitcoin vs Gold</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &quot;Digital gold&quot; is <b className="text-slate-700 dark:text-slate-200">two claims</b> — tested separately
          </p>
        </div>

        <GoldBoard />

        <ReferralCards lang="en" placement="result" />

        {/*
          정적 렌더 영역. 위 보드는 브라우저에서 두 이력을 받아 맞춰 계산하므로
          자바스크립트를 실행하지 않는 크롤러에겐 아래 본문이 페이지의 내용이다.
        */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-5 mb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-3">One phrase, two different promises</h2>
          <p className="mb-3">
            &quot;Digital gold&quot; is used to mean two things that are rarely separated. The first is that Bitcoin stores value the way gold
            does — that it holds its purchasing power without much drama. The second is that it protects a portfolio when other things go
            wrong. These are independent claims, they are tested differently, and an asset can fail one while passing the other.
          </p>
          <p className="mb-3">
            The first is the easier of the two, and it is not close. Volatility and drawdown are direct measurements requiring no
            assumptions, and Bitcoin comes out several times more volatile than gold with a far deeper worst loss. That does not make it a
            bad asset — it has also returned dramatically more over the same period, which is the actual reason most people own it. It just
            means the stability half of the phrase is describing something Bitcoin has never done.
          </p>
          <p>
            The second claim needs more care, because a low correlation is often quoted as if it settled the matter. It does not. What
            matters is the behaviour during stress, not the average across all conditions, and a full-sample correlation blends the two
            together. The rolling window on this page exists for the same reason: a relationship that swings between clearly negative and
            clearly positive is not something an allocation can lean on, no matter what its long-run average happens to be.
          </p>
        </section>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 mb-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            ⚠️ Not investment advice. Gold is represented by a tokenised claim traded on the same exchange, which is not identical to holding
            bullion. All figures are historical and measured over whatever window the two series share. All decisions and risks are your own.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/bitcoin-vs-gold']} lang="en" />
      </div>
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
