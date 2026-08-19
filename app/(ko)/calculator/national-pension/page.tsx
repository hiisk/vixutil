'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import {
  DEFER_BONUS, EARLY_PENALTY, MIN_MONTHS,
  breakEvenYears, calcPension, pensionConstant, replacementRate, shiftTable,
} from '@/lib/national-pension';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

export default function NationalPensionPage() {
  const [avgIncome, setAvgIncome] = useState('');
  const [myIncome, setMyIncome] = useState('');
  const [years, setYears] = useState('');
  const [extraMonths, setExtraMonths] = useState('0');
  const [startYear, setStartYear] = useState('2026');
  const [family, setFamily] = useState('0');
  const [result, setResult] = useState<null | {
    r: ReturnType<typeof calcPension>;
    table: ReturnType<typeof shiftTable>;
    breakEven: number | null;
    months: number;
    year: number;
  }>(null);

  function calculate() {
    const months = Number(years || 0) * 12 + Number(extraMonths || 0);
    const input = {
      avgIncome: Number(avgIncome),
      myIncome: Number(myIncome),
      months,
      year: Number(startYear),
      shiftYears: 0,
      familyAnnual: Number(family || 0) * 12,
    };
    if (input.avgIncome <= 0 || input.myIncome <= 0 || months <= 0) return;
    setResult({
      r: calcPension(input),
      table: shiftTable(input),
      breakEven: breakEvenYears(input, -5, 5),
      months,
      year: input.year,
    });
  }

  return (
    <CalcShell
      path="/calculator/national-pension"
      title="국민연금 예상 수령액 계산기"
      description="기본연금액 식으로 월 연금과 조기·연기 수령액을 계산"
      intro={
        <>
          <h2>국민연금은 낸 돈을 돌려주는 게 아닙니다</h2>
          <p>
            적립한 원금에 이자를 붙이는 방식이 아니라, <strong>법이 정한 식</strong>으로 금액이 나옵니다.
            국민연금법 제51조의 기본연금액이 그것입니다.
          </p>
          <p>
            <strong>기본연금액(연액) = 상수 × (A + B) × (1 + 0.05 × n ÷ 12)</strong>
          </p>
          <p>
            A는 연금을 받기 전 3년간 <strong>전체 가입자의 평균소득월액</strong>이고, B는 <strong>내 생애
            평균 기준소득월액</strong>입니다. n은 가입월수에서 240개월(20년)을 넘는 개월수입니다.
            그래서 내가 많이 벌었어도 전체 평균이 오르면 내 연금도 오릅니다 — 세대 안에서 나누는
            구조라 A가 식에 들어가 있습니다.
          </p>
          <h2>상수는 해마다 내려갑니다</h2>
          <p>
            소득대체율을 2008년 50%에서 2028년 40%까지 낮추도록 법에 적혀 있습니다. 상수는 2008년
            1.5에서 <strong>해마다 0.015씩</strong> 내려가 2028년에 1.2가 되고 그 뒤로는 그대로입니다.
            그래서 늦게 받기 시작하는 사람이 같은 조건이어도 조금 적게 받습니다.
          </p>
          <h2>A값과 B값은 어디서 보나요</h2>
          <p>
            둘 다 해마다 바뀌므로 이 계산기는 값을 넣어 두지 않았습니다. 국민연금공단 <strong>내
            연금 알아보기</strong>에서 내 평균 기준소득월액(B)을 확인할 수 있고, A값은 공단이 해마다
            공표합니다. 확인하지 않은 숫자를 답처럼 보여 주지 않으려고 비워 두었습니다.
          </p>
          <h2>앞당기면 깎이고 미루면 붙습니다</h2>
          <p>
            최대 5년 앞당길 수 있고 <strong>1년당 6%</strong>가 평생 깎입니다(5년이면 70%). 반대로 최대
            5년 미루면 <strong>1년당 7.2%</strong>가 붙습니다(5년이면 136%). 어느 쪽이 유리한지는 얼마나
            오래 받는지에 달렸고, 이 계산기가 두 선택의 누적액이 같아지는 시점을 함께 냅니다.
          </p>
          <h2>10년을 못 채우면 연금이 아닙니다</h2>
          <p>
            가입기간이 120개월에 못 미치면 노령연금이 아니라 <strong>반환일시금</strong> 대상입니다.
            그래서 이 계산기는 그 경우 금액을 0으로 냅니다. 퇴직금·연금저축까지 함께 볼 때는{' '}
            <Link href="/calculator/retirement" className="underline">은퇴자금 계산기</Link>와{' '}
            <Link href="/calculator/pension-credit" className="underline">연금저축·IRP 세액공제 계산기</Link>를
            같이 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>A값 · 전체 가입자 평균소득월액 (원)</Label>
              <input type="number" value={avgIncome} onChange={e => setAvgIncome(e.target.value)}
                placeholder="예: 3000000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>B값 · 내 평균 기준소득월액 (원)</Label>
              <input type="number" value={myIncome} onChange={e => setMyIncome(e.target.value)}
                placeholder="예: 3500000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>가입기간 (년)</Label>
                <input type="number" value={years} onChange={e => setYears(e.target.value)}
                  placeholder="예: 25" className={inputCls} min="0" />
              </div>
              <div>
                <Label>추가 개월</Label>
                <input type="number" value={extraMonths} onChange={e => setExtraMonths(e.target.value)}
                  className={inputCls} min="0" max="11" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>받기 시작하는 해</Label>
                <input type="number" value={startYear} onChange={e => setStartYear(e.target.value)}
                  className={inputCls} min="2008" />
              </div>
              <div>
                <Label>부양가족연금 월액 (원)</Label>
                <input type="number" value={family} onChange={e => setFamily(e.target.value)}
                  className={inputCls} min="0" />
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">
                {result.r.eligible ? '월 예상 연금액' : '가입기간이 10년에 못 미칩니다'}
              </p>
              <p className="stat-value">
                {result.r.eligible ? man(result.r.monthly) : '반환일시금 대상'}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {result.r.eligible
                  ? `연 ${man(result.r.annual)} · 내 소득의 ${result.r.ownReplacementRate.toFixed(1)}%`
                  : `노령연금은 ${MIN_MONTHS}개월(10년) 이상 가입해야 받습니다`}
              </p>
            </div>

            <Card>
              <CardHeader title="식이 어떻게 풀렸나" />
              <div className="divide-y divide-slate-100">
                {[
                  [`${result.year}년 상수`, result.r.constant.toFixed(3)],
                  ['기본연금액 (연액)', `${fmt(result.r.basicAnnual)}원`],
                  ['가입기간 지급률', `${(result.r.rate * 100).toFixed(1)}%`],
                  ['가입기간', `${Math.floor(result.months / 12)}년 ${result.months % 12}개월`],
                  ['부양가족연금 월액', `${fmt(result.r.familyMonthly)}원`],
                  [`${result.year}년 기준 소득대체율 (40년 가입)`, `${(replacementRate(result.year) * 100).toFixed(1)}%`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            {result.r.eligible && (
              <Card>
                <CardHeader title="앞당길 때와 미룰 때" />
                <div className="divide-y divide-slate-100">
                  {result.table.map(({ shift, monthly }) => (
                    <div key={shift} className="px-5 py-3 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">
                        {shift === 0 ? '정상 수령' : shift < 0 ? `${-shift}년 앞당김` : `${shift}년 미룸`}
                        <span className="text-slate-400 text-xs ml-1">
                          {shift === 0 ? '' : shift < 0
                            ? `−${(EARLY_PENALTY * -shift * 100).toFixed(0)}%`
                            : `+${(DEFER_BONUS * shift * 100).toFixed(1)}%`}
                        </span>
                      </span>
                      <span className={`font-semibold ${shift === 0 ? 'text-blue-600' : ''}`}>
                        {fmt(monthly)}원
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {result.breakEven !== null && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  5년 앞당겨 받은 사람의 누적액을 5년 미뤄 받은 사람이 따라잡는 데는
                  정상 수령 시점으로부터 <strong>약 {result.breakEven.toFixed(1)}년</strong>이 걸립니다.
                  그보다 오래 받을 것 같으면 미루는 쪽이, 짧을 것 같으면 앞당기는 쪽이 총액에서 유리합니다.
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 국민연금법 기본연금액 식에 따른 추정치 · 상수 {pensionConstant(result.year).toFixed(3)}
                {' '}({result.year}년) · 실제 금액은 재평가율과 부양가족 요건에 따라 달라집니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
