'use client';
import { useState } from 'react';
import { convert, convertBack, format, type ConvertTool } from '@/lib/convert-tools';

/**
 * 단위 변환 엔진 — 쉰 개 페이지가 이 컴포넌트 하나를 쓴다.
 *
 * 양쪽 칸을 모두 입력할 수 있게 만든 이유는, 사람이 어느 방향으로 올지 알 수
 * 없기 때문이다. "3.5인치가 몇 cm"로 들어온 사람에게 왼쪽 칸만 주면 그 사람은
 * 역수를 계산해야 한다.
 *
 * 입력 중인 쪽의 문자열은 그대로 두고 반대쪽만 계산한다. 양쪽을 다 숫자로
 * 정규화하면 "1.20"을 치는 도중에 "1.2"로 고쳐져 커서가 튄다.
 */
export default function ConvertEngine({ tool }: { tool: ConvertTool }) {
  const [left, setLeft] = useState('1');
  const [right, setRight] = useState(() => format(convert(1, tool), tool.digits));
  const [editing, setEditing] = useState<'left' | 'right'>('left');
  const [copied, setCopied] = useState('');

  const onLeft = (value: string) => {
    setEditing('left');
    setLeft(value);
    const n = Number(value);
    setRight(value === '' || Number.isNaN(n) ? '' : format(convert(n, tool), tool.digits));
  };

  const onRight = (value: string) => {
    setEditing('right');
    setRight(value);
    const n = Number(value);
    setLeft(value === '' || Number.isNaN(n) ? '' : format(convertBack(n, tool), Math.max(tool.digits, 4)));
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(c => (c === text ? '' : c)), 1500);
    } catch { setCopied(''); }
  };

  const field = (
    side: 'left' | 'right',
    value: string,
    unit: string,
    onChange: (v: string) => void,
  ) => (
    <div className="flex-1 min-w-0">
      <label className="block">
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{unit}</span>
        <div className="relative">
          <input
            value={value}
            onChange={e => onChange(e.target.value.replace(/[^\d.\-]/g, ''))}
            inputMode="decimal"
            className={`w-full rounded-xl border-2 bg-white dark:bg-slate-900 px-3.5 py-3.5 text-2xl font-black text-slate-800 dark:text-slate-100 tabular-nums focus:outline-none transition-colors ${
              editing === side ? 'border-blue-400' : 'border-slate-200 dark:border-slate-700 focus:border-blue-400'
            }`}
          />
        </div>
      </label>
    </div>
  );

  return (
    <div>
      <div className="flex items-end gap-2">
        {field('left', left, tool.from, onLeft)}
        <span className="pb-4 text-xl text-slate-300 dark:text-slate-600 shrink-0">=</span>
        {field('right', right, tool.to, onRight)}
      </div>

      <button
        onClick={() => copy(`${left}${tool.from} = ${right}${tool.to}`)}
        disabled={!left || !right}
        className="mt-3 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 text-sm shadow hover:opacity-90 disabled:opacity-40 transition-opacity"
      >
        {copied ? '✅ 복사했습니다' : `${left || '—'}${tool.from} = ${right || '—'}${tool.to} 복사`}
      </button>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <p className="px-4 py-2.5 text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          자주 찾는 값
        </p>
        {tool.quick.map(v => {
          const converted = format(convert(v, tool), tool.digits);
          return (
            <button
              key={v}
              onClick={() => onLeft(String(v))}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
            >
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums w-24">
                {v}{tool.from}
              </span>
              <span className="text-slate-300 dark:text-slate-600 text-xs">=</span>
              <span className="text-sm font-black text-blue-600 tabular-nums">
                {converted}{tool.to}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">계산식</p>
        <p className="text-sm font-mono text-slate-700 dark:text-slate-200">
          {tool.to} = {tool.from} × {tool.factor}
          {tool.offset ? ` + ${tool.offset}` : ''}
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{tool.note}</p>
      </div>
    </div>
  );
}
