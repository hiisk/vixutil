'use client';
import { useMemo, useState } from 'react';
import { harmony, hexToHsl, hslToHex, HARMONY_LABEL, type Harmony } from '@/lib/color';
import { CARD, ColorInput, Swatch, useCopy } from './ui';

const KINDS: Harmony[] = ['complementary', 'analogous', 'triadic', 'tetradic', 'monochrome'];

const WHY: Record<Harmony, string> = {
  complementary: '색상환에서 정반대에 있는 색입니다. 대비가 가장 강해 강조색으로 좋지만, 넓은 면적에 반반 쓰면 눈이 피로합니다.',
  analogous: '색상환에서 이웃한 색입니다. 자연스럽고 편안해 배경과 본문처럼 넓은 면적에 어울립니다.',
  triadic: '색상환을 셋으로 나눈 색입니다. 화사하면서 균형이 잡혀 일러스트나 브랜드 배색에 자주 쓰입니다.',
  tetradic: '색상환을 넷으로 나눈 색입니다. 쓸 수 있는 색이 많지만 그만큼 어수선해지기 쉬워 한 색을 주인공으로 정해야 합니다.',
  monochrome: '색상은 그대로 두고 밝기만 바꾼 것입니다. 실패할 일이 거의 없어 화면 하나를 한 색 계열로 묶을 때 씁니다.',
};

export default function PaletteTool() {
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
      <ColorInput value={base} onChange={setBase} label="기준 색" />

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
            {HARMONY_LABEL[k]}
          </button>
        ))}
      </div>

      <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: `repeat(${Math.min(colors.length, 5)}, minmax(0, 1fr))` }}>
        {colors.map((c, i) => (
          <Swatch key={`${c}-${i}`} hex={c} height="h-28" />
        ))}
      </div>

      <button
        onClick={() => copy(`:root {\n${css}\n}`)}
        className="mt-3 w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
      >
        {copied ? '✅ CSS 변수로 복사했습니다' : 'CSS 변수로 한 번에 복사'}
      </button>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{HARMONY_LABEL[kind]}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{WHY[kind]}</p>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">배색 비율 60:30:10</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          색을 고른 다음이 더 중요합니다. 넓은 배경에 60%, 보조 색에 30%, 강조에 10%로 쓰면
          같은 색 조합이라도 훨씬 정돈돼 보입니다. 강조색을 30% 넘게 쓰면 강조가 아니게 됩니다.
        </p>
      </div>
    </div>
  );
}
