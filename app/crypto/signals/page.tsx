'use client';
import { useState, useEffect, useCallback, useMemo, useRef, useReducer } from 'react';
import Link from 'next/link';
import { formatPrice, type Direction } from '@/lib/atr';
import { computeConsensus, STRATEGY_META, type Bias, type ConsensusSignal } from '@/lib/strategies';
import { fetchTickers, fetchDailyCandles, mapWithConcurrency, type Market, type Ticker24h } from '@/lib/binance';
import { buildForecast, HORIZONS, MIN_SAMPLES, type ForecastModel } from '@/lib/forecast';
import { coinByBase } from '@/lib/coins';
import { CoinLogo, Sparkline, Pct, formatVolume } from '@/components/crypto/ui';

const BINANCE_REF = 'https://accounts.binance.com/register?ref=KLLDA01Q';
const BYBIT_REF = 'https://partner.bybit.com/b/127153';

/** 브랜드 아이콘 — 외부 요청/추적 없이 인라인 SVG로 렌더 */
function BinanceIcon() {
  return (
    <svg viewBox="0 0 126 126" className="w-6 h-6" aria-hidden="true">
      <path fill="#F3BA2F" d="M38.87 53.62 63 29.49l24.14 24.14 14.04-14.04L63 1.41 24.83 39.58zM1.4 63l14.04-14.04L29.48 63 15.44 77.04zM38.87 72.38 63 96.51l24.13-24.13 14.05 14.03L63 124.59 24.83 86.42zM96.52 63l14.04-14.04L124.6 63l-14.04 14.04zM77.25 62.99 63 48.74 52.46 59.28l-1.21 1.21-2.5 2.5L63 77.26z" />
    </svg>
  );
}
/** 공식 Bybit 워드마크(위키미디어). 어두운 배경용으로 글자는 밝게, 악센트는 골드 유지 */
function BybitWordmark({ className }: { className?: string }) {
  const L = '#F8FAFC';
  return (
    <svg viewBox="0 0 13547 4513" className={className} role="img" aria-label="Bybit">
      <polygon fill="#F6A500" points="9655,3480 9655,-1 10355,-1 10355,3480" />
      <path fill={L} d="M1500 4514l-1500 0 0 -3481 1440 0c700,0 1107,381 1107,978 0,386 -262,636 -443,719 216,98 493,318 493,782 0,650 -458,1002 -1097,1002zm-116 -2875l0 0 -685 0 0 802 685 0c297,0 463,-161 463,-401 0,-239 -166,-401 -463,-401zm45 1413l0 0 -730 0 0 856 730 0c317,0 468,-195 468,-430 0,-235 -151,-425 -468,-425z" />
      <polygon fill={L} points="4732,3086 4732,4514 4037,4514 4037,3086 2960,1033 3720,1033 4389,2436 5049,1033 5809,1033" />
      <path fill={L} d="M7793 4514l-1500 0 0 -3481 1440 0c700,0 1107,381 1107,978 0,386 -262,636 -443,719 216,98 493,318 493,782 0,650 -458,1002 -1097,1002zm-116 -2875l0 0 -685 0 0 802 685 0c297,0 463,-161 463,-401 0,-239 -166,-401 -463,-401zm45 1413l0 0 -730 0 0 856 730 0c317,0 468,-195 468,-430 0,-235 -151,-425 -468,-425z" />
      <polygon fill={L} points="12610,1639 12610,4514 11911,4514 11911,1639 10974,1639 10974,1033 13547,1033 13547,1639" />
    </svg>
  );
}

const PER_PAGE = 50;
const TP_MULT = 1.5;
const SL_MULT = 1.0;

/**
 * 한 코인의 계산 결과. consensus(방향·TP/SL)와 forecast(기간별 projection)는 같은
 * 캔들에서 나오므로 코인당 klines 호출 1회로 둘 다 만든다.
 */
interface RowInfo {
  c: ConsensusSignal | null;
  f: ForecastModel | null;
  /** 받아온 마감 일봉 수 — 신규 상장이라 예측이 안 되는 경우를 설명하기 위해 */
  days: number;
}

