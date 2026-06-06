'use client';
import { useMemo, useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

interface Row { price: number; qty: string }

export default function AvgPricePage() {
  const [rows, setRows] = useState<Row[]>([
    { price: 75_000, qty: '10' },
    { price: 68_000, qty: '15' },
    { price: 72_000, qty: '5' },
  ]);
  const [currentPrice, setCurrentPrice] = useState(80_000);

  function updateRowPrice(i: number, val: number) {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, price: val } : r));
  }

  function updateRowQty(i: number, val: string) {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, qty: val } : r));
  }

  const result = useMemo(() => {
    const valid = rows.filter(r => r.price > 0 && Number(r.qty) > 0);
    if (valid.length === 0) return null;
    const totalInvest = valid.reduce((s, r) => s + r.price * Number(r.qty), 0);
    const totalQty = valid.reduce((s, r) => s + Number(r.qty), 0);
    const avgPrice = totalInvest / totalQty;
    const cp = currentPrice;
    const res: {
      avgPrice: number; totalQty: number; totalInvest: number;
      evalAmount?: number; evalProfit?: number; evalRate?: number;
    } = { avgPrice, totalQty, totalInvest };
    if (cp > 0) {
      res.evalAmount = cp * totalQty;
      res.evalProfit = (cp - avgPrice) * totalQty;
      res.evalRate = (cp / avgPrice - 1) * 100;
    }
    return res;
  }, [rows, currentPrice]);

  return (
    <CalcShell title="평균단가 계산기" description="여러 번 매수 시 평균 매입단가 계산">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader title="매수 내역" />
          <div className="p-4 flex flex-col gap-2">
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-5 gap-2 items-center">
                <div className="col-span-2">
                  {i === 0 && <Label>매수가</Label>}
                  <CommaInput value={row.price} onChange={v => updateRowPrice(i, v)}
                    placeholder="가격" />
                </div>
                <div className="col-span-2">
                  {i === 0 && <Label>수량</Label>}
                  <input type="number" value={row.qty} onChange={e => updateRowQty(i, e.target.value)}
                    placeholder="수량" className={inputCls} min="0" />
                </div>
                <div className={i === 0 ? 'pt-6' : ''}>
                  <button onClick={() => setRows(prev => prev.filter((_, idx) => idx !== i))}
                    className="w-full py-3 text-slate-400 hover:text-red-400 text-sm font-bold transition-colors">
                    ✕
                  </button>
                </div>
              </div>
            ))}
            {rows.length < 10 && (
              <button onClick={() => setRows(prev => [...prev, { price: 0, qty: '' }])}
                className="mt-1 text-sm text-blue-600 font-semibold hover:underline text-left">
                + 매수 추가
              </button>
            )}
          </div>
          <div className="px-4 pb-4">
            <Label>현재가 (손익 계산용, 선택)</Label>
            <CommaInput value={currentPrice} onChange={setCurrentPrice} placeholder="현재 가격 입력" />
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">평균 매입단가</p>
              <p className="text-white text-3xl font-black">{fmt(result.avgPrice)}원</p>
              <p className="text-blue-200 text-sm mt-1">총 {fmt(result.totalQty)}주 · 투자금 {fmt(result.totalInvest)}원</p>
            </div>
            {result.evalProfit !== undefined && (
              <div className="grid grid-cols-2 gap-3">
                <SummaryCard label="평가금액" value={`${fmt(result.evalAmount!)}원`} />
                <SummaryCard
                  label="평가손익"
                  value={`${result.evalProfit >= 0 ? '+' : ''}${fmt(result.evalProfit)}원`}
                  sub={`${result.evalRate! >= 0 ? '+' : ''}${result.evalRate!.toFixed(2)}%`}
                  variant={result.evalProfit >= 0 ? 'green' : 'red'}
                />
              </div>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
