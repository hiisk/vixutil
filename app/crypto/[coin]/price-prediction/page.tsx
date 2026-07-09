import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';
import SiteFooter from '@/components/SiteFooter';
import { COINS, coinBySlug } from '@/lib/coins';
import CoinPrediction from './CoinPrediction';

export function generateStaticParams() {
  return COINS.map(c => ({ coin: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ coin: string }> }): Promise<Metadata> {
  const { coin: slug } = await params;
  const coin = coinBySlug(slug);
  if (!coin) return {};
  return {
    title: `${coin.name} (${coin.base}) Price Prediction — 1D to 3Y ranges`,
    description: `${coin.name} price projection for 1 day, 1 week, 1 month, 3 months, 6 months, 1 year and 3 years. Median and 80% confidence range from Binance daily closes, plus volatility, SMA and RSI.`,
  };
}

export default async function CoinPredictionPage({ params }: { params: Promise<{ coin: string }> }) {
  const { coin: slug } = await params;
  const coin = coinBySlug(slug);
  if (!coin) notFound();

  const path = `/crypto/${coin.slug}/price-prediction`;
  const structuredData = [
    webAppJsonLd(
      `${coin.name} Price Prediction`,
      `${coin.name} (${coin.base}) price projections across seven horizons with median and 80% confidence ranges, computed from Binance daily closes.`,
      path,
    ),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Crypto Tools', path: '/crypto' },
      { name: 'Signal Board', path: '/crypto/signals' },
      { name: `${coin.name} Price Prediction`, path },
    ]),
    faqJsonLd([
      {
        q: `How is the ${coin.name} price prediction calculated?`,
        a: `Up to a year of ${coin.name} daily closing prices from Binance are converted to log returns, from which a drift and a volatility are estimated. The price is projected forward as a geometric Brownian motion, and each horizon reports the median outcome with an 80% confidence range (10th to 90th percentile).`,
      },
      {
        q: `Will ${coin.name} go up?`,
        a: `This page does not answer that, and no honest model can from price data alone. For ${coin.name}, as for nearly every cryptocurrency, the historical trend is not statistically distinguishable from random noise, so the median projection sits close to the current price. What the model can tell you is how wide the plausible range of outcomes is at each horizon.`,
      },
      {
        q: `Is this ${coin.name} forecast investment advice?`,
        a: 'No. These are statistical projections of a price distribution based only on past prices. They ignore news, regulation, liquidity and market structure, and they are not investment advice.',
      },
    ]),
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="border-b border-slate-800 sticky top-0 z-30 bg-slate-950/90 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto/signals" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Signal Board
          </Link>
          <span className="text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-300">{coin.name}</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <CoinPrediction coin={coin} />

        <div className="mt-8 text-center">
          <Link href="/crypto/signals" className="text-xs font-semibold text-slate-500 hover:text-amber-400 transition-colors">
            ← Back to the signal board
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