const BIAS_STYLE: Record<Bias, { label: string; cls: string; emoji: string }> = {
  bullish: { label: 'Bullish', cls: 'bg-emerald-500/15 text-emerald-400', emoji: '🟢' },
  bearish: { label: 'Bearish', cls: 'bg-rose-500/15 text-rose-400', emoji: '🔴' },
  neutral: { label: 'Neutral', cls: 'bg-slate-500/15 text-slate-400', emoji: '⚪' },
};
const VOTE_CLR: Record<Bias, string> = { bullish: 'text-emerald-400', bearish: 'text-rose-400', neutral: 'text-slate-600' };

type ListState = 'loading' | 'ready' | 'empty' | 'error';
type SortKey = 'volume' | 'signal' | 'pnl';

/** consensus·projection 계산에 쓰는 일봉 수 (drift·sigma 추정용) */
const FORECAST_DAYS = 365;

/** 정렬용 신호 점수: 강세는 +확신도, 약세는 -확신도, 중립은 0 */
function signalMetric(info: ConsensusSignal): number {
  return info.bias === 'bullish' ? info.confidence : info.bias === 'bearish' ? -info.confidence : 0;
}

function pnlOf(side: Direction, entry: number, price: number): number {
  const raw = ((price - entry) / entry) * 100;
  return side === 'long' ? raw : -raw;
}

/** 현재가가 TP/SL에 도달했는지 (방향 반영) */
function hitState(info: ConsensusSignal, price: number): 'tp' | 'sl' | null {
  if (info.side === 'long') {
    if (price >= info.tp) return 'tp';
    if (price <= info.sl) return 'sl';
  } else {
    if (price <= info.tp) return 'tp';
    if (price >= info.sl) return 'sl';
  }
  return null;
}

/** UTC 기준 시각 라벨 */
function utcLabel(d: Date): string {
  return d.toLocaleString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) + ' UTC';
}

