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
    <CalcShell
      path="/calculator/jeonwolse"
      title="전월세 전환 계산기"
      description="전세 ↔ 월세 금액 환산"
      intro={
        <>
          <h2>계산 방식</h2>
          <p>
            전세를 월세로 바꿀 때는 <strong>(전세금 − 새 보증금) × 전환율 ÷ 12</strong>가 월세입니다.
            반대로 월세를 전세로 환산할 때는 <strong>보증금 + (월세 × 12 ÷ 전환율)</strong>이 됩니다.
            전환율이 낮을수록 세입자에게 유리합니다.
          </p>
          <h2>법정 전환율은 고정값이 아닙니다</h2>
          <p>
            주택임대차보호법은 전환율 상한을 <strong>연 10%</strong>와{' '}
            <strong>한국은행 기준금리 + 2%</strong> 중 <strong>낮은 쪽</strong>으로 정합니다.
            기준금리에 연동되므로 금리가 움직이면 상한도 함께 움직입니다. 이 계산기의 기본값도 그렇게 계산된
            값이니, 계약 시점의 기준금리를 확인하고 직접 넣어 쓰는 것이 정확합니다.
          </p>
          <h2>상한이 적용되는 상황이 정해져 있습니다</h2>
          <p>
            이 상한은 <strong>기존 계약의 전세를 월세로 전환</strong>할 때 적용됩니다. 새로 맺는 계약의
            월세 자체를 규제하는 것이 아니어서, 신규 계약에서는 시세대로 정해지는 것이 보통입니다.
            그래서 시장에서 실제로 쓰이는 전환율이 법정 상한보다 높은 경우가 있습니다. 전세와 월세 중 뭐가
            유리한지 따질 때는 보증금을 예금에 넣었을 때의 이자, 대출을 낀다면 그 이자까지 같이 비교해야
            합니다.
          </p>
        </>
      }
    >
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
