'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function MaxLoanPage() {
  const [annualIncome, setAnnualIncome] = useState(60_000_000);
  const [rate, setRate] = useState('4.5');
  const [loanYears, setLoanYears] = useState('30');
  const [existing, setExisting] = useState(0);
  const [dti, setDti] = useState('40');

  const [result, setResult] = useState<{
    maxLoan: number;
    monthlyPayment: number;
    totalInterest: number;
    allowableMonthly: number;
  } | null>(null);

  function calculate() {
    const income = annualIncome;
    const r = Number(rate) / 100 / 12;
    const n = Number(loanYears) * 12;
    const existingMonthly = existing;
    if (income <= 0 || Number(rate) <= 0) return;

    const monthlyIncome = income / 12;
    const allowableMonthly = monthlyIncome * Number(dti) / 100 - existingMonthly;
    if (allowableMonthly <= 0) return;

    const maxLoan = allowableMonthly * (1 - Math.pow(1 + r, -n)) / r;
    const totalPayment = allowableMonthly * n;
    const totalInterest = totalPayment - maxLoan;

    setResult({ maxLoan, monthlyPayment: allowableMonthly, totalInterest, allowableMonthly });
  }

  return (
    <CalcShell
      path="/calculator/max-loan"
      title="대출 가능 금액 계산기"
      description="소득 기준 DTI 대출 가능 최대 금액"
      intro={
        <>
          <h2>계산 방식</h2>
          <p>
            소득에서 매달 상환에 쓸 수 있는 금액을 먼저 구하고, 그 금액으로{' '}
            <strong>원리금균등상환</strong> 대출을 거꾸로 풀어 최대 원금을 계산합니다.{' '}
            <strong>월 소득 × 비율 − 기존 대출 월 상환액</strong>이 새로 감당할 수 있는 몫입니다.
            기존 대출이 있으면 그만큼 한도가 줄어드는 이유입니다.
          </p>
          <h2>금리와 기간이 한도를 흔듭니다</h2>
          <p>
            같은 소득이라도 <strong>금리가 낮고 기간이 길수록</strong> 빌릴 수 있는 원금이 커집니다.
            월 상환액이라는 그릇 크기가 정해져 있으니, 이자가 적게 붙거나 나눠 담을 기간이 길면 원금이 더
            들어가는 것입니다. 다만 기간을 늘려 한도를 키우면 <strong>총 이자</strong>도 함께 불어납니다.
          </p>
          <h2>여기서 나온 금액이 한도의 전부는 아닙니다</h2>
          <p>
            주택담보대출이라면 소득 기준과 별개로 <strong>LTV</strong>(집값 대비 한도)에도 걸리고, 실제
            심사는 <strong>DSR</strong> 기준으로 이뤄집니다. 최종 한도는 이 셋 중 가장 낮은 값입니다.
            은행은 여기에 신용점수·직업 안정성·거래 실적까지 보므로, 이 계산기 결과는 상한선을 가늠하는{' '}
            <strong>참고값</strong>으로 쓰는 게 맞습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>연 소득 (원)</Label>
              <CommaInput value={annualIncome} onChange={setAnnualIncome} placeholder="예: 60,000,000" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>대출 금리 (%)</Label>
                <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                  placeholder="예: 4.5" className={inputCls} min="0" step="0.1" />
              </div>
              <div>
                <Label>대출 기간</Label>
                <select value={loanYears} onChange={e => setLoanYears(e.target.value)} className={inputCls}>
                  {[10, 15, 20, 25, 30, 35, 40].map(n => (
                    <option key={n} value={n}>{n}년</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label>기존 대출 월 상환액 (원)</Label>
              <CommaInput value={existing} onChange={setExisting} placeholder="없으면 0" />
            </div>
            <div>
              <Label>DTI 기준 (%)</Label>
              <select value={dti} onChange={e => setDti(e.target.value)} className={inputCls}>
                <option value="40">40% (일반 기준)</option>
                <option value="50">50%</option>
                <option value="60">60%</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">최대 대출 가능 금액</p>
              <p className="text-white text-3xl font-black">{fmt(result.maxLoan)}원</p>
              <p className="text-blue-200 text-sm mt-1">월 상환액 {fmt(result.monthlyPayment)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="월 허용 상환액" value={`${fmt(result.allowableMonthly)}원`} />
              <SummaryCard label="총 이자" value={`${fmt(result.totalInterest)}원`} variant="red" />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
