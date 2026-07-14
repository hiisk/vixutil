'use client';
import { useState } from 'react';
import CalcShell, { Card, Label } from '@/components/CalcShell';

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors font-medium">
      {copied ? '✓' : '복사'}
    </button>
  );
}

export default function ColorPage() {
  const [hex, setHex] = useState('#3B82F6');
  const [pickerColor, setPickerColor] = useState('#3B82F6');

  const rgb = hexToRgb(hex) ?? [59, 130, 246];
  const hsl = rgbToHsl(...rgb);

  function fromHex(val: string) {
    const v = val.startsWith('#') ? val : '#' + val;
    setHex(v);
    if (/^#[0-9a-f]{6}$/i.test(v)) setPickerColor(v);
  }

  function fromRgb(idx: number, val: string) {
    const n = Math.max(0, Math.min(255, Number(val)));
    const next = [...rgb] as [number, number, number];
    next[idx] = n;
    const h = rgbToHex(...next);
    setHex(h);
    setPickerColor(h);
  }

  function fromHsl(idx: number, val: string) {
    const next = [...hsl] as [number, number, number];
    const max = [360, 100, 100][idx];
    next[idx] = Math.max(0, Math.min(max, Number(val)));
    const r = hslToRgb(...next);
    const h = rgbToHex(...r);
    setHex(h);
    setPickerColor(h);
  }

  function fromPicker(val: string) {
    setPickerColor(val);
    setHex(val);
  }

  const inputCls = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full';

  return (
    <CalcShell title="Color Converter" description="HEX ↔ RGB ↔ HSL 색상 변환" wide>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <input type="color" value={pickerColor} onChange={e => fromPicker(e.target.value)}
              className="w-16 h-16 rounded-xl cursor-pointer border-0 p-0 bg-transparent" />
            <div className="flex-1 h-16 rounded-xl border border-slate-200 dark:border-slate-700" style={{ backgroundColor: pickerColor }} />
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>HEX</Label>
                <CopyBtn text={hex} />
              </div>
              <input type="text" value={hex} onChange={e => fromHex(e.target.value)}
                placeholder="#3B82F6" className={inputCls + ' font-mono'} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>RGB</Label>
                <CopyBtn text={`rgb(${rgb.join(', ')})`} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['R', 'G', 'B'].map((label, i) => (
                  <div key={label}>
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-1">{label}</p>
                    <input type="number" value={rgb[i]} onChange={e => fromRgb(i, e.target.value)}
                      min="0" max="255" className={inputCls + ' text-center font-mono'} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>HSL</Label>
                <CopyBtn text={`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{ l: 'H°', max: 360 }, { l: 'S%', max: 100 }, { l: 'L%', max: 100 }].map((f, i) => (
                  <div key={f.l}>
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-1">{f.l}</p>
                    <input type="number" value={hsl[i]} onChange={e => fromHsl(i, e.target.value)}
                      min="0" max={f.max} className={inputCls + ' text-center font-mono'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </CalcShell>
  );
}
