'use client';

import { useState } from 'react';

/**
 * 이모지 글자를 눌러 복사한다 — 이 섹션에서 이 파일만 클라이언트다.
 *
 * 낱장에서 사람이 실제로 하려는 일이 이것이다. 이모지는 그림이 아니라 글자라서
 * 복사해 어디든 붙일 수 있고, 검색해 들어온 사람 대부분이 그걸 하러 온다.
 *
 * 글꼴을 직접 지정한다 — 본문 글꼴이 이모지를 갖고 있지 않으면 흑백 대체 글자로
 * 떨어지고, 그러면 뜻을 보러 온 사람이 정작 그림을 못 본다.
 */
export default function CopyChar({ char, label, copiedLabel }: { char: string; label: string; copiedLabel: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(char);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* 클립보드를 막아 둔 브라우저가 있다 — 글자는 화면에 있으니 직접 고를 수 있다 */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="group w-full rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-7 text-center hover:border-amber-300 hover:shadow-sm transition-all"
    >
      <span
        className="block text-[5.5rem] leading-none select-all"
        style={{ fontFamily: '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif' }}
      >
        {char}
      </span>
      <span className={`mt-4 inline-block text-xs font-bold transition-colors ${done ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-amber-600'}`}>
        {done ? copiedLabel : label}
      </span>
    </button>
  );
}
