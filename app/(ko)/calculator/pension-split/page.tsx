'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import {
  DEFAULT_SPLIT_RATIO, MIN_MARRIAGE_MONTHS, calcSplit, splitTable,
} from '@/lib/pension-split';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

export default function PensionSplitPage() {
  const [avgIncome, setAvgIncome] = useState('');
  const [myIncome, setMyIncome] = useState('');
  const [years, setYears] = useState('');
  const [extraMonths, setExtraMonths] = useState('0');
  const [marriageYears, setMarriageYears] = useState('');
  const [marriageExtra, setMarriageExtra] = useState('0');
  const [startYear, setStartYear] = useState('2026');
  const [ratio, setRatio] = useState(String(DEFAULT_SPLIT_RATIO * 100));
  const [family, setFamily] = useState('0');
  const [result, setResult] = useState<null | {
    r: ReturnType<typeof calcSplit>;
    table: ReturnType<typeof splitTable>;
    months: number;
  }>(null);

  function calculate() {
    const months = Number(years || 0) * 12 + Number(extraMonths || 0);
    const marriageMonths = Number(marriageYears || 0) * 12 + Number(marriageExtra || 0);
    const input = {
      avgIncome: Number(avgIncome),
      myIncome: Number(myIncome),
      months,
      year: Number(startYear),
      shiftYears: 0,
      familyAnnual: Number(family || 0) * 12,
      marriageMonths,
      splitRatio: Number(ratio || 0) / 100,
    };
    if (input.avgIncome <= 0 || input.myIncome <= 0 || months <= 0) return;
    setResult({ r: calcSplit(input), table: splitTable(input), months });
  }

  return (
    <CalcShell
      path="/calculator/pension-split"
      title="국민연금 분할연금 계산기"
      description="이혼할 때 나누는 배우자 국민연금 분할액"
      intro={
        <>
          <h2>연금 전체를 반으로 가르는 게 아닙니다</h2>
          <p>
            분할연금은 <strong>혼인기간에 해당하는 몫</strong>만 나눕니다. 가입기간 30년 중 혼인기간이
            10년이었다면 나눌 수 있는 것은 연금의 3분의 1이고, 그 3분의 1을 다시 절반으로 갈라
            한 사람 몫이 <strong>6분의 1</strong>이 됩니다.
          </p>
          <p>
            <strong>나눌 몫 = 노령연금액 × (혼인 중 가입월수 ÷ 총 가입월수)</strong><br />
            <strong>분할연금 = 나눌 몫 × 분할 비율(기본 절반)</strong>
          </p>
          <p>
            &ldquo;절반을 받는다&rdquo;고 듣고 계산해 보면 생각보다 적은 이유가 여기 있습니다.
            절반은 <em>나눌 몫</em>의 절반이지 연금 전체의 절반이 아닙니다.
          </p>
          <h2>혼인기간만 세는 까닭</h2>
          <p>
            분할연금은 혼인 중에 한쪽이 소득 활동을 하고 다른 쪽이 가사를 맡았다면 그 연금도
            <strong> 함께 쌓은 재산</strong>으로 본다는 취지입니다. 그래서 결혼 전이나 이혼 뒤에 쌓인
            가입기간은 나누지 않습니다. 넣어야 하는 값은 혼인기간 전체가 아니라{' '}
            <strong>혼인기간과 국민연금 가입기간이 겹치는 개월수</strong>입니다 — 혼인 중에
            소득이 없어 가입하지 않은 기간은 세지 않습니다.
          </p>
          <h2>나눠 준 쪽은 그만큼 줄어듭니다</h2>
          <p>
            분할연금은 없던 돈이 새로 생기는 것이 아니라 <strong>하나를 둘로 가르는 것</strong>입니다.
            받는 쪽이 늘어난 만큼 나눠 준 쪽의 연금이 줄고, 두 사람 몫을 합치면 원래 노령연금액과
            같습니다. 이 계산기가 두 사람 몫을 나란히 내는 이유입니다.
          </p>
          <p>
            다만 <strong>부양가족연금액은 나누지 않습니다.</strong> 가입기간이나 소득으로 쌓인 몫이
            아니라 부양할 가족이 있을 때 정액으로 붙는 돈이라, 혼인기간에 비례한 몫이 아니기
            때문입니다. 그래서 이 계산기는 노령연금 본체만 가르고 부양가족연금은 나눠 준 쪽에
            그대로 남겨 둡니다.
          </p>
          <h2>분할 비율은 늘 절반이 아닙니다</h2>
          <p>
            법이 정한 기본은 <strong>절반</strong>이지만, 당사자 협의나 재판으로 정한 비율이 있으면
            그 비율을 따릅니다. 그래서 이 계산기는 비율을 고정하지 않고 입력으로 받습니다.
            비율을 바꿔 두 사람 몫이 어떻게 움직이는지도 아래 표에서 함께 봅니다.
          </p>
          <h2>요건: 언제 받을 수 있나</h2>
          <p>
            금액과 별개로 받을 수 있는 조건이 따로 있습니다. <strong>혼인기간(가입기간 중의
            혼인기간)이 5년 이상</strong>이어야 하고, 이혼이 성립해야 하며,{' '}
            <strong>양쪽이 모두 수급연령에 이르러야</strong> 합니다. 이혼했더라도 전 배우자가
            연금을 받기 시작하기 전에는 받을 수 없습니다. 청구에는 기한도 있습니다.
          </p>
          <h2>이 계산기의 한계</h2>
          <p>
            요건은 사정마다 달라 이 계산기가 판정하지 않습니다 — <strong>&ldquo;받는다면
            얼마&rdquo;에만 답합니다.</strong> 노령연금액 자체는{' '}
            <Link href="/calculator/national-pension" className="underline">국민연금 예상 수령액 계산기</Link>와
            같은 국민연금법 기본연금액 식으로 내며, A값과 내 평균 기준소득월액(B값)은 해마다
            바뀌므로 값을 넣어 두지 않았습니다. 실제 금액은 국민연금공단에서 확인하세요.
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
              <Label>B값 · 나눠 주는 쪽의 평균 기준소득월액 (원)</Label>
              <input type="number" value={myIncome} onChange={e => setMyIncome(e.target.value)}
                placeholder="예: 3500000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>총 가입기간 (년)</Label>
                <input type="number" value={years} onChange={e => setYears(e.target.value)}
                  placeholder="예: 30" className={inputCls} min="0" />
              </div>
              <div>
                <Label>추가 개월</Label>
                <input type="number" value={extraMonths} onChange={e => setExtraMonths(e.target.value)}
                  className={inputCls} min="0" max="11" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>혼인 중 가입기간 (년)</Label>
                <input type="number" value={marriageYears} onChange={e => setMarriageYears(e.target.value)}
                  placeholder="예: 10" className={inputCls} min="0" />
              </div>
              <div>
                <Label>추가 개월</Label>
                <input type="number" value={marriageExtra} onChange={e => setMarriageExtra(e.target.value)}
                  className={inputCls} min="0" max="11" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>분할 비율 (%)</Label>
                <input type="number" value={ratio} onChange={e => setRatio(e.target.value)}
                  className={inputCls} min="0" max="100" step="1" />
              </div>
              <div>
                <Label>받기 시작하는 해</Label>
                <input type="number" value={startYear} onChange={e => setStartYear(e.target.value)}
                  className={inputCls} min="2008" />
              </div>
            </div>
            <div>
              <Label>부양가족연금 월액 (원, 나누지 않음)</Label>
              <input type="number" value={family} onChange={e => setFamily(e.target.value)}
                className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">받는 쪽의 분할연금 월액</p>
              <p className="stat-value">{man(result.r.spouseMonthly)}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                원래 노령연금의 {result.r.sharePercent.toFixed(1)}% · 혼인기간 몫{' '}
                {(result.r.marriageShare * 100).toFixed(1)}%의 {(result.r.ratio * 100).toFixed(0)}%
              </p>
            </div>

            <Card>
              <CardHeader title="식이 어떻게 풀렸나" />
              <div className="divide-y divide-slate-100">
                {[
                  ['나누기 전 노령연금 월액', `${fmt(result.r.baseMonthly)}원`],
                  ['총 가입기간', `${Math.floor(result.months / 12)}년 ${result.months % 12}개월`],
                  ['혼인 중 가입기간', `${Math.floor(result.r.countedMarriageMonths / 12)}년 ${result.r.countedMarriageMonths % 12}개월`],
                  ['혼인기간 비율', `${(result.r.marriageShare * 100).toFixed(1)}%`],
                  ['나눌 수 있는 몫', `${fmt(result.r.divisibleMonthly)}원`],
                  ['분할 비율', `${(result.r.ratio * 100).toFixed(0)}%`],
                  ['부양가족연금 월액 (분할 대상 아님)', `${fmt(result.r.familyMonthly)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="두 사람이 각각 받는 금액" sub="합치면 원래 연금" />
              <div className="divide-y divide-slate-100">
                {[
                  ['받는 쪽 (분할연금)', result.r.spouseMonthly],
                  ['나눠 준 쪽에 남는 노령연금', result.r.ownBeforeFamily],
                  ['나눠 준 쪽이 실제로 받는 금액', result.r.ownMonthly],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
                <div className="px-5 py-3 flex justify-between text-sm bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">두 사람 몫의 합</span>
                  <span className="font-semibold text-blue-600">
                    {fmt(result.r.spouseMonthly + result.r.ownMonthly)}원
                  </span>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  나눠 준 쪽은 월 {fmt(result.r.reduction)}원이 줄어듭니다. 분할연금은 새로 생기는 돈이
                  아니라 하나를 둘로 가르는 것이라, 두 사람 몫의 합은 원래 받던 금액과 같습니다.
                </p>
              </div>
            </Card>

            <Card>
              <CardHeader title="분할 비율을 달리 정하면" sub="협의·재판으로 달라질 수 있음" />
              <div className="divide-y divide-slate-100">
                {result.table.map(row => (
                  <div key={row.ratio} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {(row.ratio * 100).toFixed(0)}%
                      {row.ratio === DEFAULT_SPLIT_RATIO && (
                        <span className="text-slate-400 text-xs ml-1">법정 기본</span>
                      )}
                    </span>
                    <span className={`font-semibold ${row.ratio === DEFAULT_SPLIT_RATIO ? 'text-blue-600' : ''}`}>
                      {fmt(row.spouseMonthly)}원 <span className="text-slate-400 font-normal">/ {fmt(row.ownMonthly)}원</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  받는 쪽 / 나눠 준 쪽 순서입니다. 법이 정한 기본은 절반이고 나머지 비율은
                  금액이 어떻게 움직이는지 견주기 위한 눈금일 뿐입니다.
                </p>
              </div>
            </Card>

            {!result.r.marriageMonthsMeetsMinimum && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  혼인 중 가입기간이 <strong>{MIN_MARRIAGE_MONTHS}개월(5년)에 못 미칩니다.</strong>{' '}
                  분할연금은 가입기간 중의 혼인기간이 5년 이상이어야 청구할 수 있으므로, 위 금액은
                  &ldquo;요건을 채웠다면 얼마인가&rdquo;로만 보세요.
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 국민연금법 기본연금액 식에 따른 추정치 · 혼인기간 5년 이상, 이혼 성립, 양쪽 모두
                수급연령 도달이라는 요건은 이 계산기가 판정하지 않습니다 · 실제 금액과 수급 가능
                여부는 국민연금공단에서 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
