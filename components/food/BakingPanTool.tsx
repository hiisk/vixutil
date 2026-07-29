'use client';
import { useMemo, useState } from 'react';
import { panScale, rectArea, roundArea } from '@/lib/food';
import { CARD, NumberField, Result, Stat } from './ui';

type Shape = 'round' | 'rect';

function Pan({
  title, shape, setShape, a, setA, b, setB,
}: {
  title: string; shape: Shape; setShape: (s: Shape) => void;
  a: number; setA: (n: number) => void; b: number; setB: (n: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{title}</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {([['round', '원형'], ['rect', '사각']] as const).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setShape(v)}
            className={`rounded-xl border py-2 text-sm font-bold transition-colors ${
              shape === v
                ? 'border-pink-300 bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {shape === 'round' ? (
        <NumberField label="지름" value={a} onChange={setA} unit="cm" step={1} min={5} />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <NumberField label="가로" value={a} onChange={setA} unit="cm" step={1} min={5} />
          <NumberField label="세로" value={b} onChange={setB} unit="cm" step={1} min={5} />
        </div>
      )}
    </div>
  );
}

export default function BakingPanTool() {
  const [fromShape, setFromShape] = useState<Shape>('round');
  const [fromA, setFromA] = useState(15);
  const [fromB, setFromB] = useState(15);
  const [toShape, setToShape] = useState<Shape>('rect');
  const [toA, setToA] = useState(18);
  const [toB, setToB] = useState(18);

  const { fromArea, toArea, scale } = useMemo(() => {
    const f = fromShape === 'round' ? roundArea(fromA) : rectArea(fromA, fromB);
    const t = toShape === 'round' ? roundArea(toA) : rectArea(toA, toB);
    return { fromArea: Math.round(f), toArea: Math.round(t), scale: panScale(f, t) };
  }, [fromShape, fromA, fromB, toShape, toA, toB]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Pan title="레시피의 틀" shape={fromShape} setShape={setFromShape} a={fromA} setA={setFromA} b={fromB} setB={setFromB} />
        <Pan title="내가 쓸 틀" shape={toShape} setShape={setToShape} a={toA} setA={setToA} b={toB} setB={setToB} />
      </div>

      <Result sub={`넓이 ${fromArea}cm² → ${toArea}cm²`}>
        반죽 {scale}<span className="text-xl ml-1">배</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label="레시피 틀 넓이" value={`${fromArea}cm²`} />
        <Stat label="내 틀 넓이" value={`${toArea}cm²`} accent="text-pink-600" />
        <Stat label="반죽 배율" value={`${scale}배`} accent="text-fuchsia-600" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">굽는 시간도 조정하세요</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {scale > 1.15
            ? '틀이 커져 반죽이 얇게 퍼지면 더 빨리 익습니다. 원래 시간의 80% 지점에서 확인해 보세요.'
            : scale < 0.85
              ? '틀이 작아 반죽이 두꺼워지면 속이 덜 익기 쉽습니다. 온도를 10도 낮추고 시간을 늘리세요.'
              : '넓이가 비슷해 시간은 거의 그대로 두면 됩니다.'}
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          넓이 비율로 계산하므로 틀 높이가 비슷할 때 맞습니다. 깊이가 크게 다르면 반죽 두께가 달라져
          굽는 시간이 많이 바뀝니다. 반죽은 틀의 60~70%까지만 채우세요.
        </p>
      </div>
    </div>
  );
}
