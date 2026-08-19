'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import {
  canvasToBlob, download, drawToCanvas, EXT, fillBackground, formatBytes, isLossy,
  loadImage, MIME_LABEL, withExt, type LoadedImage,
} from '@/lib/image-canvas';
import { CONVERT_UI, IMAGE_COMMON, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 포맷 변환 — 같은 그림을 다른 컨테이너에 다시 담는다.
 *
 * 투명 배경이 함정이다. PNG의 투명 부분을 JPG로 그냥 구우면 canvas 초기값인
 * 검은색이 드러나서 "사진이 까매졌다"가 된다. 손실 포맷으로 갈 때는 배경색을
 * 먼저 칠하고, 그 색을 사용자가 고를 수 있게 한다.
 */
const TARGETS = ['image/jpeg', 'image/png', 'image/webp'];

const BG_COLORS = ['#ffffff', '#000000', '#f1f5f9', '#fde68a', '#bfdbfe'];

export default function ConvertTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = CONVERT_UI[lang];
  const c2 = IMAGE_COMMON[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [mime, setMime] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [bg, setBg] = useState('#ffffff');
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const urlRef = useRef('');

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const accept = useCallback(async (files: File[]) => {
    const loaded = await loadImage(files[0]);
    setImg(loaded);
    // 지금과 같은 포맷으로 변환하는 건 의미가 없으니 다른 것을 먼저 고른다
    setMime(loaded.type === 'image/jpeg' ? 'image/webp' : 'image/jpeg');
  }, []);

  useEffect(() => {
    if (!img) return;
    let alive = true;
    // setBusy는 타이머 안에서 켠다 — 이펙트 본문에서 바로 부르면 렌더가 한 번 더 돈다
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const canvas = drawToCanvas(img.src, img.width, img.height, ctx => {
          if (mime !== 'image/png') fillBackground(ctx, bg);
          ctx.drawImage(img.src, 0, 0);
        });
        const out = await canvasToBlob(canvas, { mime, quality: isLossy(mime) ? quality : undefined });
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
  }, [img, mime, quality, bg]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  const from = MIME_LABEL[img.type] ?? img.type.replace('image/', '').toUpperCase();

  return (
    <div>
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={ui.alt} className="w-full max-h-[24rem] object-contain" />
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-black text-slate-600 dark:text-slate-300">{from}</span>
          <span className="text-slate-300 dark:text-slate-600">→</span>
          <span className="rounded-xl bg-violet-100 dark:bg-violet-950/50 px-4 py-2 text-sm font-black text-violet-700 dark:text-violet-300">
            {MIME_LABEL[mime]}
          </span>
        </div>

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.targetFormat}</p>
        <div className="grid grid-cols-3 gap-2">
          {TARGETS.map(t => (
            <button
              key={t}
              onClick={() => setMime(t)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                mime === t
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {MIME_LABEL[t]}
            </button>
          ))}
        </div>

        {isLossy(mime) && (
          <>
            <div className="flex items-baseline justify-between mt-5 mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{c2.quality}</span>
              <span className="text-sm font-black text-violet-600 tabular-nums">{Math.round(quality * 100)}%</span>
            </div>
            <input
              type="range" min={30} max={100}
              value={Math.round(quality * 100)}
              onChange={e => setQuality(Number(e.target.value) / 100)}
              className="w-full accent-violet-500"
              aria-label={c2.quality}
            />
          </>
        )}

        {mime !== 'image/png' && (
          <>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">
              {c2.bgFill}
            </p>
            <div className="flex items-center gap-2">
              {BG_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setBg(c)}
                  aria-label={`${c2.bgColor} ${c}`}
                  style={{ background: c }}
                  className={`w-9 h-9 rounded-lg border-2 transition-transform ${
                    bg === c ? 'border-violet-500 scale-110' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              ))}
              <input
                type="color"
                value={bg}
                onChange={e => setBg(e.target.value)}
                aria-label={c2.pickBg}
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer"
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
              {ui.note}
            </p>
          </>
        )}

        <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-500">
          {img.width} × {img.height}px · {c2.original} {formatBytes(img.size)}
        </p>
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={MIME_LABEL[mime]}
        busy={busy}
        onDownload={() => blob && download(blob, withExt(img.name, EXT[mime]))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
