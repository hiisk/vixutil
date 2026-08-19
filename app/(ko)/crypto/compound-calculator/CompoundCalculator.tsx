'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchTicker, fetchDailyCandles } from '@/lib/binance';
import { buildForecast, volatilityLabel, type ForecastModel } from '@/lib/forecast';
import { simulateBarriers, probEverBelow } from '@/lib/barriers';
import {
  computeCompound, aprApyGapPp, COMPOUND_FREQ, type CompoundInput,
} from '@/lib/compound';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

const HISTORY_DAYS = 998;
const SUGGEST_LIMIT = 8;
/** 가격 하락 확률을 재는 시점 (일) */
const CHECKPOINTS = [365];

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  price: number;
  model: ForecastModel;
}

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';
const labelCls = 'dial-k mb-1 block';

const num = (v: number, d = 2) => v.toLocaleString(undefined, { maximumFractionDigits: d });

function riskTone(pct: number): string {
  if (!isFinite(pct)) return 'text-slate-400 dark:text-slate-500';
  if (pct >= 60) return 'text-rose-600 dark:text-rose-400';
  if (pct >= 35) return 'text-orange-600 dark:text-orange-400';
  if (pct >= 15) return 'text-amber-600 dark:text-amber-400';
  return 'text-emerald-600 dark:text-emerald-400';
}

