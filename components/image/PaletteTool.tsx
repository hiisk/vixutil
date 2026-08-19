'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import { canvasToBlob, download, loadImage, suffixName, type LoadedImage } from '@/lib/image-canvas';
import { IMG_PALETTE_UI, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 색상 추출.
 *
 * 픽셀을 전부 세지 않는다. 사진 한 장이 수백만 픽셀인데 대표색 여섯 개를 뽑는 데
 * 그게 다 필요하지 않다. 200px로 줄여서 세면 결과는 거의 같고 즉시 끝난다.
 *
 * 색은 채널당 5비트(32단계)로 뭉쳐 센다. 원본 그대로 세면 눈에는 같은 하늘색이
 * 미세하게 다른 수천 개 색으로 흩어져서, 가장 많은 색이 사실은 0.01%가 된다.
 * 그 뒤 사람 눈에 구분되지 않을 만큼 가까운 색끼리 한 번 더 합친다.
 */
const SAMPLE = 200;
const MIN_DISTANCE = 60;

type Swatch = { hex: string; rgb: [number, number, number]; ratio: number };

const toHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');

/** 흰 배경 위에서 읽히도록 밝은 색에는 어두운 글씨를 얹는다. */
const isLight = ([r, g, b]: [number, number, number]) => 0.299 * r + 0.587 * g + 0.114 * b > 160;

function extract(src: CanvasImageSource, w: number, h: number): Swatch[] {
  const scale = Math.min(1, SAMPLE / Math.max(w, h));
  const sw = Math.max(1, Math.round(w * scale));
  const sh = Math.max(1, Math.round(h * scale));
  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(src, 0, 0, sw, sh);
  const { data } = ctx.getImageData(0, 0, sw, sh);

  const buckets = new Map<number, { r: number; g: number; b: number; n: number }>();
  let counted = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue; // 투명한 픽셀은 색이 없다
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    const cur = buckets.get(key);
    if (cur) { cur.r += r; cur.g += g; cur.b += b; cur.n++; }
    else buckets.set(key, { r, g, b, n: 1 });
    counted++;
  }
  if (counted === 0) return [];

  const sorted = [...buckets.values()].sort((a, b) => b.n - a.n);
  const picked: { rgb: [number, number, number]; n: number }[] = [];

  for (const bucket of sorted) {
    const rgb: [number, number, number] = [
      Math.round(bucket.r / bucket.n),
      Math.round(bucket.g / bucket.n),
      Math.round(bucket.b / bucket.n),
    ];
    const near = picked.find(p => Math.hypot(p.rgb[0] - rgb[0], p.rgb[1] - rgb[1], p.rgb[2] - rgb[2]) < MIN_DISTANCE);
    if (near) { near.n += bucket.n; continue; }
    picked.push({ rgb, n: bucket.n });
    if (picked.length >= 6) break;
  }

  return picked.map(p => ({
    hex: toHex(...p.rgb),
    rgb: p.rgb,
    ratio: Math.round((p.n / counted) * 1000) / 10,
  }));
}

