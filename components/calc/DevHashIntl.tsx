'use client';
import { useEffect, useState } from 'react';
import { Card, Label } from '@/components/CalcShell';
import { DEV_HASH } from '@/lib/calc-l10n/dev-tools2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import CopyButton from '@/components/calc/CopyButton';

const ALGOS: { name: 'SHA-256' | 'SHA-512'; bits: string }[] = [
  { name: 'SHA-256', bits: 'bits256' },
  { name: 'SHA-512', bits: 'bits512' },
];

async function digest(algo: string, text: string): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function DevHashIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_HASH[lang].ui;
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    /* 빈 문자열도 비동기 갈래로 지운다 — 이펙트 본문에서 동기로 setState하면
       렌더가 이어 달린다(React Compiler의 set-state-in-effect). 마이크로태스크
       하나 늦는 것은 눈에 안 보이고, 취소 처리도 한 갈래로 합쳐진다. */
    (async () => {
      const out: Record<string, string> = {};
      if (text) for (const a of ALGOS) out[a.name] = await digest(a.name, text);
      if (!cancelled) setHashes(out);
    })();
    return () => { cancelled = true; };
  }, [text]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <Label>{c.text} <span className="font-normal text-slate-500 dark:text-slate-400">{c.auto}</span></Label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Card>

      {ALGOS.map(a => hashes[a.name] && (
        <Card key={a.name} className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Label>{a.name} <span className="font-normal text-slate-500 dark:text-slate-400">{c[a.bits]}</span></Label>
            <CopyButton text={hashes[a.name]} copy={c.copy} copied={c.copied} />
          </div>
          <pre className="text-xs font-mono break-all text-slate-800 dark:text-slate-100">{hashes[a.name]}</pre>
        </Card>
      ))}
    </div>
  );
}