/** 정렬 가능 컬럼 힌트 — 위/아래 화살촉을 겹쳐 표시하고 활성 방향만 강조 */
function SortHint({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  return (
    <span className="inline-flex flex-col leading-[0.55] text-[7px] ml-1">
      <span className={active && dir === 'asc' ? 'text-amber-400' : 'text-slate-600'}>▲</span>
      <span className={active && dir === 'desc' ? 'text-amber-400' : 'text-slate-600'}>▼</span>
    </span>
  );
}

export default function SignalsPage() {
  const [market, setMarket] = useState<Market>('futures');
  const [listState, setListState] = useState<ListState>('loading');
  const [tickers, setTickers] = useState<Ticker24h[]>([]);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('volume');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');
  const [query, setQuery] = useState('');
  const [hitOnly, setHitOnly] = useState(false);
  const [pageComputing, setPageComputing] = useState(false);
  const [fullCompute, setFullCompute] = useState<{ active: boolean; done: number; total: number }>({ active: false, done: 0, total: 0 });
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [btcSpark, setBtcSpark] = useState<number[]>([]);

  // Row cache: symbol -> consensus + forecast. undefined = 미계산.
  // Reset when the market changes (different symbols / candles).
  const cacheRef = useRef<Map<string, RowInfo>>(new Map());
  const [, bump] = useReducer((x: number) => x + 1, 0);

  const loadList = useCallback(async (mkt: Market) => {
    setListState('loading');
    setPage(1);
    setSortKey('volume');
    cacheRef.current = new Map();
    setFullCompute({ active: false, done: 0, total: 0 });
    try {
      const t = await fetchTickers(mkt);
      setTickers(t);
      setUpdatedAt(new Date());
      setListState(t.length ? 'ready' : 'empty');
    } catch {
      setListState('error');
    }
  }, []);

  /** klines 1회로 consensus(방향·TP/SL)와 forecast(기간별 확률분포)를 함께 만든다 */
  async function computeInfo(symbol: string, mkt: Market, spot: number): Promise<RowInfo> {
    try {
      const candles = await fetchDailyCandles(symbol, FORECAST_DAYS, mkt);
      const closes = candles.map(k => k.close);
      const c = computeConsensus(candles, mkt);
      // 방향 틸트는 넣지 않는다 — 백테스트에서 합의 점수의 예측력이 0이었다(lib/forecast.ts 주석)
      const f = buildForecast(closes, spot);
      return { c, f, days: closes.length };
    } catch {
      return { c: null, f: null, days: 0 };
    }
  }

  // Lazy: compute signals for the visible page only (used for Volume sort)
  const computePage = useCallback(async (list: Ticker24h[], mkt: Market) => {
    const todo = list.filter(t => !cacheRef.current.has(t.symbol));
    if (!todo.length) return;
    setPageComputing(true);
    await mapWithConcurrency(todo, 8, async t => {
      cacheRef.current.set(t.symbol, await computeInfo(t.symbol, mkt, t.lastPrice));
    });
    setPageComputing(false);
    bump();
  }, []);

  // Full: compute signals for every coin (required to sort by ATR%/P&L across all coins)
  const computeAll = useCallback(async (list: Ticker24h[], mkt: Market) => {
    const todo = list.filter(t => !cacheRef.current.has(t.symbol));
    if (!todo.length) return;
    let done = list.length - todo.length;
    setFullCompute({ active: true, done, total: list.length });
    await mapWithConcurrency(todo, 8, async t => {
      cacheRef.current.set(t.symbol, await computeInfo(t.symbol, mkt, t.lastPrice));
      done++;
      if (done % 8 === 0 || done === list.length) setFullCompute({ active: true, done, total: list.length });
    });
    setFullCompute({ active: false, done: list.length, total: list.length });
    bump();
  }, []);

  useEffect(() => { loadList(market); }, [market, loadList]);

  // 헤더 카드용 BTC 7일 스파크라인 (마켓당 요청 1회)
  useEffect(() => {
    let cancelled = false;
    fetchDailyCandles('BTCUSDT', 7, market)
      .then(c => { if (!cancelled) setBtcSpark(c.map(x => x.close)); })
      .catch(() => { if (!cancelled) setBtcSpark([]); });
    return () => { cancelled = true; };
  }, [market]);

  // 상단 지표 카드 — 이미 받아온 티커 1건에서 전부 계산(추가 요청 없음)
  const stats = useMemo(() => {
    if (!tickers.length) return null;
    const btc = tickers.find(t => t.base === 'BTC') ?? null;
    const totalVol = tickers.reduce((s, t) => s + t.quoteVolume, 0);
    let up = 0, down = 0;
    for (const t of tickers) {
      if (t.priceChangePercent > 0) up++;
      else if (t.priceChangePercent < 0) down++;
    }
    // 거래량이 극히 적은 코인의 이상치 급등은 제외
    const liquid = tickers.filter(t => t.quoteVolume >= 1e6);
    const gainer = liquid.length
      ? liquid.reduce((a, b) => (b.priceChangePercent > a.priceChangePercent ? b : a))
      : null;
    const upShare = up + down > 0 ? (up / (up + down)) * 100 : 50;
    return { btc, totalVol, up, down, gainer, upShare };
  }, [tickers]);

  // Search filter (by base symbol), then sort. Volume sort is free (ticker order);
  // Search filter → sort → (optional) TP/SL-hit filter.
  // Signal/P&L sorts and the hit filter read the cache (require the full compute).
  const needsFullCompute = sortKey === 'signal' || sortKey === 'pnl' || hitOnly;

  const sortedTickers = useMemo(() => {
    const q = query.trim().toUpperCase();
    let list = q ? tickers.filter(t => t.base.includes(q)) : tickers;
    if (sortKey !== 'volume') {
      const scored = list.map(t => {
        const c = cacheRef.current.get(t.symbol)?.c;
        const metric = c ? (sortKey === 'signal' ? signalMetric(c) : pnlOf(c.side, c.entry, t.lastPrice)) : null;
        return { t, metric };
      });
      scored.sort((a, b) => {
        if (a.metric == null && b.metric == null) return 0;
        if (a.metric == null) return 1;
        if (b.metric == null) return -1;
        return sortDir === 'desc' ? b.metric - a.metric : a.metric - b.metric;
      });
      list = scored.map(x => x.t);
    }
    if (hitOnly) list = list.filter(t => { const c = cacheRef.current.get(t.symbol)?.c; return c != null && hitState(c, t.lastPrice) != null; });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickers, sortKey, sortDir, query, hitOnly, fullCompute.active]);

  const totalPages = Math.max(1, Math.ceil(sortedTickers.length / PER_PAGE));
  const pageTickers = useMemo(() => sortedTickers.slice((page - 1) * PER_PAGE, page * PER_PAGE), [sortedTickers, page]);

  // Trigger the right computation for the current view.
  useEffect(() => {
    if (listState !== 'ready') return;
    if (needsFullCompute) computeAll(tickers, market);
    else if (pageTickers.length) computePage(pageTickers, market);
  }, [listState, needsFullCompute, pageTickers, tickers, market, computeAll, computePage]);

  // 검색어·필터 바뀌면 첫 페이지로
  useEffect(() => { setPage(1); }, [query, hitOnly]);

  // 최신 값을 즉시 읽기 위한 ref (stale closure/레이스 방지)
  const marketRef = useRef(market);
  marketRef.current = market;
  const fullComputeRef = useRef(false);
  fullComputeRef.current = fullCompute.active;

  // 60초마다 가격만 조용히 갱신(진입가·TP·SL은 일봉 고정이라 그대로, P&L·현재가만 업데이트)
  const refreshPrices = useCallback(async () => {
    if (fullComputeRef.current) return; // 전체 계산 중이면 건너뜀(중복 실행 방지)
    const mkt = marketRef.current;
    try {
      const fresh = await fetchTickers(mkt);
      if (marketRef.current !== mkt) return; // 응답 도착 전 마켓이 바뀌었으면 폐기(레이스 방지)
      const priceMap = new Map(fresh.map(t => [t.symbol, t.lastPrice]));
      setTickers(prev => prev.map(t => ({ ...t, lastPrice: priceMap.get(t.symbol) ?? t.lastPrice })));
      setUpdatedAt(new Date());
    } catch { /* 조용히 무시 */ }
  }, []);

  // 매분 :00초에 맞춰 갱신(들어온 시점 기준이 아니라 벽시계 분 경계). 매번 다음 :00까지 재예약해 드리프트 방지
  useEffect(() => {
    if (listState !== 'ready') return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      refreshPrices();
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    return () => clearTimeout(timer);
  }, [listState, refreshPrices]);

  function selectSort(key: SortKey) {
    if (key !== 'volume' && sortKey === key) { setSortDir(d => (d === 'desc' ? 'asc' : 'desc')); return; }
    setSortKey(key);
    setPage(1);
    if (key !== 'volume') setSortDir('desc');
  }

  const updatedLabel = useMemo(() => (updatedAt ? utcLabel(updatedAt) : null), [updatedAt]);

  // 다음 00:00 UTC(전략 리셋)까지 남은 시간 — 매분 :00초에 갱신
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setNow(Date.now());
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    return () => clearTimeout(timer);
  }, []);
  const resetIn = useMemo(() => {
    const d = new Date(now);
    const next = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0);
    const ms = next - now;
    return `${Math.floor(ms / 3_600_000)}h ${Math.floor((ms % 3_600_000) / 60_000)}m`;
  }, [now]);

  const th = 'text-right font-semibold px-2 py-3';
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="border-b border-slate-800 sticky top-0 z-10 bg-slate-950/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-300">Signal Board</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Referral links */}
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">🎁 New-user bonuses — trade with an edge</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {/* Bybit */}
          <a href={BYBIT_REF} target="_blank" rel="noopener noreferrer sponsored"
            className="group relative overflow-hidden rounded-2xl border border-yellow-500/40 bg-gradient-to-br from-yellow-500/[0.22] via-amber-600/[0.08] to-slate-900/0 p-4 hover:border-yellow-400/80 hover:shadow-lg hover:shadow-yellow-500/15 hover:-translate-y-0.5 transition-all">
            <span className="pointer-events-none absolute -right-8 -top-10 w-32 h-32 rounded-full bg-yellow-400/20 blur-2xl group-hover:bg-yellow-400/30 transition-colors" />
            <span className="relative flex items-center gap-2 mb-2">
              <BybitWordmark className="h-4 w-auto" />
              <span className="text-[9px] font-bold text-yellow-400/70 uppercase tracking-wide">New user</span>
              <span className="ml-auto flex items-center gap-1 text-[13px] font-black text-slate-950 bg-yellow-400 rounded-lg px-3 py-1 group-hover:bg-yellow-300 transition-colors">
                Claim <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </span>
            <span className="relative flex items-baseline gap-2 flex-wrap">
              <span className="text-[26px] leading-none font-black text-yellow-300">Up to $30,000</span>
              <span className="text-[11px] text-slate-400">+ $20 welcome · fee discount</span>
            </span>
          </a>

          {/* Binance */}
          <a href={BINANCE_REF} target="_blank" rel="noopener noreferrer sponsored"
            className="group relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/[0.22] via-amber-600/[0.08] to-slate-900/0 p-4 hover:border-amber-400/80 hover:shadow-lg hover:shadow-amber-500/15 hover:-translate-y-0.5 transition-all">
            <span className="pointer-events-none absolute -right-8 -top-10 w-32 h-32 rounded-full bg-amber-400/20 blur-2xl group-hover:bg-amber-400/30 transition-colors" />
            <span className="relative flex items-center gap-2 mb-2">
              <BinanceIcon />
              <span className="font-black text-amber-200 text-[15px] tracking-tight">BINANCE</span>
              <span className="text-[9px] font-bold text-amber-400/70 uppercase tracking-wide">New user</span>
              <span className="ml-auto flex items-center gap-1 text-[13px] font-black text-slate-950 bg-amber-400 rounded-lg px-3 py-1 group-hover:bg-amber-300 transition-colors">
                Claim <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </span>
            <span className="relative flex items-baseline gap-2 flex-wrap">
              <span className="text-[26px] leading-none font-black text-amber-300">Up to $600</span>
              <span className="text-[11px] text-slate-400">+ 10% off trading fees</span>
            </span>
          </a>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📈</div>
          <h1 className="text-2xl font-black text-white mb-1.5">Crypto Signal Board</h1>
          <p className="text-slate-400 text-sm">Consensus of 4 strategies (Trend · Bollinger · RSI · ATR) → direction, entry / TP / SL, live P&amp;L, and 5D–3Y price projections</p>
          <p className="text-slate-600 text-xs mt-1.5">🕛 All times in UTC · strategy resets in <span className="text-amber-500/80 font-semibold tabular-nums">{resetIn}</span> (00:00 UTC)</p>
        </div>

        {/* Market stat cards */}
        {listState === 'ready' && stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1.5">BTC price</p>
              {stats.btc ? (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl font-black text-white tabular-nums">{formatPrice(stats.btc.lastPrice)}</span>
                    {btcSpark.length > 1 && <Sparkline points={[...btcSpark, stats.btc.lastPrice]} w={60} h={22} />}
                  </div>
                  <p className="text-xs mt-1"><Pct value={stats.btc.priceChangePercent} /> <span className="text-slate-600">24h</span></p>
                </>
              ) : <span className="text-slate-600 text-sm">-</span>}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1.5">24h volume</p>
              <span className="text-xl font-black text-white tabular-nums">{formatVolume(stats.totalVol)}</span>
              <p className="text-xs text-slate-600 mt-1">{tickers.length} USDT pairs</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1.5">Advancing / declining</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-emerald-400 tabular-nums">{stats.up}</span>
                <span className="text-slate-700">/</span>
                <span className="text-xl font-black text-rose-400 tabular-nums">{stats.down}</span>
              </div>
              <div className="mt-2 flex h-1.5 gap-[2px]" role="img" aria-label={`${stats.up} advancing, ${stats.down} declining`}>
                <div className="bg-emerald-500 rounded-full" style={{ width: `${stats.upShare}%` }} />
                <div className="bg-rose-500 rounded-full" style={{ width: `${100 - stats.upShare}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1.5">Top gainer 24h</p>
              {stats.gainer ? (
                <>
                  <div className="flex items-center gap-2">
                    <CoinLogo base={stats.gainer.base} size={22} />
                    <span className="text-lg font-black text-white truncate">{stats.gainer.base}</span>
                  </div>
                  <p className="text-xs mt-1"><Pct value={stats.gainer.priceChangePercent} /></p>
                </>
              ) : <span className="text-slate-600 text-sm">-</span>}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
            {(['spot', 'futures'] as Market[]).map(m => (
              <button key={m} onClick={() => setMarket(m)}
                className={`px-5 py-1.5 text-sm font-bold rounded-lg transition-colors ${market === m ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}>
                {m === 'spot' ? 'SPOT' : 'FUTURES'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setHitOnly(v => !v)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${hitOnly ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'}`}>
              🎯 TP/SL hit
            </button>
            <button onClick={() => loadList(market)} className="text-xs font-semibold text-slate-500 hover:text-amber-400 transition-colors">↻ Refresh</button>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 text-xs text-slate-400 leading-relaxed">
          <p className="font-bold text-amber-300/90 mb-1">How the 5D–3Y forecast is built</p>
          <p>
            The forecast price comes from a <b className="text-slate-300">Bayesian posterior drift</b>: the coin&apos;s measured trend, pulled toward zero in
            proportion to how noisy that measurement is. No coin&apos;s drift is statistically significant — even BTC&apos;s full 8.9-year history gives
            t = 1.32 — so the forecast stays deliberately modest rather than extrapolating noise. We also do <b className="text-slate-300">not</b> tilt it with
            technical indicators: backtested over 46 coins, their 5-day directional accuracy was 49.8%, a coin flip. The range below each price contains half
            of all outcomes. Click a coin for the daily path and probabilities.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-sm pointer-events-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value.replace(/\s/g, ''))}
            placeholder="Search coin (e.g. BTC, SOL, PEPE)"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors">✕</button>
          )}
        </div>

        {(listState === 'loading' || listState === 'empty' || listState === 'error') && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-20 flex flex-col items-center gap-3">
            {listState === 'loading' ? (
              <>
                <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
                <span className="text-sm font-bold text-slate-400">Loading market data...</span>
              </>
            ) : listState === 'error' ? (
              <>
                <span className="text-3xl">⚠️</span>
                <span className="text-sm font-bold text-rose-400">Couldn&apos;t load prices</span>
                <span className="text-xs text-slate-500">Binance may be restricted in your region</span>
                <button onClick={() => loadList(market)} className="mt-2 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl px-4 py-2 transition-colors">Retry</button>
              </>
            ) : (
              <><span className="text-3xl">🛠️</span><span className="text-sm font-bold text-slate-300">No data</span></>
            )}
          </div>
        )}

        {/* Full-compute progress (P&L sort) */}
        {listState === 'ready' && fullCompute.active && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-16 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-300">Calculating signals for all coins…</span>
            <span className="text-xs text-slate-500 tabular-nums">{fullCompute.done} / {fullCompute.total}</span>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${fullCompute.total ? (fullCompute.done / fullCompute.total) * 100 : 0}%` }} />
            </div>
          </div>
        )}

        {listState === 'ready' && !fullCompute.active && (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm whitespace-nowrap">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                      <th className="sticky left-0 z-20 bg-slate-900 text-left font-semibold px-4 py-3">Coin</th>
                      <th className="text-left font-semibold px-2 py-3">
                        <button onClick={() => selectSort('signal')} className={`uppercase tracking-wide inline-flex items-center hover:text-slate-300 transition-colors ${sortKey === 'signal' ? 'text-amber-400' : ''}`}>
                          Signal <SortHint active={sortKey === 'signal'} dir={sortDir} />
                        </button>
                      </th>
                      <th className={th}>Entry</th>
                      <th className={th}>Current</th>
                      <th className={`${th} border-l border-slate-800/70`}>
                        <button onClick={() => selectSort('pnl')} className={`uppercase tracking-wide inline-flex items-center hover:text-slate-300 transition-colors ${sortKey === 'pnl' ? 'text-amber-400' : ''}`}>
                          P&amp;L <SortHint active={sortKey === 'pnl'} dir={sortDir} />
                        </button>
                      </th>
                      <th className={`${th} border-l border-slate-800/70`}>TP</th>
                      <th className={th}>SL</th>
                      <th className={`${th} border-l border-slate-800/70`}>
                        <button onClick={() => selectSort('volume')} className={`uppercase tracking-wide inline-flex items-center hover:text-slate-300 transition-colors ${sortKey === 'volume' ? 'text-amber-400' : ''}`}>
                          Volume <SortHint active={sortKey === 'volume'} dir="desc" />
                        </button>
                      </th>
                      {HORIZONS.map((h, hi) => (
                        <th key={h.key} className={`${th} ${hi === 0 ? 'border-l border-slate-800/70' : ''}`}>
                          {h.short}
                          <span className="block text-[9px] font-normal text-slate-600 normal-case tracking-normal">forecast · range</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageTickers.map((t, i) => {
                      const info = cacheRef.current.get(t.symbol);
                      const pending = info === undefined;
                      const c = info?.c ?? null;
                      const f = info?.f ?? null;

                      const pnl = c ? pnlOf(c.side, c.entry, t.lastPrice) : null;
                      const tpPct = c ? pnlOf(c.side, c.entry, c.tp) : null;
                      const slPct = c ? pnlOf(c.side, c.entry, c.sl) : null;
                      const hit = c ? hitState(c, t.lastPrice) : null;
                      const chg = t.priceChangePercent;

                      // 새 상장 코인은 스냅샷 목록에 없을 수 있다 — 그때는 링크하지 않는다.
                      const meta = coinByBase(t.base);
                      // 자동 새로고침으로 현재가가 바뀌어도 구간이 따라가도록 계산 시점 spot 대비 비율로 재조정
                      const fcScale = f ? t.lastPrice / f.spot : 1;

                      const coinInner = (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600 text-xs tabular-nums w-5 shrink-0">{(page - 1) * PER_PAGE + i + 1}</span>
                            <CoinLogo base={t.base} />
                            <span className={`font-bold text-white ${meta ? 'group-hover:text-amber-400 transition-colors' : ''}`}>{t.base}</span>
                            {c && market === 'futures' && (
                              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${c.side === 'long' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                                {c.side === 'long' ? 'LONG' : 'SHORT'}
                              </span>
                            )}
                          </div>
                          <span className="block pl-7 text-[11px] text-slate-500">
                            {c ? `ATR ${c.atrPct.toFixed(1)}%` : pending ? 'calculating…' : 'no data'}
                          </span>
                        </>
                      );

                      return (
                        <tr key={t.symbol} className="group border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                          {/* 가로 스크롤 시 코인명이 고정되도록 sticky. 배경이 불투명해야 아래 셀이 비치지 않는다 */}
                          <td className="sticky left-0 z-10 bg-slate-900 p-0 border-b border-slate-800/50">
                            {meta ? (
                              <Link href={`/crypto/${meta.slug}/price-prediction`} className="block px-4 py-3 group-hover:bg-slate-800/40 transition-colors">
                                {coinInner}
                              </Link>
                            ) : (
                              <div className="px-4 py-3 group-hover:bg-slate-800/40 transition-colors">{coinInner}</div>
                            )}
                          </td>

                          <td className="px-2 py-3">
                            {c ? (
                              <div className="flex flex-col gap-1">
                                <span className={`inline-flex w-fit items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded ${BIAS_STYLE[c.bias].cls}`}>
                                  {BIAS_STYLE[c.bias].emoji} {BIAS_STYLE[c.bias].label}
                                  {c.bias !== 'neutral' && <span className="opacity-80">{c.confidence}%</span>}
                                </span>
                                <span className="flex gap-1.5">
                                  {c.votes.map(v => (
                                    <span key={v.key} title={`${STRATEGY_META[v.key].label}: ${v.note}`} className={`text-[10px] font-bold ${VOTE_CLR[v.bias]}`}>
                                      {STRATEGY_META[v.key].short}{v.bias === 'bullish' ? '↑' : v.bias === 'bearish' ? '↓' : '·'}
                                    </span>
                                  ))}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-600 text-xs">{pending ? '…' : '-'}</span>
                            )}
                          </td>

                          <td className="px-2 py-3 text-right text-slate-300 tabular-nums">{c ? formatPrice(c.entry) : pending ? '…' : '-'}</td>

                          <td className="px-2 py-3 text-right tabular-nums">
                            <div className="flex flex-col items-end leading-tight">
                              <span className="text-white">{formatPrice(t.lastPrice)}</span>
                              {isFinite(chg) && <span className="text-[10px] opacity-70"><Pct value={chg} /></span>}
                            </div>
                          </td>

                          <td className="px-2 py-3 text-right tabular-nums border-l border-slate-800/40">
                            {pnl == null ? (
                              <span className="text-slate-600">{pending ? '…' : '-'}</span>
                            ) : (
                              <div className="flex flex-col items-end gap-1">
                                <Pct value={pnl} bold />
                                {hit && (
                                  <span className={`text-[9px] font-black px-1 py-0.5 rounded ${hit === 'tp' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>{hit === 'tp' ? '🎯 TP' : '🛑 SL'}</span>
                                )}
                              </div>
                            )}
                          </td>

                          <td className="px-2 py-3 text-right tabular-nums border-l border-slate-800/40">
                            {c ? (
                              <div className="flex flex-col items-end leading-tight">
                                <span className="text-emerald-400">{formatPrice(c.tp)}</span>
                                <span className="text-[10px] text-emerald-500/50">+{tpPct!.toFixed(1)}%</span>
                              </div>
                            ) : <span className="text-slate-600">{pending ? '…' : '-'}</span>}
                          </td>

                          <td className="px-2 py-3 text-right tabular-nums">
                            {c ? (
                              <div className="flex flex-col items-end leading-tight">
                                <span className="text-rose-400">{formatPrice(c.sl)}</span>
                                <span className="text-[10px] text-rose-500/50">{slPct!.toFixed(1)}%</span>
                              </div>
                            ) : <span className="text-slate-600">{pending ? '…' : '-'}</span>}
                          </td>

                          <td className="px-2 py-3 text-right text-slate-400 tabular-nums border-l border-slate-800/40">{formatVolume(t.quoteVolume)}</td>

                          {HORIZONS.map((h, hi) => {
                            const p = f?.projections.find(x => x.key === h.key);
                            return (
                              <td key={h.key} className={`px-2 py-3 text-right ${hi === 0 ? 'border-l border-slate-800/40' : ''}`}>
                                {p ? (
                                  <div className="flex flex-col items-end leading-tight">
                                    <span className="text-white font-bold tabular-nums">{formatPrice(p.forecast * fcScale)}</span>
                                    <span className={`text-[10px] tabular-nums ${p.changePct >= 0 ? 'text-emerald-500/70' : 'text-rose-500/70'}`}>
                                      {p.changePct >= 0 ? '+' : ''}{p.changePct.toFixed(1)}%
                                    </span>
                                    <span className="text-[9px] text-slate-600 tabular-nums">
                                      {formatPrice(p.low * fcScale)} – {formatPrice(p.high * fcScale)}
                                    </span>
                                  </div>
                                ) : pending ? (
                                  <span className="text-slate-600 text-xs">…</span>
                                ) : info && info.days > 0 ? (
                                  <span className="text-slate-600 text-[10px]" title={`Needs ${MIN_SAMPLES + 1} daily closes, has ${info.days}`}>new · {info.days}d</span>
                                ) : (
                                  <span className="text-slate-600 text-xs">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    {pageTickers.length === 0 && (
                      <tr>
                        <td colSpan={8 + HORIZONS.length} className="px-4 py-12 text-center text-sm text-slate-500">
                          {hitOnly ? 'No coins have hit TP or SL yet' : `No coins match "${query}"`}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
                <span>Votes: <b className="text-slate-400">T</b> Trend · <b className="text-slate-400">B</b> Bollinger · <b className="text-slate-400">R</b> RSI · <b className="text-slate-400">A</b> ATR <span className="text-slate-600">(↑ bullish · ↓ bearish · · neutral)</span></span>
                {updatedLabel && <span>🕒 {updatedLabel}</span>}
              </div>
              <div className="px-4 pb-3 text-[11px] text-slate-600">
                {market === 'spot' ? 'Spot' : 'Futures'} · {query ? `${sortedTickers.length} / ` : ''}{tickers.length} coins · TP {TP_MULT}×ATR · SL {SL_MULT}×ATR ·{' '}
5D–3Y show the forecast price, its change, and the range containing half of outcomes · coins listed under {MIN_SAMPLES + 1} days show “new”{pageComputing ? ' · calculating…' : ''}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">« First</button>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">‹ Prev</button>
              <span className="px-3 text-sm font-bold text-slate-300 tabular-nums">{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">Next ›</button>
              <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">Last »</button>
            </div>
          </>
        )}

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-500 leading-relaxed">
          <p className="mb-1">⚠️ Not investment advice — reference calculations only. All trading decisions and risks are your own.</p>
          <p className="mb-1">Signal = consensus of 4 strategies (Trend = SMA 20/50, Bollinger = %B, RSI = 14, ATR = SMA20 trend); confidence % is the share voting the same direction. Entry / TP / SL use the last closed daily candle and ATR (TP {TP_MULT}× / SL {SL_MULT}×); P&amp;L is live from the current price. Spot is buy-only (long); LONG/SHORT applies to futures only.</p>
          <p>Projections (5D–3Y) fit a geometric Brownian motion to {FORECAST_DAYS} days of log returns. Short horizons are tilted by the consensus score; that tilt decays after 30 days and is capped at ±22%. The long-run drift is discarded unless its t-statistic clears |t| ≥ 3, because a drift compounded over 1,095 days turns noise into a confident-looking forecast. Ranges are the 50% interval (P25–P75) and widen with √t.</p>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">🔄 Refresh to recalculate with the latest prices · Binance public market data</p>
      </div>
    </div>
  );
}
