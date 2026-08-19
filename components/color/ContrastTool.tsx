'use client';
import { useMemo, useState } from 'react';
import { hexToRgb, hexToHsl, hslToHex, judgeContrast } from '@/lib/color';
import { CARD, ColorInput } from './ui';
import { CONTRAST_UI, type ColorLang } from '@/lib/color-ui-intl';

/**
 * 대비 검사 — 배경과 글자색이 접근성 기준을 넘는지.
 *
 * "통과할 때까지 밝기 조절"이 이 도구의 핵심이다. 기준에 걸렸다는 말만
 * 들으면 사람은 결국 감으로 색을 흔들게 되는데, 색상은 그대로 두고 명도만
 * 옮기면 브랜드 색을 지키면서 기준을 넘길 수 있다.
 */
const BADGES = [
  { key: 'aaNormal', labelKey: 'aaBody', need: '4.5:1' },
  { key: 'aaLarge', labelKey: 'aaLarge', need: '3:1' },
  { key: 'aaaNormal', labelKey: 'aaaBody', need: '7:1' },
  { key: 'aaaLarge', labelKey: 'aaaLarge', need: '4.5:1' },
] as const;

export default function ContrastTool({ lang = 'ko' }: { lang?: ColorLang } = {}) {
  const ui = CONTRAST_UI[lang];
  const [bg, setBg] = useState('#3b82f6');
  const [fg, setFg] = useState('#ffffff');

  const verdict = useMemo(() => {
    const a = hexToRgb(bg), b = hexToRgb(fg);
    if (!a || !b) return null;
    return judgeContrast(a, b);
  }, [bg, fg]);

  /** 글자색의 명도만 옮겨 AA를 넘기는 가장 가까운 색을 찾는다 */
  const suggest = () => {
    const hsl = hexToHsl(fg);
    const bgRgb = hexToRgb(bg);
    if (!hsl || !bgRgb) return;
    let bestHex = fg;
    let bestGap = Infinity;
    for (let l = 0; l <= 100; l++) {
      const hex = hslToHex({ ...hsl, l });
      const r = judgeContrast(bgRgb, hexToRgb(hex)!);
      if (r.aaNormal) {
        const gap = Math.abs(l - hsl.l);
        if (gap < bestGap) { bestGap = gap; bestHex = hex; }
      }
    }
    setFg(bestHex);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <ColorInput value={bg} onChange={setBg} label={ui.bgColor} />
        <ColorInput value={fg} onChange={setFg} label={ui.textColor} />
      </div>

      <div className="mt-4 rounded-2xl p-6 border border-slate-200 dark:border-slate-700" style={{ background: bg, color: fg }}>
        <p className="text-2xl font-black mb-2">{ui.previewH}</p>
        <p className="text-base mb-1">{ui.previewBody}</p>
        <p className="text-xs opacity-90">{ui.previewSmall}</p>
      </div>

      {verdict && (
        <>
          <div className="mt-4 rounded-2xl border chip-off p-5 text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">{ui.ratio}</p>
            <p className={`text-5xl font-black tabular-nums ${verdict.aaNormal ? 'text-emerald-600' : 'text-rose-500'}`}>
              {verdict.ratio}
              <span className="text-2xl text-slate-400 dark:text-slate-500"> : 1</span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {verdict.aaaNormal ? ui.verdictBest
                : verdict.aaNormal ? ui.verdictBody
                : verdict.aaLarge ? ui.verdictLarge
                : ui.verdictFail}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {BADGES.map(b => (
              <div
                key={b.key}
                className={`rounded-xl border px-3 py-3 text-center ${
                  verdict[b.key]
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30'
                }`}
              >
                <p className={`text-lg font-black ${verdict[b.key] ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {verdict[b.key] ? ui.pass : ui.fail}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ui[b.labelKey as 'aaBody' | 'aaLarge' | 'aaaBody' | 'aaaLarge']}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{b.need}</p>
              </div>
            ))}
          </div>

          {!verdict.aaNormal && (
            <button
              onClick={suggest}
              className="mt-3 w-full rounded-xl bg-sec font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
            >
              {ui.autoFix}
            </button>
          )}
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.meaningTitle}</p>
        <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>· <b className="text-slate-800 dark:text-slate-100">AA 4.5:1</b>{ui.aaNote}</li>
          <li>· <b className="text-slate-800 dark:text-slate-100">3:1</b>{ui.largeNote}</li>
          <li>· <b className="text-slate-800 dark:text-slate-100">AAA 7:1</b>{ui.aaaNote}</li>
          <li className="text-slate-500 dark:text-slate-400">{ui.brightnessNote}</li>
        </ul>
      </div>
    </div>
  );
}
