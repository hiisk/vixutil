'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';

// 기준: 1kg = ? 각 단위 (역수로 저장 — toKg: 1단위 = ? kg)
const UNITS: { key: string; label: string; toKg: number }[] = [
  { key: 'mg',    label: '밀리그램 (mg)', toKg: 1e-6 },
  { key: 'g',     label: '그램 (g)',      toKg: 0.001 },
  { key: 'kg',    label: '킬로그램 (kg)', toKg: 1 },
  { key: 't',     label: '톤 (t)',         toKg: 1000 },
  { key: 'oz',    label: '온스 (oz)',      toKg: 0.028349523125 },
  { key: 'lb',    label: '파운드 (lb)',    toKg: 0.45359237 },
  { key: 'stone', label: '스톤 (stone)',   toKg: 6.35029318 },
  { key: 'gun',   label: '근 (斤)',        toKg: 0.6 },   // 한국 1근 = 600g
  { key: 'don',   label: '돈 (錢)',        toKg: 0.00375 }, // 1돈 = 3.75g
  { key: 'nyang', label: '냥 (兩)',        toKg: 0.0375 },  // 1냥 = 37.5g
];

function fmt(val: number): string {
  if (val === 0) return '0';
  if (Math.abs(val) >= 0.000001 && Math.abs(val) < 1e13) {
    return parseFloat(val.toPrecision(8)).toLocaleString('ko-KR', { maximumSignificantDigits: 8 });
  }
  return val.toExponential(5);
}

export default function UnitWeightPage() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [results, setResults] = useState<{ key: string; label: string; val: number }[] | null>(null);

  function calculate() {
    const n = parseFloat(value);
    if (isNaN(n)) return;
    const from = UNITS.find(u => u.key === fromUnit)!;
    const kg = n * from.toKg;
    setResults(UNITS.map(u => ({ key: u.key, label: u.label, val: kg / u.toKg })));
  }

  return (
    <CalcShell title="무게 단위 변환기" description="mg · g · kg · t · oz · lb · stone · 근 · 돈 · 냥 동시 변환">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">변환할 값 입력</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>숫자</Label>
              <input
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="예: 1"
                className={inputCls}
              />
            </div>
            <div>
              <Label>단위</Label>
              <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={selectCls}>
                {UNITS.map(u => (
                  <option key={u.key} value={u.key}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>변환하기</PrimaryBtn>
          </div>
        </Card>

        {results && (
          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">변환 결과</p>
            <div className="flex flex-col divide-y divide-slate-100">
              {results.map(r => (
                <div
                  key={r.key}
                  className={`flex justify-between items-center py-3 ${r.key === fromUnit ? 'font-bold' : ''}`}
                >
                  <span className={`text-sm ${r.key === fromUnit ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                    {r.label}
                    {r.key === fromUnit && <span className="ml-1 text-xs text-blue-400">(입력)</span>}
                  </span>
                  <span className={`text-sm font-mono ${r.key === fromUnit ? 'text-blue-700 dark:text-blue-300 font-black' : 'text-slate-800 dark:text-slate-100'}`}>
                    {fmt(r.val)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
