'use client';
import { useState, useEffect } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

const areaCls = 'w-full bg-slate-900 text-green-400 font-mono text-sm rounded-xl p-4 resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700';

async function hashText(algo: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
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

export default function HashPage() {
  const [algo, setAlgo] = useState<'SHA-256' | 'SHA-512'>('SHA-256');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [uppercase, setUppercase] = useState(false);

  useEffect(() => {
    hashText(algo, input).then(h => setOutput(uppercase ? h.toUpperCase() : h));
  }, [input, algo, uppercase]);

  return (
    <CalcShell title="SHA256 / SHA512 해시 생성기" description="Web Crypto API 기반 해시 생성" wide>
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'SHA-256', label: 'SHA-256' },
            { value: 'SHA-512', label: 'SHA-512' },
          ]}
          value={algo}
          onChange={v => setAlgo(v as 'SHA-256' | 'SHA-512')}
        />
        <Card className="p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">입력 텍스트</p>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder="해시를 생성할 텍스트 입력 (실시간 계산)" className={areaCls} />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{algo} 해시</p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)}
                  className="accent-blue-600" />
                대문자
              </label>
              <CopyBtn text={output} />
            </div>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
            <p className="font-mono text-green-400 text-xs break-all">{output || '(입력하면 자동 계산됩니다)'}</p>
          </div>
          <p className="text-xs text-slate-400 mt-2">{algo === 'SHA-256' ? '256비트 (64자)' : '512비트 (128자)'}</p>
        </Card>
      </div>
    </CalcShell>
  );
}
