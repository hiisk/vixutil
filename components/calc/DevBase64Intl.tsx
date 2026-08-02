'use client';
import { useState } from 'react';
import { Card, Label, PrimaryBtn, TabBar } from '@/components/CalcShell';
import { DEV_BASE64 } from '@/lib/calc-l10n/dev-tools';
import type { CalcLang } from '@/lib/calc-l10n/types';
import CopyButton from '@/components/calc/CopyButton';

type Mode = 'encode' | 'decode';

/** UTF-8을 거쳐 변환한다 — btoa는 라틴1만 받아서 한글·이모지에서 터진다. */
function encode(s: string): string {
  return btoa(String.fromCharCode(...new TextEncoder().encode(s)));
}

function decode(s: string): string {
  const bin = atob(s.trim());
  return new TextDecoder().decode(Uint8Array.from(bin, ch => ch.charCodeAt(0)));
}

export default function DevBase64Intl({ lang }: { lang: CalcLang }) {
  const c = DEV_BASE64[lang].ui;
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  function run() {
    setError('');
    try {
      setOutput(mode === 'encode' ? encode(input) : decode(input));
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
          placeholder={mode === 'encode' ? c.placeholderEnc : c.placeholderDec}
          rows={6}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-3">
          <PrimaryBtn onClick={run}>{c.run}</PrimaryBtn>
        </div>
        {error && <p className="mt-3 text-xs font-semibold text-rose-600">{error}</p>}
      </Card>

      {output && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Label>{mode === 'encode' ? c.encoded : c.source}</Label>
            <CopyButton text={output} copy={c.copy} copied={c.copied} />
          </div>
          <pre className="text-xs font-mono whitespace-pre-wrap break-all text-slate-800 dark:text-slate-100 max-h-96 overflow-auto">{output}</pre>
        </Card>
      )}
    </div>
  );
}
