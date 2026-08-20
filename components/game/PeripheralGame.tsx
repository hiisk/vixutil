'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, PlayButton, Stat, higher, useBest } from './ui';
import { peripheralTarget, type Peripheral } from '@/lib/game-more';
import { GAME_MORE_UI } from '@/lib/game-more-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 주변시야 — 가운데를 본 채로 가장자리에 뜨는 것을 잡는다.
 *
 * 표적 자리는 lib/game-more.ts가 정한다. 가운데를 비운 고리 안에 놓아야
 * 정면으로 보지 않게 되고, 반지름에 제곱근을 취해야 안쪽에 몰리지 않는다.
 */
const SHOW_MS = 900;

export default function PeripheralGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = GAME_MORE_UI[lang];
  const [playing, setPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [target, setTarget] = useState<Peripheral | null>(null);
  const [over, setOver] = useState(false);
  const { best, submit } = useBest('peripheral', higher);
  const timer = useRef<number | null>(null);

  const clear = () => { if (timer.current) window.clearTimeout(timer.current); };
  useEffect(() => clear, []);

  const show = useCallback((lv: number) => {
    setTarget(peripheralTarget(lv, Math.random));
    clear();
    // 시간 안에 못 누르면 끝 — 눈을 돌려 찾을 틈을 주지 않는다
    timer.current = window.setTimeout(() => {
      setPlaying(false);
      setOver(true);
      submit(lv - 1);
    }, SHOW_MS);
  }, [submit]);

  const start = () => { setLevel(1); setOver(false); setPlaying(true); show(1); };

  const hit = () => {
    if (!playing) return;
    const lv = level + 1;
    setLevel(lv);
    show(lv);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Stat label={ui.level} value={level} />
        <Stat label={ui.score} value={level - 1} accent="text-emerald-600" />
        <Stat label={ui.best} value={best ?? '—'} />
      </div>

      <div className={`${CARD} relative aspect-square max-w-sm mx-auto flex items-center justify-center overflow-hidden`}>
        {/* 가운데 고정점 — 여기서 눈을 떼면 재는 것이 달라진다 */}
        <span className="absolute w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500" />
        {playing && target && (
          <button
            onClick={hit}
            aria-label={ui.tapHere}
            className="absolute w-11 h-11 rounded-full bg-sec-soft active:scale-90 transition-transform"
            style={{ left: `calc(50% + ${target.x * 44}% - 1.375rem)`, top: `calc(50% + ${target.y * 44}% - 1.375rem)` }}
          />
        )}
        {!playing && (
          <div className="text-center px-6">
            {over ? (
              <>
                <Grade text={`${level - 1}`} tone={level > 10 ? 'good' : 'normal'} />
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{ui.missed}</p>
              </>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">{ui.periHow}</p>
            )}
          </div>
        )}
      </div>

      {playing ? (
        <p className="mt-4 text-center text-sm font-bold text-amber-600">{ui.keepEyes}</p>
      ) : (
        <div className="mt-4"><PlayButton onClick={start}>{over ? ui.again : ui.start}</PlayButton></div>
      )}
    </div>
  );
}
