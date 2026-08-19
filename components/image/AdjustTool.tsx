'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import { canvasToBlob, download, loadImage, suffixName, type LoadedImage } from '@/lib/image-canvas';
import { filterString, NO_ADJUST, PRESETS, type Adjust } from '@/lib/image-more';
import { type ImageLang } from '@/lib/image-ui-intl';
import { ADJUST_UI } from '@/lib/image-more-ui';

/**
 * 밝기·대비·채도·흑백·세피아·흐림.
 *
 * 캔버스의 `ctx.filter` 하나로 다 처리한다. 픽셀을 직접 돌면 큰 사진에서
 * 눈에 띄게 느려지는데, filter는 브라우저가 GPU로 넘긴다.
 */
export default function AdjustTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = ADJUST_UI[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [adj, setAdj] = useState<Adjust>(NO_ADJUST);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const urlRef = useRef('');

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const accept = useCallback(async (files: File[]) => {
    setImg(await loadImage(files[0]));
    setAdj(NO_ADJUST);
  }, []);

  useEffect(() => {
    if (!img) return;
    let alive = true;
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.filter = filterString(adj);
        ctx.drawImage(img.src, 0, 0);

        const mime = img.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const out = await canvasToBlob(canvas, { mime, quality: 0.92 });
        if (!alive) return;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = URL.createObjectURL(out);
        setBlob(out);
        setUrl(urlRef.current);
      } finally {
        if (alive) setBusy(false);
      }
    }, 180);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [img, adj]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  const SLIDERS: [string, keyof Adjust, number, number][] = [
    [ui.brightness, 'brightness', -100, 100],
    [ui.contrast, 'contrast', -100, 100],
    [ui.saturate, 'saturate', -100, 100],
    [ui.grayscale, 'grayscale', 0, 100],
    [ui.sepia, 'sepia', 0, 100],
    [ui.blur, 'blur', 0, 20],
  ];

  return (
    <div>
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[14rem]">
        {/* url이 빌 때 <img>를 그리면 브라우저가 페이지를 다시 받는다 — 첫 렌더에는 아예 안 그린다 */}
        {url && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={ui.alt} className="w-full max-h-[26rem] object-contain" />
          </>
        )}
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.preset}</p>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={p.key}
              onClick={() => setAdj(p.adjust)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                filterString(adj) === filterString(p.adjust)
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-violet-200'
              }`}
            >
              {ui.presets[i]}
            </button>
          ))}
        </div>

        {SLIDERS.map(([label, key, min, max]) => (
          <div key={key} className="mt-4">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
              <span className="text-sm font-black text-violet-600 tabular-nums">{adj[key]}</span>
            </div>
            <input
              type="range" min={min} max={max} value={adj[key]}
              onChange={e => setAdj(a => ({ ...a, [key]: Number(e.target.value) }))}
              className="w-full accent-violet-500" aria-label={label}
            />
          </div>
        ))}

        <button
          onClick={() => setAdj(NO_ADJUST)}
          className="w-full mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-violet-300 transition-colors"
        >
          {ui.reset}
        </button>
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={`${img.width} × ${img.height}`}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-adjusted', img.type === 'image/png' ? 'png' : 'jpg'))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
