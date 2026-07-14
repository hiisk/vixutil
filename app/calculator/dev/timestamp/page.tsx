'use client';
import { useState, useEffect } from 'react';
import CalcShell, { Card, Label, inputCls, TabBar } from '@/components/CalcShell';

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors font-medium">
      {copied ? '복사됨 ✓' : '복사'}
    </button>
  );
}

function formatKST(ts: number): string {
  return new Date(ts).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatUTC(ts: number): string {
  return new Date(ts).toISOString().replace('T', ' ').replace('Z', ' UTC');
}

export default function TimestampPage() {
  const [mode, setMode] = useState<'toDate' | 'toTs'>('toDate');
  const [tsInput, setTsInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [now, setNow] = useState(0);

  useEffect(() => {
    // 현재 시각은 서버 프리렌더 시점에 알 수 없다. 마운트 후에 채워야
    // 하이드레이션 불일치가 나지 않는다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const tsResult = (() => {
    const raw = tsInput.trim();
    if (!raw) return null;
    const n = Number(raw);
    const ms = raw.length >= 13 ? n : n * 1000;
    if (isNaN(ms)) return null;
    return { ms, kst: formatKST(ms), utc: formatUTC(ms) };
  })();

  const dateResult = (() => {
    if (!dateInput) return null;
    const ts = Math.floor(new Date(dateInput).getTime() / 1000);
    if (isNaN(ts)) return null;
    return { seconds: ts, ms: ts * 1000 };
  })();

  return (
    <CalcShell title="Unix Timestamp 변환기" description="Unix Timestamp ↔ 날짜·시간 변환" wide>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">현재 시각</p>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{Math.floor(now / 1000)}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{formatKST(now)}</p>
        </Card>

        <TabBar
          options={[
            { value: 'toDate', label: 'Timestamp → 날짜' },
            { value: 'toTs', label: '날짜 → Timestamp' },
          ]}
          value={mode}
          onChange={v => setMode(v as 'toDate' | 'toTs')}
        />

        {mode === 'toDate' ? (
          <Card className="p-4">
            <Label>Unix Timestamp (초 또는 밀리초)</Label>
            <input type="number" value={tsInput} onChange={e => setTsInput(e.target.value)}
              placeholder="예: 1700000000" className={inputCls} />
            {tsResult && (
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { label: 'KST (한국 표준시)', value: tsResult.kst },
                  { label: 'UTC', value: tsResult.utc },
                  { label: 'Timestamp (ms)', value: String(tsResult.ms) },
                ].map(r => (
                  <div key={r.label} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{r.label}</p>
                      <p className="font-mono font-bold text-slate-800 dark:text-slate-100 text-sm">{r.value}</p>
                    </div>
                    <CopyBtn text={r.value} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        ) : (
          <Card className="p-4">
            <Label>날짜·시간</Label>
            <input type="datetime-local" value={dateInput} onChange={e => setDateInput(e.target.value)} className={inputCls} />
            {dateResult && (
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { label: 'Unix Timestamp (초)', value: String(dateResult.seconds) },
                  { label: 'Unix Timestamp (밀리초)', value: String(dateResult.ms) },
                ].map(r => (
                  <div key={r.label} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{r.label}</p>
                      <p className="font-mono font-bold text-slate-800 dark:text-slate-100 text-sm">{r.value}</p>
                    </div>
                    <CopyBtn text={r.value} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
