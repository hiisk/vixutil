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
  CONTRIBUTION_RATE, MAX_CATCHUP_MONTHS,
  calcCatchup, catchupTable, monthsToUnlock,
} from '@/lib/pension-catchup';
import { MIN_MONTHS } from '@/lib/national-pension';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;
const yearsOf = (months: number) => `${Math.floor(months / 12)}년 ${Math.round(months % 12)}개월`;

const STEPS = [12, 24, 36, 60, 84, 119];

export default function PensionCatchupPage() {
  const [avgIncome, setAvgIncome] = useState('3000000');
  const [myIncome, setMyIncome] = useState('2800000');
  const [years, setYears] = useState('9');
  const [extraMonths, setExtraMonths] = useState('0');
  const [addMonths, setAddMonths] = useState('12');
  const [contributionBase, setContributionBase] = useState('1000000');
  const [isCatchup, setIsCatchup] = useState(true);

  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: null | {
    r: ReturnType<typeof calcCatchup>;
    table: ReturnType<typeof catchupTable>;
    toUnlock: number;
  } = ((): null | {
    r: ReturnType<typeof calcCatchup>;
    table: ReturnType<typeof catchupTable>;
    toUnlock: number;
  } => {
    const months = Number(years || 0) * 12 + Number(extraMonths || 0);
    const input = {
      avgIncome: Number(avgIncome),
      myIncome: Number(myIncome),
      months,
      year: 2026,
      shiftYears: 0,
      familyAnnual: 0,
      addMonths: Number(addMonths),
      contributionBase: Number(contributionBase),
      isCatchup,
    };
    if (input.avgIncome <= 0 || input.myIncome <= 0 || input.contributionBase <= 0) return null;
    if (input.addMonths <= 0) return null;
    return ({
      r: calcCatchup(input),
      table: catchupTable(input, STEPS),
      toUnlock: monthsToUnlock(months),
    });
  
    return null;
  })();


  return (
    <CalcShell
      path="/calculator/pension-catchup"
      title="국민연금 추납·임의가입 계산기"
      description="넣은 보험료를 몇 년에 회수하는지 계산"
      intro={
        <>
          <h2>넣은 돈을 몇 년에 회수하나</h2>
          <p>
            가입기간이 늘면 연금이 얼마 오르는지는 법이 정한 식이 정해 줍니다. 이 계산기는 거기에
            <strong> 낸 보험료</strong>를 맞대어, 늘어난 연금으로 원금을 되찾는 데 몇 년이 걸리는지
            봅니다. 연금은 죽을 때까지 나오므로, 그 해를 넘겨 살면 그 뒤는 전부 이득입니다.
          </p>
          <h2>보험료는 기준소득월액의 9%입니다</h2>
          <p>
            직장에 다닐 때는 회사와 반씩 나눠 냈지만, 추납과 임의가입은 <strong>본인이 전액</strong>{' '}
            냅니다. 기준소득월액을 300만원으로 잡으면 한 달 27만원입니다.
          </p>
          <h2>10년을 갓 넘기는 추납이 가장 큽니다</h2>
          <p>
            가입기간이 <strong>{MIN_MONTHS}개월(10년)</strong>에 한 달이라도 못 미치면 연금이 아예 없고
            반환일시금만 받습니다. 그래서 9년 11개월인 사람이 한 달을 채우는 것은 &ldquo;연금이 조금
            오르는&rdquo; 일이 아니라 <strong>없던 연금이 생기는</strong> 일입니다. 이 계산기가 그 계단을
            그대로 보여 줍니다.
          </p>
          <h2>추납은 119개월까지입니다</h2>
          <p>
            과거에 못 낸 기간을 소급해 채우는 추납은 <strong>{MAX_CATCHUP_MONTHS}개월</strong>을 넘길 수
            없습니다. 앞으로의 기간을 채우는 임의가입에는 그 한도가 없습니다. 둘 다 늘어나는 가입월수의
            효과는 같습니다.
          </p>
          <h2>보험료를 높게 잡아도 연금은 그만큼 안 늘어납니다</h2>
          <p>
            흔한 오해입니다. 추납 보험료를 높이면 <strong>그 기간의 기준소득월액</strong>이 오르는
            것이고, 연금액을 정하는 것은 <strong>생애 평균</strong> 기준소득월액입니다. 몇 달을 높게
            낸다고 생애 평균이 크게 움직이지는 않으므로, 이 계산기는 그 경우 낸 돈만 늘어나는 것으로
            봅니다 — 회수 기간이 오히려 길어집니다.
          </p>
          <h2>이 셈이 연금 쪽에 조금 유리합니다</h2>
          <p>
            연금액은 물가에 따라 해마다 오르는데 그 몫을 세지 않았고, 반대로 낸 돈을 다른 데 넣었을
            때의 수익도 세지 않았습니다. 두 방향이 서로 상쇄되지만 완전히 같지는 않습니다.
            예상 수령액 자체는{' '}
            <Link href="/calculator/national-pension" className="underline">국민연금 예상 수령액 계산기</Link>에서
            보세요.
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
                placeholder="예: 2800000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>지금 가입기간 (년)</Label>
                <input type="number" value={years} onChange={e => setYears(e.target.value)}
                  placeholder="예: 9" className={inputCls} min="0" />
              </div>
              <div>
                <Label>추가 개월</Label>
                <input type="number" value={extraMonths} onChange={e => setExtraMonths(e.target.value)}
                  className={inputCls} min="0" max="11" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>더 넣을 개월수</Label>
                <input type="number" value={addMonths} onChange={e => setAddMonths(e.target.value)}
                  placeholder="예: 12" className={inputCls} min="1" />
              </div>
              <div>
                <Label>기준소득월액 (원)</Label>
                <input type="number" value={contributionBase} onChange={e => setContributionBase(e.target.value)}
                  placeholder="예: 1000000" className={inputCls} min="0" />
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { v: true, label: `추납 (최대 ${MAX_CATCHUP_MONTHS}개월)` },
                { v: false, label: '임의가입 (한도 없음)' },
              ].map(o => (
                <button key={String(o.v)} onClick={() => setIsCatchup(o.v)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border ${
                    isCatchup === o.v
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">
                {result.r.paybackMonths === null ? '연금이 늘지 않습니다' : '낸 돈을 되찾는 데'}
              </p>
              <p className="stat-value">
                {result.r.paybackMonths === null
                  ? '가입 10년 미달'
                  : `${(result.r.paybackMonths / 12).toFixed(1)}년`}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {result.r.paybackMonths === null
                  ? `10년을 채우려면 ${result.toUnlock}개월이 더 필요합니다`
                  : `월 연금 +${fmt(result.r.gainMonthly)}원 · 총 납부 ${man(result.r.totalPaid)}`}
              </p>
            </div>

            {result.r.unlocksPension && (
              <Card className="p-5 border-emerald-200 dark:border-emerald-800">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  이 추납으로 <strong>가입 10년을 채웁니다.</strong> 넣기 전에는 반환일시금 대상이라
                  연금이 0원이었고, 채우고 나면 매달 {fmt(result.r.afterMonthly)}원이 죽을 때까지
                  나옵니다. 추납 중에서 이득이 가장 큰 경우입니다.
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="넣기 전과 뒤" />
              <div className="divide-y divide-slate-100">
                {[
                  ['인정되는 추가 기간', yearsOf(result.r.addedMonths)],
                  ['한 달 보험료', `${fmt(result.r.monthlyContribution)}원`],
                  ['총 납부액', `${fmt(result.r.totalPaid)}원`],
                  ['넣기 전 월 연금', `${fmt(result.r.beforeMonthly)}원`],
                  ['넣은 뒤 월 연금', `${fmt(result.r.afterMonthly)}원`],
                  ['늘어나는 연 연금', `${fmt(result.r.gainAnnual)}원`],
                  ['낸 돈 1만원당 월 연금 증가', `${result.r.gainPerTenThousand.toFixed(1)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="개월수를 달리 잡으면" />
              <div className="divide-y divide-slate-100">
                {result.table.map(row => (
                  <div key={row.months} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {row.months}개월
                      <span className="text-slate-400 text-xs ml-1">{man(row.totalPaid)}</span>
                    </span>
                    <span className="font-semibold">
                      {row.paybackMonths === null
                        ? '연금 없음'
                        : `+${fmt(row.gainMonthly)}원 · ${(row.paybackMonths / 12).toFixed(1)}년`}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 보험료율 {CONTRIBUTION_RATE * 100}% · 물가에 따른 연금 인상과 납부금의 기회비용은
                세지 않았습니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
