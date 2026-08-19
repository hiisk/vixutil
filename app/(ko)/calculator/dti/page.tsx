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
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { dti, maxPrincipal, type OtherDebt } from '@/lib/dti';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

interface DebtRow { balance: string; rate: string }

export default function DtiPage() {
  const [income, setIncome] = useState('60000000');
  const [principal, setPrincipal] = useState('300000000');
  const [rate, setRate] = useState('4.5');
  const [years, setYears] = useState('30');
  const [graceYears, setGraceYears] = useState('0');
  const [limit, setLimit] = useState('40');
  const [debts, setDebts] = useState<DebtRow[]>([{ balance: '', rate: '' }]);
  const [result, setResult] = useState<null | {
    limitPercent: number;
    now: ReturnType<typeof dti>;
    max: ReturnType<typeof maxPrincipal>;
  }>(null);

  function updateDebt(i: number, field: keyof DebtRow, val: string) {
    setDebts(prev => prev.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)));
  }

  function calculate() {
    const annualIncome = Number(income);
    const limitPercent = Number(limit);
    // 소득이 0이면 비율 자체가 정의되지 않는다 — 계산 전에 막는다
    if (annualIncome <= 0 || limitPercent <= 0) return;

    const annualRate = Number(rate);
    const months = Number(years) * 12;
    const graceMonths = Number(graceYears) * 12;
    // 잔액을 안 적은 줄은 없는 것으로 본다
    const others: OtherDebt[] = debts
      .filter(d => Number(d.balance) > 0)
      .map(d => ({ balance: Number(d.balance), annualRate: Number(d.rate) || 0 }));

    setResult({
      limitPercent,
      now: dti({
        annualIncome,
        mortgage: { principal: Number(principal) || 0, annualRate, months, graceMonths },
        others,
      }),
      max: maxPrincipal({ annualIncome, limitPercent, annualRate, months, graceMonths, others }),
    });
  }

  const over = result ? result.now.dti > result.limitPercent : false;

  return (
    <CalcShell
      path="/calculator/dti"
      title="DTI 계산기"
      description="총부채상환비율 — 한도에서 빌릴 수 있는 최대 원금까지"
      intro={
        <>
          <h2>DTI가 뭔가요</h2>
          <p>
            <strong>총부채상환비율(Debt To Income)</strong>은 연소득에서 대출 상환액이 차지하는
            비율입니다. 식은 이렇습니다.
          </p>
          <p>
            <strong>DTI = (주택담보대출 연 원리금 + 기타 대출 연 이자) ÷ 연소득 × 100</strong>
          </p>
          <p>
            연봉 6,000만원인데 주담대 원리금이 연 1,800만원, 신용대출 이자가 연 300만원이면
            DTI는 35%입니다. 숫자가 낮을수록 소득에 여유가 있다는 뜻입니다.
          </p>

          <h2>DSR과 다른 점은 딱 하나입니다</h2>
          <p>
            식의 모양은 <Link href="/calculator/dsr" className="underline">DSR</Link>과 똑같고,{' '}
            <strong>기타 대출을 어떻게 세느냐</strong>만 다릅니다.
          </p>
          <p>
            <strong>DTI는 기타 대출을 이자만</strong> 세고,{' '}
            <strong>DSR은 기타 대출도 원금까지</strong> 셉니다.
          </p>
          <p>
            신용대출 5,000만원을 연 6%로 쓰고 있다면 DTI에 얹히는 것은 이자 연 300만원뿐입니다.
            같은 대출을 DSR로 세면 원금을 몇 년에 나눠 갚는지가 들어가, 5년 분할이라면 연
            1,100만원이 넘게 얹힙니다. <strong>같은 사람도 DSR이 DTI보다 훨씬 높게 나옵니다.</strong>{' '}
            DSR이 더 빡빡한 규제로 불리는 이유가 이것입니다. 주택담보대출 몫은 두 비율이 똑같이
            원리금으로 세므로, 두 값의 차이는 결국 기타 대출에서 나옵니다.
          </p>

          <h2>한도에서 최대 원금을 거꾸로 구합니다</h2>
          <p>
            DTI를 재 보는 것보다 실제로 궁금한 것은 &ldquo;그래서 얼마까지 빌릴 수 있나&rdquo;입니다.
            이 계산기는 한도(예: 40%)를 받아 <strong>그 한도에 딱 닿는 최대 원금</strong>을 역산합니다.
            먼저 <strong>연소득 × 한도</strong>로 한도가 허락하는 연 상환액을 구하고, 거기서{' '}
            <strong>기타 대출 연 이자</strong>를 뺀 몫을 원리금균등 식에 거꾸로 넣어 원금을 풉니다.
          </p>
          <p>
            기존 기타 대출의 이자가 한도를 <strong>먼저</strong> 먹는다는 점이 중요합니다. 소액 신용대출을
            정리하는 것만으로 주담대 한도가 늘어나는 이유입니다. 금리가 낮고 기간이 길수록 같은 월
            상환액에 담기는 원금이 커지지만, 그만큼 총 이자도 불어납니다 —{' '}
            <Link href="/calculator/loan-method" className="underline">상환방식 비교 계산기</Link>에서
            그 맞바꿈을 볼 수 있습니다.
          </p>

          <h2>거치기간을 두면 비율이 오릅니다</h2>
          <p>
            거치기간은 이자만 내는 기간입니다. 그동안은 가볍지만, 원금은 <strong>남은 기간에 몰아서</strong>{' '}
            갚아야 하므로 거치가 끝난 뒤가 더 무거워집니다. 30년 만기에 3년 거치라면 원금을 갚는 기간은
            27년입니다. 이 계산기는 <strong>무거운 쪽(거치 후)</strong>을 기준으로 비율을 냅니다 — 거치
            중 금액으로 재면 통과했다가 거치가 끝나고 감당이 안 되는 일이 생기기 때문입니다. 거치 중
            내는 이자도 따로 보여 드립니다.
          </p>

          <h2>이 값이 곧 대출 승인은 아닙니다</h2>
          <p>
            소득 기준 비율을 통과해도 주택담보대출은{' '}
            <Link href="/calculator/ltv" className="underline">LTV</Link>(집값 대비 한도)에 따로 걸립니다.
            실제 한도는 <strong>소득 기준과 담보 기준 중 더 낮은 쪽</strong>이고, 요즘 심사는 DTI보다
            DSR을 주로 봅니다. 규제 비율과 적용 대상은 지역·주택 수·정책에 따라 계속 바뀌어 왔으므로
            이 계산기는 한도를 <strong>직접 입력받습니다</strong> — 확인하지 않은 숫자를 답처럼 보여 주지
            않으려는 것입니다. 여기에 <strong>스트레스 금리</strong>처럼 실제 금리보다 높은 금리를 가정해
            심사하는 제도까지 겹치면 금융사 결과는 이 값보다 보수적으로 나옵니다. 소득만으로 상한을
            가늠하는 <strong>참고값</strong>으로 쓰세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>연소득 (원, 세전)</Label>
              <MoneyInput value={income} onChange={setIncome} placeholder="예: 60000000" />
            </div>
            <div>
              <Label>DTI 한도 (%) — 지역·정책에 따라 다릅니다</Label>
              <input type="number" value={limit} onChange={e => setLimit(e.target.value)}
                placeholder="예: 40" className={inputCls} min="0" step="5" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="주택담보대출" sub="원리금(원금+이자)을 모두 셉니다" />
          <div className="flex flex-col gap-3 mt-3">
            <div>
              <Label>대출 원금 (원, 아직 없으면 0)</Label>
              <MoneyInput value={principal} onChange={setPrincipal} placeholder="예: 300000000" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label>금리 (%)</Label>
                <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                  placeholder="예: 4.5" className={inputCls} min="0" step="0.1" />
              </div>
              <div>
                <Label>기간</Label>
                <select value={years} onChange={e => setYears(e.target.value)} className={inputCls}>
                  {[10, 15, 20, 25, 30, 35, 40].map(n => <option key={n} value={n}>{n}년</option>)}
                </select>
              </div>
              <div>
                <Label>거치기간</Label>
                <select value={graceYears} onChange={e => setGraceYears(e.target.value)} className={inputCls}>
                  {[0, 1, 2, 3, 5].map(n => <option key={n} value={n}>{n === 0 ? '없음' : `${n}년`}</option>)}
                </select>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="기타 대출" sub="신용대출·자동차 할부 등 — 이자만 셉니다" />
          <div className="mt-3">
            {debts.map((d, i) => (
              <div key={i} className="mb-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>남은 잔액 (원)</Label>
                    <input type="number" value={d.balance} onChange={e => updateDebt(i, 'balance', e.target.value)}
                      placeholder="없으면 비움" className={inputCls} min="0" />
                  </div>
                  <div>
                    <Label>금리 (%)</Label>
                    <input type="number" value={d.rate} onChange={e => updateDebt(i, 'rate', e.target.value)}
                      placeholder="예: 6" className={inputCls} min="0" step="0.1" />
                  </div>
                </div>
                {debts.length > 1 && (
                  <button onClick={() => setDebts(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-xs text-red-400 hover:text-red-600 mt-2">삭제</button>
                )}
              </div>
            ))}
            {debts.length < 5 && (
              <button onClick={() => setDebts(prev => [...prev, { balance: '', rate: '' }])}
                className="text-sm text-blue-600 font-semibold hover:underline mb-4 block">
                + 대출 추가
              </button>
            )}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-lg p-5 ${over ? 'bg-rose-500' : 'bg-blue-600'}`}>
              <p className="text-white/70 text-xs mb-1">현재 DTI</p>
              <p className="text-white text-3xl font-bold">{result.now.dti.toFixed(1)}%</p>
              <p className="text-white/70 text-sm mt-1">
                한도 {result.limitPercent}% · {over ? '한도 초과 ✕' : '한도 이하 ✓'}
              </p>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all ${over ? 'bg-rose-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (result.now.dti / result.limitPercent) * 100)}%` }}
              />
            </div>

            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-5">
              <p className="text-slate-400 text-xs mb-1">DTI {result.limitPercent}%에서 빌릴 수 있는 최대 원금</p>
              <p className="text-white text-3xl font-bold">{man(result.max.principal)}</p>
              <p className="text-slate-400 text-xs mt-1">
                {result.max.principal > 0
                  ? `월 상환액 ${fmt(result.max.monthly)}원 · ${years}년${Number(graceYears) > 0 ? ` (거치 ${graceYears}년)` : ''}`
                  : '기타 대출 이자가 한도를 다 먹어 남는 몫이 없습니다'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <SummaryCard label="한도 허용 연 상환액" value={`${fmt(result.max.allowedAnnual)}원`}
                sub={`연소득 × ${result.limitPercent}%`} />
              <SummaryCard label="주담대에 쓸 수 있는 몫"
                value={`${fmt(Math.max(0, result.max.forMortgageAnnual))}원`}
                sub="기타 대출 이자를 뺀 금액"
                variant={result.max.forMortgageAnnual > 0 ? 'green' : 'red'} />
            </div>

            <Card>
              <CardHeader title="연 상환 부담" sub="주담대는 원리금, 기타 대출은 이자만" />
              <div className="divide-y divide-slate-100">
                {[
                  ['주담대 연 원리금', result.now.mortgageAnnual],
                  ['기타 대출 연 이자', result.now.otherAnnual],
                  ['합계 (연)', result.now.totalAnnual],
                  ['합계 (월 환산)', result.now.totalMonthly],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
              </div>
            </Card>

            {Number(graceYears) > 0 && (
              <Card>
                <CardHeader title="거치기간이 있으면" sub={`원금은 ${result.now.burden.repayMonths}개월에 나눠 갚습니다`} />
                <div className="divide-y divide-slate-100">
                  {[
                    ['거치 중 월 이자', result.now.burden.monthlyDuringGrace],
                    ['거치 후 월 원리금', result.now.burden.monthlyAfterGrace],
                    ['늘어나는 월 부담', result.now.burden.monthlyAfterGrace - result.now.burden.monthlyDuringGrace],
                  ].map(([k, v]) => (
                    <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">{k}</span>
                      <span className="font-semibold">{fmt(v as number)}원</span>
                    </div>
                  ))}
                </div>
                <p className="px-5 py-3 text-xs text-slate-400 dark:text-slate-500">
                  * 위 DTI는 무거운 쪽인 거치 후 상환액으로 셌습니다
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 기타 대출을 이자만 세는 DTI 기준 · 원금까지 세는{' '}
                <Link href="/calculator/dsr" className="underline">DSR</Link>과 담보 기준{' '}
                <Link href="/calculator/ltv" className="underline">LTV</Link>를 함께 보세요 ·
                규제 비율은 정책에 따라 바뀌며 실제 심사 결과는 더 보수적일 수 있습니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
