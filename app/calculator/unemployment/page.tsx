'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { CALC_FAQ } from '@/lib/calc-faq';

/*
 * 실업급여(구직급여) 계산기 — 2025년 기준
 * 고용보험법 제46조·제50조 기준
 *
 * 구직급여 일액 = 이직 전 평균임금 × 60%
 * 상한: 66,000원/일 (2019년~현재)
 * 하한: 최저시급(10,030원) × 80% × 8시간 = 64,192원/일
 *
 * 수급 기간(소정급여일수) — 피보험 단위기간 × 연령
 *   < 1년   : 50세 미만 120일 / 50세 이상·장애인 120일
 *   1~3년   : 150일 / 180일
 *   3~5년   : 180일 / 210일
 *   5~10년  : 210일 / 240일
 *   10년 이상: 240일 / 270일
 */

const MAX_DAILY = 66000;
const MIN_DAILY = Math.round(10030 * 0.8 * 8); // 64,192

// [피보험기간 상한(년), 50세미만 일수, 50세이상/장애인 일수]
const DURATION_TABLE: [number, number, number][] = [
  [1,  120, 120],
  [3,  150, 180],
  [5,  180, 210],
  [10, 210, 240],
  [Infinity, 240, 270],
];

function getDays(yearsInsured: number, over50: boolean): number {
  for (const [limit, young, old] of DURATION_TABLE) {
    if (yearsInsured < limit) return over50 ? old : young;
  }
  return over50 ? 270 : 240;
}

function fmt(n: number) {
  return n.toLocaleString('ko-KR');
}

