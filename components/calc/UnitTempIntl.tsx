'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import { UNIT_TEMP } from '@/lib/calc-l10n/unit-temp';
import type { CalcLang } from '@/lib/calc-l10n/types';

type TempUnit = 'C' | 'F' | 'K' | 'R';

function toCelsius(val: number, unit: TempUnit): number {
  switch (unit) {
    case 'C': return val;
    case 'F': return (val - 32) * 5 / 9;
    case 'K': return val - 273.15;
    case 'R': return (val - 491.67) * 5 / 9;
  }
}

function fromCelsius(c: number, unit: TempUnit): number {
  switch (unit) {
    case 'C': return c;
    case 'F': return c * 9 / 5 + 32;
    case 'K': return c + 273.15;
    case 'R': return (c + 273.15) * 9 / 5;
  }
}

const UNIT_LABELS: Record<TempUnit, string> = { C: '°C', F: '°F', K: 'K', R: '°R' };

/**
 * 구간 경계는 섭씨로 여기 둔다 — 문구만 언어별이다.
 * 경계까지 언어마다 두면 한 곳만 어긋나도 그 언어에서만 다른 등급이 나온다.
 */
const BANDS: { max: number; key: string; color: string }[] = [
  { max: -30, key: 'd0', color: 'text-indigo-700 dark:text-indigo-300' },
  { max: -10, key: 'd1', color: 'text-blue-700 dark:text-blue-300' },
  { max: 0, key: 'd2', color: 'text-blue-600' },
  { max: 10, key: 'd3', color: 'text-sky-600' },
  { max: 20, key: 'd4', color: 'text-emerald-600' },
  { max: 27, key: 'd5', color: 'text-green-600' },
  { max: 36, key: 'd6', color: 'text-amber-600' },
  { max: 37.5, key: 'd7', color: 'text-orange-500' },
  { max: 40, key: 'd8', color: 'text-orange-600' },
  { max: 100, key: 'd9', color: 'text-red-600' },
  { max: Infinity, key: 'd10', color: 'text-red-800 dark:text-red-300' },
];

const LANDMARKS: { c: number; key: string }[] = [
  { c: -273.15, key: 'm0' },
  { c: -40, key: 'm1' },
  { c: 0, key: 'm2' },
  { c: 20, key: 'm3' },
  { c: 36.5, key: 'm4' },
  { c: 100, key: 'm5' },
];

export default function UnitTempIntl({ lang }: { lang: CalcLang }) {
  const c = UNIT_TEMP[lang].ui;
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<TempUnit>('C');
  const [result, setResult] = useState<{ C: number; F: number; K: number; R: number } | null>(null);

  function calculate() {
    const n = parseFloat(value);
    if (isNaN(n)) return;
    const cel = toCelsius(n, unit);
    setResult({ C: cel, F: fromCelsius(cel, 'F'), K: fromCelsius(cel, 'K'), R: fromCelsius(cel, 'R') });
  }

  const band = result ? BANDS.find(b => result.C < b.max) ?? BANDS[BANDS.length - 1] : null;

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.input}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.value}</Label>
            <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="36.5" className={inputCls} />
          </div>
          <div>
            <Label>{c.unit}</Label>
            <select value={unit} onChange={e => setUnit(e.target.value as TempUnit)} className={selectCls}>
              {(Object.keys(UNIT_LABELS) as TempUnit[]).map(k => <option key={k} value={k}>{UNIT_LABELS[k]}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <PrimaryBtn onClick={calculate}>{c.convert}</PrimaryBtn>
        </div>
      </Card>

      {result && (
        <>
          {band && (
            <div className="rounded-2xl border px-5 py-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{c.feel}</p>
              <p className={`text-base font-bold ${band.color}`}>{c[band.key]}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{result.C.toFixed(2)} °C</p>
            </div>
          )}

          <Card className="p-5">
            <p className="label-caps mb-3">{c.result}</p>
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {(Object.keys(UNIT_LABELS) as TempUnit[]).map(k => (
                <div key={k} className={`flex justify-between items-center py-3.5 ${k === unit ? 'font-bold' : ''}`}>
                  <span className={`text-sm ${k === unit ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                    {UNIT_LABELS[k]}
                    {k === unit && <span className="ml-1 text-xs text-blue-400">{c.entered}</span>}
                  </span>
                  <span className={`text-base font-mono ${k === unit ? 'text-blue-700 dark:text-blue-300 font-black' : 'text-slate-900 dark:text-slate-100 font-semibold'}`}>
                    {result[k].toFixed(4)} {UNIT_LABELS[k]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.landmarks}</p>
            <div className="flex flex-col gap-2">
              {LANDMARKS.map(lm => (
                <div key={lm.key} className="flex justify-between items-center gap-3 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{c[lm.key]}</span>
                  <span className="text-slate-800 dark:text-slate-100 font-mono font-semibold shrink-0">
                    {lm.c} °C / {fromCelsius(lm.c, 'F').toFixed(1)} °F / {fromCelsius(lm.c, 'K').toFixed(2)} K
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
