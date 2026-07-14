'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const FUEL_PRESETS = [
  { label: '가솔린', price: 1650 },
  { label: '디젤', price: 1550 },
  { label: 'LPG', price: 930 },
];

export default function GasCostPage() {
  const [distance, setDistance] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('1650');
  const [roundTrip, setRoundTrip] = useState(false);
  const [result, setResult] = useState<null | { fuelNeeded: number; cost: number }>(null);

  function calculate() {
    const d = Number(distance);
    const e = Number(efficiency);
    const p = Number(fuelPrice);
    if (d <= 0 || e <= 0 || p <= 0) return;
    const dist = roundTrip ? d * 2 : d;
    const fuelNeeded = dist / e;
    setResult({ fuelNeeded, cost: fuelNeeded * p });
  }

  return (
    <CalcShell title="주유비 계산기" description="거리·연비·유가 기준 주유비 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>주행거리 (km)</Label>
              <input type="number" value={distance} onChange={e => setDistance(e.target.value)}
                placeholder="예: 200" className={inputCls} min="0" />
            </div>
            <div>
              <Label>차량 연비 (km/L)</Label>
              <input type="number" value={efficiency} onChange={e => setEfficiency(e.target.value)}
                placeholder="예: 12" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>유가 (원/L)</Label>
              <div className="flex gap-2 mb-2">
                {FUEL_PRESETS.map(p => (
                  <button key={p.label} onClick={() => setFuelPrice(String(p.price))}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${fuelPrice === String(p.price) ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
                    {p.label}<br />{p.price.toLocaleString()}원
                  </button>
                ))}
              </div>
              <input type="number" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)}
                placeholder="직접 입력" className={inputCls} min="0" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={roundTrip} onChange={e => setRoundTrip(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">왕복 계산</span>
            </label>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">예상 주유비 {roundTrip ? '(왕복)' : '(편도)'}</p>
              <p className="text-white text-3xl font-black">{fmt(result.cost)}원</p>
            </div>
            <SummaryCard label="필요 연료량" value={`${result.fuelNeeded.toFixed(1)} L`} />
          </>
        )}
      </div>
    </CalcShell>
  );
}
