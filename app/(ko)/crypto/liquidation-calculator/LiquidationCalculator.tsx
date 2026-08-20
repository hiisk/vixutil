'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchTicker, fetchDailyOHLCV, fetchDailyCandles } from '@/lib/binance';
import { buildForecast, volatilityLabel, type ForecastModel } from '@/lib/forecast';
import { simulateBarriers, probEverAbove, probEverBelow } from '@/lib/barriers';
import { computeLiquidation, maxLeverageForBuffer, MMR_PRESETS, type Side } from '@/lib/liquidation';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo, Pct } from '@/components/crypto/ui';

/** 드리프트·변동성 추정에 쓸 일수 — 바이낸스 1회 요청 상한에 맞춘다 */
const HISTORY_DAYS = 998;
/** 청산 확률을 재는 시점 (일) */
const CHECKPOINTS = [7, 30, 90];
const CHECKPOINT_LABELS = ['7 days', '30 days', '90 days'];
/** 코인 검색에서 한 번에 보여줄 개수 */
const SUGGEST_LIMIT = 8;
/** 자주 쓰는 배율 */
const LEVERAGE_PRESETS = [3, 5, 10, 20, 50, 100];

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  price: number;
  chg24h: number;
  model: ForecastModel;
}

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';

const labelCls = 'dial-k mb-1 block';

/** 확률이 높을수록 붉게 — 색만으로 전달하지 않도록 숫자를 항상 함께 쓴다 */
function riskTone(pct: number): string {
  if (!isFinite(pct)) return 'text-slate-500 dark:text-slate-400';
  if (pct >= 50) return 'text-rose-600 dark:text-rose-400';
  if (pct >= 20) return 'text-orange-600 dark:text-orange-400';
  if (pct >= 5) return 'text-amber-600 dark:text-amber-400';
  return 'text-emerald-600 dark:text-emerald-400';
}

