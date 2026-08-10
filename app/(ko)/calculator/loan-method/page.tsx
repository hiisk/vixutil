'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { ALL_METHODS, compareAll } from '@/lib/loan-schedule';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function LoanMethodPage() {
  const [principal, setPrincipal] = useState('100000000');
  const [rate, setRate] = useState('5.4');
  const [months, setMonths] = useState('120');
  const [result, setResult] = useState<null | ReturnType<typeof compareAll>>(null);

  function calculate() {
    const loan = { principal: Number(principal), annualRate: Number(rate), months: Number(months) };
    if (loan.principal <= 0 || loan.months <= 0) return;
    setResult(compareAll(loan));
  }

  const best = result ? result.reduce((a, b) => (a.totalInterest <= b.totalInterest ? a : b)) : null;

  return (
    <CalcShell
      path="/calculator/loan-method"
      title="대출 상환방식 비교 계산기"
      description="원리금균등·원금균등·만기일시의 총이자와 첫 달 부담"
      intro={
        <>
          <h2>같은 돈을 빌려도 방식에 따라 이자가 다릅니다</h2>
          <p>
            총이자는 <strong>원금이 얼마나 빨리 줄어드느냐</strong>로 정해집니다. 원금을 빨리 갚을수록
            이자가 붙을 잔액이 작아지기 때문입니다. 그래서 <strong>원금균등이 가장 적고 만기일시가
            가장 많습니다</strong>. 이율이나 기간을 바꾸지 않고 방식만 골라도 수백만원이 갈립니다.
          </p>
          <h2>대신 첫 달 부담이 반대로 갑니다</h2>
          <p>
            원금균등은 이자가 가장 적은 대신 <strong>첫 달이 가장 무겁습니다</strong>. 초반 상환액을
            감당할 수 있느냐가 실제 선택을 가릅니다. 원리금균등은 매달 같은 금액이라 계획을 세우기
            쉽고, 만기일시는 다달이 이자만 내다가 <strong>만기에 원금을 통째로</strong> 갚아야 합니다.
          </p>
          <h2>중도상환도 함께 보세요</h2>
          <p>
            여윳돈이 생겼을 때 미리 갚으면 남은 이자가 줄지만 수수료가 붙을 수 있습니다.
            그쪽은 <Link href="/calculator/loan-prepayment-fee" className="underline">중도상환수수료 계산기</Link>,
            갈아탈지 말지는 <Link href="/calculator/refinance" className="underline">대출 갈아타기 계산기</Link>에서 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>대출 원금 (원)</Label>
              <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)}
                placeholder="예: 100000000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>연이율 (%)</Label>
                <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                  placeholder="예: 5.4" className={inputCls} min="0" step="0.01" />
              </div>
              <div>
                <Label>기간 (개월)</Label>
                <input type="number" value={months} onChange={e => setMonths(e.target.value)}
                  placeholder="예: 120" className={inputCls} min="1" />
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && best && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">이자가 가장 적은 방식</p>
              <p className="text-white text-3xl font-black">
                {ALL_METHODS.find(m => m.key === best.method)?.label}
              </p>
              <p className="text-blue-200 text-xs mt-1">
                총이자 {fmt(best.totalInterest)}원 · 첫 달 {fmt(best.firstPayment)}원
              </p>
            </div>
            {result.map(s => {
              const label = ALL_METHODS.find(m => m.key === s.method)!.label;
              return (
                <Card key={s.method}>
                  <CardHeader title={label} />
                  <div className="divide-y divide-slate-100">
                    {[
                      ['첫 달 상환액', s.firstPayment],
                      ['마지막 달 상환액', s.lastPayment],
                      ['총이자', s.totalInterest],
                      ['총 상환액', s.totalPaid],
                    ].map(([k, v]) => (
                      <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">{k}</span>
                        <span className="font-semibold">{fmt(v as number)}원</span>
                      </div>
                    ))}
                    {s.method !== best.method && (
                      <div className="px-5 py-3 flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">가장 적은 방식보다</span>
                        <span className="font-semibold text-rose-600 dark:text-rose-400">
                          +{fmt(s.totalInterest - best.totalInterest)}원
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 고정금리·중도상환 없음을 가정한 값입니다 · 실제 상환액은 이자 계산일과 상환일에 따라 조금 다를 수 있습니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
