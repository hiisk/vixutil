'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice, computeATR } from '@/lib/atr';
import { fetchTicker, fetchDailyOHLCV, fetchDailyCandles } from '@/lib/binance';
import { buildForecast, volatilityLabel, type ForecastModel } from '@/lib/forecast';
import { simulateBarriers, probEverAbove, probEverBelow } from '@/lib/barriers';
import { computePosition, breakevenWinRate, RISK_PRESETS, type Side } from '@/lib/position';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo, Pct } from '@/components/crypto/ui';

/** 변동성 추정에 쓸 일수 */
const HISTORY_DAYS = 998;
/** 손절 도달 확률을 재는 시점 (일) */
const CHECKPOINTS = [7, 30, 90];
const CHECKPOINT_LABELS = ['7 days', '30 days', '90 days'];
const SUGGEST_LIMIT = 8;

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  price: number;
  chg24h: number;
  model: ForecastModel;
  /** 일간 ATR(14) — 손절폭을 변동성 단위로 읽게 해준다 */
  atr: number | null;
}

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';
const labelCls = 'dial-k mb-1 block';

function riskTone(pct: number): string {
  if (!isFinite(pct)) return 'text-slate-400 dark:text-slate-500';
  if (pct >= 60) return 'text-rose-600 dark:text-rose-400';
  if (pct >= 35) return 'text-orange-600 dark:text-orange-400';
  if (pct >= 15) return 'text-amber-600 dark:text-amber-400';
  return 'text-emerald-600 dark:text-emerald-400';
}

