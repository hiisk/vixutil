'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchFullDailyKlines } from '@/lib/binance';
import { logReturns, pearson, corrLabel } from '@/lib/correlation';
import { stdev, DAYS_PER_YEAR } from '@/lib/metrics';
import { drawdownSummary } from '@/lib/drawdown';
import {
  correlationCI, excludesZero, rollingCorrelation,
  stressResponse, thresholdResponse, hedgeVerdict,
  type RollingSummary, type StressResponse,
} from '@/lib/hedge';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

const SUGGEST_LIMIT = 8;
/** 금 대용물 — 실물 금 1온스에 1:1로 대응하는 토큰. 현물에 6년치가 있다. */
const GOLD_BASE = 'PAXG';
const ROLL_WINDOW = 90;
const STRESS_N = 20;
const STRESS_THRESHOLD = 5;

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Side {
  volPct: number;
  totalPct: number;
  /** 최대낙폭 깊이 — 양수로 담는다 (lib/drawdown의 규약) */
  maxDdPct: number;
}

interface Snapshot {
  coin: CoinMeta;
  days: number;
  from: number;
  to: number;
  asset: Side;
  gold: Side;
  corr: number | null;
  ci: { lo: number; hi: number } | null;
  roll: RollingSummary | null;
  /** 코인이 크게 빠진 날 금은 무엇을 했나 */
  goldOnCoinCrash: StressResponse | null;
  /** 금이 크게 빠진 날 코인은 무엇을 했나 */
  coinOnGoldCrash: StressResponse | null;
  /** 코인이 임계값 넘게 빠진 모든 날의 금 반응 */
  goldOnBigDrops: StressResponse | null;
}

const inputCls =
  'w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition';

const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const signed = (v: number, d = 2) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(d)}%`;
/** 상관계수 표기 — toFixed의 하이픈 대신 카드와 같은 진짜 마이너스(U+2212)를 쓴다 */
const sc = (v: number) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(2)}`;

function side(closes: number[]): Side | null {
  const rets = logReturns(closes);
  const sd = stdev(rets);
  const dd = drawdownSummary(closes);
  if (sd == null || !closes.length) return null;
  return {
    volPct: sd * Math.sqrt(DAYS_PER_YEAR) * 100,
    totalPct: (closes[closes.length - 1] / closes[0] - 1) * 100,
    maxDdPct: dd?.maxDrawdownPct ?? 0,
  };
}

