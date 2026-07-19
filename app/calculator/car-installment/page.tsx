'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, RatioBar } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CarInstallmentPage() {
  const [price, setPrice] = useState(35_000_000);
  const [down, setDown] = useState(0);
  const [months, setMonths] = useState('60');
  const [rate, setRate] = useState('5');

  const [result, setResult] = useState<{
    loan: number;
    monthly: number;
    totalPay: number;
    totalInterest: number;
  } | null>(null);

  function calculate() {
    const p = price;
    const d = down;
    const n = Number(months);
    const r = Number(rate) / 100 / 12;
    if (p <= 0 || Number(rate) <= 0) return;

    const loan = p - d;
    const monthly = r === 0 ? loan / n : loan * r / (1 - Math.pow(1 + r, -n));
    const totalPay = monthly * n + d;
    const totalInterest = monthly * n - loan;
    setResult({ loan, monthly, totalPay, totalInterest });
  }

  return (
    <CalcShell
      path="/calculator/car-installment"
      title="자동차 할부 계산기"
      description="차량 가격·금리·기간 기준 월 할부금 계산"
      intro={
        <>
          <h2>월 할부금만 보면 안 됩니다</h2>
          <p>
            같은 차라도 기간을 늘리면 월 부담이 확 줄어 싸 보입니다. 하지만 <strong>총 이자는
            그만큼 늘어납니다</strong>. 36개월과 60개월을 비교하면 월 납입액 차이보다 총액 차이가
            훨씬 크므로, 결정 전에 <strong>총 상환액</strong>을 견줘 보세요.
          </p>
          <h2>선수금과 잔가</h2>
          <p>
            <strong>선수금</strong>을 많이 낼수록 대출 원금이 줄어 이자가 적습니다. 반대로{' '}
            <strong>유예할부(잔가 설정)</strong>는 차값의 일부를 만기에 몰아서 내는 방식이라 월 납입액이
            낮아 보이지만, 마지막에 목돈이 필요하고 그때까지 그 금액에도 이자가 붙습니다.
          </p>
          <h2>차값 말고도 나가는 돈</h2>
          <p>
            <strong>취득세·등록비·보험료</strong>가 별도이고, 이후로도 자동차세·유류비·정비비가
            계속 듭니다. 할부금만 계산하고 예산을 짜면 빠듯해지기 쉽습니다. 자동차세와 주유비
            계산기로 유지비까지 함께 잡아보세요.
          </p>
          <h2>제시 금리를 그대로 넣으세요</h2>
          <p>
            할부 금리는 신용도·차종·프로모션에 따라 달라지고, 낮은 금리 대신 할인이 줄어드는 조건이
            섞이기도 합니다. 이 계산기는 <strong>원리금균등</strong> 기준이며 취급수수료 같은 부대비용은
            반영하지 않습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>차량 가격 (원)</Label>
              <CommaInput value={price} onChange={setPrice} placeholder="예: 35,000,000" />
            </div>
            <div>
              <Label>선수금 / 계약금 (원)</Label>
              <CommaInput value={down} onChange={setDown} placeholder="예: 5,000,000" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>할부 기간</Label>
                <select value={months} onChange={e => setMonths(e.target.value)} className={inputCls}>
                  {[12, 24, 36, 48, 60, 72, 84].map(n => (
                    <option key={n} value={n}>{n}개월 ({n / 12}년)</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>연 이자율 (%)</Label>
                <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                  placeholder="예: 5.9" className={inputCls} min="0" step="0.1" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">월 할부금</p>
              <p className="text-white text-3xl font-black">{fmt(result.monthly)}원</p>
              <p className="text-blue-200 text-sm mt-1">총 {months}개월 납부</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="대출 원금" value={`${fmt(result.loan)}원`} />
              <SummaryCard label="총 이자" value={`${fmt(result.totalInterest)}원`} variant="red" />
              <SummaryCard label="총 납부액 (선수금 포함)" value={`${fmt(result.totalPay)}원`} />
            </div>
            <Card className="p-4">
              <RatioBar a={result.loan} b={result.totalInterest} labelA="원금" labelB="이자" />
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
