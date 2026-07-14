'use client';
import { useState } from 'react';
import CalcShell, { Card } from '@/components/CalcShell';

function getHomelessScore(years: number): number {
  if (years === 0) return 2;
  return Math.min(32, 2 + years * 2);
}

function getDependentScore(count: number): number {
  return Math.min(35, 5 + count * 5);
}

function getSavingsScore(years: number): number {
  if (years < 0.5) return 1;
  if (years < 1) return 2;
  return Math.min(17, 2 + Math.floor(years));
}

export default function SubscriptionScorePage() {
  const [homelessYears, setHomelessYears] = useState('0');
  const [dependents, setDependents] = useState('0');
  const [savingsYears, setSavingsYears] = useState('0');

  const hScore = getHomelessScore(Number(homelessYears));
  const dScore = getDependentScore(Number(dependents));
  const sScore = getSavingsScore(Number(savingsYears));
  const total = hScore + dScore + sScore;

  const grade =
    total >= 60 ? { label: '경쟁력 높음', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' } :
    total >= 50 ? { label: '보통', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' } :
                  { label: '경쟁력 낮음', color: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-950' };

  return (
    <CalcShell title="청약 가점 계산기" description="무주택기간 · 부양가족 · 청약통장 가입기간 기준">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-5">
            <ScoreItem
              label="무주택기간"
              max={32}
              score={hScore}
              note={`${homelessYears}년 이상 무주택`}
            >
              <select value={homelessYears} onChange={e => setHomelessYears(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="0">미혼 / 무주택 1년 미만 (2점)</option>
                {Array.from({ length: 15 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}년 이상 ({2 + n * 2}점)</option>
                ))}
                <option value="15">15년 이상 (32점)</option>
              </select>
            </ScoreItem>

            <ScoreItem
              label="부양가족 수"
              max={35}
              score={dScore}
              note={`${dependents}명 (본인 제외)`}
            >
              <select value={dependents} onChange={e => setDependents(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {[0,1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}명 ({5 + n * 5}점)</option>
                ))}
                <option value="6">6명 이상 (35점)</option>
              </select>
            </ScoreItem>

            <ScoreItem
              label="청약통장 가입기간"
              max={17}
              score={sScore}
              note={`${savingsYears}년`}
            >
              <select value={savingsYears} onChange={e => setSavingsYears(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="0">6개월 미만 (1점)</option>
                <option value="0.5">6개월 이상 (2점)</option>
                {Array.from({ length: 15 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}년 이상 ({Math.min(17, 2 + n)}점)</option>
                ))}
              </select>
            </ScoreItem>
          </div>
        </Card>

        <div className="bg-blue-600 rounded-2xl p-6 text-center">
          <p className="text-blue-200 text-sm mb-2">총 가점</p>
          <p className="text-white text-6xl font-black">{total}</p>
          <p className="text-blue-200 text-base mt-1">/ 84점</p>
        </div>

        <div className={`rounded-2xl p-4 text-center ${grade.bg}`}>
          <p className={`font-bold text-lg ${grade.color}`}>{grade.label}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {total >= 60 ? '인기 단지 1순위 당첨 가능성 높음' :
             total >= 50 ? '지역·단지에 따라 당첨 가능' :
             '가점제 당첨 어려움 — 추첨제 노리기'}
          </p>
        </div>
      </div>
    </CalcShell>
  );
}

function ScoreItem({ label, max, score, note, children }: {
  label: string; max: number; score: number; note: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
          {/* note는 지금까지 prop으로 받기만 하고 그리지 않아 화면에 나오지 않았다 */}
          {note && <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{note}</p>}
        </div>
        <span className="text-blue-600 font-black text-sm shrink-0">{score}<span className="text-slate-300 dark:text-slate-600 font-normal">/{max}점</span></span>
      </div>
      {children}
      <div className="mt-1.5 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(score / max) * 100}%` }} />
      </div>
    </div>
  );
}
