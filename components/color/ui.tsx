'use client';
import { useCallback, useState } from 'react';
import { hexToRgb, rgbToHex, luminance, type RGB } from '@/lib/color';

/** 색상 도구 열 개가 함께 쓰는 조각들. */

export function useCopy() {
  const [copied, setCopied] = useState('');
  const copy = useCallback(async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(c => (c === text ? '' : c)), 1500);
    } catch { setCopied(''); }
  }, []);
  return { copied, copy };
}

/** 배경 위에 흰 글씨와 검은 글씨 중 어느 쪽이 읽히는지 */
export function readableOn(rgb: RGB): '#000000' | '#ffffff' {
  return luminance(rgb) > 0.35 ? '#000000' : '#ffffff';
}

export const CARD = 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5';

/** 색 하나를 고르는 입력 — 색상 선택기와 HEX 입력을 함께 둔다 */
export function ColorInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (hex: string) => void;
  label: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label={`${label} 선택기`}
          className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer shrink-0"
        />
        <input
          value={value}
          onChange={e => {
            const v = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
            onChange(v);
          }}
          spellCheck={false}
          className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3 text-sm font-mono font-bold uppercase text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-400 transition-colors"
        />
      </div>
    </label>
  );
}

/** 색 한 칸 — 누르면 HEX가 복사된다 */
export function Swatch({
  hex,
  label,
  sub,
  height = 'h-20',
}: {
  hex: string;
  label?: string;
  sub?: string;
  height?: string;
}) {
  const { copied, copy } = useCopy();
  const rgb = hexToRgb(hex) ?? { r: 0, g: 0, b: 0 };
  const fg = readableOn(rgb);

  return (
    <button
      onClick={() => copy(hex.toUpperCase())}
      className={`relative w-full ${height} rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center transition-transform active:scale-95`}
      style={{ background: rgbToHex(rgb), color: fg }}
    >
      <span className="text-xs font-black font-mono uppercase">{copied === hex.toUpperCase() ? '복사됨' : hex.toUpperCase()}</span>
      {label && <span className="text-[10px] opacity-70 mt-0.5">{label}</span>}
      {sub && <span className="text-[10px] opacity-60">{sub}</span>}
    </button>
  );
}

/** 값 한 줄 — 누르면 복사 */
export function ValueRow({ label, value }: { label: string; value: string }) {
  const { copied, copy } = useCopy();
  return (
    <button
      onClick={() => copy(value)}
      className="w-full flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-left hover:border-violet-300 transition-colors"
    >
      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 w-16 shrink-0">{label}</span>
      <span className="flex-1 min-w-0 text-sm font-mono font-bold text-slate-800 dark:text-slate-100 break-all">{value}</span>
      <span className={`text-xs font-bold shrink-0 ${copied === value ? 'text-emerald-600' : 'text-slate-300 dark:text-slate-600'}`}>
        {copied === value ? '복사됨' : '복사'}
      </span>
    </button>
  );
}
