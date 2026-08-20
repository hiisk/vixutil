'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { TIME_DIFF } from '@/lib/calc-l10n/dates';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'diff' | 'add';

export default function TimeDiffIntl({ lang }: { lang: CalcLang }) {
  const c = TIME_DIFF[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('diff');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [base, setBase] = useState('');
  const [days, setDays] = useState('0');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [dir, setDir] = useState<1 | -1>(1);
  const [result, setResult] = useState<{ seconds: number } | { moment: Date } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 1 });

  function calculate() {
    if (mode === 'diff') {
      if (!from || !to) return;
      const a = new Date(from).getTime();
      const b = new Date(to).getTime();
      if (!isFinite(a) || !isFinite(b)) return;
      setResult({ seconds: Math.round((b - a) / 1000) });
    } else {
      if (!base) return;
      const t = new Date(base).getTime();
      if (!isFinite(t)) return;
      const offset = ((Number(days) || 0) * 1440 + (Number(hours) || 0) * 60 + (Number(minutes) || 0)) * 60_000;
      setResult({ moment: new Date(t + dir * offset) });
    }
  }

  const span = result && 'seconds' in result ? result : null;
  const abs = span ? Math.abs(span.seconds) : 0;

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'diff' as Mode, label: c.tabDiff },
          { value: 'add' as Mode, label: c.tabAdd },
        ]}
        value={mode}
        onChange={m => { setMode(m); setResult(null); }}
      />

      <Card className="p-5">
        {mode === 'diff' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.from}</Label>
              <input type="datetime-local" value={from} onChange={e => setFrom(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.to}</Label>
              <input type="datetime-local" value={to} onChange={e => setTo(e.target.value)} className={inputCls} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <Label>{c.base}</Label>
              <input type="datetime-local" value={base} onChange={e => setBase(e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              <div>
                <Label>{c.days}</Label>
                <input type="number" value={days} onChange={e => setDays(e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label>{c.hours}</Label>
                <input type="number" value={hours} onChange={e => setHours(e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label>{c.minutes}</Label>
                <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <Label>{c.direction}</Label>
              <div className="flex gap-2">
                {([1, -1] as const).map(d => (
                  <button key={d} type="button" onClick={() => setDir(d)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      dir === d ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                    {d === 1 ? c.forward : c.back}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
      </Card>

      {result && 'moment' in result && (
        <div className="stat-pri text-center">
          <p className="stat-label">{c.result}</p>
          <p className="stat-value">
            {result.moment.toLocaleString(tag, { dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </div>
      )}

      {span && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.gap}</p>
            <p className="stat-value">
              {Math.floor(abs / 86400)}{c.d} {Math.floor((abs % 86400) / 3600)}{c.h} {Math.floor((abs % 3600) / 60)}{c.m}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard label={c.totalHours} value={fmt(abs / 3600)} />
            <SummaryCard label={c.totalMinutes} value={fmt(Math.round(abs / 60))} />
          </div>
        </>
      )}
    </div>
  );
}
