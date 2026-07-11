'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchTickers, fetchDailyOHLCV, fetchDailyCandles, fetchFullDailyCloses, type DailyOHLCV } from '@/lib/binance';
import { computeConsensus, STRATEGY_META, type ConsensusSignal, type Bias } from '@/lib/strategies';
import { buildForecast, simulatePaths, forecastSeries, probReach, monthlyProjections, correlation, medianPeakLevel, HORIZONS, TIMEFRAMES, greenDays, volatilityLabel, trendConfidenceLabel, probTpBeforeSl, PRIOR_MARKET_DRIFT_SD, PRIOR_ALPHA_DRIFT_SD, MIN_DRIFT_HISTORY, MIN_SAMPLES, RELIABLE_SAMPLES, DAILY_PATH_DAYS, type ForecastModel, type Timeframe } from '@/lib/forecast';
import { historicalScenarios, historicalDailyPath, historicalMedianAt, hasSignFlip, MIN_INDEPENDENT_WINDOWS, type ScenarioHorizon } from '@/lib/scenarios';
import { maTable, maTableFromCloses, oscillatorTable, pivots, sentiment, resampleCloses, type Reading, type Action } from '@/lib/indicators';
import { simulateBarriers, probEverReach } from '@/lib/barriers';
import { investOutcome } from '@/lib/invest';
import { COINS } from '@/lib/coins';
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
/** 상관계수 계산에 쓰는 일수 */
const CORR_DAYS = 365;
/** 상관계수를 비교할 대형 코인 */
const PEER_BASES = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA'];
/** 월별 예측 연도 탭 */
const YEARS = [0, 1, 2, 3].map(i => new Date().getUTCFullYear() + i);
/** 투자 계산기의 보유 기간 선택지 */
const HOLD_OPTIONS: [string, number][] = [['1M', 30], ['3M', 90], ['6M', 180], ['1Y', 365], ['2Y', 730], ['3Y', 1095]];

interface Snapshot {
  price: number;
  chg24h: number;
  quoteVolume: number;
  model: ForecastModel;
  consensus: ConsensusSignal | null;
  closes: number[];
  ohlcv: DailyOHLCV[];
  green: { green: number; total: number };
  /** 상장 이후 전체 종가로 만든 과거 구간 시나리오 */
  scenarios: ScenarioHorizon[];
  peers: { base: string; closes: number[] }[];
  fullCloses: number;
  /** 과거 전체 종가 — 일별 중앙 경로 계산용 */
  allCloses: number[];
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

const ACTION_CLS: Record<Action, string> = {
  BUY: 'bg-emerald-500/15 text-emerald-400',
  SELL: 'bg-rose-500/15 text-rose-400',
  NEUTRAL: 'bg-slate-500/15 text-slate-400',
};
function ActionChip({ action }: { action: Action }) {
  return <span className={`text-[10px] font-black px-2 py-0.5 rounded ${ACTION_CLS[action]}`}>{action}</span>;
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
  const [amount, setAmount] = useState('1000');
  const [holdDays, setHoldDays] = useState(365);
  const [year, setYear] = useState(() => new Date().getUTCFullYear());

  // 코인 티커로 시드를 고정해 리렌더/재방문에도 같은 시나리오가 나오게 한다
  const pathSeed = useMemo(() => [...coin.base].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7), [coin.base]);

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

      // 상관계수용 동종 코인 — 대형주 몇 개만(요청 수를 늘리지 않도록 소수로 제한)
      const peerBases = PEER_BASES.filter(b => b !== coin.base).slice(0, 6);
      const peerCloses = await Promise.all(
        peerBases.map(b =>
          fetchDailyCandles(`${b}USDT`, CORR_DAYS, market)
            .then(k => ({ base: b, closes: k.map(x => x.close) }))
            .catch(() => ({ base: b, closes: [] as number[] })),
        ),
      );
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
        green: greenDays(closes, 30),
        peers: peerCloses.filter(p => p.closes.length >= 60),
        scenarios: historicalScenarios(fullCloses.length > closes.length ? fullCloses : closes, t.lastPrice, HORIZONS),
        fullCloses: Math.max(fullCloses.length, closes.length),
        allCloses: fullCloses.length > closes.length ? fullCloses : closes,
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

