'use client';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { fetchDailyCandles, type Market } from '@/lib/binance';
import { STRATEGIES, STRATEGY_META, type StrategyKey } from '@/lib/strategies';
import {
  walkForward, mergeScores, hitEdgeStdErrPP, verdict, VERDICT_LABEL,
  LOOKBACK, MAX_HOLD, type StrategyScore, type Verdict,
} from '@/lib/scorecard';
import type { Candle } from '@/lib/atr';

/**
 * 보드 성적표.
 *
 * 이 페이지는 매일 방향과 TP/SL을 내놓는다. 그게 맞았는지는 아무도 확인하지 않는다.
 * 이 패널이 같은 코드로 만든 신호를 과거에 그대로 적용해(미래 정보 없이) 채점한다.
 *
 * 계산은 무겁다 — 코인당 5개 키 × 수백 일 × 지표 계산. 그래서
 *   · 채점 코인을 TARGET_COINS개로 끊고
 *   · 코인 하나 끝날 때마다 이벤트 루프에 양보해 화면이 멈추지 않게 하고
 *   · 진행률을 보여준다
 * 캔들은 보드가 쓰는 것과 같은 엔드포인트라 캐시가 대부분 재사용된다.
 */

/**
 * 채점에 쓸 코인 수 — 많을수록 오차가 좁아지지만 느리다.
 *
 * 거래량 상위를 그냥 앞에서 자르면 안 된다. 선물 거래량 상위에는 최근 상장된
 * 토큰화 주식 무기한(QQQ·NVDA 등)이 섞여 있고 이력이 200일도 안 돼서 채점에서
 * 전부 탈락한다. 실제로 그렇게 만들었더니 12개 중 2개만 남아 오차가 ±5%p로
 * 벌어졌다. 그래서 **이력이 충분한 코인이 목표치를 채울 때까지** 내려간다.
 */
const TARGET_COINS = 10;
/** 그렇게 내려가며 시도해 볼 최대 코인 수 */
const MAX_ATTEMPTS = 26;
/** 코인당 검정할 최근 일수 */
const WINDOW = 500;
/** 지표 워밍업 + 검정 구간 + 청산 여유 */
const NEED = LOOKBACK + WINDOW + MAX_HOLD + 5;
/** 이 정도는 있어야 채점할 값어치가 있다 */
const MIN_CANDLES = LOOKBACK + MAX_HOLD + 60;

type Key = StrategyKey | 'consensus';
const KEYS: Key[] = [...STRATEGIES, 'consensus'];

const LABEL: Record<Key, string> = {
  trend: STRATEGY_META.trend.label,
  bollinger: STRATEGY_META.bollinger.label,
  rsi: STRATEGY_META.rsi.label,
  atr: STRATEGY_META.atr.label,
  consensus: 'Consensus',
};

const VERDICT_TONE: Record<Verdict, string> = {
  'no-edge': 'text-slate-500 dark:text-slate-400',
  'hit-only': 'text-amber-600 dark:text-amber-400',
  'real-edge': 'text-emerald-600 dark:text-emerald-400',
  worse: 'text-rose-600 dark:text-rose-400',
};

interface Row {
  key: Key;
  merged: StrategyScore;
  stdErrPP: number | null;
  /** 코인별 적중률 차이 — 하나만 보면 안 되는 이유를 보여주기 위한 것 */
  perCoinEdges: number[];
}

