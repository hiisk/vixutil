'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { CALC_FAQ } from '@/lib/calc-faq';

const fmt = (n: number) => Math.round(n).toLocaleString();

type TxType = 'buy' | 'jeonse' | 'monthly';

function calcFee(type: TxType, amount: number, deposit?: number, monthly?: number): { rate: number; fee: number } {
  let eff = amount;
  if (type === 'monthly' && deposit !== undefined && monthly !== undefined) {
    eff = deposit + monthly * 100;
  }

  const tiers = type === 'buy'
    ? [
        { limit: 50_000_000,    rate: 0.6,  cap: 250_000 },
        { limit: 200_000_000,   rate: 0.5,  cap: 800_000 },
        { limit: 900_000_000,   rate: 0.4,  cap: 0 },
        { limit: 1_200_000_000, rate: 0.5,  cap: 0 },
        { limit: 1_500_000_000, rate: 0.6,  cap: 0 },
        { limit: Infinity,      rate: 0.7,  cap: 0 },
      ]
    : [
        { limit: 50_000_000,    rate: 0.5,  cap: 200_000 },
        { limit: 100_000_000,   rate: 0.4,  cap: 300_000 },
        { limit: 600_000_000,   rate: 0.3,  cap: 0 },
        { limit: 1_200_000_000, rate: 0.4,  cap: 0 },
        { limit: 1_500_000_000, rate: 0.5,  cap: 0 },
        { limit: Infinity,      rate: 0.6,  cap: 0 },
      ];

  const tier = tiers.find(t => eff <= t.limit)!;
  const rawFee = eff * tier.rate / 100;
  const fee = tier.cap > 0 ? Math.min(rawFee, tier.cap) : rawFee;
  return { rate: tier.rate, fee: Math.round(fee) };
}

export default function BrokerFeePage() {
  const [type, setType] = useState<TxType>('buy');
  const [amount, setAmount] = useState('');
  const [deposit, setDeposit] = useState('');
  const [monthly, setMonthly] = useState('');
  const [vat, setVat] = useState(true);
  const [result, setResult] = useState<null | { rate: number; fee: number; vatAmount: number; total: number }>(null);

  function calculate() {
    const a = Number(amount);
    if (type !== 'monthly' && a <= 0) return;
    const d = Number(deposit);
    const m = Number(monthly);

    const { rate, fee } = calcFee(type, a, d, m);
    const vatAmount = vat ? Math.round(fee * 0.1) : 0;
    setResult({ rate, fee, vatAmount, total: fee + vatAmount });
  }

  return (
    <CalcShell title="중개수수료 계산기" description="2021년 개정 기준 부동산 중개보수 계산" faq={CALC_FAQ['broker-fee']}>
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'buy', label: '매매' },
            { value: 'jeonse', label: '전세' },
            { value: 'monthly', label: '월세' },
          ]}
          value={type}
          onChange={v => { setType(v as TxType); setResult(null); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            {type !== 'monthly' ? (
              <div>
                <Label>거래금액 (원)</Label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                  placeholder="예: 500,000,000" className={inputCls} min="0" />
              </div>
            ) : (
              <>
                <div>
                  <Label>보증금 (원)</Label>
                  <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)}
                    placeholder="예: 10,000,000" className={inputCls} min="0" />
                </div>
                <div>
                  <Label>월세 (원)</Label>
                  <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
                    placeholder="예: 800,000" className={inputCls} min="0" />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">환산금액 = 보증금 + 월세 × 100</p>
              </>
            )}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={vat} onChange={e => setVat(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">VAT 10% 포함</span>
            </label>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">중개수수료 {vat ? '(VAT 포함)' : '(VAT 별도)'}</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
              <p className="text-blue-200 text-sm mt-1">적용 요율 {result.rate}%</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="중개수수료" value={`${fmt(result.fee)}원`} />
              {vat && <SummaryCard label="부가가치세 (10%)" value={`${fmt(result.vatAmount)}원`} />}
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">* 상한 요율 내에서 협의 가능 · 실제 요율은 중개인과 협의하여 결정</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
