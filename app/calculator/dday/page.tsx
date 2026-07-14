'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

function diffDays(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function countWeekdays(from: Date, to: Date) {
  let count = 0;
  const cur = new Date(from < to ? from : to);
  const end = new Date(from < to ? to : from);
  while (cur <= end) {
    const d = cur.getDay();
    if (d !== 0 && d !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

const todayStr = () => new Date().toISOString().split('T')[0];

export default function DdayPage() {
  const [label, setLabel] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<{diff:number;label:string;weekdays:number}|null>(null);

  function calculate() {
    if (!target) return;
    const today = new Date(todayStr());
    const t = new Date(target);
    const diff = diffDays(today, t);
    setResult({ diff, label: label || '목표일', weekdays: countWeekdays(today, t) });
  }

  return (
    <CalcShell title="D-day 계산기" description="목표일까지 D-day · 평일 수 · 두 날짜 간격">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>이름 (선택)</Label>
              <input type="text" value={label} onChange={e=>setLabel(e.target.value)}
                placeholder="예: 수능, 입사일, 생일" className={inputCls}/>
            </div>
            <div>
              <Label>목표 날짜</Label>
              <input type="date" value={target} onChange={e=>setTarget(e.target.value)} className={inputCls}/>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-2xl p-7 text-center ${
              result.diff>0 ? 'bg-blue-600' : result.diff===0 ? 'bg-emerald-600' : 'bg-slate-700'
            }`}>
              <p className="text-white/70 text-sm mb-2">{result.label}</p>
              <p className="text-white text-6xl font-black tracking-tight mb-2">
                {result.diff>0 ? `D-${result.diff}` : result.diff===0 ? 'D-Day!' : `D+${Math.abs(result.diff)}`}
              </p>
              <p className="text-white/70 text-sm">
                {result.diff>0 ? `${result.diff}일 남음 · 평일 ${result.weekdays}일` :
                 result.diff===0 ? '오늘입니다!' :
                 `${Math.abs(result.diff)}일 경과 · 평일 ${result.weekdays}일`}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                {l:'주 단위', v:`${(Math.abs(result.diff)/7).toFixed(1)}주`},
                {l:'월 단위', v:`${(Math.abs(result.diff)/30.44).toFixed(1)}개월`},
                {l:'평일 수', v:`${Math.abs(result.weekdays)}일`},
              ].map(item=>(
                <Card key={item.l} className="p-4 text-center">
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{item.l}</p>
                  <p className="font-black text-slate-900 dark:text-slate-100 text-base">{item.v}</p>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* 날짜 간격 계산 */}
        <Card className="p-5">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">두 날짜 사이 간격</p>
          <TwoDate />
        </Card>
      </div>
    </CalcShell>
  );
}

function TwoDate() {
  const today = todayStr();
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState('');
  const [res, setRes] = useState<{days:number;weeks:number;months:number;weekdays:number}|null>(null);

  function calc() {
    if (!from||!to) return;
    const a = new Date(from), b = new Date(to);
    const days = Math.abs(diffDays(a, b));
    setRes({ days, weeks:days/7, months:days/30.44, weekdays:countWeekdays(a,b) });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>시작일</Label>
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className={inputCls}/>
        </div>
        <div>
          <Label>종료일</Label>
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} className={inputCls}/>
        </div>
      </div>
      <button onClick={calc}
        className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl py-3 text-sm font-bold transition-colors">
        간격 계산
      </button>
      {res && (
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            {l:'일',v:res.days.toLocaleString()},
            {l:'주',v:res.weeks.toFixed(1)},
            {l:'개월',v:res.months.toFixed(1)},
            {l:'평일',v:res.weekdays.toLocaleString()},
          ].map(i=>(
            <div key={i.l} className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl py-3">
              <p className="font-black text-blue-700 dark:text-blue-300 text-lg leading-tight">{i.v}</p>
              <p className="text-blue-400 text-xs mt-0.5">{i.l}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
