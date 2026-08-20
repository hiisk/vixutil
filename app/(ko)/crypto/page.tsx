import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: 'Crypto Trading Tools',
  description: 'Crypto trading tools built on Binance public market data — ATR volatility, TP/SL levels, and a real-time signal board. Everything is computed in your browser.',
  alternates: { canonical: '/crypto' },
});

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
  { href: '/crypto/slippage', icon: '📶', title: 'Slippage & Depth', desc: 'Walk the live order book \u2014 on thin pairs this dwarfs the fee', badge: 'NEW', color: 'from-indigo-400 to-blue-600' },
  { href: '/crypto/impermanent-loss', icon: '💧', title: 'Impermanent Loss', desc: 'Exact for any price move \u2014 plus the trading volume needed to cover it', badge: 'NEW', color: 'from-cyan-400 to-sky-600' },
  { href: '/crypto/bitcoin-vs-gold', icon: '🥇', title: 'Bitcoin vs Gold', desc: '"Digital gold" is two claims \u2014 one fails outright, the other fails when it matters', color: 'from-yellow-400 to-amber-600' },
  { href: '/crypto/sold-at-top', icon: '😤', title: 'Sold at the Top?', desc: 'The best day came right after the worst \u2014 that is why you cannot have one without the other', color: 'from-rose-400 to-red-600' },
  { href: '/crypto/kelly-criterion', icon: '🎯', title: 'Kelly Criterion', desc: 'The optimal bet size — and what half of it buys you', color: 'from-violet-400 to-fuchsia-600' },
  { href: '/crypto/day-of-week', icon: '📆', title: 'Best Day of the Week', desc: '"Buy Monday, sell Friday" — with the test that usually gets skipped', color: 'from-violet-400 to-indigo-500' },
  { href: '/crypto/rebalancing', icon: '⚗️', title: 'Rebalancing Simulator', desc: 'The advice is everywhere — this measures whether it worked', color: 'from-emerald-400 to-green-600' },
  { href: '/crypto/volatility', icon: '⚡', title: 'Volatility Ranking', desc: 'Wild right now, or always wild? Four windows tell them apart', color: 'from-yellow-400 to-orange-500' },
  { href: '/crypto/drawdown', icon: '🌊', title: 'Drawdown & Time Underwater', desc: 'Depth is quoted everywhere — duration is what you live through', color: 'from-sky-400 to-blue-600' },
  { href: '/crypto/stablecoin-depeg', icon: '⚓', title: 'Stablecoin Depeg', desc: 'In basis points — and measured against the right yardstick', color: 'from-blue-400 to-sky-500' },
  { href: '/crypto/risk-of-ruin', icon: '💀', title: 'Risk of Ruin', desc: 'Same edge, wildly different odds — bet size decides it', color: 'from-red-400 to-rose-600' },
  { href: '/crypto/risk-adjusted', icon: '📐', title: 'Risk-Adjusted Returns', desc: 'Sharpe, Sortino and Calmar — and how much the three disagree', color: 'from-slate-400 to-slate-600' },
  { href: '/crypto/compound-calculator', icon: '🌱', title: 'Compound & Staking', desc: 'APR vs APY — and the price fall that erases the whole yield', color: 'from-green-400 to-lime-500' },
  { href: '/crypto/compare', icon: '⚖️', title: 'Compare Two Coins', desc: 'Returns, risk — and whether the two are really different bets at all', color: 'from-amber-400 to-yellow-500' },
  { href: '/crypto/correlation', icon: '🕸️', title: 'Correlation Matrix', desc: 'Not just the number — how far it drifts, and what happens when BTC drops', color: 'from-purple-400 to-fuchsia-500' },
  { href: '/crypto/seasonality', icon: '🗓️', title: 'Monthly Seasonality', desc: '"Uptober" and the rest — with the sample size that usually gets left out', color: 'from-indigo-400 to-blue-500' },
  { href: '/crypto/long-short-ratio', icon: '⚔️', title: 'Long/Short Ratio', desc: 'Where the traders are vs where the money is — plus open interest', color: 'from-teal-400 to-cyan-500' },
  { href: '/crypto/fear-greed-index', icon: '😱', title: 'Fear & Greed Index', desc: 'The index — plus a direct test of whether "buy the fear" has actually paid', color: 'from-rose-400 to-pink-500' },
  { href: '/crypto/halving-countdown', icon: '⛏️', title: 'Halving Countdown', desc: 'Counted in blocks from the live chain height — and why countdowns disagree', color: 'from-orange-400 to-red-500' },
  { href: '/crypto/profit-calculator', icon: '🧮', title: 'Profit Calculator', desc: 'P&L with fees on both sides — and the break-even price they create', color: 'from-lime-400 to-emerald-500' },
  { href: '/crypto/all-time-high', icon: '🏔️', title: 'All-Time High Tracker', desc: 'How far below the high — and the gain it takes to get back (not the same number)', color: 'from-cyan-400 to-blue-500' },
  { href: '/crypto/altseason-index', icon: '🌗', title: 'Altcoin Season Index', desc: 'The index — shown with every coin it is built from, not just the number', color: 'from-fuchsia-400 to-violet-500' },
  { href: '/crypto/position-size-calculator', icon: '⚖️', title: 'Position Size Calculator', desc: 'Size from risk, not from leverage — plus the odds your stop gets hit by noise', color: 'from-violet-400 to-purple-500' },
  { href: '/crypto/funding-rates', icon: '💸', title: 'Funding Rates', desc: 'Every USDT perp, annualised with its real settlement interval — not a blanket 8h', color: 'from-sky-400 to-indigo-500' },
  { href: '/crypto/dca-calculator', icon: '📅', title: 'DCA Calculator', desc: 'What a recurring buy would be worth — and whether that start date was lucky', color: 'from-emerald-400 to-teal-500' },
  { href: '/crypto/liquidation-calculator', icon: '⚠️', title: 'Liquidation Calculator', desc: 'Liquidation price for any leverage — plus the odds of actually reaching it', color: 'from-rose-400 to-orange-500' },
  { href: '/crypto/atr-tpsl', icon: '📊', title: 'ATR TP/SL Calculator', desc: 'Pick a coin, set entry and multipliers, get take-profit & stop-loss', badge: 'Calc', color: 'from-yellow-400 to-amber-600' },
];

