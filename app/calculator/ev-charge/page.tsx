'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const CHARGE_PRESETS = [
  { label: '완속 (가정)', price: 100 },
  { label: '공공 급속', price: 300 },
  { label: '민간 급속', price: 450 },
];

export default function EvChargePage() {
  const [capacity, setCapacity] = useState('');
  const [fromPct, setFromPct] = useState('20');
  const [toPct, setToPct] = useState('80');
  const [chargePrice, setChargePrice] = useState('300');
  const [evEfficiency, setEvEfficiency] = useState('6');
  const [result, setResult] = useState<null | {
    kWh: number; cost: number; range: number; perKm: number; vsGas: number;
  }>(null);

  function calculate() {
    const cap = Number(capacity);
    const from = Number(fromPct) / 100;
    const to = Number(toPct) / 100;
    const price = Number(chargePrice);
    const eff = Number(evEfficiency);
    if (cap <= 0 || to <= from || price <= 0 || eff <= 0) return;

    const kWh = cap * (to - from);
    const cost = kWh * price;
    const range = kWh * eff;
    const perKm = price / eff;
    const vsGas = (1650 / 12) - perKm;
    setResult({ kWh, cost, range, perKm, vsGas });
  }

  return (
    <CalcShell path="/calculator/ev-charge" title="전기차 충전비 계산기" description="배터리 용량·충전율 기준 충전 비용 및 주행 가능 거리">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>배터리 용량 (kWh)</Label>
              <input type="number" value={capacity} onChange={e => setCapacity(e.target.value)}
                placeholder="예: 77" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>현재 충전율 (%)</Label>
                <input type="number" value={fromPct} onChange={e => setFromPct(e.target.value)}
                  placeholder="20" className={inputCls} min="0" max="100" />
              </div>
              <div>
                <Label>목표 충전율 (%)</Label>
                <input type="number" value={toPct} onChange={e => setToPct(e.target.value)}
                  placeholder="80" className={inputCls} min="0" max="100" />
              </div>
            </div>
            <div>
              <Label>충전 단가 (원/kWh)</Label>
              <div className="flex gap-2 mb-2">
                {CHARGE_PRESETS.map(p => (
                  <button key={p.label} onClick={() => setChargePrice(String(p.price))}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${chargePrice === String(p.price) ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    {p.label}<br />{p.price}원
                  </button>
                ))}
              </div>
              <input type="number" value={chargePrice} onChange={e => setChargePrice(e.target.value)}
                placeholder="직접 입력" className={inputCls} min="0" />
            </div>
            <div>
              <Label>전비 (km/kWh)</Label>
              <input type="number" value={evEfficiency} onChange={e => setEvEfficiency(e.target.value)}
                placeholder="6" className={inputCls} min="0" step="0.1" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">충전 비용</p>
              <p className="text-white text-3xl font-black">{fmt(result.cost)}원</p>
              <p className="text-blue-200 text-sm mt-1">충전량 {result.kWh.toFixed(1)} kWh</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="주행 가능 거리" value={`${fmt(result.range)} km`} />
              <SummaryCard label="km당 비용" value={`${result.perKm.toFixed(0)}원/km`} />
              <SummaryCard
                label="가솔린 대비 절약"
                value={`${result.vsGas >= 0 ? '+' : ''}${result.vsGas.toFixed(0)}원/km`}
                variant={result.vsGas >= 0 ? 'green' : 'red'}
                sub="(가솔린 기준 12km/L · 1,650원)"
              />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
