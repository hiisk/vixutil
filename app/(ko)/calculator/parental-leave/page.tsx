'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, SummaryCard,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { CALC_FAQ } from '@/lib/calc-faq';

/*
 * 육아휴직 급여 계산기 — 2025년 기준
 * 고용보험법 제70조 · 고용노동부 고시 2025-00호
 *
 * 부모 모두 육아휴직 사용 시 (6+6 부모육아휴직제):
 *   각각 첫 6개월 = 통상임금 100% (상한 250만원)
 *
 * 단독 사용 또는 7개월~:
 *   1~6개월  : 통상임금 80% (상한 150만원)
 *   7~12개월 : 통상임금 50% (상한 120만원)
 *   하한 : 월 70만원
 *
 * 2024.01 개정 "6+6 부모육아휴직제":
 *   첫 6개월 각자 통상임금 100%, 상한 200~300만원 (월별 증가)
 */

// 단독 육아휴직
const SOLO_PERIODS = [
  { label: '1~6개월',   months: [1,6],  rate: 0.8, cap: 1_500_000 },
  { label: '7~12개월',  months: [7,12], rate: 0.5, cap: 1_200_000 },
];

// 6+6 부모 동시 사용 (첫 번째 육아휴직자 기준)
// 1개월=250만, 2=250만, 3=300만, 4=350만, 5=350만, 6=450만 (2024년 기준 점진 인상)
// 여기서는 2024-2025 기준 상한을 적용
const BOTH_CAPS = [2_500_000, 2_500_000, 3_000_000, 3_500_000, 3_500_000, 4_500_000];

function fmt(n: number) { return n.toLocaleString('ko-KR'); }

function calcSolo(monthlyWage: number, durationMonths: number) {
  const FLOOR = 700_000;
  let total = 0;
  const rows: { label: string; monthly: number; count: number }[] = [];

  for (const p of SOLO_PERIODS) {
    const [from, to] = p.months;
    const start = Math.max(from, 1);
    const end   = Math.min(to, durationMonths);
    if (start > end) continue;
    const count = end - start + 1;
    const raw   = Math.round(monthlyWage * p.rate);
    const monthly = Math.max(FLOOR, Math.min(p.cap, raw));
    total += monthly * count;
    rows.push({ label: `${start}~${end}개월`, monthly, count });
  }
  return { total, rows };
}

function calcBoth(monthlyWage: number, durationMonths: number) {
  const FLOOR = 700_000;
  let total = 0;
  const rows: { label: string; monthly: number; count: number }[] = [];

  for (let m = 1; m <= Math.min(durationMonths, 6); m++) {
    const cap     = BOTH_CAPS[m - 1] ?? 4_500_000;
    const raw     = Math.round(monthlyWage);
    const monthly = Math.max(FLOOR, Math.min(cap, raw));
    total += monthly;
    const last = rows[rows.length - 1];
    if (last && last.monthly === monthly) {
      last.count++;
      last.label = `${rows.length > 1 ? Number(last.label.split('~')[0]) : m}~${m}개월`;
    } else {
      rows.push({ label: `${m}개월`, monthly, count: 1 });
    }
  }
  // 7개월 이후는 solo 기준
  if (durationMonths > 6) {
    const extra = calcSolo(monthlyWage, durationMonths - 6);
    for (const r of extra.rows) {
      const adjusted = { ...r, label: `${Number(r.label.split('~')[0]) + 6}~${Number(r.label.split('~')[1] ?? r.label.split('~')[0]) + 6}개월` };
      rows.push(adjusted);
      total += r.monthly * r.count;
    }
  }
  return { total, rows };
}

