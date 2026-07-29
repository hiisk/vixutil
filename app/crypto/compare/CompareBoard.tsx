'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchTicker, fetchDailyCandles } from '@/lib/binance';
import { buildForecast, volatilityLabel, type ForecastModel } from '@/lib/forecast';
import { athInfo, type AthInfo } from '@/lib/ath';
import { maxDrawdownPct } from '@/lib/seasonality';
import { logReturns, pearson, downsideCapture, corrLabel } from '@/lib/correlation';
import { periodReturn } from '@/lib/altseason';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo, Pct } from '@/components/crypto/ui';

/** 비교에 쓸 이력 — 바이낸스 1회 요청 상한 */
const HISTORY_DAYS = 998;
/** 수익률을 비교할 구간 (일) */
const WINDOWS: [string, number][] = [['30D', 30], ['90D', 90], ['1Y', 365], ['2Y', 730]];
const SUGGEST_LIMIT = 8;
const CRASH_PCT = 3;

type State = 'loading' | 'ready' | 'error';

interface Side {
  coin: CoinMeta;
  price: number;
  chg24h: number;
  closes: number[];
  rets: number[];
  model: ForecastModel | null;
  ath: AthInfo | null;
  maxDd: number | null;
}

interface Snapshot {
  a: Side;
  b: Side;
  /** 두 코인 사이 상관계수 */
  corr: number | null;
  /** BTC 급락일에 각자 얼마나 빠졌나 */
  downA: ReturnType<typeof downsideCapture>;
  downB: ReturnType<typeof downsideCapture>;
  overlapDays: number;
}

const inputCls =
  'w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition';

const signed = (v: number | null | undefined, d = 1) =>
  v == null || !isFinite(v) ? '—' : `${v >= 0 ? '+' : ''}${v.toFixed(d)}%`;

/** 두 값 중 어느 쪽이 나은지 강조 — 방향은 지표마다 다르다 */
function betterCls(mine: number | null, other: number | null, higherIsBetter: boolean): string {
  if (mine == null || other == null || !isFinite(mine) || !isFinite(other) || mine === other) {
    return 'text-slate-900 dark:text-white';
  }
  const win = higherIsBetter ? mine > other : mine < other;
  return win ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300';
}

