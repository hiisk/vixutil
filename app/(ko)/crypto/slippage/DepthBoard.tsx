'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchDepth } from '@/lib/binance';
import {
  bestBidAsk, midPrice, spreadBps, fillMarketOrder,
  depthWithin, imbalance, costToMove, slippageLabel,
  ORDER_SIZES, DEPTH_BANDS, type Book,
} from '@/lib/orderbook';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

const SUGGEST_LIMIT = 8;
/** 참고선 — 대부분 거래소의 시장가 수수료가 이 근처다 */
const TAKER_FEE_BPS = 10;

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  book: Book;
  mid: number;
  spread: number;
  levels: { bids: number; asks: number };
  fetchedAt: number;
}

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';

const money = (v: number) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
};
const px = (v: number) => v.toLocaleString(undefined, { maximumFractionDigits: v >= 100 ? 2 : 6 });

/**
 * bp 표기 — 폭이 넓다. BTC 스프레드는 0.0016bp고 얇은 코인은 500bp가 넘는다.
 * 두 자리로 고정하면 앞쪽이 전부 "0.00"으로 뭉개져 페이지의 요점이 사라진다.
 */
function fmtBps(v: number): string {
  if (!isFinite(v)) return '—';
  if (v === 0) return '0';
  if (v < 0.01) return v.toFixed(4);
  if (v < 1) return v.toFixed(3);
  if (v < 10) return v.toFixed(2);
  return v.toFixed(0);
}

function bpsTone(bps: number): string {
  if (bps >= 200) return 'text-rose-600 dark:text-rose-400 font-black';
  if (bps >= 50) return 'text-orange-600 dark:text-orange-400 font-bold';
  if (bps >= TAKER_FEE_BPS) return 'text-amber-600 dark:text-amber-400 font-bold';
  return 'text-emerald-600 dark:text-emerald-400';
}

