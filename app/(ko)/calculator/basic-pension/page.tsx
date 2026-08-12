'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import {
  ASSET_CONVERSION_RATE, COUPLE_REDUCTION, FINANCIAL_DEDUCTION, LINKAGE_THRESHOLD,
  WORK_INCOME_FACTOR, calcBasicPension, maxAssetFor,
} from '@/lib/basic-pension';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

export default function BasicPensionPage() {
  const [workIncome, setWorkIncome] = useState('0');
  const [otherIncome, setOtherIncome] = useState('0');
  const [workDeduction, setWorkDeduction] = useState('');
  const [generalAsset, setGeneralAsset] = useState('0');
  const [financialAsset, setFinancialAsset] = useState('0');
  const [debt, setDebt] = useState('0');
  const [basicAssetDeduction, setBasicAssetDeduction] = useState('');
  const [luxuryAsset, setLuxuryAsset] = useState('0');
  const [threshold, setThreshold] = useState('');
  const [fullAmount, setFullAmount] = useState('');
  const [couple, setCouple] = useState(false);
  const [nationalPension, setNationalPension] = useState('0');
  const [result, setResult] = useState<null | {
    r: ReturnType<typeof calcBasicPension>;
    maxAsset: number;
  }>(null);

  function calculate() {
    const input = {
      workIncome: Number(workIncome || 0),
      otherIncome: Number(otherIncome || 0),
      workDeduction: Number(workDeduction || 0),
      generalAsset: Number(generalAsset || 0),
      financialAsset: Number(financialAsset || 0),
      debt: Number(debt || 0),
      basicAssetDeduction: Number(basicAssetDeduction || 0),
      luxuryAsset: Number(luxuryAsset || 0),
      threshold: Number(threshold),
      fullAmount: Number(fullAmount),
      couple,
      nationalPension: Number(nationalPension || 0),
    };
    if (input.threshold <= 0 || input.fullAmount <= 0) return;
    setResult({ r: calcBasicPension(input), maxAsset: maxAssetFor(input) });
  }

  return (
    <CalcShell
      path="/calculator/basic-pension"
      title="기초연금 수급 자격 계산기"
      description="소득인정액을 계산해 선정기준액과 견주고 예상 수령액을 냅니다"
      intro={
        <>
          <h2>통장에 들어오는 돈만 보는 게 아닙니다</h2>
          <p>
            기초연금은 만 65세 이상 중 <strong>소득인정액이 선정기준액 이하</strong>인 사람에게 줍니다.
            소득인정액은 버는 돈에 <strong>재산을 소득으로 바꾼 값</strong>을 더한 것입니다.
            집이 있으면 그 집이 매달 얼마를 벌어 준다고 보고 세는 셈입니다.
          </p>
          <p>
            <strong>소득인정액 = 소득평가액 + 재산의 소득환산액</strong><br />
            소득평가액 = {WORK_INCOME_FACTOR} × (근로소득 − 근로소득공제) + 기타소득<br />
            재산의 소득환산액 = (일반재산 − 기본재산액 + 금융재산 − {man(FINANCIAL_DEDUCTION)} − 부채)
            × {ASSET_CONVERSION_RATE * 100}% ÷ 12 + 고급자동차·회원권
          </p>
          <h2>일해서 번 돈은 덜 셉니다</h2>
          <p>
            근로소득은 공제액을 뺀 뒤 <strong>70%만</strong> 셉니다. 일하는 노인이 불리해지지 않게 하려는
            장치입니다. 공제액보다 적게 벌면 근로소득은 0으로 봅니다.
          </p>
          <h2>기본재산액은 금융재산으로 넘어갑니다</h2>
          <p>
            기본재산액 공제는 일반재산에서 먼저 빼고, <strong>남으면 금융재산에서 이어서</strong> 뺍니다.
            그래서 전세로 살며 예금만 있는 분이 이 규칙의 덕을 가장 크게 봅니다 — 집이 없으면 기본재산액이
            고스란히 예금 공제로 넘어갑니다.
          </p>
          <h2>고급자동차는 공제가 없습니다</h2>
          <p>
            고급자동차와 골프 회원권 등은 <strong>가액 전액이 그대로 월 소득</strong>으로 잡힙니다. 4%를
            매기는 게 아니라 전액이라, 이것 하나로 탈락하는 경우가 많습니다.
          </p>
          <h2>해마다 바뀌는 값은 직접 넣으세요</h2>
          <p>
            선정기준액·기준연금액·기본재산액·근로소득공제는 모두 해마다 고시되고 매년 오릅니다.
            박아 두면 내년에 틀린 답을 답처럼 보여 주므로 비워 두었습니다. 기본재산액은 사는 곳에 따라
            <strong> 대도시·중소도시·농어촌</strong> 세 구간으로 다릅니다. 네 값 모두 보건복지부 고시나
            국민연금공단 안내에서 그 해의 값을 확인해 넣으세요.
          </p>
          <h2>국민연금을 많이 받으면 깎일 수 있습니다</h2>
          <p>
            국민연금 수령액이 기준연금액의 <strong>{LINKAGE_THRESHOLD * 100}%</strong>를 넘으면 기초연금이
            깎이는 연계 감액이 있습니다. 그 감액은 국민연금 급여 중 일부를 따로 떼어 계산해야 하고 그
            값은 공단만 알기 때문에, 이 계산기는 <strong>금액을 지어내지 않고 대상인지만 알립니다.</strong>{' '}
            국민연금 쪽 금액은{' '}
            <Link href="/calculator/national-pension" className="underline">국민연금 예상 수령액 계산기</Link>에서
            보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">그 해 고시값</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>선정기준액 (월, 원)</Label>
                <input type="number" value={threshold} onChange={e => setThreshold(e.target.value)}
                  placeholder="예: 2280000" className={inputCls} min="0" />
              </div>
              <div>
                <Label>기준연금액 (월, 원)</Label>
                <input type="number" value={fullAmount} onChange={e => setFullAmount(e.target.value)}
                  placeholder="예: 340000" className={inputCls} min="0" />
              </div>
              <div>
                <Label>기본재산액 (원)</Label>
                <input type="number" value={basicAssetDeduction} onChange={e => setBasicAssetDeduction(e.target.value)}
                  placeholder="사는 곳별 고시값" className={inputCls} min="0" />
              </div>
              <div>
                <Label>근로소득공제 (원)</Label>
                <input type="number" value={workDeduction} onChange={e => setWorkDeduction(e.target.value)}
                  placeholder="그 해 고시값" className={inputCls} min="0" />
              </div>
            </div>

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">내 소득과 재산</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>근로소득 (월, 원)</Label>
                <input type="number" value={workIncome} onChange={e => setWorkIncome(e.target.value)}
                  className={inputCls} min="0" />
              </div>
              <div>
                <Label>기타소득 (월, 원)</Label>
                <input type="number" value={otherIncome} onChange={e => setOtherIncome(e.target.value)}
                  className={inputCls} min="0" />
              </div>
              <div>
                <Label>일반재산 (원)</Label>
                <input type="number" value={generalAsset} onChange={e => setGeneralAsset(e.target.value)}
                  className={inputCls} min="0" />
              </div>
              <div>
                <Label>금융재산 (원)</Label>
                <input type="number" value={financialAsset} onChange={e => setFinancialAsset(e.target.value)}
                  className={inputCls} min="0" />
              </div>
              <div>
                <Label>부채 (원)</Label>
                <input type="number" value={debt} onChange={e => setDebt(e.target.value)}
                  className={inputCls} min="0" />
              </div>
              <div>
                <Label>고급자동차·회원권 (원)</Label>
                <input type="number" value={luxuryAsset} onChange={e => setLuxuryAsset(e.target.value)}
                  className={inputCls} min="0" />
              </div>
            </div>
            <div>
              <Label>받고 있는 국민연금 (월, 원)</Label>
              <input type="number" value={nationalPension} onChange={e => setNationalPension(e.target.value)}
                className={inputCls} min="0" />
            </div>
            <div className="flex gap-2">
              {[{ v: false, label: '단독가구' }, { v: true, label: '부부 둘 다 수급' }].map(o => (
                <button key={String(o.v)} onClick={() => setCouple(o.v)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border ${
                    couple === o.v
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}>
                  {o.label}
                </button>
              ))}
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-2xl p-5 ${result.r.eligible ? 'bg-blue-600' : 'bg-slate-600'}`}>
              <p className="text-blue-200 text-xs mb-1">
                {result.r.eligible ? '예상 월 수령액' : '선정기준액을 넘었습니다'}
              </p>
              <p className="text-white text-3xl font-black">
                {result.r.eligible ? `${fmt(result.r.monthly)}원` : '수급 대상 아님'}
              </p>
              <p className="text-blue-200 text-xs mt-1">
                소득인정액 {fmt(result.r.recognized)}원 ·{' '}
                {result.r.eligible
                  ? `기준까지 ${fmt(result.r.headroom)}원 남음`
                  : `기준을 ${fmt(-result.r.headroom)}원 초과`}
              </p>
            </div>

            {result.r.linkageRisk && (
              <Card className="p-5 border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  국민연금 수령액이 기준연금액의 {LINKAGE_THRESHOLD * 100}%를 넘으므로
                  <strong> 연계 감액 대상일 수 있습니다.</strong> 위 금액은 그 감액을 반영하지 않은
                  값입니다 — 감액분은 국민연금 급여 구성에 따라 달라져 공단 조회로만 확인됩니다.
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="소득인정액이 어떻게 나왔나" />
              <div className="divide-y divide-slate-100">
                {[
                  ['소득평가액', `${fmt(result.r.incomeValue)}원`],
                  ['재산의 소득환산액', `${fmt(result.r.assetValue)}원`],
                  ['소득인정액 합계', `${fmt(result.r.recognized)}원`],
                  ['선정기준액', `${fmt(Number(threshold))}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="수령액이 어떻게 깎였나" />
              <div className="divide-y divide-slate-100">
                {[
                  ['기준연금액', `${fmt(Number(fullAmount))}원`],
                  [`부부 감액 (${COUPLE_REDUCTION * 100}%)`, couple ? `−${fmt(Number(fullAmount) * COUPLE_REDUCTION)}원` : '해당 없음'],
                  ['소득역전방지 감액', result.r.reverseCut > 0 ? `−${fmt(result.r.reverseCut)}원` : '없음'],
                  ['최종 월 수령액', `${fmt(result.r.monthly)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                지금 소득이 그대로라면 재산이 <strong>{man(result.maxAsset)}</strong>까지는 선정기준액을
                넘지 않습니다(기본재산액 공제를 포함한 값). 환산식을 뒤집어 되짚은 금액입니다.
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 고시값은 입력한 것을 그대로 씁니다 · 국민연금 연계 감액은 반영하지 않았습니다 ·
                실제 결정액은 국민연금공단 신청·조회로 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
