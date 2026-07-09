'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';

/** GitHub Actions가 3시간마다 갱신하는 data 브랜치의 신호 JSON */
const SIGNALS_URL = 'https://raw.githubusercontent.com/hiisk/vixutil/data/signals.json';
const SPOT_PRICE_URL = 'https://data-api.binance.vision/api/v3/ticker/price';
const FUT_PRICE_URL = 'https://fapi.binance.com/fapi/v1/ticker/price';

// TODO: 실제 초대 링크로 교체
const BINANCE_REF = '#';
const BYBIT_REF = '#';

interface Signal {
  symbol: string;
  base: string;
  side: 'long' | 'short';
  entry: number;
  tp: number;
  sl: number;
  atr: number;
  atrPct: number;
  change24h: number;
}
interface SignalsPayload {
  generatedAt: string;
  tpMult: number;
  slMult: number;
  spot: Signal[];
  futures: Signal[];
}

type Market = 'spot' | 'futures';
type LoadState = 'loading' | 'ready' | 'empty' | 'error';

function pnlPercent(sig: Signal, live: number): number | null {
  if (!live || !sig.entry) return null;
  const raw = ((live - sig.entry) / sig.entry) * 100;
  return sig.side === 'long' ? raw : -raw;
}

export default function SignalsPage() {
  const [state, setState] = useState<LoadState>('loading');
  const [data, setData] = useState<SignalsPayload | null>(null);
  const [market, setMarket] = useState<Market>('spot');
  const [prices, setPrices] = useState<Record<string, number>>({});

  const loadSignals = useCallback(async () => {
    setState('loading');
    try {
      const res = await fetch(`${SIGNALS_URL}?t=${Date.now()}`);
      if (!res.ok) { setState('empty'); return; }
      const json: SignalsPayload = await res.json();
      setData(json);
      setState(json.spot?.length || json.futures?.length ? 'ready' : 'empty');
    } catch {
      setState('empty');
    }
  }, []);

  const loadPrices = useCallback(async (mkt: Market) => {
    try {
      const res = await fetch(mkt === 'spot' ? SPOT_PRICE_URL : FUT_PRICE_URL);
      if (!res.ok) return;
      const arr: { symbol: string; price: string }[] = await res.json();
      const map: Record<string, number> = {};
      for (const p of arr) map[p.symbol] = Number(p.price);
      setPrices(map);
    } catch { /* 실시간 가격 실패 시 수익률만 '-'로 표시 */ }
  }, []);

  useEffect(() => { loadSignals(); }, [loadSignals]);
  useEffect(() => { loadPrices(market); }, [market, loadPrices]);

  const rows = useMemo(() => (data ? data[market] ?? [] : []), [data, market]);

  const updatedLabel = useMemo(() => {
    if (!data?.generatedAt) return null;
    const d = new Date(data.generatedAt);
    return d.toLocaleString('ko-KR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      {/* 헤더 */}
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

        {/* 타이틀 */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📈</div>
          <h1 className="text-2xl font-black text-white mb-1.5">ATR 타점 보드</h1>
          <p className="text-slate-400 text-sm">UTC 일봉 ATR로 계산한 거래량 상위 코인의 진입·익절·손절 타점</p>
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
          <button onClick={() => { loadSignals(); loadPrices(market); }} className="text-xs font-semibold text-slate-500 hover:text-amber-400 transition-colors">
            ↻ 새로고침
          </button>
        </div>

        {/* 로딩 / 데이터 없음 */}
        {(state === 'loading' || state === 'empty') && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-20 flex flex-col items-center gap-3">
            {state === 'loading' ? (
              <>
                <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
                <span className="text-sm font-bold text-slate-400">데이터를 불러오는 중...</span>
              </>
            ) : (
              <>
                <span className="text-3xl">🛠️</span>
                <span className="text-sm font-bold text-slate-300">데이터 업데이트 중</span>
                <span className="text-xs text-slate-500">잠시 후 다시 확인해주세요</span>
              </>
            )}
          </div>
        )}

        {/* 신호 테이블 */}
        {state === 'ready' && (
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
                  {rows.map(sig => {
                    const live = prices[sig.symbol];
                    const pnl = live != null ? pnlPercent(sig, live) : null;
                    return (
                      <tr key={sig.symbol} className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{sig.base}</span>
                            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${sig.side === 'long' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                              {sig.side === 'long' ? 'LONG' : 'SHORT'}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">ATR {sig.atrPct.toFixed(1)}%</span>
                        </td>
                        <td className="px-2 py-3 text-right text-slate-300 tabular-nums">{formatPrice(sig.entry)}</td>
                        <td className="px-2 py-3 text-right text-emerald-400 tabular-nums">{formatPrice(sig.tp)}</td>
                        <td className="px-2 py-3 text-right text-rose-400 tabular-nums">{formatPrice(sig.sl)}</td>
                        <td className="px-4 py-3 text-right tabular-nums font-bold">
                          {pnl == null ? (
                            <span className="text-slate-600">-</span>
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
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
              <span>거래량 상위 {rows.length}개 · TP {data?.tpMult}×ATR · SL {data?.slMult}×ATR</span>
              {updatedLabel && <span>최근 실행: {updatedLabel}</span>}
            </div>
          </div>
        )}

        {/* 면책 + 자동 갱신 문구 */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-500 leading-relaxed">
          <p className="mb-1">⚠️ 본 데이터는 투자 자문이 아닌 참고용 계산 결과이며, 매매 판단과 책임은 전적으로 본인에게 있습니다.</p>
          <p>현재 수익률은 진입가(신호 생성 시점 종가) 대비 실시간 가격 기준이며, 방향(LONG/SHORT)을 반영합니다.</p>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">🕒 UTC 기준 매 3시간마다 자동 업데이트됩니다</p>
      </div>
    </div>
  );
}
