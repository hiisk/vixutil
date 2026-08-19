'use client';
import { useState } from 'react';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 버튼을 없애 실시간이
 * 되면서 빈 칸으로 열면 폼만 있고 결과가 없는 화면이 된다 — 무엇을 보여 주는
 * 계산기인지 열어 보고도 모른다. 값을 미리 넣어 두면 열자마자 한 벌이 돌아가고
 * 사람은 그 위에 자기 숫자를 덮어쓴다. 값은 내가 지어내지 않고 저자가 이미
 * 골라 둔 예시를 그대로 올렸다.
 */
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls } from '@/components/CalcShell';
import {
  EMPLOYEE_SHARE, HEALTH_RATE, LONG_CARE_RATE, calcLocalHealth, compareEmployee,
} from '@/lib/health-insurance-local';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;
const pct = (r: number, digits = 2) => `${(r * 100).toFixed(digits)}%`;

export default function HealthInsuranceLocalPage() {
  const [annualIncome, setAnnualIncome] = useState('36000000');
  const [incomeFloorLine, setIncomeFloorLine] = useState('');
  const [minPremium, setMinPremium] = useState('');
  const [assetValue, setAssetValue] = useState('0');
  const [assetDeduction, setAssetDeduction] = useState('');
  const [assetPoints, setAssetPoints] = useState('0');
  const [carPoints, setCarPoints] = useState('0');
  const [pointValue, setPointValue] = useState('');
  const [maxPremium, setMaxPremium] = useState('');

  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: null | {
    r: ReturnType<typeof calcLocalHealth>;
    c: ReturnType<typeof compareEmployee>;
  } = ((): null | {
    r: ReturnType<typeof calcLocalHealth>;
    c: ReturnType<typeof compareEmployee>;
  } => {
    const input = {
      annualIncome: Number(annualIncome || 0),
      incomeFloorLine: Number(incomeFloorLine || 0),
      minPremium: Number(minPremium || 0),
      assetValue: Number(assetValue || 0),
      assetDeduction: Number(assetDeduction || 0),
      assetPoints: Number(assetPoints || 0),
      carPoints: Number(carPoints || 0),
      pointValue: Number(pointValue || 0),
      maxPremium: Number(maxPremium || 0),
    };
    // 소득·재산·자동차·최저보험료가 모두 비어 있으면 낼 답이 없다
    if (input.annualIncome <= 0 && input.assetPoints <= 0 && input.carPoints <= 0 && input.minPremium <= 0) return null;
    const r = calcLocalHealth(input);
    return ({ r, c: compareEmployee(input, r) });
  
    return null;
  })();


  return (
    <CalcShell
      path="/calculator/health-insurance-local"
      title="지역가입자 건강보험료 계산기"
      description="소득·재산·자동차에 각각 매겨 합친 월 보험료를 직장가입자와 견줍니다"
      intro={
        <>
          <h2>회사를 나오면 보험료가 두 배가 됩니다</h2>
          <p>
            직장가입자는 건강보험료의 <strong>절반만</strong> 내고 나머지 절반을 회사가 냅니다.
            지역가입자에게는 그 회사가 없습니다. 같은 소득이라면 소득에 매기는 요율 자체는 같은데,
            반을 나눠 줄 상대가 없어 <strong>전액을 혼자 부담</strong>합니다. 급여명세서에서 보던
            건강보험료가 {pct(HEALTH_RATE * EMPLOYEE_SHARE, 3)}였다면 지역가입자의 소득보험료율은
            {' '}{pct(HEALTH_RATE)}입니다. 퇴직 뒤 첫 고지서를 받고 놀라는 이유가 대개 이것입니다.
          </p>
          <h2>소득에만 매기지 않고 세 갈래로 매깁니다</h2>
          <p>
            직장가입자는 보수 하나에만 정률로 매기지만, 지역가입자는 <strong>세대를 단위로</strong>{' '}
            세 갈래에 따로 매겨 합칩니다.
          </p>
          <p>
            <strong>건강보험료 = 소득보험료 + 재산보험료 + 자동차보험료</strong><br />
            소득보험료 = 소득월액 × {pct(HEALTH_RATE)}<br />
            재산보험료 = 재산 부과점수 × 부과점수당 금액<br />
            자동차보험료 = 자동차 부과점수 × 부과점수당 금액<br />
            장기요양보험료 = 건강보험료 × {pct(LONG_CARE_RATE)}
          </p>
          <p>
            세대 단위라는 점이 중요합니다. 소득이 없는 가족도 같은 세대에 있으면 그 세대의 재산과
            자동차가 함께 잡히고, 보험료는 세대주에게 한 장으로 고지됩니다.
          </p>
          <h2>재산에 왜 보험료를 매기나요</h2>
          <p>
            지역가입자는 애초에 <strong>소득을 파악하기 어려운 사람들</strong>을 위해 만든 제도입니다.
            사업소득은 신고 뒤에야 확인되고 그 사이에도 보험료는 걷어야 하니, 눈에 보이는 재산을
            소득의 대리 지표로 삼아 온 것입니다. 그래서 소득이 한 푼도 없어도 집이 있으면 보험료가
            나옵니다. 개편의 방향은 이 재산 비중을 줄이고 소득 쪽으로 옮기는 것입니다.
          </p>
          <h2>2022년 9월 개편으로 바뀐 것</h2>
          <p>
            2단계 개편에서 세 가지가 달라졌습니다. 첫째, 소득에 <strong>등급을 매기던 방식을 버리고
            정률</strong>로 바꿔 직장가입자와 같은 요율을 쓰게 했습니다. 둘째, 재산에서 일정액을
            <strong> 일괄 공제</strong>해 줍니다. 셋째, 자동차는 <strong>일정 가액 이상</strong>만 매깁니다 —
            예전에는 소형차에도 붙었습니다. 성별·나이·재산으로 소득을 추정하던 <strong>평가소득</strong>{' '}
            점수도 1단계 개편에서 이미 없어졌습니다.
          </p>
          <h2>재산 등급표는 이 계산기가 판정하지 않습니다</h2>
          <p>
            재산보험료는 재산을 <strong>60등급으로 나눈 표</strong>에서 점수를 찾아 매깁니다. 그 표와
            부과점수당 금액, 재산공제액, 자동차 부과 요건, 최저보험료, 보험료 상한은 <strong>모두 해마다
            고시됩니다.</strong> 표를 옮겨 적어 두면 내년에 그럴듯하게 틀린 답을 답처럼 보여 주게 되므로,
            이 계산기는 <strong>등급 판정을 하지 않습니다.</strong> 대신 공제를 뺀 재산 가액을 내주니 그
            값으로 그 해 고시된 등급표에서 점수를 찾아 넣으세요. 점수는 건강보험공단 &lsquo;보험료 조회&rsquo;
            고지 내역에도 그대로 적혀 있습니다.
          </p>
          <h2>퇴직 직후라면 임의계속가입을 먼저 보세요</h2>
          <p>
            직장가입자였던 사람은 <strong>임의계속가입</strong>을 신청해 일정 기간(현재 최대 36개월) 동안
            지역 보험료 대신 <strong>직장가입자였을 때 내던 본인부담 수준</strong>으로 낼 수 있습니다.
            재산이 있어 지역 보험료가 크게 나오는 사람에게 특히 유리합니다. 다만 신청 기한이 짧습니다 —
            첫 지역 보험료 고지서의 납부기한에서 두 달이 지나기 전에 신청해야 하고, 기간과 기한은 바뀔 수
            있으니 공단에 확인하세요. 가족 중 직장가입자가 있다면 <strong>피부양자</strong>로 들어가는 쪽이
            보험료가 0이라 가장 낫지만, 소득·재산 요건을 넘으면 자격이 안 됩니다.
          </p>
          <h2>이 계산의 한계</h2>
          <p>
            고시값은 넣은 것을 그대로 씁니다 — 등급 판정, 소득 종류별 반영 비율, 세대원 합산, 연금·근로소득의
            일부만 세는 규정 등은 담지 않았습니다. 고지서는 단수 처리와 감면(농어촌·섬·장애 등)이 더 붙어
            몇십 원에서 몇만 원까지 다를 수 있습니다. 직장가입자 쪽 금액은{' '}
            <Link href="/calculator/four-insurance" className="underline">4대보험 계산기</Link>가 회사 몫까지
            자세히 내고, 월급에서 빠지는 전체 공제는{' '}
            <Link href="/calculator/salary" className="underline">연봉 실수령액 계산기</Link>에서 보세요.
            장기요양 등급을 받았을 때의 본인부담은{' '}
            <Link href="/calculator/ltc-copay" className="underline">장기요양 본인부담금 계산기</Link>가 냅니다.
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
                <Label>최저보험료 (월, 원)</Label>
                <input type="number" value={minPremium} onChange={e => setMinPremium(e.target.value)}
                  placeholder="그 해 고시값" className={inputCls} min="0" />
              </div>
              <div>
                <Label>최저보험료 연소득 기준 (원)</Label>
                <input type="number" value={incomeFloorLine} onChange={e => setIncomeFloorLine(e.target.value)}
                  placeholder="이 소득 이하면 최저보험료" className={inputCls} min="0" />
              </div>
              <div>
                <Label>부과점수당 금액 (원)</Label>
                <input type="number" value={pointValue} onChange={e => setPointValue(e.target.value)}
                  placeholder="그 해 고시값" className={inputCls} min="0" step="0.1" />
              </div>
              <div>
                <Label>재산공제액 (원)</Label>
                <input type="number" value={assetDeduction} onChange={e => setAssetDeduction(e.target.value)}
                  placeholder="개편으로 생긴 일괄 공제" className={inputCls} min="0" />
              </div>
              <div>
                <Label>보험료 상한 (월, 원)</Label>
                <input type="number" value={maxPremium} onChange={e => setMaxPremium(e.target.value)}
                  placeholder="비우면 상한 없이" className={inputCls} min="0" />
              </div>
            </div>

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">내 세대의 소득과 재산</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>세대 연소득 (원)</Label>
                <input type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)}
                  placeholder="예: 36000000" className={inputCls} min="0" />
              </div>
              <div>
                <Label>재산 가액 (원)</Label>
                <input type="number" value={assetValue} onChange={e => setAssetValue(e.target.value)}
                  placeholder="재산세 과세표준 등" className={inputCls} min="0" />
              </div>
              <div>
                <Label>재산 부과점수 (점)</Label>
                <input type="number" value={assetPoints} onChange={e => setAssetPoints(e.target.value)}
                  placeholder="고시 등급표에서 찾은 값" className={inputCls} min="0" />
              </div>
              <div>
                <Label>자동차 부과점수 (점)</Label>
                <input type="number" value={carPoints} onChange={e => setCarPoints(e.target.value)}
                  placeholder="요건에 안 걸리면 0" className={inputCls} min="0" />
              </div>
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">월 납부액 (전액 본인 부담)</p>
              <p className="stat-value">{fmt(result.r.total)}원</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                건강보험료 {fmt(result.r.health)}원 · 장기요양보험료 {fmt(result.r.longCare)}원
              </p>
            </div>

            {(result.r.atFloor || result.r.atCeiling) && (
              <Card className="p-5 border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {result.r.atFloor && (
                    <>
                      소득이 기준 이하라 소득보험료 자리에 <strong>최저보험료</strong>가 들어갔습니다.
                      최저보험료는 세대 보험료 전체의 하한이 아니라 소득보험료 자리의 하한이어서,
                      재산·자동차 보험료는 그 위에 그대로 더해집니다.
                    </>
                  )}
                  {result.r.atCeiling && (
                    <>
                      합계가 상한을 넘어 <strong>보험료 상한</strong>이 적용됐습니다. 상한 적용 전 금액은{' '}
                      {fmt(result.r.rawHealth)}원입니다.
                    </>
                  )}
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="보험료가 어떻게 나왔나" />
              <div className="divide-y divide-slate-100">
                {[
                  ['소득월액', `${fmt(result.r.incomeMonthly)}원`],
                  [`소득보험료 (${result.r.atFloor ? '최저보험료' : pct(HEALTH_RATE)})`, `${fmt(result.r.incomePremium)}원`],
                  ['재산보험료', `${fmt(result.r.assetPremium)}원`],
                  ['자동차보험료', `${fmt(result.r.carPremium)}원`],
                  ['건강보험료 합계', `${fmt(result.r.health)}원`],
                  [`장기요양보험료 (${pct(LONG_CARE_RATE)})`, `${fmt(result.r.longCare)}원`],
                  ['월 납부액', `${fmt(result.r.total)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="같은 소득의 직장가입자와 견주면" />
              <div className="divide-y divide-slate-100">
                {[
                  ['지역가입자 (나)', `${fmt(result.r.total)}원`],
                  ['직장가입자 본인부담', `${fmt(result.c.employeeTotal)}원`],
                  ['회사가 내 주는 몫', `${fmt(result.c.employerShare)}원`],
                  ['직장가입자 총 보험료', `${fmt(result.c.fullPremium)}원`],
                  ['차이', `${result.c.gap >= 0 ? '+' : '−'}${fmt(Math.abs(result.c.gap))}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  * 같은 소득을 보수로 받는 직장가입자와 견준 값입니다. 재산·자동차가 없어도 회사 몫이
                  없어 건강보험료가 두 배가 됩니다.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                재산 가액에서 공제를 뺀 금액은 <strong>{man(result.r.assetBase)}</strong>입니다. 이 계산기는
                등급을 판정하지 않으니, 이 금액으로 그 해 고시된 <strong>재산 등급표(60등급)</strong>에서
                점수를 찾아 위에 넣으세요. 공단 고지 내역에 적힌 부과점수를 그대로 넣어도 됩니다.
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 고시값은 입력한 것을 그대로 씁니다 · 등급 판정·세대원 합산·감면은 반영하지 않았습니다 ·
                실제 보험료는 국민건강보험공단 고지·조회로 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
