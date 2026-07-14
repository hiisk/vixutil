'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();
const LEGAL_RATE = 5.5;

export default function JeonwolsePage() {
  const [mode, setMode] = useState<'toMonthly' | 'toJeon'>('toMonthly');
  const [jeonse, setJeonse] = useState('');
  const [depositM, setDepositM] = useState('');
  const [monthly, setMonthly] = useState('');
  const [depositJ, setDepositJ] = useState('');
  const [rate, setRate] = useState(String(LEGAL_RATE));
  const [result, setResult] = useState<null | { value: number; label: string }>(null);

  function calculate() {
    const r = Number(rate) / 100;
    if (r <= 0) return;
    if (mode === 'toMonthly') {
      const j = Number(jeonse);
      const d = Number(depositM || 0);
      if (j <= d) return;
      const monthly = (j - d) * r / 12;
      setResult({ value: monthly, label: '월세' });
    } else {
      const m = Number(monthly);
      const d = Number(depositJ || 0);
      if (m <= 0) return;
      const jeonse = d + m * 12 / r;
      setResult({ value: jeonse, label: '전세 환산액' });
    }
  }

  return (
    <CalcShell title="전월세 전환 계산기" description="전세 ↔ 월세 금액 환산">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'toMonthly', label: '전세 → 월세' },
            { value: 'toJeon', label: '월세 → 전세' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'toMonthly' | 'toJeon'); setResult(null); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            {mode === 'toMonthly' ? (
              <>
                <div>
                  <Label>전세금 (원)</Label>
                  <input type="number" value={jeonse} onChange={e => setJeonse(e.target.value)}
                    placeholder="예: 300,000,000" className={inputCls} min="0" />
                </div>
                <div>
                  <Label>월세 전환 시 보증금 (원)</Label>
                  <input type="number" value={depositM} onChange={e => setDepositM(e.target.value)}
                    placeholder="예: 10,000,000" className={inputCls} min="0" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>보증금 (원)</Label>
                  <input type="number" value={depositJ} onChange={e => setDepositJ(e.target.value)}
                    placeholder="예: 10,000,000" className={inputCls} min="0" />
                </div>
                <div>
                  <Label>월세 (원)</Label>
                  <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
                    placeholder="예: 700,000" className={inputCls} min="0" />
                </div>
              </>
            )}
            <div>
              <Label>전환율 (%)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="5.5" className={inputCls} min="0" step="0.1" />
              <p className="text-xs text-blue-600 mt-1">법정 전환율 5.5% (2024년 기준)</p>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <div className="bg-blue-600 rounded-2xl p-5">
            <p className="text-blue-200 text-xs mb-1">{result.label}</p>
            <p className="text-white text-3xl font-black">{fmt(result.value)}원</p>
            <p className="text-blue-200 text-sm mt-1">전환율 {rate}% 기준</p>
          </div>
        )}
      </div>
    </CalcShell>
  );
}
