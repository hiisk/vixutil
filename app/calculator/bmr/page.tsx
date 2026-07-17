'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

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
    <CalcShell
      path="/calculator/bmr"
      title="기초대사량 계산기"
      description="Harris-Benedict · Mifflin-St Jeor 공식 비교"
      intro={
        <>
          <h2>기초대사량이 뭔가요</h2>
          <p>
            <strong>가만히 누워만 있어도 소모되는 하루 열량</strong>입니다. 심장을 뛰게 하고 체온을 유지하는
            데 쓰이는 몫이라, 하루 총 소모 열량의 상당 부분을 차지합니다. 여기에 활동량을 곱해야 실제로
            하루에 쓰는 열량이 나옵니다.
          </p>
          <h2>두 공식을 함께 보여주는 이유</h2>
          <p>
            <strong>Harris-Benedict</strong>는 오래된 공식이라 널리 쓰이지만 값이 다소 높게 나오는 편이고,{' '}
            <strong>Mifflin-St Jeor</strong>는 비교적 최근 공식으로 현대인에게 더 잘 맞는다고 평가됩니다.
            둘의 차이를 보면 이 숫자가 <strong>정밀한 측정값이 아니라 추정치</strong>라는 게 드러납니다.
            어느 쪽도 개인의 실제 대사량을 정확히 맞히지는 못합니다.
          </p>
          <h2>체성분은 반영되지 않습니다</h2>
          <p>
            두 공식 모두 <strong>성별·나이·키·몸무게</strong>만 씁니다. 같은 조건이어도 근육량이 많으면 실제
            기초대사량이 더 높은데, 근육이 지방보다 열량을 많이 쓰기 때문입니다. 이 차이는 공식이 잡아내지
            못합니다.
          </p>
          <h2>다이어트에 쓸 때</h2>
          <p>
            기초대사량 아래로 먹는 식단은 권장되지 않습니다. 감량이 목적이라면 기초대사량이 아니라{' '}
            <strong>활동량까지 포함한 하루 소모 열량</strong>을 기준으로 적자를 만드는 것이 보통입니다.
            질환이 있거나 극단적인 감량을 계획한다면 전문가와 상의하세요. 이 계산기는 참고용 추정치입니다.
          </p>
        </>
      }
    >
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
                <p className="text-slate-400 dark:text-slate-500 text-xs mb-1">Mifflin-St Jeor</p>
                <p className="text-white text-2xl font-black">{fmt(result.mifflin)}</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">kcal/일</p>
              </div>
            </div>
            <Card className="p-4">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">하루 소모 칼로리 환산 참고</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  { food: '밥 한 공기', kcal: 300 },
                  { food: '계란 1개', kcal: 80 },
                  { food: '아메리카노', kcal: 10 },
                ].map(f => (
                  <div key={f.food} className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2">
                    <p className="text-slate-500 dark:text-slate-400">{f.food}</p>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{Math.round(result.mifflin / f.kcal)}개분</p>
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
