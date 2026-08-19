'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import {
  canvasToBlob, download, drawToCanvas, fillBackground, loadImage, suffixName, type LoadedImage,
} from '@/lib/image-canvas';
import { CROP_UI, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 자르기 — 화면에서 끈 사각형을 원본 좌표로 되돌려 잘라낸다.
 *
 * 선택 영역은 화면에 보이는 크기(display px)로 다루고, 자를 때만 원본 배율을
 * 곱한다. 원본 좌표로 다루면 3천 픽셀짜리 사진에서 마우스 1px 이동이 4px씩
 * 튀어 손맛이 나빠진다.
 */
const RATIOS = [
  { value: 0 },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:4', value: 3 / 4 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
];

type Rect = { x: number; y: number; w: number; h: number };
type Corner = 'nw' | 'ne' | 'sw' | 'se';
type Drag =
  | { type: 'new'; ox: number; oy: number }
  | { type: 'move'; dx: number; dy: number }
  | { type: 'resize'; corner: Corner };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function CropTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = CROP_UI[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [objUrl, setObjUrl] = useState('');
  const [sel, setSel] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const [ratio, setRatio] = useState(0);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [blob, setBlob] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const objUrlRef = useRef('');

  useEffect(() => () => { if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current); }, []);

  const accept = useCallback(async (files: File[]) => {
    const loaded = await loadImage(files[0]);
    if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current);
    objUrlRef.current = URL.createObjectURL(files[0]);
    setObjUrl(objUrlRef.current);
    setImg(loaded);
  }, []);

  /** 화면에 그려진 이미지 크기를 재고 선택 영역을 가운데 80%로 잡는다. */
  const measure = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    setBox({ w: r.width, h: r.height });
    setSel(prev =>
      prev.w === 0
        ? { x: r.width * 0.1, y: r.height * 0.1, w: r.width * 0.8, h: r.height * 0.8 }
        : prev,
    );
  }, []);

  useEffect(() => {
    if (!img) return;
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [img, measure]);

  /** 비율이 정해지면 지금 선택 영역을 그 비율에 맞춰 다시 잡는다. */
  const applyRatio = (r: number) => {
    setRatio(r);
    if (r === 0 || box.w === 0) return;
    const w = Math.min(box.w, box.h * r) * 0.8;
    const h = w / r;
    setSel({ x: (box.w - w) / 2, y: (box.h - h) / 2, w, h });
  };

  const point = (e: React.PointerEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    return { x: clamp(e.clientX - r.left, 0, r.width), y: clamp(e.clientY - r.top, 0, r.height) };
  };

  const onDown = (e: React.PointerEvent, drag: Drag) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = drag;
  };

  const onMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const p = point(e);

    if (drag.type === 'move') {
      setSel(s => ({
        ...s,
        x: clamp(p.x - drag.dx, 0, box.w - s.w),
        y: clamp(p.y - drag.dy, 0, box.h - s.h),
      }));
      return;
    }

    // 새로 그리기와 모서리 끌기는 "고정점 하나 + 움직이는 점 하나"로 같다
    const anchor =
      drag.type === 'new'
        ? { x: drag.ox, y: drag.oy }
        : {
            x: drag.corner === 'nw' || drag.corner === 'sw' ? sel.x + sel.w : sel.x,
            y: drag.corner === 'nw' || drag.corner === 'ne' ? sel.y + sel.h : sel.y,
          };

    let w = Math.abs(p.x - anchor.x);
    let h = Math.abs(p.y - anchor.y);
    if (ratio > 0) {
      // 비율 고정: 더 많이 움직인 축을 기준으로 나머지를 맞춘다
      if (w / ratio > h) h = w / ratio;
      else w = h * ratio;
    }
    const x = p.x < anchor.x ? anchor.x - w : anchor.x;
    const y = p.y < anchor.y ? anchor.y - h : anchor.y;

    setSel({
      x: clamp(x, 0, box.w),
      y: clamp(y, 0, box.h),
      w: Math.min(w, box.w - clamp(x, 0, box.w)),
      h: Math.min(h, box.h - clamp(y, 0, box.h)),
    });
  };

  const onUp = () => { dragRef.current = null; };

  const scale = img && box.w > 0 ? img.width / box.w : 1;
  const outW = Math.round(sel.w * scale);
  const outH = Math.round(sel.h * scale);

  useEffect(() => {
    if (!img || outW < 1 || outH < 1) return;
    let alive = true;
    // setBusy는 타이머 안에서 켠다 — 이펙트 본문에서 바로 부르면 렌더가 한 번 더 돈다
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const mime = img.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const canvas = drawToCanvas(img.src, outW, outH, ctx => {
          if (mime === 'image/jpeg') fillBackground(ctx, '#ffffff');
          ctx.drawImage(
            img.src,
            Math.round(sel.x * scale), Math.round(sel.y * scale), outW, outH,
            0, 0, outW, outH,
          );
        });
        const out = await canvasToBlob(canvas, { mime, quality: 0.92 });
        if (alive) setBlob(out);
      } finally {
        if (alive) setBusy(false);
      }
    }, 220);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [img, sel, scale, outW, outH]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  const handle = 'absolute w-5 h-5 rounded-full bg-white border-2 border-violet-500 shadow touch-none';

  return (
    <div>
      <div
        ref={wrapRef}
        onPointerDown={e => {
          const p = point(e);
          onDown(e, { type: 'new', ox: p.x, oy: p.y });
          setSel({ x: p.x, y: p.y, w: 0, h: 0 });
        }}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative select-none touch-none rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 cursor-crosshair"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={objUrl}
          alt={ui.alt}
          onLoad={measure}
          draggable={false}
          /*
            object-contain으로 높이를 제한하면 사진이 상자 안에서 레터박스로
            뜨는데, 그러면 상자 크기와 사진 크기가 달라져 선택 좌표가 어긋난다.
            상자가 곧 사진이 되도록 높이를 그대로 둔다.
          */
          className="w-full h-auto block pointer-events-none"
        />

        {/* 선택 밖을 어둡게 — 남길 부분이 어디인지 한눈에 보이게 한다 */}
        {sel.w > 0 && (
          <>
            <div
              className="absolute inset-0 bg-black/50 pointer-events-none"
              style={{
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${sel.x}px ${sel.y}px, ${sel.x}px ${sel.y + sel.h}px, ${sel.x + sel.w}px ${sel.y + sel.h}px, ${sel.x + sel.w}px ${sel.y}px, ${sel.x}px ${sel.y}px)`,
              }}
            />
            <div
              onPointerDown={e => {
                const p = point(e);
                onDown(e, { type: 'move', dx: p.x - sel.x, dy: p.y - sel.y });
              }}
              onPointerMove={onMove}
              onPointerUp={onUp}
              className="absolute border-2 border-violet-400 cursor-move touch-none"
              style={{ left: sel.x, top: sel.y, width: sel.w, height: sel.h }}
            >
              <span className="absolute -top-7 left-0 rounded-md bg-violet-600 px-2 py-0.5 text-[11px] font-bold text-white tabular-nums whitespace-nowrap">
                {outW} × {outH}
              </span>
            </div>
            {(['nw', 'ne', 'sw', 'se'] as Corner[]).map(c => (
              <div
                key={c}
                onPointerDown={e => onDown(e, { type: 'resize', corner: c })}
                onPointerMove={onMove}
                onPointerUp={onUp}
                className={handle}
                style={{
                  left: (c === 'nw' || c === 'sw' ? sel.x : sel.x + sel.w) - 10,
                  top: (c === 'nw' || c === 'ne' ? sel.y : sel.y + sel.h) - 10,
                  cursor: c === 'nw' || c === 'se' ? 'nwse-resize' : 'nesw-resize',
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.ratioTitle}</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {RATIOS.map((r, i) => (
            <button
              key={ui.ratios[i]}
              onClick={() => applyRatio(r.value)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                ratio === r.value
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {ui.ratios[i]}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {ui.how}
          <br />
          {ui.keeps(img.width, img.height, outW, outH)}
        </p>
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={`${outW} × ${outH}`}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-crop', img.type === 'image/png' ? 'png' : 'jpg'))}
        onReset={() => { setImg(null); setBlob(null); setSel({ x: 0, y: 0, w: 0, h: 0 }); }}
      />
    </div>
  );
}
