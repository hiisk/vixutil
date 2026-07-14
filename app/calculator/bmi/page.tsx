'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

// 대한비만학회 2022 진료지침 기준
const LEVELS = [
  { max: 18.5, label: '저체중',     desc: '영양 상태 확인 필요',    color:'text-blue-600',   bg:'bg-blue-50 border-blue-200',   bar:'bg-blue-500' },
  { max: 23.0, label: '정상',       desc: '건강 체중 범위',         color:'text-emerald-700',bg:'bg-emerald-50 border-emerald-200',bar:'bg-emerald-500' },
  { max: 25.0, label: '과체중',     desc: '체중 관리 시작 권장',    color:'text-amber-600',  bg:'bg-amber-50 border-amber-200',  bar:'bg-amber-400' },
  { max: 30.0, label: '비만 1단계', desc: '생활습관 개선 필요',     color:'text-orange-600', bg:'bg-orange-50 border-orange-200',bar:'bg-orange-500' },
  { max: 35.0, label: '비만 2단계', desc: '의료적 관리 권장',       color:'text-red-600',    bg:'bg-red-50 border-red-200',      bar:'bg-red-500' },
  { max: Infinity, label:'비만 3단계',desc:'즉각적 의료 관리 필요', color:'text-red-800',    bg:'bg-red-100 border-red-300',     bar:'bg-red-700' },
];

const BMI_SCALE = { min: 14, max: 42 }; // 게이지 범위

export default function BmiPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState<'m'|'f'>('m');
  const [result, setResult] = useState<{
    bmi: number; std: number; diff: number; level: typeof LEVELS[0];
    idealMin: number; idealMax: number;
  }|null>(null);

  function calculate() {
    const h = Number(height) / 100;
    const w = Number(weight);
    if (!h || !w) return;
    const bmi = w / (h * h);
    const std = sex === 'm' ? (Number(height) - 100) * 0.9 : (Number(height) - 100) * 0.85;
    const level = LEVELS.find(l => bmi < l.max) ?? LEVELS[LEVELS.length - 1];
    // 정상 BMI 범위 체중
    const idealMin = 18.5 * h * h;
    const idealMax = 22.9 * h * h;
    setResult({ bmi, std, diff: w - std, level, idealMin, idealMax });
  }

  const bmiPct = result ? Math.min(100, Math.max(0, (result.bmi - BMI_SCALE.min) / (BMI_SCALE.max - BMI_SCALE.min) * 100)) : 0;

  return (
    <CalcShell title="BMI 계산기" description="대한비만학회 2022 기준 체질량지수 · 표준체중 · 정상 체중 범위">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">신체 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>성별</Label>
              <div className="grid grid-cols-2 gap-2">
                {([{v:'m',l:'남성'},{v:'f',l:'여성'}] as const).map(s=>(
                  <button key={s.v} onClick={()=>setSex(s.v)}
                    className={`py-3 text-sm font-semibold rounded-xl border transition-colors ${
                      sex===s.v ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                    }`}>
                    {s.l}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>키 (cm)</Label>
                <input type="number" value={height} onChange={e=>setHeight(e.target.value)}
                  placeholder="예: 175" className={inputCls}/>
              </div>
              <div>
                <Label>몸무게 (kg)</Label>
                <input type="number" value={weight} onChange={e=>setWeight(e.target.value)}
                  placeholder="예: 70" className={inputCls}/>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            {/* BMI 결과 카드 */}
            <div className={`rounded-2xl border p-5 ${result.level.bg}`}>
              <div className="flex justify-between items-start mb-5">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">BMI 지수</p>
                  <p className={`text-5xl font-black ${result.level.color}`}>{result.bmi.toFixed(1)}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{result.level.desc}</p>
                </div>
                <span className={`text-base font-black px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border ${result.level.color} border-current`}>
                  {result.level.label}
                </span>
              </div>

              {/* 게이지 */}
              <div className="relative mb-4">
                <div className="h-3 rounded-full overflow-hidden flex gap-0.5">
                  {[
                    {w:15.6, cls:'bg-blue-300'},   // ~18.5
                    {w:30.8, cls:'bg-emerald-300'}, // 18.5~23
                    {w:8.5,  cls:'bg-amber-300'},   // 23~25
                    {w:17.9, cls:'bg-orange-300'},  // 25~30
                    {w:17.9, cls:'bg-red-300'},     // 30~35
                    {w:9.3,  cls:'bg-red-500'},     // 35+
                  ].map((s,i)=>(
                    <div key={i} className={`h-full ${s.cls}`} style={{width:`${s.w}%`}}/>
                  ))}
                </div>
                <div className="absolute top-0 w-3 h-3 bg-slate-800 rounded-full border-2 border-white shadow -translate-x-1.5"
                  style={{left:`${bmiPct}%`}}/>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1.5 px-0.5">
                  {['14','18.5','23','25','30','35','42'].map(v=><span key={v}>{v}</span>)}
                </div>
              </div>
            </div>

            {/* 수치 카드들 */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">표준체중 ({sex==='m'?'남':'여'})</p>
                <p className="text-xl font-black text-slate-900 dark:text-slate-100">{result.std.toFixed(1)} kg</p>
                <p className={`text-xs mt-1 font-semibold ${result.diff>0?'text-orange-500':result.diff<0?'text-blue-500':'text-emerald-600'}`}>
                  {result.diff>0?`+${result.diff.toFixed(1)}kg 초과`:result.diff<0?`${result.diff.toFixed(1)}kg 미달`:'정상 체중'}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">정상 체중 범위</p>
                <p className="text-base font-black text-slate-900 dark:text-slate-100">
                  {result.idealMin.toFixed(1)} ~ {result.idealMax.toFixed(1)} kg
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">BMI 18.5 ~ 22.9</p>
              </Card>
            </div>

            {/* 기준표 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">BMI 기준표 (대한비만학회 2022)</p>
              <div className="flex flex-col gap-1.5">
                {LEVELS.map((l,i)=>(
                  <div key={i} className={`flex justify-between items-center text-xs px-3.5 py-2.5 rounded-xl border ${
                    result.level.label===l.label ? `${l.bg} font-bold` : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${l.bar}`}/>
                      <span className={result.level.label===l.label?l.color:''}>{l.label}</span>
                    </div>
                    <div className="text-right">
                      <span className={result.level.label===l.label?l.color:''}>
                        {i===0?'BMI < 18.5':i===LEVELS.length-1?'BMI ≥ 35':`BMI ${LEVELS[i-1].max} ~ ${l.max}`}
                      </span>
                    </div>
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
