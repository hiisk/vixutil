'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 빈 칸으로 열면 무엇을
 * 보여 주는 계산기인지 눌러 보기 전에는 모른다 — 값을 미리 넣어 두면 「계산하기」
 * 한 번에 한 벌이 통째로 보이고, 사람은 그 위에 자기 숫자를 덮어쓴다.
 * 값은 내가 지어내지 않고 저자가 이미 골라 둔 예시를 그대로 올렸다.
 */
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { CALC_FAQ } from '@/lib/calc-faq';

import { calcBrokerFee, type BrokerFeeResult, type TxType } from '@/lib/broker-fee';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function BrokerFeePage() {
  const [type, setType] = useState<TxType>('buy');
  const [amount, setAmount] = useState('500000000');
  const [deposit, setDeposit] = useState('10000000');
  const [monthly, setMonthly] = useState('800000');
  const [vat, setVat] = useState(true);
  const [result, setResult] = useState<BrokerFeeResult | null>(null);

  function calculate() {
    const a = Number(amount);
    if (type !== 'monthly' && a <= 0) return;
    setResult(calcBrokerFee({
      type,
      amount: a,
      deposit: Number(deposit),
      monthly: Number(monthly),
      vat,
    }));
  }

  return (
    <CalcShell
      path="/calculator/broker-fee"
      title="중개수수료 계산기"
      description="2021년 개정 기준 부동산 중개보수 계산"
      faq={CALC_FAQ['broker-fee']}
      intro={
        <>
          <h2>상한요율이지 정찰가가 아닙니다</h2>
          <p>
            법이 정한 것은 <strong>최대 이만큼까지</strong>라는 상한선입니다. 그 안에서는{' '}
            <strong>협의로 정하는 것</strong>이고, 실제로 깎아주는 경우도 많습니다. 중개사가 부르는
            금액이 법정 요율이라 정해져 있다고 말한다면, 상한과 확정을 혼동한 것입니다.
          </p>
          <h2>구간이 바뀌면 요율이 뛰기도 합니다</h2>
          <p>
            매매는 <strong>9억원 미만이 0.4%</strong>이고 9억원부터 0.5%, 12억원부터 0.6%, 15억원부터 0.7%로
            올라갑니다. 구간의 경계 금액은 <strong>위 구간에 들어갑니다</strong> — 딱 9억원이면 0.4%가 아니라
            0.5%입니다.
            금액이 커질수록 요율까지 올라가는 구조라 수수료가 가파르게 늘어납니다. 소액 구간에는
            <strong>상한액</strong>이 따로 있어서 요율로 계산한 값이 그 금액을 넘지 못합니다.
          </p>
          <h2>월세는 보증금으로 환산해서 계산합니다</h2>
          <p>
            월세는 <strong>보증금 + 월세 × 100</strong>으로 거래금액을 환산해 요율을 적용합니다
            (환산액이 5,000만원 미만이면 월세에 70을 곱합니다). 그래서 보증금이 작아도 월세가 높으면
            수수료가 올라갑니다.
          </p>
          <h2>양쪽에서 각각 받습니다</h2>
          <p>
            중개보수는 <strong>파는 쪽과 사는 쪽이 각자</strong> 냅니다. 여기서 나온 금액은 한 사람이
            내는 몫입니다. 여기에 중개사가 부가세 과세사업자면 <strong>부가세 10%</strong>가 더 붙습니다.
            지자체 조례로 요율이 달라질 수 있어 참고용입니다.
          </p>
        </>
      }
    >
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
                <MoneyInput value={amount} onChange={setAmount} placeholder="예: 500,000,000" />
              </div>
            ) : (
              <>
                <div>
                  <Label>보증금 (원)</Label>
                  <MoneyInput value={deposit} onChange={setDeposit} placeholder="예: 10,000,000" />
                </div>
                <div>
                  <Label>월세 (원)</Label>
                  <MoneyInput value={monthly} onChange={setMonthly} placeholder="예: 800,000" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  환산금액 = 보증금 + 월세 × 100 (그 값이 5,000만원 미만이면 월세 × 70)
                </p>
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
            <div className="stat-pri">
              <p className="stat-label">중개수수료 {vat ? '(VAT 포함)' : '(VAT 별도)'}</p>
              <p className="stat-value">{fmt(result.total)}원</p>
              <p className="stat-sub">적용 요율 {result.rate}%</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <SummaryCard label="중개수수료" value={`${fmt(result.fee)}원`} />
              {vat && <SummaryCard label="부가가치세 (10%)" value={`${fmt(result.vatAmount)}원`} />}
              <SummaryCard
                label={type === 'monthly' ? '환산 거래금액' : '거래금액'}
                value={`${fmt(result.dealAmount)}원`}
              />
              {result.cap > 0 && (
                <SummaryCard
                  label="한도액"
                  value={`${fmt(result.cap)}원${result.cappedAt ? ' (걸림)' : ''}`}
                />
              )}
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">* 상한 요율 내에서 협의 가능 · 실제 요율은 중개인과 협의하여 결정</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
