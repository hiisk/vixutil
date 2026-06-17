'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const PIPE_BASIC: Record<string, number> = {
  '13': 690, '15': 750, '20': 1010, '25': 2080,
};

function calcWaterFee(usage: number): number {
  if (usage <= 30) return usage * 690;
  if (usage <= 50) return 30 * 690 + (usage - 30) * 870;
  return 30 * 690 + 20 * 870 + (usage - 50) * 1250;
}

export default function WaterBillPage() {
  const [usage, setUsage] = useState('');
  const [pipe, setPipe] = useState('15');
  const [result, setResult] = useState<null | {
    basicFee: number; waterFee: number; sewerFee: number; envFee: number; total: number;
  }>(null);

  function calculate() {
    const u = Number(usage);
    if (u <= 0) return;
    const basicFee = PIPE_BASIC[pipe];
    const waterFee = calcWaterFee(u);
    const sewerFee = Math.round((basicFee + waterFee) * 0.69);
    const envFee = u * 170;
    setResult({ basicFee, waterFee, sewerFee, envFee, total: basicFee + waterFee + sewerFee + envFee });
  }

  return (
    <CalcShell title="수도요금 계산기" description="서울시 상수도 기준 수도·하수도요금 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>이번 달 사용량 (m³)</Label>
              <input type="number" value={usage} onChange={e => setUsage(e.target.value)}
                placeholder="예: 20" className={inputCls} min="0" />
            </div>
            <div>
              <Label>계량기 구경</Label>
              <select value={pipe} onChange={e => setPipe(e.target.value)} className={inputCls}>
                <option value="13">13mm (기본요금 690원)</option>
                <option value="15">15mm (기본요금 750원)</option>
                <option value="20">20mm (기본요금 1,010원)</option>
                <option value="25">25mm (기본요금 2,080원)</option>
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">이번 달 수도요금</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <Card>
              <CardHeader title="요금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '기본요금', value: result.basicFee },
                  { label: '상수도 사용요금', value: result.waterFee },
                  { label: '하수도요금 (상수도×69%)', value: result.sewerFee },
                  { label: '물이용부담금 (170원/m³)', value: result.envFee },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400">* 수도요금은 부가세 면세 · 서울시 기준 (지역에 따라 다를 수 있음)</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
