'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { DEV_UUID } from '@/lib/calc-l10n/dev-tools2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import CopyButton from '@/components/calc/CopyButton';

export default function DevUuidIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_UUID[lang].ui;
  const [count, setCount] = useState('5');
  const [upper, setUpper] = useState(false);
  const [list, setList] = useState<string[]>([]);

  function generate() {
    const n = Math.min(100, Math.max(1, parseInt(count, 10) || 1));
    const out = Array.from({ length: n }, () => crypto.randomUUID());
    setList(upper ? out.map(u => u.toUpperCase()) : out);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <div className="grid grid-cols-2 gap-3 items-end">
          <div>
            <Label>{c.count}</Label>
            <input type="number" min={1} max={100} value={count} onChange={e => setCount(e.target.value)} className={inputCls} />
          </div>
          <label className="flex items-center gap-2 pb-3 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} className="w-4 h-4" />
            {c.uppercase}
          </label>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={generate}>{c.generate}</PrimaryBtn></div>
      </Card>

      {list.length > 0 && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Label>{c.generated}</Label>
            <CopyButton text={list.join('\n')} copy={c.copy} copied={c.copied} />
          </div>
          <pre className="text-xs font-mono text-slate-800 dark:text-slate-100 max-h-96 overflow-auto">{list.join('\n')}</pre>
        </Card>
      )}
    </div>
  );
}
