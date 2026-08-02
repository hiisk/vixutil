'use client';
import { useState } from 'react';
import { Card, Label, inputCls } from '@/components/CalcShell';
import { DEV_COLOR } from '@/lib/calc-l10n/dev-tools5';
import type { CalcLang } from '@/lib/calc-l10n/types';
import CopyButton from '@/components/calc/CopyButton';

function hexToRgb(hex: string): [number, number, number] | null {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = [...h].map(ch => ch + ch).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export default function DevColorIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_COLOR[lang].ui;
  const [hex, setHex] = useState('#3B82F6');
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(...rgb) : null;

  const rgbStr = rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : '';
  const hslStr = hsl ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : '';
  const hexStr = rgb ? rgbToHex(...rgb) : '';

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <Label>{c.pick}</Label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={rgb ? hexStr : '#000000'}
            onChange={e => setHex(e.target.value)}
            className="w-14 h-12 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent"
          />
          <input type="text" value={hex} onChange={e => setHex(e.target.value)} className={`${inputCls} font-mono`} />
        </div>
      </Card>

      {rgb && hsl && (
        <>
          <div className="rounded-2xl h-24 border border-slate-200 dark:border-slate-700" style={{ background: hexStr }} />
          <Card className="p-5">
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {[[c.hex, hexStr], [c.rgb, rgbStr], [c.hsl, hslStr]].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center gap-3 py-2.5">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{k}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-sm text-slate-800 dark:text-slate-100">{v}</span>
                    <CopyButton text={v} copy={c.copy} copied={c.copied} />
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
