'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import {
  canvasToBlob, download, drawToCanvas, fillBackground, formatBytes,
  loadImage, suffixName, type LoadedImage,
} from '@/lib/image-canvas';

/**
 * 크기 조절 — 픽셀 수를 바꾼다.
 *
 * 비율 고정이 기본이다. 가로만 바꿨는데 세로가 그대로면 사진이 찌그러지는데,
 * 그걸 원하는 사람은 거의 없다. 굳이 원하면 자물쇠를 풀 수 있다.
 */
const PRESETS = [
  { label: '인스타 정사각', w: 1080, h: 1080 },
  { label: '유튜브 썸네일', w: 1280, h: 720 },
  { label: '프로필 512', w: 512, h: 512 },
  { label: 'HD 1920', w: 1920, h: 1080 },
];

export default function ResizeTool() {
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [lock, setLock] = useState(true);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const urlRef = useRef('');

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const accept = useCallback(async (files: File[]) => {
    const loaded = await loadImage(files[0]);
    setImg(loaded);
    setW(loaded.width);
    setH(loaded.height);
  }, []);

  const ratio = img ? img.width / img.height : 1;

  const setWidth = (next: number) => {
    setW(next);
    if (lock && next > 0) setH(Math.max(1, Math.round(next / ratio)));
  };
  const setHeight = (next: number) => {
    setH(next);
    if (lock && next > 0) setW(Math.max(1, Math.round(next * ratio)));
  };
  const scale = (pct: number) => {
    if (!img) return;
    setW(Math.max(1, Math.round(img.width * pct)));
    setH(Math.max(1, Math.round(img.height * pct)));
  };

  useEffect(() => {
    if (!img || w < 1 || h < 1) return;
    let alive = true;
    // setBusy는 타이머 안에서 켠다 — 이펙트 본문에서 바로 부르면 렌더가 한 번 더 돈다
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const mime = img.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const canvas = drawToCanvas(img.src, w, h, ctx => {
          if (mime === 'image/jpeg') fillBackground(ctx, '#ffffff');
          ctx.drawImage(img.src, 0, 0, w, h);
        });
        const out = await canvasToBlob(canvas, { mime, quality: 0.92 });
        if (!alive) return;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = URL.createObjectURL(out);
        setBlob(out);
        setUrl(urlRef.current);
      } finally {
        if (alive) setBusy(false);
      }
    }, 200);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [img, w, h]);

  if (!img) return <ImageDrop onFiles={accept} />;

  const field = 'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums';

  return (
    <div>
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="크기 조절 결과 미리보기" className="w-full max-h-[24rem] object-contain" />
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-end gap-2">
          <label className="flex-1">
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">가로 (px)</span>
            <input type="number" min={1} max={12000} value={w} onChange={e => setWidth(Number(e.target.value))} className={field} />
          </label>
          <button
            onClick={() => setLock(l => !l)}
            title={lock ? '비율 고정을 풉니다' : '비율을 고정합니다'}
            className={`shrink-0 mb-1 w-10 h-10 rounded-xl border text-lg transition-colors ${
              lock
                ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-600'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
            }`}
          >
            {lock ? '🔒' : '🔓'}
          </button>
          <label className="flex-1">
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">세로 (px)</span>
            <input type="number" min={1} max={12000} value={h} onChange={e => setHeight(Number(e.target.value))} className={field} />
          </label>
        </div>

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">비율로 줄이기</p>
        <div className="grid grid-cols-4 gap-2">
          {[0.75, 0.5, 0.25, 1].map(p => (
            <button
              key={p}
              onClick={() => scale(p)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-violet-300 transition-colors"
            >
              {p === 1 ? '원본' : `${p * 100}%`}
            </button>
          ))}
        </div>

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">자주 쓰는 규격</p>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => { setLock(false); setW(p.w); setH(p.h); }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-left hover:border-violet-300 transition-colors"
            >
              <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">{p.label}</span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">{p.w} × {p.h}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          원본 {img.width} × {img.height}px ({formatBytes(img.size)}) · 원본보다 크게 늘리면 화질이 좋아지지는 않고 흐릿해집니다.
        </p>
      </div>

      <ResultActions
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={`${w} × ${h}`}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, `-${w}x${h}`, img.type === 'image/png' ? 'png' : 'jpg'))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
