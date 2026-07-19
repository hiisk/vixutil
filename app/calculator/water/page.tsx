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
    <CalcShell
      path="/calculator/water"
      title="물 섭취량 계산기"
      description="체중·활동 수준 기준 하루 권장 수분량"
      intro={
        <>
          <h2>체중 1kg당 약 33ml</h2>
          <p>
            흔히 쓰이는 어림 기준입니다. 60kg이면 하루 2L 정도가 나옵니다. 여기에 활동량이 많거나
            날이 덥거나 운동을 하면 <strong>땀으로 빠지는 만큼</strong> 더합니다.
          </p>
          <h2>물만 세는 게 아닙니다</h2>
          <p>
            하루 수분 섭취량에는 <strong>음식에 든 물</strong>도 들어갑니다. 국·과일·채소에 수분이
            많아서, 권장량 전부를 생수로 마셔야 하는 것은 아닙니다. 식사를 제대로 하고 있다면 그만큼
            빼고 생각해도 됩니다.
          </p>
          <h2>많이 마실수록 좋은 것도 아닙니다</h2>
          <p>
            짧은 시간에 지나치게 많이 마시면 혈중 나트륨이 묽어지는 <strong>저나트륨혈증</strong>이
            생길 수 있습니다. 드물지만 위험한 상태입니다. 한 번에 몰아 마시기보다{' '}
            <strong>나눠서 조금씩</strong> 마시는 편이 좋습니다.
          </p>
          <h2>목마름이 가장 정확한 신호입니다</h2>
          <p>
            건강한 성인이라면 목마를 때 마시고 소변 색이 옅은 노란색을 유지하는 것으로 충분합니다.
            다만 <strong>심장·신장 질환이 있거나 이뇨제를 복용 중</strong>이라면 수분 섭취를 제한해야
            하는 경우가 있으니 반드시 의료진의 지시를 따르세요. 이 계산기는 일반적인 참고 기준입니다.
          </p>
        </>
      }
    >
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
