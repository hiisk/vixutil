'use client';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { formatPrice, type Direction } from '@/lib/atr';
import { computeConsensus, STRATEGY_META, type Bias, type ConsensusSignal } from '@/lib/strategies';
import { fetchTickers, fetchDailyCandles, mapWithConcurrency, type Market, type Ticker24h } from '@/lib/binance';
import { buildForecast, simulatePaths, HORIZONS, MIN_SAMPLES, DAILY_PATH_DAYS, type ForecastModel } from '@/lib/forecast';
import { coinByBase } from '@/lib/coins';
import { CoinLogo, Sparkline, Pct, MiniPaths, formatVolume } from '@/components/crypto/ui';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import ReferralCards from '@/components/ReferralCards';
import PageGlow from '@/components/PageGlow';

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
  bullish: { label: 'Bullish', cls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400', emoji: '🟢' },
  bearish: { label: 'Bearish', cls: 'bg-rose-500/15 text-rose-700 dark:text-rose-400', emoji: '🔴' },
  neutral: { label: 'Neutral', cls: 'bg-slate-500/15 text-slate-500 dark:text-slate-400', emoji: '⚪' },
};
const VOTE_CLR: Record<Bias, string> = { bullish: 'text-emerald-600 dark:text-emerald-400', bearish: 'text-rose-600 dark:text-rose-400', neutral: 'text-slate-400 dark:text-slate-500' };

type ListState = 'loading' | 'ready' | 'empty' | 'error';
type SortKey = 'volume' | 'signal' | 'chg24h' | 'range24h';

/** 볼륨 컬럼을 상세 페이지로 옮겼으므로, 현재 정렬 기준을 하단에 글로 알려준다 */
const SORT_LABEL: Record<SortKey, string> = {
  volume: '24h volume',
  signal: 'signal',
  chg24h: '24h change',
  range24h: '24h range',
};

/**
 * consensus·projection 계산에 쓰는 일봉 수.
 * drift 추정은 표본 수가 아니라 관측 기간에 달려 있어 창이 길수록 안정적이다.
 * 바이낸스 klines 상한이 1000이므로 요청 1회로 받을 수 있는 최대치를 쓴다.
 */
const FORECAST_DAYS = 998;

/**
 * 보드에 노출할 지평. 화면이 빽빽해 3D·3M·6M은 뺐다(상세 페이지에는 전부 있다).
 * 좁은 화면에서는 그중에서도 1M·1Y만 남긴다 — 휴대폰에서 4개는 읽히지 않는다.
 */