export default function PaletteTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = IMG_PALETTE_UI[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [objUrl, setObjUrl] = useState('');
  const [swatches, setSwatches] = useState<Swatch[]>([]);
  const [picked, setPicked] = useState<Swatch | null>(null);
  const [copied, setCopied] = useState('');
  const fullRef = useRef<HTMLCanvasElement | null>(null);
  const objUrlRef = useRef('');

  useEffect(() => () => { if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current); }, []);

  const accept = useCallback(async (files: File[]) => {
    const loaded = await loadImage(files[0]);
    if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current);
    objUrlRef.current = URL.createObjectURL(files[0]);

    // 스포이드용 원본 캔버스 — 클릭한 지점의 진짜 색을 읽으려면 필요하다
    const full = document.createElement('canvas');
    full.width = loaded.width;
    full.height = loaded.height;
    full.getContext('2d', { willReadFrequently: true })!.drawImage(loaded.src, 0, 0);
    fullRef.current = full;

    setObjUrl(objUrlRef.current);
    setImg(loaded);
    setPicked(null);
    setSwatches(extract(loaded.src, loaded.width, loaded.height));
  }, []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(''), 1500);
    } catch {
      setCopied('');
    }
  };

  const pick = (e: React.MouseEvent<HTMLImageElement>) => {
    const full = fullRef.current;
    if (!full) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.floor(((e.clientX - r.left) / r.width) * full.width);
    const y = Math.floor(((e.clientY - r.top) / r.height) * full.height);
    const d = full.getContext('2d')!.getImageData(x, y, 1, 1).data;
    const rgb: [number, number, number] = [d[0], d[1], d[2]];
    setPicked({ hex: toHex(...rgb), rgb, ratio: 0 });
  };

  const savePalette = async () => {
    if (!img || swatches.length === 0) return;
    const W = 1200, H = 400;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    const w = W / swatches.length;
    swatches.forEach((s, i) => {
      ctx.fillStyle = s.hex;
      ctx.fillRect(i * w, 0, w + 1, H);
      ctx.fillStyle = isLight(s.rgb) ? '#0f172a' : '#ffffff';
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.hex.toUpperCase(), i * w + w / 2, H - 46);
      ctx.font = '26px sans-serif';
      ctx.fillText(`${s.ratio}%`, i * w + w / 2, H - 12);
    });
    download(await canvasToBlob(canvas, { mime: 'image/png' }), suffixName(img.name, '-palette', 'png'));
  };

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  const shown = picked ?? swatches[0];

  return (
    <div>
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={objUrl}
          alt={ui.alt}
          onClick={pick}
          className="w-full max-h-[24rem] object-contain cursor-crosshair"
        />
      </div>
      <p className="mt-2.5 text-center text-xs text-slate-400 dark:text-slate-500">
        {ui.how}
      </p>

      {/* 대표 색 띠 — 비율만큼 폭을 준다 */}
      <div className="mt-4 flex h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        {swatches.map(s => (
          <button
            key={s.hex}
            onClick={() => copy(s.hex)}
            title={ui.copyHex(s.hex)}
            style={{ background: s.hex, flexGrow: Math.max(s.ratio, 3) }}
            className="relative group"
          >
            <span className={`absolute inset-x-0 bottom-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${isLight(s.rgb) ? 'text-slate-900' : 'text-white'}`}>
              {ui.copy}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {(picked ? [picked, ...swatches] : swatches).map((s, i) => (
          <button
            key={`${s.hex}-${i}`}
            onClick={() => copy(s.hex)}
            className="flex items-center gap-3 rounded-xl border chip-off px-3 py-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-left"
          >
            <span
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0"
              style={{ background: s.hex }}
            />
            <span className="hub-card-body">
              <span className="block text-sm font-black text-slate-800 dark:text-slate-100 font-mono uppercase">{s.hex}</span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                rgb({s.rgb.join(', ')})
                {picked && i === 0 ? ui.pickedPoint : s.ratio > 0 ? ` · ${s.ratio}%` : ''}
              </span>
            </span>
            <span className={`text-xs font-bold ${copied === s.hex ? 'text-emerald-600' : 'text-slate-300 dark:text-slate-600'}`}>
              {copied === s.hex ? ui.copied : ui.copy}
            </span>
          </button>
        ))}
      </div>

      {shown && (
        <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
          {ui.noteBefore}<span className="font-mono font-bold uppercase text-slate-500 dark:text-slate-400">{swatches[0]?.hex}</span>
          {ui.noteAfter}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2 mt-5">
        <button
          onClick={() => { setImg(null); setSwatches([]); setPicked(null); }}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3 text-sm text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          {ui.otherPhoto}
        </button>
        <button
          onClick={savePalette}
          className="col-span-2 rounded-xl bg-sec font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
        >
          {ui.savePalette}
        </button>
      </div>
    </div>
  );
}
