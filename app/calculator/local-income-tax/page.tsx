'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';

const BRACKETS = [
  { limit: 1400, rate: 0.06, deduct: 0 },
  { limit: 5000, rate: 0.15, deduct: 126 },
  { limit: 8800, rate: 0.24, deduct: 576 },
  { limit: 15000, rate: 0.35, deduct: 1544 },
  { limit: 30000, rate: 0.38, deduct: 1994 },
  { limit: 50000, rate: 0.40, deduct: 2594 },
  { limit: 100000, rate: 0.42, deduct: 3594 },
  { limit: Infinity, rate: 0.45, deduct: 6594 },
];

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function LocalIncomeTaxPage() {
  const [mode, setMode] = useState<'direct' | 'calc'>('direct');
  const [incomeTaxInput, setIncomeTaxInput] = useState('');
  const [taxBase, setTaxBase] = useState('');
  const [result, setResult] = useState<null | { incomeTax: number; localTax: number; total: number }>(null);

  function calculate() {
    if (mode === 'direct') {
      const t = Number(incomeTaxInput);
      if (t <= 0) return;
      const localTax = t * 0.1;
      setResult({ incomeTax: t, localTax, total: t + localTax });
    } else {
      const b = Number(taxBase) / 10000;
      if (b <= 0) return;
      const br = BRACKETS.find(br => b <= br.limit)!;
      const incomeTax = Math.max(0, b * br.rate - br.deduct) * 10000;
      const localTax = incomeTax * 0.1;
      setResult({ incomeTax, localTax, total: incomeTax + localTax });
    }
  }

  return (
    <CalcShell title="지방소득세 계산기" description="소득세의 10% — 지방소득세 계산">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'direct', label: '소득세 입력' },
            { value: 'calc', label: '과세표준 입력' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'direct' | 'calc'); setResult(null); }}
        />
        <Card className="p-5">
          {mode === 'direct' ? (
            <div>
              <Label>이미 계산된 소득세 (원)</Label>
              <input type="number" value={incomeTaxInput} onChange={e => setIncomeTaxInput(e.target.value)}
                placeholder="예: 5,000,000" className={inputCls} min="0" />
            </div>
          ) : (
            <div>
              <Label>과세표준 (원)</Label>
              <input type="number" value={taxBase} onChange={e => setTaxBase(e.target.value)}
                placeholder="예: 50,000,000" className={inputCls} min="0" />
            </div>
          )}
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">총 납부액</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="소득세" value={`${fmt(result.incomeTax)}원`} />
              <SummaryCard label="지방소득세 (×10%)" value={`${fmt(result.localTax)}원`} variant="red" />
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                지방소득세는 소득세의 10%로 산출됩니다.<br />
                신고 기한: 소득세 신고 다음달 말일까지 (위택스·지자체 납부)
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
