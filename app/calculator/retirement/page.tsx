'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, TableWrap, ShowMoreBtn } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

function fmtKRW(n: number): string {
  if (n >= 1e8) return `${(n / 1e8).toFixed(2)}억원`;
  if (n >= 1e4) return `${(n / 1e4).toFixed(0)}만원`;
  return `${Math.round(n).toLocaleString('ko-KR')}원`;
}

function fmtWon(n: number): string {
  return Math.round(n).toLocaleString('ko-KR') + '원';
}

interface YearRow {
  age: number;
  year: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
}

export default function RetirementPage() {
  const [currentAge, setCurrentAge] = useState('35');
  const [retireAge, setRetireAge] = useState('60');
  const [currentSavings, setCurrentSavings] = useState(50_000_000);
  const [monthlyContrib, setMonthlyContrib] = useState(500_000);
  const [annualReturn, setAnnualReturn] = useState('5');

  const [result, setResult] = useState<{
    totalAsset: number;
    monthly20: number; monthly25: number; monthly30: number;
    rows: YearRow[];
  } | null>(null);
  const [showing, setShowing] = useState(10);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const ca = parseInt(currentAge);
    const ra = parseInt(retireAge);
    const cs = currentSavings;
    const mc = monthlyContrib;
    const ar = parseFloat(annualReturn) / 100;

    if (!ca || !ra || ra <= ca) { setError('나이를 올바르게 입력해주세요 (은퇴 나이 > 현재 나이).'); return; }
    if (ar < 0) { setError('수익률은 0% 이상이어야 합니다.'); return; }

    const years = ra - ca;
    const monthlyRate = ar / 12;
    const rows: YearRow[] = [];

    let balance = cs;
    for (let y = 0; y < years; y++) {
      const startBalance = balance;
      const annualContrib = mc * 12;
      let endBalance = balance;

      if (ar === 0) {
        endBalance = balance + annualContrib;
      } else {
        // 복리: 현재 잔액 × (1+r) + 월 적립 × ((1+r/12)^12 - 1) / (r/12)
        endBalance = balance * (1 + ar) + mc * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate);
      }

      const interest = endBalance - startBalance - annualContrib;
      rows.push({
        age: ca + y + 1,
        year: new Date().getFullYear() + y,
        startBalance,
        contribution: annualContrib,
        interest,
        endBalance,
      });
      balance = endBalance;
    }

    const totalAsset = balance;

    // 은퇴 후 정액 인출 (월): PV × r / (1 - (1+r)^-n)
    function monthlyWithdraw(pv: number, yearCount: number): number {
      if (ar === 0) return pv / (yearCount * 12);
      const n = yearCount * 12;
      return (pv * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    }

    setResult({
      totalAsset,
      monthly20: monthlyWithdraw(totalAsset, 20),
      monthly25: monthlyWithdraw(totalAsset, 25),
      monthly30: monthlyWithdraw(totalAsset, 30),
      rows,
    });
    setShowing(10);
  }

  return (
    <CalcShell
      path="/calculator/retirement"
      title="은퇴자금 계산기"
      description="복리 성장 시뮬레이션 · 은퇴 후 월 인출 가능액 계산"
      intro={
        <>
          <h2>두 단계로 계산합니다</h2>
          <p>
            먼저 은퇴 시점까지 <strong>지금 모은 돈과 매달 적립액이 복리로 얼마까지 불어나는지</strong>를
            구하고, 그 다음 그 금액을 <strong>은퇴 후 기간 동안 매달 얼마씩 꺼내 쓸 수 있는지</strong>로
            바꿉니다. 인출액은 남은 잔액에도 계속 수익률이 붙는다고 보고 계산합니다.
          </p>
          <h2>일찍 시작하는 것이 많이 넣는 것보다 강합니다</h2>
          <p>
            복리는 시간이 길수록 가팔라집니다. 적립 기간을 몇 년만 늘려도 결과가 크게 달라지는데, 월
            적립액을 같은 비율로 올리는 것보다 효과가 큰 경우가 많습니다. 시작 나이를 바꿔가며 계산해
            보면 그 차이가 눈에 보입니다.
          </p>
          <h2>수익률은 매년 일정하지 않습니다</h2>
          <p>
            이 계산기는 입력한 수익률이 <strong>매년 똑같이 나온다고 가정</strong>합니다. 실제 투자는
            오르내림이 있고, 특히 은퇴 직전이나 인출 초기에 큰 손실이 나면 같은 평균 수익률이어도 결과가
            훨씬 나빠집니다. 그러니 결과를 확정된 미래가 아니라{' '}
            <strong>가정을 바꿔가며 비교하는 도구</strong>로 쓰는 것이 맞습니다. 수익률을 보수적으로
            낮춰서도 한번 돌려보세요.
          </p>
          <h2>물가와 세금은 빠져 있습니다</h2>
          <p>
            30년 뒤의 1억은 지금의 1억이 아닙니다. 결과는 <strong>명목 금액</strong>이므로 실질 가치가
            궁금하다면 <strong>물가상승률 계산기</strong>를 함께 쓰세요. 투자 수익에 붙는 세금과
            국민연금·퇴직연금 수령액도 반영되지 않았습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">입력 정보</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>현재 나이</Label>
                <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} placeholder="35" className={inputCls} />
              </div>
              <div>
                <Label>은퇴 목표 나이</Label>
                <input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} placeholder="60" className={inputCls} />
              </div>
            </div>
            <div>
              <Label>현재 저축액 (원)</Label>
              <CommaInput value={currentSavings} onChange={setCurrentSavings} placeholder="예: 50,000,000" />
            </div>
            <div>
              <Label>월 저축액 (원)</Label>
              <CommaInput value={monthlyContrib} onChange={setMonthlyContrib} placeholder="예: 500,000" />
            </div>
            <div>
              <Label>예상 연 수익률 (%)</Label>
              <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} placeholder="5" step="0.1" className={inputCls} />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            {/* 은퇴 자산 */}
            <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 p-5">
              <p className="text-xs text-blue-400 mb-1">은퇴 시 예상 자산</p>
              <p className="text-4xl font-black text-blue-700 dark:text-blue-300">{fmtKRW(result.totalAsset)}</p>
              <p className="text-sm text-blue-500 mt-1">{fmtWon(result.totalAsset)}</p>
            </div>

            {/* 월 인출 가능액 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">은퇴 후 월 인출 가능액 (자산 소진 기준)</p>
              <div className="flex flex-col gap-2">
                {[
                  { years: 20, monthly: result.monthly20 },
                  { years: 25, monthly: result.monthly25 },
                  { years: 30, monthly: result.monthly30 },
                ].map(r => (
                  <div key={r.years} className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 rounded-xl px-4 py-3">
                    <span className="text-sm text-slate-600 dark:text-slate-300 font-semibold">{r.years}년간 인출</span>
                    <div className="text-right">
                      <span className="text-base font-black text-blue-700 dark:text-blue-300">{fmtKRW(r.monthly)}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 block">/월</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">* 동일 수익률 지속 가정, 세금·물가 미반영</p>
            </Card>

            {/* 연도별 성장 테이블 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">연도별 자산 성장</p>
              <TableWrap>
                <table className="w-full text-xs text-right">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500">
                      <th className="py-2 text-left font-semibold">나이</th>
                      <th className="py-2 font-semibold">연도</th>
                      <th className="py-2 font-semibold">연간 저축</th>
                      <th className="py-2 font-semibold">이자/수익</th>
                      <th className="py-2 font-semibold">누적 자산</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.slice(0, showing).map(r => (
                      <tr key={r.year} className="border-b border-slate-50">
                        <td className="py-2 text-left text-slate-700 dark:text-slate-200 font-semibold">{r.age}세</td>
                        <td className="py-2 text-slate-500 dark:text-slate-400">{r.year}</td>
                        <td className="py-2 text-slate-600 dark:text-slate-300">{fmtKRW(r.contribution)}</td>
                        <td className="py-2 text-emerald-600 font-semibold">{fmtKRW(r.interest)}</td>
                        <td className="py-2 text-blue-700 dark:text-blue-300 font-black">{fmtKRW(r.endBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              <ShowMoreBtn total={result.rows.length} showing={showing} onClick={() => setShowing(result.rows.length)} />
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
