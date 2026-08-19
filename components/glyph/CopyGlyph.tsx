'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 눌러서 복사하는 글자 — 이 섹션에 오는 이유가 이 동작 하나다.
 *
 * 클립보드 API는 https이거나 localhost일 때만 열린다. 막힌 자리에서는 조용히
 * 실패하는 대신 옛 방식(선택 후 execCommand)으로 물러난다 — 복사가 안 되면
 * 이 페이지는 아무 쓸모가 없다.
 */
export default function CopyGlyph({
  char,
  copyLabel,
  copiedLabel,
  size = 'lg',
}: {
  char: string;
  copyLabel: string;
  copiedLabel: string;
  size?: 'lg' | 'sm';
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(char);
    } catch {
      // 클립보드가 막힌 환경 — 눈에 안 보이는 칸에 넣고 옛 방식으로 복사한다
      const el = document.createElement('textarea');
      el.value = char;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* 여기까지 막혔으면 방법이 없다 */ }
      document.body.removeChild(el);
    }
    setDone(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1400);
  };

  if (size === 'sm') {
    return (
      <button
        type="button"
        onClick={copy}
        title={copyLabel}
        data-glyph={char}
        data-copied={done ? '1' : '0'}
        className="relative rounded-xl border chip-off h-14 text-xl text-slate-800 dark:text-slate-100 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all"
      >
        {char}
        {done && (
          <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-500 text-white text-[10px] font-bold">
            {copiedLabel}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      data-glyph={char}
      data-copied={done ? '1' : '0'}
      className="group w-full rounded-xl border chip-off py-8 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all"
    >
      <span className="block text-6xl sm:text-7xl text-slate-900 dark:text-slate-100 leading-none mb-4">{char}</span>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
          done ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
        }`}
      >
        {done ? (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
        {done ? copiedLabel : copyLabel}
      </span>
    </button>
  );
}
