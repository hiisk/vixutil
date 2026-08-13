'use client';
import { useState } from 'react';

/**
 * 명령 한 줄과 복사 단추.
 *
 * 이 섹션에 온 사람은 대개 읽으러 온 것이 아니라 가져가려고 온다 — 그래서
 * 쓰는 꼴과 예시마다 복사가 붙는다. 클립보드는 클라이언트에만 있으므로
 * 이 한 조각만 클라이언트로 두고, 나머지 화면은 서버가 그린다.
 */
export default function CopyLine({
  text, copyLabel, copiedLabel,
}: { text: string; copyLabel: string; copiedLabel: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 1500);
    } catch { setDone(false); }
  };

  return (
    <div className="flex items-stretch gap-2">
      <code className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 dark:bg-slate-950 px-3.5 py-3 text-[13px] font-mono font-bold text-slate-100 break-all leading-relaxed">
        {text}
      </code>
      <button
        onClick={copy}
        aria-label={copyLabel}
        className="shrink-0 rounded-xl border chip-off px-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        {done ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
