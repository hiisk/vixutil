'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 빈 칸으로 열면 무엇을
 * 보여 주는 계산기인지 눌러 보기 전에는 모른다 — 값을 미리 넣어 두면 「계산하기」
 * 한 번에 한 벌이 통째로 보이고, 사람은 그 위에 자기 숫자를 덮어쓴다.
 * 값은 내가 지어내지 않고 저자가 이미 골라 둔 예시를 그대로 올렸다.
 */
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { calcElectricity, kwhForBill, tierOf, toNextTier } from '@/lib/electricity-tariff';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function ElectricityReversePage() {
  const [bill, setBill] = useState('55000');
  const [result, setResult] = useState<null | {
    kwh: number; tier: number; left: number | null;
    detail: ReturnType<typeof calcElectricity>; nextTierBill: number | null;
  }>(null);

  function calculate() {
    const b = Number(bill);
    if (b <= 0) return;
    const kwh = kwhForBill(b);
    const left = toNextTier(kwh);
    setResult({
      kwh,
      tier: tierOf(kwh) + 1,
      left,
      detail: calcElectricity(kwh),
      nextTierBill: left === null ? null : calcElectricity(kwh + left + 0.001).total,
    });
  }

  return (
    <CalcShell
      path="/calculator/electricity-reverse"
      title="전기요금 역산 계산기"
      description="고지서 금액으로 사용량(kWh)과 누진 구간 되찾기"
      intro={
        <>
          <h2>요금에서 사용량을 되찾습니다</h2>
          <p>
            누진표는 사용량에서 요금으로 가는 한 방향으로 만들어져 있습니다. 반대로 가려면 구간마다
            뒤집어야 하는데 <strong>기본요금이 구간마다 한 번에 뛰어서 식이 이어지지 않습니다</strong>.
            그래서 이 계산기는 요금이 사용량을 따라 계속 늘어난다는 성질을 써서 범위를 좁혀 나갑니다.
          </p>
          <h2>지금 어느 구간에 있는지가 중요합니다</h2>
          <p>
            <strong>다음 구간까지 얼마나 남았는지</strong>를 알면 이번 달에 큰 가전을 더 돌려도 되는지
            판단할 수 있습니다. 구간을 넘기는 순간 기본요금이 뛰기 때문에, 몇 kWh 차이로 요금이
            수천원씩 갈립니다.
          </p>
          <h2>고지서 금액을 그대로 넣으세요</h2>
          <p>
            부가세 10%와 전력산업기반기금 3.7%까지 포함한 <strong>최종 청구액</strong> 기준입니다.
            사용량을 이미 알고 있다면 반대 방향인{' '}
            <Link href="/calculator/electricity" className="underline">전기요금 계산기</Link>를 쓰세요.
            가전 하나가 얼마를 더하는지는{' '}
            <Link href="/calculator/appliance-power" className="underline">가전 전기요금 계산기</Link>가 답합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>고지서 금액 (원)</Label>
              <MoneyInput value={bill} onChange={setBill} placeholder="예: 55000" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">쓴 전기</p>
              <p className="stat-value">{result.kwh.toFixed(1)} kWh</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                누진 {result.tier}구간
                {result.left !== null && ` · 다음 구간까지 ${result.left.toFixed(1)}kWh 남음`}
              </p>
            </div>
            <Card>
              <CardHeader title="요금 내역" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['기본요금', result.detail.basicFee],
                  ['사용량 요금', result.detail.usageFee],
                  ['부가세 10%', result.detail.vat],
                  ['전력산업기반기금 3.7%', result.detail.fund],
                  ['합계', result.detail.total],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            {result.left !== null && result.nextTierBill !== null && (
              <Card className="p-4">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {result.left.toFixed(1)}kWh만 더 쓰면 {result.tier + 1}구간입니다
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  그 순간 기본요금이 뛰어 요금이 {fmt(result.nextTierBill)}원이 됩니다 —
                  사용량은 {result.left.toFixed(1)}kWh 늘 뿐인데 {fmt(result.nextTierBill - result.detail.total)}원이 더 붙습니다.
                </p>
              </Card>
            )}
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 주택용 저압 기준 · 할인이나 복지요금이 적용된 고지서는 사용량이 실제보다 적게 나옵니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
