'use client';
import { useMemo, useState } from 'react';
import { hexToRgb, rgbToHsl, rgbToCmyk, nearestNamed, hslString, rgbString } from '@/lib/color';
import { CARD, ColorInput, ValueRow } from './ui';
import { NAME_UI, NAMED_COLOR_INTL, type ColorLang } from '@/lib/color-ui-intl';

/** 가까운 색의 이름 — 영어는 name 그대로, 중국어는 표에서 */
function colorName(near: { name: string; ko: string }, lang: ColorLang): string {
  if (lang === 'ko') return near.ko;
  if (lang === 'en') return near.name;
  return NAMED_COLOR_INTL[lang][near.name] ?? near.name;
}

export default function NameTool({ lang = 'ko' }: { lang?: ColorLang } = {}) {
  const ui = NAME_UI[lang];
  const [hex, setHex] = useState('#3b82f6');

  const info = useMemo(() => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const near = nearestNamed(rgb);
    return {
      rgb,
      hsl: rgbToHsl(rgb),
      cmyk: rgbToCmyk(rgb),
      near,
      // 거리 30 이하면 사실상 그 색으로 불러도 되는 수준이다
      close: near.distance <= 30,
    };
  }, [hex]);

  return (
    <div>
      <ColorInput value={hex} onChange={setHex} label={ui.colorCode} />

      <div className="h-28 rounded-lg border border-slate-200 dark:border-slate-700 mt-4" style={{ background: hex }} />

      {info && (
        <>
          <div className="mt-4 rounded-lg border chip-off p-5 text-center">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1">{ui.nearest}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {colorName(info.near, lang)} <span className="text-slate-400 dark:text-slate-500 font-mono text-lg">{info.near.name}</span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: hex }} />
              <span className="text-xs text-slate-400 dark:text-slate-500">↔</span>
              <span className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: info.near.hex }} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {info.close
                ? ui.almostSame(info.near.distance)
                : ui.differs(info.near.distance)}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <ValueRow label="HEX" value={hex.toUpperCase()} lang={lang} />
            <ValueRow label="RGB" value={rgbString(info.rgb)} lang={lang} />
            <ValueRow label="HSL" value={hslString(info.hsl)} lang={lang} />
            <ValueRow label="CMYK" value={`${info.cmyk.c}%, ${info.cmyk.m}%, ${info.cmyk.y}%, ${info.cmyk.k}%`} lang={lang} />
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {ui.cmykNote}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
