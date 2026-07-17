'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const TIERS = [
  { limit: 200, basic: 910,   rate: 120.0 },
  { limit: 400, basic: 1600,  rate: 214.6 },
  { limit: Infinity, basic: 7300, rate: 307.3 },
];

function calcElectricity(kwh: number) {
  const tier = TIERS.find(t => kwh <= t.limit) ?? TIERS[2];
  const basicFee = tier.basic;

  let usageFee = 0;
  let remaining = kwh;
  const prevLimits = [0, 200, 400];
  for (let i = 0; i < TIERS.length; i++) {
    if (remaining <= 0) break;
    const prev = prevLimits[i];
    const curr = TIERS[i].limit === Infinity ? Infinity : TIERS[i].limit;
    const inTier = Math.min(remaining, curr - prev);
    usageFee += inTier * TIERS[i].rate;
    remaining -= inTier;
  }

  const subtotal = basicFee + usageFee;
  const vat = subtotal * 0.1;
  const fund = subtotal * 0.037;
  return { basicFee, usageFee, subtotal, vat, fund, total: subtotal + vat + fund };
}

export default function ElectricityPage() {
  const [kwh, setKwh] = useState('');
  const [result, setResult] = useState<null | ReturnType<typeof calcElectricity>>(null);

  function calculate() {
    const k = Number(kwh);
    if (k <= 0) return;
    setResult(calcElectricity(k));
  }

  return (
    <CalcShell
      path="/calculator/electricity"
      title="전기요금 계산기"
      description="주택용 저압 누진세 기준 전기요금 계산"
      intro={
        <>
          <h2>누진제 3단계</h2>
          <p>
            주택용 전기는 쓸수록 단가가 올라갑니다. <strong>200kWh까지 1단계</strong>,{' '}
            <strong>400kWh까지 2단계</strong>, 그 위가 3단계입니다. 단가는 1단계 120원대에서 3단계 300원대로{' '}
            <strong>2.5배 넘게</strong> 벌어집니다. 기본요금도 단계마다 달라서, 400kWh를 조금만 넘겨도
            기본요금이 1,600원에서 7,300원으로 뜁니다.
          </p>
          <h2>넘긴 만큼만 비싸집니다</h2>
          <p>
            흔한 오해가 &ldquo;401kWh를 쓰면 전체가 3단계 단가로 계산된다&rdquo;는 것인데 그렇지 않습니다.{' '}
            <strong>구간별로 나눠서</strong> 계산합니다. 401kWh라면 200kWh는 1단계 단가로, 다음 200kWh는
            2단계 단가로, 마지막 1kWh만 3단계 단가로 붙습니다. 다만 기본요금은 최종 구간 기준으로 통째로
            바뀌므로 경계선 부근에서는 체감 차이가 납니다.
          </p>
          <h2>요금에 붙는 것들</h2>
          <p>
            전기요금에는 <strong>부가가치세 10%</strong>와 <strong>전력산업기반기금 3.7%</strong>가
            더 붙습니다. 고지서 금액이 계산한 사용요금보다 큰 이유입니다.
          </p>
          <h2>참고용입니다</h2>
          <p>
            이 계산기는 <strong>주택용 저압</strong> 기준입니다. 아파트는 고압으로 계약된 곳이 많아 단가가
            다르고, 여름·겨울 누진 완화 구간, 필수사용량 보장공제, 다자녀·출산 가구 할인 등이 적용되면
            실제 고지서와 달라집니다. 한전 요금표는 개정되므로 정확한 금액은 고지서나 한전 사이트에서
            확인하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="mb-4">
            <Label>이번 달 사용량 (kWh)</Label>
            <input type="number" value={kwh} onChange={e => setKwh(e.target.value)}
              placeholder="예: 350" className={inputCls} min="0" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
            {[
              { label: '1구간', range: '~200kWh', rate: '120원' },
              { label: '2구간', range: '~400kWh', rate: '214.6원' },
              { label: '3구간', range: '400kWh+', rate: '307.3원' },
            ].map(t => (
              <div key={t.label} className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2">
                <p className="font-bold text-slate-600 dark:text-slate-300">{t.label}</p>
                <p className="text-slate-400 dark:text-slate-500">{t.range}</p>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{t.rate}/kWh</p>
              </div>
            ))}
          </div>
          <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">이번 달 전기요금</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <Card>
              <CardHeader title="요금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '기본요금', value: result.basicFee },
                  { label: '전력량요금', value: result.usageFee },
                  { label: '부가가치세 (10%)', value: result.vat },
                  { label: '전력기반기금 (3.7%)', value: result.fund },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
