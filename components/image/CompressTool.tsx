'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import {
  canvasToBlob, download, drawToCanvas, fillBackground, formatBytes,
  loadImage, suffixName, type LoadedImage,
} from '@/lib/image-canvas';
import { COMPRESS_UI, IMAGE_COMMON, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 용량 줄이기 — 화질만 낮춰 다시 굽는다. 크기(픽셀)는 건드리지 않는다.
 *
 * 슬라이더를 움직일 때마다 즉시 다시 구우면 큰 사진에서 화면이 멈춘 것처럼
 * 보인다. 손을 멈춘 뒤에 한 번만 굽도록 조금 늦춘다.
 */
const FORMATS = [
  { mime: 'image/jpeg' as const },
  { mime: 'image/webp' as const },
];

export default function CompressTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = COMPRESS_UI[lang];
  const c = IMAGE_COMMON[lang];
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

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  const ext = mime === 'image/webp' ? 'webp' : 'jpg';

  return (
    <div>
      <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={compare ? originalUrl : url || originalUrl}
          alt={compare ? ui.altOriginal : ui.altResult}
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
          {compare ? ui.viewingOriginal : ui.tapForOriginal}
        </button>
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{c.quality}</span>
          <span className="text-sm font-black text-violet-600 tabular-nums">{Math.round(quality * 100)}%</span>
        </div>
        <input
          type="range"
          min={20}
          max={95}
          value={Math.round(quality * 100)}
          onChange={e => setQuality(Number(e.target.value) / 100)}
          className="w-full accent-violet-500"
          aria-label={c.quality}
        />
        <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          <span>{c.smaller}</span>
          <span>{c.sharper}</span>
        </div>

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">{ui.saveAs}</p>
        <div className="grid grid-cols-2 gap-2">
          {FORMATS.map((f, i) => (
            <button
              key={f.mime}
              onClick={() => setMime(f.mime)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                mime === f.mime
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className={`block text-sm font-black ${mime === f.mime ? 'text-violet-700 dark:text-violet-300' : 'text-slate-700 dark:text-slate-200'}`}>
                {ui.formats[i]}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{ui.formatHints[i]}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {img.width} × {img.height}px · {c.original} {formatBytes(img.size)} · {ui.note}<b className="text-slate-500 dark:text-slate-400">{ui.noteLink}</b>
        </p>
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-compressed', ext))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
