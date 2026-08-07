'use client';
import { useState } from 'react';
import { Card, Label, PrimaryBtn, TabBar } from '@/components/CalcShell';
import { DEV_URL_ENCODE } from '@/lib/calc-l10n/dev-tools2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import CopyButton from '@/components/calc/CopyButton';

type Mode = 'encode' | 'decode';

/** 자주 부딪히는 문자들 — 어느 언어에서나 같아서 표는 하나로 둔다. */
const COMMON: [string, string][] = [
  [' ', '%20'], ['!', '%21'], ['#', '%23'], ['$', '%24'], ['&', '%26'],
  ["'", '%27'], ['+', '%2B'], [',', '%2C'], ['/', '%2F'], [':', '%3A'],
  [';', '%3B'], ['=', '%3D'], ['?', '%3F'], ['@', '%40'],
];

export default function DevUrlEncodeIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_URL_ENCODE[lang].ui;
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  function run() {
    setError('');
    try {
      setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch {
      setOutput('');
      setError(c.invalid);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'encode' as Mode, label: c.encode },
          { value: 'decode' as Mode, label: c.decode },
        ]}
        value={mode}
        onChange={m => { setMode(m); setInput(''); setOutput(''); setError(''); }}
      />

      <Card className="p-5">
        <Label>{mode === 'encode' ? c.source : c.encoded}</Label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={5}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-3"><PrimaryBtn onClick={run}>{c.run}</PrimaryBtn></div>
        {error && <p className="mt-3 text-xs font-semibold text-rose-600">{error}</p>}
      </Card>

      {output && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Label>{mode === 'encode' ? c.encoded : c.source}</Label>
            <CopyButton text={output} copy={c.copy} copied={c.copied} />
          </div>
          <pre className="text-xs font-mono whitespace-pre-wrap break-all text-slate-800 dark:text-slate-100">{output}</pre>
        </Card>
      )}

      <Card className="p-5">
        <p className="label-caps mb-3">{c.table}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-xs font-mono">
          {COMMON.map(([ch, code]) => (
            <div key={code} className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">{ch === ' ' ? '␠' : ch}</span>
              <span className="text-slate-800 dark:text-slate-100">{code}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
