'use client';
import { useCallback, useEffect, useState } from 'react';

/**
 * 게임 열 개가 함께 쓰는 조각들.
 *
 * 기록은 localStorage에 남긴다. 점수가 남아야 한 번 더 하기 때문인데, 서버에
 * 보관하면 로그인을 요구하게 되고 그 순간 "잠깐 해보는 것"이 아니게 된다.
 */
export function useBest(key: string, better: (a: number, b: number) => boolean) {
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`vixutil:best:${key}`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved !== null) setBest(Number(saved));
    } catch { /* 저장소를 못 쓰면 기록만 없다 */ }
  }, [key]);

  const submit = useCallback((score: number) => {
    setBest(prev => {
      if (prev !== null && !better(score, prev)) return prev;
      try { localStorage.setItem(`vixutil:best:${key}`, String(score)); } catch { /* 무시 */ }
      return score;
    });
  }, [key, better]);

  return { best, submit };
}

/** 낮을수록 좋은 기록(반응속도 등) */
export const lower = (a: number, b: number) => a < b;
/** 높을수록 좋은 기록(점수 등) */
export const higher = (a: number, b: number) => a > b;

export const CARD = 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5';

export function Stat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3 text-center">
      <p className={`text-lg font-black tabular-nums ${accent ?? 'text-slate-800 dark:text-slate-100'}`}>{value}</p>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

export function PlayButton({
  onClick,
  children,
  gradient = 'from-emerald-500 to-teal-600',
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  gradient?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl bg-gradient-to-r ${gradient} text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 disabled:opacity-50 transition-opacity`}
    >
      {children}
    </button>
  );
}

/** 기록·순위 안내 — 게임마다 "이 정도면 잘하는 건가"를 알려준다 */
export function Grade({ text, tone = 'normal' }: { text: string; tone?: 'good' | 'normal' | 'bad' }) {
  const color =
    tone === 'good' ? 'text-emerald-600' : tone === 'bad' ? 'text-amber-600' : 'text-slate-600 dark:text-slate-300';
  return <p className={`text-center text-sm font-bold mt-3 ${color}`}>{text}</p>;
}
