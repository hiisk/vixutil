'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

function calcPropertyTax(taxBase: number): number {
  if (taxBase <= 60_000_000) return taxBase * 0.001;
  if (taxBase <= 150_000_000) return 60_000 + (taxBase - 60_000_000) * 0.0015;
  if (taxBase <= 300_000_000) return 195_000 + (taxBase - 150_000_000) * 0.0025;
  return 570_000 + (taxBase - 300_000_000) * 0.004;
}

export default function PropertyTaxPage() {
  const [publicPrice, setPublicPrice] = useState('');
  const [isOneHouse, setIsOneHouse] = useState(true);
  const [isCity, setIsCity] = useState(true);
  const [result, setResult] = useState<null | {
    fairRate: number; taxBase: number; propertyTax: number; cityTax: number; eduTax: number; total: number;
  }>(null);

  function calculate() {
    const p = Number(publicPrice);
    if (p <= 0) return;

    let fairRate = 0.6;
    if (isOneHouse) {
      if (p <= 300_000_000) fairRate = 0.45;
      else if (p <= 600_000_000) fairRate = 0.5;
    }

    const taxBase = p * fairRate;
    const propertyTax = calcPropertyTax(taxBase);
    const cityTax = isCity ? taxBase * 0.0014 : 0;
    const eduTax = propertyTax * 0.2;
    setResult({ fairRate, taxBase, propertyTax, cityTax, eduTax, total: propertyTax + cityTax + eduTax });
  }

  return (
    <CalcShell title="재산세 계산기" description="주택 공시가격 기준 재산세 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>주택 공시가격 (원)</Label>
              <input type="number" value={publicPrice} onChange={e => setPublicPrice(e.target.value)}
                placeholder="예: 500,000,000" className={inputCls} min="0" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={isOneHouse} onChange={e => setIsOneHouse(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">1세대 1주택 특례 적용</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={isCity} onChange={e => setIsCity(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">도시지역 (도시지역분 포함)</span>
            </label>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">재산세 합계</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
              <p className="text-blue-200 text-sm mt-1">
                공정시장가액비율 {(result.fairRate * 100).toFixed(0)}% · 과세표준 {fmt(result.taxBase)}원
              </p>
            </div>
            <Card>
              <CardHeader title="세금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '재산세', value: result.propertyTax },
                  ...(result.cityTax > 0 ? [{ label: '도시지역분 (0.14%)', value: result.cityTax }] : []),
                  { label: '지방교육세 (재산세×20%)', value: result.eduTax },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">* 7월(건물분)·9월(토지분) 2회 납부 · 20만원 이하 일시납</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
