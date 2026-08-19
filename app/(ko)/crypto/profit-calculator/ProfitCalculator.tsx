'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchTicker } from '@/lib/binance';
import { computeProfit, FEE_PRESETS, type Side } from '@/lib/profit';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo, Pct } from '@/components/crypto/ui';

const SUGGEST_LIMIT = 8;

type State = 'loading' | 'ready' | 'error';

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';
const labelCls = 'dial-k mb-1 block';

const money = (v: number) =>
  `${v < 0 ? '−' : ''}$${Math.abs(v).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const pnlCls = (v: number) => (v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400');

export default function ProfitCalculator() {
  const [state, setState] = useState<State>('loading');
  const [price, setPrice] = useState<number | null>(null);
  const [chg24h, setChg24h] = useState<number | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');

  const [side, setSide] = useState<Side>('long');
  const [entry, setEntry] = useState('');
  const [exit, setExit] = useState('');
  const [notional, setNotional] = useState('1000');
  const [feePct, setFeePct] = useState('0.1');
  const [leverage, setLeverage] = useState('1');
  const [touched, setTouched] = useState(false);

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const t = await fetchTicker(symbolOf(coin), marketOf(coin));
      if (!t) { setState('error'); return; }
      setPrice(t.lastPrice);
      setChg24h(t.priceChangePercent);
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  /** 진입·청산가는 시세에서 출발하고, 한 번 만지면 그대로 둔다 */
  const entryValue = touched || price == null ? entry : String(price);
  const exitValue = touched || price == null ? exit : String(Number((price * 1.1).toPrecision(8)));

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base.startsWith(q) || c.name.toUpperCase().includes(q)).slice(0, SUGGEST_LIMIT);
  }, [query]);

  const r = useMemo(
    () => computeProfit({
      entry: Number(entryValue),
      exit: Number(exitValue),
      side,
      notional: Number(notional),
      feePct: Number(feePct),
      leverage: Number(leverage),
    }),
    [entryValue, exitValue, side, notional, feePct, leverage],
  );

  /** 수수료 전에는 이익인데 수수료 후에는 손실인 구간 — 사람들이 착각하는 자리 */
  const fooled = r ? r.grossPnl > 0 && r.netPnl <= 0 : false;

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); setTouched(false); }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <label className={labelCls} htmlFor="pf-coin">Coin</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input id="pf-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
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
          {state === 'ready' && price != null && (
            <div className="flex items-center gap-2.5">
              <CoinLogo base={coin.base} size={28} />
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums leading-tight">${formatPrice(price)}</p>
                {chg24h != null && <p className="text-[11px]"><Pct value={chg24h} /> <span className="text-slate-500 dark:text-slate-400">24h</span></p>}
              </div>
            </div>
          )}
          {state === 'loading' && <span role="status" className="text-xs font-medium text-slate-500 dark:text-slate-400">Loading price…</span>}
          {state === 'error' && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load price</span>
              <button type="button" onClick={load} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">Retry</button>
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          Everything below works without live data — the price only fills in a starting entry and exit.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <span className={labelCls}>Direction</span>
            <div className="flex gap-2" role="group" aria-label="Position direction">
              {([['long', 'Long (buy)'], ['short', 'Short (sell)']] as [Side, string][]).map(([d, label]) => (
                <button key={d} type="button" aria-pressed={side === d} onClick={() => setSide(d)}
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
            <label className={labelCls} htmlFor="pf-entry">Entry price</label>
            <input id="pf-entry" type="number" inputMode="decimal" value={entryValue}
              onChange={e => { setEntry(e.target.value); setExit(exitValue); setTouched(true); }} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="pf-exit">Exit price</label>
            <input id="pf-exit" type="number" inputMode="decimal" value={exitValue}
              onChange={e => { setExit(e.target.value); setEntry(entryValue); setTouched(true); }} className={inputCls} />
          </div>

          <div>
            <label className={labelCls} htmlFor="pf-amt">Position size (USD)</label>
            <input id="pf-amt" type="number" inputMode="decimal" min={1} value={notional}
              onChange={e => setNotional(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="pf-lev">Leverage</label>
            <input id="pf-lev" type="number" inputMode="decimal" min={1} value={leverage}
              onChange={e => setLeverage(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Changes margin and ROI, not the profit in dollars.</p>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="pf-fee">Fee per side (%)</label>
            <input id="pf-fee" type="number" inputMode="decimal" step="0.01" min={0} value={feePct}
              onChange={e => setFeePct(e.target.value)} className={inputCls} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {FEE_PRESETS.map(([label, v]) => (
                <button key={label} type="button" aria-pressed={Number(feePct) === v} onClick={() => setFeePct(String(v))}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                    Number(feePct) === v
                      ? 'bg-slate-700 border-slate-700 text-white dark:bg-slate-200 dark:border-slate-200 dark:text-slate-900'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {r ? (
        <>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-amber-50 dark:bg-slate-900 p-6 mb-4">
            <p className="text-[11px] uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">Net profit after fees</p>
            <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
              <div>
                <p className={`text-4xl font-bold tabular-nums ${pnlCls(r.netPnl)}`}>{money(r.netPnl)}</p>
                <p className={`text-sm font-bold tabular-nums ${pnlCls(r.roiPct)}`}>
                  {r.roiPct >= 0 ? '+' : ''}{r.roiPct.toFixed(2)}% on ${formatPrice(r.margin)} margin
                </p>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                <p>Price moved <b className="tabular-nums">{r.priceChangePct >= 0 ? '+' : ''}{r.priceChangePct.toFixed(2)}%</b> in your position&apos;s favour</p>
                <p className="text-slate-500 dark:text-slate-400">
                  Before fees <b className={`tabular-nums ${pnlCls(r.grossPnl)}`}>{money(r.grossPnl)}</b> · fees
                  {' '}<b className="tabular-nums text-rose-600 dark:text-rose-400">−{money(r.totalFees).replace('$', '$')}</b>
                </p>
              </div>
            </div>
          </div>

          {/* 본전 가격 — 이 페이지가 다른 수익 계산기와 갈리는 지점 */}
          <div className={`rounded-lg border p-5 mb-4 ${fooled ? 'border-rose-500/40 bg-rose-50 dark:bg-rose-500/[0.08]' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Your break-even is not your entry price</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Fees are charged on the way in and on the way out, so the price has to move before you are level.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3.5">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Entry</p>
                <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">${formatPrice(Number(entryValue))}</p>
              </div>
              <div className="rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-500/30 p-3.5">
                <p className="text-[11px] uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-1">Break-even</p>
                <p className="text-base font-bold text-amber-700 dark:text-amber-300 tabular-nums">${formatPrice(r.breakevenPrice)}</p>
                <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80 tabular-nums">
                  {side === 'long' ? '+' : '−'}{r.breakevenMovePct.toFixed(4)}%
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3.5">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Your exit</p>
                <p className={`text-base font-bold tabular-nums ${pnlCls(r.netPnl)}`}>${formatPrice(Number(exitValue))}</p>
              </div>
            </div>
            {fooled && (
              <p className="mt-3 text-xs font-bold text-rose-700 dark:text-rose-300">
                This exit is above your entry but below break-even — it looks like a win and is a loss of {money(Math.abs(r.netPnl))}.
              </p>
            )}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              At {feePct}% per side the break-even move is {r.breakevenMovePct.toFixed(4)}% — not {(Number(feePct) * 2).toFixed(4)}%, which is what doubling the one-way fee would give —
              the exit fee is charged on the larger exit amount, not on your entry. Small on one trade; decisive if you trade often.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              ['Quantity', formatPrice(r.quantity), coin.base],
              ['Margin used', `$${formatPrice(r.margin)}`, `at ${leverage}×`],
              ['Total fees', `$${formatPrice(r.totalFees)}`, `in ${formatPrice(r.entryFee)} + out ${formatPrice(r.exitFee)}`],
              ['Fees vs gross P&L', r.feeShareOfGrossPct != null ? `${r.feeShareOfGrossPct.toFixed(1)}%` : '—', 'of the raw move'],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{value}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{note}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Enter an entry price, exit price and position size.
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">What leverage does and does not change</h2>
        <p className="mb-2">
          Leverage does not change the profit in dollars. Once the position size is fixed, a given price move produces the same gain or loss
          whatever the leverage; what changes is the margin locked up to hold it, and therefore the percentage return on that margin. A 10%
          move on a $1,000 position is $100 at 1× and $100 at 20× — the ROI reads 10% or 200% depending on which denominator you use.
        </p>
        <p>
          What leverage genuinely changes is how far the price can move against you before the position is closed for you. That is a
          liquidation question rather than a profit question, and it is not modelled here.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/liquidation-calculator" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          Check the liquidation price for this leverage →
        </Link>
      </div>
    </>
  );
}
