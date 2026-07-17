'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

export default function BreakevenPage() {
  const [mode, setMode] = useState<'invest' | 'biz'>('invest');

  // 투자 BEP
  const [buyPrice, setBuyPrice] = useState(50_000);
  const [buyFee, setBuyFee] = useState('0.015');
  const [sellFee, setSellFee] = useState('0.015');
  const [txTax, setTxTax] = useState(true);

  // 사업 BEP
  const [fixedCost, setFixedCost] = useState(5_000_000);
  const [sellPriceU, setSellPriceU] = useState(20_000);
  const [varCost, setVarCost] = useState(8_000);

  const [result, setResult] = useState<{ bep: number; extra: string } | null>(null);

  function calculate() {
    if (mode === 'invest') {
      const p = buyPrice;
      if (!p) return;
      const bf = Number(buyFee) / 100;
      const sf = Number(sellFee) / 100;
      const tt = txTax ? 0.0018 : 0;
      const bep = p * (1 + bf) / (1 - sf - tt);
      const upRate = (bep / p - 1) * 100;
      setResult({ bep, extra: `필요 상승률 ${upRate.toFixed(2)}%` });
    } else {
      const fc = fixedCost;
      const sp = sellPriceU;
      const vc = varCost;
      if (fc <= 0 || sp <= vc) return;
      const contrib = sp - vc;
      const qty = fc / contrib;
      const sales = qty * sp;
      setResult({ bep: qty, extra: `BEP 매출 ${Math.ceil(sales).toLocaleString()}원` });
    }
  }

  return (
    <CalcShell path="/calculator/breakeven" title="손익분기점 계산기" description="투자 BEP 가격 · 사업 BEP 판매량 계산">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'invest', label: '투자 BEP' },
            { value: 'biz', label: '사업 BEP' },
          ]}
          value={mode}
          onChange={v => setMode(v as 'invest' | 'biz')}
        />
        <Card className="p-5">
          {mode === 'invest' ? (
            <div className="flex flex-col gap-3">
              <div>
                <Label>매수가 (원)</Label>
                <CommaInput value={buyPrice} onChange={setBuyPrice} placeholder="예: 50,000" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>매수 수수료 (%)</Label>
                  <input type="number" value={buyFee} onChange={e => setBuyFee(e.target.value)}
                    placeholder="0.015" className={inputCls} min="0" step="0.001" />
                </div>
                <div>
                  <Label>매도 수수료 (%)</Label>
                  <input type="number" value={sellFee} onChange={e => setSellFee(e.target.value)}
                    placeholder="0.015" className={inputCls} min="0" step="0.001" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={txTax} onChange={e => setTxTax(e.target.checked)}
                  className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">증권거래세 0.18% 포함</span>
              </label>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div>
                <Label>월 고정비 (원)</Label>
                <CommaInput value={fixedCost} onChange={setFixedCost} placeholder="예: 5,000,000" />
              </div>
              <div>
                <Label>단위당 판매가 (원)</Label>
                <CommaInput value={sellPriceU} onChange={setSellPriceU} placeholder="예: 20,000" />
              </div>
              <div>
                <Label>단위당 변동비 (원)</Label>
                <CommaInput value={varCost} onChange={setVarCost} placeholder="예: 8,000" />
              </div>
            </div>
          )}
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <div className="bg-blue-600 rounded-2xl p-5">
            <p className="text-blue-200 text-xs mb-1">
              {mode === 'invest' ? '손익분기 가격' : 'BEP 판매량'}
            </p>
            <p className="text-white text-3xl font-black">
              {mode === 'invest' ? `${fmt(result.bep)}원` : `${Math.ceil(result.bep).toLocaleString()}개`}
            </p>
            <p className="text-blue-200 text-sm mt-1">{result.extra}</p>
          </div>
        )}
      </div>
    </CalcShell>
  );
}
