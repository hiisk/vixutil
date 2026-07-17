'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';

// 기준: 1 미터 = ? 각 단위
const UNITS: { key: string; label: string; toMeter: number }[] = [
  { key: 'mm',    label: '밀리미터 (mm)',  toMeter: 0.001 },
  { key: 'cm',    label: '센티미터 (cm)',  toMeter: 0.01 },
  { key: 'm',     label: '미터 (m)',       toMeter: 1 },
  { key: 'km',    label: '킬로미터 (km)', toMeter: 1000 },
  { key: 'in',    label: '인치 (inch)',    toMeter: 0.0254 },
  { key: 'ft',    label: '피트 (feet)',    toMeter: 0.3048 },
  { key: 'yd',    label: '야드 (yard)',    toMeter: 0.9144 },
  { key: 'mi',    label: '마일 (mile)',    toMeter: 1609.344 },
  { key: 'nmi',   label: '해리 (NM)',      toMeter: 1852 },
];

function fmt(val: number): string {
  if (val === 0) return '0';
  if (Math.abs(val) >= 0.0001 && Math.abs(val) < 1e12) {
    const s = val.toPrecision(8);
    const n = parseFloat(s);
    return n.toLocaleString('ko-KR', { maximumSignificantDigits: 8 });
  }
  return val.toExponential(5);
}

export default function UnitLengthPage() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [results, setResults] = useState<{ key: string; label: string; val: number }[] | null>(null);

  function calculate() {
    const n = parseFloat(value);
    if (isNaN(n)) return;
    const from = UNITS.find(u => u.key === fromUnit)!;
    const meters = n * from.toMeter;
    setResults(UNITS.map(u => ({ key: u.key, label: u.label, val: meters / u.toMeter })));
  }

  return (
    <CalcShell path="/calculator/unit-length" title="길이 단위 변환기" description="mm · cm · m · km · 인치 · 피트 · 야드 · 마일 · 해리 동시 변환">
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
                placeholder="예: 100"
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
