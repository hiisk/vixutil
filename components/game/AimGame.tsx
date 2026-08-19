'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';
import { AIM_UI, GAME_COMMON, type GameLang } from '@/lib/game-ui-intl';

/**
 * 표적 클릭 — 30초 동안 명중 수와 정확도.
 *
 * 빗나간 클릭도 센다. 그게 없으면 아무 데나 마구 눌러도 과녁 위를 지나가며
 * 점수가 오르는데, 그러면 조준 연습이 아니라 연타 게임이 된다.
 */
const DURATION = 30;
const SIZES = [
  { px: 64 },
  { px: 44 },
  { px: 30 },
];

export default function AimGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = AIM_UI[lang];
  const c = GAME_COMMON[lang];
  const [size, setSize] = useState(44);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [left, setLeft] = useState(DURATION);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const endAt = useRef(0);
  const { best, submit } = useBest(`aim-${size}`, higher);

  const move = useCallback(() => {
    // 가장자리에 붙지 않게 여백을 둔다 — 화면 밖으로 반쯤 나가면 못 누른다
    setPos({ x: 8 + Math.random() * 84, y: 10 + Math.random() * 80 });
  }, []);

  // 남은 시간은 rAF로 센다. 루프를 이펙트 안에 두는 이유는 자기 자신을 부르는
  // 함수를 useCallback으로 만들면 선언 전에 참조하게 되기 때문이다.
  useEffect(() => {
    if (!running) return;
    let id = 0;
    const loop = () => {
      const remain = (endAt.current - performance.now()) / 1000;
      if (remain <= 0) {
        setLeft(0);
        setRunning(false);
        setDone(true);
        return;
      }
      setLeft(remain);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [running]);

  const start = () => {
    setHits(0);
    setMisses(0);
    setDone(false);
    setLeft(DURATION);
    endAt.current = performance.now() + DURATION * 1000;
    move();
    setRunning(true);
  };

  useEffect(() => {
    if (done) submit(hits);
  }, [done, hits, submit]);

  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {SIZES.map((s, i) => (
          <button
            key={s.px}
            onClick={() => setSize(s.px)}
            disabled={running}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors disabled:opacity-40 ${
              size === s.px
                ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.targetPrefix} {ui.sizes[i]}
          </button>
        ))}
      </div>

      <div
        onPointerDown={() => { if (running) setMisses(m => m + 1); }}
        className="relative w-full h-72 sm:h-80 rounded-2xl bg-slate-900 overflow-hidden select-none touch-none"
      >
        {running ? (
          <button
            onPointerDown={e => {
              e.stopPropagation();
              setHits(h => h + 1);
              move();
            }}
            aria-label={ui.targetAria}
            className="absolute rounded-full bg-gradient-to-br from-rose-400 to-orange-500 border-4 border-white/80 shadow-lg -translate-x-1/2 -translate-y-1/2 active:scale-90 transition-transform"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: size, height: size }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
            {done ? (
              <>
                <span className="text-5xl font-black tabular-nums">{hits}</span>
                <span className="text-sm text-white/70 mt-1">{ui.hitsSub(accuracy)}</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-black mb-1">{ui.introTitle(DURATION)}</span>
                <span className="text-sm text-white/60">{ui.introSub}</span>
              </>
            )}
          </div>
        )}

        {running && (
          <span className="absolute top-3 right-4 text-sm font-bold text-white/80 tabular-nums">
            {c.secLeft(left.toFixed(1))} · {hits}
          </span>
        )}
      </div>

      <button
        onClick={start}
        disabled={running}
        className="mt-4 w-full rounded-xl bg-sec font-bold py-3.5 text-sm shadow-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {done ? c.retry : running ? c.running : c.start}
      </button>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <Stat label={ui.hits} value={hits} accent="text-rose-600" />
        <Stat label={ui.misses} value={misses} />
        <Stat label={c.accuracy} value={`${accuracy}%`} accent="text-orange-600" />
        <Stat label={c.best} value={best ?? '—'} accent="text-indigo-600" />
      </div>

      {done && (
        <Grade
          text={
            hits >= 45 ? ui.gradeFast(hits) :
            hits >= 30 ? ui.gradeGood(hits) :
            ui.gradeSlow(hits)
          }
          tone={hits >= 30 ? 'good' : 'normal'}
        />
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
