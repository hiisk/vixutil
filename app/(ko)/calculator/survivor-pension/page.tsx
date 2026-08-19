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
  OVERLAP_BONUS, SURVIVOR_RATES, calcSurvivor, ownPensionBreakEven, survivorRate,
} from '@/lib/survivor-pension';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function SurvivorPensionPage() {
  const [avgIncome, setAvgIncome] = useState('3000000');
  const [myIncome, setMyIncome] = useState('3000000');
  const [years, setYears] = useState('15');
  const [extraMonths, setExtraMonths] = useState('0');
  const [family, setFamily] = useState('0');
  const [ownPension, setOwnPension] = useState('0');
  const [result, setResult] = useState<null | {
    r: ReturnType<typeof calcSurvivor>;
    months: number;
    line: number;
  }>(null);

  function calculate() {
    const months = Number(years || 0) * 12 + Number(extraMonths || 0);
    const input = {
      avgIncome: Number(avgIncome),
      myIncome: Number(myIncome),
      months,
      year: 2026,
      shiftYears: 0,
      familyAnnual: Number(family || 0) * 12,
      ownPension: Number(ownPension || 0),
    };
    if (input.avgIncome <= 0 || input.myIncome <= 0 || months <= 0) return;
    const r = calcSurvivor(input);
    setResult({ r, months, line: ownPensionBreakEven(r.survivorMonthly) });
  }

  return (
    <CalcShell
      path="/calculator/survivor-pension"
      title="유족연금 계산기"
      description="가입기간별 지급률과 중복급여 조정을 반영한 유족연금"
      intro={
        <>
          <h2>가입기간이 지급률을 정합니다</h2>
          <p>
            유족연금은 숨진 가입자의 <strong>기본연금액</strong>에 가입기간에 따른 지급률을 곱한 금액입니다.
          </p>
          <p>
            <strong>10년 미만 40% · 10년 이상 20년 미만 50% · 20년 이상 60%</strong>
          </p>
          <p>
            여기에 부양가족연금액을 더합니다. 기본연금액을 내는 식은 노령연금과 같습니다.
          </p>
          <h2>노령연금과 달리 10년을 못 채워도 나옵니다</h2>
          <p>
            본인의 노령연금은 가입기간 10년을 못 채우면 아예 없지만, <strong>유족연금은 40%가
            나옵니다.</strong> 두 규칙을 헷갈리기 쉬운 자리입니다.
          </p>
          <h2>둘을 다 받을 수는 없습니다</h2>
          <p>
            남은 배우자가 이미 제 노령연금을 받고 있다면 <strong>하나만 골라야 합니다.</strong> 제 노령연금을
            고르면 유족연금의 <strong>{OVERLAP_BONUS * 100}%</strong>를 얹어 줍니다. 중복급여 조정이라고
            부르는 규정입니다.
          </p>
          <p>
            그래서 갈림길이 생깁니다. 제 노령연금이 <strong>유족연금의 {(1 - OVERLAP_BONUS) * 100}%</strong>를
            넘으면 그쪽을 고르는 편이 많습니다 — 노령연금 + 유족연금 × 0.3 이 유족연금보다 커지는 지점이기
            때문입니다. 이 계산기가 그 갈림길을 숫자로 보여 줍니다.
          </p>
          <h2>이 계산이 답하지 않는 것</h2>
          <p>
            유족의 순위와 자격(배우자, 25세 미만 자녀, 60세 이상 부모 등)은 요건이 촘촘해 여기서 판정하지
            않습니다. 이 계산은 &ldquo;받는다면 얼마&rdquo;에만 답합니다. 또 배우자에게 소득이 있으면 일정
            기간 뒤 지급이 멈추는 규정이 있는데, 그 기간과 요건은 사정마다 달라 금액으로 옮기지
            않았습니다. 실제 결정액은 국민연금공단에서 확인하세요.
          </p>
          <p>
            본인 노령연금액 자체는{' '}
            <Link href="/calculator/national-pension" className="underline">국민연금 예상 수령액 계산기</Link>,
            연금에 붙는 세금은{' '}
            <Link href="/calculator/pension-tax" className="underline">연금소득세 계산기</Link>에서 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>A값 · 전체 가입자 평균소득월액 (원)</Label>
              <MoneyInput value={avgIncome} onChange={setAvgIncome} placeholder="예: 3000000" />
            </div>
            <div>
              <Label>숨진 가입자의 B값 · 평균 기준소득월액 (원)</Label>
              <MoneyInput value={myIncome} onChange={setMyIncome} placeholder="예: 3000000" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>가입기간 (년)</Label>
                <input type="number" value={years} onChange={e => setYears(e.target.value)}
                  placeholder="예: 15" className={inputCls} min="0" />
              </div>
              <div>
                <Label>추가 개월</Label>
                <input type="number" value={extraMonths} onChange={e => setExtraMonths(e.target.value)}
                  className={inputCls} min="0" max="11" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>부양가족연금 월액 (원)</Label>
                <MoneyInput value={family} onChange={setFamily} />
              </div>
              <div>
                <Label>내 노령연금 월액 (원)</Label>
                <MoneyInput value={ownPension} onChange={setOwnPension} />
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">
                {result.r.choice === 'own' ? '내 노령연금을 고를 때' : '유족연금을 고를 때'} 받는 월 금액
              </p>
              <p className="stat-value">{fmt(result.r.monthly)}원</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                지급률 {(result.r.rate * 100).toFixed(0)}% · 가입 {Math.floor(result.months / 12)}년
                {' '}{result.months % 12}개월
              </p>
            </div>

            <Card>
              <CardHeader title="두 선택을 나란히" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['유족연금을 고를 때', result.r.survivorMonthly, result.r.choice === 'survivor'],
                  ['내 노령연금 + 유족연금 30%', result.r.ownPlusBonus, result.r.choice === 'own'],
                ].map(([k, v, picked]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {k as string}
                      {picked ? <span className="text-blue-600 text-xs ml-1 font-semibold">고름</span> : null}
                    </span>
                    <span className={`font-semibold ${picked ? 'text-blue-600' : ''}`}>
                      {(v as number) > 0 ? `${fmt(v as number)}원` : '해당 없음'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {Number(ownPension) > 0 && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  내 노령연금이 <strong>{fmt(result.line)}원</strong>을 넘으면 그쪽을 고르는 편이 많습니다 —
                  유족연금 {fmt(result.r.survivorMonthly)}원의 {(1 - OVERLAP_BONUS) * 100}%가 그 갈림길입니다.
                  지금은 {fmt(Number(ownPension))}원이라{' '}
                  {Number(ownPension) > result.line ? '노령연금' : '유족연금'} 쪽이 큽니다
                  (차액 {fmt(result.r.gap)}원).
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="가입기간이 지급률을 어떻게 가르나" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {SURVIVOR_RATES.slice().reverse().map(r => (
                  <div key={r.fromMonths} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {r.fromMonths === 0
                        ? '10년 미만'
                        : r.fromMonths === 120 ? '10년 이상 20년 미만' : '20년 이상'}
                    </span>
                    <span className={`font-semibold ${survivorRate(result.months) === r.rate ? 'text-blue-600' : ''}`}>
                      {r.rate * 100}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 유족의 순위·자격 요건과 배우자 소득에 따른 지급정지는 반영하지 않았습니다 ·
                실제 결정액은 국민연금공단에서 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
