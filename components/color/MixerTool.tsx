'use client';
import { useMemo, useState } from 'react';
import { hexToRgb, rgbToHex, mix, judgeContrast } from '@/lib/color';
import { CARD, ColorInput, Swatch, ValueRow } from './ui';

export default function MixerTool() {
  const [a, setA] = useState('#3b82f6');
  const [b, setB] = useState('#f43f5e');
  const [ratio, setRatio] = useState(50);

  const { blended, steps } = useMemo(() => {
    const ra = hexToRgb(a), rb = hexToRgb(b);
    if (!ra || !rb) return { blended: null, steps: [] };
    return {
      blended: mix(ra, rb, ratio / 100),
      steps: Array.from({ length: 9 }, (_, i) => rgbToHex(mix(ra, rb, (i + 1) / 10))),
    };
  }, [a, b, ratio]);

  const hex = blended ? rgbToHex(blended) : '#000000';
  const onWhite = blended ? judgeContrast(blended, { r: 255, g: 255, b: 255 }).ratio : 0;

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <ColorInput value={a} onChange={setA} label="첫 번째 색" />
        <ColorInput value={b} onChange={setB} label="두 번째 색" />
      </div>

      <div className="mt-4 h-28 rounded-2xl border border-slate-200 dark:border-slate-700" style={{ background: hex }} />

      <div className="mt-4">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">섞는 비율</span>
          <span className="text-sm font-black text-teal-600 tabular-nums">{100 - ratio}% : {ratio}%</span>
        </div>
        <input
          type="range" min={0} max={100} value={ratio}
          onChange={e => setRatio(Number(e.target.value))}
          className="w-full accent-teal-500" aria-label="섞는 비율"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <ValueRow label="HEX" value={hex.toUpperCase()} />
        {blended && <ValueRow label="RGB" value={`rgb(${blended.r}, ${blended.g}, ${blended.b})`} />}
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">10% 간격 중간 단계</p>
      <div className="grid grid-cols-9 gap-1.5">
        {steps.map((s, i) => (
          <Swatch key={i} hex={s} height="h-14" />
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          섞인 색은 흰 배경에서 대비 {onWhite.toFixed(1)}:1입니다. 두 색을 반씩 섞으면 채도가 떨어져
          탁해지는 경우가 많은데, 이때는 한쪽을 70% 이상으로 기울이면 색이 살아납니다.
        </p>
      </div>
    </div>
  );
}