export default function CompoundCalculator() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('ethereum');
  const [query, setQuery] = useState('');

  const [principal, setPrincipal] = useState('1000');
  const [ratePct, setRatePct] = useState('12');
  const [rateKind, setRateKind] = useState<'apr' | 'apy'>('apr');
  const [perYear, setPerYear] = useState(365);
  const [years, setYears] = useState('1');
  const [contribution, setContribution] = useState('');

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'ETH')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const market = marketOf(coin);
      const [t, candles, btc] = await Promise.all([
        fetchTicker(symbolOf(coin), market),
        fetchDailyCandles(symbolOf(coin), HISTORY_DAYS, market),
        fetchDailyCandles('BTCUSDT', HISTORY_DAYS, market).catch(() => []),
      ]);
      if (!t || candles.length < 60) { setState('nodata'); return; }
      const model = buildForecast(candles.map(k => k.close), t.lastPrice, btc.length ? btc.map(k => k.close) : undefined);
      if (!model) { setState('nodata'); return; }
      setSnap({ coin, price: t.lastPrice, model });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  // 변동성은 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base.startsWith(q) || c.name.toUpperCase().includes(q)).slice(0, SUGGEST_LIMIT);
  }, [query]);

  const input: CompoundInput = useMemo(() => ({
    principal: Number(principal),
    ratePct: Number(ratePct),
    rateKind,
    perYear,
    years: Number(years),
    contribution: contribution ? Number(contribution) : 0,
  }), [principal, ratePct, rateKind, perYear, years, contribution]);

  const r = useMemo(() => computeCompound(input), [input]);
  const gap = useMemo(() => aprApyGapPp(Number(ratePct), perYear), [ratePct, perYear]);

  const barriers = useMemo(() => (snap ? simulateBarriers(snap.model, CHECKPOINTS, 4000, 3131) : null), [snap]);

  /**
   * 이 수익을 지우는 가격 하락이 이 코인에서 얼마나 흔한가.
   * 이자율은 코인 수를 늘리고, 가격은 그 가치를 정한다 — 후자가 훨씬 크게 움직인다.
   */
  const wipeoutProb = useMemo(() => {
    if (!barriers || !snap || !r || !(r.breakevenDropPct > 0)) return null;
    const level = snap.price * (1 - r.breakevenDropPct / 100);
    return probEverBelow(barriers, 0, level);
  }, [barriers, snap, r]);

  /** 이자가 코인의 연 변동성에서 차지하는 비중 */
  const yieldVsVol = useMemo(() => {
    if (!snap || !r) return null;
    const vol = snap.model.annualVolPct;
    return vol > 0 ? (r.effectiveApyPct / vol) * 100 : null;
  }, [snap, r]);

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="cc-principal">Starting amount</label>
            <input id="cc-principal" type="number" inputMode="decimal" min={0} value={principal}
              onChange={e => setPrincipal(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="cc-contrib">Added each period (optional)</label>
            <input id="cc-contrib" type="number" inputMode="decimal" min={0} value={contribution} placeholder="0"
              onChange={e => setContribution(e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className={labelCls} htmlFor="cc-rate">Advertised rate (%)</label>
            <input id="cc-rate" type="number" inputMode="decimal" step="0.1" value={ratePct}
              onChange={e => setRatePct(e.target.value)} className={inputCls} />
            <div className="inline-flex mt-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-0.5">
              {(['apr', 'apy'] as const).map(k => (
                <button key={k} type="button" aria-pressed={rateKind === k} onClick={() => setRateKind(k)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md uppercase transition-colors ${
                    rateKind === k ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}>
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="cc-freq">Compounds</label>
            <select id="cc-freq" value={perYear} onChange={e => setPerYear(Number(e.target.value))}
              className={inputCls.replace('tabular-nums', '')}>
              {COMPOUND_FREQ.map(([label, n]) => <option key={n} value={n}>{label}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="cc-years">Years held</label>
            <input id="cc-years" type="number" inputMode="decimal" step="0.5" min={0.5} value={years}
              onChange={e => setYears(e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {r ? (
        <>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-amber-50 dark:bg-slate-900 p-6 mb-4">
            <p className="text-[11px] uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">Balance after {years} year{Number(years) === 1 ? '' : 's'}</p>
            <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
              <div>
                <p className="text-4xl font-bold text-slate-900 dark:text-white tabular-nums">{num(r.finalBalance)}</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  +{num(r.interestEarned)} interest
                </p>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                <p>You put in <b className="tabular-nums">{num(r.totalContributed)}</b></p>
                <p className="text-slate-500 dark:text-slate-400">
                  Effective <b className="tabular-nums">{r.effectiveApyPct.toFixed(2)}% APY</b> ·
                  {' '}<b className="tabular-nums">{r.aprPct.toFixed(2)}% APR</b>
                </p>
              </div>
            </div>
          </div>

          {/* APR vs APY — 첫 번째 차별점 */}
          {gap != null && Math.abs(gap) > 0.005 && (
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {rateKind === 'apr' ? 'That APR is not the return you get' : 'That APY corresponds to a lower APR'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                APR quotes the rate before compounding; APY is what you actually end up with. Comparing one product&apos;s APR against
                another&apos;s APY invents a difference of {Math.abs(gap).toFixed(2)} percentage points that is not there.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ['APR', `${r.aprPct.toFixed(2)}%`, 'before compounding'],
                  ['APY', `${r.effectiveApyPct.toFixed(2)}%`, 'what you receive'],
                  ['Difference', `${gap >= 0 ? '+' : ''}${gap.toFixed(2)}%p`, `at ${perYear}× per year`],
                ].map(([l, v, note]) => (
                  <div key={l} className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3.5 text-center">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{l}</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">{v}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 가격 변동이 이자를 지운다 — 핵심 차별점 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Yield earns coins. Price decides what they are worth.</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  A {r.totalReturnPct.toFixed(1)}% gain is erased by a {r.breakevenDropPct.toFixed(1)}% fall in the token — not a {r.totalReturnPct.toFixed(1)}% one.
                </p>
              </div>
              <div className="relative shrink-0">
                <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder={`${coin.base} · change coin`} aria-label="Change coin"
                  className="w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                {suggestions.length > 0 && (
                  <ul className="absolute right-0 z-20 mt-1 w-56 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    {suggestions.map(c => (
                      <li key={c.slug}>
                        <button type="button" onClick={() => pickCoin(c)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors">
                          <CoinLogo base={c.base} size={16} />
                          <span className="font-bold text-slate-800 dark:text-slate-100">{c.base}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {state === 'ready' && snap ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200 dark:divide-slate-700">
                  <div className="p-4 text-center">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Break-even drop</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">−{r.breakevenDropPct.toFixed(1)}%</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{snap.coin.base} volatility</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">{snap.model.annualVolPct.toFixed(0)}%</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{volatilityLabel(snap.model.annualVolPct)} · annualised</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Yield vs volatility</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                      {yieldVsVol != null ? `${yieldVsVol.toFixed(0)}%` : '—'}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">of one year&apos;s swing</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Chance it happens</p>
                    <p className={`text-lg font-bold tabular-nums ${wipeoutProb != null ? riskTone(wipeoutProb) : ''}`}>
                      {wipeoutProb != null ? `${wipeoutProb.toFixed(0)}%` : '—'}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">within a year</p>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {wipeoutProb != null && (
                    <>
                      Modelled from {snap.coin.base}&apos;s measured volatility, the price touches
                      {' '}<b className="text-slate-700 dark:text-slate-200">${formatPrice(snap.price * (1 - r.breakevenDropPct / 100))}</b> — the level that
                      wipes out this yield — with probability <b className={riskTone(wipeoutProb)}>{wipeoutProb.toFixed(0)}%</b> at some point in the next year.{' '}
                    </>
                  )}
                  {yieldVsVol != null && yieldVsVol < 50 && (
                    <>The yield is worth about {yieldVsVol.toFixed(0)}% of a single year&apos;s ordinary price swing, so the token&apos;s direction will
                    dominate the outcome regardless of the rate. </>
                  )}
                  Earning yield in a volatile asset increases your holding of that asset; it does not reduce your exposure to it.
                </div>
              </>
            ) : (
              <div className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                {state === 'loading' ? 'Measuring the coin’s volatility…' : 'Couldn’t load volatility for this coin.'}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Enter a starting amount, a rate and a holding period.
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">What a yield figure leaves out</h2>
        <p className="mb-2">
          Advertised rates in crypto are paid in the token, so the yield increases the number of coins you hold rather than the value of your
          position. Whether that ends up profitable is decided almost entirely by the token&apos;s price over the same period, and price moves
          in this market are usually an order of magnitude larger than any rate on offer.
        </p>
        <p>
          Beyond price, a rate says nothing about where it comes from. Lock-up periods, unbonding delays, smart-contract risk, validator
          slashing and the possibility that the rate is funded by token emissions rather than revenue are all invisible in the number. None of
          them are modelled here — this page only makes the arithmetic honest.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href={`/crypto/${coin.slug}/price-prediction`} className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See {coin.name}&apos;s price ranges and probabilities →
        </Link>
      </div>
    </>
  );
}
