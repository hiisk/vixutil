'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';

export default function FuelEfficiencyPage() {
  const [mode, setMode] = useState<'calc' | 'range'>('calc');
  const [distance, setDistance] = useState('');
  const [fuel, setFuel] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [tankFuel, setTankFuel] = useState('');
  const [result, setResult] = useState<null | { value: number; label: string; sub?: string }>(null);

  function calculate() {
    if (mode === 'calc') {
      const d = Number(distance); const f = Number(fuel);
      if (d <= 0 || f <= 0) return;
      setResult({ value: d / f, label: 'km/L', sub: `${d.toLocaleString()}km 주행 · ${f}L 사용` });
    } else {
      const e = Number(efficiency); const t = Number(tankFuel);
      if (e <= 0 || t <= 0) return;
      setResult({ value: e * t, label: 'km', sub: `연비 ${e}km/L · 잔여연료 ${t}L` });
    }
  }

  return (
    <CalcShell
      path="/calculator/fuel-efficiency"
      title="연비 계산기"
      description="주행거리·연료량 → 연비 / 연비·잔여연료 → 주행 가능 거리"
      intro={
        <>
          <h2>실연비 재는 법</h2>
          <p>
            연비는 <strong>주행거리 ÷ 사용 연료량</strong>입니다. 정확히 재려면{' '}
            <strong>가득 채우고 → 트립미터 리셋 → 다음에 다시 가득 채우기</strong> 순서로 하면 됩니다.
            그때 넣은 연료량이 그동안 쓴 양이고, 트립미터 숫자가 주행거리입니다. 주유구까지 꽉 채우는
            기준을 매번 같게 해야 값이 흔들리지 않습니다.
          </p>
          <h2>계기판 연비와 다를 수 있습니다</h2>
          <p>
            차량 계기판의 평균 연비는 <strong>실제보다 좋게 나오는 경향</strong>이 있습니다. 직접 잰 값이
            더 믿을 만하고, 무엇보다 <strong>같은 방법으로 계속 재면서 추세를 보는 것</strong>이 의미가
            있습니다. 한 번의 값보다 여러 번의 평균이 정확합니다.
          </p>
          <h2>주행 가능 거리는 여유를 두세요</h2>
          <p>
            연비 × 잔여 연료로 나온 거리는 <strong>지금까지의 연비가 그대로 유지된다는 가정</strong>입니다.
            정체를 만나거나 오르막이 이어지면 그만큼 짧아집니다. 연료 경고등이 켜진 뒤 남은 양은 차종마다
            다르고, 바닥까지 쓰면 연료펌프에 무리가 갈 수 있으니 계산 결과를 끝까지 믿고 달리지는 마세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'calc', label: '연비 계산' },
            { value: 'range', label: '주행 가능 거리' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'calc' | 'range'); setResult(null); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            {mode === 'calc' ? (
              <>
                <div>
                  <Label>주행거리 (km)</Label>
                  <input type="number" value={distance} onChange={e => setDistance(e.target.value)}
                    placeholder="예: 500" className={inputCls} min="0" />
                </div>
                <div>
                  <Label>연료 사용량 (L)</Label>
                  <input type="number" value={fuel} onChange={e => setFuel(e.target.value)}
                    placeholder="예: 40" className={inputCls} min="0" step="0.1" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>차량 연비 (km/L)</Label>
                  <input type="number" value={efficiency} onChange={e => setEfficiency(e.target.value)}
                    placeholder="예: 12.5" className={inputCls} min="0" step="0.1" />
                </div>
                <div>
                  <Label>잔여 연료 (L)</Label>
                  <input type="number" value={tankFuel} onChange={e => setTankFuel(e.target.value)}
                    placeholder="예: 30" className={inputCls} min="0" step="0.1" />
                </div>
              </>
            )}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-xs mb-1">{mode === 'calc' ? '연비' : '주행 가능 거리'}</p>
            <p className="text-white text-5xl font-black">{result.value.toFixed(1)}</p>
            <p className="text-blue-200 text-xl mt-1">{result.label}</p>
            {result.sub && <p className="text-blue-200 text-xs mt-2 opacity-70">{result.sub}</p>}
          </div>
        )}
      </div>
    </CalcShell>
  );
}
