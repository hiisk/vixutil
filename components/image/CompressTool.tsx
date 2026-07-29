'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import {
  canvasToBlob, download, drawToCanvas, fillBackground, formatBytes,
  loadImage, suffixName, type LoadedImage,
} from '@/lib/image-canvas';

/**
 * 용량 줄이기 — 화질만 낮춰 다시 굽는다. 크기(픽셀)는 건드리지 않는다.
 *
 * 슬라이더를 움직일 때마다 즉시 다시 구우면 큰 사진에서 화면이 멈춘 것처럼
 * 보인다. 손을 멈춘 뒤에 한 번만 굽도록 조금 늦춘다.
 */
const FORMATS = [
  { mime: 'image/jpeg', label: 'JPG', hint: '사진에 가장 무난' },
  { mime: 'image/webp', label: 'WebP', hint: '같은 화질에 더 작음' },
];

export default function CompressTool() {
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [mime, setMime] = useState('image/jpeg');
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
  const [compare, setCompare] = useState(false);
  const [busy, setBusy] = useState(false);
  const urlRef = useRef('');
  const originalUrlRef = useRef('');
  const [originalUrl, setOriginalUrl] = useState('');

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current);
  }, []);

  const accept = useCallback(async (files: File[]) => {
    const loaded = await loadImage(files[0]);
    if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current);
    const oUrl = URL.createObjectURL(files[0]);
    originalUrlRef.current = oUrl;
    setOriginalUrl(oUrl);
    setImg(loaded);
    // 원본이 PNG면 대체로 그림·캡처다. WebP가 더 잘 줄여준다.
    setMime(loaded.type === 'image/png' ? 'image/webp' : 'image/jpeg');
  }, []);

  useEffect(() => {
    if (!img) return;
    let alive = true;
    // setBusy는 타이머 안에서 켠다 — 이펙트 본문에서 바로 부르면 렌더가 한 번 더 돈다
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const canvas = drawToCanvas(img.src, img.width, img.height, ctx => {
          if (mime === 'image/jpeg') fillBackground(ctx, '#ffffff');
          ctx.drawImage(img.src, 0, 0);
        });
        const out = await canvasToBlob(canvas, { mime, quality });
        if (!alive) return;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = URL.createObjectURL(out);
        setBlob(out);
        setUrl(urlRef.current);
      } finally {
        if (alive) setBusy(false);
      }
    }, 160);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [img, quality, mime]);

  if (!img) return <ImageDrop onFiles={accept} hint="JPG·PNG·WebP 모두 됩니다" />;

  const ext = mime === 'image/webp' ? 'webp' : 'jpg';

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={compare ? originalUrl : url || originalUrl}
          alt={compare ? '원본 사진' : '압축 결과 미리보기'}
          className="w-full max-h-[26rem] object-contain"
        />
        <button
          onMouseDown={() => setCompare(true)}
          onMouseUp={() => setCompare(false)}
          onMouseLeave={() => setCompare(false)}
          onTouchStart={() => setCompare(true)}
          onTouchEnd={() => setCompare(false)}
          className="absolute bottom-3 right-3 rounded-xl bg-black/60 px-3.5 py-2 text-xs font-bold text-white hover:bg-black/75 transition-colors"
        >
          {compare ? '원본 보는 중' : '누르면 원본'}
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">화질</span>
          <span className="text-sm font-black text-violet-600 tabular-nums">{Math.round(quality * 100)}%</span>
        </div>
        <input
          type="range"
          min={20}
          max={95}
          value={Math.round(quality * 100)}
          onChange={e => setQuality(Number(e.target.value) / 100)}
          className="w-full accent-violet-500"
          aria-label="화질"
        />
        <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          <span>작게</span>
          <span>선명하게</span>
        </div>

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">저장 형식</p>
        <div className="grid grid-cols-2 gap-2">
          {FORMATS.map(f => (
            <button
              key={f.mime}
              onClick={() => setMime(f.mime)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                mime === f.mime
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-violet-200'
              }`}
            >
              <span className={`block text-sm font-black ${mime === f.mime ? 'text-violet-700 dark:text-violet-300' : 'text-slate-700 dark:text-slate-200'}`}>
                {f.label}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{f.hint}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {img.width} × {img.height}px · 원본 {formatBytes(img.size)} · 크기(픽셀)는 그대로 두고 화질만 낮춥니다.
          더 줄이려면 <b className="text-slate-500 dark:text-slate-400">이미지 크기 조절</b>을 함께 쓰세요.
        </p>
      </div>

      <ResultActions
        originalSize={img.size}
        resultSize={blob?.size}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-compressed', ext))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