export default function GoldBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const goldCoin = COINS.find(c => c.base === GOLD_BASE);
      if (!goldCoin) { setState('nodata'); return; }
      const [a, g] = await Promise.all([
        fetchFullDailyKlines(symbolOf(coin), marketOf(coin)),
        fetchFullDailyKlines(symbolOf(goldCoin), marketOf(goldCoin)),
      ]);
      // 겹치는 날짜만 남긴다 — 상장 시점이 다르면 구간이 어긋난다
      const gm = new Map(g.map(x => [x.openTime, x.close]));
      const rows = a.filter(x => gm.has(x.openTime))
        .map(x => ({ t: x.openTime, a: x.close, g: gm.get(x.openTime)! }));
      if (rows.length < 120) { setState('nodata'); return; }

      const ac = rows.map(r => r.a);
      const gc = rows.map(r => r.g);
      const aSide = side(ac);
      const gSide = side(gc);
      if (!aSide || !gSide) { setState('nodata'); return; }

      const ra = logReturns(ac);
      const rg = logReturns(gc);
      const corr = pearson(ra, rg);
      // 스트레스 반응은 단순 수익률(%)로 — "그날 평균 −0.8%"로 바로 읽히게
      const pa: number[] = [], pg: number[] = [];
      for (let i = 1; i < rows.length; i++) {
        pa.push((rows[i].a / rows[i - 1].a - 1) * 100);
        pg.push((rows[i].g / rows[i - 1].g - 1) * 100);
      }

      setSnap({
        coin,
        days: rows.length,
        from: rows[0].t,
        to: rows[rows.length - 1].t,
        asset: aSide,
        gold: gSide,
        corr,
        ci: corr != null ? correlationCI(corr, ra.length) : null,
        roll: rollingCorrelation(ra, rg, ROLL_WINDOW),
        // 인자 순서는 (반응을 볼 자산, 기준 자산) — 기준의 최악일을 고른다
        goldOnCoinCrash: stressResponse(pg, pa, STRESS_N),
        coinOnGoldCrash: stressResponse(pa, pg, STRESS_N),
        goldOnBigDrops: thresholdResponse(pg, pa, STRESS_THRESHOLD),
      });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  // 전체 이력은 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base !== GOLD_BASE && (c.base.startsWith(q) || c.name.toUpperCase().includes(q)))
      .slice(0, SUGGEST_LIMIT);
  }, [query]);

  /**
   * 양방향 중 어느 쪽이라도 진짜 헤지면 헤지로 본다.
   * 한쪽만 보면 "금이 BTC를 지켜주나"와 "BTC가 금 역할을 하나"가 뒤섞인다.
   */
  const verdicts = [hedgeVerdict(snap?.goldOnCoinCrash ?? null), hedgeVerdict(snap?.coinOnGoldCrash ?? null)];
  const verdict: 'hedge' | 'neutral' | 'fails' | 'unknown' =
    verdicts.includes('hedge') ? 'hedge'
      : verdicts.every(v => v === 'unknown') ? 'unknown'
      : verdicts.includes('neutral') ? 'neutral'
      : 'fails';
  const volRatio = snap ? snap.asset.volPct / snap.gold.volPct : 0;

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-4">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="bvg-coin">
          Compare against gold
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input id="bvg-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder={`${coin.base} · search another coin`} className={inputCls} autoComplete="off" />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
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
          {state === 'ready' && snap && (
            <div className="flex items-center gap-2.5">
              <CoinLogo base={snap.coin.base} size={28} />
              <span className="text-slate-300 dark:text-slate-600 font-black">vs</span>
              <span className="text-lg">🥇</span>
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{snap.coin.base} vs Gold</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                  {snap.days.toLocaleString()} shared days · {iso(snap.from)} → {iso(snap.to)}
                </p>
              </div>
            </div>
          )}
          {state === 'loading' && <span role="status" className="text-xs font-bold text-slate-500 dark:text-slate-400">Reading both histories…</span>}
          {(state === 'error' || state === 'nodata') && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">
                {state === 'nodata' ? 'Not enough overlapping history' : 'Couldn’t load history'}
              </span>
              <button type="button" onClick={load} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">Retry</button>
            </span>
          )}
        </div>
      </div>

      {snap && (
        <>
          {/* 주장 1 — 가치 저장 */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-black text-slate-900 dark:text-white">Claim 1 — &quot;a store of value, like gold&quot;</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Same {snap.days.toLocaleString()} days, same measurements.</p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Measure</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">{snap.coin.base}</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Gold</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Ratio</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-700 dark:text-slate-200">Annualised volatility</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">How much it moves</p>
                    </td>
                    <td className="px-3 py-3 text-right font-bold text-rose-600 dark:text-rose-400">{snap.asset.volPct.toFixed(1)}%</td>
                    <td className="px-3 py-3 text-right font-bold text-amber-600 dark:text-amber-400">{snap.gold.volPct.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right font-black text-slate-900 dark:text-white border-l border-slate-200/40 dark:border-slate-700/40">
                      {volRatio.toFixed(1)}×
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-700 dark:text-slate-200">Worst drawdown</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Peak to trough, in this window</p>
                    </td>
                    <td className="px-3 py-3 text-right font-bold text-rose-600 dark:text-rose-400">−{snap.asset.maxDdPct.toFixed(1)}%</td>
                    <td className="px-3 py-3 text-right font-bold text-amber-600 dark:text-amber-400">−{snap.gold.maxDdPct.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right font-black text-slate-900 dark:text-white border-l border-slate-200/40 dark:border-slate-700/40">
                      {snap.gold.maxDdPct !== 0 ? `${(snap.asset.maxDdPct / snap.gold.maxDdPct).toFixed(1)}×` : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-700 dark:text-slate-200">Total return</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Over the shared window</p>
                    </td>
                    <td className={`px-3 py-3 text-right font-bold ${snap.asset.totalPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {signed(snap.asset.totalPct, 0)}
                    </td>
                    <td className={`px-3 py-3 text-right font-bold ${snap.gold.totalPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {signed(snap.gold.totalPct, 0)}
                    </td>
                    <td className="px-4 py-3 text-right font-black text-slate-900 dark:text-white border-l border-slate-200/40 dark:border-slate-700/40">
                      {snap.gold.totalPct !== 0 ? `${(snap.asset.totalPct / snap.gold.totalPct).toFixed(1)}×` : '—'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {snap.coin.base} moved <b className="tabular-nums">{volRatio.toFixed(1)}×</b> as much as gold and fell{' '}
              <b className="tabular-nums">{Math.abs(snap.asset.maxDdPct).toFixed(0)}%</b> at its worst against gold&apos;s{' '}
              <b className="tabular-nums">{Math.abs(snap.gold.maxDdPct).toFixed(0)}%</b>. It also returned far more.
              Both of those are true at once, and the return is the reason people hold it — but an asset that swings this much is not
              doing the job the phrase &quot;store of value&quot; describes, whatever else it is doing well.
            </div>
          </div>

          {/* 주장 2 — 헤지 */}
          <div className={`rounded-2xl border p-5 mb-4 ${
            verdict === 'fails' ? 'border-rose-500/30 bg-rose-50 dark:bg-rose-500/[0.07]'
              : verdict === 'hedge' ? 'border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/[0.07]'
              : 'border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07]'
          }`}>
            <h2 className={`text-sm font-black mb-1.5 ${
              verdict === 'fails' ? 'text-rose-900 dark:text-rose-200'
                : verdict === 'hedge' ? 'text-emerald-900 dark:text-emerald-200'
                : 'text-amber-900 dark:text-amber-200'
            }`}>
              Claim 2 — &quot;it protects you when things break&quot;
            </h2>
            <div className={`text-xs leading-relaxed ${
              verdict === 'fails' ? 'text-rose-900/85 dark:text-rose-200/85'
                : verdict === 'hedge' ? 'text-emerald-900/85 dark:text-emerald-200/85'
                : 'text-amber-900/85 dark:text-amber-200/85'
            }`}>
              {snap.goldOnCoinCrash || snap.coinOnGoldCrash ? (
                <>
                  <p className="mb-2">
                    <b>Their bad days are different days.</b>{' '}
                    {snap.goldOnCoinCrash && (
                      <>
                        On {snap.coin.base}&apos;s worst {snap.goldOnCoinCrash.days} days — averaging{' '}
                        <b className="tabular-nums">{signed(snap.goldOnCoinCrash.benchMeanPct)}</b> — gold averaged{' '}
                        <b className="tabular-nums">{signed(snap.goldOnCoinCrash.assetMeanPct)}</b> and rose on{' '}
                        <b className="tabular-nums">{snap.goldOnCoinCrash.assetUpDays} of {snap.goldOnCoinCrash.days}</b>.{' '}
                      </>
                    )}
                    {snap.coinOnGoldCrash && (
                      <>
                        Reversed, on gold&apos;s worst {snap.coinOnGoldCrash.days} days — averaging{' '}
                        <b className="tabular-nums">{signed(snap.coinOnGoldCrash.benchMeanPct)}</b> — {snap.coin.base} averaged{' '}
                        <b className="tabular-nums">{signed(snap.coinOnGoldCrash.assetMeanPct)}</b> and rose on{' '}
                        <b className="tabular-nums">{snap.coinOnGoldCrash.assetUpDays} of {snap.coinOnGoldCrash.days}</b>.
                      </>
                    )}
                  </p>
                  <p className="mb-2">
                    {verdict === 'hedge'
                      ? 'One side does rise when the other breaks, which is what an offset looks like — read the stability note below before relying on it.'
                      : 'Neither side offsets the other. The moves are small in both directions, which is what genuinely unrelated assets look like — but unrelated is not protective. A hedge has to rise when the thing it hedges falls, and neither of these does.'}
                  </p>
                </>
              ) : (
                <p className="mb-2">Not enough shared history to test the stress response.</p>
              )}
              {snap.goldOnBigDrops && (
                <p className="mb-2">
                  Widening it to every day {snap.coin.base} fell more than {STRESS_THRESHOLD}% —{' '}
                  <b className="tabular-nums">{snap.goldOnBigDrops.days}</b>{' '}
                  {snap.goldOnBigDrops.days === 1 ? 'day' : 'days'} — gold averaged{' '}
                  <b className="tabular-nums">{signed(snap.goldOnBigDrops.assetMeanPct)}</b> and rose{' '}
                  <b className="tabular-nums">{snap.goldOnBigDrops.assetUpPct.toFixed(0)}%</b> of the time.
                </p>
              )}
              {snap.corr != null && (
                <p>
                  Across the whole window the daily correlation is <b className="tabular-nums">{snap.corr.toFixed(3)}</b> —{' '}
                  {corrLabel(snap.corr)}.
                  {snap.ci && (
                    <>
                      {' '}The 95% interval is{' '}
                      <b className="tabular-nums">[{snap.ci.lo.toFixed(3)}, {snap.ci.hi.toFixed(3)}]</b>, which{' '}
                      {excludesZero(snap.ci)
                        ? 'excludes zero — small, but a real positive link rather than independence.'
                        : 'includes zero, so this sample cannot distinguish it from no relationship at all.'}
                    </>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* 관계의 불안정성 */}
          {snap.roll && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4">
              <h2 className="text-sm font-black text-slate-900 dark:text-white mb-1">The relationship does not hold still</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Correlation measured over a rolling {ROLL_WINDOW}-day window, {snap.roll.values.length.toLocaleString()} windows in total.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {([
                  ['Lowest', snap.roll.min],
                  ['Median', snap.roll.median],
                  ['Highest', snap.roll.max],
                  ['Latest', snap.roll.latest],
                ] as const).map(([label, v]) => (
                  <div key={label} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
                    <p className={`text-lg font-black tabular-nums ${
                      v > 0.2 ? 'text-rose-600 dark:text-rose-400' : v < -0.2 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'
                    }`}>
                      {sc(v)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[72ch]">
                The window correlation is positive <b className="tabular-nums">{snap.roll.positivePct.toFixed(0)}%</b> of the time and spans{' '}
                <b className="tabular-nums">{sc(snap.roll.min)}</b> to <b className="tabular-nums">{sc(snap.roll.max)}</b>. A
                figure that travels that far is not a property you can build an allocation on: whichever number supports your argument, some
                stretch of history produced it. The single full-sample correlation above hides all of this, which is why it is shown here
                rather than on its own.
              </p>
            </div>
          )}
        </>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">Where the gold price comes from</h2>
        <p className="mb-2">
          Gold here is PAXG, a token redeemable for allocated physical gold, priced on the same exchange and the same daily UTC candles as
          the crypto side. That matters for the comparison: a spot gold feed would close on weekends while crypto keeps trading, and the
          mismatched days would distort a daily correlation badly. PAXG trades continuously, so every day is a like-for-like pair.
        </p>
        <p className="mb-2">
          The trade-off is that PAXG is a claim on gold rather than gold, and it carries issuer and redemption risk that bullion does not. It
          tracks the exchange&apos;s own gold futures closely — daily returns correlate at roughly 0.99 over their shared period — but it can
          trade at a small premium or discount, and it is not a substitute for the metal in any argument about counterparty risk.
        </p>
        <p>
          Volatility is annualised from daily log returns at {DAYS_PER_YEAR} days per year, matching the rest of this site. Correlations use
          log returns; the stress rows use simple percentage returns so the averages read directly. The window is whatever the two series
          share, so it begins when the later of the two started trading.
        </p>
      </div>

      <div className="text-center mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        <Link href="/crypto/correlation" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          Correlations across the whole market →
        </Link>
        <Link href="/crypto/drawdown" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          How long each drawdown lasted →
        </Link>
      </div>
    </>
  );
}
