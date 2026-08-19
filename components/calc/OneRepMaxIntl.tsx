'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, SummaryGrid } from '@/components/CalcShell';
import { ONE_REP_MAX } from '@/lib/calc-l10n/fitness';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { calcOneRm, plateRound, type OneRmResult } from '@/lib/one-rep-max';

/*
  강도표는 한국어판(lib/one-rep-max.ts의 RM_PERCENTS)과 같은 %·횟수를 쓰되
  «쓰임»만 언어를 탄다. 횟수는 «5~6»처럼 숫자라 번역할 것이 없다.
*/
const ROWS = [
  { pct: 100, reps: '1', use: 'use1' },
  { pct: 95, reps: '2', use: 'use2' },
  { pct: 90, reps: '3–4', use: 'use3' },
  { pct: 85, reps: '5–6', use: 'use3' },
  { pct: 80, reps: '7–8', use: 'use4' },
  { pct: 75, reps: '9–10', use: 'use5' },
  { pct: 70, reps: '11–12', use: 'use5' },
  { pct: 65, reps: '13–15', use: 'use6' },
  { pct: 60, reps: '16–20', use: 'use6' },
  { pct: 50, reps: '20+', use: 'use7' },
] as const;

/* 공식 이름은 사람 이름이라 번역하지 않는다 — 어느 언어의 문헌에서도 이대로 쓴다 */
const NAMES: Record<string, string> = { epley: 'Epley', brzycki: 'Brzycki', lombardi: 'Lombardi' };

export default function OneRepMaxIntl({ lang }: { lang: CalcLang }) {
  const c = ONE_REP_MAX[lang].ui;
  const [weight, setWeight] = useState('80');
  const [reps, setReps] = useState('5');
  const [result, setResult] = useState<OneRmResult | null>(null);

  function calculate() {
    setResult(calcOneRm(Number(weight) || 0, Math.floor(Number(reps) || 0)));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{c.weight}</Label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="0" step="0.5" className={inputCls} />
          </div>
          <div>
            <Label>{c.reps}</Label>
            <input type="number" value={reps} onChange={e => setReps(e.target.value)} min="1" max="20" className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.est}</p>
            <p className="stat-value">{result.best} kg</p>
          </div>

          {result.wideRange && (
            <p className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {c.wide}
            </p>
          )}

          <SummaryGrid>
            {result.byFormula.map(f => (
              <SummaryCard key={f.id} label={NAMES[f.id] ?? f.id} value={`${f.value} kg`} />
            ))}
            <SummaryCard label={c.best} value={`${result.best} kg`} variant="primary" />
            <SummaryCard label={c.spread} value={`${result.min}–${result.max} kg`} />
          </SummaryGrid>

          <Card className="p-5">
            <p className="label-caps mb-1">{c.table}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{c.tableNote}</p>
            <div className="kv-table">
              {ROWS.map(r => (
                <div key={r.pct} className="kv-row">
                  <span>
                    {r.pct}%
                    <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">×{r.reps} · {c[r.use]}</span>
                  </span>
                  <span className="tabular-nums font-bold">{plateRound(result.best * r.pct / 100)} kg</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
