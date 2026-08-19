'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { FUEL_EFFICIENCY } from '@/lib/calc-l10n/car';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Units = 'metric' | 'us';

const KM_PER_MILE = 1.609344;
const L_PER_US_GAL = 3.785411784;
const L_PER_UK_GAL = 4.54609;

export default function FuelEfficiencyIntl({ lang }: { lang: CalcLang }) {
  const c = FUEL_EFFICIENCY[lang].ui;
  const tag = localeTag(lang);
  const [units, setUnits] = useState<Units>('metric');
  const [distance, setDistance] = useState('');
  const [fuel, setFuel] = useState('');
  const [remaining, setRemaining] = useState('');
  const [result, setResult] = useState<{ kmPerL: number; range?: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 2 });

  function calculate() {
    const d = parseFloat(distance);
    const f = parseFloat(fuel);
    if (!(d > 0) || !(f > 0)) return;
    // 무엇을 입력했든 km/L 하나로 모아 두고, 표시할 때 네 단위로 편다.
    const km = units === 'metric' ? d : d * KM_PER_MILE;
    const litres = units === 'metric' ? f : f * L_PER_US_GAL;
    const kmPerL = km / litres;

    const rem = parseFloat(remaining);
    const remLitres = units === 'metric' ? rem : rem * L_PER_US_GAL;
    setResult({ kmPerL, range: rem > 0 ? kmPerL * remLitres : undefined });
  }

  const distanceUnit = units === 'metric' ? 'km' : 'mi';
  const volumeUnit = units === 'metric' ? 'L' : 'gal';

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'metric' as Units, label: c.metric },
          { value: 'us' as Units, label: c.us },
        ]}
        value={units}
        onChange={u => { setUnits(u); setResult(null); }}
      />

      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-5">
          <div>
            <Label>{c.distance} ({distanceUnit})</Label>
            <input type="number" value={distance} onChange={e => setDistance(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.fuel} ({volumeUnit})</Label>
            <input type="number" step="0.01" value={fuel} onChange={e => setFuel(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.remaining} ({volumeUnit})</Label>
            <input type="number" step="0.01" value={remaining} onChange={e => setRemaining(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.result}</p>
            <p className="stat-value">{fmt(result.kmPerL)} km/L</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
            <SummaryCard label="L/100 km" value={fmt(100 / result.kmPerL)} />
            <SummaryCard label={c.mpgUs} value={fmt((result.kmPerL * L_PER_US_GAL) / KM_PER_MILE)} />
            <SummaryCard label={c.mpgUk} value={fmt((result.kmPerL * L_PER_UK_GAL) / KM_PER_MILE)} />
          </div>
          {result.range !== undefined && (
            <SummaryCard
              label={c.rangeResult}
              value={units === 'metric'
                ? `${fmt(result.range)} km`
                : `${fmt(result.range / KM_PER_MILE)} mi`}
              variant="green"
            />
          )}
        </>
      )}
    </div>
  );
}
