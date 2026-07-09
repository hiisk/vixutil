'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { computeATR, computeTpSl, formatPrice, type Direction } from '@/lib/atr';
import { fetchTopSymbols, fetchDailyCandles, mapWithConcurrency } from '@/lib/binance';

interface Row {
  rank: number;
  symbol: string;
  base: string;
  lastPrice: number;
  priceChangePercent: number;
  atr: number | null;
  atrPct: number | null;
}

type LoadState = 'loading' | 'ready' | 'error';

const inputCls = 'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition';

export default function AtrTpslPage() {
  const [state, setState] = useState<LoadState>('loading');
  const [rows, setRows] = useState<Row[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [entry, setEntry] = useState('');
  const [direction, setDirection] = useState<Direction>('long');
  const [tpMult, setTpMult] = useState('1.5');
  const [slMult, setSlMult] = useState('1');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const tops = await fetchTopSymbols(20);
      const candlesList = await mapWithConcurrency(tops, 6, async t => {
        try { return await fetchDailyCandles(t.symbol, 20); } catch { return null; }
      });
      const next: Row[] = tops.map((t, i) => {
        const candles = candlesList[i];
        const atr = candles ? computeATR(candles, 14) : null;
        return {
          rank: i + 1,
          symbol: t.symbol,
          base: t.base,
          lastPrice: t.lastPrice,
          priceChangePercent: t.priceChangePercent,
          atr,
          atrPct: atr && t.lastPrice > 0 ? (atr / t.lastPrice) * 100 : null,
        };
      });
      setRows(next);
      setUpdatedAt(new Date());
      setState('ready');
      if (!selected && next.length) {
        setSelected(next[0].symbol);
        setEntry(String(next[0].lastPrice));
      }
    } catch {
      setState('error');
    }
  }, [selected]);

  useEffect(() => { load(); /* 최초 1회 */ // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedRow = useMemo(() => rows.find(r => r.symbol === selected) ?? null, [rows, selected]);

  function pickRow(row: Row) {
    setSelected(row.symbol);
    setEntry(String(row.lastPrice));
  }

  const calc = useMemo(() => {
    const e = Number(entry);
    const atr = selectedRow?.atr;
    const tm = Number(tpMult);
    const sm = Number(slMult);
    if (!e || !atr || !tm || sm <= 0) return null;
    return computeTpSl(e, atr, direction, tm, sm);
  }, [entry, selectedRow, direction, tpMult, slMult]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            코인 도구
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">ATR TP/SL 세팅</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📊</div>
          <h1 className="text-2xl font-black text-slate-900 mb-1.5">ATR 기반 TP/SL 세팅</h1>
          <p className="text-slate-500 text-sm">바이낸스 거래량 상위 코인의 일봉 ATR(14)로 익절·손절 가격을 계산해요</p>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 text-xs text-amber-800 leading-relaxed">
          <p className="font-bold mb-1">⚠️ 투자 자문이 아니에요</p>
          <p>바이낸스 공개 시세를 브라우저에서 직접 받아 ATR(평균 변동폭)을 계산하는 도구입니다. TP/SL은 변동성 기반 참고 수치일 뿐, 어떤 매매도 권유하지 않으며 투자 판단과 책임은 본인에게 있습니다.</p>
        </div>

        {/* 변동성 랭킹 테이블 */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">거래량 상위 20 · 일봉 ATR</p>
            <button
              onClick={load}
              disabled={state === 'loading'}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 disabled:text-slate-300 transition-colors"
            >
              {state === 'loading' ? '불러오는 중…' : '↻ 새로고침'}
            </button>
          </div>

          {state === 'loading' && (
            <div className="py-16 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
              <span className="text-sm font-bold text-slate-500">바이낸스에서 시세를 불러오는 중...</span>
            </div>
          )}

          {state === 'error' && (
            <div className="py-12 px-4 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl">⚠️</span>
              <span className="text-sm font-bold text-rose-600">시세를 불러오지 못했어요</span>
              <span className="text-xs text-rose-400">네트워크 상태를 확인하고 새로고침 해주세요. 일부 지역에서는 바이낸스 접속이 제한될 수 있어요.</span>
              <button onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">다시 시도</button>
            </div>
          )}

          {state === 'ready' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] text-slate-400 border-b border-slate-100">
                    <th className="text-left font-semibold px-4 py-2">#</th>
                    <th className="text-left font-semibold px-2 py-2">코인</th>
                    <th className="text-right font-semibold px-2 py-2">현재가</th>
                    <th className="text-right font-semibold px-2 py-2">24h</th>
                    <th className="text-right font-semibold px-4 py-2">ATR%</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr
                      key={r.symbol}
                      onClick={() => pickRow(r)}
                      className={`border-b border-slate-50 cursor-pointer transition-colors ${selected === r.symbol ? 'bg-amber-50' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-4 py-2.5 text-slate-400">{r.rank}</td>
                      <td className="px-2 py-2.5 font-bold text-slate-800">{r.base}<span className="text-slate-300 font-medium">/USDT</span></td>
                      <td className="px-2 py-2.5 text-right text-slate-700">{formatPrice(r.lastPrice)}</td>
                      <td className={`px-2 py-2.5 text-right font-semibold ${r.priceChangePercent >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {r.priceChangePercent >= 0 ? '+' : ''}{r.priceChangePercent.toFixed(2)}%
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-amber-600">{r.atrPct != null ? r.atrPct.toFixed(2) + '%' : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {updatedAt && (
                <p className="text-[11px] text-slate-300 px-4 py-2 text-right">
                  {updatedAt.toLocaleTimeString('ko-KR')} 기준 · 행을 누르면 아래 계산기에 반영돼요
                </p>
              )}
            </div>
          )}
        </div>

        {/* TP/SL 계산기 */}
        {selectedRow && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">TP/SL 계산</p>
              <span className="text-sm font-black text-slate-800">{selectedRow.base}/USDT</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="col-span-2 flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
                <span className="text-xs text-slate-500">일봉 ATR(14)</span>
                <span className="text-sm font-bold text-slate-800">
                  {selectedRow.atr != null ? formatPrice(selectedRow.atr) : '-'}
                  {selectedRow.atrPct != null && <span className="text-amber-600"> ({selectedRow.atrPct.toFixed(2)}%)</span>}
                </span>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">진입가 (USDT)</label>
                <input type="number" value={entry} onChange={e => setEntry(e.target.value)} className={inputCls} />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">방향</label>
                <div className="flex gap-2">
                  {([['long', '롱 (매수)'], ['short', '숏 (매도)']] as [Direction, string][]).map(([d, label]) => (
                    <button
                      key={d}
                      onClick={() => setDirection(d)}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-colors ${
                        direction === d
                          ? d === 'long' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">TP 배수 (×ATR)</label>
                <input type="number" step="0.1" value={tpMult} onChange={e => setTpMult(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">SL 배수 (×ATR)</label>
                <input type="number" step="0.1" value={slMult} onChange={e => setSlMult(e.target.value)} className={inputCls} />
              </div>
            </div>

            {calc && (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">🎯 익절 (TP)</p>
                  <p className="text-lg font-black text-emerald-700">{formatPrice(calc.tp)}</p>
                  <p className="text-xs text-emerald-600 mt-0.5">{direction === 'long' ? '+' : '-'}{calc.tpDistPct.toFixed(2)}%</p>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-xs text-rose-500 font-semibold mb-1">🛑 손절 (SL)</p>
                  <p className="text-lg font-black text-rose-600">{formatPrice(calc.sl)}</p>
                  <p className="text-xs text-rose-500 mt-0.5">{direction === 'long' ? '-' : '+'}{calc.slDistPct.toFixed(2)}%</p>
                </div>
                <div className="col-span-2 flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-slate-500">손익비 (R:R)</span>
                  <span className="text-sm font-bold text-slate-800">1 : {calc.riskReward.toFixed(2)}</span>
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              TP/SL = 진입가 {direction === 'long' ? '± ' : '∓ '}ATR × 배수. ATR은 일봉 14기간 평균 변동폭이라, 배수 1.5면
              최근 평균 하루 변동의 1.5배만큼 떨어진 지점을 익절가로 잡는다는 뜻이에요. 변동성이 큰 코인일수록 폭이 넓어집니다.
            </p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
