'use client';
import { useCallback, useEffect, useState } from 'react';
import { hslToHex } from '@/lib/color';
import { CARD, Swatch, useCopy } from './ui';

/**
 * 랜덤 색 — 다섯 개를 뽑고, 마음에 드는 것은 잠근다.
 *
 * 완전 무작위(RGB 각 채널 0~255)는 대부분 진흙 같은 색이 나온다. 채도와 명도를
 * 쓸 만한 범위로 좁히면 그냥 돌려도 쓸 수 있는 조합이 훨씬 자주 나온다.
 */
const COUNT = 5;

const randomHex = () =>
  hslToHex({
    h: Math.floor(Math.random() * 360),
    s: 45 + Math.floor(Math.random() * 40),
    l: 35 + Math.floor(Math.random() * 35),
  });

export default function RandomTool() {
  const [colors, setColors] = useState<string[]>([]);
  const [locked, setLocked] = useState<boolean[]>(Array(COUNT).fill(false));
  const { copied, copy } = useCopy();

  const roll = useCallback(() => {
    setColors(prev =>
      Array.from({ length: COUNT }, (_, i) => (locked[i] && prev[i] ? prev[i] : randomHex())),
    );
  }, [locked]);

  useEffect(() => {
    // 색은 난수라 렌더 중에 만들 수 없다 — 서버와 값이 달라진다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColors(Array.from({ length: COUNT }, randomHex));
  }, []);

  // 스페이스바로 다시 뽑기 — 손을 옮기지 않고 계속 돌려보게 된다
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        roll();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [roll]);

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((c, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Swatch hex={c} height="h-36" />
            <button
              onClick={() => setLocked(prev => prev.map((v, k) => (k === i ? !v : v)))}
              className={`rounded-lg py-1.5 text-xs font-bold border transition-colors ${
                locked[i]
                  ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
              }`}
            >
              {locked[i] ? '🔒' : '🔓'}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={roll}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
      >
        🎲 다시 뽑기 (스페이스바)
      </button>

      <button
        onClick={() => copy(colors.map(c => c.toUpperCase()).join(', '))}
        className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-rose-300 transition-colors"
      >
        {copied ? '✅ 다섯 색을 복사했습니다' : 'HEX 다섯 개 한 번에 복사'}
      </button>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          마음에 드는 색이 나오면 자물쇠로 잠그고 나머지만 다시 뽑으세요. 완전 무작위 대신 채도 45~85%,
          명도 35~70% 범위에서 뽑기 때문에 화면에 바로 쓸 수 있는 색이 나옵니다.
        </p>
      </div>
    </div>
  );
}
