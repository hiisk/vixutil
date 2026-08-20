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
import {
  PENSION_DEDUCTION_CAP, PRIVATE_OVER_RATE, PRIVATE_SEPARATE_LIMIT,
  calcPensionTax, pensionDeduction, spreadTable,
} from '@/lib/pension-tax';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

const SPREAD_YEARS = [5, 10, 15, 20];

export default function PensionTaxPage() {
  const [publicMonthly, setPublicMonthly] = useState('1200000');
  const [privateAnnual, setPrivateAnnual] = useState('0');
  const [age, setAge] = useState('65');
  const [otherIncome, setOtherIncome] = useState('0');
  const [personalDeduction, setPersonalDeduction] = useState('1500000');
  const [privateTotal, setPrivateTotal] = useState('');
  const [result, setResult] = useState<null | {
    r: ReturnType<typeof calcPensionTax>;
    publicAnnual: number;
    spread: ReturnType<typeof spreadTable> | null;
  }>(null);

  function calculate() {
    const publicAnnual = Number(publicMonthly || 0) * 12;
    const input = {
      publicAnnual,
      privateAnnual: Number(privateAnnual || 0),
      age: Number(age || 65),
      otherIncome: Number(otherIncome || 0),
      personalDeduction: Number(personalDeduction || 0),
    };
    if (publicAnnual <= 0 && input.privateAnnual <= 0) return;
    const total = Number(privateTotal || 0);
    setResult({
      r: calcPensionTax(input),
      publicAnnual,
      spread: total > 0 ? spreadTable(input, total, SPREAD_YEARS) : null,
    });
  }

  return (
    <CalcShell
      path="/calculator/pension-tax"
      title="연금소득세 계산기"
      description="공적연금과 사적연금의 세금을 갈라 세후 수령액을 계산"
      intro={
        <>
          <h2>공적연금과 사적연금은 셈이 다릅니다</h2>
          <p>
            국민연금 같은 <strong>공적연금</strong>은 연금소득으로 종합과세됩니다. 다만 연금소득공제를
            크게 주기 때문에 실제 세금은 생각보다 적고, 받는 금액이 적으면 <strong>아예 0</strong>이 됩니다.
            연금저축·IRP 같은 <strong>사적연금</strong>은 낮은 세율로 떼고 끝내는 분리과세를 고를 수 있습니다.
          </p>
          <h2>연금소득공제는 900만원까지</h2>
          <p>
            총연금액 350만원까지는 <strong>전액</strong>, 그 위로는 구간마다 40%·20%·10%씩 빼 주고
            한도는 {man(PENSION_DEDUCTION_CAP)}입니다. 연 1,400만원을 받는 분은
            {' '}{man(pensionDeduction(14_000_000))}을 공제받습니다.
          </p>
          <h2>사적연금은 늦게 받을수록 세율이 낮습니다</h2>
          <p>
            연간 수령액이 <strong>{man(PRIVATE_SEPARATE_LIMIT)} 이하</strong>면 저율 분리과세를 고를 수
            있고, 세율이 나이에 따라 내려갑니다 — 70세 미만 5.5%, 70세 이상 4.4%, 80세 이상 3.3%
            (지방소득세 포함). 한 살 차이로 세금이 줄어드는 구간이 있습니다.
          </p>
          <h2>연 1,500만원이 문턱입니다</h2>
          <p>
            사적연금을 한 해에 {man(PRIVATE_SEPARATE_LIMIT)}보다 많이 받으면 저율 분리과세를 못 쓰고
            종합과세 또는 <strong>{PRIVATE_OVER_RATE * 100}% 분리과세</strong> 중에서 고르게 됩니다.
            1원만 넘어도 세율이 5.5%에서 16.5%로 뛰므로, <strong>같은 총액을 더 여러 해에 나눠 받는
            것</strong>이 세금을 크게 줄입니다. 아래 표가 그 차이를 보여 줍니다.
          </p>
          <h2>이 계산이 답하지 않는 것</h2>
          <p>
            1,500만원을 넘긴 경우 종합과세가 유리한지 16.5% 분리과세가 유리한지는 다른 소득까지 모두
            넣어 봐야 알 수 있습니다. 이 계산기는 넘긴 경우 16.5%로 잡아 보여 줍니다. 또 연금계좌에서
            <strong> 중도 인출</strong>하면 기타소득세 16.5%가 붙어 셈이 완전히 달라집니다.
          </p>
          <p>
            받을 연금액 자체는{' '}
            <Link href="/calculator/national-pension" className="underline">국민연금 예상 수령액 계산기</Link>,
            납입할 때 돌려받는 세금은{' '}
            <Link href="/calculator/pension-credit" className="underline">연금저축·IRP 세액공제 계산기</Link>,
            퇴직금을 한 번에 받을 때의 세금은{' '}
            <Link href="/calculator/retirement-income-tax" className="underline">퇴직소득세 계산기</Link>에서
            보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>공적연금 월 수령액 (원) — 국민연금 등</Label>
              <MoneyInput value={publicMonthly} onChange={setPublicMonthly} placeholder="예: 1200000" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>사적연금 연 수령액 (원)</Label>
                <MoneyInput value={privateAnnual} onChange={setPrivateAnnual} placeholder="예: 12000000" />
              </div>
              <div>
                <Label>나이 (만)</Label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)}
                  className={inputCls} min="0" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>그 밖의 종합과세 소득 (연, 원)</Label>
                <MoneyInput value={otherIncome} onChange={setOtherIncome} />
              </div>
              <div>
                <Label>인적공제 등 소득공제 (원)</Label>
                <MoneyInput value={personalDeduction} onChange={setPersonalDeduction} />
              </div>
            </div>
            <div>
              <Label>연금계좌 총 적립액 <span className="dial-opt">원, 비우면 생략</span></Label>
              <MoneyInput value={privateTotal} onChange={setPrivateTotal} placeholder="나눠 받기 비교용 · 예: 150000000" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">세후 월 수령액</p>
              <p className="stat-value">{fmt(result.r.netMonthly)}원</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                연 세금 {fmt(result.r.totalTax)}원 · 실효세율 {result.r.effectiveRate.toFixed(2)}%
              </p>
            </div>

            {result.r.privateOverLimit && (
              <Card className="p-5 border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  사적연금이 연 {man(PRIVATE_SEPARATE_LIMIT)}을 넘어 <strong>세율이
                  {' '}{PRIVATE_OVER_RATE * 100}%로 뛰었습니다.</strong> 한 해 수령액을 그 선 아래로
                  낮추면 세율이 절반 이하로 내려갑니다 — 아래 &ldquo;나눠 받으면&rdquo; 표를 보세요.
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="공적연금 쪽" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['연 수령액', `${fmt(result.publicAnnual)}원`],
                  ['연금소득공제', `−${fmt(result.r.deduction)}원`],
                  ['연금소득금액', `${fmt(result.r.publicIncome)}원`],
                  ['과세표준', `${fmt(result.r.taxBase)}원`],
                  ['소득세', `${fmt(result.r.publicTax)}원`],
                  ['지방소득세', `${fmt(result.r.publicLocalTax)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            {Number(privateAnnual) > 0 && (
              <Card>
                <CardHeader title="사적연금 쪽" />
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['연 수령액', `${fmt(Number(privateAnnual))}원`],
                    ['적용 세율', `${(result.r.privateRate * 100).toFixed(1)}%`],
                    ['세금 (지방소득세 포함)', `${fmt(result.r.privateTax)}원`],
                    ['분리과세 한도', result.r.privateOverLimit ? '초과' : '이내'],
                  ].map(([k, v]) => (
                    <div key={k} className="px-5 py-3 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {result.spread && (
              <Card>
                <CardHeader title="나눠 받으면 세금이 얼마 줄어드나" />
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {result.spread.map(row => (
                    <div key={row.years} className="px-5 py-3 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">
                        {row.years}년에 나눠
                        <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">
                          연 {man(row.perYear)} · {(row.rate * 100).toFixed(1)}%
                        </span>
                      </span>
                      <span className="font-semibold">세금 총 {fmt(row.totalTax)}원</span>
                    </div>
                  ))}
                </div>
                <p className="px-5 pb-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
                  해마다 한 살씩 먹는 것까지 반영했습니다 — 늦게 받는 몫은 더 낮은 세율을 만납니다
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                * 연금소득공제·저율 분리과세 세율은 법에 적힌 값입니다 · 1,500만원 초과분은 16.5%
                분리과세로 잡았습니다 · 중도 인출은 셈이 다릅니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