export default function UnemploymentPage() {
  const [salary, setSalary] = useState(0);   // 월평균임금 (만원)
  const [insuredYears, setInsuredYears] = useState('');
  const [insuredMonths, setInsuredMonths] = useState('');
  const [over50, setOver50] = useState(false);
  const [result, setResult] = useState<null | {
    dailyWage: number; dailyBenefit: number; days: number; total: number; monthly: number;
  }>(null);

  function calculate() {
    const monthly = salary * 10000;
    if (!monthly || monthly <= 0) return;
    const years = Number(insuredYears || 0);
    const months = Number(insuredMonths || 0);
    const totalYears = years + months / 12;

    const dailyWage  = monthly / 30;
    const raw        = Math.round(dailyWage * 0.6);
    const dailyBenefit = Math.max(MIN_DAILY, Math.min(MAX_DAILY, raw));
    const days       = getDays(totalYears, over50);
    const total      = dailyBenefit * days;
    const monthlyEst = Math.round(total / (days / 30));

    setResult({ dailyWage, dailyBenefit, days, total, monthly: monthlyEst });
  }

  return (
    <CalcShell
      path="/calculator/unemployment"
      title="실업급여 계산기"
      description="고용보험 구직급여 예상 수령액 · 2025년 기준"
      faq={CALC_FAQ.unemployment}
      intro={
        <>
          <h2>계산 방식</h2>
          <p>
            구직급여 일액은 <strong>이직 전 평균임금의 60%</strong>입니다. 다만 상한과 하한이 있어서
            대부분의 사람은 이 좁은 구간 안에 들어옵니다. 상한은 <strong>1일 66,000원</strong>,
            하한은 최저시급의 80%에 8시간을 곱한 <strong>1일 64,192원</strong>입니다.
            상한과 하한 차이가 크지 않아, 임금이 높든 낮든 실제 수령액은 비슷해지는 구조입니다.
          </p>
          <h2>며칠 동안 받나요</h2>
          <p>
            소정급여일수는 <strong>고용보험 가입기간과 나이</strong>로 정해집니다. 가입기간 1년 미만이면
            120일, 10년 이상이면 50세 미만 240일·50세 이상 270일까지 늘어납니다. 50세 이상이거나
            장애인이면 같은 가입기간에서 더 길게 받습니다.
          </p>
          <h2>계산 결과가 곧 수급 자격은 아닙니다</h2>
          <p>
            이 계산기는 금액만 추정합니다. 실제로 받으려면 <strong>이직 사유가 비자발적</strong>이어야 하고,
            이직 전 18개월 동안 피보험 단위기간이 180일 이상이어야 합니다. 자발적 퇴사는 원칙적으로 대상이
            아니지만 예외 사유가 인정되는 경우가 있습니다. 수급 자격 판단은 고용센터가 하므로 최종 확인은
            그쪽에서 받아야 합니다.
          </p>
        </>
      }
    >
      <Card>
        <CardHeader title="수급 조건 입력" />

        <Label>이직 전 월 평균임금 (만원)</Label>
        <div className="flex items-center gap-2">
          <CommaInput value={salary} onChange={setSalary} placeholder="350" />
          <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">만원</span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 mb-4">세전 월급 기준으로 입력하세요</p>

        <Label>고용보험 가입기간</Label>
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="number" min={0}
                value={insuredYears}
                onChange={e => setInsuredYears(e.target.value)}
                placeholder="0"
                className={inputCls}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-500 pointer-events-none">년</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="number" min={0} max={11}
                value={insuredMonths}
                onChange={e => setInsuredMonths(e.target.value)}
                placeholder="0"
                className={inputCls}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-500 pointer-events-none">개월</span>
            </div>
          </div>
        </div>

        <Label>나이 / 장애인 여부</Label>
        <div className="flex gap-2 mb-5">
          {[
            { label: '50세 미만', value: false },
            { label: '50세 이상 또는 장애인', value: true },
          ].map(opt => (
            <button
              key={String(opt.value)}
              onClick={() => setOver50(opt.value)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                over50 === opt.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <PrimaryBtn onClick={calculate}>실업급여 계산하기</PrimaryBtn>
      </Card>

      {result && (
        <>
          <SummaryCard
            label="예상 총 수령액"
            value={`${fmt(result.total)}원`}
            sub={`수급 기간 ${result.days}일 · 월 약 ${fmt(result.monthly)}원`}
          />

          <Card>
            <CardHeader title="상세 계산 내역" />
            <div className="space-y-3">
              {[
                ['일 평균임금',    `${fmt(Math.round(result.dailyWage))}원`],
                ['구직급여 일액',  `${fmt(result.dailyBenefit)}원 (평균임금 × 60%)`],
                ['상한/하한 적용', `상한 ${fmt(MAX_DAILY)}원 · 하한 ${fmt(MIN_DAILY)}원`],
                ['소정급여일수',   `${result.days}일`],
                ['예상 총 수령액', `${fmt(result.total)}원`],
                ['월 평균 수령',   `약 ${fmt(result.monthly)}원`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-start gap-4 text-sm border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">{label}</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-right">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="소정급여일수 기준표" />
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="text-left py-2 px-2 font-bold text-slate-500 dark:text-slate-400">피보험 단위기간</th>
                    <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400">50세 미만</th>
                    <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400">50세 이상·장애인</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['1년 미만', 120, 120],
                    ['1년 이상 ~ 3년 미만', 150, 180],
                    ['3년 이상 ~ 5년 미만', 180, 210],
                    ['5년 이상 ~ 10년 미만', 210, 240],
                    ['10년 이상', 240, 270],
                  ].map(([period, young, old]) => {
                    const isActive = result.days === (over50 ? old : young);
                    return (
                      <tr
                        key={String(period)}
                        className={`border-b border-slate-50 ${isActive ? 'bg-blue-50 dark:bg-blue-950/30 font-bold' : ''}`}
                      >
                        <td className="py-2 px-2 text-slate-700 dark:text-slate-200">{period}{isActive ? ' ✓' : ''}</td>
                        <td className={`text-right py-2 px-2 ${isActive && !over50 ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'}`}>{young}일</td>
                        <td className={`text-right py-2 px-2 ${isActive && over50 ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'}`}>{old}일</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHeader title="수급 요건 안내" />
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {[
                '이직일 이전 18개월 중 피보험단위기간 180일 이상',
                '비자발적 이직 (권고사직, 계약만료, 회사 폐업 등)',
                '근로 의사와 능력이 있음에도 취업하지 못한 상태',
                '재취업 활동(구직활동)을 적극적으로 할 것',
                '신청은 이직 다음 날부터 12개월 이내에 해야 합니다',
              ].map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-500 font-bold shrink-0">·</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              ※ 본 계산기는 참고용이며 실제 수급액은 고용센터 심사에 따라 달라질 수 있습니다.
            </p>
          </Card>
        </>
      )}
    </CalcShell>
  );
}
