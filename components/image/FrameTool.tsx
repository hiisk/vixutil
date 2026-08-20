'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import { canvasToBlob, download, loadImage, suffixName, type LoadedImage } from '@/lib/image-canvas';
import { frame, type Ratio } from '@/lib/image-more';
import { IMAGE_COMMON, type ImageLang } from '@/lib/image-ui-intl';
import { FRAME_UI } from '@/lib/image-more-ui';

/**
 * 테두리와 비율 맞추기 — 인스타그램에 세로 사진을 잘리지 않게 올릴 때 쓴다.
 * 캔버스 크기와 사진 자리를 정하는 셈은 lib/image-more.ts의 frame()에 있다.
 */
const RATIOS: Ratio[] = ['original', '1:1', '4:5', '3:4', '16:9', '9:16'];
const COLORS = ['#ffffff', '#000000', '#f1f5f9', '#1e293b'];

export default function FrameTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = FRAME_UI[lang];
  const common = IMAGE_COMMON[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [ratio, setRatio] = useState<Ratio>('1:1');
  const [thick, setThick] = useState(4);
  const [color, setColor] = useState('#ffffff');
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
  const [dim, setDim] = useState('');
  const [busy, setBusy] = useState(false);
  const urlRef = useRef('');

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const accept = useCallback(async (files: File[]) => { setImg(await loadImage(files[0])); }, []);

  useEffect(() => {
    if (!img) return;
    let alive = true;
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const f = frame(img.width, img.height, ratio, thick / 100);
        const canvas = document.createElement('canvas');
        canvas.width = f.canvasW;
        canvas.height = f.canvasH;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, f.canvasW, f.canvasH);
        ctx.drawImage(img.src, f.x, f.y, f.w, f.h);

        const mime = img.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const out = await canvasToBlob(canvas, { mime, quality: 0.92 });
        if (!alive) return;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = URL.createObjectURL(out);
        setBlob(out);
        setUrl(urlRef.current);
        setDim(`${f.canvasW} × ${f.canvasH}`);
      } finally {
        if (alive) setBusy(false);
      }
    }, 180);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [img, ratio, thick, color]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

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
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.ratio}</p>
        <div className="grid grid-cols-3 gap-2">
          {RATIOS.map(r => (
            <button
              key={r}
              onClick={() => setRatio(r)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                ratio === r
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {r === 'original' ? ui.ratioOrig : r}
            </button>
          ))}
        </div>

        <div className="flex items-baseline justify-between mt-4 mb-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{ui.thickness}</span>
          <span className="text-sm font-bold text-violet-600 tabular-nums">{thick}%</span>
        </div>
        <input
          type="range" min={0} max={20} value={thick}
          onChange={e => setThick(Number(e.target.value))}
          className="w-full accent-violet-500" aria-label={ui.thickness}
        />

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.frameColor}</p>
        <div className="flex items-center gap-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              aria-label={`${common.bgColor} ${c}`}
              style={{ background: c }}
              className={`w-9 h-9 rounded-lg border-2 transition-transform ${
                color === c ? 'border-violet-500 scale-110' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
          ))}
          <input
            type="color" value={color} onChange={e => setColor(e.target.value)}
            aria-label={common.pickBg}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer"
          />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1">{ui.noUpscale}</span>
        </div>
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={dim}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-framed', img.type === 'image/png' ? 'png' : 'jpg'))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
