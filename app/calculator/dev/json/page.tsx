'use client';
import { useState, useCallback } from 'react';
import CalcShell, { Card } from '@/components/CalcShell';

const areaCls = 'w-full bg-slate-900 text-green-400 font-mono text-sm rounded-xl p-4 resize-y min-h-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700';

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 dark:text-slate-600 hover:bg-slate-600 transition-colors font-medium">
      {copied ? '복사됨 ✓' : '복사'}
    </button>
  );
}

export default function JsonPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{ lines: number; bytes: number } | null>(null);

  const process = useCallback((mode: 'format' | 'minify') => {
    try {
      const parsed = JSON.parse(input);
      const result = mode === 'format'
        ? JSON.stringify(parsed, null, 2)
        : JSON.stringify(parsed);
      setOutput(result);
      setError('');
      setStats({ lines: result.split('\n').length, bytes: new Blob([result]).size });
    } catch (e) {
      setError(String(e));
      setOutput('');
      setStats(null);
    }
  }, [input]);

  const isValid = (() => {
    if (!input.trim()) return null;
    try { JSON.parse(input); return true; } catch { return false; }
  })();

  return (
    <CalcShell title="JSON Formatter" description="JSON 정렬·압축·유효성 검사" wide>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">입력</span>
            {isValid !== null && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${isValid ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-950/40 text-red-600'}`}>
                {isValid ? '✓ Valid JSON' : '✕ Invalid JSON'}
              </span>
            )}
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder='{"key": "value"} 형식으로 붙여넣기' className={areaCls} />
          {error && <p className="text-red-400 text-xs mt-2 font-mono">{error}</p>}
          <div className="flex gap-2 mt-3">
            <button onClick={() => process('format')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
              정렬 (Pretty)
            </button>
            <button onClick={() => process('minify')}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
              압축 (Minify)
            </button>
            <button onClick={() => { setInput(''); setOutput(''); setError(''); setStats(null); }}
              className="px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 py-2.5 rounded-xl text-sm font-bold transition-colors">
              초기화
            </button>
          </div>
        </Card>

        {output && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">결과</span>
              <div className="flex items-center gap-3">
                {stats && <span className="text-xs text-slate-400 dark:text-slate-500">{stats.lines}줄 · {stats.bytes}bytes</span>}
                <CopyBtn text={output} />
              </div>
            </div>
            <textarea value={output} readOnly className={areaCls} />
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
