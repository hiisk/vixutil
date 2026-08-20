'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn, SummaryCard, SummaryGrid } from '@/components/CalcShell';
import { CHILD_HEIGHT } from '@/lib/calc-l10n/child';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { calcChildHeight, type ChildHeightResult, type ChildSex } from '@/lib/child-height';

export default function ChildHeightIntl({ lang }: { lang: CalcLang }) {
  const c = CHILD_HEIGHT[lang].ui;
  const [father, setFather] = useState('175');
  const [mother, setMother] = useState('162');
  const [sex, setSex] = useState<ChildSex>('boy');
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState<ChildHeightResult | null>(null);

  function calculate() {
    setResult(calcChildHeight(Number(father) || 0, Number(mother) || 0, sex, Number(current) || undefined));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.father}</Label>
              <input type="number" value={father} onChange={e => setFather(e.target.value)} min="0" className={inputCls} />
            </div>
            <div>
              <Label>{c.mother}</Label>
              <input type="number" value={mother} onChange={e => setMother(e.target.value)} min="0" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.sex}</Label>
              <select value={sex} onChange={e => setSex(e.target.value as ChildSex)} className={selectCls}>
                <option value="boy">{c.boy}</option>
                <option value="girl">{c.girl}</option>
              </select>
            </div>
            <div>
              <Label>{c.current}</Label>
              <input type="number" value={current} onChange={e => setCurrent(e.target.value)} min="0" className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <SummaryGrid>
            <SummaryCard label={c.mid} value={`${result.mid} cm`} variant="primary" />
            <SummaryCard label={c.likely} value={`${result.likelyMin}–${result.likelyMax} cm`} />
            <SummaryCard label={c.wide} value={`${result.wideMin}–${result.wideMax} cm`} />
            <SummaryCard label={c.avg} value={`${result.parentAvg} cm`} />
            {result.current && (
              <SummaryCard
                label={c.diff}
                value={`${result.current.diff > 0 ? '+' : ''}${result.current.diff} cm`}
              />
            )}
          </SummaryGrid>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.how}</p>
            <div className="kv-table">
              <div className="kv-row">
                <span>{c.step1}</span>
                <span className="tabular-nums font-bold">({father} + {mother}) ÷ 2 = {result.parentAvg} cm</span>
              </div>
              <div className="kv-row">
                <span>{c.step2}</span>
                <span className="tabular-nums font-bold">{result.sex === 'boy' ? '+' : '−'} 6.5 cm</span>
              </div>
              <div className="kv-row">
                <span>{c.step3}</span>
                <span className="tabular-nums font-bold">{result.mid} cm</span>
              </div>
            </div>
            <p className="note mt-3">{c.note}</p>
          </Card>
        </>
      )}
    </div>
  );
}