const BOARD_HORIZONS = HORIZONS.filter(h => ['1w', '1m', '1y', '3y'].includes(h.key));
/** 지평별 반응형 노출 규칙 (헤더·셀이 같은 값을 써야 컬럼이 어긋나지 않는다) */
const HORIZON_VIS: Record<string, string> = {
  '1w': 'hidden md:table-cell',
  '1m': '',
  '1y': '',
  '3y': 'hidden lg:table-cell',
};

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
      <span className={active && dir === 'asc' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}>▲</span>
      <span className={active && dir === 'desc' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}>▼</span>
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
  //
  // 비동기 계산은 cacheRef에 써 넣고(수백 개를 항목마다 setState하면 리렌더가 폭발한다),
  // 배치가 끝나면 불변 스냅샷을 state로 한 번 올린다. 렌더는 이 state만 읽는다 —
  // 렌더 중에 가변 ref를 읽으면 React가 변경을 추적하지 못한다.
  const cacheRef = useRef<Map<string, RowInfo>>(new Map());
  const [cache, setCache] = useState<Map<string, RowInfo>>(new Map());
  const publishCache = useCallback(() => setCache(new Map(cacheRef.current)), []);
  // 시장 대용치(BTC) 일봉 종가 — 예측을 시장 성분과 코인 고유(alpha) 성분으로 분해하는 데 쓴다
  const marketClosesRef = useRef<number[]>([]);

  const loadList = useCallback(async (mkt: Market) => {
    setListState('loading');
    setPage(1);
    setSortKey('volume');
    cacheRef.current = new Map();
    setCache(new Map());
    marketClosesRef.current = [];
    setFullCompute({ active: false, done: 0, total: 0 });
    try {
      // 시장 기준계열을 먼저 받아둔다. 실패해도 예측은 자기 drift로 폴백한다.
      try {
        const btc = await fetchDailyCandles('BTCUSDT', FORECAST_DAYS, mkt);
        marketClosesRef.current = btc.map(k => k.close);
      } catch { marketClosesRef.current = []; }
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
      // 방향 틸트는 넣지 않는다 — 백테스트에서 합의 점수의 예측력이 0이었다(lib/forecast.ts 주석).
      // 대신 시장 성분과 코인 고유(alpha) 성분으로 분해한다.
      const f = buildForecast(closes, spot, marketClosesRef.current.length ? marketClosesRef.current : undefined);
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
    publishCache();
  }, [publishCache]);

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
    publishCache();
  }, [publishCache]);

  // 마켓이 바뀔 때마다 목록을 새로 받는다. 외부 데이터 동기화는 effect의 본래 용도다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
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
    // 상단 하이라이트 카드 — 전부 이미 받아온 티커 1건에서 나온다(추가 요청 없음)
    const trending = [...tickers].sort((a, b) => b.quoteVolume - a.quoteVolume).slice(0, 3);
    const gainers = [...liquid].sort((a, b) => b.priceChangePercent - a.priceChangePercent).slice(0, 3);
    const volatile = [...liquid].sort((a, b) => b.rangePct - a.rangePct).slice(0, 3);
    return { btc, totalVol, up, down, gainer, upShare, trending, gainers, volatile };
  }, [tickers]);

  // Search filter (by base symbol), then sort. Volume sort is free (ticker order);
  // Search filter → sort → (optional) TP/SL-hit filter.
  // Signal/P&L sorts and the hit filter read the cache (require the full compute).
  // 티커만으로 정렬되는 키는 코인별 계산이 필요 없다
  const needsFullCompute = sortKey === 'signal' || hitOnly;

  const sortedTickers = useMemo(() => {
    const q = query.trim().toUpperCase();
    let list = q ? tickers.filter(t => t.base.includes(q)) : tickers;
    if (sortKey === 'chg24h' || sortKey === 'range24h') {
      const key = sortKey === 'chg24h' ? 'priceChangePercent' as const : 'rangePct' as const;
      list = [...list].sort((a, b) => (sortDir === 'desc' ? b[key] - a[key] : a[key] - b[key]));
    } else if (sortKey !== 'volume') {
      const scored = list.map(t => {
        const c = cache.get(t.symbol)?.c;
        const metric = c ? signalMetric(c) : null;
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
    if (hitOnly) list = list.filter(t => { const c = cache.get(t.symbol)?.c; return c != null && hitState(c, t.lastPrice) != null; });
    return list;
  }, [tickers, sortKey, sortDir, query, hitOnly, cache]);

  const totalPages = Math.max(1, Math.ceil(sortedTickers.length / PER_PAGE));
  const pageTickers = useMemo(() => sortedTickers.slice((page - 1) * PER_PAGE, page * PER_PAGE), [sortedTickers, page]);

  // Trigger the right computation for the current view.
  useEffect(() => {
    if (listState !== 'ready') return;
    if (needsFullCompute) computeAll(tickers, market);
    else if (pageTickers.length) computePage(pageTickers, market);
  }, [listState, needsFullCompute, pageTickers, tickers, market, computeAll, computePage]);

  // 검색어·필터가 바뀌면 첫 페이지로 — 값이 바뀌는 지점에서 함께 처리한다.
  // effect로 되돌리면 옛 페이지가 한 번 렌더된 뒤 되감기는 연쇄 렌더가 생긴다.
  const changeQuery = useCallback((v: string) => { setQuery(v); setPage(1); }, []);
  const toggleHitOnly = useCallback(() => { setHitOnly(v => !v); setPage(1); }, []);

  // 최신 값을 즉시 읽기 위한 ref (stale closure/레이스 방지).
  // 렌더 중에 쓰면 안 되므로 커밋 후에 갱신한다. 이 ref들은 타이머 콜백에서만
  // 읽히고 렌더 경로에서는 읽히지 않으므로 한 박자 늦게 갱신돼도 안전하다.
  const marketRef = useRef(market);
  const fullComputeRef = useRef(false);
  useEffect(() => { marketRef.current = market; }, [market]);
  useEffect(() => { fullComputeRef.current = fullCompute.active; }, [fullCompute.active]);

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
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-700 dark:text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Signal Board</span>
        </div>
      </header>

      {/* 모든 블록이 같은 폭을 공유한다. 화면 끝까지 붙이지 않도록 상한과 좌우 여백을 둔다.
          단, 본문 문단만 읽기 좋은 줄길이(max-w-[95ch])로 제한한다 — 폭이 아니라 타이포그래피 문제다. */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*
          가입 배너. 예전에는 이 자리에 카드 마크업이 통째로 박혀 있었고 푸터에는
          별도의 작은 텍스트 링크가 있었다 — 금액이 양쪽에 하드코딩돼 있어서 한쪽만
          고치면 두 화면이 다른 금액을 말하게 되는 구조였다. 공용 컴포넌트로 합쳤다.
        */}
        <div className="mb-6">
          <ReferralCards lang="en" heading="New-user bonuses" />
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📈</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1.5">Crypto Signal Board</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Consensus of 4 strategies (Trend · Bollinger · RSI · ATR) → direction, entry / TP / SL, live P&amp;L, and 3D–3Y price projections</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1.5">🕛 All times in UTC · strategy resets in <span className="text-amber-500/80 font-semibold tabular-nums">{resetIn}</span> (00:00 UTC)</p>
        </div>

        {/* Market summary strip + highlight cards */}
        {listState === 'ready' && stats && (
          <>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 px-1 text-xs">
              {stats.btc && (
                <span className="flex items-center gap-2">
                  <span className="text-slate-500 dark:text-slate-400">BTC</span>
                  <span className="font-black text-slate-900 dark:text-white tabular-nums">{formatPrice(stats.btc.lastPrice)}</span>
                  <Pct value={stats.btc.priceChangePercent} />
                  {btcSpark.length > 1 && <Sparkline points={[...btcSpark, stats.btc.lastPrice]} w={54} h={18} />}
                </span>
              )}
              <span className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">24h volume</span>
                <span className="font-black text-slate-900 dark:text-white tabular-nums">{formatVolume(stats.totalVol)}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Advancing</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{stats.up}</span>
                <span className="text-slate-700 dark:text-slate-200">/</span>
                <span className="font-black text-rose-600 dark:text-rose-400 tabular-nums">{stats.down}</span>
                <span className="inline-flex h-1.5 w-24 gap-[2px]" role="img" aria-label={`${stats.up} advancing, ${stats.down} declining`}>
                  <span className="bg-emerald-500 rounded-full" style={{ width: `${stats.upShare}%` }} />
                  <span className="bg-rose-500 rounded-full" style={{ width: `${100 - stats.upShare}%` }} />
                </span>
              </span>
              <span className="text-slate-400 dark:text-slate-500">{tickers.length} USDT pairs</span>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-5">
              {([
                { key: 'trending', icon: '🔥', title: 'Trending', hint: 'Most traded', rows: stats.trending,
                  value: (t: Ticker24h) => formatVolume(t.quoteVolume), cls: 'text-slate-700 dark:text-slate-200',
                  cta: 'Sort by volume', sort: 'volume' as SortKey },
                { key: 'gainers', icon: '📈', title: 'Gainers', hint: 'Best 24h change', rows: stats.gainers,
                  value: (t: Ticker24h) => `${t.priceChangePercent >= 0 ? '+' : ''}${t.priceChangePercent.toFixed(2)}%`,
                  cls: 'text-emerald-600 dark:text-emerald-400', cta: 'Sort by 24h change', sort: 'chg24h' as SortKey },
                { key: 'volatile', icon: '⚡', title: 'Most volatile', hint: 'Widest 24h range', rows: stats.volatile,
                  value: (t: Ticker24h) => `${t.rangePct.toFixed(1)}%`, cls: 'text-amber-600 dark:text-amber-400',
                  cta: 'Sort by 24h range', sort: 'range24h' as SortKey },
              ]).map(card => (
                <div key={card.key} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                      <span aria-hidden="true">{card.icon}</span>{card.title}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{card.hint}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    {card.rows.map((t, i) => {
                      const meta = coinByBase(t.base);
                      const inner = (
                        <>
                          <span className="text-slate-400 dark:text-slate-500 text-xs tabular-nums w-3 shrink-0">{i + 1}</span>
                          <CoinLogo base={t.base} size={20} />
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{t.base}</span>
                          {meta && meta.name !== meta.base && <span className="text-slate-500 dark:text-slate-400 text-xs truncate">{meta.name}</span>}
                          <span className={`ml-auto text-sm font-bold tabular-nums ${card.cls}`}>{card.value(t)}</span>
                        </>
                      );
                      return meta ? (
                        <Link key={t.symbol} href={`/crypto/${meta.slug}/price-prediction`} className="flex items-center gap-2 rounded-lg px-1 py-0.5 hover:bg-slate-800/60 transition-colors">{inner}</Link>
                      ) : (
                        <div key={t.symbol} className="flex items-center gap-2 px-1 py-0.5">{inner}</div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => { setSortKey(card.sort); setSortDir('desc'); setPage(1); }}
                    className="mt-3 w-full text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:text-amber-400 hover:border-slate-600 py-2 transition-colors"
                  >
                    {card.cta}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1">
            {(['spot', 'futures'] as Market[]).map(m => (
              <button key={m} onClick={() => setMarket(m)}
                className={`px-5 py-1.5 text-sm font-bold rounded-lg transition-colors ${market === m ? 'bg-amber-500 text-slate-950' : 'text-slate-500 dark:text-slate-400 hover:text-slate-200'}`}>
                {m === 'spot' ? 'SPOT' : 'FUTURES'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => selectSort('signal')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${sortKey === 'signal' ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-200'}`}>
              Sort by signal{sortKey === 'signal' && <span className="ml-1">{sortDir === 'desc' ? '▼' : '▲'}</span>}
            </button>
            <button onClick={toggleHitOnly}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${hitOnly ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-200'}`}>
              🎯 TP/SL hit
            </button>
            <button onClick={() => loadList(market)} className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-amber-400 transition-colors">↻ Refresh</button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm pointer-events-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => changeQuery(e.target.value.replace(/\s/g, ''))}
            placeholder="Search coin (e.g. BTC, SOL, PEPE)"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:border-amber-500/60 transition"
          />
          {query && (
            <button onClick={() => changeQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">✕</button>
          )}
        </div>

        {(listState === 'loading' || listState === 'empty' || listState === 'error') && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-20 flex flex-col items-center gap-3">
            {listState === 'loading' ? (
              <>
                <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading market data...</span>
              </>
            ) : listState === 'error' ? (
              <>
                <span className="text-3xl">⚠️</span>
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load prices</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Binance may be restricted in your region</span>
                <button onClick={() => loadList(market)} className="mt-2 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl px-4 py-2 transition-colors">Retry</button>
              </>
            ) : (
              <><span className="text-3xl">🛠️</span><span className="text-sm font-bold text-slate-700 dark:text-slate-200">No data</span></>
            )}
          </div>
        )}

        {/* Full-compute progress (P&L sort) */}
        {listState === 'ready' && fullCompute.active && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-16 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Calculating signals for all coins…</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">{fullCompute.done} / {fullCompute.total}</span>
            <div className="w-48 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${fullCompute.total ? (fullCompute.done / fullCompute.total) * 100 : 0}%` }} />
            </div>
          </div>
        )}

        {listState === 'ready' && !fullCompute.active && (
          <>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm whitespace-nowrap">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                      <th className="sticky left-0 z-20 bg-white dark:bg-slate-900 text-left font-semibold px-4 py-3">Coin</th>
                      <th className={`${th} hidden lg:table-cell`}>Entry</th>
                      <th className={`${th} hidden md:table-cell`}>
                        ATR target
                        <span className="block text-[9px] font-normal text-slate-400 dark:text-slate-500 normal-case tracking-normal">entry + 1.5×ATR · not a forecast</span>
                      </th>
                      <th className={th}>Current</th>
                      <th className={th}>
                        <button onClick={() => selectSort('chg24h')} className={`uppercase tracking-wide inline-flex items-center hover:text-slate-700 dark:hover:text-slate-300 transition-colors ${sortKey === 'chg24h' ? 'text-amber-600 dark:text-amber-400' : ''}`}>
                          24H <SortHint active={sortKey === 'chg24h'} dir={sortDir} />
                        </button>
                      </th>
                      <th className="hidden sm:table-cell text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                        Scenarios
                        <span className="block text-[9px] font-normal text-slate-400 dark:text-slate-500 normal-case tracking-normal">30d simulated paths</span>
                      </th>
                      {BOARD_HORIZONS.map((h, hi) => (
                        <th key={h.key} className={`${th} ${HORIZON_VIS[h.key] ?? ''} ${hi === 0 ? 'border-l border-slate-200/70 dark:border-slate-700/70' : ''}`}>
                          {h.short}
                          <span className="block text-[9px] font-normal text-amber-600 dark:text-amber-400/70 normal-case tracking-normal">peak</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageTickers.map((t, i) => {
                      const info = cache.get(t.symbol);
                      const pending = info === undefined;
                      const c = info?.c ?? null;
                      const f = info?.f ?? null;

                      const tpPct = c ? pnlOf(c.side, c.entry, c.tp) : null;
                      const hit = c ? hitState(c, t.lastPrice) : null;
                      const chg = t.priceChangePercent;

                      // 새 상장 코인은 스냅샷 목록에 없을 수 있다 — 그때는 링크하지 않는다.
                      const meta = coinByBase(t.base);
                      // 자동 새로고침으로 현재가가 바뀌어도 구간이 따라가도록 계산 시점 spot 대비 비율로 재조정
                      const fcScale = f ? t.lastPrice / f.spot : 1;
                      // 코인 티커로 시드를 고정해 리렌더마다 경로가 바뀌지 않게 한다
                      const pathSeed = [...t.base].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);
                      const miniPaths = f ? simulatePaths(f, DAILY_PATH_DAYS, 4, pathSeed).map(p => p.map(v => v * fcScale)) : [];

                      const coinInner = (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 dark:text-slate-500 text-xs tabular-nums w-5 shrink-0">{(page - 1) * PER_PAGE + i + 1}</span>
                            <CoinLogo base={t.base} />
                            <span className={`font-bold text-slate-900 dark:text-white ${meta ? 'group-hover:text-amber-400 transition-colors' : ''}`}>{t.base}</span>
                            {c && market === 'futures' && (
                              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${c.side === 'long' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-700 dark:text-rose-400'}`}>
                                {c.side === 'long' ? 'LONG' : 'SHORT'}
                              </span>
                            )}
                          </div>
                          {c ? (
                            <span className="flex items-center gap-1.5 pl-7 mt-0.5">
                              <span className={`inline-flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded ${BIAS_STYLE[c.bias].cls}`}>
                                {BIAS_STYLE[c.bias].emoji} {BIAS_STYLE[c.bias].label}
                                {c.bias !== 'neutral' && <span className="opacity-80">{c.confidence}%</span>}
                              </span>
                              <span className="flex gap-1">
                                {c.votes.map(v => (
                                  <span key={v.key} title={`${STRATEGY_META[v.key].label}: ${v.note}`} className={`text-[10px] font-bold ${VOTE_CLR[v.bias]}`}>
                                    {STRATEGY_META[v.key].short}{v.bias === 'bullish' ? '↑' : v.bias === 'bearish' ? '↓' : '·'}
                                  </span>
                                ))}
                              </span>
                            </span>
                          ) : (
                            <span className="block pl-7 text-[11px] text-slate-500 dark:text-slate-400">{pending ? 'calculating…' : 'no data'}</span>
                          )}
                        </>
                      );

                      return (
                        <tr key={t.symbol} className="group border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                          {/* 가로 스크롤 시 코인명이 고정되도록 sticky. 배경이 불투명해야 아래 셀이 비치지 않는다 */}
                          <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-0 border-b border-slate-200/50 dark:border-slate-700/50">
                            {meta ? (
                              <Link href={`/crypto/${meta.slug}/price-prediction`} className="block px-4 py-3 group-hover:bg-slate-800/40 transition-colors">
                                {coinInner}
                              </Link>
                            ) : (
                              <div className="px-4 py-3 group-hover:bg-slate-800/40 transition-colors">{coinInner}</div>
                            )}
                          </td>

                          <td className="hidden lg:table-cell px-2 py-3 text-right text-slate-700 dark:text-slate-200 tabular-nums">{c ? formatPrice(c.entry) : pending ? '…' : '-'}</td>

                          <td className="hidden md:table-cell px-2 py-3 text-right tabular-nums">
                            {c ? (
                              <div className="flex flex-col items-end leading-tight">
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatPrice(c.tp)}</span>
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400/60">+{tpPct!.toFixed(1)}%</span>
                                {hit && (
                                  <span className={`mt-0.5 text-[9px] font-black px-1 py-0.5 rounded ${hit === 'tp' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                                    {hit === 'tp' ? '🎯 hit' : '🛑 stopped'}
                                  </span>
                                )}
                              </div>
                            ) : <span className="text-slate-400 dark:text-slate-500">{pending ? '…' : '-'}</span>}
                          </td>

                          <td className="px-2 py-3 text-right tabular-nums text-slate-900 dark:text-white">{formatPrice(t.lastPrice)}</td>

                          <td className="px-2 py-3 text-right tabular-nums">
                            {isFinite(chg) ? <Pct value={chg} bold /> : <span className="text-slate-400 dark:text-slate-500">-</span>}
                          </td>

                          <td className="hidden sm:table-cell px-3 py-3 text-right border-l border-slate-200/40 dark:border-slate-700/40">
                            {miniPaths.length ? (
                              <MiniPaths paths={miniPaths} spot={t.lastPrice} w={116} h={30} />
                            ) : (
                              <span className="text-slate-700 dark:text-slate-200">{pending ? '…' : '-'}</span>
                            )}
                          </td>

                          {BOARD_HORIZONS.map((h, hi) => {
                            const p = f?.projections.find(x => x.key === h.key);
                            return (
                              <td key={h.key} className={`px-2 py-3 text-right ${HORIZON_VIS[h.key] ?? ''} ${hi === 0 ? 'border-l border-slate-200/40 dark:border-slate-700/40' : ''}`}>
                                {p ? (
                                  <div className="flex flex-col items-end leading-tight">
                                    <span className="text-slate-900 dark:text-white font-bold tabular-nums">{formatPrice(p.peak * fcScale)}</span>
                                    <span className="text-[10px] text-amber-600 dark:text-amber-400/80 tabular-nums">+{p.peakPct.toFixed(1)}%</span>
                                  </div>
                                ) : pending ? (
                                  <span className="text-slate-400 dark:text-slate-500 text-xs">…</span>
                                ) : info && info.days > 0 ? (
                                  <span className="text-slate-400 dark:text-slate-500 text-[10px]" title={`Needs ${MIN_SAMPLES + 1} daily closes, has ${info.days}`}>new · {info.days}d</span>
                                ) : (
                                  <span className="text-slate-400 dark:text-slate-500 text-xs">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    {pageTickers.length === 0 && (
                      <tr>
                        <td colSpan={6 + BOARD_HORIZONS.length} className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                          {hitOnly ? 'No coins have hit TP or SL yet' : `No coins match "${query}"`}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Votes: <b className="text-slate-500 dark:text-slate-400">T</b> Trend · <b className="text-slate-500 dark:text-slate-400">B</b> Bollinger · <b className="text-slate-500 dark:text-slate-400">R</b> RSI · <b className="text-slate-500 dark:text-slate-400">A</b> ATR <span className="text-slate-400 dark:text-slate-500">(↑ bullish · ↓ bearish · · neutral)</span></span>
                {updatedLabel && <span>🕒 {updatedLabel}</span>}
              </div>
              <div className="px-4 pb-3 text-[11px] text-slate-400 dark:text-slate-500">
                {market === 'spot' ? 'Spot' : 'Futures'} · {query ? `${sortedTickers.length} / ` : ''}{tickers.length} coins ·{' '}
                sorted by <b className="text-slate-500 dark:text-slate-400">{SORT_LABEL[sortKey]}</b> · TP {TP_MULT}×ATR · SL {SL_MULT}×ATR ·{' '}
<b className="text-slate-500 dark:text-slate-400">ATR target</b> is a trade level (entry + {TP_MULT}×ATR), <b className="text-slate-500 dark:text-slate-400">not a forecast</b> — backtested over 8,552 setups it was reached the next day only 4.6% of the time · <b className="text-slate-500 dark:text-slate-400">1W–3Y</b> are the forecast: the typical peak, the price each coin touches at some point half the time. These match the coin page exactly.{pageComputing ? ' · calculating…' : ''}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">« First</button>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">‹ Prev</button>
              <span className="px-3 text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums">{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">Next ›</button>
              <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">Last »</button>
            </div>
          </>
        )}

        <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[95ch]">
          <p className="font-bold text-amber-700 dark:text-amber-300/90 mb-1">How the 3D–3Y forecast is built</p>
          <p className="mb-2">
            <b className="text-amber-700 dark:text-amber-300/90">Each 3D–3Y cell is the typical peak</b> — the price the coin touches at some point within that window in
            <b className="text-slate-700 dark:text-slate-200"> half of all simulated paths</b>. It is not where the price ends; the median endpoint barely moves at short horizons
            because the drift is only about 9% of the noise over three days. We show the peak because it is the number that genuinely differs between coins and
            is calibrated: the barrier correction was fitted so the touch probability really is 50%, and checked on BTC, SOL and DOGE with a seed different from
            the one used to fit it (measured 48.2–50.1%). At short horizons it also matches what a coin historically did — Bitcoin&apos;s modelled 3-day peak
            lands within 0.4% of its historical median 3-day peak. <b className="text-slate-700 dark:text-slate-200">Scenarios</b> shows four sampled 30-day paths from the same model — real samples, not forecasts.
          </p>
          <p>
            A coin&apos;s trend is split into a
            market component (its beta to BTC) and a coin-specific alpha, each shrunk toward zero as a Bayesian posterior mean. The market trend is extrapolated
            assertively, which costs about 2.6% in measured one-year accuracy versus assuming no change and makes most coins point the same way as Bitcoin; coins
            with under two years of history fall back to a conservative prior. No technical tilt is applied — we implemented the moving-average + RSI + MACD method
            other prediction sites describe and measured its 5-day directional accuracy at 49.4%, a coin flip (MACD alone: 49.5%).
          </p>
          <p className="mt-2">
            Over three days the drift is only about 9% of the noise, so the forecast barely moves even though the price still swings roughly one ATR — that swing
            lives in the range, not in the forecast. Click a coin for its <b className="text-slate-700 dark:text-slate-200">typical peak</b> (the level it touches at some point in half
            of all paths), the ranges, and the probability of reaching any target.
          </p>
        </div>

        <Faq items={SECTION_FAQ['crypto/signals']} className="mt-8" />

        <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 p-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[95ch]">
          <p className="mb-1">⚠️ Not investment advice — reference calculations only. All trading decisions and risks are your own.</p>
          <p className="mb-1">Signal = consensus of 4 strategies (Trend = SMA 20/50, Bollinger = %B, RSI = 14, ATR = SMA20 trend); confidence % is the share voting the same direction. Entry is the last closed daily candle; the trade target = entry + {TP_MULT}×ATR in the signal direction — over 8,552 historical setups it was reached the next day 4.6% of the time and within five days 23.2%, while the stop was hit first 42.1% of the time. The stop-loss ({SL_MULT}×ATR), live P&amp;L and target-hit history are on each coin&apos;s page. Spot is buy-only (long); LONG/SHORT applies to futures only.</p>
          <p>Projections (3D–3Y) fit a geometric Brownian motion to {FORECAST_DAYS} days of log returns. The trend is split into a market component (beta to BTC) and a coin-specific alpha, each shrunk toward zero as a Bayesian posterior mean; no technical tilt is applied. Coins with under two years of history use a conservative prior, and the drift is capped at ±0.5 in annual log terms. Ranges use a fat-tailed Student-t whose degrees of freedom rise with the horizon, and each horizon uses its own measured blend of current and long-run volatility.</p>
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">🔄 Refresh to recalculate with the latest prices · Binance public market data</p>
      </div>
    </div>
  );
}
