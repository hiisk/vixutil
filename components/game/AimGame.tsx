'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';

/**
 * 표적 클릭 — 30초 동안 명중 수와 정확도.
 *
 * 빗나간 클릭도 센다. 그게 없으면 아무 데나 마구 눌러도 과녁 위를 지나가며
 * 점수가 오르는데, 그러면 조준 연습이 아니라 연타 게임이 된다.
 */
const DURATION = 30;
const SIZES = [
  { label: '큼', px: 64 },
  { label: '보통', px: 44 },
  { label: '작음', px: 30 },
];

export default function AimGame() {
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
        {SIZES.map(s => (
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
            과녁 {s.label}
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
            aria-label="과녁"
            className="absolute rounded-full bg-gradient-to-br from-rose-400 to-orange-500 border-4 border-white/80 shadow-lg -translate-x-1/2 -translate-y-1/2 active:scale-90 transition-transform"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: size, height: size }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
            {done ? (
              <>
                <span className="text-5xl font-black tabular-nums">{hits}</span>
                <span className="text-sm text-white/70 mt-1">명중 · 정확도 {accuracy}%</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-black mb-1">{DURATION}초 동안 과녁 맞히기</span>
                <span className="text-sm text-white/60">빗나간 클릭도 셉니다 — 마구 누르면 정확도가 떨어집니다</span>
              </>
            )}
          </div>
        )}

        {running && (
          <span className="absolute top-3 right-4 text-sm font-bold text-white/80 tabular-nums">
            {left.toFixed(1)}초 · {hits}
          </span>
        )}
      </div>

      <button
        onClick={start}
        disabled={running}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {done ? '다시 도전' : running ? '진행 중…' : '시작하기'}
      </button>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <Stat label="명중" value={hits} accent="text-rose-600" />
        <Stat label="빗나감" value={misses} />
        <Stat label="정확도" value={`${accuracy}%`} accent="text-orange-600" />
        <Stat label="최고 기록" value={best ?? '—'} accent="text-indigo-600" />
      </div>

      {done && (
        <Grade
          text={
            hits >= 45 ? `${hits}개 명중 — 아주 빠릅니다` :
            hits >= 30 ? `${hits}개 명중 — 좋은 편입니다` :
            `${hits}개 명중 — 과녁을 크게 두고 감을 잡아보세요`
          }
          tone={hits >= 30 ? 'good' : 'normal'}
        />
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          정확도가 낮다면 마우스 감도(DPI)가 너무 높은 경우가 많습니다. 감도를 낮추고 팔로 크게 움직이면
          작은 과녁에서 명중률이 올라갑니다. 휴대폰에서는 손가락 크기 때문에 작은 과녁이 불리합니다.
        </p>
      </div>
    </div>
  );
}
