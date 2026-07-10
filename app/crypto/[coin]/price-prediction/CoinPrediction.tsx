'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { formatPrice } from '@/lib/atr';
import { fetchTickers, fetchDailyOHLCV, fetchDailyCandles, fetchFullDailyCloses, type DailyOHLCV } from '@/lib/binance';
import { computeConsensus, sma, rsi, STRATEGY_META, type ConsensusSignal, type Bias } from '@/lib/strategies';
import { buildForecast, simulatePaths, forecastSeries, probReach, HORIZONS, TIMEFRAMES, greenDays, volatilityLabel, trendConfidenceLabel, probTpBeforeSl, PRIOR_MARKET_DRIFT_SD, PRIOR_ALPHA_DRIFT_SD, MIN_DRIFT_HISTORY, MIN_SAMPLES, RELIABLE_SAMPLES, DAILY_PATH_DAYS, type ForecastModel, type Timeframe } from '@/lib/forecast';
import { historicalScenarios, hasSignFlip, MIN_INDEPENDENT_WINDOWS, type ScenarioHorizon } from '@/lib/scenarios';
import { simulateBarriers, probEverReach } from '@/lib/barriers';
import { marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo, Sparkline, Pct, formatVolume } from '@/components/crypto/ui';
import ForecastChart from '@/components/crypto/ForecastChart';

/** drift는 관측 기간이 길수록 안정적이다. 바이낸스 요청 1회 상한(1000)에 맞춘다. */
const HISTORY_DAYS = 998;
/** 차트에 그릴 과거 구간 */
const CHART_HISTORY = 60;
/** Historic data 표에 보여줄 일수 */
const HISTORY_ROWS = 30;
/** 목표가 도달 확률을 재는 시점 (일) */
const BARRIER_CHECKPOINTS = [365, 730, 1095];

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
  /** 상장 이후 전체 종가로 만든 과거 구간 시나리오 */
  scenarios: ScenarioHorizon[];
  fullCloses: number;
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

/** 1 / 1.5 / 2 / 2.5 / 3 / 4 / 5 / 7.5 × 10^k 중 가까운 "보기 좋은" 숫자로 반올림 */
function niceRound(v: number): number {
  if (!(v > 0)) return 0;
  const e = Math.floor(Math.log10(v));
  const base = Math.pow(10, e);
  const m = v / base;
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10];
  let best = steps[0];
  for (const st of steps) if (Math.abs(st - m) < Math.abs(best - m)) best = st;
  return best * base;
}

