'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, SummaryCard } from '@/components/CalcShell';
import {
  CASH_RECEIPT_RATE, DEFAULT_RATE_RULES, REQUIREMENT_KEYS, REQUIREMENT_LABEL, RENT_LIMIT,
  calcMonthlyRentDeduction, type RateRule, type Requirements,
} from '@/lib/monthly-rent-deduction';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;
const pct = (n: number) => `${Math.round(n * 1000) / 10}%`;

const ALL_MET: Requirements = {
  noHouse: true, household: true, houseSize: true, contract: true, address: true,
};

/** 요건 체크박스 아래에 덧붙이는 안내 — 숫자는 확인이 필요한 값이라 lib에 두지 않았다 */
const REQUIREMENT_HINT: Partial<Record<keyof Requirements, string>> = {
  household: '세대주가 주택자금·주택마련저축 공제를 받고 있으면 세대원은 받을 수 없습니다',
  houseSize: '국민주택규모(전용 85㎡) 이하 또는 기준시가 4억원 이하로 알려져 있으나 확인된 값이 아닙니다 — 홈택스에서 확인하세요',
  address: '주소가 다르면 그 기간은 공제되지 않습니다. 전입신고 다음 날부터 셉니다',
};

export default function MonthlyRentDeductionPage() {
  const [salary, setSalary] = useState('40000000');
  const [rent, setRent] = useState('600000');
  const [months, setMonths] = useState('12');
  const [requirements, setRequirements] = useState<Requirements>(ALL_MET);

  /* 결정세액을 모르는 사람이 대부분이라 총급여로 어림하고, 아는 사람은 직접 넣는다 */
  const [tax, setTax] = useState('');
  const [dependents, setDependents] = useState('0');
  const [totalIncome, setTotalIncome] = useState('');
  const [otherCredits, setOtherCredits] = useState('');

  /* 법이 개정되면 바뀌는 값 — 비워 두면 lib의 지금 값을 쓴다 */
  const [limit, setLimit] = useState('');
  const [highRate, setHighRate] = useState('');
  const [lowRate, setLowRate] = useState('');
  const [salaryCap, setSalaryCap] = useState('');

  const num = (v: string) => Number(v) || 0;
  const [first, second] = DEFAULT_RATE_RULES;

  /*
   * 공제율 표를 화면에서 갈아 끼운다. 빈 칸은 lib의 값을 그대로 쓴다.
   * 구간 경계와 종합소득금액 기준은 표에 적어 두고 여기서는 안 받는다.
   */
  const rateRules: RateRule[] = [
    { ...first, rate: num(highRate) > 0 ? num(highRate) / 100 : first.rate },
    {
      ...second,
      rate: num(lowRate) > 0 ? num(lowRate) / 100 : second.rate,
      salaryUpTo: num(salaryCap) > 0 ? num(salaryCap) : second.salaryUpTo,
    },
  ];

  const r = calcMonthlyRentDeduction({
    grossSalary: num(salary),
    monthlyRent: num(rent),
    months: num(months),
    requirements,
    rateRules,
    rentLimit: num(limit) > 0 ? num(limit) : undefined,
    taxBeforeCredit: num(tax) > 0 ? num(tax) : undefined,
    dependents: num(dependents),
    totalIncome: num(totalIncome) > 0 ? num(totalIncome) : undefined,
    otherCredits: num(otherCredits),
  });

  const toggle = (key: keyof Requirements) =>
    setRequirements(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <CalcShell
      path="/calculator/monthly-rent-deduction"
      title="월세 세액공제 계산기"
      description="한 해 낸 월세로 연말정산에서 실제로 돌려받는 금액을 계산합니다"
      intro={
        <>
          <h2>월세 세액공제는 낼 세금이 있어야 받습니다</h2>
          <p>
            이 공제는 소득공제가 아니라 <strong>세액공제</strong>입니다. 계산한 세금에서 바로 빼 주는
            것이라 <strong>결정세액을 넘는 몫은 환급되지 않고 그냥 사라집니다.</strong>{' '}
            총급여 3,000만원인 1인 가구의 결정세액은 50만원대인데 월세 60만원을 냈다면 공제액이
            122만원입니다. 70만원 넘는 금액은 받을 수 없습니다. 다른 계산기가 122만원을 크게
            띄워 놓는 자리라, 이 계산기는 사라지는 금액을 따로 적습니다.
          </p>

          <h2>총급여 1원 차이로 공제액이 절벽처럼 떨어집니다</h2>
          <p>
            소득세 기본세율은 초과누진이라 구간 경계에서 세금이 튀지 않습니다. 그런데 이 공제율은{' '}
            <strong>구간마다 하나의 율을 통째로 매깁니다.</strong> 그래서 총급여가{' '}
            {man(first.salaryUpTo)}에서 1원만 넘으면 공제율이 {pct(first.rate)}에서 {pct(second.rate)}로
            갈리고, 한도까지 낸 사람은 공제액이 {man(RENT_LIMIT * first.rate)}에서{' '}
            {man(RENT_LIMIT * second.rate)}로 떨어집니다. {man(second.salaryUpTo)}을 넘으면 공제가 아예
            없습니다. 연말 상여로 총급여가 경계를 살짝 넘는 것이 실제로 손해가 되는 구간입니다.
          </p>

          <h2>요건을 못 채우면 현금영수증 소득공제로 가세요</h2>
          <p>
            무주택·세대주·주택 규모·계약 명의·전입신고 가운데 하나만 어긋나도 이 공제는 0원입니다.
            그때는 월세를 <strong>현금영수증</strong>으로 신고해 신용카드 등 사용금액 소득공제에 넣을
            수 있습니다. 임대인의 동의가 없어도 임대차계약서와 계좌 이체 내역으로 홈택스에서 신고할
            수 있습니다. 다만 <strong>같은 월세를 두 갈래로 함께 받을 수는 없습니다.</strong>{' '}
            아래에서 두 갈래를 나란히 견줘 보세요.
          </p>

          <h2>소득공제로 돌리면 얼마나 손해인가</h2>
          <p>
            소득공제는 과세표준을 줄이는 것이라 실제로 줄어드는 세금은 <strong>그 사람의 세율</strong>만큼입니다.
            월세의 {pct(CASH_RECEIPT_RATE)}를 공제받아도 세율이 15%면 실제 절세는 월세의
            4~5%뿐입니다. 게다가 산출세액이 줄면 근로소득세액공제(산출세액의 55%)도 함께 줄어들어
            절세액이 다시 절반 아래로 깎입니다. 이 계산기는 그 몫까지 세어 견줍니다. 다만 소득공제
            갈래는 총급여 25% 문턱과 한도를 무시한 <strong>가장 좋은 경우</strong>이므로, 실제 금액은{' '}
            <Link href="/calculator/card-deduction">신용카드 소득공제 계산기</Link>에서 월세를 넣어
            확인하세요.
          </p>

          <h2>이 계산의 한계</h2>
          <p>
            <strong>요건은 이 계산기가 판단하지 않습니다</strong> — 국민주택규모와 기준시가 기준,
            세대주 요건은 숫자와 예외가 촘촘하고 개정을 거듭했습니다. 지어내는 대신 예·아니오로
            받습니다. 공제율·연 한도·총급여 상한도 조세특례제한법 개정으로 바뀌어 왔으므로 아래에서
            직접 고칠 수 있게 두었습니다. 결정세액은 총급여와 부양가족 수로 어림한 값이니{' '}
            <strong>원천징수영수증에 적힌 결정세액</strong>이 있으면 그것을 넣으세요. 그 값이 맞습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>총급여 (원)</Label>
              <input type="number" min="0" value={salary} onChange={e => setSalary(e.target.value)}
                className={inputCls} placeholder="비과세 수당을 뺀 한 해 급여" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>월세액 (원/월)</Label>
                <input type="number" min="0" value={rent} onChange={e => setRent(e.target.value)}
                  className={inputCls} />
              </div>
              <div>
                <Label>낸 개월 수</Label>
                <input type="number" min="0" max="12" value={months} onChange={e => setMonths(e.target.value)}
                  className={inputCls} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="요건 — 하나만 어긋나도 공제가 0원입니다" />
          <div className="flex flex-col gap-3 pt-4">
            {REQUIREMENT_KEYS.map(key => (
              <div key={key}>
                <label className="flex cursor-pointer select-none items-start gap-2">
                  <input type="checkbox" checked={requirements[key]} onChange={() => toggle(key)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">{REQUIREMENT_LABEL[key]}</span>
                </label>
                {REQUIREMENT_HINT[key] && (
                  <p className="mt-1 pl-6 text-xs text-slate-400 dark:text-slate-500">{REQUIREMENT_HINT[key]}</p>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="stat-pri">
          <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
            실제로 돌려받는 월세 세액공제 (지방소득세 포함 {fmt(r.creditRoute.totalSaved)}원)
          </p>
          <p className="stat-value">{fmt(r.credit)}원</p>
          <p className="mt-1 stat-sub">
            {r.rate > 0
              ? `공제 대상 월세 ${fmt(r.eligibleRent)}원 × ${pct(r.rate)} = ${fmt(r.rawCredit)}원`
              : '지금 입력으로는 이 공제를 받을 수 없습니다'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SummaryCard label="한 해 낸 월세" value={`${fmt(r.annualRent)}원`} />
          <SummaryCard label="공제 대상 월세액" value={`${fmt(r.eligibleRent)}원`}
            sub={r.overLimit > 0 ? `한도 초과 ${fmt(r.overLimit)}원 버려짐` : `연 한도 ${man(r.rentLimit)}`} />
          <SummaryCard label="적용 공제율" value={r.rate > 0 ? pct(r.rate) : '대상 아님'} />
          <SummaryCard label={r.taxEstimated ? '결정세액 (어림)' : '결정세액'}
            value={`${fmt(r.taxBeforeCredit)}원`} variant={r.wasted > 0 ? 'red' : 'default'} />
        </div>

        {(r.wasted > 0 || !r.qualified || r.overIncomeLimit || r.overLimit > 0) && (
          <Card className="p-4">
            <ul className="flex list-disc flex-col gap-1.5 pl-4 text-sm text-slate-600 dark:text-slate-300">
              {!r.qualified && (
                <li>
                  요건을 못 채워 공제액이 0원입니다 — {r.unmet.map(k => REQUIREMENT_LABEL[k]).join(' · ')}.
                  아래 소득공제 갈래를 보세요.
                </li>
              )}
              {r.overIncomeLimit && (
                <li>
                  총급여(또는 종합소득금액)가 상한을 넘어 이 공제의 대상이 아닙니다. 상한은{' '}
                  {man(rateRules[rateRules.length - 1].salaryUpTo)}입니다.
                </li>
              )}
              {r.wasted > 0 && (
                <li>
                  결정세액이 {fmt(r.taxBeforeCredit)}원뿐이라 공제액 {fmt(r.rawCredit)}원 가운데{' '}
                  <strong>{fmt(r.wasted)}원이 사라집니다.</strong> 세액공제는 낼 세금에서 빼는 것이라
                  환급되지 않습니다. 월 {fmt(r.fullCreditMonthlyRent)}원까지가 공제를 다 쓰는 월세입니다.
                </li>
              )}
              {r.overLimit > 0 && (
                <li>
                  한 해 낸 월세가 연 한도 {man(r.rentLimit)}을 넘어 {fmt(r.overLimit)}원은 공제 대상에
                  들어가지 않습니다.
                </li>
              )}
            </ul>
          </Card>
        )}

        <Card className="p-5">
          <CardHeader title="세액공제 vs 현금영수증 소득공제" sub="둘 중 하나만" />
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400">
                  <th className="py-1 text-left font-medium">갈래</th>
                  <th className="py-1 text-right font-medium">공제액</th>
                  <th className="py-1 text-right font-medium">줄어드는 세금</th>
                </tr>
              </thead>
              <tbody>
                <tr className={r.better === 'credit' ? 'font-bold text-blue-600' : ''}>
                  <td className="py-1">월세 세액공제</td>
                  <td className="py-1 text-right">{fmt(r.creditRoute.deduction)}원</td>
                  <td className="py-1 text-right">{fmt(r.creditRoute.totalSaved)}원</td>
                </tr>
                <tr className={r.better === 'income' ? 'font-bold text-blue-600' : ''}>
                  <td className="py-1">현금영수증 소득공제</td>
                  <td className="py-1 text-right">{fmt(r.incomeRoute.deduction)}원</td>
                  <td className="py-1 text-right">{fmt(r.incomeRoute.totalSaved)}원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            * 소득공제 갈래는 총급여 25% 문턱과 구간별 한도를 무시한 <strong>가장 좋은 경우</strong>입니다.
            실제로는 한 푼도 안 늘 수 있습니다. 소득공제로 실제 붙은 세율은{' '}
            {pct(r.incomeRouteMarginalRate)}입니다 — 산출세액이 줄면 근로소득세액공제도 함께 줄어들어
            공제율보다 훨씬 낮습니다.
          </p>
        </Card>

        <Card className="p-5">
          <CardHeader title="결정세액 — 아는 값이 있으면 그것이 맞습니다" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <Label>결정세액 (원)</Label>
              <input type="number" min="0" value={tax} onChange={e => setTax(e.target.value)}
                className={inputCls} placeholder={`비우면 ${fmt(r.taxBeforeCredit)}원`} />
            </div>
            <div>
              <Label>부양가족 수 (본인 제외)</Label>
              <input type="number" min="0" value={dependents} onChange={e => setDependents(e.target.value)}
                className={inputCls} />
            </div>
            <div>
              <Label>이미 받는 세액공제 (원)</Label>
              <input type="number" min="0" value={otherCredits} onChange={e => setOtherCredits(e.target.value)}
                className={inputCls} placeholder="보험료·의료비·연금계좌 등" />
            </div>
            <div>
              <Label>종합소득금액 (원)</Label>
              <input type="number" min="0" value={totalIncome} onChange={e => setTotalIncome(e.target.value)}
                className={inputCls} placeholder="근로소득만 있으면 비움" />
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            * 결정세액은 원천징수영수증(근로소득 지급명세서)의 <strong>결정세액</strong> 칸입니다.
            비워 두면 총급여·부양가족 수로 어림하는데, 실제 공제 항목을 모두 담지 못해 실제보다 크게
            나옵니다. 종합소득금액은 근로 말고 다른 소득이 있을 때만 넣으세요.
          </p>
        </Card>

        <Card className="p-5">
          <CardHeader title="법정 금액 직접 넣기" />
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400">
                  <th className="py-1 text-left font-medium">총급여</th>
                  <th className="py-1 text-left font-medium">종합소득금액</th>
                  <th className="py-1 text-right font-medium">공제율</th>
                </tr>
              </thead>
              <tbody>
                {DEFAULT_RATE_RULES.map((rule, i) => (
                  <tr key={rule.salaryUpTo}>
                    <td className="py-1">{man(rateRules[i].salaryUpTo)} 이하</td>
                    <td className="py-1">{man(rule.incomeUpTo)} 이하</td>
                    <td className="py-1 text-right">{pct(rateRules[i].rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div>
              <Label>연 한도 (원)</Label>
              <input type="number" min="0" value={limit} onChange={e => setLimit(e.target.value)}
                className={inputCls} placeholder={`비우면 ${fmt(RENT_LIMIT)}원`} />
            </div>
            <div>
              <Label>총급여 상한 (원)</Label>
              <input type="number" min="0" value={salaryCap} onChange={e => setSalaryCap(e.target.value)}
                className={inputCls} placeholder={`비우면 ${fmt(second.salaryUpTo)}원`} />
            </div>
            <div>
              <Label>높은 공제율 (%)</Label>
              <input type="number" min="0" step="0.1" value={highRate} onChange={e => setHighRate(e.target.value)}
                className={inputCls} placeholder={`비우면 ${pct(first.rate)}`} />
            </div>
            <div>
              <Label>낮은 공제율 (%)</Label>
              <input type="number" min="0" step="0.1" value={lowRate} onChange={e => setLowRate(e.target.value)}
                className={inputCls} placeholder={`비우면 ${pct(second.rate)}`} />
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            * 공제율·연 한도·총급여 상한은 조세특례제한법 개정으로 바뀌어 왔습니다(한도가 750만원이던
            해가 있고 총급여 상한이 7,000만원이던 해가 있습니다). 여기 적힌 값은{' '}
            <strong>확인된 값이 아닙니다</strong> —
            홈택스 연말정산 안내나 국세청 자료의 값이 다르면 그것이 맞으니 직접 넣으세요. 구간 경계
            총급여({man(first.salaryUpTo)})와 종합소득금액 기준은 위 표에 그대로 적어 두었습니다.
          </p>
        </Card>
      </div>
    </CalcShell>
  );
}
