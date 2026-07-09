import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';
import SiteFooter from '@/components/SiteFooter';
import { COINS, coinBySlug } from '@/lib/coins';
import CoinPrediction from './CoinPrediction';

/** JSON-LD와 화면에 같은 문장을 쓰기 위한 단일 출처 */
function faqs(name: string, base: string) {
  return [
    {
      q: `How is the ${name} price prediction calculated?`,
      a: `Up to a year of ${name} daily closing prices from Binance are converted to log returns, giving a drift and a volatility, and the price is projected forward as a geometric Brownian motion. The forecast's direction comes from the Bayesian posterior mean of that drift, shrunk toward zero in proportion to how noisy the estimate is, because no coin's drift is statistically significant. We do not tilt it with technical indicators: backtested across 46 coins, their 5-day directional accuracy was 49.8%. Alongside the forecast price each horizon reports a 50% range and the probability of a 10% move.`,
    },
    {
      q: `Will ${name} go up?`,
      a: `This page does not answer that, and no honest model can from price data alone. For ${name}, as for nearly every cryptocurrency, the historical trend is not statistically distinguishable from random noise, so the long-run median projection sits close to the current price. What the model can tell you is how wide the plausible range of outcomes is at each horizon.`,
    },
    {
      q: `What will ${name} be worth in 1 year?`,
      a: `The 1-year row gives a single forecast price, together with the range containing half of all outcomes under ${base}'s measured volatility and the probability of gaining or losing 10%. The forecast is deliberately modest: ${name}'s historical drift is not statistically distinguishable from zero, so it is shrunk toward zero rather than extrapolated. Treat the range as seriously as the number.`,
    },
    {
      q: `Is this ${name} forecast investment advice?`,
      a: 'No. These are statistical projections of a price distribution based only on past prices. They ignore news, regulation, liquidity and market structure, and they are not investment advice.',
    },
  ];
}

export function generateStaticParams() {
  return COINS.map(c => ({ coin: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ coin: string }> }): Promise<Metadata> {
  const { coin: slug } = await params;
  const coin = coinBySlug(slug);
  if (!coin) return {};
  return {
    title: `${coin.name} (${coin.base}) Price Prediction — 5D to 3Y ranges`,
    description: `${coin.name} price projection for 5 days, 1 week, 1 month, 3 months, 6 months, 1 year and 3 years, plus a day-by-day 30-day forecast, chart, technical readout and historic OHLC data from Binance.`,
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
      `${coin.name} (${coin.base}) price projections across seven horizons plus a 30-day daily forecast, with median and confidence ranges computed from Binance daily closes.`,
      path,
    ),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Crypto Tools', path: '/crypto' },
      { name: 'Signal Board', path: '/crypto/signals' },
      { name: `${coin.name} Price Prediction`, path },
    ]),
    faqJsonLd(faqs(coin.name, coin.base)),
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

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 대시보드는 브라우저에서 시세를 받아 그리므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다. 실제 문장을 여기 둔다.
        */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-400 leading-relaxed">
          <h2 className="text-base font-black text-white mb-3">About the {coin.name} ({coin.base}) price prediction</h2>
          <p className="mb-3">
            This page projects the {coin.name} price over seven horizons — 5 days, 1 week, 1 month, 3 months, 6 months, 1 year and 3 years — plus a
            day-by-day forecast for the next 30 days. For each it reports the range containing half of all outcomes and the probability of a 10% move.
            Every number is computed in your browser from {coin.base}&apos;s public Binance daily closing prices; nothing is stored and no account is needed.
          </p>
          <p className="mb-3">
            The forecast price comes from {coin.base}&apos;s own historical drift — but not naively. No cryptocurrency has a statistically significant drift;
            even Bitcoin&apos;s full 8.9-year Binance history yields a t-statistic of just 1.32. So we take the <b className="text-slate-300">Bayesian posterior
            mean</b>, pulling the measured drift toward zero in proportion to how noisy it is. The prior was calibrated by Monte-Carlo so that a pure random
            walk with zero true drift produces a spurious 3-year move of only 6.4% at the median.
            We also do <b className="text-slate-300">not</b> tilt the forecast with technical indicators. We backtested a consensus of trend (SMA 20/50),
            Bollinger %B, RSI(14) and an ATR trend measure across 46 coins with non-overlapping forward windows and a coin-level t-test: its 5-day directional
            accuracy was <b className="text-slate-300">49.8%</b>, a coin flip, and its 30-day correlation was slightly negative.
          </p>
          <p>
            Two consequences are worth stating plainly. The forecast is <b className="text-slate-300">modest</b> — single-digit annual percentages, not the
            confident multiples you will see elsewhere — because that is all the data supports. And the daily forecast line is <b className="text-slate-300">smooth
            and monotone</b>: a forecast that zig-zagged day to day would be inventing information nobody has. The range and the probability of a given move,
            both driven by {coin.base}&apos;s measured volatility, carry at least as much information as the number itself.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <h2 className="text-base font-black text-white mb-3">{coin.name} price prediction FAQ</h2>
          <dl className="space-y-4 text-sm">
            {faqs(coin.name, coin.base).map(qa => (
              <div key={qa.q}>
                <dt className="font-bold text-slate-300 mb-1">{qa.q}</dt>
                <dd className="text-slate-500 leading-relaxed">{qa.a}</dd>
              </div>
            ))}
          </dl>
        </section>

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
