'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import {
  canvasToBlob, download, fillBackground, loadImage, suffixName, type LoadedImage,
} from '@/lib/image-canvas';
import { ROTATE_UI, IMAGE_COMMON, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 회전·반전.
 *
 * 90도 단위 회전은 캔버스의 가로세로를 맞바꾸면 되지만, 미세 각도(예: 3도)는
 * 사진 모서리가 바깥으로 튀어나가므로 캔버스가 더 커야 한다. 회전한 사각형을
 * 감싸는 최소 사각형 크기를 구해 캔버스를 잡고, 남는 구석은 배경색으로 채운다.
 */
const BG_COLORS = ['#ffffff', '#000000', '#f1f5f9'];

export default function RotateTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = ROTATE_UI[lang];
  const common = IMAGE_COMMON[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [angle, setAngle] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [bg, setBg] = useState('#ffffff');
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const urlRef = useRef('');

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const accept = useCallback(async (files: File[]) => {
    setImg(await loadImage(files[0]));
    setAngle(0);
    setFlipX(false);
    setFlipY(false);
  }, []);

  useEffect(() => {
    if (!img) return;
    let alive = true;
    // setBusy는 타이머 안에서 켠다 — 이펙트 본문에서 바로 부르면 렌더가 한 번 더 돈다
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        const rad = (angle * Math.PI) / 180;
        const cos = Math.abs(Math.cos(rad));
        const sin = Math.abs(Math.sin(rad));
        const w = Math.round(img.width * cos + img.height * sin);
        const h = Math.round(img.width * sin + img.height * cos);

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        const mime = img.type === 'image/png' ? 'image/png' : 'image/jpeg';
        if (mime === 'image/jpeg' || angle % 90 !== 0) fillBackground(ctx, bg);

        ctx.translate(w / 2, h / 2);
        ctx.rotate(rad);
        ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
        ctx.drawImage(img.src, -img.width / 2, -img.height / 2);

        const out = await canvasToBlob(canvas, { mime, quality: 0.92 });
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
  }, [img, angle, flipX, flipY, bg]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  const turn = (deg: number) => setAngle(a => (a + deg + 360) % 360);
  const btn = 'rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-violet-300 transition-colors';

  return (
    <div>
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[14rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={ui.alt} className="w-full max-h-[26rem] object-contain" />
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => turn(-90)} className={btn}>{ui.left}</button>
          <button onClick={() => turn(90)} className={btn}>{ui.right}</button>
          <button
            onClick={() => setFlipX(v => !v)}
            className={`${btn} ${flipX ? '!border-violet-300 !bg-violet-50 dark:!bg-violet-950/40 !text-violet-700' : ''}`}
          >
            {ui.flipH}
          </button>
          <button
            onClick={() => setFlipY(v => !v)}
            className={`${btn} ${flipY ? '!border-violet-300 !bg-violet-50 dark:!bg-violet-950/40 !text-violet-700' : ''}`}
          >
            {ui.flipV}
          </button>
        </div>

        <div className="flex items-baseline justify-between mt-5 mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.fineAngle}</span>
          <span className="text-sm font-black text-violet-600 tabular-nums">{angle}°</span>
        </div>
        <input
          type="range" min={0} max={359} value={angle}
          onChange={e => setAngle(Number(e.target.value))}
          className="w-full accent-violet-500"
          aria-label={ui.angleAria}
        />
        <div className="flex gap-2 mt-2">
          <button onClick={() => setAngle(a => (a + 359) % 360)} className={`${btn} flex-1 !py-2`}>−1°</button>
          <button onClick={() => setAngle(0)} className={`${btn} flex-1 !py-2`}>{ui.toZero}</button>
          <button onClick={() => setAngle(a => (a + 1) % 360)} className={`${btn} flex-1 !py-2`}>+1°</button>
        </div>

        {angle % 90 !== 0 && (
          <>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">{ui.cornerColor}</p>
            <div className="flex items-center gap-2">
              {BG_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setBg(c)}
                  aria-label={`${common.bgColor} ${c}`}
                  style={{ background: c }}
                  className={`w-9 h-9 rounded-lg border-2 transition-transform ${
                    bg === c ? 'border-violet-500 scale-110' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              ))}
              <input
                type="color" value={bg}
                onChange={e => setBg(e.target.value)}
                aria-label={common.pickBg}
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-1">
                {ui.cornerNote}
              </span>
            </div>
          </>
        )}
      </div>

      <ResultActions
        lang={lang}
        originalSize={img.size}
        resultSize={blob?.size}
        dimension={ui.dimension(angle)}
        busy={busy}
        onDownload={() => blob && download(blob, suffixName(img.name, '-rotated', img.type === 'image/png' ? 'png' : 'jpg'))}
        onReset={() => { setImg(null); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
