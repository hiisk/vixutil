'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import { canvasToBlob, download, loadImage, suffixName, type LoadedImage } from '@/lib/image-canvas';
import { cornerRadius, squareCrop } from '@/lib/image-more';
import { type ImageLang } from '@/lib/image-ui-intl';
import { ROUND_UI } from '@/lib/image-more-ui';

/**
 * 모서리 둥글게 — 프로필 사진에 쓴다.
 *
 * **PNG로만 저장한다.** 둥글린 바깥은 투명해야 하는데 JPEG에는 투명이 없어서
 * 검은 네 귀퉁이가 남는다. 원본이 JPEG여도 결과는 PNG다.
 */
export default function RoundTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = ROUND_UI[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [radius, setRadius] = useState(20);
  const [square, setSquare] = useState(true);
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
        const crop = square ? squareCrop(img.width, img.height) : null;
        const w = crop ? crop.size : img.width;
        const h = crop ? crop.size : img.height;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        const r = cornerRadius(w, h, radius / 100);
        ctx.beginPath();
        ctx.roundRect(0, 0, w, h, r);
        ctx.clip();
        if (crop) ctx.drawImage(img.src, crop.x, crop.y, crop.size, crop.size, 0, 0, w, h);
        else ctx.drawImage(img.src, 0, 0);

        const out = await canvasToBlob(canvas, { mime: 'image/png', quality: 1 });
        if (!alive) return;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = URL.createObjectURL(out);
        setBlob(out);
        setUrl(urlRef.current);
        setDim(`${w} × ${h}`);
      } finally {
        if (alive) setBusy(false);
      }
    }, 180);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [img, radius, square]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  return (
    <div>
      <div
        className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center min-h-[14rem]"
        // 투명한 자리가 보이도록 바둑판을 깐다 — 흰 배경이면 잘 잘렸는지 알 수 없다
        style={{
          backgroundImage: 'linear-gradient(45deg,#e2e8f0 25%,transparent 25%),linear-gradient(-45deg,#e2e8f0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e2e8f0 75%),linear-gradient(-45deg,transparent 75%,#e2e8f0 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0,0 8px,8px -8px,-8px 0',
        }}
      >
        {/* url이 빌 때 <img>를 그리면 브라우저가 페이지를 다시 받는다 — 첫 렌더에는 아예 안 그린다 */}
        {url && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={ui.alt} className="w-full max-h-[26rem] object-contain" />
          </>
        )}
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.radius}</span>
          <span className="text-sm font-black text-violet-600 tabular-nums">{radius}%</span>
        </div>
        <input
          type="range" min={0} max={100} value={radius}
          onChange={e => setRadius(Number(e.target.value))}
          className="w-full accent-violet-500" aria-label={ui.radius}
        />
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{ui.fullRound}</p>

        <label className="flex items-start gap-3 mt-4 cursor-pointer">
          <input type="checkbox" checked={square} onChange={e => setSquare(e.target.checked)} className="mt-0.5 accent-violet-500 w-4 h-4" />
          <span>
            <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">{ui.square}</span>
            <span className="block text-xs text-slate-400 dark:text-slate-500">{ui.squareHint}</span>
          </span>
        </label>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4">{ui.pngNote}</p>
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={dim}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-round', 'png'))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