export default function Scorecard({ symbols, market }: { symbols: string[]; market: Market }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [coinCount, setCoinCount] = useState(0);
  const runId = useRef(0);

  const basket = useMemo(() => symbols.slice(0, MAX_ATTEMPTS), [symbols]);

  const run = useCallback(async () => {
    if (!basket.length) return;
    const id = ++runId.current;
    setState('running');
    setProgress(0);
    setRows(null);

    try {
      const perCoin: Record<Key, (StrategyScore | null)[]> = {
        trend: [], bollinger: [], rsi: [], atr: [], consensus: [],
      };
      let used = 0;

      // 이력이 충분한 코인이 TARGET_COINS개 모일 때까지 거래량 순으로 내려간다.
      // 신규 상장은 조용히 건너뛴다 — 표본이 없는 코인을 억지로 넣으면 오차만 커진다.
      for (let i = 0; i < basket.length && used < TARGET_COINS; i++) {
        if (runId.current !== id) return; // 시장이 바뀌면 이전 실행을 버린다
        let candles: Candle[] = [];
        try {
          candles = await fetchDailyCandles(basket[i], NEED, market);
        } catch { /* 이 코인만 건너뛴다 */ }

        if (candles.length >= MIN_CANDLES) {
          used++;
          for (const k of KEYS) {
            perCoin[k].push(walkForward(candles, k, market, { window: WINDOW }));
          }
          setProgress(used);
        }
        // 코인 하나마다 양보 — 안 그러면 몇 초간 화면이 얼어붙는다
        await new Promise(r => setTimeout(r, 0));
      }

      if (runId.current !== id) return;
      const out: Row[] = [];
      for (const k of KEYS) {
        const merged = mergeScores(perCoin[k]);
        if (!merged) continue;
        out.push({
          key: k,
          merged,
          stdErrPP: hitEdgeStdErrPP(merged.signal.trades, merged.baseline.trades),
          perCoinEdges: perCoin[k].filter((s): s is StrategyScore => s != null).map(s => s.hitEdgePP),
        });
      }
      setCoinCount(used);
      setRows(out);
      setState(out.length ? 'done' : 'error');
    } catch {
      if (runId.current === id) setState('error');
    }
  }, [basket, market]);

  // 시장이나 바스켓이 바뀌면 다시 채점한다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { run(); }, [run]);

  const consensus = rows?.find(r => r.key === 'consensus');
  const spread = consensus?.perCoinEdges ?? [];
  const anyRealEdge = rows?.some(r => verdict(r.merged.hitEdgePP, r.merged.expectancyEdgeR, r.stdErrPP) === 'real-edge');

  return (
    <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-sm font-black text-slate-900 dark:text-white">Does this board work?</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          The same signal code, replayed day by day with no future information, and graded against buying every day instead.
          {state === 'done' && coinCount > 0 && (
            <> Pooled over <b className="tabular-nums">{coinCount}</b> coins with enough history, {WINDOW} days each.</>
          )}
        </p>
      </div>

      {state === 'running' && (
        <div className="px-5 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <span role="status">Grading {progress} / {TARGET_COINS} coins…</span>
        </div>
      )}

      {state === 'error' && (
        <div className="px-5 py-6 text-center text-sm">
          <span className="text-rose-600 dark:text-rose-400 font-bold">Couldn’t grade the signals</span>
          <button type="button" onClick={run} className="ml-2 font-bold text-amber-600 dark:text-amber-400 hover:underline">Retry</button>
        </div>
      )}

      {state === 'done' && rows && (
        <>
          <div className="scroll-x overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th scope="col" className="text-left font-semibold px-4 py-3">Strategy</th>
                  <th scope="col" className="text-right font-semibold px-3 py-3">Trades</th>
                  <th scope="col" className="text-right font-semibold px-3 py-3">Hit rate</th>
                  <th scope="col" className="text-right font-semibold px-3 py-3">Always-long</th>
                  <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Difference</th>
                  <th scope="col" className="text-right font-semibold px-3 py-3">Per trade vs long</th>
                  <th scope="col" className="text-right font-semibold px-4 py-3">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => {
                  const m = r.merged;
                  const v = verdict(m.hitEdgePP, m.expectancyEdgeR, r.stdErrPP);
                  return (
                    <tr key={r.key}
                      className={`border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 ${
                        r.key === 'consensus' ? 'bg-amber-50 dark:bg-amber-500/[0.06]' : ''
                      }`}>
                      <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200">
                        {LABEL[r.key]}
                        {r.key === 'consensus' && (
                          <>
                            {' '}
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400">
                              shown on the board
                            </span>
                          </>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400">
                        {m.signal.trades.toLocaleString()}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-bold text-slate-800 dark:text-slate-100">
                        {m.signal.nextDayHitPct.toFixed(1)}%
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400">
                        {m.baseline.nextDayHitPct.toFixed(1)}%
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 text-slate-600 dark:text-slate-300">
                        {m.hitEdgePP >= 0 ? '+' : '−'}{Math.abs(m.hitEdgePP).toFixed(1)}
                        {r.stdErrPP != null && (
                          <span className="text-slate-400 dark:text-slate-500 text-[11px]"> ±{(2 * r.stdErrPP).toFixed(1)}</span>
                        )}
                        <span className="text-[11px] ml-0.5">pp</span>
                      </td>
                      {/* 적중률 열과 기준을 맞춘다. 여기만 절대값을 쓰면
                          "기대값 +0.058R인데 판정은 no richer"처럼 앞뒤가 안 맞아 보인다. */}
                      <td className={`px-3 py-2.5 text-right tabular-nums ${
                        m.expectancyEdgeR > 0.02 ? 'text-emerald-600 dark:text-emerald-400'
                          : m.expectancyEdgeR < -0.02 ? 'text-rose-600 dark:text-rose-400'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {m.expectancyEdgeR >= 0 ? '+' : '−'}{Math.abs(m.expectancyEdgeR).toFixed(3)}
                        <span className="text-[11px] ml-0.5">R</span>
                      </td>
                      <td className={`px-4 py-2.5 text-right text-[11px] font-bold ${VERDICT_TONE[v]}`}>
                        {VERDICT_LABEL[v]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[80ch]">
            <p className="mb-2">
              {anyRealEdge ? (
                <>At least one strategy beats always-long on both hit rate and money over this sample. Treat that as a hypothesis worth
                re-checking rather than a result — this is one exchange, one timeframe, and one window.</>
              ) : (
                <>
                  <b className="text-slate-700 dark:text-slate-200">Nothing here beats simply buying every day.</b> Where a hit rate does
                  edge above the baseline, the money column does not follow: the take-profit sits 1.5 ATR away and the stop 1.0 ATR away, so
                  being right slightly more often is not enough to pay for being wrong. Both comparison columns are measured against the
                  same always-long baseline, in R, where 1R is the distance to the stop.
                </>
              )}
            </p>
            {spread.length >= 3 && (
              <p className="mb-2">
                Per-coin, the consensus difference ranges from{' '}
                <b className="tabular-nums">{Math.min(...spread) >= 0 ? '+' : '−'}{Math.abs(Math.min(...spread)).toFixed(1)}pp</b> to{' '}
                <b className="tabular-nums">{Math.max(...spread) >= 0 ? '+' : '−'}{Math.abs(Math.max(...spread)).toFixed(1)}pp</b> across the
                same {coinCount} coins. Picking the best of those and calling it a track record is the most common way these boards get
                oversold, which is why the pooled figure is the one reported above.
              </p>
            )}
            <p>
              Method: for each day the signal is built from prior candles only, then the trade is walked forward up to {MAX_HOLD} days to see
              whether the take-profit or the stop is reached first. Days where both are touched in the same candle cannot be ordered from
              daily data and are counted as losses ({consensus ? consensus.merged.signal.ambiguousPct.toFixed(1) : '0'}% of trades).
              Neutral signals are not traded and are excluded, so the trade count is lower than the day count. Fees, funding and slippage are
              excluded, all of which make live results worse than this.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
