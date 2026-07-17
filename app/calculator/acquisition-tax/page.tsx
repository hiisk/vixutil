'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

function getHousingRate(price: number, houses: number, isAdjusted: boolean): number {
  if (houses >= 3 || (isAdjusted && houses >= 2)) return 0.12;
  if (houses === 2) return isAdjusted ? 0.12 : 0.08;
  if (price <= 600_000_000) return 0.01;
  if (price <= 900_000_000) {
    return (price * 2 / 3_000_000 - 3) / 100;
  }
  return 0.03;
}

export default function AcquisitionTaxPage() {
  const [price, setPrice] = useState('');
  const [type, setType] = useState<'house' | 'other'>('house');
  const [houses, setHouses] = useState('1');
  const [adjusted, setAdjusted] = useState(false);
  const [firstBuy, setFirstBuy] = useState(false);
  const [result, setResult] = useState<null | {
    rate: number; acquisitionTax: number; ruralTax: number; eduTax: number; total: number; discount: number;
  }>(null);

  function calculate() {
    const p = Number(price);
    if (p <= 0) return;

    let rate: number;
    let ruralTaxRate = 0;
    let eduTaxRate = 0;

    if (type === 'other') {
      rate = 0.04;
      ruralTaxRate = 0.004;
      eduTaxRate = 0.002;
    } else {
      const h = Number(houses);
      rate = getHousingRate(p, h, adjusted);
      ruralTaxRate = rate >= 0.12 ? 0 : 0.001;
      eduTaxRate = rate * 0.2;
    }

    const acquisitionTax = p * rate;
    const ruralTax = p * ruralTaxRate;
    const eduTax = p * eduTaxRate;
    const subtotal = acquisitionTax + ruralTax + eduTax;
    const discount = firstBuy && type === 'house' ? Math.min(2_000_000, acquisitionTax) : 0;
    const total = subtotal - discount;

    setResult({ rate: rate * 100, acquisitionTax, ruralTax, eduTax, total, discount });
  }

  return (
    <CalcShell path="/calculator/acquisition-tax" title="취득세 계산기" description="부동산 취득세 · 농어촌특별세 · 지방교육세 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>취득가액 (원)</Label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                placeholder="예: 500,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>부동산 구분</Label>
              <div className="grid grid-cols-2 gap-2">
                {[{ v: 'house', l: '주택' }, { v: 'other', l: '비주택 (상가·토지)' }].map(o => (
                  <button key={o.v} onClick={() => setType(o.v as 'house' | 'other')}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-colors border ${type === o.v ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300'}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
            {type === 'house' && (
              <>
                <div>
                  <Label>취득 후 주택 수</Label>
                  <select value={houses} onChange={e => setHouses(e.target.value)} className={inputCls}>
                    <option value="1">1주택</option>
                    <option value="2">2주택</option>
                    <option value="3">3주택 이상</option>
                    <option value="9">법인</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={adjusted} onChange={e => setAdjusted(e.target.checked)}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">조정대상지역</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={firstBuy} onChange={e => setFirstBuy(e.target.checked)}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">생애최초 취득 (최대 200만원 감면)</span>
                </label>
              </>
            )}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">총 납부세액</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
              <p className="text-blue-200 text-sm mt-1">취득세율 {result.rate.toFixed(2)}%</p>
            </div>
            <Card>
              <CardHeader title="세금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '취득세', value: result.acquisitionTax },
                  { label: '농어촌특별세', value: result.ruralTax },
                  { label: '지방교육세', value: result.eduTax },
                  ...(result.discount > 0 ? [{ label: '생애최초 감면', value: -result.discount }] : []),
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className={`font-semibold ${r.value < 0 ? 'text-emerald-600' : ''}`}>
                      {r.value < 0 ? '-' : ''}{fmt(Math.abs(r.value))}원
                    </span>
                  </div>
                ))}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 flex justify-between font-bold text-sm">
                  <span>합계</span>
                  <span className="text-blue-600">{fmt(result.total)}원</span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
