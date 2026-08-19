'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import { canvasToBlob, download, formatBytes, loadImage, withExt, type LoadedImage } from '@/lib/image-canvas';
import { splitGrid, type Tile } from '@/lib/image-more';
import { IMAGE_COMMON, type ImageLang } from '@/lib/image-ui-intl';
import { SPLIT_UI } from '@/lib/image-more-ui';

/**
 * 격자로 자르기 — 인스타그램 그리드에 쓴다.
 *
 * 나누어떨어지지 않을 때 나머지 픽셀을 어디에 주는지가 이 도구의 전부다.
 * 그 셈은 lib/image-more.ts의 splitGrid에 있고, "조각을 도로 붙이면 원본 크기가
 * 되는가"로 검사한다.
 */
const GRIDS: [number, number][] = [[2, 1], [3, 1], [2, 2], [3, 3], [1, 2], [1, 3]];

interface Piece extends Tile {
  url: string;
  blob: Blob;
}

export default function SplitTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = SPLIT_UI[lang];
  const common = IMAGE_COMMON[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [grid, setGrid] = useState<[number, number]>([3, 3]);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [busy, setBusy] = useState(false);
  const urlsRef = useRef<string[]>([]);

  const revoke = () => { urlsRef.current.forEach(URL.revokeObjectURL); urlsRef.current = []; };
  useEffect(() => revoke, []);

  const accept = useCallback(async (files: File[]) => { setImg(await loadImage(files[0])); }, []);

  useEffect(() => {
    if (!img) return;
    let alive = true;
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const [cols, rows] = grid;
        const mime = img.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const made: Piece[] = [];
        for (const t of splitGrid(img.width, img.height, cols, rows)) {
          const canvas = document.createElement('canvas');
          canvas.width = t.w;
          canvas.height = t.h;
          canvas.getContext('2d')!.drawImage(img.src, t.x, t.y, t.w, t.h, 0, 0, t.w, t.h);
          const blob = await canvasToBlob(canvas, { mime, quality: 0.92 });
          made.push({ ...t, blob, url: URL.createObjectURL(blob) });
        }
        if (!alive) { made.forEach(p => URL.revokeObjectURL(p.url)); return; }
        revoke();
        urlsRef.current = made.map(p => p.url);
        setPieces(made);
      } finally {
        if (alive) setBusy(false);
      }
    }, 200);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [img, grid]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  const ext = img.type === 'image/png' ? 'png' : 'jpg';
  const saveOne = (p: Piece) => download(p.blob, withExt(`${img.name.replace(/\.[^.]+$/, '')}-${p.index + 1}`, ext));

  return (
    <div>
      <div className="rounded-lg border chip-off p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.grid}</p>
        <div className="grid grid-cols-3 gap-2">
          {GRIDS.map(([c, r]) => (
            <button
              key={`${c}x${r}`}
              onClick={() => setGrid([c, r])}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                grid[0] === c && grid[1] === r
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-violet-200'
              }`}
            >
              {c} × {r}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">{ui.splitNote}</p>
      </div>

      {pieces.length > 0 && (
        <>
          <div
            className="mt-4 grid gap-1 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-1"
            style={{ gridTemplateColumns: `repeat(${grid[0]}, minmax(0, 1fr))` }}
          >
            {pieces.map(p => (
              <button key={p.index} onClick={() => saveOne(p)} className="relative group" aria-label={`${ui.saveOne} ${p.index + 1}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={`${p.index + 1}`} className="w-full h-full object-cover" />
                <span className="absolute top-1 left-1 text-[10px] font-black text-white bg-black/50 rounded px-1.5 py-0.5">
                  {p.index + 1}
                </span>
                <span className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/25 transition-colors" />
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => pieces.forEach(saveOne)}
              disabled={busy}
              className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white py-3 text-sm font-black transition-colors"
            >
              {busy ? common.working : `${ui.saveAll} (${pieces.length}${ui.tiles})`}
            </button>
            <button
              onClick={() => { revoke(); setImg(null); setPieces([]); }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-violet-300 transition-colors"
            >
              {common.otherPhoto}
            </button>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 text-center">
            {common.original} {formatBytes(img.size)} · {img.width} × {img.height}
          </p>
        </>
      )}
    </div>
  );
}
