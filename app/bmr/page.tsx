'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function BmrPage() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<null | { harris: number; mifflin: number }>(null);

  function calculate() {
    const a = Number(age); const h = Number(height); const w = Number(weight);
    if (a <= 0 || h <= 0 || w <= 0) return;
    const harris = gender === 'male'
      ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
      : 447.593 + 9.247 * w + 3.098 * h - 4.330 * a;
    const mifflin = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    setResult({ harris, mifflin });
  }

  return (
    <CalcShell title="기초대사량 계산기" description="Harris-Benedict · Mifflin-St Jeor 공식 비교">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>성별</Label>
              <div className="grid grid-cols-2 gap-2">
                {[{ v: 'male', l: '남성' }, { v: 'female', l: '여성' }].map(o => (
                  <button key={o.v} onClick={() => setGender(o.v as 'male' | 'female')}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${gender === o.v ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label>나이</Label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="세" className={inputCls} min="0" />
              </div>
              <div>
                <Label>키 (cm)</Label>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="cm" className={inputCls} min="0" />
              </div>
              <div>
                <Label>몸무게 (kg)</Label>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="kg" className={inputCls} min="0" />
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-600 rounded-2xl p-5">
                <p className="text-blue-200 text-xs mb-1">Harris-Benedict</p>
                <p className="text-white text-2xl font-black">{fmt(result.harris)}</p>
                <p className="text-blue-200 text-xs mt-1">kcal/일</p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-xs mb-1">Mifflin-St Jeor</p>
                <p className="text-white text-2xl font-black">{fmt(result.mifflin)}</p>
                <p className="text-slate-400 text-xs mt-1">kcal/일</p>
              </div>
            </div>
            <Card className="p-4">
              <p className="text-xs font-bold text-slate-500 mb-2">하루 소모 칼로리 환산 참고</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  { food: '밥 한 공기', kcal: 300 },
                  { food: '계란 1개', kcal: 80 },
                  { food: '아메리카노', kcal: 10 },
                ].map(f => (
                  <div key={f.food} className="bg-slate-50 rounded-lg p-2">
                    <p className="text-slate-500">{f.food}</p>
                    <p className="font-bold text-slate-800">{Math.round(result.mifflin / f.kcal)}개분</p>
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
