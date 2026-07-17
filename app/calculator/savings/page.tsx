'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function SavingsPage() {
  const [monthly, setMonthly] = useState(500_000);
  const [rate, setRate] = useState('4');
  const [months, setMonths] = useState('24');
  const [result, setResult] = useState<null | {
    principal: number; interest: number; tax: number; total: number;
  }>(null);

  function calculate() {
    const m = monthly;
    const n = Number(months);
    if (m <= 0 || Number(rate) <= 0 || n <= 0) return;

    const principal = m * n;
    // 적금 단리 이자 계산: 각 회차별 납입액에 잔여기간 이자 합산
    const interest = m * n * (n + 1) / 2 * (Number(rate) / 100 / 12);
    const tax = interest * 0.154;
    setResult({ principal, interest, tax, total: principal + interest - tax });
  }

  return (
    <CalcShell
      path="/calculator/savings"
      title="적금 계산기"
      description="월 납입금·금리·기간 기준 만기금액 계산"
      intro={
        <>
          <h2>금리가 같은데 예금보다 이자가 적은 이유</h2>
          <p>
            적금 금리 4%라고 해서 낸 돈 전체에 4%가 붙는 게 아닙니다. <strong>첫 달 납입금은 12개월치 이자를
            받지만, 마지막 달 납입금은 한 달치 이자만</strong> 받습니다. 돈이 계좌에 머문 기간이 회차마다
            다르기 때문입니다. 그래서 12개월 적금의 실제 이자는 같은 금리 예금의 <strong>절반 남짓</strong>이
            됩니다. 광고에 나온 금리가 틀린 게 아니라 계산 구조가 그렇습니다.
          </p>
          <h2>계산 방식</h2>
          <p>
            각 회차 납입금에 남은 개월 수만큼 이자를 붙여 전부 더합니다(<strong>단리</strong> 기준).
            대부분의 은행 적금이 이 방식입니다. 예금과 적금을 비교하려면 금리만 볼 게 아니라 이 계산기와{' '}
            <strong>예금 이자 계산기</strong>에 같은 금액을 넣고 만기 수령액을 견줘야 합니다.
          </p>
          <h2>세금</h2>
          <p>
            이자에는 <strong>이자소득세 15.4%</strong>(소득세 14% + 지방소득세 1.4%)가 붙습니다.
            이 계산기는 세후 금액까지 보여줍니다. 청년우대형이나 비과세 종합저축처럼 요건을 갖추면 세금이
            줄거나 없어지는 상품도 있으니, 가입 전에 해당 여부를 확인해 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>월 납입금액 (원)</Label>
              <CommaInput value={monthly} onChange={setMonthly} placeholder="예: 500,000" />
            </div>
            <div>
              <Label>연 이자율 (%)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 4.0" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>납입기간</Label>
              <select value={months} onChange={e => setMonths(e.target.value)} className={inputCls}>
                {[6, 12, 18, 24, 36, 48, 60].map(n => (
                  <option key={n} value={n}>{n}개월 ({n / 12 >= 1 ? `${n / 12}년` : `${n}개월`})</option>
                ))}
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">만기 수령액 (세후)</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="납입 원금" value={`${fmt(result.principal)}원`} />
              <SummaryCard label="세전 이자" value={`${fmt(result.interest)}원`} variant="green" />
              <SummaryCard label="이자소득세 (15.4%)" value={`-${fmt(result.tax)}원`} variant="red" />
              <SummaryCard label="세후 이자" value={`${fmt(result.interest - result.tax)}원`} variant="green" />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
