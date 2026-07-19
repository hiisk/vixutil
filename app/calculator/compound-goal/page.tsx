'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, TabBar, TableWrap, ShowMoreBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CompoundGoalPage() {
  const [mode, setMode] = useState<'period' | 'monthly'>('period');
  const [principal, setPrincipal] = useState('');
  const [goal, setGoal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [targetYears, setTargetYears] = useState('10');
  const [showing, setShowing] = useState(10);
  const [result, setResult] = useState<null | {
    years?: number; months?: number; monthlyPmt?: number;
    rows: { year: number; amount: number }[];
  }>(null);

  function calculate() {
    const p = Number(principal);
    const g = Number(goal);
    const r = Number(annualRate) / 100;
    if (p <= 0 || g <= 0 || r <= 0 || g <= p) return;

    setShowing(10);
    if (mode === 'period') {
      const years = Math.log(g / p) / Math.log(1 + r);
      const rows = Array.from({ length: Math.ceil(years) + 1 }, (_, i) => ({
        year: i,
        amount: Math.round(p * Math.pow(1 + r, i)),
      }));
      setResult({ years, rows });
    } else {
      const n = Number(targetYears) * 12;
      const mr = r / 12;
      const futureP = p * Math.pow(1 + mr, n);
      const remain = g - futureP;
      const monthlyPmt = remain > 0
        ? remain * mr / (Math.pow(1 + mr, n) - 1)
        : 0;
      const rows = Array.from({ length: Number(targetYears) + 1 }, (_, i) => {
        const months = i * 12;
        const amount = Math.round(p * Math.pow(1 + mr, months) + (monthlyPmt > 0 ? monthlyPmt * (Math.pow(1 + mr, months) - 1) / mr : 0));
        return { year: i, amount };
      });
      setResult({ monthlyPmt, rows });
    }
  }

  return (
    <CalcShell
      path="/calculator/compound-goal"
      title="복리 목표 계산기"
      description="목표 금액까지 필요한 기간 또는 월 투자액 계산"
      intro={
        <>
          <h2>거꾸로 계산합니다</h2>
          <p>
            복리 계산기가 &ldquo;이만큼 넣으면 얼마가 되나&rdquo;를 본다면, 이 계산기는{' '}
            <strong>목표 금액에서 출발</strong>합니다. 1억을 모으려면 매달 얼마를 넣어야 하는지,
            혹은 지금 넣는 금액으로는 몇 년이 걸리는지를 구합니다.
          </p>
          <h2>기간을 늘리는 게 가장 쉽습니다</h2>
          <p>
            목표 달성을 앞당기는 방법은 셋입니다. <strong>더 넣거나, 더 오래 두거나, 수익률을
            높이거나.</strong> 이 중 수익률은 마음대로 되지 않고 올리려면 위험도 같이 커집니다.
            숫자를 바꿔가며 돌려보면 <strong>기간을 몇 년 늘리는 것</strong>이 월 납입액을 크게
            올리는 것만큼 효과가 있다는 게 보입니다.
          </p>
          <h2>가정이 결과를 좌우합니다</h2>
          <p>
            입력한 수익률이 <strong>매년 똑같이 나온다는 전제</strong>입니다. 실제 투자는 오르내림이
            있고 세금과 물가도 빠져 있습니다. 수익률을 보수적으로 낮춰서도 계산해 보고, 결과를 확정된
            계획이 아니라 <strong>가정을 비교하는 기준</strong>으로 쓰세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'period', label: '목표까지 기간' },
            { value: 'monthly', label: '월 투자액 계산' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'period' | 'monthly'); setResult(null); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>현재 자산 (원금)</Label>
              <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)}
                placeholder="예: 10,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>목표 금액 (원)</Label>
              <input type="number" value={goal} onChange={e => setGoal(e.target.value)}
                placeholder="예: 100,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>연 기대 수익률 (%)</Label>
              <input type="number" value={annualRate} onChange={e => setAnnualRate(e.target.value)}
                placeholder="예: 7" className={inputCls} min="0" step="0.5" />
            </div>
            {mode === 'monthly' && (
              <div>
                <Label>목표 기간 (년)</Label>
                <select value={targetYears} onChange={e => setTargetYears(e.target.value)} className={inputCls}>
                  {[3,5,7,10,15,20,25,30].map(n => (
                    <option key={n} value={n}>{n}년</option>
                  ))}
                </select>
              </div>
            )}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              {mode === 'period' && result.years !== undefined ? (
                <>
                  <p className="text-blue-200 text-xs mb-1">목표 달성까지</p>
                  <p className="text-white text-3xl font-black">
                    {Math.floor(result.years)}년 {Math.round((result.years % 1) * 12)}개월
                  </p>
                </>
              ) : (
                <>
                  <p className="text-blue-200 text-xs mb-1">필요 월 투자액</p>
                  <p className="text-white text-3xl font-black">{fmt(result.monthlyPmt ?? 0)}원</p>
                  <p className="text-blue-200 text-sm mt-1">{targetYears}년 후 목표 {fmt(Number(goal))}원 달성</p>
                </>
              )}
            </div>
            <Card>
              <CardHeader title="연도별 자산 성장" />
              <TableWrap>
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-950">
                    <tr>
                      <th className="px-5 py-2.5 text-left text-xs font-bold text-slate-500 dark:text-slate-400">연도</th>
                      <th className="px-5 py-2.5 text-right text-xs font-bold text-slate-500 dark:text-slate-400">예상 자산</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.rows.slice(0, showing).map(row => (
                      <tr key={row.year} className={row.amount >= Number(goal) ? 'bg-blue-50 dark:bg-blue-950/30' : ''}>
                        <td className="px-5 py-2.5 text-slate-700 dark:text-slate-200">{row.year}년 후</td>
                        <td className="px-5 py-2.5 text-right font-semibold">{fmt(row.amount)}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              <div className="p-3">
                <ShowMoreBtn total={result.rows.length} showing={showing} onClick={() => setShowing(s => s + 10)} />
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
