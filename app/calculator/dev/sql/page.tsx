'use client';
import { useState } from 'react';
import CalcShell, { Card } from '@/components/CalcShell';

const areaCls = 'w-full bg-slate-900 text-green-400 font-mono text-sm rounded-xl p-4 resize-y min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700';

const MAIN_KW = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN',
  'FULL JOIN', 'CROSS JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'DROP TABLE',
  'ALTER TABLE', 'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT', 'WITH'];
const SUB_KW = ['AND', 'OR', 'NOT', 'IN', 'NOT IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'ASC', 'DESC'];

function formatSQL(sql: string, upper: boolean): string {
  let s = sql.replace(/\s+/g, ' ').trim();

  const allKw = [...MAIN_KW, ...SUB_KW];
  const re = new RegExp('\\b(' + allKw.map(k => k.replace(/\s+/g, '\\s+')).join('|') + ')\\b', 'gi');

  s = s.replace(re, match => {
    const up = match.toUpperCase().replace(/\s+/g, ' ');
    const isMain = MAIN_KW.includes(up);
    const formatted = upper ? up : up.toLowerCase();
    return isMain ? '\n' + formatted : ' ' + formatted;
  });

  s = s.replace(/,/g, ',\n  ');
  return s.split('\n').map(line => line.trimEnd()).filter(Boolean).join('\n').trim();
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors font-medium">
      {copied ? '복사됨 ✓' : '복사'}
    </button>
  );
}

export default function SqlPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [upper, setUpper] = useState(true);

  function format() {
    setOutput(formatSQL(input, upper));
  }

  return (
    <CalcShell title="SQL Formatter" description="SQL 키워드 기반 정렬·들여쓰기" wide>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">SQL 입력</p>
            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
              <input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)}
                className="accent-blue-600" />
              대문자 키워드
            </label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder="SELECT * FROM users WHERE id = 1" className={areaCls} />
          <div className="flex gap-2 mt-3">
            <button onClick={format}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
              정렬하기
            </button>
            <button onClick={() => { setInput(''); setOutput(''); }}
              className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-bold transition-colors">
              초기화
            </button>
          </div>
        </Card>

        {output && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">정렬 결과</p>
              <CopyBtn text={output} />
            </div>
            <textarea value={output} readOnly className={areaCls} />
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
