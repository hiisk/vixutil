'use client';
import { useMemo, useState } from 'react';
import { harmony, hexToHsl, hslToHex, type Harmony } from '@/lib/color';
import { CARD, ColorInput, Swatch, useCopy } from './ui';
import { PALETTE_UI, type ColorLang } from '@/lib/color-ui-intl';

const KINDS: Harmony[] = ['complementary', 'analogous', 'triadic', 'tetradic', 'monochrome'];

export default function PaletteTool({ lang = 'ko' }: { lang?: ColorLang } = {}) {
  const ui = PALETTE_UI[lang];
  const [base, setBase] = useState('#3b82f6');
  const [kind, setKind] = useState<Harmony>('analogous');
  const { copied, copy } = useCopy();

  const colors = useMemo(() => {
    const hsl = hexToHsl(base);
    if (!hsl) return [];
    return harmony(hsl, kind).map(hslToHex);
  }, [base, kind]);

  const css = colors.map((c, i) => `  --color-${i + 1}: ${c.toUpperCase()};`).join('\n');

  return (
    <div>
      <ColorInput value={base} onChange={setBase} label={ui.baseColor} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
        {KINDS.map(k => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors ${
              kind === k
                ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-violet-200'
            }`}
          >
            {ui.schemes[k]}
          </button>
        ))}
      </div>

      <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: `repeat(${Math.min(colors.length, 5)}, minmax(0, 1fr))` }}>
        {colors.map((c, i) => (
          <Swatch key={`${c}-${i}`} hex={c} height="h-28" lang={lang} />
        ))}
      </div>

      <button
        onClick={() => copy(`:root {\n${css}\n}`)}
        className="mt-3 w-full rounded-xl bg-sec font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
      >
        {copied ? ui.copiedCss : ui.copyCss}
      </button>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.schemes[kind]}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.notes[kind]}</p>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.ratioNote}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.ratioBody}
        </p>
      </div>
    </div>
  );
}
