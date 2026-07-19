'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

const SQM_PER_PYEONG = 3.30579;

const REFS = [
  { label: '소형 (10평)', pyeong: 10, sqm: 33.1 },
  { label: '국민평형 (25평)', pyeong: 25, sqm: 82.6 },
  { label: '33평형', pyeong: 33, sqm: 109.1 },
  { label: '중형 (40평)', pyeong: 40, sqm: 132.2 },
  { label: '대형 (50평)', pyeong: 50, sqm: 165.3 },
];

export default function PyeongPage() {
  const [mode, setMode] = useState<'sqm' | 'pyeong'>('sqm');
  const [value, setValue] = useState('');

  const converted = (() => {
    const v = Number(value);
    if (v <= 0) return null;
    return mode === 'sqm'
      ? { result: v / SQM_PER_PYEONG, unit: '평' }
      : { result: v * SQM_PER_PYEONG, unit: '㎡' };
  })();

  const nearest = converted && mode === 'sqm'
    ? REFS.reduce((a, b) => Math.abs(a.sqm - Number(value)) < Math.abs(b.sqm - Number(value)) ? a : b)
    : converted && mode === 'pyeong'
    ? REFS.reduce((a, b) => Math.abs(a.pyeong - Number(value)) < Math.abs(b.pyeong - Number(value)) ? a : b)
    : null;

  return (
    <CalcShell
      path="/calculator/pyeong"
      title="평수 계산기"
      description="평 ↔ 제곱미터(㎡) 즉시 변환"
      intro={
        <>
          <h2>1평 = 3.3058㎡</h2>
          <p>
            정확히는 <strong>3.305785㎡</strong>입니다. 흔히 쓰는 &ldquo;3.3으로 나눈다&rdquo;는
            어림이라 넓은 면적에서는 오차가 눈에 띕니다. 반대로 ㎡를 평으로 바꿀 때는{' '}
            <strong>0.3025</strong>를 곱하면 됩니다.
          </p>
          <h2>84㎡가 왜 34평인가</h2>
          <p>
            84㎡를 그대로 나누면 25.4평인데 아파트는 <strong>34평</strong>이라고 부릅니다. 84㎡는{' '}
            <strong>전용면적</strong>이고, 부르는 평수는 계단·복도 같은 <strong>주거공용면적</strong>을
            더한 공급면적 기준이기 때문입니다. 같은 34평이어도 단지마다 전용률이 달라 실제 쓰는 공간은
            차이가 납니다. 분양 광고의 평수와 등기부의 면적이 다른 이유입니다.
          </p>
          <h2>평은 법정 단위가 아닙니다</h2>
          <p>
            거래나 공적 서류에는 <strong>㎡</strong>를 씁니다. 평은 관습적으로 쓰이는 단위라 계약서와
            부동산 앱의 숫자가 달라 보일 수 있으니, 비교할 때는 단위를 맞춰서 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'sqm', label: '㎡ → 평' },
            { value: 'pyeong', label: '평 → ㎡' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'sqm' | 'pyeong'); setValue(''); }}
        />
        <Card className="p-5">
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={mode === 'sqm' ? '㎡ 입력' : '평 입력'}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
              {mode === 'sqm' ? '㎡' : '평'}
            </span>
          </div>
        </Card>

        {converted && (
          <>
            <div className="bg-blue-600 rounded-2xl p-6 text-center">
              <p className="text-blue-200 text-sm mb-2">변환 결과</p>
              <p className="text-white text-5xl font-black">
                {converted.result.toFixed(2)}
              </p>
              <p className="text-blue-200 text-xl mt-1">{converted.unit}</p>
              {nearest && (
                <p className="text-blue-200 text-sm mt-3 opacity-80">
                  ≈ {nearest.label}에 가장 가깝습니다
                </p>
              )}
            </div>
            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">아파트 평형 참고표</p>
              </div>
              <div className="divide-y divide-slate-100">
                {REFS.map(r => (
                  <button
                    key={r.label}
                    onClick={() => { setValue(String(mode === 'sqm' ? r.sqm : r.pyeong)); }}
                    className={`w-full px-5 py-3 flex justify-between items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${nearest?.label === r.label ? 'bg-blue-50 dark:bg-blue-950/30' : ''}`}
                  >
                    <span className={`font-semibold ${nearest?.label === r.label ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>{r.label}</span>
                    <span className="text-slate-400 dark:text-slate-500">{r.pyeong}평 = {r.sqm}㎡</span>
                  </button>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
