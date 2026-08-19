'use client';
import { useState } from 'react';

/**
 * 복사 버튼 — 문구를 밖에서 받는다.
 *
 * 한국어 계산기에도 같은 버튼이 여럿 있는데 전부 "복사"가 박혀 있다. 여기서는
 * 언어별 낱말을 prop으로 받아, 개발자 도구 열세 개가 이 한 벌을 나눠 쓴다.
 */
export default function CopyButton({ text, copy, copied }: { text: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      /* 권한이 없으면 조용히 넘어간다 — 사용자가 직접 긁어 복사할 수 있다 */
    }
  }

  return (
    <button
      onClick={onClick}
      className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-blue-600 transition-colors"
    >
      {done ? copied : copy}
    </button>
  );
}
