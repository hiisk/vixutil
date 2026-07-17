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
    <CalcShell
      path="/calculator/calorie"
      title="칼로리 계산기"
      description="활동 수준 기준 하루 권장 칼로리 계산"
      intro={
        <>
          <h2>기초대사량 × 활동계수</h2>
          <p>
            가만히 있어도 쓰는 <strong>기초대사량</strong>에 활동 수준을 곱해 하루 총 소모 열량을 구합니다.
            계수는 거의 안 움직이면 <strong>1.2</strong>, 주 3~5회 운동하면 <strong>1.55</strong>,
            운동선수급이면 <strong>1.9</strong>입니다. 같은 몸이어도 활동량에 따라 하루 필요 열량이
            수백 kcal씩 차이 납니다.
          </p>
          <h2>활동 수준을 높게 잡기 쉽습니다</h2>
          <p>
            계산이 실제와 안 맞는 가장 흔한 이유입니다. 주 3회 헬스를 가더라도 나머지 시간에 앉아만
            있다면 <strong>1.55보다 낮게</strong> 잡는 편이 현실적입니다. 운동으로 태우는 열량은 생각보다
            적고, 하루 총 소모량에서 차지하는 비중도 크지 않습니다.
          </p>
          <h2>감량 속도는 욕심내지 마세요</h2>
          <p>
            체지방 1kg을 빼려면 대략 7,700kcal의 적자가 필요합니다. 하루 500kcal씩 덜 먹으면 주에 0.5kg
            정도가 됩니다. 이보다 빠르게 빼려고 극단적으로 줄이면 근육이 먼저 빠지고 <strong>기초대사량이
            떨어져</strong> 나중에 더 안 빠지는 몸이 됩니다. <strong>기초대사량 아래로 먹는 식단은
            권장되지 않습니다.</strong>
          </p>
          <h2>추정치입니다</h2>
          <p>
            공식이 쓰는 건 성별·나이·키·몸무게뿐이라 근육량이나 개인차는 반영되지 않습니다. 여기서 나온
            숫자를 출발점으로 삼아 2~3주 체중 변화를 보고 조정하는 편이 정확합니다. 질환이 있거나 큰 폭의
            감량을 계획한다면 전문가와 상의하세요.
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
