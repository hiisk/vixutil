import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';

export const metadata: Metadata = {
  title: 'Crypto Trading Tools',
  description: 'Crypto trading tools built on Binance public market data — ATR volatility, TP/SL levels, and a real-time signal board. Everything is computed in your browser.',
  alternates: { canonical: '/crypto' },
};

const structuredData = [
  webAppJsonLd(
    'Crypto Trading Tools',
    'Binance-based crypto trading tools: ATR volatility, TP/SL levels and a multi-strategy real-time signal board, all computed in your browser.',
    '/crypto',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
  ]),
];

const TOOLS = [
  // 이 도구만 한국어다 — 김프는 한국 거래소 고유 현상이라 독자가 한국인이다.
  // 다만 허브는 영어이므로 카드 문구는 영어로 두고, 페이지가 한국어임을 밝힌다.
  { href: '/crypto/kimchi-premium', icon: '🇰🇷', title: 'Kimchi Premium', desc: 'Upbit & Bithumb vs Binance in real time, on both the FX and USDT basis (page in Korean)', badge: 'KR', color: 'from-rose-400 to-amber-500' },
  { href: '/crypto/signals', icon: '📈', title: 'Signal Board', desc: 'Multi-strategy signals + 1D–3Y price prediction ranges for every Binance coin', badge: 'Live', color: 'from-amber-400 to-orange-600' },
  { href: '/crypto/long-short-ratio', icon: '⚔️', title: 'Long/Short Ratio', desc: 'Where the traders are vs where the money is — plus open interest', badge: 'NEW', color: 'from-teal-400 to-cyan-500' },
  { href: '/crypto/fear-greed-index', icon: '😱', title: 'Fear & Greed Index', desc: 'The index — plus a direct test of whether "buy the fear" has actually paid', badge: 'NEW', color: 'from-rose-400 to-pink-500' },
  { href: '/crypto/halving-countdown', icon: '⛏️', title: 'Halving Countdown', desc: 'Counted in blocks from the live chain height — and why countdowns disagree', badge: 'NEW', color: 'from-orange-400 to-red-500' },
  { href: '/crypto/profit-calculator', icon: '🧮', title: 'Profit Calculator', desc: 'P&L with fees on both sides — and the break-even price they create', badge: 'NEW', color: 'from-lime-400 to-emerald-500' },
  { href: '/crypto/all-time-high', icon: '🏔️', title: 'All-Time High Tracker', desc: 'How far below the high — and the gain it takes to get back (not the same number)', badge: 'NEW', color: 'from-cyan-400 to-blue-500' },
  { href: '/crypto/altseason-index', icon: '🌗', title: 'Altcoin Season Index', desc: 'The index — shown with every coin it is built from, not just the number', badge: 'NEW', color: 'from-fuchsia-400 to-violet-500' },
  { href: '/crypto/position-size-calculator', icon: '⚖️', title: 'Position Size Calculator', desc: 'Size from risk, not from leverage — plus the odds your stop gets hit by noise', badge: 'NEW', color: 'from-violet-400 to-purple-500' },
  { href: '/crypto/funding-rates', icon: '💸', title: 'Funding Rates', desc: 'Every USDT perp, annualised with its real settlement interval — not a blanket 8h', badge: 'NEW', color: 'from-sky-400 to-indigo-500' },
  { href: '/crypto/dca-calculator', icon: '📅', title: 'DCA Calculator', desc: 'What a recurring buy would be worth — and whether that start date was lucky', badge: 'NEW', color: 'from-emerald-400 to-teal-500' },
  { href: '/crypto/liquidation-calculator', icon: '⚠️', title: 'Liquidation Calculator', desc: 'Liquidation price for any leverage — plus the odds of actually reaching it', badge: 'NEW', color: 'from-rose-400 to-orange-500' },
  { href: '/crypto/atr-tpsl', icon: '📊', title: 'ATR TP/SL Calculator', desc: 'Pick a coin, set entry and multipliers, get take-profit & stop-loss', badge: 'Calc', color: 'from-yellow-400 to-amber-600' },
];

export default function CryptoPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Home
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Crypto Tools</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🪙</div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Crypto Trading Tools</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Volatility & TP/SL from Binance public market data</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TOOLS.map(t => (
            <Link key={t.href} href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-md hover:border-amber-200 dark:hover:border-amber-500/40 transition-all">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/25">{t.badge}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  Open tool
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10">Prices via Binance public API · all calculations are for reference only, not investment advice</p>

        <ReferralCards lang="en" heading="Exchange sign-up bonuses" />

        <Faq items={SECTION_FAQ.crypto} lang="en" />
      </div>
      <SiteFooter lang="en" />
    </div>
  );
}
