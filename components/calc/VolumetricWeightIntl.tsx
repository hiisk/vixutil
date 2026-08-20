'use client';
import { useState } from 'react';
import { Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls } from '@/components/CalcShell';
import { maxVolumeFor, volumetricWeight } from '@/lib/volumetric';
import { VOLUMETRIC_WEIGHT } from '@/lib/calc-l10n/sizes';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function VolumetricWeightIntl({ lang }: { lang: CalcLang }) {
  const c = VOLUMETRIC_WEIGHT[lang].ui;
  const tag = localeTag(lang);
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [height, setHeight] = useState('');
  const [actual, setActual] = useState('');
  const [divisor, setDivisor] = useState('5000');
  const [result, setResult] = useState<null | (ReturnType<typeof volumetricWeight> & { limit: number })>(null);

  const fmt = (n: number, d = 2) => n.toLocaleString(tag, { maximumFractionDigits: d });

  function calculate() {
    const box = {
      width: Number(width), depth: Number(depth),
      height: Number(height), actual: Number(actual),
    };
    if (box.width <= 0 || box.depth <= 0 || box.height <= 0 || box.actual <= 0) return;
    const d = Number(divisor);
    setResult({ ...volumetricWeight(box, d), limit: maxVolumeFor(box.actual, d) });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <Label>{c.length}</Label>
              <input type="number" value={width} onChange={e => setWidth(e.target.value)}
                placeholder="40" className={inputCls} min="0" />
            </div>
            <div>
              <Label>{c.width}</Label>
              <input type="number" value={depth} onChange={e => setDepth(e.target.value)}
                placeholder="30" className={inputCls} min="0" />
            </div>
            <div>
              <Label>{c.height}</Label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)}
                placeholder="20" className={inputCls} min="0" />
            </div>
          </div>
          <div>
            <Label>{c.actual}</Label>
            <input type="number" value={actual} onChange={e => setActual(e.target.value)}
              placeholder="3" className={inputCls} min="0" step="0.1" />
          </div>
          <div>
            <Label>{c.divisor}</Label>
            <select value={divisor} onChange={e => setDivisor(e.target.value)} className={selectCls}>
              <option value="5000">{c.div5000}</option>
              <option value="6000">{c.div6000}</option>
            </select>
          </div>
          <PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn>
        </div>
      </Card>

      {result && (
        <>
          <div className="stat-pri">
            <p className="stat-label">{c.billable}</p>
            <p className="stat-value">{fmt(result.billable)} kg</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              {result.byVolume ? c.byVolume : c.byActual}
            </p>
          </div>
          <Card>
            <CardHeader title={c.details} />
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                [c.volume, `${fmt(result.volume, 0)} cm³`],
                [c.volumetric, `${fmt(result.volumetric)} kg`],
                [c.girth, `${fmt(result.girth, 0)} cm`],
              ].map(([k, v]) => (
                <div key={k} className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </Card>
          {result.byVolume && (
            <Card className="p-4">
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                {c.limitLabel}: {fmt(result.limit, 0)} cm³
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{c.limitHint}</p>
            </Card>
          )}
          <Card className="p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
          </Card>
        </>
      )}
    </div>
  );
}