export default function DepthBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const book = await fetchDepth(symbolOf(coin), marketOf(coin));
      if (!book) { setState('nodata'); return; }
      const mid = midPrice(book);
      const sp = spreadBps(book);
      if (mid == null || sp == null) { setState('nodata'); return; }
      setSnap({
        coin, book, mid, spread: sp,
        levels: { bids: book.bids.length, asks: book.asks.length },
        fetchedAt: Date.now(),
      });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  // 호가창은 실시간이라 프리렌더 시점에 없다. 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base.startsWith(q) || c.name.toUpperCase().includes(q)).slice(0, SUGGEST_LIMIT);
  }, [query]);

  const fills = useMemo(() => {
    if (!snap) return [];
    return ORDER_SIZES.map(size => ({ size, fill: fillMarketOrder(snap.book, side, size) }));
  }, [snap, side]);

  const bands = useMemo(() => {
    if (!snap) return [];
    return DEPTH_BANDS.map(pct => {
      const d = depthWithin(snap.book, pct);
      return {
        pct,
        ...d,
        imb: d ? imbalance(d.bidValue, d.askValue) : null,
        upCost: costToMove(snap.book, 'buy', pct),
        downCost: costToMove(snap.book, 'sell', pct),
      };
    });
  }, [snap]);

  const bb = snap ? bestBidAsk(snap.book) : null;
  /** 수수료보다 슬리피지가 커지는 첫 주문 크기 */
  const crossover = fills.find(f => f.fill && f.fill.slippageBps > TAKER_FEE_BPS)?.size ?? null;
  /** 표의 가장 큰 주문이 어느 정도인지 한 마디로 */
  const biggest = fills[fills.length - 1]?.fill ?? null;

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="sl-coin">Coin</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input id="sl-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder={`${coin.base} · search another coin`} className={inputCls} autoComplete="off" />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                {suggestions.map(c => (
                  <li key={c.slug}>
                    <button type="button" onClick={() => pickCoin(c)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <CoinLogo base={c.base} size={18} />
                      <span className="font-bold text-slate-800 dark:text-slate-100">{c.base}</span>
                      <span className="text-slate-500 dark:text-slate-400 truncate">{c.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {state === 'ready' && snap && bb && (
            <div className="flex items-center gap-2.5">
              <CoinLogo base={snap.coin.base} size={28} />
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight tabular-nums">
                  {px(snap.mid)}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                  {snap.levels.bids + snap.levels.asks} levels · {marketOf(snap.coin)}
                </p>
              </div>
              <button type="button" onClick={load}
                className="ml-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Refresh
              </button>
            </div>
          )}
          {state === 'loading' && <span role="status" className="text-xs font-bold text-slate-500 dark:text-slate-400">Reading the order book…</span>}
          {(state === 'error' || state === 'nodata') && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">{state === 'nodata' ? 'No order book' : 'Couldn’t load the book'}</span>
              <button type="button" onClick={load} className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Retry</button>
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Order side</span>
          <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
            {(['buy', 'sell'] as const).map(s => (
              <button key={s} type="button" aria-pressed={side === s} onClick={() => setSide(s)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors capitalize ${
                  side === s
                    ? s === 'buy' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}>
                Market {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {snap && bb ? (
        <>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {([
              ['Best bid', px(bb.bid), 'text-emerald-600 dark:text-emerald-400'],
              ['Best ask', px(bb.ask), 'text-rose-600 dark:text-rose-400'],
              ['Spread', `${fmtBps(snap.spread)} bp`, bpsTone(snap.spread)],
            ] as const).map(([label, v, cls]) => (
              <div key={label} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
                <p className={`text-xl font-black tabular-nums ${cls}`}>{v}</p>
              </div>
            ))}
          </div>

          {/* 본론 — 주문 크기별 슬리피지 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-black text-slate-900 dark:text-white">
                What a market {side} costs, by size
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Walking the live book. A typical taker fee is about {TAKER_FEE_BPS} bp — compare each row against that.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Order size</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Avg fill</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Levels eaten</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Slippage</th>
                  </tr>
                </thead>
                <tbody>
                  {fills.map(({ size, fill }) => (
                    <tr key={size} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                      <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                        {money(size)}
                        {fill?.exhausted && (
                          <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                            book runs out
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
                        {fill ? px(fill.avgPrice) : '—'}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400">
                        {fill ? fill.levels.toLocaleString() : '—'}
                      </td>
                      <td className={`px-4 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${fill ? bpsTone(fill.slippageBps) : ''}`}>
                        {fill ? `${fmtBps(fill.slippageBps)} bp` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {crossover != null ? (
                <>
                  On {snap.coin.base} right now, slippage overtakes the taker fee somewhere above{' '}
                  <b className="tabular-nums">{money(crossover)}</b>. Below that the fee is what you are paying; above it the fee is a
                  rounding error and the book is. People compare exchange fee schedules to the second decimal and never check this column,
                  which on a thin pair can be an order of magnitude larger — and it is charged again on the way out.
                  {biggest && (
                    <> At {money(ORDER_SIZES[ORDER_SIZES.length - 1])} the slippage is{' '}
                    <b>{slippageLabel(biggest.slippageBps)}</b>.</>
                  )}
                </>
              ) : (
                <>
                  Every size in this table slips less than the {TAKER_FEE_BPS} bp taker fee, so on {snap.coin.base} the fee is genuinely the
                  cost of trading. That is a property of this book at this moment, not of the pair — check again when the market is moving.
                </>
              )}
            </div>
          </div>

          {/* 깊이 밴드 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-black text-slate-900 dark:text-white">How much money sits near the price</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Resting orders within each band of the mid, and what it would take to push through it.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Band</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Bids</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Asks</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Lean</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">Cost to move up</th>
                  </tr>
                </thead>
                <tbody>
                  {bands.map(b => (
                    <tr key={b.pct} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                      <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200 tabular-nums">±{b.pct}%</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                        {b.bidValue != null ? money(b.bidValue) : '—'}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-rose-600 dark:text-rose-400">
                        {b.askValue != null ? money(b.askValue) : '—'}
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${
                        b.imb == null ? 'text-slate-400 dark:text-slate-500'
                          : b.imb > 0.1 ? 'text-emerald-600 dark:text-emerald-400'
                          : b.imb < -0.1 ? 'text-rose-600 dark:text-rose-400'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {b.imb == null ? '—'
                          : Math.abs(b.imb) < 0.1 ? 'balanced'
                          : `${b.imb > 0 ? 'bids' : 'asks'} +${(Math.abs(b.imb) * 100).toFixed(0)}%`}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
                        {b.upCost != null ? money(b.upCost) : 'beyond book'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Read the lean column as which side is easier to push, not as a prediction. A thin ask side means buying moves the price
              further for the same money — it does not mean the price is about to rise. Resting orders are cancellable and frequently
              cancelled, so a wall that looks solid can vanish precisely when someone tries to trade through it.
            </div>
          </div>
        </>
      ) : state === 'loading' ? (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Reading the live order book…
        </div>
      ) : null}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">This is a snapshot, and it flatters you</h2>
        <p className="mb-2">
          The figures come from a single order-book snapshot taken when the page loaded, and they assume every resting order stays put while
          your order consumes it. Neither holds in practice. Market makers pull quotes when they see size arriving, so a large order often
          fills worse than this table suggests — the numbers here are closer to a floor than a forecast.
        </p>
        <p className="mb-2">
          The book also cannot show hidden and iceberg liquidity, which works the other way and can make large fills better than modelled.
          Both effects grow with order size, so treat the small rows as reliable and the large ones as indicative. Splitting an order across
          time is the standard response to everything on this page.
        </p>
        <p>
          Slippage is measured against the best available price rather than the mid, so it excludes the spread you cross when taking. Add the
          spread figure above to get the full round-trip cost of entering and exiting immediately, and add the taker fee twice on top.
        </p>
      </div>

      <div className="text-center mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        <Link href="/crypto/volatility" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          Which pairs move enough to matter →
        </Link>
        <Link href="/crypto/profit-calculator" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          Add fees to the round trip →
        </Link>
      </div>
    </>
  );
}
