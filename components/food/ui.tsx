'use client';
import { useCallback, useState } from 'react';

/** 계량·요리 도구가 함께 쓰는 조각들 */
export const CARD = 'rounded-lg border chip-off p-5';

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch { setCopied(false); }
  }, []);
  return { copied, copy };
}

export function Stat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-xl border chip-off px-3 py-3 text-center">
      <p className={`text-lg font-bold tabular-nums ${accent ?? 'text-slate-800 dark:text-slate-100'}`}>{value}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

export function NumberField({
  label, value, onChange, unit, step = 1, min = 0,
}: {
  label: string; value: number; onChange: (n: number) => void; unit?: string; step?: number; min?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{label}</span>
      <div className="relative">
        <input
          type="number" value={value} step={step} min={min}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full rounded-xl border chip-off px-3.5 py-3 pr-12 text-lg font-bold text-slate-800 dark:text-slate-100 tabular-nums focus:outline-none focus:border-amber-400 transition-colors"
        />
        {unit && <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500 dark:text-slate-400">{unit}</span>}
      </div>
    </label>
  );
}

export function Result({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mt-4 rounded-lg bg-sec px-6 py-8 text-center">
      <div className="text-3xl sm:text-4xl font-bold">{children}</div>
      {sub && <p className="text-sm text-white/80 mt-2">{sub}</p>}
    </div>
  );
}

export function Choice<T extends string>({
  options, value, onChange, columns = 3,
}: {
  options: { id: T; label: string; note?: string }[];
  value: T;
  onChange: (v: T) => void;
  columns?: number;
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {options.map(o => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-xl border px-3 py-2.5 text-center transition-colors ${
            value === o.id
              ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <span className="block text-sm font-bold">{o.label}</span>
          {o.note && <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{o.note}</span>}
        </button>
      ))}
    </div>
  );
}
