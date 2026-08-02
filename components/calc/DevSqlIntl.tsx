'use client';
import { useState } from 'react';
import { Card, Label, PrimaryBtn } from '@/components/CalcShell';
import { DEV_SQL } from '@/lib/calc-l10n/dev-tools5';
import type { CalcLang } from '@/lib/calc-l10n/types';
import CopyButton from '@/components/calc/CopyButton';

const MAIN_KW = ['SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'JOIN',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION ALL', 'UNION',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'];
const SUB_KW = ['AND', 'OR', 'NOT IN', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS NOT NULL', 'IS NULL', 'ASC', 'DESC', 'ON'];

function formatSQL(sql: string, upper: boolean): string {
  let s = sql.replace(/\s+/g, ' ').trim();
  for (const kw of MAIN_KW) {
    s = s.replace(new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi'), m => '\n' + (upper ? kw : m));
  }
  for (const kw of SUB_KW) {
    s = s.replace(new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi'), m => '\n  ' + (upper ? kw : m));
  }
  return s.split('\n').map(l => l.trimEnd()).filter(l => l.trim()).join('\n');
}

export default function DevSqlIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_SQL[lang].ui;
  const [sql, setSql] = useState('');
  const [upper, setUpper] = useState(true);
  const [out, setOut] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <Label>{c.sql}</Label>
        <textarea
          value={sql}
          onChange={e => setSql(e.target.value)}
          rows={7}
          className="w-full bg-slate-900 text-emerald-300 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} className="w-4 h-4" />
          {c.upper}
        </label>
        <div className="mt-3"><PrimaryBtn onClick={() => setOut(formatSQL(sql, upper))}>{c.run}</PrimaryBtn></div>
      </Card>

      {out && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Label>{c.formatted}</Label>
            <CopyButton text={out} copy={c.copy} copied={c.copied} />
          </div>
          <pre className="bg-slate-900 text-emerald-300 rounded-xl p-4 text-xs font-mono whitespace-pre-wrap break-all max-h-96 overflow-auto">{out}</pre>
        </Card>
      )}
    </div>
  );
}
