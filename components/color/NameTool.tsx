'use client';
import { useMemo, useState } from 'react';
import { hexToRgb, rgbToHsl, rgbToCmyk, nearestNamed, hslString, rgbString } from '@/lib/color';
import { CARD, ColorInput, ValueRow } from './ui';

export default function NameTool() {
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
      <ColorInput value={hex} onChange={setHex} label="색 코드" />

      <div className="h-28 rounded-2xl border border-slate-200 dark:border-slate-700 mt-4" style={{ background: hex }} />

      {info && (
        <>
          <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">가장 가까운 이름</p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {info.near.ko} <span className="text-slate-400 dark:text-slate-500 font-mono text-lg">{info.near.name}</span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: hex }} />
              <span className="text-xs text-slate-400 dark:text-slate-500">↔</span>
              <span className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: info.near.hex }} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {info.close
                ? `거의 같은 색입니다 (차이 ${info.near.distance})`
                : `이름 색과는 차이가 있습니다 (차이 ${info.near.distance}) — 비슷한 계열로만 보세요`}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <ValueRow label="HEX" value={hex.toUpperCase()} />
            <ValueRow label="RGB" value={rgbString(info.rgb)} />
            <ValueRow label="HSL" value={hslString(info.hsl)} />
            <ValueRow label="CMYK" value={`${info.cmyk.c}%, ${info.cmyk.m}%, ${info.cmyk.y}%, ${info.cmyk.k}%`} />
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              CMYK 값은 단순 변환입니다. 실제 인쇄 색은 잉크·용지·인쇄기에 따라 달라지므로, 정확한 색이
              필요한 인쇄물이라면 팬톤 같은 별색 지정이나 인쇄소 교정을 거쳐야 합니다.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
