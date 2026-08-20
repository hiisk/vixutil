'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn, SummaryCard, SummaryGrid } from '@/components/CalcShell';
import { RUNNING_PACE } from '@/lib/calc-l10n/fitness';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { calcPace, fmtPace, fmtTime, type PaceResult } from '@/lib/running-pace';

/* 거리 이름만 언어를 탄다 — 5km는 어디서나 5km라 값은 여기서 든다 */
const RACES = [
  { id: '5k', km: 5, key: 'c5k' },
  { id: '10k', km: 10, key: 'c10k' },
  { id: 'half', km: 21.0975, key: 'chalf' },
  { id: 'full', km: 42.195, key: 'cfull' },
] as const;

export default function RunningPaceIntl({ lang }: { lang: CalcLang }) {
  const c = RUNNING_PACE[lang].ui;
  const [race, setRace] = useState('10k');
  const [customKm, setCustomKm] = useState('7');
  const [h, setH] = useState('0');
  const [m, setM] = useState('55');
  const [s, setS] = useState('0');
  const [result, setResult] = useState<PaceResult | null>(null);

  function calculate() {
    const km = race === 'custom'
      ? Number(customKm) || 0
      : RACES.find(r => r.id === race)?.km ?? 0;
    setResult(calcPace(km, (Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0)));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.race}</Label>
            <select value={race} onChange={e => setRace(e.target.value)} className={selectCls}>
              {RACES.map(r => (
                <option key={r.id} value={r.id}>{c[r.key]} — {r.km} km</option>
              ))}
              <option value="custom">{c.custom}</option>
            </select>
          </div>
          {race === 'custom' && (
            <div>
              <Label>{c.km}</Label>
              <input type="number" value={customKm} onChange={e => setCustomKm(e.target.value)} min="0" step="0.1" className={inputCls} />
            </div>
          )}
          <div>
            <Label>{c.time}</Label>
            <div className="grid grid-cols-3 gap-2">
              <input type="number" value={h} onChange={e => setH(e.target.value)} min="0" className={inputCls} aria-label={c.h} />
              <input type="number" value={m} onChange={e => setM(e.target.value)} min="0" max="59" className={inputCls} aria-label={c.m} />
              <input type="number" value={s} onChange={e => setS(e.target.value)} min="0" max="59" className={inputCls} aria-label={c.s} />
            </div>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{c.h} · {c.m} · {c.s}</p>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.perKm}</p>
            <p className="stat-value">{fmtPace(result.paceKm)}</p>
          </div>

          <SummaryGrid>
            <SummaryCard label={c.perKm} value={fmtPace(result.paceKm)} variant="primary" />
            <SummaryCard label={c.perMile} value={fmtPace(result.paceMile)} />
            <SummaryCard label={c.speed} value={`${result.speedKmh.toFixed(1)} km/h`} />
            <SummaryCard label={c.finish} value={fmtTime(result.totalSec)} />
          </SummaryGrid>

          <Card className="p-5">
            <p className="label-caps mb-1">{c.splits}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{c.splitsNote}</p>
            <div className="kv-table">
              {result.splits.map(sp => (
                <div key={sp.at} className="kv-row">
                  <span>{sp.at % 1 === 0 ? sp.at : sp.at.toFixed(3)} km</span>
                  <span className="tabular-nums font-bold">{fmtTime(sp.sec)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="label-caps mb-1">{c.equiv}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{c.equivNote}</p>
            <div className="kv-table">
              {RACES.map(r => (
                <div key={r.id} className="kv-row">
                  <span>{c[r.key]} <span className="text-xs text-slate-500 dark:text-slate-400">{r.km} km</span></span>
                  <span className="tabular-nums font-bold">{fmtTime(r.km * result.paceKm)}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
