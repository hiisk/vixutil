'use client';
import { useCallback, useState } from 'react';

/**
 * 텍스트 도구 열두 개가 함께 쓰는 조각들.
 *
 * 어느 도구든 "글을 넣고 → 결과를 보고 → 복사한다"가 전부라서, 그 세 자리만
 * 맞춰 두면 도구마다 다른 건 가운데 규칙뿐이다. 복사 버튼이 도구마다 조금씩
 * 다르게 생기는 것을 막는 목적도 있다.
 */

export function useCopy() {
  const [copied, setCopied] = useState('');
  const copy = useCallback(async (text: string, key = text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(c => (c === key ? '' : c)), 1500);
    } catch {
      setCopied('');
    }
  }, []);
  return { copied, copy };
}

export function InputArea({
  value,
  onChange,
  placeholder,
  rows = 6,
  label = '입력',
  onClear,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
  onClear?: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
        {value && (
          <button
            onClick={() => (onClear ? onClear() : onChange(''))}
            className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-colors"
          >
            지우기
          </button>
        )}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 transition-colors resize-y leading-relaxed"
      />
    </div>
  );
}

export function CopyBox({
  value,
  label = '결과',
  rows = 6,
  mono = false,
  empty = '위에 글을 입력하면 결과가 나옵니다',
}: {
  value: string;
  label?: string;
  rows?: number;
  mono?: boolean;
  empty?: string;
}) {
  const { copied, copy } = useCopy();

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
        <button
          onClick={() => copy(value)}
          disabled={!value}
          className={`text-xs font-bold transition-colors disabled:opacity-40 ${
            copied ? 'text-emerald-600' : 'text-indigo-600 hover:text-indigo-700'
          }`}
        >
          {copied ? '✅ 복사했습니다' : '복사하기'}
        </button>
      </div>
      <div
        className={`w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words overflow-auto ${
          mono ? 'font-mono' : ''
        } ${value ? 'text-slate-800 dark:text-slate-100' : 'text-slate-300 dark:text-slate-600'}`}
        style={{ minHeight: `${rows * 1.6}rem` }}
      >
        {value || empty}
      </div>
    </div>
  );
}

/** 한 줄짜리 결과 여러 개를 나열할 때 (대소문자 변환·금액 변환 등) */
export function CopyRow({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  const { copied, copy } = useCopy();

  return (
    <button
      onClick={() => copy(value)}
      disabled={!value}
      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors disabled:opacity-50 ${
        accent
          ? 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/30 hover:border-indigo-300'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-300'
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold text-slate-400 dark:text-slate-500">{label}</span>
        <span className={`block text-sm break-all ${value ? 'font-bold text-slate-800 dark:text-slate-100' : 'text-slate-300 dark:text-slate-600'}`}>
          {value || '—'}
        </span>
        {hint && <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{hint}</span>}
      </span>
      <span className={`shrink-0 text-xs font-bold ${copied ? 'text-emerald-600' : 'text-slate-300 dark:text-slate-600'}`}>
        {copied ? '복사됨' : '복사'}
      </span>
    </button>
  );
}

export function Stat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3 text-center">
      <p className={`text-lg font-black tabular-nums ${accent ?? 'text-slate-800 dark:text-slate-100'}`}>{value}</p>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer py-1.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="w-4 h-4 mt-0.5 accent-indigo-500 shrink-0"
      />
      <span className="min-w-0">
        <span className="block text-sm text-slate-700 dark:text-slate-200">{label}</span>
        {hint && <span className="block text-[11px] text-slate-400 dark:text-slate-500">{hint}</span>}
      </span>
    </label>
  );
}

export const CARD = 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5';
