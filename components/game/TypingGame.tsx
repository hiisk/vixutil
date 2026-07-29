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

const SENTENCES = [
  '오늘도 좋은 하루 되세요',
  '한글 타자 연습을 시작합니다',
  '천 리 길도 한 걸음부터 시작된다',
  '바람이 불어오는 곳 그곳으로 가네',
  '작은 습관이 큰 변화를 만든다',
  '노력은 배신하지 않는다고 믿는다',
  '가는 말이 고와야 오는 말이 곱다',
  '오늘 할 일을 내일로 미루지 말자',
];

const strokes = (text: string) => toJamo(text).length;

export default function TypingGame() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [cpm, setCpm] = useState(0);
  const [records, setRecords] = useState<{ cpm: number; acc: number }[]>([]);
  const startedAt = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { best, submit } = useBest('typing', higher);

  const target = SENTENCES[index % SENTENCES.length];

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
    if (elapsed > 0.2) setCpm(Math.round((strokes(value) / elapsed) * 60));

    if (value === target) {
      const acc = value.length ? Math.round(([...value].filter((c, i) => c === target[i]).length / value.length) * 100) : 0;
      const finalCpm = elapsed > 0 ? Math.round((strokes(target) / elapsed) * 60) : 0;
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
        placeholder="여기에 위 문장을 그대로 치세요"
        autoComplete="off"
        className="mt-3 w-full rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5 text-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-violet-400 transition-colors"
      />

      <div className="grid grid-cols-4 gap-2 mt-4">
        <Stat label="현재 타수" value={cpm || '—'} accent="text-violet-600" />
        <Stat label="정확도" value={`${accuracy}%`} accent="text-fuchsia-600" />
        <Stat label={`평균 (${records.length}문장)`} value={avgCpm || '—'} />
        <Stat label="최고 타수" value={best ?? '—'} accent="text-indigo-600" />
      </div>

      {records.length > 0 && (
        <Grade
          text={
            avgCpm >= 500 ? `평균 ${avgCpm}타 · 정확도 ${avgAcc}% — 아주 빠릅니다` :
            avgCpm >= 300 ? `평균 ${avgCpm}타 · 정확도 ${avgAcc}% — 평균 이상입니다` :
            `평균 ${avgCpm}타 · 정확도 ${avgAcc}% — 속도보다 정확도를 먼저 올리세요`
          }
          tone={avgCpm >= 300 ? 'good' : 'normal'}
        />
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          한글 타수는 자판을 누른 횟수로 셉니다 — &lsquo;한&rsquo;은 ㅎ·ㅏ·ㄴ 세 번이라 3타입니다. 성인 평균은
          200~300타, 300타를 넘으면 빠른 편입니다. 정확도가 95% 아래라면 속도를 조금 늦추는 편이
          결과적으로 더 빠릅니다.
        </p>
      </div>
    </div>
  );
}
