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
    <CalcShell title="체지방률 계산기" description="해군 공식 · BMI 추정법 · ACSM 기준 등급 분석">
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
