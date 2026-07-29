'use client';
import { useCallback, useState } from 'react';
import { audioContext, noteToFrequency } from '@/lib/audio';
import { CARD, Stat } from './ui';
import { PITCH_UI, type SoundLang } from '@/lib/sound-ui-intl';

/**
 * 음정 듣기 훈련 — 두 음 사이의 간격을 맞힌다.
 *
 * 절대음감을 묻지 않는다. 기준음을 매번 무작위로 바꾸므로 "그 음이 무엇인지"가
 * 아니라 "둘 사이가 얼마나 벌어졌는지"만으로 답해야 한다 — 그게 상대음감이고,
 * 연습으로 늘릴 수 있는 쪽이다.
 */
const INTERVALS = [
  { semi: 1 }, { semi: 2 }, { semi: 3 },
  { semi: 4 }, { semi: 5 }, { semi: 7 },
  { semi: 8 }, { semi: 9 }, { semi: 10 },
  { semi: 11 }, { semi: 12 },
];

const LEVELS = {
  easy: { set: [4, 5, 7, 12] },
  normal: { set: [2, 3, 4, 5, 7, 9, 12] },
  hard: { set: INTERVALS.map(i => i.semi) },
} as const;
type LevelKey = keyof typeof LEVELS;

/** 렌더 밖에서 난수를 쓴다 */
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function PitchTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = PITCH_UI[lang];
  const [level, setLevel] = useState<LevelKey>('easy');
  const [question, setQuestion] = useState<{ root: number; semi: number } | null>(null);
  const [answered, setAnswered] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0, streak: 0 });

  const playPair = useCallback((root: number, semi: number) => {
    const ctx = audioContext();
    [0, semi].forEach((offset, i) => {
      const at = ctx.currentTime + i * 0.7;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = noteToFrequency(root + offset);
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(0.3, at + 0.02);
      gain.gain.linearRampToValueAtTime(0, at + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start(at);
      osc.stop(at + 0.65);
    });
  }, []);

  const next = () => {
    // 기준음을 매번 바꾼다 — 절대음감이 아니라 간격을 듣게 하려는 것
    const root = 55 + Math.floor(Math.random() * 15);
    const semi = pick([...LEVELS[level].set]);
    setQuestion({ root, semi });
    setAnswered(null);
    playPair(root, semi);
  };

  const answer = (semi: number) => {
    if (!question || answered !== null) return;
    setAnswered(semi);
    const correct = semi === question.semi;
    setScore(s => ({
      right: s.right + (correct ? 1 : 0),
      total: s.total + 1,
      streak: correct ? s.streak + 1 : 0,
    }));
  };

  const options = INTERVALS.filter(i => (LEVELS[level].set as readonly number[]).includes(i.semi));
  const rate = score.total ? Math.round((score.right / score.total) * 100) : 0;

  return (
    <div>
      <div className="rounded-2xl bg-slate-900 px-6 py-10 text-center">
        {question ? (
          <>
            <p className="text-sm text-white/60 mb-3">{ui.askInterval}</p>
            <button
              onClick={() => playPair(question.root, question.semi)}
              className="rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-white font-bold text-sm hover:bg-white/20 transition-colors"
            >
              {ui.replay}
            </button>
            {answered !== null && (
              <p className={`mt-4 text-lg font-black ${answered === question.semi ? 'text-emerald-400' : 'text-rose-400'}`}>
                {answered === question.semi ? ui.correct : `${ui.wrongPrefix}${ui.intervals[INTERVALS.findIndex(i => i.semi === question.semi)]}`}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl font-black text-white mb-1">{ui.introTitle}</p>
            <p className="text-sm text-white/60">{ui.introNote}</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {(Object.keys(LEVELS) as LevelKey[]).map((k, i) => (
          <button
            key={k}
            onClick={() => setLevel(k)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              level === k
                ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.levels[i]}
          </button>
        ))}
      </div>

      {question && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
          {options.map(i => (
            <button
              key={i.semi}
              onClick={() => answer(i.semi)}
              disabled={answered !== null}
              className={`rounded-xl border py-2.5 text-xs font-bold transition-colors disabled:opacity-60 ${
                answered !== null && i.semi === question.semi
                  ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700'
                  : answered === i.semi
                    ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-700'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {ui.intervals[INTERVALS.findIndex(x => x.semi === i.semi)]}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={next}
        className="mt-3 w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
      >
        {question ? ui.next : ui.start}
      </button>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.scoreLabel} value={`${score.right}/${score.total}`} accent="text-violet-600" />
        <Stat label={ui.rateLabel} value={`${rate}%`} accent="text-fuchsia-600" />
        <Stat label={ui.streakLabel} value={score.streak} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