/** 현재가 주변의 의미 있는 목표가들 (중복 제거) */
function targetPrices(spot: number): number[] {
  const mults = [0.5, 0.75, 1.25, 1.5, 2, 3];
  const out = mults.map(x => niceRound(spot * x));
  return [...new Set(out)].filter(v => v > 0).sort((a, b) => a - b);
}

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
  const [tf, setTf] = useState<Timeframe>('daily');
  const [target, setTarget] = useState('');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const market = marketOf(coin);
      const symbol = symbolOf(coin);
      // 시장 기준계열(BTC)도 같이 받는다 — 예측을 시장/alpha 성분으로 분해하기 위해
      const [tickers, ohlcv, marketCandles, fullCloses] = await Promise.all([
        fetchTickers(market),
        fetchDailyOHLCV(symbol, HISTORY_DAYS, market),
        fetchDailyCandles('BTCUSDT', HISTORY_DAYS, market).catch(() => []),
        // 과거 구간 시나리오는 상장 이후 전체 이력을 쓴다(1000개 상한이라 페이징)
        fetchFullDailyCloses(symbol, market).catch(() => [] as number[]),
      ]);
      const t = tickers.find(x => x.base === coin.base);
      if (!t || ohlcv.length < 2) { setState('nodata'); return; }

      const closes = ohlcv.map(k => k.close);
      const candles = ohlcv.map(k => ({ high: k.high, low: k.low, close: k.close }));
      const consensus = computeConsensus(candles, market);
      // 방향 틸트 없음 — 백테스트에서 합의 점수의 예측력이 0이었다(lib/forecast.ts 주석)
      const marketCloses = marketCandles.map(k => k.close);
      const model = buildForecast(closes, t.lastPrice, marketCloses.length ? marketCloses : undefined);
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
        scenarios: historicalScenarios(fullCloses.length > closes.length ? fullCloses : closes, t.lastPrice, HORIZONS),
        fullCloses: Math.max(fullCloses.length, closes.length),
      });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  useEffect(() => { load(); }, [load]);

  // 일/주/월 뷰 — 지평마다 다른 변동성(sigmaAt)을 그대로 쓴다
  const series = useMemo(() => {
    if (!snap) return [];
    const cfg = TIMEFRAMES[tf];
    return forecastSeries(snap.model, cfg.stepDays, cfg.count);
  }, [snap, tf]);

  // 경로 최고/최저 분포 — "한 번이라도 도달" 확률용. 무거우니 한 번만 계산한다.
  const barriers = useMemo(() => (snap ? simulateBarriers(snap.model, BARRIER_CHECKPOINTS, 4000, 2024) : null), [snap]);

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
  const p1m = m.projections.find(p => p.key === '1m')!;
  const p1y = m.projections.find(p => p.key === '1y')!;
  // TP를 SL보다 먼저 칠 확률과 그때의 기대값 (R 배수). 승률만으론 전략의 좋고 나쁨을 못 본다.
  const pTp = s.consensus ? probTpBeforeSl(s.price, s.consensus.tp, s.consensus.sl) : NaN;
  const rr = s.consensus ? Math.abs(s.consensus.tp - s.consensus.entry) / Math.abs(s.consensus.entry - s.consensus.sl) : NaN;
  const evR = isFinite(pTp) && isFinite(rr) ? (pTp / 100) * rr - (1 - pTp / 100) : NaN;
  // 코인 티커로 시드를 만들어 리렌더/재방문에도 같은 경로가 나오게 한다
  const seed = [...coin.base].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const paths = simulatePaths(m, DAILY_PATH_DAYS, 12, seed);
  const flip = hasSignFlip(s.scenarios);
  const presets = targetPrices(s.price);

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
            <p className="text-[10px] text-slate-600 mt-0.5 tabular-nums">
              now {m.currentAnnualVolPct.toFixed(0)}% · {m.currentAnnualVolPct < m.annualVolPct ? 'calmer' : 'wilder'} than usual
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
      <Section id="prediction" title="Prediction" sub={`Two views: a deliberately conservative model forecast, and what ${coin.base} actually did in every comparable window of its history`}>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 mb-4">
          <ForecastChart history={s.closes.slice(-CHART_HISTORY)} daily={m.daily} spot={s.price} paths={paths} />
          <p className="text-[11px] text-slate-600 mt-2 text-center leading-relaxed">
            The faint lines are <b className="text-slate-500">simulated scenarios</b> drawn from the same fitted model — samples of how the price could wander,
            not predictions of when. The solid line is the forecast; it is smooth because nothing in the data predicts day-to-day direction.
          </p>
        </div>

        {/* 왜 장기 중앙값이 평평한지 먼저 밝힌다 */}
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 mb-4 text-xs text-slate-400 leading-relaxed">
          <p className="mb-2">
            {coin.base}&apos;s raw trailing drift is <b className="text-slate-300">{((Math.exp(m.muRaw * 365) - 1) * 100).toFixed(1)}%</b> per year
            (t = {m.tStat.toFixed(2)}, not significant). Extrapolating that would just replay the last year, so instead we split it into a market component and
            a coin-specific one, and shrink each toward zero.
          </p>
          {m.hasMarket && (
            <div className="grid grid-cols-3 gap-2 mb-2 text-center">
              <div className="rounded-lg bg-slate-900/60 p-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Market (β={m.beta.toFixed(2)})</p>
                <p className={`text-sm font-black tabular-nums ${m.marketAnnualPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {m.marketAnnualPct >= 0 ? '+' : ''}{m.marketAnnualPct.toFixed(1)}%/yr
                </p>
              </div>
              <div className="rounded-lg bg-slate-900/60 p-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Coin-specific (α)</p>
                <p className={`text-sm font-black tabular-nums ${m.alphaAnnualPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {m.alphaAnnualPct >= 0 ? '+' : ''}{m.alphaAnnualPct.toFixed(1)}%/yr
                </p>
              </div>
              <div className="rounded-lg bg-slate-900/60 p-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Forecast drift</p>
                <p className={`text-sm font-black tabular-nums ${m.annualDriftPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {m.annualDriftPct >= 0 ? '+' : ''}{m.annualDriftPct.toFixed(1)}%/yr
                </p>
              </div>
            </div>
          )}
          <p>
            The market prior is ±{(PRIOR_MARKET_DRIFT_SD * 100).toFixed(0)}%/yr, which is a <b className="text-slate-400">deliberately assertive</b> choice: it
            lets a coin&apos;s long-run trend show up in the forecast. It has a measured price — see the methodology below. The alpha prior is tighter
            (±{(PRIOR_ALPHA_DRIFT_SD * 100).toFixed(0)}%/yr) and puts {(m.shrink * 100).toFixed(0)}% of the weight on the data.
            {m.driftGated && <> Because {coin.base} has under {MIN_DRIFT_HISTORY} days of history, the assertive prior is <b className="text-amber-400">switched off</b> for it and a conservative one used instead.</>}
            {' '}The forecast line is smooth and monotone because nothing in the data predicts day-to-day direction — a zig-zagging daily forecast would be
            invented, not measured.
          </p>
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
                  <th className="text-right font-semibold px-3 py-3">Forecast</th>
                  <th className="text-right font-semibold px-3 py-3">High (P75)</th>
                  <th className="text-right font-semibold px-3 py-3">vs now</th>
                  <th className="text-right font-semibold px-3 py-3 border-l border-slate-800/70">
                    Typical peak
                    <span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">touched 50% of the time</span>
                  </th>
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
                    <td className="px-3 py-3 text-right text-white font-bold tabular-nums">${formatPrice(p.forecast)}</td>
                    <td className="px-3 py-3 text-right text-emerald-400/80 tabular-nums">${formatPrice(p.high)}</td>
                    <td className="px-3 py-3 text-right"><Pct value={p.changePct} /></td>
                    <td className="px-3 py-3 text-right tabular-nums border-l border-slate-800/40">
                      <span className="text-amber-400 font-bold">${formatPrice(p.peak)}</span>
                      <span className="block text-[10px] text-amber-500/60">+{p.peakPct.toFixed(1)}%</span>
                    </td>
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

        {/* 목표가 도달 확률 — "10만 갈까?" 같은 질문에 점 예측이 아니라 확률로 답한다 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-slate-800">
            <h3 className="text-sm font-black text-white">Probability of reaching a price</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              The model does not claim {coin.base} will hit a round number — it assigns that number a probability.
            </p>
          </div>
          <div className="px-4 pt-3">
            <label className="flex items-center gap-2 text-xs text-slate-400">
              <span className="shrink-0">Custom target</span>
              <span className="text-slate-600">$</span>
              <input
                type="number" inputMode="decimal" value={target} onChange={e => setTarget(e.target.value)}
                placeholder={String(Math.round(s.price * 1.5))}
                className="w-40 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-amber-500/60 tabular-nums"
              />
            </label>
          </div>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                  <th className="text-left font-semibold px-4 py-3" rowSpan={2}>Target</th>
                  <th className="text-right font-semibold px-3 py-3" rowSpan={2}>vs now</th>
                  <th className="text-center font-semibold px-3 py-2 border-l border-slate-800/70" colSpan={3}>
                    Ever touches it
                    <span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">at any point before</span>
                  </th>
                  <th className="text-center font-semibold px-3 py-2 border-l border-slate-800/70" colSpan={3}>
                    Ends at or beyond
                    <span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">closing price on that date</span>
                  </th>
                </tr>
                <tr className="text-[10px] uppercase tracking-wide text-slate-600 border-b border-slate-800">
                  {['1Y', '2Y', '3Y'].map((l, i) => <th key={`e${l}`} className={`text-right font-semibold px-3 py-1.5 ${i === 0 ? 'border-l border-slate-800/70' : ''}`}>{l}</th>)}
                  {['1Y', '2Y', '3Y'].map((l, i) => <th key={`c${l}`} className={`text-right font-semibold px-3 py-1.5 ${i === 0 ? 'border-l border-slate-800/70' : ''}`}>{l}</th>)}
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const custom = Number(target);
                  const rows = [...presets];
                  if (isFinite(custom) && custom > 0 && !rows.includes(custom)) rows.push(custom);
                  rows.sort((a, b) => a - b);
                  return rows.map(v => {
                    const up = v >= s.price;
                    const isCustom = isFinite(custom) && custom > 0 && v === custom && !presets.includes(custom);
                    const clr = up ? 'text-emerald-400' : 'text-rose-400';
                    return (
                      <tr key={v} className={`border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors ${isCustom ? 'bg-amber-500/[0.06]' : ''}`}>
                        <td className="px-4 py-2.5 font-bold text-white tabular-nums">${formatPrice(v)}</td>
                        <td className="px-3 py-2.5 text-right"><Pct value={(v / s.price - 1) * 100} /></td>
                        {BARRIER_CHECKPOINTS.map((d, i) => {
                          const p = barriers ? probEverReach(barriers, i, v, s.price) : NaN;
                          return (
                            <td key={`e${d}`} className={`px-3 py-2.5 text-right tabular-nums font-bold ${clr} ${i === 0 ? 'border-l border-slate-800/40' : ''}`}>
                              {isFinite(p) ? `${p.toFixed(1)}%` : '…'}
                            </td>
                          );
                        })}
                        {BARRIER_CHECKPOINTS.map((d, i) => {
                          const p = probReach(s.model, v, d);
                          return (
                            <td key={`c${d}`} className={`px-3 py-2.5 text-right tabular-nums ${clr} opacity-60 ${i === 0 ? 'border-l border-slate-800/40' : ''}`}>
                              {isFinite(p) ? `${p.toFixed(1)}%` : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
            <b className="text-slate-400">&quot;Ever touches&quot; is the number most people actually mean</b>, and it is much larger than &quot;ends at or beyond&quot;.
            Historically {coin.base === 'BTC' ? 'Bitcoin' : coin.base} touched a given level within a one-year window far more often than it finished above it —
            for BTC, a +58% level was touched in 61.4% of one-year windows but closed above in only 44.0%. The touch figures come from 4,000 simulated paths of
            the same fitted distribution (fat-tailed, with the measured volatility term structure), monitored on daily closes, so they are consistent with the
            bands above. Upward targets read as &quot;reach or exceed&quot;; downward targets as &quot;fall to or below&quot;.
          </div>
        </div>

        {/* 과거 구간 시나리오 — 모델이 아니라 이 코인이 실제로 살아낸 구간들 */}
        {s.scenarios.length > 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-slate-800">
              <h3 className="text-sm font-black text-white">Historical scenarios — what {coin.base} actually did</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Every overlapping window in {coin.base}&apos;s {s.fullCloses.toLocaleString()} days of history. No model, no drift — just what happened.
                {flip && <span className="text-amber-400/90"> Note the median changes sign across horizons.</span>}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                    <th className="text-left font-semibold px-4 py-3">Period</th>
                    <th className="text-right font-semibold px-3 py-3">Worst 25%</th>
                    <th className="text-right font-semibold px-3 py-3">Median</th>
                    <th className="text-right font-semibold px-3 py-3">Best 25%</th>
                    <th className="text-right font-semibold px-3 py-3">Median vs now</th>
                    <th className="text-right font-semibold px-3 py-3">Rose</th>
                    <th className="text-right font-semibold px-4 py-3 border-l border-slate-800/70">Sample</th>
                  </tr>
                </thead>
                <tbody>
                  {s.scenarios.map(r => (
                    <tr key={r.key} className={`border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors ${r.reliable ? '' : 'opacity-45'}`}>
                      <td className="px-4 py-3 font-bold text-slate-300">{r.label}</td>
                      <td className="px-3 py-3 text-right text-rose-400/80 tabular-nums">${formatPrice(r.p25)}</td>
                      <td className="px-3 py-3 text-right text-white font-bold tabular-nums">${formatPrice(r.median)}</td>
                      <td className="px-3 py-3 text-right text-emerald-400/80 tabular-nums">${formatPrice(r.p75)}</td>
                      <td className="px-3 py-3 text-right"><Pct value={r.medianPct} /></td>
                      <td className="px-3 py-3 text-right text-slate-400 tabular-nums">{r.pUp.toFixed(0)}%</td>
                      <td className="px-4 py-3 text-right text-[11px] tabular-nums border-l border-slate-800/40">
                        {r.reliable ? (
                          <span className="text-slate-500">{r.independent} independent</span>
                        ) : (
                          <span className="text-amber-500/80" title={`Needs ${MIN_INDEPENDENT_WINDOWS} non-overlapping windows`}>
                            only {r.independent} — not reliable
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
              <b className="text-slate-400">Read this as history, not prophecy.</b> Overlapping windows inflate the apparent sample: what counts is the number
              of <i>independent</i> windows, shown on the right. Rows with fewer than {MIN_INDEPENDENT_WINDOWS} are greyed out — {coin.base}&apos;s 3-year row
              rests on barely a couple of non-overlapping periods. And most coins lived through more bull market than bear, so these medians lean optimistic.
              The model forecast above is deliberately far more conservative.
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-black text-white">{TIMEFRAMES[tf].label}</h3>
            <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
              {(Object.keys(TIMEFRAMES) as Timeframe[]).map(k => (
                <button key={k} onClick={() => setTf(k)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md capitalize transition-colors ${tf === k ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}>
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="sticky top-0 bg-slate-900 z-10">
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                  <th className="text-left font-semibold px-4 py-3">Date (UTC)</th>
                  <th className="text-right font-semibold px-3 py-3">Low (P25)</th>
                  <th className="text-right font-semibold px-3 py-3">Forecast</th>
                  <th className="text-right font-semibold px-3 py-3">High (P75)</th>
                  <th className="text-right font-semibold px-3 py-3">Range width</th>
                  <th className="text-right font-semibold px-4 py-3">vs now</th>
                </tr>
              </thead>
              <tbody>
                {series.map(d => (
                  <tr key={d.day} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5 text-slate-300">{utcDate(utcDayOffset(d.day))}</td>
                    <td className="px-3 py-2.5 text-right text-rose-400/80 tabular-nums">${formatPrice(d.low)}</td>
                    <td className="px-3 py-2.5 text-right text-white font-bold tabular-nums">${formatPrice(d.forecast)}</td>
                    <td className="px-3 py-2.5 text-right text-emerald-400/80 tabular-nums">${formatPrice(d.high)}</td>
                    <td className="px-3 py-2.5 text-right text-slate-400 tabular-nums">±{(((d.high / d.forecast) - 1) * 100).toFixed(1)}%</td>
                    <td className="px-4 py-2.5 text-right"><Pct value={d.changePct} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
            Each row uses the volatility measured for <i>its own</i> horizon, not a rescaled daily number — the weight on {coin.base}&apos;s current
            volatility falls from 0.803 at 1 day to 0.290 at 240, so the range width is not a naive σ√t fan.
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
          No coin&apos;s drift is statistically significant — even Bitcoin&apos;s full 8.9-year Binance history gives t = 1.32 — and the average beta across the
          top coins is 1.00, so a coin&apos;s own trailing return is mostly the market&apos;s. We therefore regress each coin on BTC and shrink the market drift
          (prior ±{(PRIOR_MARKET_DRIFT_SD * 100).toFixed(0)}%/yr) and the coin-specific alpha (prior ±{(PRIOR_ALPHA_DRIFT_SD * 100).toFixed(0)}%/yr) separately.
          Because the market prior is assertive, most coins now carry a positive market component, and their forecasts point the same way as Bitcoin&apos;s.
          A Monte-Carlo on a pure random walk with zero true drift shows what that costs: this market prior can manufacture a 3-year move of 34.6% at the median,
          and 1048% in the worst case, from nothing but noise. The history gate and the drift cap exist to blunt that.
        </p>
        <p className="mb-2">
          <b className="text-slate-400">An honest disclosure about the drift.</b> This site extrapolates a coin&apos;s long-run trend into the forecast, using a
          prior of ±{(PRIOR_MARKET_DRIFT_SD * 100).toFixed(0)}%/yr on the market drift. That is a deliberate choice by the site owner, and it costs accuracy. We
          measured it: across 24 coins with an expanding window, forecasting one year ahead, simply assuming the price does not change gives an RMSE of
          <b className="text-slate-400"> 1.0723</b>. The setting used here gives <b className="text-slate-400">1.1005</b>, about 2.6% worse. Extrapolating the raw
          drift with no shrinkage at all would give 1.4363, or 33.9% worse. In other words, no drift estimator we tested beat &quot;the price stays where it is,&quot;
          and drift estimates swing wildly with the window (for Bitcoin: −45.6%, +36.7%, +10.9% and +35.3% per year using 1, 2.7, 5.5 and 8.9 years of history).
          Treat the forecast as a trend extrapolation, not as a statistically validated prediction — and weigh the range and the probabilities beside it at least
          as heavily.
        </p>
        <p className="mb-2">
          Two safeguards limit the damage. Coins with under {MIN_DRIFT_HISTORY} days of history fall back to a conservative prior, so a brand-new token cannot
          turn noise into a confident multi-year forecast. And the drift is capped at ±0.5 in annual log terms (at most +65% or −39% per year), so no coin can
          compound into an absurd number.
        </p>
        <p className="mb-2">
          Direction is unpredictable, but <b className="text-slate-400">volatility is not</b> — it is close to the only thing in markets that genuinely
          forecasts. Regressing next-week volatility on the trailing 20 days across 28 coins gives a slope of 0.645 with R² = 0.24 (t = 63.9). So each horizon
          gets its own volatility: a blend of {coin.base}&apos;s current level (EWMA, 20-day half-life) and its long-run level, using weights we measured
          directly (0.803 at 1 day, decaying to 0.290 at 240). That is why the bands here are not a naive σ√t fan — a coin that is calm right now gets tighter
          near-term bands even if its history is wild.
        </p>
        <p className="mb-2">
          The shape of the distribution changes with the horizon too. Daily crypto returns are fat-tailed, so a Gaussian band is too wide in the middle: a
          backtest showed our stated &quot;50%&quot; band actually contained <b className="text-slate-400">60.7%</b> of one-day outcomes. We therefore fit a
          Student-t whose degrees of freedom rise with the horizon (3.9 at one day, 15.7 at 180 days, approaching Gaussian as the central limit theorem takes
          over). After the fix the stated 50% and 80% bands contain <b className="text-slate-400">50.1%</b> and <b className="text-slate-400">79.0%</b> of
          outcomes at one day. The bands now mean what they say.
        </p>
        <p>
          We display the <b className="text-slate-400">50% interval (P25–P75)</b> by default and the 80% interval alongside it. We also tested whether mean
          reversion would justify narrower long-horizon bands by measuring the Hurst exponent, but it came out at ≈0.5 for every major coin (a random walk),
          so there is no basis for shrinking them further. And we tested a day-of-week effect, hoping to justify a zig-zagging daily forecast: on the market
          series no weekday clears |t| = 2, and the weekday pattern from one half of history correlates only 0.34 with the other. So the forecast line stays
          smooth, and the wiggle you see belongs to the simulated scenarios, which are labelled as such.
        </p>
        <p className="mb-2">
          That is also why this page shows <b className="text-slate-400">two</b> things. The model forecast is parametric and conservative: one shrunken drift,
          so its path is necessarily smooth and one-directional. The <b className="text-slate-400">historical scenarios</b> table assumes no model at all — it
          replays every window {coin.base} has actually lived through — so its median is free to change sign across horizons, and often does. Neither is a
          promise; the first is what the statistics will defend, the second is what the past contains.
        </p>
        <p>
          We also tested whether {coin.base} mean-reverts to its own 200-day anchor — which would bend the forecast line and give each coin its own direction
          depending on where it sits. Using market-neutral (idiosyncratic) forward returns, non-overlapping windows and a coin-level t-test, the pooled and
          per-coin coefficients came out with <b className="text-slate-400">opposite signs</b> at every horizon (5, 20, 60 and 120 days) and neither half of
          history confirmed the other. So no horizon has a trustworthy direction, and the forecast stays a single shrunken drift. Volatility, by contrast,
          genuinely differs by horizon — which is what the daily / weekly / monthly views above actually model.
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
