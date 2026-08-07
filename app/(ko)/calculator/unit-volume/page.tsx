'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';

// 기준: 1L = ? 각 단위 (역수로 저장 — toL: 1단위 = ? L)
const UNITS: { key: string; label: string; toL: number }[] = [
  { key: 'ml', label: '밀리리터 (mL)', toL: 0.001 },
  { key: 'l', label: '리터 (L)', toL: 1 },
  { key: 'm3', label: '세제곱미터 (m³)', toL: 1000 },
  { key: 'tsp', label: '작은술 (5mL)', toL: 0.005 },
  { key: 'tbsp', label: '큰술 (15mL)', toL: 0.015 },
  { key: 'cup', label: '컵 (200mL)', toL: 0.2 },
  { key: 'hop', label: '홉 (合)', toL: 0.18039 }, // 되의 1/10
  { key: 'doe', label: '되 (升)', toL: 1.8039 }, // 도량형 기준 1.8039L
  { key: 'mal', label: '말 (斗)', toL: 18.039 }, // 되의 10배
  { key: 'floz', label: '미국 액량온스 (fl oz)', toL: 0.0295735295625 },
  { key: 'gal', label: '미국 갤런 (gal)', toL: 3.785411784 },
  { key: 'pint', label: '영국 파인트 (pt)', toL: 0.56826125 },
];

function fmt(val: number): string {
  if (val === 0) return '0';
  if (Math.abs(val) >= 0.000001 && Math.abs(val) < 1e13) {
    return parseFloat(val.toPrecision(8)).toLocaleString('ko-KR', { maximumSignificantDigits: 8 });
  }
  return val.toExponential(5);
}

export default function UnitVolumePage() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('l');
  const [results, setResults] = useState<{ key: string; label: string; val: number }[] | null>(null);

  function calculate() {
    const n = parseFloat(value);
    if (isNaN(n)) return;
    const from = UNITS.find(u => u.key === fromUnit)!;
    const l = n * from.toL;
    setResults(UNITS.map(u => ({ key: u.key, label: u.label, val: l / u.toL })));
  }

  return (
    <CalcShell
      path="/calculator/unit-volume"
      title="부피 단위 변환기"
      description="mL · L · m³ · 작은술 · 큰술 · 컵 · 홉 · 되 · 말 · 갤런 동시 변환"
      intro={
        <>
          <h2>미국 갤런과 영국 갤런은 다릅니다</h2>
          <p>
            미국 갤런은 정확히 <strong>3.785411784L</strong>, 영국 갤런은 <strong>4.54609L</strong>로
            20% 넘게 차이 납니다. 파인트와 액량온스도 마찬가지라 어느 나라 것인지 밝히지 않은
            레시피는 그대로 따라 하면 어긋납니다. 이 변환기는 액량온스와 갤런은 미국, 파인트는
            영국 기준으로 두었습니다.
          </p>
          <h2>컵은 나라마다 다릅니다</h2>
          <p>
            한국과 일본 요리책의 컵은 <strong>200mL</strong>, 미국은 약 236.6mL, 호주는 250mL입니다.
            이 변환기는 200mL를 씁니다. 작은술 5mL와 큰술 15mL는 대부분의 나라에서 같습니다.
          </p>
          <h2>홉·되·말</h2>
          <p>
            우리 전통 단위는 열 배씩 올라갑니다. <strong>10홉 = 1되, 10되 = 1말</strong>입니다.
            1되는 1.8039L이라 쌀 한 되가 대략 1.6kg쯤 나갑니다. 쌀집이나 술 도량에서 아직 쓰입니다.
          </p>
          <h2>부피와 무게를 섞지 마세요</h2>
          <p>
            같은 1컵이라도 물은 200g, 밀가루는 약 110g, 꿀은 약 280g입니다. 부피를 무게로 바꾸려면
            그 재료의 밀도가 필요합니다. 물만 1mL = 1g에 가까워 그대로 바꿔도 됩니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="label-caps mb-3">변환할 값 입력</p>
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
            <p className="label-caps mb-3">변환 결과</p>
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
