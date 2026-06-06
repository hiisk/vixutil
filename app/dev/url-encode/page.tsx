'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

const areaCls = 'w-full bg-slate-900 text-green-400 font-mono text-sm rounded-xl p-4 resize-y min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700';

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors font-medium">
      {copied ? '복사됨 ✓' : '복사'}
    </button>
  );
}

const COMMON_CHARS = [
  { char: ' ', encoded: '%20' }, { char: '&', encoded: '%26' },
  { char: '=', encoded: '%3D' }, { char: '?', encoded: '%3F' },
  { char: '#', encoded: '%23' }, { char: '+', encoded: '%2B' },
  { char: '/', encoded: '%2F' }, { char: ':', encoded: '%3A' },
];

export default function UrlEncodePage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const output = (() => {
    if (!input) return '';
    try {
      const result = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
      setError('');
      return result;
    } catch (e) {
      setError(mode === 'decode' ? '유효하지 않은 URL 인코딩입니다' : String(e));
      return '';
    }
  })();

  return (
    <CalcShell title="URL 인코딩 변환기" description="URL 인코딩 · 디코딩" wide>
      <div className="flex flex-col gap-4">
        <TabBar
          options={[{ value: 'encode', label: '인코딩' }, { value: 'decode', label: '디코딩' }]}
          value={mode}
          onChange={v => { setMode(v as 'encode' | 'decode'); setInput(''); }}
        />
        <Card className="p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            {mode === 'encode' ? '원문' : 'URL 인코딩'}
          </p>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '인코딩할 텍스트' : '%EC%BD... 형식 입력'} className={areaCls} />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </Card>

        {output && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">결과</p>
              <CopyBtn text={output} />
            </div>
            <textarea value={output} readOnly className={areaCls} />
          </Card>
        )}

        <Card className="p-4">
          <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">자주 쓰는 문자 변환표</p>
          <div className="grid grid-cols-4 gap-2">
            {COMMON_CHARS.map(c => (
              <div key={c.char} className="bg-slate-50 rounded-lg p-2 text-center text-xs">
                <p className="font-bold text-slate-800">'{c.char}'</p>
                <p className="text-slate-400 font-mono">{c.encoded}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </CalcShell>
  );
}
