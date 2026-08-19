'use client';
import { useMemo, useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls } from '@/components/CalcShell';
import { calcYearEnd, estimatePremiums } from '@/lib/year-end-tax';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${(Math.round(n / 1000) / 10).toLocaleString()}만원`;
const num = (s: string) => {
  const v = Number(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export default function YearEndTaxPage() {
  const [gross, setGross] = useState('');
  const [dependents, setDependents] = useState('0');
  const [elderly, setElderly] = useState('0');
  const [disabled, setDisabled] = useState('0');
  const [children, setChildren] = useState('0');
  const [pensionPremium, setPensionPremium] = useState('');
  const [insurancePremium, setInsurancePremium] = useState('');
  const [otherIncomeDeduction, setOtherIncomeDeduction] = useState('');
  const [taxCredits, setTaxCredits] = useState('');
  const [prepaid, setPrepaid] = useState('');

  const result = useMemo(() => {
    const grossSalary = num(gross);
    if (grossSalary <= 0) return null;
    return calcYearEnd({
      grossSalary,
      dependents: num(dependents),
      elderly: num(elderly),
      disabled: num(disabled),
      children: num(children),
      pensionPremium: num(pensionPremium),
      insurancePremium: num(insurancePremium),
      otherIncomeDeduction: num(otherIncomeDeduction),
      taxCredits: num(taxCredits),
      prepaid: num(prepaid),
    });
  }, [gross, dependents, elderly, disabled, children, pensionPremium,
    insurancePremium, otherIncomeDeduction, taxCredits, prepaid]);

  /** 명세서가 없을 때 총급여로 보험료 칸을 채운다 — 어림값이다 */
  function fillPremiums() {
    const p = estimatePremiums(num(gross));
    if (p.pension <= 0) return;
    setPensionPremium(String(Math.round(p.pension)));
    setInsurancePremium(String(Math.round(p.insurance)));
  }

  const refunding = result ? result.refund >= 0 : true;

  return (
    <CalcShell
      path="/calculator/year-end-tax"
      title="연말정산 환급액 계산기"
      description="총급여·공제로 결정세액을 내고 기납부세액과 비교합니다"
      intro={
        <>
          <h2>왜 &lsquo;13월의 월급&rsquo;인가</h2>
          <p>
            회사는 매달 급여에서 세금을 <strong>어림으로</strong> 떼어 갑니다. 근로소득 간이세액표에
            따라 급여와 부양가족 수만 보고 계산하기 때문에, 의료비를 많이 썼는지 기부를 했는지
            연금계좌에 넣었는지는 반영되지 않습니다. 그래서 한 해가 끝나면 실제로 내야 할 세금
            (<strong>결정세액</strong>)을 다시 계산해, 이미 낸 세금(<strong>기납부세액</strong>)과의
            차액을 맞춥니다. 더 냈으면 돌려받고(환급), 덜 냈으면 더 냅니다(추가납부). 환급은 상금이
            아니라 <strong>미리 낸 내 돈을 되찾는 것</strong>입니다.
          </p>
          <h2>소득공제와 세액공제는 다릅니다</h2>
          <p>
            <strong>소득공제</strong>는 세금을 매기는 기준(과세표준)을 줄입니다. 그래서 같은 100만원을
            공제받아도 세율이 6%인 사람은 6만원, 24%인 사람은 24만원을 아낍니다.{' '}
            <strong>세액공제</strong>는 이미 계산된 세금에서 바로 뺍니다 — 100만원 공제면 소득이 얼마든
            100만원이 줄어듭니다. 연금계좌·의료비·교육비·기부금은 세액공제이고, 신용카드 사용액과
            주택자금은 소득공제입니다. 이 계산기가 두 칸을 따로 둔 이유입니다.
          </p>
          <h2>근로소득세액공제는 구간으로 갈립니다</h2>
          <p>
            산출세액 <strong>130만원까지는 55%</strong>, 넘는 몫은 <strong>30%</strong>를 빼 줍니다.
            다만 총급여에 따라 한도가 있습니다 — 3,300만원 이하는 74만원, 그 위로는 조금씩 내려가
            66만원·50만원을 거쳐 20만원까지 줄어듭니다. 아래 결과에서 &ldquo;한도&rdquo;를 함께 보여
            주는 것은, 공제가 생각보다 적게 붙는 이유가 대개 이 한도 때문이기 때문입니다.
          </p>
          <h2>이 계산기가 다루지 않는 것</h2>
          <p>
            의료비·교육비·기부금·신용카드처럼 요건이 촘촘한 항목은 <strong>합계를 입력받습니다.</strong>{' '}
            의료비는 총급여의 3%를 넘는 부분만, 카드는 총급여 25%를 넘는 사용액만 인정되고 항목마다
            한도와 공제율이 따로여서, 그 요건을 반쯤 구현해 그럴듯한 숫자를 내놓는 것보다 국세청
            간소화 자료에 나온 합계를 옮겨 적는 편이 정확합니다. 연금저축·IRP 공제액은{' '}
            <Link href="/calculator/pension-credit" className="underline">연금저축·IRP 세액공제 계산기</Link>에서
            먼저 계산해 세액공제 칸에 더하세요. 매달 얼마가 떼이는지는{' '}
            <Link href="/calculator/salary" className="underline">실수령액 계산기</Link>에서 봅니다.
          </p>
          <h2>한계</h2>
          <p>
            표준세액공제(13만원), 월세 세액공제, 중소기업 취업자 소득세 감면, 외국납부세액공제,
            중도 입·퇴사로 근무 기간이 한 해에 못 미치는 경우는 반영하지 않았습니다. 보험료 칸의
            &ldquo;총급여로 채우기&rdquo;도 표준 요율로 낸 어림값이라, 원천징수영수증이 있으면 그
            숫자를 넣는 것이 정확합니다. 결과는 추정치이고, 확정된 금액은 국세청 홈택스의 연말정산
            간소화·예상세액 계산에서 확인하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>총급여 (원, 비과세 제외)</Label>
              <MoneyInput value={gross} onChange={setGross} placeholder="예: 40000000" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>부양가족 수 (본인 제외)</Label>
                <input type="number" value={dependents} onChange={e => setDependents(e.target.value)}
                  className={inputCls} min="0" step="1" />
              </div>
              <div>
                <Label>8세 이상 자녀 수</Label>
                <input type="number" value={children} onChange={e => setChildren(e.target.value)}
                  className={inputCls} min="0" step="1" />
              </div>
              <div>
                <Label>70세 이상 (경로우대)</Label>
                <input type="number" value={elderly} onChange={e => setElderly(e.target.value)}
                  className={inputCls} min="0" step="1" />
              </div>
              <div>
                <Label>장애인 공제 대상</Label>
                <input type="number" value={disabled} onChange={e => setDisabled(e.target.value)}
                  className={inputCls} min="0" step="1" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="보험료 (연간)" sub="원천징수영수증 기준" />
          <div className="p-5 pt-4 flex flex-col gap-3">
            <div>
              <Label>국민연금 보험료 (원)</Label>
              <MoneyInput value={pensionPremium} onChange={setPensionPremium} placeholder="예: 1800000" />
            </div>
            <div>
              <Label>건강·장기요양·고용보험료 (원)</Label>
              <MoneyInput value={insurancePremium} onChange={setInsurancePremium} placeholder="예: 1960000" />
            </div>
            <button type="button" onClick={fillPremiums}
              className="text-xs font-bold text-blue-600 dark:text-blue-300 hover:underline text-left">
              총급여로 채우기 (표준 요율 어림값)
            </button>
          </div>
        </Card>

        <Card>
          <CardHeader title="그 밖의 공제" sub="간소화 자료의 합계" />
          <div className="p-5 pt-4 flex flex-col gap-3">
            <div>
              <Label>소득공제 합계 (원)</Label>
              <MoneyInput value={otherIncomeDeduction} onChange={setOtherIncomeDeduction} placeholder="신용카드 등·주택자금·주택마련저축" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                과세표준을 줄이는 공제 — 신용카드 등 사용금액, 주택임차차입금 원리금, 장기주택저당차입금 이자, 주택마련저축
              </p>
            </div>
            <div>
              <Label>세액공제 합계 (원)</Label>
              <MoneyInput value={taxCredits} onChange={setTaxCredits} placeholder="보험료·의료비·교육비·기부금·연금계좌" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                세금에서 바로 빼는 공제 — 보장성보험료, 의료비, 교육비, 기부금, 연금계좌, 월세.{' '}
                근로소득세액공제와 자녀세액공제는 아래에서 자동으로 계산합니다.
              </p>
            </div>
            <div>
              <Label>기납부세액 (원, 소득세)</Label>
              <MoneyInput value={prepaid} onChange={setPrepaid} placeholder="원천징수영수증의 기납부세액" />
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-lg p-5 ${refunding ? 'bg-blue-600' : 'bg-rose-600'}`}>
              <p className={`text-xs mb-1 ${refunding ? 'text-blue-200' : 'text-rose-200'}`}>
                {refunding ? '예상 환급액' : '예상 추가납부액'}
              </p>
              <p className="text-white text-3xl font-black">{fmt(Math.abs(result.totalRefund))}원</p>
              <p className={`text-xs mt-1 ${refunding ? 'text-blue-200' : 'text-rose-200'}`}>
                소득세 {fmt(Math.abs(result.refund))}원 + 지방소득세 {fmt(Math.abs(result.localRefund))}원
              </p>
            </div>

            <Card>
              <CardHeader title="결정세액이 나오기까지" />
              <div className="divide-y divide-slate-100">
                {[
                  ['총급여', num(gross)],
                  ['− 근로소득공제', -result.earningDeduction],
                  ['= 근로소득금액', result.earnedIncome],
                  ['− 소득공제 합계', -result.incomeDeductions],
                  ['= 과세표준', result.taxBase],
                  ['산출세액 (기본세율)', result.calculatedTax],
                  ['− 세액공제 합계', -result.creditTotal],
                  ['= 결정세액', result.finalTax],
                  ['지방소득세 (10%)', result.localTax],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="세액공제 내역" sub={`한도 ${man(result.creditLimit)}`} />
              <div className="divide-y divide-slate-100">
                {[
                  ['근로소득세액공제', result.earnedIncomeCredit],
                  ['자녀세액공제', result.childCredit],
                  ['입력한 세액공제', num(taxCredits)],
                  ['적용 합계', result.creditTotal],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  세액공제는 산출세액을 넘겨 받을 수 없습니다 — 넘는 몫은 그대로 사라집니다.
                  인적공제는 소득공제 합계에 들어가 있습니다 ({man(result.personalDeduction)}).
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 실효세율 {result.effectiveRate.toFixed(2)}% (결정세액 ÷ 총급여) · 표준세액공제·월세
                세액공제·중소기업 취업자 감면은 반영하지 않은 추정치입니다. 확정 금액은 홈택스에서 확인하세요.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
