'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { SLEEP } from '@/lib/calc-l10n/global';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { fmtHm, parseHm, sleepOptions, type SleepOption } from '@/lib/global-calc';

export default function SleepIntl({ lang }: { lang: CalcLang }) {
  const c = SLEEP[lang].ui;
  const [mode, setMode] = useState<'wake' | 'bed'>('wake');
  const [time, setTime] = useState('07:00');
  const [rows, setRows] = useState<SleepOption[] | null>(null);

  function calculate() {
    const base = parseHm(time);
    if (base === null) return;
    setRows(sleepOptions(base, mode));
  }

  /*
    «지금 자면»은 현재 시각이 있어야 한다. 그 값을 처음 그릴 때 읽으면 서버와
    브라우저의 시각이 달라 하이드레이션이 어긋나므로, 누를 때만 읽는다.
  */
  function useNow() {
    const d = new Date();
    setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    setMode('bed');
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.mode}</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {([['wake', c.wake], ['bed', c.bed]] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  className={`rounded-lg border px-3.5 py-2 text-sm font-bold transition-colors ${
                    mode === id
                      ? 'bg-sec border-transparent'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>{c.time}</Label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} className={inputCls} />
            <button type="button" onClick={useNow} className="mt-2 text-xs font-bold text-sec underline underline-offset-2">
              {c.now}
            </button>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {rows && (
        <>
          <Card className="p-5">
            <p className="label-caps mb-3">{mode === 'wake' ? c.bedList : c.wakeList}</p>
            <div className="kv-table">
              {rows.map((r, i) => (
                <div key={r.cycles} className="kv-row">
                  <span>
                    <span className="font-bold text-slate-900 dark:text-white">{fmtHm(r.at)}</span>
                    {i === 0 && <span className="ml-2 text-xs font-bold text-sec">{c.best}</span>}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {r.cycles} {c.cycles} · {c.sleepFor} {Math.floor(r.sleepMin / 60)}h {r.sleepMin % 60 ? `${r.sleepMin % 60}m` : ''}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{c.note}</p>
        </>
      )}
    </div>
  );
}
