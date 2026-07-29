'use client';
import { useCallback, useEffect, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';

/**
 * 색 구분 — 같은 색 사이에 섞인 다른 색 하나를 찾는다.
 *
 * 단계마다 색 차이를 줄이고 칸 수를 늘린다. 차이는 명도(L)만 건드린다 —
 * 색상(H)을 흔들면 색약이 있는 사람에게만 유난히 어려워져서, 이 게임이
 * 재려는 "미세한 차이 구별"과 다른 것을 재게 된다.
 */
const START_DIFF = 34;

export default function ColorBlindGame() {
  const [level, setLevel] = useState(1);
  const [tiles, setTiles] = useState(4);
  const [odd, setOdd] = useState(0);
  const [base, setBase] = useState({ h: 210, s: 65, l: 55 });
  const [diff, setDiff] = useState(START_DIFF);
  const [over, setOver] = useState(false);
  const { best, submit } = useBest('color-blind', higher);

  const setup = useCallback((lv: number) => {
    const grid = lv < 3 ? 2 : lv < 6 ? 3 : lv < 12 ? 4 : 5;
    setTiles(grid);
    setOdd(Math.floor(Math.random() * grid * grid));
    setBase({ h: Math.floor(Math.random() * 360), s: 55 + Math.floor(Math.random() * 25), l: 45 + Math.floor(Math.random() * 20) });
    // 차이는 단계마다 줄지만 0.6% 아래로는 내리지 않는다 — 화면이 표현하지 못한다
    setDiff(Math.max(0.6, START_DIFF * Math.pow(0.82, lv - 1)));
  }, []);

  // 색은 난수로 정하므로 렌더 중에 만들 수 없다(서버와 값이 달라진다)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setup(1), [setup]);

  const tap = (i: number) => {
    if (over) return;
    if (i === odd) {
      const lv = level + 1;
      setLevel(lv);
      setup(lv);
    } else {
      submit(level - 1);
      setOver(true);
    }
  };

  const restart = () => { setLevel(1); setOver(false); setup(1); };

  return (
    <div>
      <div
        className="grid gap-2 max-w-sm mx-auto"
        style={{ gridTemplateColumns: `repeat(${tiles}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: tiles * tiles }, (_, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            aria-label={`${i + 1}번 색`}
            className={`aspect-square rounded-xl transition-transform active:scale-95 ${
              over && i === odd ? 'ring-4 ring-white dark:ring-slate-900 outline outline-2 outline-emerald-500' : ''
            }`}
            style={{
              background: `hsl(${base.h} ${base.s}% ${i === odd ? base.l + diff : base.l}%)`,
            }}
          />
        ))}
      </div>

      <p className="text-center text-sm font-bold mt-4 text-slate-600 dark:text-slate-300">
        {over ? `${level - 1}단계에서 끝났습니다 — 정답은 표시된 칸입니다` : '색이 다른 칸 하나를 찾아 누르세요'}
      </p>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label="단계" value={level} accent="text-fuchsia-600" />
        <Stat label="색 차이" value={`${diff.toFixed(1)}%`} />
        <Stat label="최고 단계" value={best ?? '—'} accent="text-violet-600" />
      </div>

      {over && (
        <>
          <Grade
            text={
              level - 1 >= 14 ? `${level - 1}단계 — 아주 예민한 눈입니다` :
              level - 1 >= 9 ? `${level - 1}단계 — 평균 이상입니다` :
              `${level - 1}단계 — 화면 밝기를 올리고 다시 해보세요`
            }
            tone={level - 1 >= 9 ? 'good' : 'normal'}
          />
          <button
            onClick={restart}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
          >
            다시 도전
          </button>
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">색약 검사가 아닙니다</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          이 게임은 명도 차이를 구별하는 능력을 봅니다. 색약·색맹 여부는 이시하라 검사처럼 특정 색 조합을
          쓰는 검사로만 알 수 있고, 정확한 판정은 안과에서 받아야 합니다. 결과는 화면 품질과 밝기, 주변
          조명에 따라서도 크게 달라집니다.
        </p>
      </div>
    </div>
  );
}
