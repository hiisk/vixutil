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
      a: `Up to 1,000 daily closing prices from Binance are converted to log returns and projected forward as a geometric Brownian motion. The trend is split into a market component (${base}'s beta to Bitcoin) and a coin-specific component (alpha), each shrunk toward zero as a Bayesian posterior mean. The market trend is extrapolated assertively so that a coin's long-run direction reaches the forecast; measured against 24 coins this costs about 2.6% in one-year RMSE versus assuming no change, so the forecast is a trend extrapolation rather than a statistically validated prediction. Coins with under two years of history use a conservative prior instead, and the drift is capped. Technical indicators are not used to tilt it: backtested across 46 coins their 5-day directional accuracy was 49.8%.`,
    },
    {
      q: `Will ${base} reach $100,000 (or any round number)?`,
      a: `The page answers that with two numbers: the chance ${base} ever touches the level at any point before a date, and the chance it closes at or beyond it on that date. The first is much larger and is usually what people mean — historically Bitcoin touched a +58% level within 61.4% of one-year windows but closed above it in only 44.0%. Both come from a fat-tailed distribution calibrated so a stated 50% band really contains about 50% of outcomes.`,
    },
    {
      q: `Why not use moving averages, RSI and MACD to predict the price, like other sites do?`,
      a: `Because we implemented exactly that method and measured it. Across 25 coins with non-overlapping forward windows, a composite of moving averages (20/50/100/200), RSI(14) and MACD(12,26,9) predicted the 5-day direction 49.4% of the time — a coin flip. MACD alone was the weakest of the three at 49.5%. The indicators do appear significant until you account for the fact that every coin shares one market: they are really detecting "the market is trending", and once forward returns are made market-neutral the effect collapses (MACD's t-statistic falls from 2.15 to 0.33). Stating that a site uses technical indicators is a description of its method, not evidence that the method works.`,
    },
    {
      q: `Will ${name} go up?`,
      a: `This page does not answer that, and no honest model can from price data alone. For ${name}, as for nearly every cryptocurrency, the historical trend is not statistically distinguishable from random noise, so the long-run median projection sits close to the current price. What the model can tell you is how wide the plausible range of outcomes is at each horizon.`,
    },
    {
      q: `What will ${name} be worth in 1 year?`,
      a: `The 1-year row gives a single forecast price with the range containing half of all outcomes under ${base}'s measured volatility, plus the probability of gaining or losing 10%. The forecast is deliberately modest because ${name}'s historical drift is not statistically distinguishable from zero. Separately, a historical scenario table shows the median outcome across every 1-year window ${base} has actually lived through, along with how many of those windows were independent — a number worth checking before trusting any long-horizon figure.`,
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
    description: `${coin.name} price projection for 3 days, 1 week, 1 month, 3 months, 6 months, 1 year and 3 years, plus a day-by-day 30-day forecast, chart, technical readout and historic OHLC data from Binance.`,
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <Link href="/crypto/signals" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Signal Board
          </Link>
          <span className="text-slate-700 dark:text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-300 dark:text-slate-600">{coin.name}</span>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CoinPrediction coin={coin} />

        {/*
          아래는 서버에서 정적으로 렌더된다. 위 대시보드는 브라우저에서 시세를 받아 그리므로
          자바스크립트를 실행하지 않는 크롤러에겐 빈 껍데기로 보인다. 실제 문장을 여기 둔다.
        */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-400 dark:text-slate-500 leading-relaxed [&>p]:max-w-[95ch]">
          <h2 className="text-base font-black text-white mb-3">About the {coin.name} ({coin.base}) price prediction</h2>
          <p className="mb-3">
            This page projects the {coin.name} price over seven horizons — 3 days, 1 week, 1 month, 3 months, 6 months, 1 year and 3 years — with daily,
            weekly and monthly views. It shows two complementary things: a conservative statistical forecast, and a <b className="text-slate-300 dark:text-slate-600">historical
            scenario</b> table replaying every comparable window {coin.base} has actually lived through, which can fall over six months yet rise over a year.
            Every number is computed in your browser from {coin.base}&apos;s public Binance daily closing prices; nothing is stored and no account is needed.
          </p>
          <p className="mb-3">
            The forecast splits {coin.base}&apos;s trend into two parts: a <b className="text-slate-300 dark:text-slate-600">market component</b> (its beta to Bitcoin) and a
            <b className="text-slate-300 dark:text-slate-600"> coin-specific component</b> (alpha), each shrunk toward zero as a Bayesian posterior mean. The market drift is
            extrapolated assertively, so a coin&apos;s long-run trend does reach the forecast. That is a choice, and it has a measured cost: forecasting one year
            ahead across 24 coins, this setting is about <b className="text-slate-300 dark:text-slate-600">2.6% worse</b> in RMSE than simply assuming the price does not change, and
            on a pure random walk it can manufacture a 3-year move of 34.6% from noise alone. Coins with under two years of history fall back to a conservative
            prior, and the drift is capped, to limit that.
            We do <b className="text-slate-300 dark:text-slate-600">not</b> tilt the forecast with technical indicators. Backtested across 46 coins with non-overlapping forward
            windows and a coin-level t-test, a consensus of trend (SMA 20/50), Bollinger %B, RSI(14) and an ATR trend measure had a 5-day directional accuracy of
            <b className="text-slate-300 dark:text-slate-600">49.8%</b> — a coin flip. Momentum and reversal were no better: their signs flipped between pooled and per-coin fits.
          </p>
          <p>
            Two consequences are worth stating plainly. The forecast <b className="text-slate-300 dark:text-slate-600">extrapolates a trend that is not statistically significant</b>,
            so treat it as one scenario rather than a validated prediction, and read the range and probabilities beside it. And the daily forecast line is
            <b className="text-slate-300 dark:text-slate-600"> smooth and monotone</b>: we tested a day-of-week effect to see whether a zig-zagging daily forecast could be justified, and on the market series no weekday
            reaches statistical significance. Direction is not forecastable, but <b className="text-slate-300 dark:text-slate-600">volatility is</b>, so each horizon uses its own
            measured blend of {coin.base}&apos;s current and long-run volatility. The range and the probability of a given move therefore carry at least as much
            information as the number itself.
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 [&_dd]:max-w-[95ch]">
          <h2 className="text-base font-black text-white mb-3">{coin.name} price prediction FAQ</h2>
          <dl className="space-y-4 text-sm">
            {faqs(coin.name, coin.base).map(qa => (
              <div key={qa.q}>
                <dt className="font-bold text-slate-300 dark:text-slate-600 mb-1">{qa.q}</dt>
                <dd className="text-slate-500 dark:text-slate-400 leading-relaxed">{qa.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-8 text-center">
          <Link href="/crypto/signals" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-amber-400 transition-colors">
            ← Back to the signal board
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
