'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';
import { DEV_TIMESTAMP } from '@/lib/calc-l10n/dev-tools3';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';
import CopyButton from '@/components/calc/CopyButton';

type Mode = 'toDate' | 'toStamp';

/**
 * 한국어판은 결과를 KST로 보여준다. 여기서는 브라우저의 현지 시간대와 UTC를
 * 나란히 낸다 — 독일에서 열면 독일 시각이, 브라질에서 열면 브라질 시각이 먼저
 * 보여야 한다. 시간대를 언어로 정하면 그때부터 틀린다.
 */
export default function DevTimestampIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_TIMESTAMP[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('toDate');
  const [stamp, setStamp] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [out, setOut] = useState<{ local: string; utc: string; sec: string; ms: string; iso: string } | null>(null);
  const [error, setError] = useState('');

  function show(d: Date) {
    if (isNaN(d.getTime())) { setOut(null); setError(c.invalid); return; }
    setError('');
    setOut({
      local: d.toLocaleString(tag),
      utc: d.toLocaleString(tag, { timeZone: 'UTC' }),
      sec: String(Math.floor(d.getTime() / 1000)),
      ms: String(d.getTime()),
      iso: d.toISOString(),
    });
  }

  function run() {
    if (mode === 'toDate') {
      const raw = stamp.trim();
      if (!/^-?\d+$/.test(raw)) { setOut(null); setError(c.invalid); return; }
      // 10자리면 초, 13자리면 밀리초 — 길이로 가늠한다
      const n = Number(raw);
      show(new Date(raw.replace('-', '').length <= 10 ? n * 1000 : n));
    } else {
      show(new Date(dateStr));
    }
  }

  function now() {
    const d = new Date();
    setStamp(String(Math.floor(d.getTime() / 1000)));
    setMode('toDate');
    show(d);
  }

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'toDate' as Mode, label: c.toDate },
          { value: 'toStamp' as Mode, label: c.toStamp },
        ]}
        value={mode}
        onChange={m => { setMode(m); setOut(null); setError(''); }}
      />

      <Card className="p-5">
        {mode === 'toDate' ? (
          <>
            <Label>{c.stampInput}</Label>
            <input type="text" inputMode="numeric" value={stamp} onChange={e => setStamp(e.target.value)} className={inputCls} />
          </>
        ) : (
          <>
            <Label>{c.dateInput}</Label>
            <input type="datetime-local" value={dateStr} onChange={e => setDateStr(e.target.value)} className={inputCls} />
          </>
        )}
        <div className="mt-4 flex gap-2">
          <PrimaryBtn onClick={run}>{c.run}</PrimaryBtn>
          <button onClick={now} className="px-4 py-3 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            {c.now}
          </button>
        </div>
        {error && <p className="mt-3 text-xs font-semibold text-rose-600">{error}</p>}
      </Card>

      {out && (
        <Card className="p-5">
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {[
              [c.local, out.local], [c.utc, out.utc],
              [c.seconds, out.sec], [c.millis, out.ms], [c.iso, out.iso],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center gap-3 py-2.5 text-sm">
                <span className="text-slate-500 dark:text-slate-400 shrink-0">{k}</span>
                <span className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-slate-800 dark:text-slate-100 truncate">{v}</span>
                  <CopyButton text={v} copy={c.copy} copied={c.copied} />
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
