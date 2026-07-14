'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';

type TempUnit = 'C' | 'F' | 'K' | 'R';

// 모두 섭씨 기준으로 변환
function toCelsius(val: number, unit: TempUnit): number {
  switch (unit) {
    case 'C': return val;
    case 'F': return (val - 32) * 5 / 9;
    case 'K': return val - 273.15;
    case 'R': return (val - 491.67) * 5 / 9;
  }
}

function fromCelsius(c: number, unit: TempUnit): number {
  switch (unit) {
    case 'C': return c;
    case 'F': return c * 9 / 5 + 32;
    case 'K': return c + 273.15;
    case 'R': return (c + 273.15) * 9 / 5;
  }
}

const UNIT_LABELS: Record<TempUnit, string> = {
  C: '섭씨 (°C)',
  F: '화씨 (°F)',
  K: '켈빈 (K)',
  R: '랭킨 (°R)',
};

// 체감 설명 (섭씨 기준)
const DESCRIPTIONS: { max: number; desc: string; color: string }[] = [
  { max: -30,  desc: '극도로 추운 날씨, 동상 주의',    color: 'text-indigo-700' },
  { max: -10,  desc: '매우 추운 날씨, 두꺼운 외투 필수', color: 'text-blue-700' },
  { max: 0,    desc: '영하의 날씨, 결빙 주의',          color: 'text-blue-600' },
  { max: 10,   desc: '쌀쌀한 날씨, 외투 필요',          color: 'text-sky-600' },
  { max: 20,   desc: '선선한 날씨, 활동하기 좋음',       color: 'text-emerald-600' },
  { max: 27,   desc: '적정 실내 온도 범위',              color: 'text-green-600' },
  { max: 36,   desc: '따뜻하고 덥게 느껴지는 온도',      color: 'text-amber-600' },
  { max: 37.5, desc: '체온 수준 (정상 체온 36.5°C)',    color: 'text-orange-500' },
  { max: 40,   desc: '고온, 열사병 주의',               color: 'text-orange-600' },
  { max: 100,  desc: '물이 끓는 온도 (100°C)',          color: 'text-red-600' },
  { max: Infinity, desc: '매우 높은 온도',               color: 'text-red-800' },
];

const LANDMARKS: { c: number; label: string }[] = [
  { c: -273.15, label: '절대영도' },
  { c: -40,     label: '-40°C = -40°F' },
  { c: 0,       label: '물의 어는점' },
  { c: 20,      label: '표준 실온' },
  { c: 36.5,    label: '사람 체온' },
  { c: 100,     label: '물의 끓는점' },
];

export default function UnitTempPage() {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<TempUnit>('C');
  const [result, setResult] = useState<{ C: number; F: number; K: number; R: number } | null>(null);

  function calculate() {
    const n = parseFloat(value);
    if (isNaN(n)) return;
    const c = toCelsius(n, unit);
    setResult({
      C: c,
      F: fromCelsius(c, 'F'),
      K: fromCelsius(c, 'K'),
      R: fromCelsius(c, 'R'),
    });
  }

  const descObj = result
    ? DESCRIPTIONS.find(d => result.C < d.max) ?? DESCRIPTIONS[DESCRIPTIONS.length - 1]
    : null;

  return (
    <CalcShell title="온도 변환기" description="섭씨(°C) · 화씨(°F) · 켈빈(K) · 랭킨(°R) 즉시 변환">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">온도 입력</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>온도값</Label>
              <input
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="예: 36.5"
                className={inputCls}
              />
            </div>
            <div>
              <Label>단위</Label>
              <select value={unit} onChange={e => setUnit(e.target.value as TempUnit)} className={selectCls}>
                {(Object.keys(UNIT_LABELS) as TempUnit[]).map(k => (
                  <option key={k} value={k}>{UNIT_LABELS[k]}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>변환하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            {/* 체감 설명 */}
            {descObj && (
              <div className={`rounded-2xl border px-5 py-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700`}>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">체감 설명</p>
                <p className={`text-base font-bold ${descObj.color}`}>{descObj.desc}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{result.C.toFixed(2)}°C 기준</p>
              </div>
            )}

            {/* 변환 결과 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">변환 결과</p>
              <div className="flex flex-col divide-y divide-slate-100">
                {(Object.keys(UNIT_LABELS) as TempUnit[]).map(k => (
                  <div
                    key={k}
                    className={`flex justify-between items-center py-3.5 ${k === unit ? 'font-bold' : ''}`}
                  >
                    <span className={`text-sm ${k === unit ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                      {UNIT_LABELS[k]}
                      {k === unit && <span className="ml-1 text-xs text-blue-400">(입력)</span>}
                    </span>
                    <span className={`text-base font-mono ${k === unit ? 'text-blue-700 font-black' : 'text-slate-900 dark:text-slate-100 font-semibold'}`}>
                      {result[k].toFixed(4)}
                      {k !== 'K' && k !== 'R' ? `°${k}` : k}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 주요 기준점 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">주요 기준 온도</p>
              <div className="flex flex-col gap-2">
                {LANDMARKS.map(lm => (
                  <div key={lm.c} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{lm.label}</span>
                    <span className="text-slate-800 dark:text-slate-100 font-mono font-semibold">
                      {lm.c}°C / {fromCelsius(lm.c, 'F').toFixed(1)}°F / {fromCelsius(lm.c, 'K').toFixed(2)}K
                    </span>
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
