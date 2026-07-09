'use client';
import { useState, useEffect, useCallback } from 'react';
import { formatPrice } from '@/lib/atr';
import { fetchTickers, fetchDailyOHLCV, type DailyOHLCV } from '@/lib/binance';
import { computeConsensus, sma, rsi, STRATEGY_META, type ConsensusSignal, type Bias } from '@/lib/strategies';
import { buildForecast, greenDays, volatilityLabel, trendConfidenceLabel, probTpBeforeSl, T_CRIT, MIN_SAMPLES, RELIABLE_SAMPLES, type ForecastModel } from '@/lib/forecast';
import { marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo, Sparkline, Pct, formatVolume } from '@/components/crypto/ui';
import ForecastChart from '@/components/crypto/ForecastChart';

/** drift·sigma 추정과 SMA200을 위해 넉넉히 받는다 */
const HISTORY_DAYS = 365;
/** 차트에 그릴 과거 구간 */
const CHART_HISTORY = 60;
/** Historic data 표에 보여줄 일수 */
const HISTORY_ROWS = 30;

interface Snapshot {
  price: number;
  chg24h: number;
  quoteVolume: number;
  model: ForecastModel;
  consensus: ConsensusSignal | null;
  closes: number[];
  ohlcv: DailyOHLCV[];
  sma50: number | null;
  sma200: number | null;
  rsi14: number | null;
  green: { green: number; total: number };
}

type State = 'loading' | 'ready' | 'nodata' | 'error';

const VOL_CLR: Record<string, string> = {
  Low: 'text-emerald-400', Medium: 'text-amber-400', High: 'text-orange-400', Extreme: 'text-rose-400',
};
const BIAS_STYLE: Record<Bias, { label: string; cls: string; emoji: string }> = {
  bullish: { label: 'Bullish', cls: 'bg-emerald-500/15 text-emerald-400', emoji: '🟢' },
  bearish: { label: 'Bearish', cls: 'bg-rose-500/15 text-rose-400', emoji: '🔴' },
  neutral: { label: 'Neutral', cls: 'bg-slate-500/15 text-slate-400', emoji: '⚪' },
};
const VOTE_CLR: Record<Bias, string> = { bullish: 'text-emerald-400', bearish: 'text-rose-400', neutral: 'text-slate-600' };

function rsiLabel(r: number): { text: string; cls: string } {
  if (r >= 70) return { text: 'Overbought', cls: 'text-rose-400' };
  if (r <= 30) return { text: 'Oversold', cls: 'text-emerald-400' };
  return { text: 'Neutral', cls: 'text-slate-400' };
}

/** UTC 기준 날짜 라벨 (모든 시각은 UTC로 통일) */
const utcDate = (ms: number) =>
  new Date(ms).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });

/** 오늘(UTC 자정) + n일 */
function utcDayOffset(n: number): number {
  const d = new Date();
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) + n * 86_400_000;
}

function Section({ id, title, sub, children }: { id: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 mb-8">
      <h2 className="text-lg font-black text-white mb-1">{title}</h2>
      {sub && <p className="text-xs text-slate-500 mb-3">{sub}</p>}
      {children}
    </section>
  );
}

