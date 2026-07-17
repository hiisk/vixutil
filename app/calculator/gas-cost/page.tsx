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
    <CalcShell
      path="/calculator/gas-cost"
      title="주유비 계산기"
      description="거리·연비·유가 기준 주유비 계산"
      intro={
        <>
          <h2>계산 방식</h2>
          <p>
            <strong>주행거리 ÷ 연비 × 유가</strong>입니다. 400km를 연비 12km/L인 차로 달리면 33.3L가
            필요하고, 여기에 리터당 가격을 곱하면 주유비가 나옵니다. 왕복이라면 거리를 두 배로 넣거나
            왕복 옵션을 켜세요.
          </p>
          <h2>공인연비대로 나오지 않습니다</h2>
          <p>
            카탈로그의 공인연비는 정해진 조건에서 측정한 값이라 실제 주행보다 좋게 나오는 것이 보통입니다.
            <strong>급가속·에어컨·정체·짐 무게</strong>가 전부 연비를 갉아먹습니다. 계산이 실제와 맞으려면
            공인연비가 아니라 <strong>본인 차의 실연비</strong>를 넣어야 합니다. 모른다면{' '}
            <strong>연비 계산기</strong>로 주유량과 주행거리를 넣어 구할 수 있습니다.
          </p>
          <h2>고속도로가 시내보다 연비가 좋습니다</h2>
          <p>
            정차와 재출발이 없어서입니다. 같은 차라도 시내 주행 연비는 고속 주행의 70% 수준으로 떨어지는
            경우가 흔하므로, 장거리 여행 비용을 잡을 때와 출퇴근 비용을 잡을 때 다른 연비를 쓰는 편이
            정확합니다. 유가는 지역과 브랜드에 따라 리터당 수백 원씩 차이 나기도 합니다.
          </p>
        </>
      }
    >
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
