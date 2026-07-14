'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const ACTIVITY_LEVELS = [
  { value: 1.2,   label: '거의 운동 안 함', sub: '사무직·집에 있는 경우' },
  { value: 1.375, label: '가벼운 활동', sub: '주 1~3회 가벼운 운동' },
  { value: 1.55,  label: '보통 활동', sub: '주 3~5회 운동' },
  { value: 1.725, label: '활동적', sub: '주 6~7회 강도 높은 운동' },
  { value: 1.9,   label: '매우 활동적', sub: '운동선수·육체 노동' },
];

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CaloriePage() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<null | { bmr: number; tdee: number }>(null);

  function calculate() {
    const a = Number(age); const h = Number(height); const w = Number(weight);
    if (a <= 0 || h <= 0 || w <= 0) return;
    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * Number(activity);
    setResult({ bmr, tdee });
  }

  return (
    <CalcShell title="칼로리 계산기" description="활동 수준 기준 하루 권장 칼로리 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>성별</Label>
              <div className="grid grid-cols-2 gap-2">
                {[{ v: 'male', l: '남성' }, { v: 'female', l: '여성' }].map(o => (
                  <button key={o.v} onClick={() => setGender(o.v as 'male' | 'female')}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${gender === o.v ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label>나이</Label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)}
                  placeholder="세" className={inputCls} min="0" />
              </div>
              <div>
                <Label>키 (cm)</Label>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)}
                  placeholder="cm" className={inputCls} min="0" />
              </div>
              <div>
                <Label>몸무게 (kg)</Label>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                  placeholder="kg" className={inputCls} min="0" />
              </div>
            </div>
            <div>
              <Label>활동 수준</Label>
              <div className="flex flex-col gap-1.5">
                {ACTIVITY_LEVELS.map(l => (
                  <label key={l.value} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${activity === String(l.value) ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    <input type="radio" name="activity" value={l.value}
                      checked={activity === String(l.value)} onChange={e => setActivity(e.target.value)}
                      className="accent-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{l.label}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{l.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5 text-center">
              <p className="text-blue-200 text-xs mb-1">하루 권장 칼로리 (TDEE)</p>
              <p className="text-white text-4xl font-black">{fmt(result.tdee)} kcal</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="기초대사량 (BMR)" value={`${fmt(result.bmr)} kcal`} />
              <SummaryCard label="감량 목표" value={`${fmt(result.tdee - 500)} kcal`} sub="하루 -500kcal" variant="red" />
              <SummaryCard label="유지" value={`${fmt(result.tdee)} kcal`} variant="primary" />
              <SummaryCard label="증량 목표" value={`${fmt(result.tdee + 300)} kcal`} sub="하루 +300kcal" variant="green" />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
