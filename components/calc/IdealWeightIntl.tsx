'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn, SummaryCard, SummaryGrid } from '@/components/CalcShell';
import { IDEAL_WEIGHT } from '@/lib/calc-l10n/fitness';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { calcIdealWeight, type IdealWeightResult, type Sex } from '@/lib/ideal-weight';

/* 사람 이름이라 번역하지 않는다 — 어느 언어의 문헌에서도 이대로 인용된다 */
const NAMES: Record<string, string> = {
  devine: 'Devine (1974)', robinson: 'Robinson (1983)',
  miller: 'Miller (1983)', hamwi: 'Hamwi (1964)',
};

export default function IdealWeightIntl({ lang }: { lang: CalcLang }) {
  const c = IDEAL_WEIGHT[lang].ui;
  const [height, setHeight] = useState('170');
  const [sex, setSex] = useState<Sex>('male');
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState<IdealWeightResult | null>(null);

  function calculate() {
    setResult(calcIdealWeight(Number(height) || 0, sex, Number(current) || undefined));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.height}</Label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} min="0" className={inputCls} />
            </div>
            <div>
              <Label>{c.sex}</Label>
              <select value={sex} onChange={e => setSex(e.target.value as Sex)} className={selectCls}>
                <option value="male">{c.male}</option>
                <option value="female">{c.female}</option>
              </select>
            </div>
          </div>
          <div>
            <Label>{c.current}</Label>
            <input type="number" value={current} onChange={e => setCurrent(e.target.value)} min="0" placeholder={c.currentHint} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.range}</p>
            <p className="stat-value">{result.healthyMin}–{result.healthyMax} kg</p>
          </div>

          {result.belowBase && (
            <p className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {c.warn}
            </p>
          )}

          <SummaryGrid>
            <SummaryCard label={c.avg} value={`${result.average} kg`} variant="primary" />
            {result.current && <SummaryCard label={c.bmi} value={String(result.current.bmi)} />}
            {result.current && (
              <SummaryCard
                label={result.current.inRange ? c.inRange : c.outRange}
                value={`${result.current.diffToAverage > 0 ? '+' : ''}${result.current.diffToAverage} kg`}
              />
            )}
          </SummaryGrid>

          <Card className="p-5">
            <p className="label-caps mb-1">{c.byFormula}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{c.byNote}</p>
            <div className="kv-table">
              {result.byFormula.map(f => (
                <div key={f.id} className="kv-row">
                  <span>{NAMES[f.id] ?? f.id}</span>
                  <span className="tabular-nums font-bold">{f.value} kg</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
