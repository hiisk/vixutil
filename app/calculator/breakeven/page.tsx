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
    <CalcShell
      path="/calculator/breakeven"
      title="손익분기점 계산기"
      description="투자 BEP 가격 · 사업 BEP 판매량 계산"
      intro={
        <>
          <h2>매수가로 팔면 손해입니다</h2>
          <p>
            산 가격 그대로 팔면 본전 같지만 실제로는 <strong>수수료와 세금만큼 손해</strong>입니다.
            살 때 수수료를 내고, 팔 때 또 수수료에 <strong>증권거래세 0.18%</strong>까지 붙기 때문입니다.
            그래서 진짜 본전 가격은 매수가보다 조금 위에 있습니다. 이 계산기는 그 지점을 계산합니다.
          </p>
          <h2>단타일수록 무겁습니다</h2>
          <p>
            거래 한 번에 붙는 비용은 작아 보여도, 사고팔기를 반복하면 <strong>매번</strong> 붙습니다.
            수익률이 몇 %인 짧은 매매를 자주 하면 비용이 수익을 갉아먹는 구조라, 실제 남는 돈은 화면에
            보이는 등락폭보다 훨씬 적습니다.
          </p>
          <h2>사업 손익분기점</h2>
          <p>
            사업 쪽은 <strong>고정비 ÷ (판매가 − 변동비)</strong>로 몇 개를 팔아야 적자를 벗어나는지
            계산합니다. 괄호 안이 <strong>공헌이익</strong>, 한 개 팔 때마다 고정비를 갚아나가는 몫입니다.
            공헌이익이 작으면 아무리 많이 팔아도 본전이 안 나오므로, 판매량을 늘리기 전에 가격이나 원가를
            먼저 봐야 하는 경우가 많습니다.
          </p>
        </>
      }
    >
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
