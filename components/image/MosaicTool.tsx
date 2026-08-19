'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import {
  canvasToBlob, download, fillBackground, loadImage, suffixName, type LoadedImage,
} from '@/lib/image-canvas';
import { MOSAIC_UI, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 모자이크 — 문지른 자리만 가린다.
 *
 * 칠한 결과를 다시 칠하지 않는다. 화면 캔버스에 계속 덧칠하면 같은 자리를
 * 두 번 지날 때마다 점점 뭉개져서 "얼마나 가려졌는지"가 손을 뗄 때까지
 * 예측이 안 된다. 원본 캔버스를 따로 두고 평균색은 늘 원본에서 뽑는다.
 *
 * 되돌리기도 픽셀을 저장하지 않는다 — 큰 사진에서는 스냅샷 한 장이 수십 MB다.
 * 대신 "어느 칸을 칠했는가"만 붓질 단위로 기억했다가 원본부터 다시 그린다.
 */
type Stroke = { mode: 'mosaic' | 'black'; cell: number; cells: Set<string> };

export default function MosaicTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = MOSAIC_UI[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [mode, setMode] = useState<'mosaic' | 'black'>('mosaic');
  const [cell, setCell] = useState(16);
  const [brush, setBrush] = useState(48);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);

  const viewRef = useRef<HTMLCanvasElement | null>(null);
  const srcRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const activeRef = useRef<Stroke | null>(null);

  const accept = useCallback(async (files: File[]) => {
    const loaded = await loadImage(files[0]);
    const src = document.createElement('canvas');
    src.width = loaded.width;
    src.height = loaded.height;
    src.getContext('2d')!.drawImage(loaded.src, 0, 0);
    srcRef.current = src;
    strokesRef.current = [];
    setStrokes([]);
    setImg(loaded);
    // 사진 크기에 맞춰 기본 굵기를 정한다 — 4000px 사진에 16px 칸은 티도 안 난다
    const base = Math.max(loaded.width, loaded.height);
    setCell(Math.max(8, Math.round(base / 90)));
    setBrush(Math.max(24, Math.round(base / 22)));
  }, []);

  /** 캔버스를 원본으로 되돌린 뒤 기록된 붓질을 순서대로 다시 칠한다. */
  const repaint = useCallback(() => {
    const view = viewRef.current;
    const src = srcRef.current;
    if (!view || !src) return;
    const ctx = view.getContext('2d')!;
    ctx.drawImage(src, 0, 0);
    for (const stroke of strokesRef.current) {
      for (const key of stroke.cells) {
        const [cx, cy] = key.split(',').map(Number);
        paintCell(ctx, src, cx, cy, stroke.cell, stroke.mode);
      }
    }
  }, []);

  useEffect(() => {
    if (!img) return;
    const view = viewRef.current;
    if (!view) return;
    view.width = img.width;
    view.height = img.height;
    repaint();
  }, [img, repaint]);

  const toCanvas = (e: React.PointerEvent) => {
    const view = viewRef.current!;
    const r = view.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * view.width,
      y: ((e.clientY - r.top) / r.height) * view.height,
    };
  };

  const paintAt = (x: number, y: number) => {
    const view = viewRef.current;
    const src = srcRef.current;
    const stroke = activeRef.current;
    if (!view || !src || !stroke) return;
    const ctx = view.getContext('2d')!;
    const half = brush / 2;

    const from = Math.floor((x - half) / cell);
    const to = Math.floor((x + half) / cell);
    const top = Math.floor((y - half) / cell);
    const bottom = Math.floor((y + half) / cell);

    for (let cx = from; cx <= to; cx++) {
      for (let cy = top; cy <= bottom; cy++) {
        if (cx < 0 || cy < 0 || cx * cell >= view.width || cy * cell >= view.height) continue;
        const key = `${cx},${cy}`;
        if (stroke.cells.has(key)) continue;
        stroke.cells.add(key);
        paintCell(ctx, src, cx, cy, cell, stroke.mode);
      }
    }
  };

  const onDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    activeRef.current = { mode, cell, cells: new Set() };
    const p = toCanvas(e);
    paintAt(p.x, p.y);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const p = toCanvas(e);
    paintAt(p.x, p.y);
  };

  const onUp = () => {
    const stroke = activeRef.current;
    activeRef.current = null;
    if (!stroke || stroke.cells.size === 0) return;
    strokesRef.current = [...strokesRef.current, stroke];
    setStrokes(strokesRef.current);
  };

  const undo = () => {
    strokesRef.current = strokesRef.current.slice(0, -1);
    setStrokes(strokesRef.current);
    repaint();
  };

  const clearAll = () => {
    strokesRef.current = [];
    setStrokes([]);
    repaint();
  };

  // 붓질이 끝날 때마다 결과 파일을 다시 굽는다
  useEffect(() => {
    const view = viewRef.current;
    if (!img || !view) return;
    let alive = true;
    // setBusy는 타이머 안에서 켠다 — 이펙트 본문에서 바로 부르면 렌더가 한 번 더 돈다
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const mime = img.type === 'image/png' ? 'image/png' : 'image/jpeg';
        if (mime === 'image/jpeg') {
          // JPG는 투명을 못 담는다. 원본이 투명했다면 흰 바탕에 얹어 굽는다.
          const flat = document.createElement('canvas');
          flat.width = view.width;
          flat.height = view.height;
          const fctx = flat.getContext('2d')!;
          fillBackground(fctx, '#ffffff');
          fctx.drawImage(view, 0, 0);
          const out = await canvasToBlob(flat, { mime, quality: 0.92 });
          if (alive) setBlob(out);
        } else {
          const out = await canvasToBlob(view, { mime });
          if (alive) setBlob(out);
        }
      } finally {
        if (alive) setBusy(false);
      }
    }, 250);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [img, strokes]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  return (
    <div>
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
        <canvas
          ref={viewRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="w-full h-auto block touch-none cursor-crosshair"
        />
      </div>

      <p className="mt-2.5 text-center text-xs text-slate-400 dark:text-slate-500">
        {ui.how}
      </p>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <div className="grid grid-cols-2 gap-2">
          {([
            { m: 'mosaic' as const },
            { m: 'black' as const },
          ] as const).map((b, i) => (
            <button
              key={b.m}
              onClick={() => setMode(b.m)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                mode === b.m
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className={`block text-sm font-black ${mode === b.m ? 'text-violet-700 dark:text-violet-300' : 'text-slate-700 dark:text-slate-200'}`}>
                {ui.modes[i]}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{ui.modeHints[i]}</span>
            </button>
          ))}
        </div>

        <div className="flex items-baseline justify-between mt-5 mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.brush}</span>
          <span className="text-sm font-black text-violet-600 tabular-nums">{brush}px</span>
        </div>
        <input
          type="range" min={16} max={Math.max(64, Math.round(Math.max(img.width, img.height) / 5))}
          value={brush} onChange={e => setBrush(Number(e.target.value))}
          className="w-full accent-violet-500" aria-label={ui.brush}
        />

        {mode === 'mosaic' && (
          <>
            <div className="flex items-baseline justify-between mt-4 mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.cellSize}</span>
              <span className="text-sm font-black text-violet-600 tabular-nums">{cell}px</span>
            </div>
            <input
              type="range" min={6} max={Math.max(24, Math.round(Math.max(img.width, img.height) / 20))}
              value={cell} onChange={e => setCell(Number(e.target.value))}
              className="w-full accent-violet-500" aria-label={ui.cellSize}
            />
            <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              {ui.cellNote}
            </p>
          </>
        )}

        <div className="grid grid-cols-2 gap-2 mt-5">
          <button
            onClick={undo}
            disabled={strokes.length === 0}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 disabled:opacity-40 transition-colors"
          >
            {ui.undo}
          </button>
          <button
            onClick={clearAll}
            disabled={strokes.length === 0}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 disabled:opacity-40 transition-colors"
          >
            {ui.clear}
          </button>
        </div>
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={ui.dimension(strokes.length)}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-masked', img.type === 'image/png' ? 'png' : 'jpg'))}
        onReset={() => { setImg(null); setBlob(null); strokesRef.current = []; setStrokes([]); }}
      />
    </div>
  );
}

/** 칸 하나를 원본의 평균색(또는 검정)으로 덮는다. */
function paintCell(
  ctx: CanvasRenderingContext2D,
  src: HTMLCanvasElement,
  cx: number,
  cy: number,
  cell: number,
  mode: 'mosaic' | 'black',
) {
  const x = cx * cell;
  const y = cy * cell;
  const w = Math.min(cell, src.width - x);
  const h = Math.min(cell, src.height - y);
  if (w <= 0 || h <= 0) return;

  if (mode === 'black') {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, w, h);
    return;
  }

  const data = src.getContext('2d')!.getImageData(x, y, w, h).data;
  let r = 0, g = 0, b = 0;
  const px = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  ctx.fillStyle = `rgb(${Math.round(r / px)}, ${Math.round(g / px)}, ${Math.round(b / px)})`;
  ctx.fillRect(x, y, w, h);
}
