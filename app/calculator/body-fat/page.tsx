'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, TabBar, RatioBar } from '@/components/CalcShell';

// ACSM 체지방률 등급 기준
const ACSM_MALE: { max: number; label: string; color: string; bg: string }[] = [
  { max: 6,   label: '필수 지방',  color: 'text-blue-700 dark:text-blue-300',    bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50' },
  { max: 14,  label: '운동 선수', color: 'text-emerald-700 dark:text-emerald-300',  bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50' },
  { max: 18,  label: '피트니스',  color: 'text-green-600',    bg: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50' },
  { max: 25,  label: '평균',      color: 'text-amber-600',    bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50' },
  { max: Infinity, label: '비만', color: 'text-red-600',      bg: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50' },
];
const ACSM_FEMALE: { max: number; label: string; color: string; bg: string }[] = [
  { max: 14,  label: '필수 지방',  color: 'text-blue-700 dark:text-blue-300',    bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50' },
  { max: 21,  label: '운동 선수', color: 'text-emerald-700 dark:text-emerald-300',  bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50' },
  { max: 25,  label: '피트니스',  color: 'text-green-600',    bg: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50' },
  { max: 32,  label: '평균',      color: 'text-amber-600',    bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50' },
  { max: Infinity, label: '비만', color: 'text-red-600',      bg: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50' },
];

function getLevel(bf: number, sex: 'm' | 'f') {
  const table = sex === 'm' ? ACSM_MALE : ACSM_FEMALE;
  return table.find(l => bf < l.max) ?? table[table.length - 1];
}

// 미 해군 체지방 공식
function navyBF(sex: 'm' | 'f', neck: number, waist: number, hip: number, height: number): number {
  if (sex === 'm') {
    return 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    return 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  }
}

// 정정: Deurenberg 1991 원공식: BF% = 1.2*BMI + 0.23*Age - 10.8*sex - 5.4 (sex: 남=1, 여=0)
function bmiBFCorrect(bmi: number, age: number, sex: 'm' | 'f'): number {
  const s = sex === 'm' ? 1 : 0;
  return 1.2 * bmi + 0.23 * age - 10.8 * s - 5.4;
}

export default function BodyFatPage() {
  const [tab, setTab] = useState<'navy' | 'bmi'>('navy');
  const [sex, setSex] = useState<'m' | 'f'>('m');

  // Navy
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [weight, setWeight] = useState('');

  // BMI method
  const [bmi, setBmi] = useState('');
  const [age, setAge] = useState('');

  const [result, setResult] = useState<{
    bf: number; fatMass: number; leanMass: number; totalWeight: number; level: typeof ACSM_MALE[0];
  } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    let bf = 0;
    let totalWeight = parseFloat(weight) || 0;

    if (tab === 'navy') {
      const h = parseFloat(height);
      const n = parseFloat(neck);
      const w = parseFloat(waist);
      const hp = parseFloat(hip);
      if (!h || !n || !w || (sex === 'f' && !hp)) { setError('모든 항목을 입력해주세요.'); return; }
      if (sex === 'm' && w <= n) { setError('허리둘레가 목둘레보다 커야 합니다.'); return; }
      if (sex === 'f' && (w + hp) <= n) { setError('허리+엉덩이 둘레가 목둘레보다 커야 합니다.'); return; }
      bf = navyBF(sex, n, w, hp, h);
    } else {
      const b = parseFloat(bmi);
      const a = parseFloat(age);
      if (!b || !a) { setError('BMI와 나이를 입력해주세요.'); return; }
      bf = bmiBFCorrect(b, a, sex);
      // BMI 방법에서는 체중 계산 불가 → 추정 불필요
      if (!totalWeight) totalWeight = 0;
    }

    bf = Math.max(0, Math.min(70, bf));
    const fatMass = totalWeight > 0 ? (bf / 100) * totalWeight : 0;
    const leanMass = totalWeight > 0 ? totalWeight - fatMass : 0;
    const level = getLevel(bf, sex);
    setResult({ bf, fatMass, leanMass, totalWeight, level });
  }

  return (
    <CalcShell
      path="/calculator/body-fat"
      title="체지방률 계산기"
      description="해군 공식 · BMI 추정법 · ACSM 기준 등급 분석"
      intro={
        <>
          <h2>두 가지 추정법</h2>
          <p>
            <strong>미 해군 공식</strong>은 목·허리(여성은 엉덩이 포함) 둘레와 키로 체지방률을 추정합니다.
            줄자만 있으면 되고, 몸의 형태를 반영하기 때문에 BMI보다 실제에 가깝습니다.{' '}
            <strong>BMI 추정법</strong>(Deurenberg 공식)은 BMI·나이·성별만으로 계산해 간편한 대신 오차가 큽니다.
            둘의 값이 벌어진다면 체형이 평균에서 벗어나 있다는 신호로 볼 수 있습니다.
          </p>
          <h2>남녀 기준이 다릅니다</h2>
          <p>
            여성은 생리적으로 필수 지방이 더 많아, 같은 수치라도 등급이 다릅니다. 이 계산기는{' '}
            <strong>ACSM 기준</strong>으로 성별을 나눠 등급을 매깁니다. 남성 기준을 여성에게 그대로 적용하면
            건강한 사람도 과체지방으로 나오므로, 남녀 수치를 직접 비교하는 것은 의미가 없습니다.
          </p>
          <h2>측정이 결과를 좌우합니다</h2>
          <p>
            해군 공식은 <strong>둘레를 어떻게 재느냐</strong>에 결과가 크게 흔들립니다. 줄자를 세게 조이거나
            재는 위치가 매번 다르면 며칠 사이에 몇 %씩 움직입니다. 같은 시간대에, 같은 자세로, 힘을 빼고
            재야 비교할 값이 나옵니다.
          </p>
          <h2>절대값보다 추세를 보세요</h2>
          <p>
            줄자 공식이든 체성분 측정기든 <strong>추정</strong>이며, 정밀 측정법(DEXA 등)과는 차이가 납니다.
            그러니 오늘 나온 숫자 하나에 의미를 두기보다 <strong>같은 방법으로 재면서 방향이 어디로
            가는지</strong>를 보는 편이 유용합니다. 이 계산기는 참고용이며 의학적 진단이 아닙니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'navy', label: '해군 공식', sub: '더 정확' },
            { value: 'bmi',  label: 'BMI 추정법', sub: '간편' },
          ]}
          value={tab}
          onChange={v => { setTab(v); setResult(null); setError(''); }}
        />

        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">기본 정보</p>
          <div className="flex flex-col gap-3">
            {/* 성별 */}
            <div>
              <Label>성별</Label>
              <div className="grid grid-cols-2 gap-2">
                {([{ v: 'm', l: '남성' }, { v: 'f', l: '여성' }] as const).map(s => (
                  <button
                    key={s.v}
                    onClick={() => { setSex(s.v); setResult(null); }}
                    className={`py-3 text-sm font-semibold rounded-xl border transition-colors ${
                      sex === s.v ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                    }`}
                  >
                    {s.l}
                  </button>
                ))}
              </div>
            </div>

            {tab === 'navy' ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>키 (cm)</Label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className={inputCls} />
                  </div>
                  <div>
                    <Label>체중 (kg) · 선택</Label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inputCls} />
                  </div>
                </div>
                <div className={`grid gap-3 ${sex === 'f' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  <div>
                    <Label>목둘레 (cm)</Label>
                    <input type="number" value={neck} onChange={e => setNeck(e.target.value)} placeholder="37" className={inputCls} />
                  </div>
                  <div>
                    <Label>허리둘레 (cm)</Label>
                    <input type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder="80" className={inputCls} />
                  </div>
                  {sex === 'f' && (
                    <div>
                      <Label>엉덩이둘레 (cm)</Label>
                      <input type="number" value={hip} onChange={e => setHip(e.target.value)} placeholder="95" className={inputCls} />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">* 목둘레: 후두골 아래 · 허리둘레: 배꼽 위 가장 가는 부위</p>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>BMI</Label>
                    <input type="number" value={bmi} onChange={e => setBmi(e.target.value)} placeholder="22.5" step="0.1" className={inputCls} />
                  </div>
                  <div>
                    <Label>나이 (세)</Label>
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="30" className={inputCls} />
                  </div>
                </div>
                <div>
                  <Label>체중 (kg) · 선택</Label>
                  <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inputCls} />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Deurenberg 1991 공식 기반 추정 (±3~5% 오차 가능)</p>
              </>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            {/* 결과 카드 */}
            <div className={`rounded-2xl border p-5 ${result.level.bg}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">체지방률</p>
                  <p className={`text-5xl font-black ${result.level.color}`}>{result.bf.toFixed(1)}%</p>
                </div>
                <span className={`text-sm font-black px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border ${result.level.color} border-current`}>
                  {result.level.label}
                </span>
              </div>

              {result.totalWeight > 0 && (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">체지방량</p>
                      <p className="text-lg font-black text-slate-800 dark:text-slate-100">{result.fatMass.toFixed(1)} kg</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">근육·제지방량</p>
                      <p className="text-lg font-black text-slate-800 dark:text-slate-100">{result.leanMass.toFixed(1)} kg</p>
                    </div>
                  </div>
                  <RatioBar a={result.leanMass} b={result.fatMass} labelA="근육·제지방" labelB="체지방" />
                </>
              )}
            </div>

            {/* ACSM 기준표 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">ACSM 체지방률 등급 기준 ({sex === 'm' ? '남성' : '여성'})</p>
              <div className="flex flex-col gap-1.5">
                {(sex === 'm' ? ACSM_MALE : ACSM_FEMALE).map((l, i) => {
                  const prev = (sex === 'm' ? ACSM_MALE : ACSM_FEMALE)[i - 1];
                  return (
                    <div
                      key={l.label}
                      className={`flex justify-between items-center text-xs px-3.5 py-2.5 rounded-xl border ${
                        result.level.label === l.label ? `${l.bg} font-bold` : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <span className={result.level.label === l.label ? l.color : ''}>{l.label}</span>
                      <span className={result.level.label === l.label ? l.color : ''}>
                        {i === 0
                          ? `< ${l.max}%`
                          : l.max === Infinity
                          ? `≥ ${prev?.max}%`
                          : `${prev?.max} ~ ${l.max}%`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
