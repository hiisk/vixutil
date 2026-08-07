'use client';
import { useEffect, useRef, useState } from 'react';
import { CARD, Grade, PlayButton, Stat, higher, useBest } from './ui';
import { beatScore, type BeatScore } from '@/lib/game-more';
import { GAME_MORE_UI } from '@/lib/game-more-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 박자 맞추기 — 소리에 맞춰 누르고, 소리가 멈춘 뒤에도 이어간다.
 *
 * 채점은 lib/game-more.ts의 beatScore가 한다. **평균 오차와 고름을 함께 본다** —
 * 평균만 보면 늘 30ms씩 늦는 사람과 한 번은 100 빠르고 한 번은 100 늦는 사람이
 * 같은 점수를 받는데, 박자 감각은 뒤쪽이 훨씬 나쁘다.
 */
const TEMPOS = [80, 100, 120];
const LEAD = 4;   // 소리가 나는 박
const TAPS = 8;   // 재는 박

export default function BeatGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = GAME_MORE_UI[lang];
  const [bpm, setBpm] = useState(100);
  const [phase, setPhase] = useState<'idle' | 'lead' | 'tap' | 'done'>('idle');
  const [beat, setBeat] = useState(0);
  const [result, setResult] = useState<BeatScore | null>(null);
  const { best, submit } = useBest('beat', higher);

  const startAt = useRef(0);
  const taps = useRef<number[]>([]);
  const timer = useRef<number | null>(null);
  const audio = useRef<AudioContext | null>(null);

  const interval = 60000 / bpm;

  useEffect(() => () => {
    if (timer.current) window.clearInterval(timer.current);
    audio.current?.close().catch(() => {});
  }, []);

  const click = () => {
    try {
      audio.current ??= new AudioContext();
      const ctx = audio.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // 소리를 못 내도 게임은 굴러간다 — 화면 깜빡임이 대신 박을 알려 준다
    }
  };

  const start = () => {
    taps.current = [];
    setResult(null);
    setBeat(0);
    setPhase('lead');
    startAt.current = performance.now();
    let n = 0;
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      n += 1;
      setBeat(n);
      if (n <= LEAD) click();
      if (n === LEAD) setPhase('tap');
      if (n >= LEAD + TAPS) {
        if (timer.current) window.clearInterval(timer.current);
        // 마지막 박이 지난 뒤 잠깐 기다렸다 채점한다 — 마지막 탭이 늦게 올 수 있다
        window.setTimeout(() => {
          const s = beatScore(taps.current, interval, startAt.current + interval * LEAD);
          setResult(s);
          submit(s.score);
          setPhase('done');
        }, interval);
      }
    }, interval);
  };

  const tap = () => {
    if (phase !== 'tap') return;
    if (taps.current.length < TAPS) taps.current.push(performance.now());
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Stat label={ui.bpm} value={bpm} />
        <Stat label={ui.score} value={result ? result.score : '—'} accent="text-emerald-600" />
        <Stat label={ui.best} value={best ?? '—'} />
      </div>

      {phase === 'idle' && (
        <div className="flex gap-2 mb-4">
          {TEMPOS.map(v => (
            <button
              key={v}
              onClick={() => setBpm(v)}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                bpm === v
                  ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-200'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={tap}
        disabled={phase !== 'tap'}
        className={`${CARD} w-full min-h-[14rem] flex items-center justify-center transition-colors ${
          phase === 'tap' ? '!border-amber-300 active:!bg-amber-50 dark:active:!bg-amber-950/40' : ''
        }`}
      >
        {phase === 'done' && result ? (
          <div className="text-center">
            <Grade text={`${result.score}점`} tone={result.score >= 70 ? 'good' : result.score >= 40 ? 'normal' : 'bad'} />
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {ui.avgOff} {Math.round(result.meanAbs)}ms · {ui.evenness} ±{Math.round(result.stdev)}ms
            </p>
          </div>
        ) : phase === 'idle' ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center px-6">{ui.beatHow}</p>
        ) : (
          <div className="text-center">
            <span
              className={`block w-16 h-16 mx-auto rounded-full transition-all ${
                beat % 2 === 0 ? 'bg-amber-400 scale-110' : 'bg-slate-200 dark:bg-slate-700 scale-100'
              }`}
            />
            <p className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              {phase === 'tap' ? `${ui.tapHere} ${taps.current.length}/${TAPS}` : '…'}
            </p>
          </div>
        )}
      </button>

      {(phase === 'idle' || phase === 'done') && (
        <div className="mt-4"><PlayButton onClick={start}>{phase === 'done' ? ui.again : ui.start}</PlayButton></div>
      )}
    </div>
  );
}
