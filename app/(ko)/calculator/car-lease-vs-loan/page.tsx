'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { comparePlans, type Comparison } from '@/lib/car-lease-vs-loan';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CarLeaseVsLoanPage() {
  // 공통 — 같은 차를 같은 기간 본다
  const [price, setPrice] = useState(40_000_000);
  const [months, setMonths] = useState('36');
  const [upfrontFee, setUpfrontFee] = useState(2_800_000);
  const [depreciation, setDepreciation] = useState('15');
  const [opportunity, setOpportunity] = useState('4');
  const [insurance, setInsurance] = useState(1_200_000);

  // 할부
  const [loanDown, setLoanDown] = useState(5_000_000);
  const [loanRate, setLoanRate] = useState('5.9');

  // 리스
  const [leaseDeposit, setLeaseDeposit] = useState(0);
  const [depositReturned, setDepositReturned] = useState(true);
  const [leasePrepaid, setLeasePrepaid] = useState(0);
  const [leaseMonthly, setLeaseMonthly] = useState(730_000);
  const [includesFee, setIncludesFee] = useState(true);
  const [includesInsurance, setIncludesInsurance] = useState(true);
  const [buy, setBuy] = useState(false);
  const [buyout, setBuyout] = useState(15_000_000);

  const [result, setResult] = useState<Comparison | null>(null);

  function calculate() {
    const n = Number(months);
    if (price <= 0 || n <= 0) return;
    setResult(comparePlans({
      price,
      months: n,
      upfrontFee,
      annualDepreciation: Number(depreciation),
      opportunityRate: Number(opportunity),
      annualInsurance: insurance,
      loanDown,
      loanRate: Number(loanRate),
      leaseDeposit,
      leaseDepositReturned: depositReturned,
      leasePrepaid,
      leaseMonthly,
      leaseIncludesFee: includesFee,
      leaseIncludesInsurance: includesInsurance,
      leaseBuyout: buy ? buyout : null,
    }));
  }

  return (
    <CalcShell
      path="/calculator/car-lease-vs-loan"
      title="자동차 리스·할부·현금 비교 계산기"
      description="같은 차를 세 방식으로 살 때의 총비용 비교"
      intro={
        <>
          <h2>잔존가치를 안 넣으면 리스가 늘 이깁니다</h2>
          <p>
            월 리스료는 할부금보다 대개 낮습니다. 리스는 차값 전부가 아니라{' '}
            <strong>기간 동안 떨어지는 값</strong>만 나눠 받기 때문입니다. 그래서 월 납입액만
            견주면 리스가 반드시 싸 보입니다. 하지만 기간이 끝나면 현금·할부는 차가 내 것으로
            남고 리스는 반납하면 아무것도 안 남습니다. 이 계산기가 총비용에서{' '}
            <strong>기간 말 잔존가치를 빼는</strong> 까닭이고, 그 한 줄이 순위를 자주 뒤집습니다.
            연식별로 얼마가 남는지는{' '}
            <Link href="/calculator/car-depreciation" className="underline">자동차 감가상각 계산기</Link>에서
            먼저 확인해 그 감가율을 여기 넣으세요.
          </p>
          <h2>현금은 공짜가 아닙니다</h2>
          <p>
            현금으로 사면 이자를 한 푼도 안 내니 가장 싸 보입니다. 그런데 첫날에 나간 4,000만원은
            그 기간 내내 <strong>다른 데서 벌 수 있었던 돈</strong>까지 같이 잃은 것입니다.
            그래서 기회수익률을 입력으로 받아 나간 돈을 모두 기간 말 시점의 값으로 옮겨 더합니다.
            수익률을 0으로 두면 그냥 단순 합이 되므로, 예금 이자만 생각하는 사람과 투자로 굴리는
            사람의 답이 갈리는 지점을 직접 볼 수 있습니다.
          </p>
          <h2>리스료에 무엇이 들었는지를 먼저 물어보세요</h2>
          <p>
            리스는 차가 리스사 명의라 <strong>취등록세와 보험이 리스료에 들어가는 경우가 많습니다</strong>.
            포함인데 현금·할부 쪽에만 그 비용을 얹으면 리스가 부당하게 싸게 나오고, 반대로 별도인데
            안 얹으면 리스가 부당하게 비싸게 나옵니다. 그래서 이 계산기는 포함 여부를 체크박스로
            나눕니다. 취등록세가 얼마인지는{' '}
            <Link href="/calculator/car-registration" className="underline">자동차 취등록세 계산기</Link>가,
            월 할부금만 따로 보려면{' '}
            <Link href="/calculator/car-installment" className="underline">자동차 할부 계산기</Link>가 세 줍니다.
          </p>
          <h2>사업자와 개인은 답이 다릅니다</h2>
          <p>
            개인은 이 계산 그대로 보면 됩니다. 반면 사업자는 리스료를 <strong>비용으로 처리</strong>할
            수 있어 세금이 줄고, 그만큼 실제 부담이 내려갑니다. 차량 관련 비용은 한도와 운행기록
            요건이 붙으므로 세율만 곱해서 얼마가 준다고 단정할 수 없습니다. 이 계산기는{' '}
            <strong>세금 효과를 넣지 않은 값</strong>이니, 사업자라면 여기서 나온 리스 총비용에서
            절세분을 따로 덜어 보세요.
          </p>
          <h2>이 계산이 못 하는 것</h2>
          <p>
            유류비·정비비·자동차세처럼 세 방식이 똑같이 물리는 유지비는 넣지 않았습니다. 양쪽에 같은
            값을 더해도 순위가 안 바뀌기 때문입니다 — 그쪽은{' '}
            <Link href="/calculator/car-cost" className="underline">차량 유지비 계산기</Link>에서 보세요.
            리스의 <strong>주행거리 초과 위약금·중도해지 수수료·과도한 흠집에 붙는 반납 정산금</strong>도
            반영하지 않았습니다. 계약서에 적힌 약정 주행거리를 넘길 것 같으면 리스 총비용은 여기 나온
            값보다 커집니다. 잔존가치도 정률법으로 셈한 추정치일 뿐, 실제 중고 시세는 차종·주행거리·사고
            이력에 따라 크게 다릅니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader title="같은 차 · 같은 기간" sub="세 방식이 공통으로 물리는 값" />
          <div className="p-5 flex flex-col gap-3">
            <div>
              <Label>차량 가격 (원)</Label>
              <CommaInput value={price} onChange={setPrice} placeholder="예: 40,000,000" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>비교 기간</Label>
                <select value={months} onChange={e => setMonths(e.target.value)} className={inputCls}>
                  {[24, 36, 48, 60, 72, 84].map(n => (
                    <option key={n} value={n}>{n}개월 ({n / 12}년)</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>취등록세 등 초기비용 (원)</Label>
                <CommaInput value={upfrontFee} onChange={setUpfrontFee} placeholder="예: 2,800,000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>연 감가율 (%)</Label>
                <input type="number" value={depreciation} onChange={e => setDepreciation(e.target.value)}
                  placeholder="예: 15" className={inputCls} min="0" max="100" step="0.1" />
              </div>
              <div>
                <Label>기회수익률 (연 %)</Label>
                <input type="number" value={opportunity} onChange={e => setOpportunity(e.target.value)}
                  placeholder="예: 4" className={inputCls} min="0" step="0.1" />
              </div>
            </div>
            <div>
              <Label>연 보험료 (원)</Label>
              <CommaInput value={insurance} onChange={setInsurance} placeholder="예: 1,200,000" />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="할부" sub="원리금균등 기준" />
          <div className="p-5 grid grid-cols-2 gap-3">
            <div>
              <Label>선수금 (원)</Label>
              <CommaInput value={loanDown} onChange={setLoanDown} placeholder="예: 5,000,000" />
            </div>
            <div>
              <Label>연 금리 (%)</Label>
              <input type="number" value={loanRate} onChange={e => setLoanRate(e.target.value)}
                placeholder="예: 5.9" className={inputCls} min="0" step="0.1" />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="리스" sub="제시받은 견적을 그대로 넣으세요" />
          <div className="p-5 flex flex-col gap-3">
            <div>
              <Label>월 리스료 (원)</Label>
              <CommaInput value={leaseMonthly} onChange={setLeaseMonthly} placeholder="예: 730,000" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>보증금 (원)</Label>
                <CommaInput value={leaseDeposit} onChange={setLeaseDeposit} placeholder="예: 5,000,000" />
              </div>
              <div>
                <Label>선수금 (원)</Label>
                <CommaInput value={leasePrepaid} onChange={setLeasePrepaid} placeholder="예: 3,000,000" />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={depositReturned} onChange={e => setDepositReturned(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">만기에 보증금을 돌려받는다</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={includesFee} onChange={e => setIncludesFee(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">취등록세 등 초기비용이 리스료에 포함</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={includesInsurance} onChange={e => setIncludesInsurance(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">보험료가 리스료에 포함</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={buy} onChange={e => setBuy(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">만기에 인수한다 (반납하면 잔가가 안 남는다)</span>
            </label>
            {buy && (
              <div>
                <Label>인수금 (원)</Label>
                <CommaInput value={buyout} onChange={setBuyout} placeholder="예: 15,000,000" />
              </div>
            )}
            <PrimaryBtn onClick={calculate}>비교하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">{months}개월 총비용이 가장 적은 방식</p>
              <p className="stat-value">{result.best.label}</p>
              <p className="stat-sub">
                총비용 {fmt(result.best.total)}원 · 2위와 {fmt(result.ranked[1].gap)}원 차이
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <SummaryCard label="기간 말 잔존가치" value={`${fmt(result.residual)}원`}
                sub={`산 값의 ${Math.round((result.residual / price) * 100)}% · 현금·할부에 남는 값`} />
              <SummaryCard label="할부 월 상환액" value={`${fmt(result.loan.monthly)}원`}
                sub={`대출 원금 ${fmt(result.loan.principal)}원 · 총 이자 ${fmt(result.loan.totalInterest)}원`}
                variant="red" />
            </div>

            <Card>
              <CardHeader title="방식별 총비용" sub="잔존가치와 돌려받는 돈을 뺀 값 · 싼 순서" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.ranked.map(p => (
                  <div key={p.key} className="px-5 py-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        <span className="text-slate-400 dark:text-slate-500 mr-2">{p.rank}위</span>
                        {p.label}
                      </span>
                      <span className="font-black">
                        {fmt(p.total)}원
                        {p.gap > 0 && (
                          <span className="ml-2 text-xs font-normal text-red-500">+{fmt(p.gap)}</span>
                        )}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span>첫날 목돈 {fmt(p.upfront)}원</span>
                      <span>매달 {fmt(p.monthly)}원</span>
                      <span>나간 돈 합 {fmt(p.paidOut)}원</span>
                      <span>기회비용 {fmt(p.opportunityCost)}원</span>
                      <span>{p.residual > 0 ? `남는 차값 −${fmt(p.residual)}원` : '남는 차값 없음'}</span>
                      <span>
                        {p.refund > 0 ? `돌려받는 돈 −${fmt(p.refund)}원` : ''}
                        {p.endPayment > 0 ? `만기 인수금 ${fmt(p.endPayment)}원` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="월 부담 비교" sub="첫날 목돈은 따로 봅니다" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.plans.map(p => (
                  <div key={p.key} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{p.label}</span>
                    <span className="font-semibold">
                      월 {fmt(p.monthly)}원
                      <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                        첫날 {fmt(p.upfront)}원
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 유지비(유류비·정비비·자동차세)와 사업자 절세 효과, 리스 주행거리 초과 위약금은
                반영하지 않았습니다 · 잔존가치는 정률법 추정치입니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
