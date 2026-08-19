'use client';
import { useMemo, useState } from 'react';
import { panScale, rectArea, roundArea } from '@/lib/food';
import { CARD, NumberField, Result, Stat } from './ui';
import { PAN_UI, type FoodLang } from '@/lib/food-ui-intl';

type Shape = 'round' | 'rect';

function Pan({
  title, shape, setShape, a, setA, b, setB, lang,
}: {
  title: string; shape: Shape; setShape: (s: Shape) => void;
  a: number; setA: (n: number) => void; b: number; setB: (n: number) => void;
  lang: FoodLang;
}) {
  const ui = PAN_UI[lang];
  return (
    <div className="rounded-lg border chip-off p-4">
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{title}</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {(['round', 'rect'] as const).map((v, i) => (
          <button
            key={v}
            onClick={() => setShape(v)}
            className={`rounded-xl border py-2 text-sm font-bold transition-colors ${
              shape === v
                ? 'border-pink-300 bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.shapes[i]}
          </button>
        ))}
      </div>
      {shape === 'round' ? (
        <NumberField label={ui.diameter} value={a} onChange={setA} unit="cm" step={1} min={5} />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <NumberField label={ui.width} value={a} onChange={setA} unit="cm" step={1} min={5} />
          <NumberField label={ui.height} value={b} onChange={setB} unit="cm" step={1} min={5} />
        </div>
      )}
    </div>
  );
}

export default function BakingPanTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = PAN_UI[lang];
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
        <Pan lang={lang} title={ui.fromTitle} shape={fromShape} setShape={setFromShape} a={fromA} setA={setFromA} b={fromB} setB={setFromB} />
        <Pan lang={lang} title={ui.toTitle} shape={toShape} setShape={setToShape} a={toA} setA={setToA} b={toB} setB={setToB} />
      </div>

      <Result sub={ui.areaSub(fromArea, toArea)}>
        {ui.batter} {scale}<span className="text-xl ml-1">{ui.timesUnit}</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label={ui.fromArea} value={`${fromArea}cm²`} />
        <Stat label={ui.toArea} value={`${toArea}cm²`} accent="text-pink-600" />
        <Stat label={ui.scaleStat} value={ui.timesSuffix(scale)} accent="text-fuchsia-600" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.timeTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {scale > 1.15
            ? ui.timeBigger
            : scale < 0.85
              ? ui.timeSmaller
              : ui.timeSame}
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