export default function LiquidationCalculator() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');

  const [side, setSide] = useState<Side>('long');
  const [entry, setEntry] = useState('');
  const [leverage, setLeverage] = useState('10');
  const [margin, setMargin] = useState('1000');
  const [mmr, setMmr] = useState('0.5');
  const [extra, setExtra] = useState('');
  /** 사용자가 진입가를 직접 만졌는가 — 만졌으면 시세 갱신으로 덮어쓰지 않는다 */
  const [entryTouched, setEntryTouched] = useState(false);

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const market = marketOf(coin);
      const symbol = symbolOf(coin);
      const [t, ohlcv, btc] = await Promise.all([
        fetchTicker(symbol, market),
        fetchDailyOHLCV(symbol, HISTORY_DAYS, market),
        fetchDailyCandles('BTCUSDT', HISTORY_DAYS, market).catch(() => []),
      ]);
      if (!t || ohlcv.length < 2) { setState('nodata'); return; }

      const closes = ohlcv.map(k => k.close);
      const marketCloses = btc.map(k => k.close);
      const model = buildForecast(closes, t.lastPrice, marketCloses.length ? marketCloses : undefined);
      if (!model) { setState('nodata'); return; }

      setSnap({ coin, price: t.lastPrice, chg24h: t.priceChangePercent, model });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  // 시세는 프리렌더 시점에 존재할 수 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  /**
   * 진입가는 기본적으로 현재 시세를 따라가고, 사용자가 한 번 입력하면 그 값을 유지한다.
   * 이걸 이펙트로 setEntry 하면 시세가 들어올 때마다 렌더가 한 번 더 돌아서, 파생값으로 둔다.
   */
  const entryValue = entryTouched || !snap ? entry : String(snap.price);

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base.startsWith(q) || c.name.toUpperCase().includes(q)).slice(0, SUGGEST_LIMIT);
  }, [query]);

  const calc = useMemo(
    () =>
      computeLiquidation({
        entry: Number(entryValue),
        side,
        leverage: Number(leverage),
        mmrPct: Number(mmr),
        margin: Number(margin),
        extraMargin: extra ? Number(extra) : 0,
      }),
    [entryValue, side, leverage, mmr, margin, extra],
  );

  /**
   * 청산 확률 — 이 사이트가 다른 계산기와 갈리는 지점이다.
   * 예측 페이지와 같은 모델(코인별 실측 변동성 + 팻테일 + 지평별 변동성 구조)에서
   * 경로를 표집해 "청산가에 한 번이라도 닿는" 비율을 센다. 시작점은 진입가가 아니라
   * **현재가**다 — 이미 열려 있든 지금 열든, 앞으로의 확률은 현재가에서 출발한다.
   */
  const barriers = useMemo(
    () => (snap ? simulateBarriers(snap.model, CHECKPOINTS, 4000, 7717) : null),
    [snap],
  );

  const liqProbs = useMemo(() => {
    if (!barriers || !calc?.liquidatable || !snap) return null;
    return CHECKPOINTS.map((_, i) =>
      side === 'long'
        ? probEverBelow(barriers, i, calc.liqPrice)
        : probEverAbove(barriers, i, calc.liqPrice),
    );
  }, [barriers, calc, side, snap]);

  // "10% 조정은 버티고 싶다"에서 배율을 역산한다
  const safeLev = useMemo(() => {
    const m = Number(mmr);
    return [10, 20, 30].map(t => ({ buffer: t, lev: maxLeverageForBuffer(t, m, side) }));
  }, [mmr, side]);

  function pickCoin(c: CoinMeta) {
    setSlug(c.slug);
    setQuery('');
    setEntryTouched(false);
  }

  return (
    <>
      {/* 코인 선택 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <label className={labelCls} htmlFor="coin-search">Coin</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input
              id="coin-search"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`${coin.base} · search another coin`}
              className={inputCls}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                {suggestions.map(c => (
                  <li key={c.slug}>
                    <button
                      type="button"
                      onClick={() => pickCoin(c)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors"
                    >
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
                <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums leading-tight">
                  ${formatPrice(snap.price)}
                </p>
                <p className="text-[11px]"><Pct value={snap.chg24h} /> <span className="text-slate-500 dark:text-slate-400">24h</span></p>
              </div>
            </div>
          )}
          {state === 'loading' && (
            <span role="status" className="text-xs font-medium text-slate-500 dark:text-slate-400">Loading price…</span>
          )}
          {(state === 'error' || state === 'nodata') && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">
                {state === 'nodata' ? 'Not enough price history' : 'Couldn’t load the price'}
              </span>
              <button type="button" onClick={load} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">Retry</button>
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          The liquidation price works without live data. The price feed only fills in your entry and powers the <b>probability</b> figures below.
        </p>
      </div>

      {/* 입력 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <span className={labelCls}>Direction</span>
            <div className="flex gap-2" role="group" aria-label="Position direction">
              {([['long', 'Long (buy)'], ['short', 'Short (sell)']] as [Side, string][]).map(([d, label]) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={side === d}
                  onClick={() => setSide(d)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-colors ${
                    side === d
                      ? d === 'long' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="entry">Entry price (USDT)</label>
            <input
              id="entry" type="number" inputMode="decimal" value={entryValue}
              onChange={e => { setEntry(e.target.value); setEntryTouched(true); }}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="margin">Margin (USDT)</label>
            <input id="margin" type="number" inputMode="decimal" value={margin} min={1}
              onChange={e => setMargin(e.target.value)} className={inputCls} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="leverage">Leverage — {leverage}×</label>
            <input
              id="leverage" type="range" min={1} max={125} step={1} value={leverage}
              onChange={e => setLeverage(e.target.value)}
              className="w-full accent-amber-500"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {LEVERAGE_PRESETS.map(L => (
                <button key={L} type="button" aria-pressed={Number(leverage) === L} onClick={() => setLeverage(String(L))}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                    Number(leverage) === L
                      ? 'bg-amber-500 border-amber-500 text-amber-950'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}>
                  {L}×
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="mmr">Maintenance margin rate (%)</label>
            <input id="mmr" type="number" inputMode="decimal" step="0.1" value={mmr}
              onChange={e => setMmr(e.target.value)} className={inputCls} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {MMR_PRESETS.map(v => (
                <button key={v} type="button" aria-pressed={Number(mmr) === v} onClick={() => setMmr(String(v))}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                    Number(mmr) === v
                      ? 'bg-slate-700 border-slate-700 text-white dark:bg-slate-200 dark:border-slate-200 dark:text-slate-900'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}>
                  {v}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="extra">Added margin (optional)</label>
            <input id="extra" type="number" inputMode="decimal" value={extra} placeholder="0"
              onChange={e => setExtra(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              Extra collateral on the position. It leaves the size unchanged and only pushes the liquidation price away.
            </p>
          </div>
        </div>
      </div>

      {/* 결과 */}
      {calc ? (
        <>
          <div className={`rounded-lg border p-6 mb-4 ${side === 'long' ? 'border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/[0.07]' : 'border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/[0.07]'}`}>
            <p className="text-[11px] uppercase tracking-wide text-rose-600 dark:text-rose-400 mb-1">Liquidation price</p>
            {calc.liquidatable ? (
              <>
                <p className="text-4xl font-bold text-rose-600 dark:text-rose-300 tabular-nums">${formatPrice(calc.liqPrice)}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5">
                  A <b className="tabular-nums">{calc.moveToLiqPct >= 0 ? '+' : ''}{calc.moveToLiqPct.toFixed(2)}%</b> move from your entry liquidates the position.
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">No liquidation</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5">
                  Your margin covers the whole position, so nothing short of the price reaching zero can liquidate it.
                </p>
              </>
            )}
          </div>

          {/* 청산 확률 — 다른 계산기는 가격만 알려주고 끝난다 */}
          {calc.liquidatable && (
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Probability of being liquidated</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Other calculators stop at the price. Without the odds of actually reaching it, the number alone tells you nothing about the risk.
                </p>
              </div>

              {liqProbs && snap ? (
                <>
                  <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700">
                    {liqProbs.map((p, i) => (
                      <div key={CHECKPOINTS[i]} className="p-4 text-center">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">within {CHECKPOINT_LABELS[i]}</p>
                        <p className={`text-2xl font-bold tabular-nums ${riskTone(p)}`}>{isFinite(p) ? `${p.toFixed(1)}%` : '—'}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Sampled from 4,000 paths using {snap.coin.base}&apos;s measured volatility
                    ({snap.model.annualVolPct.toFixed(0)}% annualised, {volatilityLabel(snap.model.annualVolPct)}), counting how often the price touches your
                    liquidation level <b className="text-slate-700 dark:text-slate-200">at any point</b> — monitored on daily closes. It starts from the
                    <b className="text-slate-700 dark:text-slate-200"> current price of ${formatPrice(snap.price)}</b>, not your entry, because that is where the
                    remaining risk actually begins.
                    {snap.model.limitedHistory && (
                      <> This coin has only {snap.model.samples + 1} daily closes, so its volatility — and these probabilities — are estimated from a short sample and will move.</>
                    )}
                  </div>
                </>
              ) : (
                <div className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  {state === 'loading' ? 'Computing volatility…' : 'Couldn’t load market data, so the probability is unavailable.'}
                </div>
              )}
            </div>
          )}

          {/* 딸린 수치 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              ['Position size', `$${formatPrice(calc.notional)}`, 'margin × leverage'],
              ['Quantity', formatPrice(calc.quantity), `in ${coin.base}`],
              ['Bankruptcy price', calc.liquidatable ? `$${formatPrice(calc.bankruptcyPrice)}` : '—', 'where margin hits zero'],
              ['Loss at liquidation', `$${formatPrice(calc.lossAtLiq)}`, `${((calc.lossAtLiq / calc.totalMargin) * 100).toFixed(1)}% of your margin`],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{value}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{note}</p>
              </div>
            ))}
          </div>

          {/* 역산 — 버티고 싶은 조정폭에서 배율을 구한다 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">How much leverage survives a given drawdown?</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              The most leverage you can take at a {mmr}% maintenance margin rate and still survive a {side === 'long' ? 'drop' : 'rise'} of that size.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {safeLev.map(({ buffer, lev }) => (
                <button
                  key={buffer}
                  type="button"
                  onClick={() => lev && setLeverage(String(Math.floor(lev)))}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 text-center hover:border-amber-400 dark:hover:border-amber-500/50 transition-colors"
                >
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-0.5">Survive {buffer}%</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                    {lev ? `${lev.toFixed(1)}×` : '—'}
                  </p>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Tap to apply it to the leverage above.</p>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {Number(mmr) / 100 >= 1 / Number(leverage)
            ? `A ${mmr}% maintenance margin rate exceeds the initial margin at ${leverage}× — the exchange would not let this position open.`
            : 'Enter an entry price, margin and leverage to get the liquidation price.'}
        </div>
      )}

      {/* 정직한 한계 — 이 사이트의 방식대로, 빠진 것을 먼저 밝힌다 */}
      <div className="note-warn mb-4">
        <h2 className="text-sm font-bold mb-2">What this calculation leaves out</h2>
        <ul className="space-y-1.5">
          <li>· <b>Fees and funding.</b> Both eat into margin, so your real liquidation price sits <b>closer to entry</b> than this one. The longer you hold, the wider the gap.</li>
          <li>· <b>Maintenance margin tiers.</b> Exchanges raise the rate as position size grows. This uses a single rate, so a large position faces a higher one than assumed here.</li>
          <li>· <b>Other positions in cross margin.</b> This is isolated margin. On cross, your whole wallet balance and every other position&apos;s P&amp;L move the level too.</li>
        </ul>
        <p className="mt-2">
          All three push the same way, so treat this number as the <b>optimistic</b> end. Real liquidation arrives earlier — leave yourself room.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">How the liquidation price is derived</h2>
        <p className="mb-2">
          Liquidation is the moment remaining equity equals the maintenance margin. That margin is charged on the notional
          <b className="text-slate-700 dark:text-slate-200"> at the liquidation price</b>, not at entry, which gives — for a long —
          <code className="text-slate-700 dark:text-slate-200"> liq = entry × (1 − 1/leverage) ÷ (1 − MMR)</code>.
          Calculators that drop that divisor and use plain &quot;entry × (1 − 1/leverage)&quot; put the level
          <b className="text-slate-700 dark:text-slate-200"> further away</b> than it really is, and the error grows with leverage.
        </p>
        <p>
          The probabilities come from the same model as this site&apos;s price prediction pages: each coin&apos;s own measured volatility
          (with its horizon structure) and fat-tailed Student-t shocks. That model&apos;s output is calibrated against history rather than
          asserted — a stated &quot;50%&quot; band actually contained 50.1% of outcomes, and a level said to be touched half the time was
          touched 50.0% of the time. Direction is not forecastable, but <b className="text-slate-700 dark:text-slate-200">volatility is</b>,
          which is exactly why a liquidation probability carries real information.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href={`/crypto/${coin.slug}/price-prediction`} className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See {coin.name} price prediction ranges →
        </Link>
      </div>
    </>
  );
}