  // 과거 일별 중앙 경로(차트용) + 현재 뷰의 각 행에 대응하는 과거 중앙값
  const histPath = useMemo(() => (snap ? historicalDailyPath(snap.allCloses, snap.price, DAILY_PATH_DAYS) : []), [snap]);
  // 기술적 지표 — 값과 관례적 판독. 예측이 아니라 현재 상태 서술이다.
  const ta = useMemo(() => {
    if (!snap) return null;
    const c = snap.ohlcv;
    const weekly = resampleCloses(snap.allCloses, 7);
    const dailySma = maTable(c, [3, 5, 10, 21, 50, 100, 200], 'sma');
    const dailyEma = maTable(c, [3, 5, 10, 21, 50, 100, 200], 'ema');
    const weeklySma = weekly.length >= 21 ? maTableFromCloses(weekly, [21, 50, 100, 200], 'sma', 'SMA') : [];
    const weeklyEma = weekly.length >= 21 ? maTableFromCloses(weekly, [21, 50, 100, 200], 'ema', 'EMA') : [];
    const osc = oscillatorTable(c);
    const all = [...dailySma, ...dailyEma, ...weeklySma, ...weeklyEma, ...osc];
    return { dailySma, dailyEma, weeklySma, weeklyEma, osc, pv: pivots(c), s: sentiment(all), total: all.length };
  }, [snap]);

  // 투자 결과 분포 + 월별 예측 + 상관계수
  const invest = useMemo(() => {
    if (!snap) return null;
    const amt = Number(amount);
    return isFinite(amt) && amt > 0 ? investOutcome(snap.model, amt, holdDays) : null;
  }, [snap, amount, holdDays]);

  const months = useMemo(() => (snap ? monthlyProjections(snap.model, year) : []), [snap, year]);

  // 각 행의 "그 시점까지 절반의 확률로 한 번은 닿는 가격" — 보드의 Trade target과 같은 종류의 값이라
  // 두 화면이 같은 언어로 말하게 된다. (예측 중앙값만 있으면 상세 표가 죽어 보인다.)
  // 표의 각 행에 붙일 시나리오 표본 — 예측이 아니라 표본이므로 실제로 오르내린다
  const seriesSamples = useMemo(() => {
    if (!snap) return [];
    const step = TIMEFRAMES[tf].stepDays;
    const p = simulatePaths(snap.model, series.length * step, 3, pathSeed + 101);
    return series.map((_, i) => p.map(path => path[(i + 1) * step - 1]));
  }, [snap, series, tf, pathSeed]);

  const seriesPeaks = useMemo(() => {
    if (!snap) return [];
    const m = snap.model;
    return series.map(d => {
      const drift = m.mu * d.day;
      const sd = m.sigmaAt(d.day) * Math.sqrt(d.day);
      return medianPeakLevel(m.spot, drift, sd, m.sigmaAt(d.day), d.day);
    });
  }, [snap, series]);

  const corrs = useMemo(() => {
    if (!snap) return [];
    const mine = snap.closes.slice(-CORR_DAYS);
    return snap.peers
      .map(p => ({ base: p.base, r: correlation(mine, p.closes.slice(-CORR_DAYS)) }))
      .filter((x): x is { base: string; r: number } => x.r != null)
      .sort((a, b) => b.r - a.r);
  }, [snap]);

  const histSeries = useMemo(
    () => (snap ? series.map(d => historicalMedianAt(snap.allCloses, snap.price, d.day)) : []),
    [snap, series],
  );

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
  const paths = simulatePaths(m, DAILY_PATH_DAYS, 24, pathSeed);
  const flip = hasSignFlip(s.scenarios);
  const presets = targetPrices(s.price);

