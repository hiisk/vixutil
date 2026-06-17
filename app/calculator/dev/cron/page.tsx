'use client';
import { useState } from 'react';
import CalcShell, { Card, Label } from '@/components/CalcShell';

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors font-medium">
      {copied ? '복사됨 ✓' : '복사'}
    </button>
  );
}

const PRESETS = [
  { label: '매 분', expr: '* * * * *', desc: '1분마다 실행' },
  { label: '매 시간', expr: '0 * * * *', desc: '매 시간 정각' },
  { label: '매일 자정', expr: '0 0 * * *', desc: '자정 00:00' },
  { label: '매일 오전 9시', expr: '0 9 * * *', desc: '평일·주말 매일 9:00' },
  { label: '매주 월요일', expr: '0 0 * * 1', desc: '월요일 자정' },
  { label: '매월 1일', expr: '0 0 1 * *', desc: '매달 1일 자정' },
  { label: '매 5분', expr: '*/5 * * * *', desc: '5분마다' },
  { label: '평일 9-18시', expr: '0 9-18 * * 1-5', desc: '월~금 9시~18시 매 시간' },
];

function describeField(val: string, type: string): string {
  if (val === '*') return `모든 ${type}`;
  if (val.startsWith('*/')) return `${val.slice(2)}${type}마다`;
  if (val.includes('-')) return `${val} ${type}`;
  if (val.includes(',')) return `${val} ${type}`;
  return `${val} ${type}`;
}

export default function CronPage() {
  const [fields, setFields] = useState({ min: '0', hour: '*', day: '*', month: '*', dow: '*' });

  function setField(k: string, v: string) {
    setFields(prev => ({ ...prev, [k]: v }));
  }

  const expr = `${fields.min} ${fields.hour} ${fields.day} ${fields.month} ${fields.dow}`;

  const description = [
    describeField(fields.min, '분'),
    describeField(fields.hour, '시'),
    describeField(fields.day, '일'),
    describeField(fields.month, '월'),
    describeField(fields.dow, '요일'),
  ].join(' / ');

  const inputCls = 'w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <CalcShell title="Cron 표현식 생성기" description="Cron Expression 작성 · 미리 정의된 템플릿 제공" wide>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">미리 정의된 템플릿</p>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map(p => (
              <button key={p.expr}
                onClick={() => {
                  const [min, hour, day, month, dow] = p.expr.split(' ');
                  setFields({ min, hour, day, month, dow });
                }}
                className={`text-left p-3 rounded-xl border text-xs transition-colors ${expr === p.expr ? 'bg-blue-50 border-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'}`}>
                <p className="font-bold text-slate-700 font-mono">{p.expr}</p>
                <p className="text-slate-400 mt-0.5">{p.label} · {p.desc}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">직접 편집</p>
          <div className="grid grid-cols-5 gap-2">
            {[
              { key: 'min', label: '분 (0-59)', placeholder: '0, *, */5' },
              { key: 'hour', label: '시 (0-23)', placeholder: '*, 9, 0-18' },
              { key: 'day', label: '일 (1-31)', placeholder: '*, 1, 15' },
              { key: 'month', label: '월 (1-12)', placeholder: '*, 1-6' },
              { key: 'dow', label: '요일 (0-7)', placeholder: '*, 1-5, 0' },
            ].map(f => (
              <div key={f.key}>
                <Label>{f.label}</Label>
                <input type="text" value={(fields as Record<string, string>)[f.key]}
                  onChange={e => setField(f.key, e.target.value)}
                  placeholder={f.placeholder} className={inputCls} />
              </div>
            ))}
          </div>
        </Card>

        <div className="bg-slate-900 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-xs uppercase tracking-wide font-bold">Cron 표현식</p>
            <CopyBtn text={expr} />
          </div>
          <p className="text-green-400 font-mono text-2xl font-bold">{expr}</p>
          <p className="text-slate-400 text-xs mt-2">{description}</p>
        </div>

        <Card className="p-4">
          <p className="text-xs text-slate-400">
            * = 모든 값 · */n = n마다 · a-b = a부터 b · a,b = a와 b<br />
            요일: 0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토, 7=일
          </p>
        </Card>
      </div>
    </CalcShell>
  );
}