function CoinPicker({
  label, id, coin, onPick,
}: { label: string; id: string; coin: CoinMeta; onPick: (c: CoinMeta) => void }) {
  const [query, setQuery] = useState('');
  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base.startsWith(q) || c.name.toUpperCase().includes(q)).slice(0, SUGGEST_LIMIT);
  }, [query]);

  return (
    <div className="flex-1 min-w-[200px]">
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor={id}>{label}</label>
      <div className="relative">
        <input id={id} type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder={`${coin.base} · search`} className={inputCls} autoComplete="off" />
        {suggestions.length > 0 && (
          <ul className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
            {suggestions.map(c => (
              <li key={c.slug}>
                <button type="button" onClick={() => { onPick(c); setQuery(''); }}
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
    </div>
  );
}

export default function CompareBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slugA, setSlugA] = useState('bitcoin');
  const [slugB, setSlugB] = useState('ethereum');

  const coinA = useMemo(() => COINS.find(c => c.slug === slugA) ?? COINS.find(c => c.base === 'BTC')!, [slugA]);
  const coinB = useMemo(() => COINS.find(c => c.slug === slugB) ?? COINS.find(c => c.base === 'ETH')!, [slugB]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const build = async (coin: CoinMeta, btcCloses: number[] | undefined) => {
        const [k, t] = await Promise.all([
          fetchDailyCandles(symbolOf(coin), HISTORY_DAYS, marketOf(coin)),
          fetchTicker(symbolOf(coin), marketOf(coin)),
        ]);
        const closes = k.map(x => x.close);
        const price = t?.lastPrice ?? closes[closes.length - 1];
        return {
          coin, price,
          chg24h: t?.priceChangePercent ?? 0,
          closes,
          rets: logReturns(closes),
          model: buildForecast(closes, price, btcCloses),
          ath: athInfo(closes, price),
          maxDd: maxDrawdownPct(closes),
        } as Side;
      };

      const btc = await fetchDailyCandles('BTCUSDT', HISTORY_DAYS, 'spot').catch(() => []);
      const btcCloses = btc.length ? btc.map(x => x.close) : undefined;
      const btcRets = btcCloses ? logReturns(btcCloses) : [];

      const [a, b] = await Promise.all([build(coinA, btcCloses), build(coinB, btcCloses)]);
      if (a.closes.length < 40 || b.closes.length < 40) { setState('error'); return; }

      setSnap({
        a, b,
        corr: pearson(a.rets, b.rets, 30),
        downA: downsideCapture(a.rets, btcRets, CRASH_PCT),
        downB: downsideCapture(b.rets, btcRets, CRASH_PCT),
        overlapDays: Math.min(a.closes.length, b.closes.length),
      });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coinA, coinB]);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading both coins…</span>
      </div>
    );
  }

  if (state === 'error' || !snap) {
    return (
      <div role="alert" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load one of these coins</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  const { a, b } = snap;

  /** 각 구간 수익률 — 창을 바꾸면 승자가 바뀐다는 것을 보여주기 위해 전부 낸다 */
  const windowRows = WINDOWS.map(([label, d]) => ({
    label,
    days: d,
    ra: periodReturn(a.closes, d),
    rb: periodReturn(b.closes, d),
  })).filter(r => r.ra != null || r.rb != null);

  const flips = (() => {
    const winners = windowRows
      .filter(r => r.ra != null && r.rb != null)
      .map(r => (r.ra! > r.rb! ? 'a' : 'b'));
    return new Set(winners).size > 1;
  })();

  const METRICS: { label: string; note: string; va: number | null; vb: number | null; fmt: (v: number | null) => string; higherIsBetter: boolean }[] = [
    {
      label: 'Annualised volatility', note: 'lower is calmer, not better',
      va: a.model?.annualVolPct ?? null, vb: b.model?.annualVolPct ?? null,
      fmt: v => (v == null ? '—' : `${v.toFixed(0)}%`), higherIsBetter: false,
    },
    {
      label: 'Beta to Bitcoin', note: '1.0 moves with BTC',
      va: a.model?.hasMarket ? a.model.beta : null, vb: b.model?.hasMarket ? b.model.beta : null,
      fmt: v => (v == null ? '—' : v.toFixed(2)), higherIsBetter: false,
    },
    {
      label: 'Below all-time high', note: 'daily closes on Binance',
      va: a.ath ? -a.ath.drawdownPct : null, vb: b.ath ? -b.ath.drawdownPct : null,
      fmt: v => (v == null ? '—' : `${v.toFixed(1)}%`), higherIsBetter: true,
    },
    {
      label: 'Gain needed to recover', note: 'not the mirror of the drop',
      va: a.ath ? a.ath.gainToRecoverPct : null, vb: b.ath ? b.ath.gainToRecoverPct : null,
      fmt: v => (v == null ? '—' : `+${v.toFixed(0)}%`), higherIsBetter: false,
    },
    {
      label: 'Worst drawdown ever', note: 'peak to trough in this history',
      va: a.maxDd != null ? -a.maxDd : null, vb: b.maxDd != null ? -b.maxDd : null,
      fmt: v => (v == null ? '—' : `${v.toFixed(1)}%`), higherIsBetter: true,
    },
    {
      label: `Median move on BTC −${CRASH_PCT}% days`, note: 'what happens when it breaks',
      va: snap.downA.assetMedianPct, vb: snap.downB.assetMedianPct,
      fmt: v => (v == null ? '—' : `${v.toFixed(2)}%`), higherIsBetter: true,
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <CoinPicker label="First coin" id="cmp-a" coin={coinA} onPick={c => setSlugA(c.slug)} />
          <span className="pb-3 text-sm font-black text-slate-400 dark:text-slate-500">vs</span>
          <CoinPicker label="Second coin" id="cmp-b" coin={coinB} onPick={c => setSlugB(c.slug)} />
        </div>
      </div>

      {/* 헤드라인 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[a, b].map(s => (
          <div key={s.coin.slug} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-2.5 mb-2">
              <CoinLogo base={s.coin.base} size={28} />
              <div className="min-w-0">
                <Link href={`/crypto/${s.coin.slug}/price-prediction`} className="block font-black text-slate-900 dark:text-white truncate hover:text-amber-600 dark:hover:text-amber-400">
                  {s.coin.base}
                </Link>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{s.coin.name}</p>
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">${formatPrice(s.price)}</p>
            <p className="text-xs"><Pct value={s.chg24h} /> <span className="text-slate-500 dark:text-slate-400">24h</span></p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              {s.model ? `${volatilityLabel(s.model.annualVolPct)} volatility · ${s.closes.length} days of data` : `${s.closes.length} days of data`}
            </p>
          </div>
        ))}
      </div>

      {/* 구간별 수익률 — 창을 바꾸면 승자가 바뀐다 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Return over different windows</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {flips
              ? 'The winner changes depending on the window — which is why a single "X vs Y" number decides nothing.'
              : 'One coin leads across every window here, which is unusual and still window-dependent.'}
          </p>
        </div>
        <div className="scroll-x overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Window</th>
                <th scope="col" className="text-right font-semibold px-4 py-3">{a.coin.base}</th>
                <th scope="col" className="text-right font-semibold px-4 py-3">{b.coin.base}</th>
                <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Lead</th>
              </tr>
            </thead>
            <tbody>
              {windowRows.map(r => {
                const both = r.ra != null && r.rb != null;
                const gap = both ? r.ra! - r.rb! : null;
                return (
                  <tr key={r.days} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                    <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200">{r.label}</td>
                    <td className={`px-4 py-2.5 text-right tabular-nums font-bold ${betterCls(r.ra, r.rb, true)}`}>{signed(r.ra)}</td>
                    <td className={`px-4 py-2.5 text-right tabular-nums font-bold ${betterCls(r.rb, r.ra, true)}`}>{signed(r.rb)}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400 border-l border-slate-200/40 dark:border-slate-700/40">
                      {gap != null ? `${gap >= 0 ? a.coin.base : b.coin.base} by ${Math.abs(gap).toFixed(1)}%p` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 위험 지표 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Risk side by side</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Return comparisons get all the attention; these are the numbers that decide whether you can hold the position.
          </p>
        </div>
        <div className="scroll-x overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Measure</th>
                <th scope="col" className="text-right font-semibold px-4 py-3">{a.coin.base}</th>
                <th scope="col" className="text-right font-semibold px-4 py-3">{b.coin.base}</th>
              </tr>
            </thead>
            <tbody>
              {METRICS.map(m => (
                <tr key={m.label} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                  <td className="px-4 py-2.5">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{m.label}</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">{m.note}</span>
                  </td>
                  <td className={`px-4 py-2.5 text-right tabular-nums font-bold ${betterCls(m.va, m.vb, m.higherIsBetter)}`}>{m.fmt(m.va)}</td>
                  <td className={`px-4 py-2.5 text-right tabular-nums font-bold ${betterCls(m.vb, m.va, m.higherIsBetter)}`}>{m.fmt(m.vb)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Green marks the better figure for that row only, and &quot;better&quot; is not always obvious — lower volatility is calmer but also
          means smaller moves in both directions. Beta and drawdowns are computed over the last {snap.overlapDays.toLocaleString()} days of
          overlapping history, so a recently listed coin is being judged on a shorter and easier sample than an older one.
        </div>
      </div>

      {/* 상관계수 — 비교의 전제를 무너뜨리는 부분 */}
      {snap.corr != null && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
          <h2 className="text-sm font-black text-amber-900 dark:text-amber-200 mb-1.5">
            These two move together at {snap.corr.toFixed(2)} — {corrLabel(snap.corr)}
          </h2>
          <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
            {Math.abs(snap.corr) >= 0.7
              ? `Most of what separates ${a.coin.base} and ${b.coin.base} day to day is size of move, not direction. Choosing between them is closer to choosing how much exposure you want than to choosing a different bet, and holding both is not diversification.`
              : `${a.coin.base} and ${b.coin.base} are only loosely linked, which is unusual among crypto assets and makes the comparison more meaningful than most.`}
            {snap.downA.capture != null && snap.downB.capture != null && (
              <> On the {snap.downA.days} days Bitcoin fell more than {CRASH_PCT}%, {a.coin.base} moved{' '}
              {snap.downA.assetMedianPct!.toFixed(2)}% and {b.coin.base} moved {snap.downB.assetMedianPct!.toFixed(2)}% at the median.</>
            )}
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">Why &quot;which is better&quot; has no answer here</h2>
        <p className="mb-2">
          Every comparison of two assets is a comparison over a window, and the window usually decides the result. That is why the returns
          table shows several rather than one: if the lead changes between 30 days and two years, then any single figure was a choice of
          window dressed up as a finding.
        </p>
        <p>
          Past performance is also the weakest of the numbers on this page. Volatility persists to a useful degree, drawdowns tell you what
          the asset has already put holders through, and correlation tells you whether owning both is really one position. Those describe the
          asset. The return column describes a period that has already happened.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/correlation" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See the full correlation matrix →
        </Link>
      </div>
    </>
  );
}
