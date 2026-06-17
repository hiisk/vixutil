'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

const areaCls = 'w-full bg-slate-900 text-green-400 font-mono text-xs rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700';

function decodeJWT(token: string) {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('JWT는 header.payload.signature 형식이어야 합니다');
  const decode = (s: string) => JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/')));
  return {
    header: decode(parts[0]),
    payload: decode(parts[1]),
    signature: parts[2],
  };
}

export default function JwtPage() {
  const [input, setInput] = useState('');
  const [tab, setTab] = useState<'header' | 'payload' | 'sig'>('payload');
  const [result, setResult] = useState<{ header: object; payload: object; signature: string } | null>(null);
  const [error, setError] = useState('');

  function handleChange(val: string) {
    setInput(val);
    if (!val.trim()) { setResult(null); setError(''); return; }
    try {
      setResult(decodeJWT(val));
      setError('');
    } catch (e) {
      setResult(null);
      setError(String(e));
    }
  }

  const isExpired = (() => {
    if (!result) return null;
    const p = result.payload as Record<string, unknown>;
    if (typeof p.exp !== 'number') return null;
    return Date.now() / 1000 > p.exp;
  })();

  const tabContent = result
    ? tab === 'header' ? result.header
    : tab === 'payload' ? result.payload
    : { signature: result.signature }
    : null;

  return (
    <CalcShell title="JWT Decoder" description="JWT 토큰 파싱 및 Payload 확인" wide>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">JWT 토큰</p>
          <textarea value={input} onChange={e => handleChange(e.target.value)}
            placeholder="eyJhbGciOiJ..." rows={4} className={areaCls} />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </Card>

        {result && (
          <>
            {isExpired !== null && (
              <div className={`rounded-xl p-3 text-sm font-semibold ${isExpired ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
                {isExpired ? '⚠ 만료된 토큰' : '✓ 유효한 토큰 (exp 기준)'}
                {!isExpired && ` — ${new Date((result.payload as Record<string, number>).exp * 1000).toLocaleString('ko-KR')}`}
              </div>
            )}
            <TabBar
              options={[
                { value: 'header', label: 'Header' },
                { value: 'payload', label: 'Payload' },
                { value: 'sig', label: 'Signature' },
              ]}
              value={tab}
              onChange={v => setTab(v as 'header' | 'payload' | 'sig')}
            />
            <Card className="p-4">
              <textarea
                value={JSON.stringify(tabContent, null, 2)}
                readOnly
                rows={12}
                className={areaCls}
              />
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400">서명 검증은 지원하지 않습니다. Payload는 Base64 디코딩 결과이며 변조 여부를 확인하려면 서버에서 검증하세요.</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
