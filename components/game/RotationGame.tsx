'use client';
import { useCallback, useEffect, useState } from 'react';
import { CARD, Grade, PlayButton, Stat, higher, useBest } from './ui';
import { isRotation, rotationPuzzle, type RotationPuzzle } from '@/lib/game-more';
import { GAME_MORE_UI } from '@/lib/game-more-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 도형 회전 — 두 도형이 돌리면 같아지는지 맞힌다.
 *
 * "다른" 문제는 좌우로 뒤집은 도형으로 만든다(lib/game-more.ts). 아무 도형이나
 * 갖다 대면 돌려 볼 필요도 없이 답이 보이고, 대칭 도형은 거울상이 회전으로도
 * 같아져 정답이 틀린 문제가 된다 — 둘 다 거기서 걸러 낸다.
 */
function Grid({ shape, size }: { shape: number[]; size: number }) {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
      {Array.from({ length: size * size }, (_, i) => (
        <span
          key={i}
          className={`w-7 h-7 rounded-md ${
            shape.includes(i) ? 'bg-sec' : 'bg-slate-100 dark:bg-slate-800'
          }`}
        />
      ))}
    </div>
  );
}

export default function RotationGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = GAME_MORE_UI[lang];
  const [puzzle, setPuzzle] = useState<RotationPuzzle | null>(null);
  const [level, setLevel] = useState(1);
  const [right, setRight] = useState(0);
  const [over, setOver] = useState(false);
  const { best, submit } = useBest('rotation', higher);

  const make = useCallback((lv: number) => setPuzzle(rotationPuzzle(lv, Math.random)), []);

  // 도형은 난수로 정하므로 렌더 중에 만들 수 없다 — 서버와 값이 달라진다
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { make(1); }, [make]);

  const answer = (said: boolean) => {
    if (!puzzle || over) return;
    if (said === puzzle.isSame) {
      const lv = level + 1;
      setRight(r => r + 1);
      setLevel(lv);
      make(lv);
    } else {
      submit(right);
      setOver(true);
    }
  };

  const restart = () => { setLevel(1); setRight(0); setOver(false); make(1); };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Stat label={ui.level} value={level} />
        <Stat label={ui.correct} value={right} accent="text-emerald-600" />
        <Stat label={ui.best} value={best ?? '—'} />
      </div>

      <div className={`${CARD} min-h-[13rem] flex items-center justify-center`}>
        {over ? (
          <Grade text={`${right}`} tone={right >= 10 ? 'good' : 'normal'} />
        ) : puzzle ? (
          <div className="flex items-center gap-6">
            <Grid shape={puzzle.left} size={puzzle.size} />
            <span className="text-sm font-bold text-slate-300 dark:text-slate-600">?</span>
            <Grid shape={puzzle.right} size={puzzle.size} />
          </div>
        ) : null}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">{ui.rotHow}</p>

      {over ? (
        <div className="mt-4"><PlayButton onClick={restart}>{ui.again}</PlayButton></div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => answer(true)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-4 text-base font-bold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all"
          >
            {ui.sameShape}
          </button>
          <button
            onClick={() => answer(false)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-4 text-base font-bold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all"
          >
            {ui.diffShape}
          </button>
        </div>
      )}
    </div>
  );
}
