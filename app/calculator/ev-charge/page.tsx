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
    <CalcShell
      path="/calculator/ev-charge"
      title="전기차 충전비 계산기"
      description="배터리 용량·충전율 기준 충전 비용 및 주행 가능 거리"
      intro={
        <>
          <h2>어디서 충전하느냐가 전부입니다</h2>
          <p>
            같은 전기인데 <strong>가정용 완속과 민간 급속의 단가가 4배 넘게</strong> 벌어집니다.
            완속 100원, 공공 급속 300원, 민간 급속 450원(원/kWh)이 기본값입니다. 집에서 충전할 수 있느냐가
            전기차 유지비를 좌우하는 이유가 이것입니다. 충전 요금은 사업자와 정책에 따라 자주 바뀌므로
            실제 단가를 넣어 쓰는 게 정확합니다.
          </p>
          <h2>20%에서 80%가 기본값인 이유</h2>
          <p>
            급속충전은 <strong>80%를 넘으면 속도가 뚝 떨어집니다</strong>. 배터리를 보호하려고 전류를 줄이기
            때문에, 80~100%를 채우는 데 0~80%만큼의 시간이 걸리기도 합니다. 그래서 장거리 주행 중에는
            80%까지만 채우고 출발하는 것이 시간상 유리합니다. 항상 100%로 채워두는 것이 배터리 수명에
            좋지 않다는 것도 알려진 이야기입니다.
          </p>
          <h2>겨울에는 계산대로 안 나옵니다</h2>
          <p>
            추우면 배터리 효율이 떨어지고 히터가 전력을 크게 씁니다. 전기차는 엔진 폐열이 없어서 난방에
            배터리를 직접 쓰기 때문입니다. 그 결과 겨울 주행거리가 여름보다 <strong>20~30% 짧아지는</strong>{' '}
            경우가 흔합니다. 여기서 나온 주행 가능 거리는 표준 조건 기준으로 보세요.
          </p>
          <h2>가솔린과 비교할 때</h2>
          <p>
            km당 비용 비교는 <strong>가솔린 12km/L · 1,650원/L</strong>을 기준으로 합니다. 본인 차의
            연비와 지금 유가가 다르면 결과도 달라지니, 주유비 계산기와 함께 견줘 보세요.
          </p>
        </>
      }
    >
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
