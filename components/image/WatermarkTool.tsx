'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import { canvasToBlob, download, loadImage, suffixName, type LoadedImage } from '@/lib/image-canvas';
import { ANCHORS, markFontSize, placeMark, type Anchor } from '@/lib/image-more';
import { IMAGE_COMMON, type ImageLang } from '@/lib/image-ui-intl';
import { MARK_UI } from '@/lib/image-more-ui';

/**
 * 글자 워터마크.
 *
 * 자리와 글자 크기를 정하는 셈은 lib/image-more.ts에 있다 — 캔버스 없이도
 * "아홉 자리가 다 사진 안에 들어가는가"를 검사가 확인할 수 있어야 한다.
 */
const COLORS = ['#ffffff', '#000000', '#ef4444', '#3b82f6'];

export default function WatermarkTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = MARK_UI[lang];
  const common = IMAGE_COMMON[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [text, setText] = useState('© vixutil');
  const [anchor, setAnchor] = useState<Anchor>('bottom-right');
  const [scale, setScale] = useState(5);
  const [opacity, setOpacity] = useState(60);
  const [color, setColor] = useState('#ffffff');
  const [tile, setTile] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
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
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img.src, 0, 0);

        const font = markFontSize(img.width, img.height, scale / 100);
        ctx.font = `bold ${font}px system-ui, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity / 100;

        const w = ctx.measureText(text).width;
        const h = font * 1.2;
        if (tile) {
          // 사진 전체에 비스듬히 깐다 — 한 귀퉁이만 있으면 잘라내면 그만이다
          ctx.save();
          ctx.translate(img.width / 2, img.height / 2);
          ctx.rotate(-Math.PI / 6);
          const span = Math.hypot(img.width, img.height);
          for (let y = -span; y < span; y += h * 3) {
            for (let x = -span; x < span; x += w + font * 2) ctx.fillText(text, x, y);
          }
          ctx.restore();
        } else {
          const p = placeMark(img.width, img.height, Math.ceil(w), Math.ceil(h), anchor, 0.04);
          ctx.fillText(text, p.x, p.y);
        }

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
  }, [img, text, anchor, scale, opacity, color, tile]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  return (
    <div>
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[14rem]">
        {/* url이 빌 때 <img>를 그리면 브라우저가 페이지를 다시 받는다 — 첫 렌더에는 아예 안 그린다 */}
        {url && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={ui.alt} className="w-full max-h-[26rem] object-contain" />
          </>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{ui.markText}</label>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-400"
        />

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.position}</p>
        <div className="grid grid-cols-3 gap-1.5 max-w-[9rem]">
          {ANCHORS.map(a => (
            <button
              key={a}
              onClick={() => setAnchor(a)}
              aria-label={a}
              disabled={tile}
              className={`h-9 rounded-lg border transition-colors disabled:opacity-30 ${
                anchor === a && !tile
                  ? 'border-violet-400 bg-violet-100 dark:bg-violet-950/50'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-violet-200'
              }`}
            />
          ))}
        </div>

        {([[ui.size, scale, setScale, 1, 20], [ui.opacity, opacity, setOpacity, 5, 100]] as const).map(([label, v, set, min, max]) => (
          <div key={label as string} className="mt-4">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label as string}</span>
              <span className="text-sm font-black text-violet-600 tabular-nums">{v as number}%</span>
            </div>
            <input
              type="range" min={min as number} max={max as number} value={v as number}
              onChange={e => (set as (n: number) => void)(Number(e.target.value))}
              className="w-full accent-violet-500" aria-label={label as string}
            />
          </div>
        ))}

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.markColor}</p>
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
        </div>

        <label className="flex items-start gap-3 mt-4 cursor-pointer">
          <input type="checkbox" checked={tile} onChange={e => setTile(e.target.checked)} className="mt-0.5 accent-violet-500 w-4 h-4" />
          <span>
            <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">{ui.tile}</span>
            <span className="block text-xs text-slate-400 dark:text-slate-500">{ui.tileHint}</span>
          </span>
        </label>
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={`${img.width} × ${img.height}`}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-mark', img.type === 'image/png' ? 'png' : 'jpg'))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
