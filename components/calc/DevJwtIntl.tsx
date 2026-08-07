'use client';
import { useState } from 'react';
import { Card, Label } from '@/components/CalcShell';
import { DEV_JWT } from '@/lib/calc-l10n/dev-tools4';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

function b64url(s: string): string {
  const pad = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(pad + '='.repeat((4 - (pad.length % 4)) % 4));
  return new TextDecoder().decode(Uint8Array.from(bin, ch => ch.charCodeAt(0)));
}

export default function DevJwtIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_JWT[lang].ui;
  const [token, setToken] = useState('');
  const [parts, setParts] = useState<{ header: string; payload: string; sig: string; exp: number | null } | null>(null);
  const [error, setError] = useState('');

  function decode(v: string) {
    setToken(v);
    setError('');
    setParts(null);
    const t = v.trim();
    if (!t) return;
    const seg = t.split('.');
    if (seg.length !== 3) { setError(c.malformed); return; }
    try {
      const header = JSON.stringify(JSON.parse(b64url(seg[0])), null, 2);
      const payloadObj = JSON.parse(b64url(seg[1]));
      setParts({
        header,
        payload: JSON.stringify(payloadObj, null, 2),
        sig: seg[2],
        exp: typeof payloadObj.exp === 'number' ? payloadObj.exp : null,
      });
    } catch {
      setError(c.malformed);
    }
  }

  const expState = parts
    ? parts.exp === null ? c.noExp
      : parts.exp * 1000 < Date.now() ? c.expired : c.valid
    : '';

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <Label>{c.token}</Label>
        <textarea
          value={token}
          onChange={e => decode(e.target.value)}
          rows={4}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-mono break-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="mt-3 text-xs font-semibold text-rose-600">{error}</p>}
        <p className="mt-3 note-xs">{c.notice}</p>
      </Card>

      {parts && (
        <>
          <div className={`rounded-2xl border px-5 py-3 text-sm font-bold ${
            parts.exp !== null && parts.exp * 1000 < Date.now()
              ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300'
              : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300'
          }`}>
            {expState}
            {parts.exp !== null && (
              <span className="ml-2 font-mono font-normal text-xs">
                {new Date(parts.exp * 1000).toLocaleString(localeTag(lang))}
              </span>
            )}
          </div>

          {[[c.header, parts.header], [c.payload, parts.payload]].map(([k, v]) => (
            <Card key={k} className="p-5">
              <Label>{k}</Label>
              <pre className="mt-1 text-xs font-mono whitespace-pre-wrap break-all text-slate-800 dark:text-slate-100">{v}</pre>
            </Card>
          ))}

          <Card className="p-5">
            <Label>{c.signature}</Label>
            <pre className="mt-1 text-xs font-mono break-all text-slate-500 dark:text-slate-400">{parts.sig}</pre>
          </Card>
        </>
      )}
    </div>
  );
}