export default function ParentalLeavePage() {
  const [salary, setSalary] = useState(0);
  const [duration, setDuration] = useState('12');
  const [mode, setMode] = useState<'solo' | 'both'>('solo');
  const [result, setResult] = useState<null | { total: number; rows: { label: string; monthly: number; count: number }[]; monthly: number }>(null);

  function calculate() {
    const monthly = salary * 10000;
    if (!monthly || monthly <= 0) return;
    const months = Math.min(Math.max(1, Number(duration)), 12);
    const { total, rows } = mode === 'solo' ? calcSolo(monthly, months) : calcBoth(monthly, months);
    const avg = Math.round(total / months);
    setResult({ total, rows, monthly: avg });
  }

  return (
    <CalcShell
      path="/calculator/parental-leave"
      title="육아휴직 급여 계산기"
      description="고용보험 육아휴직 급여 예상 수령액 · 2025년 기준"
      faq={CALC_FAQ['parental-leave']}
      intro={
        <>
          <h2>단독으로 쓸 때</h2>
          <p>
            통상임금을 기준으로 <strong>1~6개월은 80%(상한 150만원)</strong>,{' '}
            <strong>7~12개월은 50%(상한 120만원)</strong>를 받습니다. 하한은 월 70만원입니다.
            상한에 걸리는 사람이 많아서, 통상임금이 일정 수준을 넘으면 급여가 더 늘지 않습니다.
          </p>
          <h2>부부가 함께 쓸 때 (6+6 부모육아휴직제)</h2>
          <p>
            같은 자녀에 대해 부모가 모두 육아휴직을 쓰면 <strong>첫 6개월은 각자 통상임금의 100%</strong>를
            받습니다. 상한이 월별로 올라가는 구조라 1개월차보다 6개월차 상한이 높습니다. 7개월차부터는
            단독 사용과 같은 기준으로 돌아갑니다. 부부가 동시에 쉬지 않고 순차로 써도 적용됩니다.
          </p>
          <h2>사후지급금을 감안하세요</h2>
          <p>
            육아휴직 급여의 일부는 휴직 중에 주지 않고 <strong>복직 후 6개월 이상 근무해야</strong> 지급하는
            방식이 있었습니다. 제도가 바뀌고 있어 본인에게 어떤 기준이 적용되는지는 고용센터에서 확인하는
            것이 확실합니다. 이 계산기는 총액 기준 추정치이고, 실제 매달 통장에 들어오는 금액은 이보다 적을
            수 있습니다.
          </p>
        </>
      }
    >
      <Card>
        <CardHeader title="육아휴직 정보 입력" />

        <Label>통상임금 월급 (만원)</Label>
        <div className="flex items-center gap-2">
          <CommaInput value={salary} onChange={setSalary} placeholder="350" />
          <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">만원</span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 mb-4">세전 월 통상임금 기준으로 입력하세요</p>

        <Label>육아휴직 기간</Label>
        <div className="flex gap-2 flex-wrap mb-5">
          {['3', '6', '9', '12'].map(m => (
            <button
              key={m}
              onClick={() => setDuration(m)}
              className={`flex-1 min-w-[60px] py-2.5 rounded-xl text-sm font-bold border transition-all ${
                duration === m
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-violet-300'
              }`}
            >
              {m}개월
            </button>
          ))}
        </div>

        <Label>사용 유형</Label>
        <div className="flex gap-2 mb-5">
          {[
            { value: 'solo', label: '단독 사용', sub: '부모 중 한 명만' },
            { value: 'both', label: '6+6 부모 동시', sub: '부부 모두 사용' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value as 'solo' | 'both')}
              className={`flex-1 py-3 px-2 rounded-xl text-sm border transition-all text-left ${
                mode === opt.value
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-violet-300'
              }`}
            >
              <div className="font-bold mb-0.5">{opt.label}</div>
              <div className={`text-xs ${mode === opt.value ? 'text-violet-200' : 'text-slate-400 dark:text-slate-500'}`}>{opt.sub}</div>
            </button>
          ))}
        </div>

        <PrimaryBtn onClick={calculate}>육아휴직 급여 계산하기</PrimaryBtn>
      </Card>

      {result && (
        <>
          <SummaryCard
            label="예상 총 수령액"
            value={`${fmt(result.total)}원`}
            sub={`${duration}개월 · 월 평균 ${fmt(result.monthly)}원`}
          />

          <Card>
            <CardHeader title="월별 상세 내역" />
            <div className="space-y-3">
              {result.rows.map((r) => (
                <div key={r.label} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2.5 last:border-0">
                  <span className="text-slate-500 dark:text-slate-400">{r.label} ({r.count}개월)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">월 {fmt(r.monthly)}원</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-sm pt-1 font-black">
                <span className="text-slate-700 dark:text-slate-200">합계</span>
                <span className="text-violet-700 dark:text-violet-300">{fmt(result.total)}원</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="급여 기준표" />
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="text-left py-2 px-2 font-bold text-slate-500 dark:text-slate-400">구간</th>
                    <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400">지급율</th>
                    <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400">상한</th>
                    <th className="text-right py-2 px-2 font-bold text-slate-500 dark:text-slate-400">하한</th>
                  </tr>
                </thead>
                <tbody>
                  {mode === 'solo' ? (
                    <>
                      <tr className="border-b border-slate-50">
                        <td className="py-2 px-2 text-slate-700 dark:text-slate-200">1~6개월</td>
                        <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">80%</td>
                        <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">150만원</td>
                        <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">70만원</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="py-2 px-2 text-slate-700 dark:text-slate-200">7~12개월</td>
                        <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">50%</td>
                        <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">120만원</td>
                        <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">70만원</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {[
                        ['1~2개월', '통상임금 100%', '250만원'],
                        ['3개월',   '통상임금 100%', '300만원'],
                        ['4~5개월', '통상임금 100%', '350만원'],
                        ['6개월',   '통상임금 100%', '450만원'],
                        ['7~12개월','(단독 기준 적용)', '—'],
                      ].map(([period, rate, cap]) => (
                        <tr key={period} className="border-b border-slate-50">
                          <td className="py-2 px-2 text-slate-700 dark:text-slate-200">{period}</td>
                          <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">{rate}</td>
                          <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">{cap}</td>
                          <td className="text-right py-2 px-2 text-slate-600 dark:text-slate-300">70만원</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">6+6 부모육아휴직제는 부부가 각각 첫 6개월 육아휴직 사용 시 적용됩니다.</p>
          </Card>

          <Card>
            <CardHeader title="수급 요건 안내" />
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {[
                '육아휴직 시작일 이전 피보험단위기간 180일 이상',
                '만 8세 이하 또는 초등학교 2학년 이하의 자녀',
                '육아휴직 기간 중 취업 불가 (다른 사업장 근무 금지)',
                '육아휴직 급여의 75%는 매월, 25%는 복직 후 6개월 후 일괄 지급',
                '신청은 육아휴직 시작일 이전 또는 시작 후 1개월 이내',
              ].map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-violet-500 font-bold shrink-0">·</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              ※ 본 계산기는 참고용이며 실제 수급액은 사업장 규모와 고용센터 심사에 따라 달라질 수 있습니다.
            </p>
          </Card>
        </>
      )}
    </CalcShell>
  );
}
