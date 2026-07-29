'use client';
import { useMemo, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';

/**
 * 타자 연습 — 분당 타수와 정확도.
 *
 * 한글 타수는 글자 수가 아니라 자판을 누른 횟수로 센다. "한"은 ㅎ+ㅏ+ㄴ 세 번을
 * 눌러야 하므로 3타다. 글자 수로 세면 영문 타수와 비교가 되지 않는다.
 */
import { toJamo } from '@/lib/hangul';
import { GAME_COMMON, TYPING_UI, type GameLang } from '@/lib/game-ui-intl';

/*
  세는 단위가 언어마다 다르다. 한글은 자판을 누른 횟수로 세므로 '한'이 3타지만,
  영어·중국어는 글자 수로 센다 — 그쪽 자판에서는 한 글자가 한 번이기 때문이다.
*/
const strokes = (text: string, countJamo: boolean) => (countJamo ? toJamo(text).length : text.length);

export default function TypingGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = TYPING_UI[lang];
  const c = GAME_COMMON[lang];
  const strokesOf = (text: string) => strokes(text, ui.countStrokes);
  // 한글 타수는 자모 단위라 숫자가 크다 — 등급 경계도 그만큼 높다
  const fastAt = ui.countStrokes ? 500 : 300;
  const goodAt = ui.countStrokes ? 300 : 180;
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [cpm, setCpm] = useState(0);
  const [records, setRecords] = useState<{ cpm: number; acc: number }[]>([]);
  const startedAt = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { best, submit } = useBest('typing', higher);

  const target = ui.sentences[index % ui.sentences.length];

  const correct = useMemo(() => {
    let n = 0;
    for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) n++;
    return n;
  }, [typed, target]);

  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;

  /*
    시간은 렌더가 아니라 입력 순간에 읽는다. performance.now()를 렌더에서 부르면
    같은 상태에서 매번 다른 값이 나와 화면이 순수하지 않게 된다.
  */
  const onType = (value: string) => {
    const now = performance.now();
    if (!startedAt.current) startedAt.current = now;
    setTyped(value);

    const elapsed = (now - startedAt.current) / 1000;
    if (elapsed > 0.2) setCpm(Math.round((strokesOf(value) / elapsed) * 60));

    if (value === target) {
      const acc = value.length ? Math.round(([...value].filter((c, i) => c === target[i]).length / value.length) * 100) : 0;
      const finalCpm = elapsed > 0 ? Math.round((strokesOf(target) / elapsed) * 60) : 0;
      setRecords(prev => [...prev, { cpm: finalCpm, acc }]);
      submit(finalCpm);
      setIndex(i => i + 1);
      setTyped('');
      setCpm(0);
      startedAt.current = 0;
    }
  };

  const avgCpm = records.length ? Math.round(records.reduce((a, r) => a + r.cpm, 0) / records.length) : 0;
  const avgAcc = records.length ? Math.round(records.reduce((a, r) => a + r.acc, 0) / records.length) : 0;

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-5">
        <p className="text-lg sm:text-xl leading-relaxed font-bold tracking-tight">
          {[...target].map((ch, i) => {
            const state = i >= typed.length ? 'rest' : typed[i] === ch ? 'ok' : 'bad';
            return (
              <span
                key={i}
                className={
                  state === 'ok' ? 'text-emerald-600'
                  : state === 'bad' ? 'text-rose-500 underline decoration-2'
                  : 'text-slate-300 dark:text-slate-600'
                }
              >
                {ch}
              </span>
            );
          })}
        </p>
      </div>

      <input
        ref={inputRef}
        value={typed}
        onChange={e => onType(e.target.value)}
        placeholder={ui.placeholder}
        autoComplete="off"
        className="mt-3 w-full rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5 text-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-violet-400 transition-colors"
      />

      <div className="grid grid-cols-4 gap-2 mt-4">
        <Stat label={ui.currentSpeed} value={cpm || '—'} accent="text-violet-600" />
        <Stat label={c.accuracy} value={`${accuracy}%`} accent="text-fuchsia-600" />
        <Stat label={ui.avgOf(records.length)} value={avgCpm || '—'} />
        <Stat label={ui.bestSpeed} value={best ?? '—'} accent="text-indigo-600" />
      </div>

      {records.length > 0 && (
        <Grade
          text={
            avgCpm >= fastAt ? ui.gradeFast(avgCpm, avgAcc) :
            avgCpm >= goodAt ? ui.gradeGood(avgCpm, avgAcc) :
            ui.gradeSlow(avgCpm, avgAcc)
          }
          tone={avgCpm >= 300 ? 'good' : 'normal'}
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
