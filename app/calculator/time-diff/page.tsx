'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, TabBar, SummaryGrid, SummaryCard } from '@/components/CalcShell';

type Tab = 'diff' | 'add';

function pad(n: number) { return String(n).padStart(2, '0'); }

function formatDuration(totalSeconds: number) {
  const abs = Math.abs(totalSeconds);
  const days = Math.floor(abs / 86400);
  const hours = Math.floor((abs % 86400) / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const seconds = abs % 60;
  return { days, hours, minutes, seconds, negative: totalSeconds < 0 };
}

export default function TimeDiffPage() {
  const [tab, setTab] = useState<Tab>('diff');

  // 탭1: 시간 차이
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [diffResult, setDiffResult] = useState<ReturnType<typeof formatDuration> | null>(null);

  // 탭2: 시간 더하기/빼기
  const [base, setBase] = useState('');
  const [addDays, setAddDays] = useState('0');
  const [addHours, setAddHours] = useState('0');
  const [addMins, setAddMins] = useState('0');
  const [addSecs, setAddSecs] = useState('0');
  const [operation, setOperation] = useState<'add' | 'sub'>('add');
  const [addResult, setAddResult] = useState<string | null>(null);

  function calcDiff() {
    if (!from || !to) return;
    const a = new Date(from).getTime();
    const b = new Date(to).getTime();
    if (isNaN(a) || isNaN(b)) return;
    setDiffResult(formatDuration(Math.round((b - a) / 1000)));
  }

  function calcAdd() {
    if (!base) return;
    const d = new Date(base);
    if (isNaN(d.getTime())) return;
    const totalMs =
      (Number(addDays) * 86400 +
       Number(addHours) * 3600 +
       Number(addMins) * 60 +
       Number(addSecs)) * 1000;
    const result = new Date(d.getTime() + (operation === 'add' ? totalMs : -totalMs));
    const y = result.getFullYear();
    const mo = pad(result.getMonth() + 1);
    const day = pad(result.getDate());
    const h = pad(result.getHours());
    const min = pad(result.getMinutes());
    const sec = pad(result.getSeconds());
    setAddResult(`${y}년 ${mo}월 ${day}일 ${h}:${min}:${sec}`);
  }

  function nowDatetime() {
    const n = new Date();
    const pad2 = (x: number) => String(x).padStart(2, '0');
    return `${n.getFullYear()}-${pad2(n.getMonth()+1)}-${pad2(n.getDate())}T${pad2(n.getHours())}:${pad2(n.getMinutes())}`;
  }

  return (
    <CalcShell title="시간 계산기" description="두 시각의 차이를 계산하거나 특정 시각에서 시간을 더하고 뺍니다">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'diff', label: '시간 차이', sub: '두 시각 비교' },
            { value: 'add', label: '시간 더하기/빼기', sub: '기준 시각 계산' },
          ]}
          value={tab}
          onChange={v => { setTab(v); setDiffResult(null); setAddResult(null); }}
        />

        {/* 탭1: 시간 차이 */}
        {tab === 'diff' && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">두 시각 입력</p>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <Label>시작 시각</Label>
                    <button type="button" onClick={() => setFrom(nowDatetime())}
                      className="text-xs text-blue-600 font-semibold">현재 시각</button>
                  </div>
                  <input type="datetime-local" value={from} onChange={e => setFrom(e.target.value)}
                    className={inputCls} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <Label>종료 시각</Label>
                    <button type="button" onClick={() => setTo(nowDatetime())}
                      className="text-xs text-blue-600 font-semibold">현재 시각</button>
                  </div>
                  <input type="datetime-local" value={to} onChange={e => setTo(e.target.value)}
                    className={inputCls} />
                </div>
              </div>
              <div className="mt-4"><PrimaryBtn onClick={calcDiff}>계산하기</PrimaryBtn></div>
            </Card>

            {diffResult && (
              <>
                <SummaryGrid>
                  <SummaryCard label="일" value={`${diffResult.negative ? '-' : ''}${diffResult.days}일`} variant="primary" />
                  <SummaryCard label="시간" value={`${diffResult.hours}시간`} />
                  <SummaryCard label="분" value={`${diffResult.minutes}분`} />
                  <SummaryCard label="초" value={`${diffResult.seconds}초`} />
                </SummaryGrid>
                <Card className="p-5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">환산</p>
                  <div className="flex flex-col gap-2">
                    {(() => {
                      const abs = diffResult.days * 86400 + diffResult.hours * 3600 + diffResult.minutes * 60 + diffResult.seconds;
                      const sign = diffResult.negative ? '-' : '';
                      return [
                        { label: '총 시간', value: `${sign}${(abs / 3600).toFixed(2)}시간` },
                        { label: '총 분', value: `${sign}${Math.floor(abs / 60).toLocaleString()}분` },
                        { label: '총 초', value: `${sign}${abs.toLocaleString()}초` },
                        { label: '총 일', value: `${sign}${(abs / 86400).toFixed(4)}일` },
                      ];
                    })().map((row, i) => (
                      <div key={i} className={`flex justify-between py-2 ${i < 3 ? 'border-b border-slate-100' : ''}`}>
                        <span className="text-sm text-slate-500">{row.label}</span>
                        <span className="text-sm font-bold text-slate-900">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </>
        )}

        {/* 탭2: 시간 더하기/빼기 */}
        {tab === 'add' && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">기준 시각</p>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <Label>기준 시각</Label>
                    <button type="button" onClick={() => setBase(nowDatetime())}
                      className="text-xs text-blue-600 font-semibold">현재 시각</button>
                  </div>
                  <input type="datetime-local" value={base} onChange={e => setBase(e.target.value)}
                    className={inputCls} />
                </div>

                <div>
                  <Label>연산</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['add', 'sub'] as const).map(op => (
                      <button key={op} type="button" onClick={() => setOperation(op)}
                        className={`py-3 text-sm font-semibold rounded-xl border transition-colors ${
                          operation === op ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                        }`}>
                        {op === 'add' ? '+ 더하기' : '- 빼기'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>더할/뺄 시간</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: '일', value: addDays, set: setAddDays },
                      { label: '시간', value: addHours, set: setAddHours },
                      { label: '분', value: addMins, set: setAddMins },
                      { label: '초', value: addSecs, set: setAddSecs },
                    ].map(field => (
                      <div key={field.label}>
                        <p className="text-xs text-slate-400 text-center mb-1">{field.label}</p>
                        <input type="number" value={field.value}
                          onChange={e => field.set(e.target.value)}
                          min={0} className={inputCls} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4"><PrimaryBtn onClick={calcAdd}>계산하기</PrimaryBtn></div>
            </Card>

            {addResult && (
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-xs text-blue-400 mb-2">결과 시각</p>
                <p className="text-2xl font-black text-blue-700">{addResult}</p>
                <p className="text-xs text-blue-400 mt-2">
                  기준: {base ? new Date(base).toLocaleString('ko-KR') : ''} {operation === 'add' ? '+' : '-'} {addDays}일 {addHours}시간 {addMins}분 {addSecs}초
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