export default function PositionSizer() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');

  const [side, setSide] = useState<Side>('long');
  const [account, setAccount] = useState('10000');
  const [riskPct, setRiskPct] = useState('1');
  const [entry, setEntry] = useState('');
  const [stop, setStop] = useState('');
  const [target, setTarget] = useState('');
  const [leverage, setLeverage] = useState('10');
  const [touched, setTouched] = useState(false);

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const market = marketOf(coin);
      const [t, ohlcv, btc] = await Promise.all([
        fetchTicker(symbolOf(coin), market),
        fetchDailyOHLCV(symbolOf(coin), HISTORY_DAYS, market),
        fetchDailyCandles('BTCUSDT', HISTORY_DAYS, market).catch(() => []),
      ]);
      if (!t || ohlcv.length < 2) { setState('nodata'); return; }
      const model = buildForecast(ohlcv.map(k => k.close), t.lastPrice, btc.length ? btc.map(k => k.close) : undefined);
      if (!model) { setState('nodata'); return; }
      const atr = computeATR(ohlcv.map(k => ({ high: k.high, low: k.low, close: k.close })), 14);
      setSnap({ coin, price: t.lastPrice, chg24h: t.priceChangePercent, model, atr });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  /**
   * 진입가·손절가는 기본적으로 현재 시세에서 출발한다(손절은 ATR 1.5배).
   * 사용자가 한 번 만지면 그 값을 유지한다. 이펙트로 되돌리지 않고 파생값으로 둔다.
   */
  const auto = useMemo(() => {
    if (!snap) return null;
    const dist = (snap.atr ?? snap.price * 0.03) * 1.5;
    return {
      entry: String(snap.price),
      stop: String(Number((side === 'long' ? snap.price - dist : snap.price + dist).toPrecision(8))),
    };
  }, [snap, side]);

  const entryValue = touched || !auto ? entry : auto.entry;
  const stopValue = touched || !auto ? stop : auto.stop;

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base.startsWith(q) || c.name.toUpperCase().includes(q)).slice(0, SUGGEST_LIMIT);
  }, [query]);

  const pos = useMemo(
    () => computePosition({
      account: Number(account),
      riskPct: Number(riskPct),
      entry: Number(entryValue),
      stop: Number(stopValue),
      side,
      target: target ? Number(target) : undefined,
      leverage: Number(leverage),
    }),
    [account, riskPct, entryValue, stopValue, side, target, leverage],
  );

  const barriers = useMemo(() => (snap ? simulateBarriers(snap.model, CHECKPOINTS, 4000, 5309) : null), [snap]);

  /**
   * 손절이 그냥 변동성만으로 스칠 확률. 사이즈 계산은 "걸리면 얼마 잃는가"만 답하고
   * "걸릴 확률"은 답하지 않는데, 실제로는 그게 절반의 문제다.
   */
  const stopProbs = useMemo(() => {
    if (!barriers || !pos || !snap) return null;
    const s = Number(stopValue);
    if (!(s > 0)) return null;
    return CHECKPOINTS.map((_, i) =>
      side === 'long' ? probEverBelow(barriers, i, s) : probEverAbove(barriers, i, s),
    );
  }, [barriers, pos, snap, stopValue, side]);

  const atrMultiple = useMemo(() => {
    if (!snap?.atr || !pos) return null;
    return pos.stopDistance / snap.atr;
  }, [snap, pos]);

  const bewr = pos?.rMultiple != null ? breakevenWinRate(pos.rMultiple) : null;

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); setTouched(false); }

  return (
    <>
      {/* 코인 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <label className={labelCls} htmlFor="ps-coin">Coin</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input id="ps-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder={`${coin.base} · search another coin`} className={inputCls} autoComplete="off" />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                {suggestions.map(c => (
                  <li key={c.slug}>
                    <button type="button" onClick={() => pickCoin(c)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors">
                      <CoinLogo base={c.base} size={18} />
                      <span className="font-bold text-slate-800 dark:text-slate-100">{c.base}</span>
                      <span className="text-slate-500 dark:text-slate-400 truncate">{c.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {state === 'ready' && snap && (
            <div className="flex items-center gap-2.5">
              <CoinLogo base={snap.coin.base} size={28} />
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums leading-tight">${formatPrice(snap.price)}</p>
                <p className="text-[11px]"><Pct value={snap.chg24h} /> <span className="text-slate-500 dark:text-slate-400">24h</span></p>
              </div>
            </div>
          )}
          {state === 'loading' && <span role="status" className="text-xs font-medium text-slate-500 dark:text-slate-400">Loading price…</span>}
          {(state === 'error' || state === 'nodata') && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">{state === 'nodata' ? 'Not enough history' : 'Couldn’t load price'}</span>
              <button type="button" onClick={load} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">Retry</button>
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          Sizing works without live data. The price feed fills in a starting entry and stop, and powers the probabilities below.
        </p>
      </div>

      {/* 입력 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <span className={labelCls}>Direction</span>
            <div className="flex gap-2" role="group" aria-label="Position direction">
              {([['long', 'Long (buy)'], ['short', 'Short (sell)']] as [Side, string][]).map(([d, label]) => (
                <button key={d} type="button" aria-pressed={side === d} onClick={() => { setSide(d); setTouched(false); }}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-colors ${
                    side === d
                      ? d === 'long' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="account">Account size (USDT)</label>
            <input id="account" type="number" inputMode="decimal" min={1} value={account}
              onChange={e => setAccount(e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className={labelCls} htmlFor="risk">Risk per trade (%)</label>
            <input id="risk" type="number" inputMode="decimal" step="0.1" min={0.1} max={100} value={riskPct}
              onChange={e => setRiskPct(e.target.value)} className={inputCls} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {RISK_PRESETS.map(v => (
                <button key={v} type="button" aria-pressed={Number(riskPct) === v} onClick={() => setRiskPct(String(v))}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                    Number(riskPct) === v
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}>
                  {v}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="ps-entry">Entry price</label>
            <input id="ps-entry" type="number" inputMode="decimal" value={entryValue}
              onChange={e => { setEntry(e.target.value); setStop(stopValue); setTouched(true); }} className={inputCls} />
          </div>

          <div>
            <label className={labelCls} htmlFor="ps-stop">Stop loss</label>
            <input id="ps-stop" type="number" inputMode="decimal" value={stopValue}
              onChange={e => { setStop(e.target.value); setEntry(entryValue); setTouched(true); }} className={inputCls} />
            {atrMultiple != null && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                {atrMultiple.toFixed(2)}× the daily ATR
              </p>
            )}
          </div>

          <div>
            <label className={labelCls} htmlFor="ps-target">Target price (optional)</label>
            <input id="ps-target" type="number" inputMode="decimal" value={target} placeholder="for R multiple"
              onChange={e => setTarget(e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className={labelCls} htmlFor="ps-lev">Leverage used</label>
            <input id="ps-lev" type="number" inputMode="decimal" min={1} value={leverage}
              onChange={e => setLeverage(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Changes margin required, not position size.</p>
          </div>
        </div>
      </div>

      {pos ? (
        <>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-amber-50 dark:bg-slate-900 p-6 mb-4">
            <p className="text-[11px] uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">Position size</p>
            <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
              <div>
                <p className="text-4xl font-bold text-slate-900 dark:text-white tabular-nums">{formatPrice(pos.quantity)}</p>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{coin.base}</p>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                <p>Notional <b className="tabular-nums">${formatPrice(pos.notional)}</b> · margin at {leverage}× <b className="tabular-nums">${formatPrice(pos.marginRequired)}</b></p>
                <p className="text-slate-500 dark:text-slate-400">
                  Stop is <b className="tabular-nums">{pos.stopDistancePct.toFixed(2)}%</b> away — losing it costs
                  {' '}<b className="tabular-nums text-rose-600 dark:text-rose-400">${formatPrice(pos.riskAmount)}</b>, exactly {riskPct}% of the account.
                </p>
              </div>
            </div>
            {pos.exceedsAccount && (
              <p className="note-warn mt-3">
                This notional exceeds your account, so it needs at least <b>{pos.leverageNeeded.toFixed(2)}×</b> leverage to hold.
                That is a consequence of the stop being tight, not of taking more risk — the loss at stop is unchanged.
              </p>
            )}
          </div>

          {/* 손절 도달 확률 — 사이즈 계산이 답하지 않는 절반 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">How likely is this stop to be hit anyway?</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sizing fixes what you lose if the stop is hit. It says nothing about how often that happens — which is the other half.
              </p>
            </div>
            {stopProbs && snap ? (
              <>
                <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700">
                  {stopProbs.map((p, i) => (
                    <div key={CHECKPOINTS[i]} className="p-4 text-center">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">within {CHECKPOINT_LABELS[i]}</p>
                      <p className={`text-2xl font-bold tabular-nums ${riskTone(p)}`}>{isFinite(p) ? `${p.toFixed(1)}%` : '—'}</p>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Sampled from 4,000 paths using {snap.coin.base}&apos;s measured volatility
                  ({snap.model.annualVolPct.toFixed(0)}% annualised, {volatilityLabel(snap.model.annualVolPct)}) — this is the chance ordinary
                  movement touches your stop, with <b className="text-slate-700 dark:text-slate-200">no view on direction at all</b>. A stop that a
                  coin&apos;s normal noise reaches most of the time is not protecting a thesis; it is just a slow way to pay the spread.
                  Widening it lowers this number, and the sizing above shrinks the position to keep your loss identical.
                </div>
              </>
            ) : (
              <div className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                {state === 'loading' ? 'Computing volatility…' : 'Couldn’t load market data, so the probability is unavailable.'}
              </div>
            )}
          </div>

          {/* R 배수 */}
          {pos.rMultiple != null && bewr != null && (
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Reward and the win rate it demands</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Reward</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">{pos.rMultiple.toFixed(2)}R</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Profit at target</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">${formatPrice(pos.targetProfit!)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Breakeven win rate</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">{bewr.toFixed(1)}%</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                At {pos.rMultiple.toFixed(2)}R you need to be right <b className="text-slate-700 dark:text-slate-200">{bewr.toFixed(1)}%</b> of the time
                just to break even, before fees. That threshold comes only from the ratio — it is 1/(R+1) — so improving reward relative to risk
                lowers the bar far more reliably than trying to be right more often.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {side === 'long'
            ? 'For a long, the stop must sit below the entry price.'
            : 'For a short, the stop must sit above the entry price.'}
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Leverage does not set your size</h2>
        <p className="mb-2">
          This is the most common confusion in position sizing. Your size comes from the distance to your stop and the amount you are
          willing to lose — nothing else. Leverage only changes how much margin is locked up to hold that same size. Doubling leverage
          with the stop unchanged does not double your risk; it halves the margin posted and leaves the loss at stop identical.
        </p>
        <p>
          Where leverage genuinely bites is liquidation. A position sized by risk can still be liquidated before its stop is reached if
          the leverage is high enough that the liquidation price sits inside the stop distance — at which point the stop never gets the
          chance to work. Fees and slippage are also excluded here and both make real losses slightly larger than the figure above.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/liquidation-calculator" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          Check whether leverage would liquidate you before the stop →
        </Link>
      </div>
    </>
  );
}
