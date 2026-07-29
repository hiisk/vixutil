'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, lower } from './ui';

/**
 * 반응속도 — 초록으로 바뀐 순간부터 누를 때까지의 시간.
 *
 * 대기 시간을 무작위로 둔다(1~4초). 일정하면 사람이 박자를 세서 기다리다가
 * 미리 누르게 되는데, 그건 반응이 아니라 예측이다. 초록이 되기 전에 누르면
 * 그 판을 무효로 하는 것도 같은 이유다.
 */
type Phase = 'idle' | 'waiting' | 'ready' | 'result' | 'early';

const ROUNDS = 5;

export default function ReactionGame() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [times, setTimes] = useState<number[]>([]);
  const [last, setLast] = useState(0);
  const startedAt = useRef(0);
  const timer = useRef(0);
  const { best, submit } = useBest('reaction', lower);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const arm = useCallback(() => {
    setPhase('waiting');
    timer.current = window.setTimeout(() => {
      startedAt.current = performance.now();
      setPhase('ready');
    }, 1000 + Math.random() * 3000);
  }, []);

  const hit = () => {
    if (phase === 'idle' || phase === 'result' || phase === 'early') {
      if (phase === 'result' && times.length >= ROUNDS) setTimes([]);
      arm();
      return;
    }
    if (phase === 'waiting') {
      window.clearTimeout(timer.current);
      setPhase('early');
      return;
    }
    const ms = Math.round(performance.now() - startedAt.current);
    setLast(ms);
    setTimes(prev => [...prev, ms]);
    submit(ms);
    setPhase('result');
  };

  const done = times.length >= ROUNDS;
  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const fastest = times.length ? Math.min(...times) : 0;

  const face = {
    idle: { bg: 'bg-slate-800', title: '준비되면 누르세요', sub: '초록으로 바뀌는 순간 다시 누르면 됩니다' },
    waiting: { bg: 'bg-rose-600', title: '기다리세요…', sub: '초록이 되기 전에 누르면 무효입니다' },
    ready: { bg: 'bg-emerald-500', title: '지금!', sub: '' },
    result: { bg: 'bg-slate-800', title: `${last}ms`, sub: done ? '아래에서 결과를 확인하세요' : `${times.length}/${ROUNDS}회 — 눌러서 계속` },
    early: { bg: 'bg-amber-500', title: '너무 빨랐습니다', sub: '초록이 된 뒤에 누르세요 — 눌러서 다시' },
  }[phase];

  return (
    <div>
      <button
        onClick={hit}
        className={`w-full h-64 sm:h-80 rounded-2xl ${face.bg} text-white flex flex-col items-center justify-center transition-colors select-none touch-none`}
      >
        <span className="text-3xl sm:text-4xl font-black mb-2">{face.title}</span>
        {face.sub && <span className="text-sm text-white/70 px-6 text-center">{face.sub}</span>}
      </button>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <Stat label="이번 기록" value={last ? `${last}ms` : '—'} accent="text-emerald-600" />
        <Stat label={`평균 (${times.length}회)`} value={avg ? `${avg}ms` : '—'} />
        <Stat label="가장 빠름" value={fastest ? `${fastest}ms` : '—'} />
        <Stat label="최고 기록" value={best ? `${best}ms` : '—'} accent="text-indigo-600" />
      </div>

      {done && (
        <>
          <Grade
            text={
              avg < 200 ? `평균 ${avg}ms — 상위권입니다` :
              avg < 250 ? `평균 ${avg}ms — 평균보다 빠릅니다` :
              avg < 320 ? `평균 ${avg}ms — 보통입니다` :
              `평균 ${avg}ms — 조금 느립니다. 화면을 응시하고 다시 해보세요`
            }
            tone={avg < 250 ? 'good' : avg < 320 ? 'normal' : 'bad'}
          />
          <button
            onClick={() => { setTimes([]); setLast(0); setPhase('idle'); }}
            className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-emerald-300 transition-colors"
          >
            처음부터 다시
          </button>
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">사람의 반응속도는</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          빛을 보고 반응하는 데는 보통 200~250ms가 걸립니다. 눈이 신호를 받아 뇌가 판단하고 손가락까지
          명령이 가는 시간이라, 아무리 연습해도 100ms 아래로는 내려가기 어렵습니다. 화면 주사율과 마우스
          지연도 20~30ms쯤 더해집니다.
        </p>
      </div>
    </div>
  );
}
