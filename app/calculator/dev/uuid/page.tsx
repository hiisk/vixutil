'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, PrimaryBtn } from '@/components/CalcShell';

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors font-medium shrink-0">
      {copied ? '✓' : '복사'}
    </button>
  );
}

export default function UuidPage() {
  const [count, setCount] = useState('5');
  const [uppercase, setUppercase] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);

  function generate() {
    const n = Math.min(20, Math.max(1, Number(count)));
    const list = Array.from({ length: n }, () => {
      const u = uuidv4();
      return uppercase ? u.toUpperCase() : u;
    });
    setUuids(list);
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join('\n'));
  }

  return (
    <CalcShell path="/calculator/dev/uuid" title="UUID Generator" description="v4 UUID 랜덤 생성" wide>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <Label>생성 개수</Label>
              <select value={count} onChange={e => setCount(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {[1, 5, 10, 20].map(n => <option key={n} value={n}>{n}개</option>)}
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 py-3 cursor-pointer select-none">
                <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)}
                  className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">대문자</span>
              </label>
            </div>
          </div>
          <PrimaryBtn onClick={generate}>생성하기</PrimaryBtn>
        </Card>

        {uuids.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">생성된 UUID</p>
              <button onClick={copyAll}
                className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
                전체 복사
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              {uuids.map((u, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-900 rounded-lg px-3 py-2">
                  <span className="font-mono text-green-400 text-sm flex-1 select-all">{u}</span>
                  <CopyBtn text={u} />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