  return (
    <>
      {/* Hero — 우리가 파는 것은 예측가가 아니라 검증된 확률이므로, 그것을 먼저 보여준다 */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-500/[0.05] p-6 mb-4">
        <span className="pointer-events-none absolute -right-16 -top-20 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <CoinLogo base={coin.base} size={44} />
            <div>
              <h1 className="text-2xl font-black text-white leading-tight">{coin.name} Price Prediction</h1>
              <p className="text-xs text-slate-500 font-semibold">
                {coin.base} · Binance {marketOf(coin) === 'spot' ? 'spot' : 'futures'} · {m.samples + 1} daily closes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-black text-white tabular-nums">${formatPrice(s.price)}</p>
              <p className="text-xs"><Pct value={s.chg24h} /> <span className="text-slate-600">24h</span></p>
            </div>
            <Sparkline points={s.closes.slice(-30).concat(s.price)} w={120} h={40} />
          </div>
        </div>

        {/* 헤드라인 3종 — 전부 크고, 전부 참이고, 전부 코인마다 다르다 */}
        <div className="relative grid sm:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-slate-950/60 border border-amber-500/25 p-4">
            <p className="text-[11px] uppercase tracking-wide text-amber-500/80 mb-1">Typical peak · 1 year</p>
            <p className="text-2xl font-black text-amber-300 tabular-nums">${formatPrice(p1y.peak)}</p>
            <p className="text-[11px] text-slate-500 mt-1">+{p1y.peakPct.toFixed(1)}% · touched at some point in half of all paths</p>
          </div>
          <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Gain ≥10% in 30 days</p>
            <p className="text-2xl font-black text-emerald-400 tabular-nums">{p1m.pUp10.toFixed(1)}%</p>
            <p className="text-[11px] text-slate-500 mt-1">probability · drop ≥10%: {p1m.pDown10.toFixed(1)}%</p>
          </div>
          <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Volatility</p>
            <p className={`text-2xl font-black tabular-nums ${VOL_CLR[volLabel]}`}>{m.annualVolPct.toFixed(0)}%</p>
            <p className="text-[11px] text-slate-500 mt-1">{volLabel} · now {m.currentAnnualVolPct.toFixed(0)}%, {m.currentAnnualVolPct < m.annualVolPct ? 'calmer' : 'wilder'} than usual</p>
          </div>
        </div>
      </div>

      {/* 캘리브레이션 증거 — 경쟁 사이트는 방법을 말하고, 우리는 적중률을 말한다 */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px]">
        <span className="flex items-center gap-1.5 font-bold text-slate-300">
          <span aria-hidden="true">✓</span> Calibrated, and checked
        </span>
        <span className="text-slate-500">Our stated 50% band actually contains <b className="text-emerald-400">50.1%</b> of outcomes</span>
        <span className="text-slate-700">·</span>
        <span className="text-slate-500">Our 50% touch level is touched <b className="text-emerald-400">50.0%</b> of the time</span>
        <span className="text-slate-700">·</span>
        <span className="text-slate-500">The moving-average + RSI + MACD method other sites use: <b className="text-rose-400">49.4%</b> directional accuracy</span>
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
          {[['overview', 'Overview'], ['prediction', 'Prediction'], ['technical', 'Indicators'], ['historic', 'History']].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-amber-400 hover:border-slate-600 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* 투자 계산기 — 경쟁사는 단일 ROI를 주지만, 결과는 숫자가 아니라 분포다 */}
      {invest && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 mb-5">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-sm font-black text-white mb-0.5">If you invest today</h2>
              <p className="text-[11px] text-slate-500">Most sites give one ROI number. The outcome is a distribution — here it is.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="text-slate-600">$</span>
                <input
                  type="number" inputMode="decimal" value={amount} min={1}
                  onChange={e => setAmount(e.target.value)}
                  className="w-28 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-sm text-slate-200 tabular-nums focus:outline-none focus:border-amber-500/60"
                />
              </label>
              <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
                {HOLD_OPTIONS.map(([label, d]) => (
                  <button key={d} onClick={() => setHoldDays(d)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${holdDays === d ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="rounded-xl bg-slate-950/60 border border-rose-500/20 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">Worst 10%</p>
              <p className="text-lg font-black text-rose-400 tabular-nums">${formatPrice(invest.p10)}</p>
            </div>
            <div className="rounded-xl bg-slate-950/60 border border-amber-500/30 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wide text-amber-500/80 mb-1">Median</p>
              <p className="text-xl font-black text-white tabular-nums">${formatPrice(invest.median)}</p>
              <p className={`text-[11px] font-bold tabular-nums ${invest.medianRoi >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {invest.medianRoi >= 0 ? '+' : ''}{invest.medianRoi.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-xl bg-slate-950/60 border border-emerald-500/20 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">Best 10%</p>
              <p className="text-lg font-black text-emerald-400 tabular-nums">${formatPrice(invest.p90)}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px]">
            <span className="text-slate-500">Chance you lose money: <b className="text-rose-400">{invest.pLoss.toFixed(1)}%</b></span>
            <span className="text-slate-500">Chance it doubles: <b className="text-emerald-400">{invest.pDouble.toFixed(1)}%</b></span>
            <span className="text-slate-600">Half of outcomes land between ${formatPrice(invest.p25)} and ${formatPrice(invest.p75)}</span>
          </div>
        </div>
      )}

      {/* ── Overview ─────────────────────────────── */}
      <Section id="overview" title="Overview" sub={`Live market state and technical readout for ${coin.name}`}>
        {/* 히어로가 가격·변동성을, Indicators 섹션이 RSI·SMA를 이미 보여주므로 여기서는 중복을 뺀다 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">24h volume</p>
            <p className="text-lg font-black text-white tabular-nums">{formatVolume(s.quoteVolume)}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Green days (30d)</p>
            <p className="text-lg font-black tabular-nums text-white">{s.green.green}/{s.green.total} <span className="text-xs text-slate-500">{greenPct}%</span></p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Trend significance</p>
            <p className="text-lg font-black text-white">{trendLabel} <span className="text-xs text-slate-500 tabular-nums">t={m.tStat.toFixed(2)}</span></p>
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
      <Section id="prediction" title="Prediction" sub={`Two independent views: a conservative statistical model, and every comparable window ${coin.base} has actually lived through`}>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 mb-4">
          <ForecastChart history={s.closes.slice(-CHART_HISTORY)} daily={m.daily} spot={s.price} paths={paths} historyPath={histPath} height={320} />
          <p className="text-[11px] text-slate-600 mt-2 text-center leading-relaxed">
            The faint lines are <b className="text-slate-500">simulated scenarios</b> from the same fitted model — samples of how the price could wander, not
            predictions of when. The accent line is the model forecast; it is smooth because a constant drift can only produce a monotone path. The
            <b style={{ color: '#818cf8' }}> indigo line</b> is the <b className="text-slate-400">historical median path</b> — for each day ahead, the median of
            every such move {coin.base} has actually made. It wanders up and down, but <b className="text-slate-400">do not read meaning into the wiggles</b>: we
            simulated 400 random walks with the same drift, volatility and fat tails, and they produce just as many down-steps (for Bitcoin, 47% of the time).
            The wobble is sampling noise. Read its <i>level</i>, not its shape — and that is why the forecast line stays smooth rather than imitating it.
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
                  <th className="text-right font-semibold px-3 py-3">Forecast<span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">median close</span></th>
                  <th className="text-right font-semibold px-3 py-3">High (P75)</th>
                  <th className="text-right font-semibold px-3 py-3 border-l border-slate-800/70" style={{ color: '#fbbf24' }}>
                    Typical peak
                    <span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">touched 50% of the time</span>
                  </th>
                  <th className="text-right font-semibold px-3 py-3 border-l border-slate-800/70">
                    Scenarios
                    <span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">3 sampled paths</span>
                  </th>
                  <th className="text-right font-semibold px-3 py-3 border-l border-slate-800/70" style={{ color: '#818cf8' }}>
                    History
                    <span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">median of past moves</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {series.map((d, ri) => (
                  <tr key={d.day} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5 text-slate-300">{utcDate(utcDayOffset(d.day))}</td>
                    <td className="px-3 py-2.5 text-right text-rose-400/80 tabular-nums">${formatPrice(d.low)}</td>
                    <td className="px-3 py-2.5 text-right text-white font-bold tabular-nums">${formatPrice(d.forecast)}</td>
                    <td className="px-3 py-2.5 text-right text-emerald-400/80 tabular-nums">${formatPrice(d.high)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums border-l border-slate-800/40">
                      <span className="text-amber-400 font-bold">${formatPrice(seriesPeaks[ri] ?? d.forecast)}</span>
                      <span className="block text-[10px] text-amber-500/60">
                        +{((((seriesPeaks[ri] ?? d.forecast) / s.price) - 1) * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums border-l border-slate-800/40">
                      <span className="flex justify-end gap-1.5 text-[11px]">
                        {(seriesSamples[ri] ?? []).map((v, si) => (
                          <span key={si} className={v >= s.price ? 'text-emerald-400/80' : 'text-rose-400/80'}>
                            {v >= s.price ? '+' : ''}{(((v / s.price) - 1) * 100).toFixed(1)}%
                          </span>
                        ))}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums border-l border-slate-800/40" style={{ color: '#818cf8' }}>
                      {histSeries[ri] != null ? `$${formatPrice(histSeries[ri]!)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
            <b className="text-amber-400/90">Typical peak</b> is the level {coin.base} touches at some point by that date in half of all paths — the same kind of
            number as the trade target on the signal board, and always well above the forecast. The <b className="text-slate-400">Forecast</b> column is the median
            close, which barely moves over a few days because the drift is only a few percent of the noise; that is why the two columns look so different.
            <b className="text-slate-400">Scenarios</b> shows three sampled paths from the same model — those <i>do</i> move up and down day to day, because a
            single future is volatile even when its median is not. That is the honest version of a zig-zagging forecast: the wiggle belongs to the individual
            paths, not to the average of all of them. Each row uses the volatility measured for <i>its own</i> horizon, so the peak is not a rescaled daily number. The
            <b style={{ color: '#818cf8' }}> History</b> column is not a forecast: it is the median of every move of that length {coin.base} has actually made.
            It is free to go down as well as up, but a random walk with the same drift and volatility produces the same amount of wobble about half the time, so
            treat the individual ups and downs as sampling noise rather than structure.
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-slate-800"><h3 className="text-sm font-black text-white">By horizon</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                  <th className="text-left font-semibold px-4 py-3">Period</th>
                  <th className="text-right font-semibold px-3 py-3">Low (P25)</th>
                  <th className="text-right font-semibold px-3 py-3">Forecast<span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">median</span></th>
                  <th className="text-right font-semibold px-3 py-3">Expected<span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">mean</span></th>
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
                    <td className="px-3 py-3 text-right text-slate-300 tabular-nums">
                      ${formatPrice(p.mean)}
                      <span className="block text-[10px] text-slate-600">+{p.meanPct.toFixed(1)}%</span>
                    </td>
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
              rests on barely a couple of non-overlapping periods. And most coins lived through more bull market than bear, so these medians lean optimistic at
              long horizons: the model forecast above sits well below them at one and three years, because it shrinks the trend rather than assuming the past bull
              market repeats. At a month or a quarter the two can cross, with the model slightly higher.
            </div>
          </div>
        )}

        {/* 월별 예측 — 연도 탭 */}
        {months.length > 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-black text-white">Month by month</h3>
              <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
                {YEARS.map(y => (
                  <button key={y} onClick={() => setYear(y)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md tabular-nums transition-colors ${year === y ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}>
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                    <th className="text-left font-semibold px-4 py-3">Month</th>
                    <th className="text-right font-semibold px-3 py-3">Low (P25)</th>
                    <th className="text-right font-semibold px-3 py-3">Forecast</th>
                    <th className="text-right font-semibold px-3 py-3">High (P75)</th>
                    <th className="text-right font-semibold px-3 py-3 border-l border-slate-800/70" style={{ color: '#fbbf24' }}>Typical peak</th>
                    <th className="text-right font-semibold px-4 py-3">vs now</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map(r => (
                    <tr key={r.label} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-slate-300">{r.label}</td>
                      <td className="px-3 py-2.5 text-right text-rose-400/80 tabular-nums">${formatPrice(r.low)}</td>
                      <td className="px-3 py-2.5 text-right text-white font-bold tabular-nums">${formatPrice(r.forecast)}</td>
                      <td className="px-3 py-2.5 text-right text-emerald-400/80 tabular-nums">${formatPrice(r.high)}</td>
                      <td className="px-3 py-2.5 text-right text-amber-400 font-bold tabular-nums border-l border-slate-800/40">${formatPrice(r.peak)}</td>
                      <td className="px-4 py-2.5 text-right"><Pct value={r.changePct} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
              Other sites label these columns &quot;Min / Avg / Max&quot;. They are not minimums and maximums — they are the 25th and 75th percentiles of a
              distribution, and the price lands outside them half the time. We label them for what they are.
            </div>
          </div>
        )}

      </Section>

      {/* ── Technical analysis ───────────────────── */}
      {ta && (
        <Section id="technical" title="Indicators" sub={`${ta.total} readings for ${coin.base} — where the price sits, not where it is going`}>
          {/* Sentiment tally */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Indicator tally</p>
                <p className={`text-2xl font-black ${ta.s.label === 'Bullish' ? 'text-emerald-400' : ta.s.label === 'Bearish' ? 'text-rose-400' : 'text-slate-300'}`}>
                  {ta.s.label}
                </p>
              </div>
              <div className="text-right text-xs tabular-nums">
                <p className="text-emerald-400 font-bold">{ta.s.bullish} bullish</p>
                <p className="text-rose-400 font-bold">{ta.s.bearish} bearish</p>
                <p className="text-slate-500">{ta.s.neutral} neutral</p>
              </div>
            </div>
            <div className="flex h-2 gap-[2px]" role="img" aria-label={`${ta.s.bullish} bullish, ${ta.s.bearish} bearish`}>
              <div className="bg-emerald-500 rounded-full" style={{ width: `${ta.s.bullishPct}%` }} />
              <div className="bg-rose-500 rounded-full" style={{ width: `${100 - ta.s.bullishPct}%` }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              This is a <b className="text-slate-400">count of indicator states</b>, not a forecast. Each label below just says whether the price sits above or
              below that line, or whether an oscillator is in its conventional overbought / oversold zone. We measured what these labels are worth: a composite of
              moving averages, RSI and MACD predicted {coin.base}&apos;s 5-day direction <b className="text-slate-400">49.4%</b> of the time across 46 coins — a
              coin flip. Read them as a description of where the price is, not where it is going.
            </p>
          </div>

          {/* Moving averages */}
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {([['Daily SMA', ta.dailySma], ['Daily EMA', ta.dailyEma], ['Weekly SMA', ta.weeklySma], ['Weekly EMA', ta.weeklyEma]] as [string, Reading[]][])
              .filter(([, rows]) => rows.length > 0)
              .map(([title, rows]) => (
                <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-xs font-black text-white">{title}</h3>
                    <span className="text-[10px] text-slate-600">price vs line</span>
                  </div>
                  <table className="w-full text-sm">
                    <tbody>
                      {rows.map(r => (
                        <tr key={r.name} className="border-b border-slate-800/50 last:border-0">
                          <td className="px-4 py-2 text-slate-400">{r.name}</td>
                          <td className="px-3 py-2 text-right text-white tabular-nums">${formatPrice(r.value)}</td>
                          <td className="px-3 py-2 text-right text-[11px] tabular-nums">
                            <span className={s.price >= r.value ? 'text-emerald-500/70' : 'text-rose-500/70'}>
                              {s.price >= r.value ? '+' : ''}{(((s.price / r.value) - 1) * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="px-4 py-2 text-right"><ActionChip action={r.action} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>

          {/* Oscillators */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-4">
            <div className="px-4 py-2.5 border-b border-slate-800"><h3 className="text-xs font-black text-white">Oscillators</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <tbody>
                  {ta.osc.map(r => (
                    <tr key={r.name} className="border-b border-slate-800/50 last:border-0">
                      <td className="px-4 py-2 text-slate-400">{r.name}</td>
                      <td className="px-3 py-2 text-right text-white tabular-nums">
                        {Math.abs(r.value) >= 1000 ? formatPrice(r.value) : r.value.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-right"><ActionChip action={r.action} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pivot levels */}
          {ta.pv && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-800">
                <h3 className="text-xs font-black text-white">Key price levels</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Classical pivot from the last closed candle: P = (high + low + close) / 3. A deterministic formula, not a prediction.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
                <table className="w-full text-sm">
                  <tbody>
                    {([['R3', ta.pv.r3], ['R2', ta.pv.r2], ['R1', ta.pv.r1]] as [string, number][]).map(([k, v]) => (
                      <tr key={k} className="border-b border-slate-800/50 last:border-0">
                        <td className="px-4 py-2 text-slate-500">Resistance {k}</td>
                        <td className="px-4 py-2 text-right text-emerald-400 font-bold tabular-nums">${formatPrice(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table className="w-full text-sm">
                  <tbody>
                    {([['S1', ta.pv.s1], ['S2', ta.pv.s2], ['S3', ta.pv.s3]] as [string, number][]).map(([k, v]) => (
                      <tr key={k} className="border-b border-slate-800/50 last:border-0">
                        <td className="px-4 py-2 text-slate-500">Support {k}</td>
                        <td className="px-4 py-2 text-right text-rose-400 font-bold tabular-nums">${formatPrice(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2.5 border-t border-slate-800 text-center text-xs">
                <span className="text-slate-500">Pivot </span>
                <span className="text-white font-black tabular-nums">${formatPrice(ta.pv.p)}</span>
              </div>
            </div>
          )}
        </Section>
      )}

      {/* ── Historic data ────────────────────────── */}
      <Section id="historic" title="History" sub={`${coin.base} daily open / high / low / close and volume, last ${HISTORY_ROWS} closed candles (UTC)`}>
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
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 mb-5 text-xs text-slate-500 leading-relaxed [&>p]:max-w-[95ch]">
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

      {/* 상관계수 — 저희는 이미 BTC 베타를 쓰므로 데이터가 있다 */}
      {corrs.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 mb-5">
          <h2 className="text-sm font-black text-white mb-1">How {coin.base} moves with other coins</h2>
          <p className="text-[11px] text-slate-500 mb-4">
            Correlation of daily returns over the last {CORR_DAYS} days. 1.00 means they move in lockstep; 0 means unrelated.
            {m.hasMarket && <> {coin.base}&apos;s beta to Bitcoin is <b className="text-slate-400">{m.beta.toFixed(2)}</b>, which is what the forecast uses.</>}
          </p>
          <div className="flex flex-wrap gap-2">
            {corrs.map(({ base, r }) => {
              const meta = COINS.find(x => x.base === base);
              const pct = Math.abs(r) * 100;
              const inner = (
                <>
                  <CoinLogo base={base} size={18} />
                  <span className="font-bold text-white text-xs">{base}</span>
                  <span className={`text-xs font-black tabular-nums ${r >= 0.5 ? 'text-emerald-400' : r >= 0 ? 'text-slate-300' : 'text-rose-400'}`}>
                    {r >= 0 ? '+' : ''}{r.toFixed(2)}
                  </span>
                  <span className="h-1 w-10 rounded-full bg-slate-800 overflow-hidden">
                    <span className={`block h-full rounded-full ${r >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${pct}%` }} />
                  </span>
                </>
              );
              return meta ? (
                <Link key={base} href={`/crypto/${meta.slug}/price-prediction`}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 hover:border-slate-600 transition-colors">
                  {inner}
                </Link>
              ) : (
                <div key={base} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">{inner}</div>
              );
            })}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 mb-5">
        <h2 className="text-sm font-black text-white mb-1">What this page will not tell you</h2>
        <p className="text-[11px] text-slate-500 mb-3">Every claim below is something we tested and could not support. The tests live in the code.</p>
        <ul className="space-y-2 text-xs text-slate-400">
          {[
            ['Which way the price moves next', 'A consensus of trend, Bollinger, RSI and ATR predicted the 5-day direction 49.8% of the time across 46 coins.'],
            ['That indicators beat a coin flip', 'The moving-average + RSI + MACD method other prediction sites describe: 49.4%. MACD alone: 49.5%.'],
            ['That more training helps', 'A 21-feature model on 45,279 samples scored 51.25% in-sample and 48.79% out-of-sample — worse than a coin flip.'],
            ['That there is a tradeable cycle', `Binance's history spans only two to three halving cycles. The effective sample for a 4-year cycle is ~2, not ~800.`],
            ['A zig-zagging daily forecast', 'The wiggle in a historical median path is indistinguishable from what a random walk produces about half the time.'],
          ].map(([claim, why]) => (
            <li key={claim} className="flex gap-2">
              <span className="text-rose-400/70 shrink-0" aria-hidden="true">✕</span>
              <span><b className="text-slate-300">{claim}.</b> <span className="text-slate-500">{why}</span></span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-500 leading-relaxed [&>p]:max-w-[95ch]">
        <p>
          ⚠️ Not investment advice. This page contains statistical projections of a price distribution, not a forecast of what {coin.name} will do.
          The model knows nothing about news, regulation, liquidity or market structure. All trading decisions and risks are your own.
        </p>
      </div>
    </>
  );
}
