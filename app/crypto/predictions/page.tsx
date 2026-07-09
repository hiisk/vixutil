import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';
import SiteFooter from '@/components/SiteFooter';
import PredictionsBoard from './PredictionsBoard';

export const metadata: Metadata = {
  title: 'Crypto Price Predictions — 1D to 3Y projection ranges',
  description: 'Price projections for 86 major cryptocurrencies across 1 day, 1 week, 1 month, 3 months, 6 months, 1 year and 3 years. Each horizon shows a median and an 80% confidence range derived from real Binance daily closes.',
};

const structuredData = [
  webAppJsonLd(
    'Crypto Price Predictions',
    'Median and 80% confidence-range price projections for major cryptocurrencies across seven horizons, computed in your browser from Binance daily closes.',
    '/crypto/predictions',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Price Predictions', path: '/crypto/predictions' },
  ]),
  faqJsonLd([
    {
      q: 'How are these crypto price predictions calculated?',
      a: 'Daily closing prices from Binance are converted to log returns, from which a drift and a volatility are estimated. Prices are then projected forward as a geometric Brownian motion. Each horizon reports the median outcome together with an 80% confidence range (the 10th to 90th percentile).',
    },
    {
      q: 'Why is the long-term median close to the current price?',
      a: 'Because for almost every cryptocurrency the historical trend is not statistically distinguishable from zero. We measure that with a t-statistic and shrink the drift toward zero when it is indistinguishable from noise, so a random price movement is never presented as a confident long-term forecast. The honest information at long horizons is the width of the range, not a single number.',
    },
    {
      q: 'Why does the range get so wide at 1 and 3 years?',
      a: 'Uncertainty in a random walk grows with the square root of time. Over three years the 80% range for a typical major coin spans several multiples of the current price. That width is the real result: it shows how little a price can be pinned down that far ahead.',
    },
    {
      q: 'Can I trade based on these projections?',
      a: 'No. These are statistical projections of a price distribution, not forecasts of what will happen, and they ignore news, regulation, liquidity and market structure. They are reference calculations only and not investment advice.',
    },
  ]),
];

export default function PredictionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="border-b border-slate-800 sticky top-0 z-30 bg-slate-950/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-300">Price Predictions</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔮</div>
          <h1 className="text-2xl font-black text-white mb-1.5">Crypto Price Predictions</h1>
          <p className="text-slate-400 text-sm">Median projection and 80% range for 1D · 1W · 1M · 3M · 6M · 1Y · 3Y, from Binance daily closes</p>
        </div>

        {/* 모델이 무엇을 하고 무엇을 하지 않는지 먼저 밝힌다 */}
        <div className="mb-6 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 text-xs text-slate-400 leading-relaxed">
          <p className="font-bold text-amber-300/90 mb-1">Read the range, not the number.</p>
          <p>
            For nearly every coin, the historical trend is <b className="text-slate-300">not statistically distinguishable from zero</b> — so we shrink it toward zero
            and the median lands near today&apos;s price. That is the honest answer. What actually differs between coins, and between horizons, is the
            <b className="text-slate-300"> width of the 80% range</b>, which is driven by measured volatility and grows with the square root of time.
          </p>
        </div>

        <PredictionsBoard />

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-500 leading-relaxed">
          <p className="mb-1">⚠️ Not investment advice — reference calculations only. All trading decisions and risks are your own.</p>
          <p>
            Method: daily closes → log returns → drift (μ) and volatility (σ). The drift is shrunk by a positive-part James-Stein factor
            max(0, 1 − (3/t)²), so a trend that does not clear |t| ≥ 3 is discarded entirely, and what survives is capped at ±1.0 annual
            log drift. We use 3 rather than the conventional 2 because the drift compounds over up to 1,095 days: in a Monte-Carlo of
            zero-drift random walks, a |t| ≥ 2 bar lets a spurious trend through 4.6% of the time (worst case a fabricated +1,909% 3-year
            move), while |t| ≥ 3 cuts that to 0.3%. Prices are projected as a geometric Brownian motion; the median is spot·exp(μt) and
            the 80% range is spot·exp(μt ± 1.28·σ√t).
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
