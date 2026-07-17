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
    <CalcShell path="/calculator/fuel-efficiency" title="연비 계산기" description="주행거리·연료량 → 연비 / 연비·잔여연료 → 주행 가능 거리">
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
