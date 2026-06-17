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

export default function Base64Page() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState('');

  const output = (() => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        let result = btoa(unescape(encodeURIComponent(input)));
        if (urlSafe) result = result.replace(/\+/g, '-').replace(/\//g, '_');
        setError('');
        return result;
      } else {
        let s = input;
        if (urlSafe) s = s.replace(/-/g, '+').replace(/_/g, '/');
        const result = decodeURIComponent(escape(atob(s)));
        setError('');
        return result;
      }
    } catch (e) {
      setError(mode === 'decode' ? '유효하지 않은 Base64 문자열입니다' : String(e));
      return '';
    }
  })();

  return (
    <CalcShell title="Base64 변환기" description="Base64 인코딩 · 디코딩" wide>
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'encode', label: '인코딩' },
            { value: 'decode', label: '디코딩' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'encode' | 'decode'); setInput(''); }}
        />
        <Card className="p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            {mode === 'encode' ? '원문' : 'Base64'}
          </p>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '변환할 텍스트 입력' : 'Base64 문자열 입력'} className={areaCls} />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input type="checkbox" checked={urlSafe} onChange={e => setUrlSafe(e.target.checked)}
              className="w-4 h-4 accent-blue-600" />
            <span className="text-sm text-slate-600">URL-safe Base64 (+→-, /→_)</span>
          </label>
        </Card>

        {output && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                {mode === 'encode' ? 'Base64' : '원문'}
              </p>
              <CopyBtn text={output} />
            </div>
            <textarea value={output} readOnly className={areaCls} />
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
