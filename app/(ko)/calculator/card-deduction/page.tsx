'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls } from '@/components/CalcShell';
import {
  DEFAULT_EXTRA_LIMIT, DEFAULT_RATES, MEANS_LABEL, MEANS_ORDER, THRESHOLD_RATIO,
  calcCardDeduction, spendingHeadroom, type Means, type Spending,
} from '@/lib/card-deduction';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${(Math.round(n / 1000) / 10).toLocaleString()}만원`;
const num = (s: string) => {
  const v = Number(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};
/** 퍼센트로 적은 공제율 — 비우면 기본값을 쓴다 */
const pct = (s: string, fallback: number) => {
  const v = Number(s);
  return s !== '' && Number.isFinite(v) && v >= 0 ? v / 100 : fallback;
};

const PLACEHOLDER: Record<Means, string> = {
  credit: '예: 15000000',
  check: '예: 3000000',
  market: '예: 1200000',
  transit: '예: 600000',
  culture: '예: 300000',
};

export default function CardDeductionPage() {
  const [gross, setGross] = useState('');
  const [spend, setSpend] = useState<Record<Means, string>>({
    credit: '', check: '', market: '', transit: '', culture: '',
  });
  const [otherDeduction, setOtherDeduction] = useState('');
  const [rate, setRate] = useState<Record<Means, string>>({
    credit: '15', check: '30', market: '40', transit: '40', culture: '30',
  });
  const [extraLimit, setExtraLimit] = useState(String(DEFAULT_EXTRA_LIMIT));

  const input = useMemo(() => ({
    grossSalary: num(gross),
    spending: Object.fromEntries(MEANS_ORDER.map(m => [m, num(spend[m])])) as Spending,
    rates: {
      credit: pct(rate.credit, DEFAULT_RATES.credit),
      check: pct(rate.check, DEFAULT_RATES.check),
      market: pct(rate.market, DEFAULT_RATES.market),
      transit: pct(rate.transit, DEFAULT_RATES.transit),
      culture: pct(rate.culture, DEFAULT_RATES.culture),
    },
    extraLimit: num(extraLimit),
    otherDeduction: num(otherDeduction),
  }), [gross, spend, rate, extraLimit, otherDeduction]);

  const result = useMemo(
    () => (input.grossSalary > 0 ? calcCardDeduction(input) : null),
    [input],
  );
  const headroom = useMemo(
    () => (input.grossSalary > 0 ? spendingHeadroom(input) : null),
    [input],
  );

  const set = (
    state: Record<Means, string>,
    apply: (next: Record<Means, string>) => void,
  ) => (means: Means, value: string) => apply({ ...state, [means]: value });

  const setSpendOf = set(spend, setSpend);
  const setRateOf = set(rate, setRate);

  return (
    <CalcShell
      path="/calculator/card-deduction"
      title="신용카드 소득공제 계산기"
      description="총급여 25% 문턱을 넘긴 사용액으로 공제액과 절세액을 계산합니다"
      intro={
        <>
          <h2>총급여의 25%를 넘게 써야 시작합니다</h2>
          <p>
            신용카드 등 사용금액 소득공제는 쓴 돈 전부를 봐 주지 않습니다.{' '}
            <strong>총급여의 25%를 넘는 금액</strong>만 공제 대상이고, 그 아래는 한 푼도 공제가
            없습니다. 총급여 4,000만원이면 1,000만원까지는 카드를 어떻게 긁어도 공제가 0원이고,
            1,000만원을 넘긴 금액부터 세어 줍니다. &ldquo;카드를 많이 썼는데 왜 공제가 없나&rdquo;는
            물음의 답은 거의 늘 이 문턱입니다. 그래서 이 계산기는 문턱을 결과 첫 줄에 내놓습니다.
          </p>
          <h2>체크카드·현금영수증이 두 배 유리합니다</h2>
          <p>
            공제율이 수단마다 다릅니다. <strong>신용카드 15%</strong>,{' '}
            <strong>체크카드·현금영수증 30%</strong>, <strong>전통시장·대중교통 40%</strong>,{' '}
            도서·공연·박물관·미술관 30%입니다. 같은 100만원을 써도 체크카드가 신용카드의 두 배를
            공제받습니다. 다만 문턱을 넘기기 전이라면 어느 수단이든 공제는 0이므로, 카드 종류를
            고민하는 것은 문턱을 넘긴 다음의 일입니다.
          </p>
          <h2>문턱은 신용카드가 먼저 채웁니다</h2>
          <p>
            문턱은 사용액에서 <strong>깎아 없애는</strong> 금액입니다. 그러니 어느 수단이 문턱에
            먹히는지가 공제액을 바꿉니다. 15%짜리가 사라지고 40%짜리가 남는 편이 유리하므로,
            공제율이 낮은 신용카드가 먼저 문턱을 채우도록 계산합니다 — 소득세법의 차감 순서도
            신용카드 → 체크카드·현금영수증 → 도서·공연 → 전통시장·대중교통입니다. 아래
            &ldquo;수단별 내역&rdquo;에서 문턱이 무엇을 얼마나 먹었는지 볼 수 있습니다.
          </p>
          <h2>한도는 총급여로 갈립니다</h2>
          <p>
            공제액에는 한도가 있습니다. 총급여 <strong>7,000만원 이하는 300만원</strong>,
            넘으면 <strong>250만원</strong>입니다. 여기에 전통시장·대중교통·도서공연 사용분에서
            나온 공제액은 기본한도를 넘긴 몫이 <strong>추가한도</strong>까지 되살아납니다.
            추가한도는 묶는 방식과 금액이 해마다 손질돼 왔고 총급여 7,000만원을 넘으면
            도서·공연이 빠지기도 해서, 이 계산기는 그 값을 <strong>입력으로 받습니다.</strong>{' '}
            공제율 다섯 개도 같은 이유로 고칠 수 있게 열어 두었습니다 — 전통시장·대중교통 40%가
            한시로 크게 올라간 해가 있었습니다. 그 해의 값은 국세청 안내로 확인해 넣으세요.
          </p>
          <h2>소득공제라 절감액이 사람마다 다릅니다</h2>
          <p>
            이것은 세금에서 바로 빼는 세액공제가 아니라 <strong>과세표준을 줄이는 소득공제</strong>입니다.
            그래서 같은 300만원을 공제받아도 세율 6% 구간인 사람은 약 18만원, 24% 구간인 사람은 약
            72만원을 아낍니다(지방소득세 10%가 더 붙습니다). 아래 결과의 &ldquo;줄어드는 세금&rdquo;은
            총급여에서 근로소득공제를 빼고, 입력한 그 밖의 소득공제까지 뺀 과세표준에 기본세율을
            적용해 공제 전후를 견준 값입니다. 공제액이 세율 구간을 걸치면 두 세율에 나눠 걸리는
            것까지 반영합니다.
          </p>
          <h2>여기서 나온 값을 어디에 쓰나</h2>
          <p>
            이 금액이 연말정산의 <strong>&ldquo;신용카드 등 사용금액&rdquo; 소득공제</strong>입니다.{' '}
            <Link href="/calculator/year-end-tax" className="underline">연말정산 환급액 계산기</Link>의
            &ldquo;소득공제 합계&rdquo; 칸에 그대로 더해 넣으면 환급액까지 이어서 볼 수 있습니다.
            매달 얼마가 떼이는지는{' '}
            <Link href="/calculator/salary" className="underline">실수령액 계산기</Link>에서 봅니다.
          </p>
          <h2>한계</h2>
          <p>
            형제자매의 사용액, 세금·공과금·통신비·보험료·아파트 관리비·해외 사용액처럼 처음부터
            공제 대상이 아닌 항목은 사용액에서 빼고 넣어야 합니다. 총급여 7,000만원 초과자의
            도서·공연 제외, 소비증가분 추가공제 같은 한시 제도, 12월 사용분의 귀속 시점 문제는
            반영하지 않았습니다. 결과는 추정치이고, 확정된 사용액과 공제액은 국세청 홈택스
            연말정산 간소화 자료에서 확인하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>총급여 (원, 비과세 제외)</Label>
              <input type="number" value={gross} onChange={e => setGross(e.target.value)}
                placeholder="예: 40000000" className={inputCls} min="0" />
              {input.grossSalary > 0 && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  문턱 = 총급여 × {THRESHOLD_RATIO * 100}% = {fmt(input.grossSalary * THRESHOLD_RATIO)}원
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="한 해 사용액" sub="공제 대상이 아닌 항목은 빼고 넣으세요" />
          <div className="p-5 pt-4 flex flex-col gap-3">
            {MEANS_ORDER.map(m => (
              <div key={m}>
                <Label>{MEANS_LABEL[m]} (원)</Label>
                <input type="number" value={spend[m]} onChange={e => setSpendOf(m, e.target.value)}
                  placeholder={PLACEHOLDER[m]} className={inputCls} min="0" />
              </div>
            ))}
            <p className="text-xs text-slate-400 dark:text-slate-500">
              전통시장·대중교통·도서공연은 사용액을 따로 적습니다 — 그 몫에만 추가한도가 열립니다.
              도서·공연·박물관은 총급여 7,000만원 이하인 사람만 해당하므로, 넘으면 그 칸을 비우세요.
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader title="공제율·한도" sub="해마다 바뀌어 온 값이라 고칠 수 있게 열어 두었습니다" />
          <div className="p-5 pt-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {MEANS_ORDER.map(m => (
                <div key={m}>
                  <Label>{MEANS_LABEL[m]} 공제율 (%)</Label>
                  <input type="number" value={rate[m]} onChange={e => setRateOf(m, e.target.value)}
                    className={inputCls} min="0" step="1" />
                </div>
              ))}
            </div>
            <div>
              <Label>추가한도 (원)</Label>
              <input type="number" value={extraLimit} onChange={e => setExtraLimit(e.target.value)}
                className={inputCls} min="0" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                전통시장·대중교통·도서공연 몫에만 열리는 한도입니다. 기본한도(총급여 7,000만원 이하
                300만원, 초과 250만원)는 총급여에서 자동으로 정해집니다. 두 값 모두 연도별로 바뀌어
                왔으니 그 해의 국세청 안내와 맞춰 보세요.
              </p>
            </div>
            <div>
              <Label>그 밖의 소득공제 합계 (원, 비워도 됩니다)</Label>
              <input type="number" value={otherDeduction} onChange={e => setOtherDeduction(e.target.value)}
                placeholder="인적공제·보험료 등" className={inputCls} min="0" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                줄어드는 세금은 과세표준이 어느 세율 구간에 있느냐로 갈립니다. 이 칸을 비우면
                근로소득공제만 뺀 과세표준으로 어림합니다 — 실제보다 세율이 높게 잡힐 수 있습니다.
              </p>
            </div>
          </div>
        </Card>

        {result && (
          <>
            {result.belowThreshold ? (
              <div className="bg-rose-600 rounded-2xl p-5">
                <p className="text-rose-200 text-xs mb-1">공제 대상 금액</p>
                <p className="text-white text-3xl font-black">0원</p>
                <p className="text-rose-200 text-xs mt-1">
                  문턱 {man(result.threshold)}을 아직 넘지 않았습니다 · 총사용액 {man(result.totalSpending)}
                </p>
              </div>
            ) : (
              <div className="bg-blue-600 rounded-2xl p-5">
                <p className="text-blue-200 text-xs mb-1">한도 적용 후 공제액</p>
                <p className="text-white text-3xl font-black">{fmt(result.deduction)}원</p>
                <p className="text-blue-200 text-xs mt-1">
                  줄어드는 세금 {fmt(result.totalSaved)}원 (소득세 {fmt(result.incomeTaxSaved)} +
                  지방소득세 {fmt(result.localTaxSaved)})
                </p>
              </div>
            )}

            <Card>
              <CardHeader title="공제액이 나오기까지" />
              <div className="divide-y divide-slate-100">
                {[
                  ['총사용액', result.totalSpending],
                  [`− 문턱 (총급여 × ${THRESHOLD_RATIO * 100}%)`, -result.threshold],
                  ['= 공제 대상 금액', result.eligibleSpending],
                  ['공제액 (한도 적용 전)', result.rawDeduction],
                  ['기본한도까지 인정', result.basicApplied],
                  ['추가한도로 되살린 몫', result.extraApplied],
                  ['= 최종 공제액', result.deduction],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  기본한도 {man(result.basicLimit)} · 추가한도 {man(result.extraLimit)}
                  {result.cappedByLimit && ' · 한도에 걸려 깎였습니다'}
                </p>
              </div>
            </Card>

            <Card>
              <CardHeader title="수단별 내역" sub="문턱은 공제율이 낮은 수단이 먼저 채웁니다" />
              <div className="divide-y divide-slate-100">
                {result.byMeans.filter(m => m.spending > 0).map(m => (
                  <div key={m.means} className="px-5 py-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-300">
                        {MEANS_LABEL[m.means]}{' '}
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {Math.round(m.rate * 1000) / 10}%
                        </span>
                      </span>
                      <span className="font-semibold">{fmt(m.deduction)}원</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      사용 {fmt(m.spending)} · 문턱 차감 −{fmt(m.usedForThreshold)} ·
                      공제 대상 {fmt(m.eligible)}
                      {m.extra && ' · 추가한도 대상'}
                    </p>
                  </div>
                ))}
                {result.totalSpending === 0 && (
                  <p className="px-5 py-3 text-sm text-slate-400 dark:text-slate-500">
                    사용액을 넣으면 수단별로 나눠 보여 줍니다.
                  </p>
                )}
              </div>
            </Card>

            {headroom && (
              <Card>
                <CardHeader title="얼마를 더 써야 공제가 늘어나나" />
                <div className="divide-y divide-slate-100">
                  {[
                    ['문턱까지 남은 사용액', headroom.toThreshold],
                    ['문턱을 넘긴 금액', headroom.overThreshold],
                    ['기본한도까지 남은 공제액', headroom.limitLeft],
                    ['체크카드·현금영수증으로 더 쓴다면', headroom.moreByCheck],
                    ['신용카드로 더 쓴다면', headroom.moreByCredit],
                  ].map(([k, v]) => (
                    <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">{k}</span>
                      <span className="font-semibold">{fmt(v as number)}원</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {headroom.limitLeft > 0
                      ? '문턱이 남아 있으면 그 금액까지는 공제가 붙지 않으므로 함께 더한 값입니다. 같은 한도를 채우는 데 신용카드는 체크카드의 두 배를 써야 합니다.'
                      : '기본한도를 이미 채웠습니다 — 일반 사용액을 더 써도 공제는 늘지 않습니다. 전통시장·대중교통 사용분에는 추가한도가 남아 있을 수 있습니다.'}
                  </p>
                </div>
              </Card>
            )}

            <Card>
              <CardHeader title="이 공제로 줄어드는 세금" sub="소득공제라 사람마다 다릅니다" />
              <div className="divide-y divide-slate-100">
                {[
                  ['공제 전 과세표준', result.taxBaseBefore],
                  ['공제 후 과세표준', result.taxBaseAfter],
                  ['줄어드는 소득세', result.incomeTaxSaved],
                  ['줄어드는 지방소득세 (10%)', result.localTaxSaved],
                  ['합계', result.totalSaved],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  공제액에 실제로 붙은 세율 {(result.marginalRate * 100).toFixed(1)}% · 이 금액을{' '}
                  <Link href="/calculator/year-end-tax" className="underline">연말정산 환급액 계산기</Link>의
                  소득공제 합계 칸에 더해 넣으세요.
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 공제율과 추가한도는 연도별로 바뀌어 온 값이라 입력으로 받습니다 · 세금·통신비·보험료·
                관리비·해외 사용액 등 공제 대상이 아닌 항목은 제외한 추정치이고, 확정 금액은
                홈택스 연말정산 간소화에서 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