export default function CoinPrediction({ coin }: { coin: CoinMeta }) {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const market = marketOf(coin);
      const symbol = symbolOf(coin);
      const [tickers, ohlcv] = await Promise.all([
        fetchTickers(market),
        fetchDailyOHLCV(symbol, HISTORY_DAYS, market),
      ]);
      const t = tickers.find(x => x.base === coin.base);
      if (!t || ohlcv.length < 2) { setState('nodata'); return; }

      const closes = ohlcv.map(k => k.close);
      const candles = ohlcv.map(k => ({ high: k.high, low: k.low, close: k.close }));
      const consensus = computeConsensus(candles, market);
      // 방향 틸트 없음 — 백테스트에서 합의 점수의 예측력이 0이었다(lib/forecast.ts 주석)
      const model = buildForecast(closes, t.lastPrice);
      if (!model) { setState('nodata'); return; }

      setSnap({
        price: t.lastPrice,
        chg24h: t.priceChangePercent,
        quoteVolume: t.quoteVolume,
        model,
        consensus,
        closes,
        ohlcv,
        sma50: sma(closes, 50),
        sma200: sma(closes, 200),
        rsi14: rsi(closes, 14),
        green: greenDays(closes, 30),
      });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  useEffect(() => { load(); }, [load]);

  if (state === 'loading') {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-400">Loading {coin.name} market data…</span>
      </div>
    );
  }

  if (state !== 'ready' || !snap) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span className="text-3xl">{state === 'nodata' ? '📉' : '⚠️'}</span>
        <span className="text-sm font-bold text-rose-400">
          {state === 'nodata' ? `Not enough price history for ${coin.name}` : 'Couldn’t load market data'}
        </span>
        <span className="text-xs text-slate-500">
          {state === 'nodata' ? `A projection needs at least ${MIN_SAMPLES + 1} daily closes — ${coin.base} may be a brand-new listing.` : 'Binance may be restricted in your region'}
        </span>
        <button onClick={load} className="mt-2 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl px-4 py-2">Retry</button>
      </div>
    );
  }

  const s = snap;
  const m = s.model;
  const volLabel = volatilityLabel(m.annualVolPct);
  const trendLabel = trendConfidenceLabel(m.shrink);
  const greenPct = s.green.total ? Math.round((s.green.green / s.green.total) * 100) : 0;
  const recent = [...s.ohlcv].slice(-HISTORY_ROWS).reverse();
  const driftDiscarded = m.shrink === 0;
  const p1m = m.projections.find(p => p.key === '1m')!;
  const p1y = m.projections.find(p => p.key === '1y')!;
  // TP를 SL보다 먼저 칠 확률과 그때의 기대값 (R 배수). 승률만으론 전략의 좋고 나쁨을 못 본다.
  const pTp = s.consensus ? probTpBeforeSl(s.price, s.consensus.tp, s.consensus.sl) : NaN;
  const rr = s.consensus ? Math.abs(s.consensus.tp - s.consensus.entry) / Math.abs(s.consensus.entry - s.consensus.sl) : NaN;
  const evR = isFinite(pTp) && isFinite(rr) ? (pTp / 100) * rr - (1 - pTp / 100) : NaN;

  return (
    <>
      {/* Hero */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CoinLogo base={coin.base} size={40} />
            <div>
              <h1 className="text-xl font-black text-white leading-tight">{coin.name} Price Prediction</h1>
              <p className="text-xs text-slate-500 font-semibold">
                {coin.base} · Binance {marketOf(coin) === 'spot' ? 'spot' : 'futures'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-black text-white tabular-nums">${formatPrice(s.price)}</p>
              <p className="text-xs"><Pct value={s.chg24h} /> <span className="text-slate-600">24h</span></p>
            </div>
            <Sparkline points={s.closes.slice(-30).concat(s.price)} w={110} h={36} />
          </div>
        </div>
      </div>

      {m.limitedHistory && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.08] p-4 mb-5 text-xs text-amber-200/80">
          <b>Limited history.</b> {coin.base} has only {m.samples + 1} daily closes, below the {RELIABLE_SAMPLES} we consider reliable.
          Volatility — and therefore every range and probability on this page — is estimated from a short sample and will move a lot as more data arrives.
        </div>
      )}

      {/* Section nav */}
      <nav className="sticky top-14 z-20 -mx-4 px-4 py-2 bg-slate-950/90 backdrop-blur border-b border-slate-800 mb-6">
        <div className="flex gap-2 text-xs font-bold">
          {[['overview', 'Overview'], ['prediction', 'Prediction'], ['historic', 'Historic data']].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-amber-400 hover:border-slate-600 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Overview ─────────────────────────────── */}
      <Section id="overview" title="Overview" sub={`Live market state and technical readout for ${coin.name}`}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Price</p>
            <p className="text-lg font-black text-white tabular-nums">${formatPrice(s.price)}</p>
            <p className="text-xs mt-0.5"><Pct value={s.chg24h} /></p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">24h volume</p>
            <p className="text-lg font-black text-white tabular-nums">{formatVolume(s.quoteVolume)}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Annual volatility</p>
            <p className="text-lg font-black tabular-nums text-white">
              {m.annualVolPct.toFixed(1)}% <span className={`text-xs font-bold ${VOL_CLR[volLabel]}`}>{volLabel}</span>
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Green days (30d)</p>
            <p className="text-lg font-black tabular-nums text-white">{s.green.green}/{s.green.total} <span className="text-xs text-slate-500">{greenPct}%</span></p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">14-day RSI</p>
            <p className="text-lg font-black tabular-nums text-white">
              {s.rsi14 != null ? <>{s.rsi14.toFixed(1)} <span className={`text-xs font-bold ${rsiLabel(s.rsi14).cls}`}>{rsiLabel(s.rsi14).text}</span></> : '-'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Trend significance</p>
            <p className="text-lg font-black text-white">{trendLabel} <span className="text-xs text-slate-500 tabular-nums">t={m.tStat.toFixed(2)}</span></p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">50-day SMA</p>
            <p className="text-lg font-black tabular-nums text-white">{s.sma50 != null ? `$${formatPrice(s.sma50)}` : '-'}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">200-day SMA</p>
            <p className="text-lg font-black tabular-nums text-white">{s.sma200 != null ? `$${formatPrice(s.sma200)}` : '-'}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">History used</p>
            <p className="text-lg font-black tabular-nums text-white">{m.samples + 1} <span className="text-xs text-slate-500">daily closes</span></p>
          </div>
        </div>

        {s.consensus && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-2">Technical consensus</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded ${BIAS_STYLE[s.consensus.bias].cls}`}>
                {BIAS_STYLE[s.consensus.bias].emoji} {BIAS_STYLE[s.consensus.bias].label}
                {s.consensus.bias !== 'neutral' && <span className="opacity-80">{s.consensus.confidence}%</span>}
              </span>
              <span className="flex gap-3">
                {s.consensus.votes.map(v => (
                  <span key={v.key} className={`text-[11px] font-bold ${VOTE_CLR[v.bias]}`} title={v.note}>
                    {STRATEGY_META[v.key].label} {v.bias === 'bullish' ? '↑' : v.bias === 'bearish' ? '↓' : '·'}
                  </span>
                ))}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              This drives the entry / TP / SL levels on the signal board. It deliberately does <b className="text-slate-400">not</b> feed the projections below —
              backtested, its directional accuracy over 5 days was 49.8%.
            </p>
          </div>
        )}
      </Section>

      {/* ── Prediction ───────────────────────────── */}
      <Section id="prediction" title="Prediction" sub={`${coin.name} projection with a 50% confidence range — half of outcomes land inside the band`}>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 mb-4">
          <ForecastChart history={s.closes.slice(-CHART_HISTORY)} daily={m.daily} spot={s.price} />
        </div>

        {/* 왜 장기 중앙값이 평평한지 먼저 밝힌다 */}
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 mb-4 text-xs text-slate-400 leading-relaxed">
          {driftDiscarded ? (
            <p>
              {coin.base}&apos;s historical drift has a t-statistic of <b className="text-slate-300">{m.tStat.toFixed(2)}</b>, which does not clear the
              |t| ≥ {T_CRIT} bar. It is indistinguishable from random noise, so we <b className="text-slate-300">discard it entirely</b> and anchor the long-run
              median at today&apos;s price. Read the range and the probabilities, not the median.
            </p>
          ) : (
            <p>
              {coin.base}&apos;s historical drift clears the |t| ≥ {T_CRIT} bar (t = <b className="text-slate-300">{m.tStat.toFixed(2)}</b>), so we keep{' '}
              <b className="text-slate-300">{(m.shrink * 100).toFixed(0)}%</b> of it after shrinkage and cap it at ±1.0 annual log drift. The range still
              carries most of the information at long horizons.
            </p>
          )}
        </div>

        {/* 확률 — 중앙값과 달리 코인·지평마다 실제로 달라지는 값 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Gain ≥10% in 30d</p>
            <p className="text-xl font-black text-emerald-400 tabular-nums">{p1m.pUp10.toFixed(1)}%</p>
            <p className="text-[10px] text-slate-600 mt-0.5">probability</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Drop ≥10% in 30d</p>
            <p className="text-xl font-black text-rose-400 tabular-nums">{p1m.pDown10.toFixed(1)}%</p>
            <p className="text-[10px] text-slate-600 mt-0.5">probability</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Gain ≥10% in 1y</p>
            <p className="text-xl font-black text-emerald-400 tabular-nums">{p1y.pUp10.toFixed(1)}%</p>
            <p className="text-[10px] text-slate-600 mt-0.5">probability</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Hit TP before SL</p>
            {isFinite(pTp) ? (
              <>
                <p className="text-xl font-black text-white tabular-nums">{pTp.toFixed(1)}%</p>
                <p className={`text-[10px] mt-0.5 tabular-nums ${evR >= 0 ? 'text-emerald-500/70' : 'text-rose-500/70'}`}>
                  {evR >= 0 ? '+' : ''}{evR.toFixed(2)}R expected · {rr.toFixed(2)}:1 reward
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-600">price already outside the levels</p>
            )}
          </div>
        </div>

        <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
          Probabilities come from the same fitted distribution. The TP/SL figure is the exact barrier-crossing probability for a driftless log-price random
          walk (verified against a 200,000-path Monte-Carlo), so an expected value near <b className="text-slate-500">0R</b> is what a fair coin with those
          levels should give — it is the model telling you the levels carry no edge by themselves.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-slate-800"><h3 className="text-sm font-black text-white">By horizon</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                  <th className="text-left font-semibold px-4 py-3">Period</th>
                  <th className="text-right font-semibold px-3 py-3">Low (P25)</th>
                  <th className="text-right font-semibold px-3 py-3">Median</th>
                  <th className="text-right font-semibold px-3 py-3">High (P75)</th>
                  <th className="text-right font-semibold px-3 py-3">Typical swing</th>
                  <th className="text-right font-semibold px-3 py-3 border-l border-slate-800/70">P(+10%)</th>
                  <th className="text-right font-semibold px-3 py-3">P(−10%)</th>
                  <th className="text-right font-semibold px-4 py-3 border-l border-slate-800/70">80% range</th>
                </tr>
              </thead>
              <tbody>
                {m.projections.map(p => (
                  <tr key={p.key} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-300">{p.label}</td>
                    <td className="px-3 py-3 text-right text-rose-400/80 tabular-nums">${formatPrice(p.low)}</td>
                    <td className="px-3 py-3 text-right text-white font-bold tabular-nums">${formatPrice(p.median)}</td>
                    <td className="px-3 py-3 text-right text-emerald-400/80 tabular-nums">${formatPrice(p.high)}</td>
                    <td className="px-3 py-3 text-right text-slate-300 tabular-nums">±{p.swingPct.toFixed(1)}%</td>
                    <td className="px-3 py-3 text-right text-emerald-400/80 tabular-nums border-l border-slate-800/40">{p.pUp10.toFixed(1)}%</td>
                    <td className="px-3 py-3 text-right text-rose-400/80 tabular-nums">{p.pDown10.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right text-[11px] text-slate-500 tabular-nums border-l border-slate-800/40">
                      ${formatPrice(p.low80)} – ${formatPrice(p.high80)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800">
            <h3 className="text-sm font-black text-white">Daily forecast — next {m.daily.length} days</h3>
          </div>
          <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="sticky top-0 bg-slate-900 z-10">
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                  <th className="text-left font-semibold px-4 py-3">Date (UTC)</th>
                  <th className="text-right font-semibold px-3 py-3">Low (P25)</th>
                  <th className="text-right font-semibold px-3 py-3">Median</th>
                  <th className="text-right font-semibold px-3 py-3">High (P75)</th>
                  <th className="text-right font-semibold px-4 py-3">Typical swing</th>
                </tr>
              </thead>
              <tbody>
                {m.daily.map(d => (
                  <tr key={d.day} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5 text-slate-300">{utcDate(utcDayOffset(d.day))}</td>
                    <td className="px-3 py-2.5 text-right text-rose-400/80 tabular-nums">${formatPrice(d.low)}</td>
                    <td className="px-3 py-2.5 text-right text-white font-bold tabular-nums">${formatPrice(d.median)}</td>
                    <td className="px-3 py-2.5 text-right text-emerald-400/80 tabular-nums">${formatPrice(d.high)}</td>
                    <td className="px-4 py-2.5 text-right text-slate-300 tabular-nums">±{(((d.high / d.median) - 1) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── Historic data ────────────────────────── */}
      <Section id="historic" title="Historic data" sub={`${coin.base} daily open / high / low / close and volume, last ${HISTORY_ROWS} closed candles (UTC)`}>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="sticky top-0 bg-slate-900 z-10">
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                  <th className="text-left font-semibold px-4 py-3">Date (UTC)</th>
                  <th className="text-right font-semibold px-3 py-3">Open</th>
                  <th className="text-right font-semibold px-3 py-3">High</th>
                  <th className="text-right font-semibold px-3 py-3">Low</th>
                  <th className="text-right font-semibold px-3 py-3">Close</th>
                  <th className="text-right font-semibold px-3 py-3">Change</th>
                  <th className="text-right font-semibold px-4 py-3">Volume</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(k => {
                  const chg = k.open > 0 ? ((k.close - k.open) / k.open) * 100 : 0;
                  return (
                    <tr key={k.openTime} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-2.5 text-slate-300">{utcDate(k.openTime)}</td>
                      <td className="px-3 py-2.5 text-right text-slate-400 tabular-nums">${formatPrice(k.open)}</td>
                      <td className="px-3 py-2.5 text-right text-emerald-400/70 tabular-nums">${formatPrice(k.high)}</td>
                      <td className="px-3 py-2.5 text-right text-rose-400/70 tabular-nums">${formatPrice(k.low)}</td>
                      <td className="px-3 py-2.5 text-right text-white font-bold tabular-nums">${formatPrice(k.close)}</td>
                      <td className="px-3 py-2.5 text-right"><Pct value={chg} /></td>
                      <td className="px-4 py-2.5 text-right text-slate-400 tabular-nums">{formatVolume(k.quoteVolume)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* 방법론 */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 mb-5 text-xs text-slate-500 leading-relaxed">
        <h2 className="text-sm font-black text-slate-300 mb-2">How this {coin.name} prediction is made</h2>
        <p className="mb-2">
          We take {m.samples + 1} daily closes from Binance and convert them to log returns, giving a drift (μ) and a volatility (σ).
          {' '}{coin.base}&apos;s measured annual volatility is <b className="text-slate-400">{m.annualVolPct.toFixed(1)}%</b>.
        </p>
        <p className="mb-2">
          We do <b className="text-slate-400">not</b> tilt the median in any direction, because we measured whether we could. Backtesting the technical
          consensus across 46 coins with non-overlapping forward windows and a coin-level t-test, its 5-day directional accuracy was 49.8% (IC −0.0005,
          t = −0.35) and its 30-day correlation was slightly negative (t = −2.39). Momentum flipped sign between pooled and per-coin fits. None of it
          supports a directional forecast, so the model does not pretend otherwise.
        </p>
        <p className="mb-2">
          The long-run drift is likewise discarded unless its t-statistic clears |t| ≥ {T_CRIT} — a stricter bar than the conventional 2, because
          compounding a drift over 1,095 days turns statistical noise into a confident-looking forecast. With the drift gone, the median equals today&apos;s
          price. That is the honest output, and it is why this page leads with ranges and probabilities instead.
        </p>
        <p>
          Ranges come from σ√t. We display the <b className="text-slate-400">50% interval (P25–P75)</b> by default and the 80% interval alongside it. We tested
          whether mean reversion would justify narrower long-horizon bands by measuring the Hurst exponent, but it came out at ≈0.5 for every major coin
          (a random walk), so there is no empirical basis for shrinking them further.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-500 leading-relaxed">
        <p>
          ⚠️ Not investment advice. This page contains statistical projections of a price distribution, not a forecast of what {coin.name} will do.
          The model knows nothing about news, regulation, liquidity or market structure. All trading decisions and risks are your own.
        </p>
      </div>
    </>
  );
}
