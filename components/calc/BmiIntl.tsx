'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, SummaryGrid } from '@/components/CalcShell';
import { BMI } from '@/lib/calc-l10n/global';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { calcBmi, type BmiResult } from '@/lib/global-calc';

export default function BmiIntl({ lang }: { lang: CalcLang }) {
  const c = BMI[lang].ui;
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('65');
  const [result, setResult] = useState<BmiResult | null>(null);

  function calculate() {
    setResult(calcBmi(Number(height) || 0, Number(weight) || 0));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{c.height}</Label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} min="0" className={inputCls} />
          </div>
          <div>
            <Label>{c.weight}</Label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="0" step="0.1" className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.your}</p>
            <p className="stat-value">{result.bmi}</p>
          </div>

          {/*
            같은 값을 두 기준으로 나란히 읽는다. 하나만 내면 어느 쪽이든 절반의
            사용자에게 틀린 판정이 나간다 — 유럽에서는 27이 과체중이고 한국에서는
            비만이다. 두 칸을 나란히 두면 그 차이가 그대로 보인다.
          */}
          <SummaryGrid>
            <SummaryCard label={c.who} value={c[result.whoId]} variant="primary" />
            <SummaryCard label={c.asia} value={c[result.asiaId]} />
            <SummaryCard label={c.range} value={`${result.healthyMin}–${result.healthyMax} kg`} />
            <SummaryCard
              label={c.toHealthy}
              value={result.toHealthy > 0 ? `${result.toHealthy} kg` : c.within}
            />
          </SummaryGrid>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{c.note}</p>
        </>
      )}
    </div>
  );
}
