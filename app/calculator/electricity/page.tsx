'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const TIERS = [
  { limit: 200, basic: 910,   rate: 120.0 },
  { limit: 400, basic: 1600,  rate: 214.6 },
  { limit: Infinity, basic: 7300, rate: 307.3 },
];

function calcElectricity(kwh: number) {
  const tier = TIERS.find(t => kwh <= t.limit) ?? TIERS[2];
  const basicFee = tier.basic;

  let usageFee = 0;
  let remaining = kwh;
  const prevLimits = [0, 200, 400];
  for (let i = 0; i < TIERS.length; i++) {
    if (remaining <= 0) break;
    const prev = prevLimits[i];
    const curr = TIERS[i].limit === Infinity ? Infinity : TIERS[i].limit;
    const inTier = Math.min(remaining, curr - prev);
    usageFee += inTier * TIERS[i].rate;
    remaining -= inTier;
  }

  const subtotal = basicFee + usageFee;
  const vat = subtotal * 0.1;
  const fund = subtotal * 0.037;
  return { basicFee, usageFee, subtotal, vat, fund, total: subtotal + vat + fund };
}

export default function ElectricityPage() {
  const [kwh, setKwh] = useState('');
  const [result, setResult] = useState<null | ReturnType<typeof calcElectricity>>(null);

  function calculate() {
    const k = Number(kwh);
    if (k <= 0) return;
    setResult(calcElectricity(k));
  }

  return (
    <CalcShell title="전기요금 계산기" description="주택용 저압 누진세 기준 전기요금 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="mb-4">
            <Label>이번 달 사용량 (kWh)</Label>
            <input type="number" value={kwh} onChange={e => setKwh(e.target.value)}
              placeholder="예: 350" className={inputCls} min="0" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
            {[
              { label: '1구간', range: '~200kWh', rate: '120원' },
              { label: '2구간', range: '~400kWh', rate: '214.6원' },
              { label: '3구간', range: '400kWh+', rate: '307.3원' },
            ].map(t => (
              <div key={t.label} className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2">
                <p className="font-bold text-slate-600 dark:text-slate-300">{t.label}</p>
                <p className="text-slate-400 dark:text-slate-500">{t.range}</p>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{t.rate}/kWh</p>
              </div>
            ))}
          </div>
          <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">이번 달 전기요금</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <Card>
              <CardHeader title="요금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '기본요금', value: result.basicFee },
                  { label: '전력량요금', value: result.usageFee },
                  { label: '부가가치세 (10%)', value: result.vat },
                  { label: '전력기반기금 (3.7%)', value: result.fund },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
