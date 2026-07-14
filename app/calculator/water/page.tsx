'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

export default function WaterPage() {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('normal');
  const [weather, setWeather] = useState('normal');
  const [result, setResult] = useState<null | { ml: number }>(null);

  function calculate() {
    const w = Number(weight);
    if (w <= 0) return;
    let ml = w * 33;
    if (activity === 'high') ml += 400;
    if (weather === 'hot') ml += 500;
    if (weather === 'exercise') ml += 700;
    setResult({ ml });
  }

  return (
    <CalcShell title="물 섭취량 계산기" description="체중·활동 수준 기준 하루 권장 수분량">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>몸무게 (kg)</Label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                placeholder="예: 65" className={inputCls} min="0" />
            </div>
            <div>
              <Label>활동 수준</Label>
              <select value={activity} onChange={e => setActivity(e.target.value)} className={inputCls}>
                <option value="low">낮음 (사무직)</option>
                <option value="normal">보통</option>
                <option value="high">높음 (운동·외근)</option>
              </select>
            </div>
            <div>
              <Label>환경</Label>
              <select value={weather} onChange={e => setWeather(e.target.value)} className={inputCls}>
                <option value="normal">보통</option>
                <option value="hot">더운 날씨 (+500ml)</option>
                <option value="exercise">운동 중 (+700ml)</option>
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-6 text-center">
              <p className="text-blue-200 text-xs mb-1">하루 권장 수분 섭취량</p>
              <p className="text-white text-5xl font-black">{result.ml.toLocaleString()}</p>
              <p className="text-blue-200 text-xl mt-1">ml</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'L 기준', value: `${(result.ml / 1000).toFixed(1)} L` },
                { label: '물 컵 (200ml)', value: `${Math.ceil(result.ml / 200)}잔` },
                { label: '소형 페트병 (330ml)', value: `${Math.ceil(result.ml / 330)}병` },
                { label: '중형 페트병 (500ml)', value: `${Math.ceil(result.ml / 500)}병` },
              ].map(r => (
                <div key={r.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{r.label}</p>
                  <p className="font-black text-slate-900 dark:text-slate-100 text-lg">{r.value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
