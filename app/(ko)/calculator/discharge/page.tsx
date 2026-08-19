'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { BRANCHES, RANKS, dischargeDate, serviceProgress, rankDates } from '@/lib/discharge';

const fmt = (d: Date) => d.toISOString().split('T')[0];
const todayStr = () => new Date().toISOString().split('T')[0];

export default function DischargePage() {
  const [enlist, setEnlist] = useState(todayStr());
  const [branch, setBranch] = useState('army');
  const [result, setResult] = useState<null | {
    discharge: Date; months: number;
    total: number; done: number; left: number; percent: number;
    ranks: { rank: string; date: Date }[];
  }>(null);

  function calculate() {
    const start = new Date(`${enlist}T00:00:00Z`);
    if (Number.isNaN(start.getTime())) return;
    const months = BRANCHES.find(b => b.key === branch)!.months;
    const discharge = dischargeDate(start, months);
    const p = serviceProgress(start, discharge, new Date());
    setResult({ discharge, months, ...p, ranks: rankDates(start, months) });
  }

  return (
    <CalcShell
      path="/calculator/discharge"
      title="전역일 계산기"
      description="입대일과 군별로 전역일·남은 날짜·진급일 계산"
      intro={
        <>
          <h2>전역일은 입대일 더하기 복무기간에서 하루를 뺍니다</h2>
          <p>
            <strong>입대한 날이 복무 첫날</strong>이기 때문입니다. 2024년 1월 2일에 입대한 육군이라면
            18개월 뒤인 2025년 7월 2일이 아니라 <strong>하루 앞인 7월 1일</strong>이 전역일입니다.
            하루를 안 빼면 모든 계산이 하루씩 밀립니다.
          </p>
          <h2>복무기간은 군별로 다릅니다</h2>
          <p>
            육군·해병대 18개월, 해군 20개월, 공군 21개월, 사회복무요원 21개월입니다. 같은 날 입대해도
            군별로 석 달까지 차이가 납니다.
          </p>
          <h2>진급은 이등병 2개월, 일병 6개월, 상병 6개월입니다</h2>
          <p>
            정기진급 기간이 정해져 있어 군별로 같습니다. 그러므로 <strong>복무기간이 긴 군일수록 병장으로
            지내는 기간이 깁니다</strong> — 육군은 병장 4개월, 공군은 7개월입니다. 실제 진급일은 부대
            사정에 따라 며칠 다를 수 있습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>입대일</Label>
              <input type="date" value={enlist} onChange={e => setEnlist(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>군별</Label>
              <select value={branch} onChange={e => setBranch(e.target.value)} className={inputCls}>
                {BRANCHES.map(b => (
                  <option key={b.key} value={b.key}>{b.label} ({b.months}개월)</option>
                ))}
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">전역일</p>
              <p className="stat-value">{fmt(result.discharge)}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {result.left > 0
                  ? `${result.left.toLocaleString()}일 남음 · ${result.percent}% 진행`
                  : '전역했습니다'}
              </p>
            </div>
            <Card>
              <CardHeader title="복무 현황" />
              <div className="divide-y divide-slate-100">
                {[
                  ['복무기간', `${result.months}개월 (${result.total.toLocaleString()}일)`],
                  ['지난 날', `${result.done.toLocaleString()}일`],
                  ['남은 날', `${Math.max(0, result.left).toLocaleString()}일`],
                  ['진행률', `${result.percent}%`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <CardHeader title="진급 예정일" />
              <div className="divide-y divide-slate-100">
                {result.ranks.map(r => (
                  <div key={r.rank} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.rank}</span>
                    <span className="font-semibold">{fmt(r.date)}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * {RANKS.map(r => `${r.name} ${r.months}개월`).join(' · ')} 기준 · 실제 진급일은 부대에 따라 다를 수 있습니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
