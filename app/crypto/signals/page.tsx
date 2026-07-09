'use client';
import { useState, useEffect, useCallback, useMemo, useRef, useReducer } from 'react';
import Link from 'next/link';
import { computeATR, computeTpSl, smaClose, formatPrice, type Direction } from '@/lib/atr';
import { fetchTickers, fetchDailyCandles, mapWithConcurrency, type Market, type Ticker24h } from '@/lib/binance';

// TODO: 실제 초대 링크로 교체
const BINANCE_REF = '#';
const BYBIT_REF = '#';

const PER_PAGE = 50;
const TP_MULT = 1.5;
const SL_MULT = 1.0;

interface AtrInfo {
  atr: number;
  atrPct: number;
  entry: number;
  side: Direction;
  tp: number;
  sl: number;
}

type ListState = 'loading' | 'ready' | 'empty' | 'error';

function pnlOf(side: Direction, entry: number, price: number): number {
  const raw = ((price - entry) / entry) * 100;
  return side === 'long' ? raw : -raw;
}

export default function SignalsPage() {
  const [market, setMarket] = useState<Market>('spot');
  const [listState, setListState] = useState<ListState>('loading');
  const [tickers, setTickers] = useState<Ticker24h[]>([]);
  const [page, setPage] = useState(1);
  const [pageComputing, setPageComputing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  // ATR 계산 결과 캐시: 마켓별로 심볼→정보. undefined=미계산, null=데이터부족
  const cacheRef = useRef<Map<string, AtrInfo | null>>(new Map());
  const [, bump] = useReducer((x: number) => x + 1, 0);

  const totalPages = Math.max(1, Math.ceil(tickers.length / PER_PAGE));
  const pageTickers = useMemo(
    () => tickers.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [tickers, page],
  );

  const loadList = useCallback(async (mkt: Market) => {
    setListState('loading');
    setPage(1);
    cacheRef.current = new Map();
    try {
      const t = await fetchTickers(mkt);
      setTickers(t);
      setUpdatedAt(new Date());
      setListState(t.length ? 'ready' : 'empty');
    } catch {
      setListState('error');
    }
  }, []);

  const computePage = useCallback(async (list: Ticker24h[], mkt: Market) => {
    const todo = list.filter(t => !cacheRef.current.has(t.symbol));
    if (!todo.length) return;
    setPageComputing(true);
    await mapWithConcurrency(todo, 8, async t => {
      let info: AtrInfo | null = null;
      try {
        const candles = await fetchDailyCandles(t.symbol, 30, mkt);
        const atr = computeATR(candles, 14);
        if (atr) {
          const entry = candles[candles.length - 1].close;
          const trend = smaClose(candles, 20);
          const side: Direction = trend == null || entry >= trend ? 'long' : 'short';
          const { tp, sl } = computeTpSl(entry, atr, side, TP_MULT, SL_MULT);
          info = { atr, atrPct: (atr / entry) * 100, entry, side, tp, sl };
        }
      } catch { /* 개별 코인 실패는 무시하고 '-' 처리 */ }
      cacheRef.current.set(t.symbol, info);
    });
    setPageComputing(false);
    bump();
  }, []);

  // 마켓 변경 → 목록 새로 로드
  useEffect(() => { loadList(market); }, [market, loadList]);

  // 목록 준비되거나 페이지 이동 시 → 현재 페이지 ATR 계산
  useEffect(() => {
    if (listState === 'ready' && pageTickers.length) computePage(pageTickers, market);
  }, [listState, pageTickers, market, computePage]);

  const updatedLabel = useMemo(
    () => (updatedAt ? updatedAt.toLocaleString('ko-KR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null),
    [updatedAt],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="border-b border-slate-800 sticky top-0 z-10 bg-slate-950/90 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            코인 도구
          </Link>
          <span className="text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-300">ATR 타점 보드</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 초대 링크 (자리) */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a href={BINANCE_REF} target="_blank" rel="noopener noreferrer"
            className="flex-1 min-w-[140px] text-center rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 font-bold text-sm py-2.5 hover:bg-amber-500/20 transition-colors">
            🔶 바이낸스 가입 (초대 링크)
          </a>
          <a href={BYBIT_REF} target="_blank" rel="noopener noreferrer"
            className="flex-1 min-w-[140px] text-center rounded-xl border border-orange-500/40 bg-orange-500/10 text-orange-300 font-bold text-sm py-2.5 hover:bg-orange-500/20 transition-colors">
            🟠 바이비트 가입 (초대 링크)
          </a>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📈</div>
          <h1 className="text-2xl font-black text-white mb-1.5">ATR 타점 보드</h1>
          <p className="text-slate-400 text-sm">매일 00:00 UTC 일봉으로 확정하는 진입·익절·손절 타점 · 수익률 실시간</p>
        </div>

        {/* 마켓 토글 */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
            {(['spot', 'futures'] as Market[]).map(m => (
              <button
                key={m}
                onClick={() => setMarket(m)}
                className={`px-5 py-1.5 text-sm font-bold rounded-lg transition-colors ${
                  market === m ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m === 'spot' ? '현물 SPOT' : '선물 FUTURES'}
              </button>
            ))}
          </div>
          <button onClick={() => loadList(market)} className="text-xs font-semibold text-slate-500 hover:text-amber-400 transition-colors">
            ↻ 새로고침
          </button>
        </div>

        {(listState === 'loading' || listState === 'empty' || listState === 'error') && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-20 flex flex-col items-center gap-3">
            {listState === 'loading' ? (
              <>
                <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
                <span className="text-sm font-bold text-slate-400">데이터를 불러오는 중...</span>
              </>
            ) : listState === 'error' ? (
              <>
                <span className="text-3xl">⚠️</span>
                <span className="text-sm font-bold text-rose-400">시세를 불러오지 못했어요</span>
                <span className="text-xs text-slate-500">일부 지역에서는 바이낸스 접속이 제한될 수 있어요</span>
                <button onClick={() => loadList(market)} className="mt-2 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl px-4 py-2 transition-colors">다시 시도</button>
              </>
            ) : (
              <>
                <span className="text-3xl">🛠️</span>
                <span className="text-sm font-bold text-slate-300">데이터 업데이트 중</span>
              </>
            )}
          </div>
        )}

        {listState === 'ready' && (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                      <th className="text-left font-semibold px-4 py-3">코인</th>
                      <th className="text-right font-semibold px-2 py-3">진입가</th>
                      <th className="text-right font-semibold px-2 py-3">타겟 TP</th>
                      <th className="text-right font-semibold px-2 py-3">손절 SL</th>
                      <th className="text-right font-semibold px-4 py-3">현재 수익률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageTickers.map((t, i) => {
                      const info = cacheRef.current.get(t.symbol);
                      const pnl = info ? pnlOf(info.side, info.entry, t.lastPrice) : null;
                      const pending = info === undefined; // 아직 계산 안 됨
                      return (
                        <tr key={t.symbol} className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600 text-xs tabular-nums">{(page - 1) * PER_PAGE + i + 1}</span>
                              <span className="font-bold text-white">{t.base}</span>
                              {info && (
                                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${info.side === 'long' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                                  {info.side === 'long' ? 'LONG' : 'SHORT'}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500">{info ? `ATR ${info.atrPct.toFixed(1)}%` : pending ? '계산 중…' : '데이터 부족'}</span>
                          </td>
                          <td className="px-2 py-3 text-right text-slate-300 tabular-nums">{info ? formatPrice(info.entry) : pending ? '…' : '-'}</td>
                          <td className="px-2 py-3 text-right text-emerald-400 tabular-nums">{info ? formatPrice(info.tp) : pending ? '…' : '-'}</td>
                          <td className="px-2 py-3 text-right text-rose-400 tabular-nums">{info ? formatPrice(info.sl) : pending ? '…' : '-'}</td>
                          <td className="px-4 py-3 text-right tabular-nums font-bold">
                            {pnl == null ? (
                              <span className="text-slate-600">{pending ? '…' : '-'}</span>
                            ) : (
                              <span className={pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                                {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}%
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
                <span>{market === 'spot' ? '현물' : '선물'} 전체 {tickers.length}개 · TP {TP_MULT}×ATR · SL {SL_MULT}×ATR{pageComputing ? ' · 계산 중…' : ''}</span>
                {updatedLabel && <span>🕒 {updatedLabel} 기준</span>}
              </div>
            </div>

            {/* 페이지네이션 */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setPage(1)} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors"
              >« 처음</button>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors"
              >‹ 이전</button>
              <span className="px-3 text-sm font-bold text-slate-300 tabular-nums">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors"
              >다음 ›</button>
              <button
                onClick={() => setPage(totalPages)} disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors"
              >끝 »</button>
            </div>
          </>
        )}

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-500 leading-relaxed">
          <p className="mb-1">⚠️ 본 데이터는 투자 자문이 아닌 참고용 계산 결과이며, 매매 판단과 책임은 전적으로 본인에게 있습니다.</p>
          <p>진입가·TP·SL은 매일 00:00 UTC에 마감된 일봉 기준으로 확정되어 하루 동안 고정되며, 현재 수익률은 페이지를 열 때(새로고침 시)마다 실시간 가격으로 계산됩니다(방향 LONG/SHORT 반영).</p>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">🔄 새로고침하면 최신 가격으로 다시 계산됩니다 · 바이낸스 공개 시세 기준</p>
      </div>
    </div>
  );
}
