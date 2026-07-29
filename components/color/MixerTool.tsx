'use client';
import { useMemo, useState } from 'react';
import { hexToRgb, rgbToHex, mix, judgeContrast } from '@/lib/color';
import { CARD, ColorInput, Swatch, ValueRow } from './ui';
import { MIXER_UI, type ColorLang } from '@/lib/color-ui-intl';

export default function MixerTool({ lang = 'ko' }: { lang?: ColorLang } = {}) {
  const ui = MIXER_UI[lang];
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
        <ColorInput value={a} onChange={setA} label={ui.first} />
        <ColorInput value={b} onChange={setB} label={ui.second} />
      </div>

      <div className="mt-4 h-28 rounded-2xl border border-slate-200 dark:border-slate-700" style={{ background: hex }} />

      <div className="mt-4">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.ratio}</span>
          <span className="text-sm font-black text-teal-600 tabular-nums">{100 - ratio}% : {ratio}%</span>
        </div>
        <input
          type="range" min={0} max={100} value={ratio}
          onChange={e => setRatio(Number(e.target.value))}
          className="w-full accent-teal-500" aria-label={ui.ratio}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <ValueRow label="HEX" value={hex.toUpperCase()} />
        {blended && <ValueRow label="RGB" value={`rgb(${blended.r}, ${blended.g}, ${blended.b})`} />}
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">{ui.stepsNote}</p>
      <div className="grid grid-cols-9 gap-1.5">
        {steps.map((s, i) => (
          <Swatch key={i} hex={s} height="h-14" />
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note(onWhite.toFixed(1))}
        </p>
      </div>
    </div>
  );
}
