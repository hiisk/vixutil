'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { calcRentalYield, type RentalResult } from '@/lib/rental-yield';

const w = (n: number) => Math.round(n).toLocaleString();

export default function RentalYieldPage() {
  const [price, setPrice] = useState(300_000_000);
  const [deposit, setDeposit] = useState(30_000_000);
  const [monthlyRent, setMonthlyRent] = useState(1_000_000);
  const [acquisitionCost, setAcquisitionCost] = useState(10_000_000);
  const [loan, setLoan] = useState(0);
  const [loanRate, setLoanRate] = useState('4.0');
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [result, setResult] = useState<RentalResult | null>(null);

  function calculate() {
    if (price <= 0) return;
    setResult(calcRentalYield({
      price, deposit, monthlyRent, acquisitionCost,
      loan, loanRate: Number(loanRate) || 0, monthlyCost,
    }));
  }

  return (
    <CalcShell
      path="/calculator/rental-yield"
      title="임대수익률 계산기"
      description="매매가·보증금·월세로 표면 수익률과 실투자 대비 수익률을 함께 계산합니다"
      intro={
        <>
          <h2>수익률은 두 가지를 함께 봐야 합니다</h2>
          <p>
            매물 광고에 적힌 수익률은 보통 <strong>표면 수익률</strong>입니다. 연 월세를 매매가로
            나눈 값이라 계산은 쉽지만, 보증금·대출·부대비용을 무시하기 때문에 실제보다 좋아
            보입니다. 매물끼리 거칠게 비교할 때만 쓰는 숫자입니다.
          </p>
          <p>
            실제로 중요한 건 <strong>실투자 대비 수익률</strong>입니다. 월세에서 대출이자와 보유비용을
            뺀 순수입을, 내 돈이 실제로 얼마나 들어갔는지(실투자금)로 나눈 값입니다. 이 계산기는
            둘을 나란히 보여줍니다.
          </p>
          <h2>레버리지는 수익률과 위험을 함께 키웁니다</h2>
          <p>
            보증금과 대출을 많이 낄수록 실투자금이 줄어 실투자 수익률은 올라갑니다. 다만 같은
            이유로 <strong>공실이나 금리 상승에 훨씬 취약</strong>해집니다. 대출이자가 월세를 넘어서면
            수익률이 마이너스가 되는데, 이 계산기는 그런 경우도 숨기지 않고 음수로 보여줍니다.
          </p>
          <h2>추정치입니다</h2>
          <p>
            공실 기간, 세입자 교체 비용, 재산세·종합소득세, 향후 매도 시 양도세와 시세차익은 이
            계산에 들어가지 않습니다. 임대수익률은 <strong>보유 중 현금흐름</strong>만 보는
            지표이므로, 실제 투자 판단에는 시세 전망과 세금까지 함께 따져야 합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="매물 정보" />
          <div className="flex flex-col gap-3">
            <div>
              <Label>매매가 (원)</Label>
              <CommaInput value={price} onChange={setPrice} placeholder="예: 300,000,000" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>보증금 (원)</Label>
                <CommaInput value={deposit} onChange={setDeposit} placeholder="예: 30,000,000" />
              </div>
              <div>
                <Label>월세 (원)</Label>
                <CommaInput value={monthlyRent} onChange={setMonthlyRent} placeholder="예: 1,000,000" />
              </div>
            </div>
            <div>
              <Label>취득 부대비용 (원)</Label>
              <CommaInput value={acquisitionCost} onChange={setAcquisitionCost} placeholder="예: 10,000,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                취득세·중개수수료·법무비 등 살 때 든 비용
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="대출 · 보유비용 (선택)" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>대출금액 (원)</Label>
              <CommaInput value={loan} onChange={setLoan} placeholder="예: 150,000,000" />
            </div>
            <div>
              <Label>대출 연이율 (%)</Label>
              <input
                type="number" value={loanRate} onChange={e => setLoanRate(e.target.value)}
                step="0.1" min="0" className={inputCls}
              />
            </div>
            <div className="col-span-2">
              <Label>월 보유비용 (원)</Label>
              <CommaInput value={monthlyCost} onChange={setMonthlyCost} placeholder="예: 100,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                관리비 부담분·수선충당 등 매달 나가는 비용 (없으면 0)
              </p>
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>수익률 계산</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                실투자 대비 수익률
              </p>
              {result.investmentNonPositive ? (
                <>
                  <p className="text-2xl font-black text-amber-600 dark:text-amber-400">계산 불가</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    보증금과 대출이 매매가 이상이라 실제로 들어간 내 돈이 없습니다(무한 레버리지).
                    표면 수익률만 참고하세요.
                  </p>
                </>
              ) : (
                <>
                  <p className={`text-3xl font-black ${result.netYield! < 0 ? 'text-red-500' : 'text-slate-900 dark:text-slate-100'}`}>
                    {result.netYield!.toFixed(2)}<span className="text-lg font-bold ml-1">%</span>
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    표면 수익률 {result.grossYield.toFixed(2)}% · 실투자금 {w(result.actualInvestment)}원
                  </p>
                </>
              )}
            </Card>

            <Card className="p-5">
              <CardHeader title="내역" />
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">연 임대수입 (월세×12)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.annualRent)}원</span>
                </div>
                {result.annualCost > 0 && (
                  <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>− 연 보유비용</span>
                    <span className="tabular-nums">−{w(result.annualCost)}원</span>
                  </div>
                )}
                {result.annualInterest > 0 && (
                  <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>− 연 대출이자</span>
                    <span className="tabular-nums">−{w(result.annualInterest)}원</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">연 순수입</span>
                  <span className={`font-bold tabular-nums ${result.netAnnualIncome < 0 ? 'text-red-500' : 'text-slate-900 dark:text-slate-100'}`}>
                    {w(result.netAnnualIncome)}원
                  </span>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">실투자금</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.actualInvestment)}원</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>매매가 + 부대비용 − 보증금 − 대출</span>
                  <span className="tabular-nums">
                    {w(price)}+{w(acquisitionCost)}−{w(deposit)}−{w(loan)}
                  </span>
                </div>
              </div>

              <SummaryGrid>
                <SummaryCard label="표면 수익률" value={`${result.grossYield.toFixed(2)}%`} />
                <SummaryCard
                  label="실투자 수익률"
                  value={result.netYield === null ? '—' : `${result.netYield.toFixed(2)}%`}
                  variant={result.netYield !== null && result.netYield < 0 ? 'red' : 'primary'}
                />
                <SummaryCard label="연 순수입" value={`${w(result.netAnnualIncome)}원`} />
                <SummaryCard
                  label="원금 회수"
                  value={result.paybackYears === null ? '—' : `${result.paybackYears.toFixed(1)}년`}
                />
              </SummaryGrid>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
