'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { CAP_RATIO, allAsMonthly, renewalCap } from '@/lib/lease-renewal';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

export default function LeaseRenewalPage() {
  const [deposit, setDeposit] = useState('');
  const [monthly, setMonthly] = useState('0');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState<null | {
    cap: ReturnType<typeof renewalCap>;
    all: ReturnType<typeof allAsMonthly> | null;
  }>(null);

  function calculate() {
    const lease = { deposit: Number(deposit), monthly: Number(monthly || 0) };
    if (lease.deposit <= 0) return;
    const r = Number(rate) / 100;
    setResult({
      cap: renewalCap(lease),
      all: r > 0 ? allAsMonthly(lease, r) : null,
    });
  }

  return (
    <CalcShell
      path="/calculator/lease-renewal"
      title="계약갱신 인상 한도 계산기"
      description="갱신청구권을 쓸 때 올릴 수 있는 보증금·월세 상한"
      intro={
        <>
          <h2>올릴 수 있는 폭은 5%입니다</h2>
          <p>
            주택임대차보호법은 갱신 때의 증액 청구를 <strong>20분의 1(5%)</strong>로 묶어 둡니다.
            보증금과 월차임 <strong>각각에 걸리는 상한</strong>이라, 둘 다 5%씩 올리는 것은 되지만
            한쪽을 10% 올리고 다른 쪽을 동결하는 식으로 몰아 받을 수는 없습니다.
          </p>
          <h2>보증금 증액분을 월세로 돌릴 때</h2>
          <p>
            임대인이 &ldquo;보증금은 그대로 두고 월세를 조금 더&rdquo;라고 제안하는 경우가 많습니다.
            이때 쓰는 비율이 <strong>전월세전환율</strong>이고, 한국은행 기준금리에 대통령령이 정한 이율을
            더한 값과 연 1할 중 낮은 쪽입니다. 기준금리를 따라 바뀌므로 이 계산기는 값을 넣어 두지 않았습니다 —
            그 달의 비율을 넣어 쓰세요.
          </p>
          <h2>이 값은 상한입니다</h2>
          <p>
            합의로 더 적게 올리거나 동결할 수 있습니다. 반대로 임대인이 <strong>실제 거주하려는 등 법이
            정한 사유</strong>가 있으면 갱신 자체를 거절할 수도 있습니다. 이 계산기는 &ldquo;갱신이 된다면
            얼마까지&rdquo;에만 답합니다. 전세와 월세 중 어느 쪽이 유리한지는{' '}
            <Link href="/calculator/jeonwolse" className="underline">전세 월세 유불리 계산기</Link>에서 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>지금 보증금 (원)</Label>
              <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)}
                placeholder="예: 300000000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>지금 월세 (원, 전세면 0)</Label>
              <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
                placeholder="예: 500000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>전월세전환율 (%, 비우면 생략)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 5.5" className={inputCls} min="0" step="0.1" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">올릴 수 있는 보증금 상한</p>
              <p className="stat-value">{man(result.cap.maxDeposit)}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                증액분 {man(result.cap.depositRise)} · 상한 {CAP_RATIO * 100}%
              </p>
            </div>
            <Card>
              <CardHeader title="지금과 상한" />
              <div className="divide-y divide-slate-100">
                {[
                  ['보증금 상한', fmt(result.cap.maxDeposit)],
                  ['보증금 증액분', fmt(result.cap.depositRise)],
                  ['월세 상한', fmt(result.cap.maxMonthly)],
                  ['월세 증액분', fmt(result.cap.monthlyRise)],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}원</span>
                  </div>
                ))}
              </div>
            </Card>
            {result.all && (
              <Card>
                <CardHeader title="보증금 증액분을 월세로 돌리면" />
                <div className="divide-y divide-slate-100">
                  {[
                    ['월세만 5% 올릴 때', result.all.monthlyOnly],
                    ['보증금 증액분까지 월세로', result.all.depositAsMonthly],
                    ['늘어나는 월 부담', result.all.extraPerMonth],
                  ].map(([k, v]) => (
                    <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">{k}</span>
                      <span className="font-semibold">{fmt(v as number)}원</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 주택임대차보호법상 증액 청구 상한 · 합의로 더 낮출 수 있고, 법정 사유가 있으면 갱신이 거절될 수 있습니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