export default function CryptoPage() {
  return (
    <div className="page-wrap">
      <PageGlow accent="amber" />
      <JsonLd data={structuredData} />
      <div className="h-1 topbar" />

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

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* 머리 — 운세·색·시간과 같은 규격(왼쪽 정렬 + 갈래색 칩) */}
        <div className="hero-band">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg">
            <ToolIcon emoji="🪙" className="h-6 w-6" />
          </span>
          <h1 className="page-h1">Crypto Trading Tools</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Volatility &amp; TP/SL from Binance public market data</p>
        </div>

        {/* 「Open tool →」 줄을 뺐다 — 카드 전체가 이미 링크다(운세 허브와 같은 이유) */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(t => (
            <Link key={t.href} href={t.href}
              className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700">
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="bg-sec-soft inline-flex h-9 w-9 items-center justify-center rounded-lg">
                  <ToolIcon emoji={t.icon} className="h-5 w-5" />
                </span>
                {t.badge && <span className="rounded-full border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">{t.badge}</span>}
              </div>
              <h2 className="mb-1 font-bold text-slate-900 dark:text-slate-100">{t.title}</h2>
              <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{t.desc}</p>
            </Link>
          ))}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-10">Prices via Binance public API · all calculations are for reference only, not investment advice</p>

        <Faq items={SECTION_FAQ.crypto} lang="en" />
      </div>
      <Ad lang="en" placement="result" />
      <SiteFooter lang="en" referral={false} />
    </div>
  );
}
