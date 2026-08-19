'use client';
import { useState } from 'react';
import { Card, Label, PrimaryBtn } from '@/components/CalcShell';
import { DEV_JSON } from '@/lib/calc-l10n/dev-tools';
import type { CalcLang } from '@/lib/calc-l10n/types';
import CopyButton from '@/components/calc/CopyButton';

export default function DevJsonIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_JSON[lang].ui;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  function run(indent: number) {
    setError('');
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, indent));
    } catch (e) {
      setOutput('');
      setError(e instanceof Error ? e.message : c.invalid);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <Label>{c.input}</Label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={c.placeholder}
          rows={8}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-3 flex gap-2">
          <PrimaryBtn onClick={() => run(2)}>{c.run}</PrimaryBtn>
          <button
            onClick={() => run(0)}
            className="px-4 py-3 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            {c.minify}
          </button>
        </div>
        {error && <p className="mt-3 text-xs font-semibold text-rose-600 break-all">{error}</p>}
      </Card>

      {output && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Label>{c.result}</Label>
            <CopyButton text={output} copy={c.copy} copied={c.copied} />
          </div>
          <pre className="text-xs font-mono whitespace-pre-wrap break-all text-slate-800 dark:text-slate-100 max-h-96 overflow-auto">{output}</pre>
        </Card>
      )}
    </div>
  );
}
