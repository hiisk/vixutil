'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import ResultActions from './ResultActions';
import {
  canvasToBlob, download, fillBackground, formatBytes, loadImage, type LoadedImage,
} from '@/lib/image-canvas';
import { MERGE_UI, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 사진 이어붙이기.
 *
 * 폭이 다른 사진을 세로로 붙일 때가 문제다. 그대로 쌓으면 오른쪽이 들쭉날쭉해진다.
 * 가장 넓은 사진의 폭에 나머지를 맞춰 늘리거나(맞춤), 원래 크기로 두고 가운데로
 * 모으거나(가운데) 둘 중에 고르게 했다. 캡처 이어붙이기는 맞춤이, 서로 다른
 * 사진을 늘어놓는 건 가운데가 자연스럽다.
 */
const GAP_BG = ['#ffffff', '#000000', '#f1f5f9'];

export default function MergeTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = MERGE_UI[lang];
  const [imgs, setImgs] = useState<LoadedImage[]>([]);
  const [dir, setDir] = useState<'v' | 'h'>('v');
  const [fit, setFit] = useState(true);
  const [gap, setGap] = useState(0);
  const [bg, setBg] = useState('#ffffff');
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState('');
  const [out, setOut] = useState({ w: 0, h: 0 });
  const [busy, setBusy] = useState(false);
  const urlRef = useRef('');

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const accept = useCallback(async (files: File[]) => {
    const loaded = await Promise.all(files.map(loadImage));
    setImgs(prev => [...prev, ...loaded]);
  }, []);

  const move = (i: number, step: number) => {
    setImgs(prev => {
      const next = [...prev];
      const j = i + step;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  useEffect(() => {
    if (imgs.length === 0) return;
    let alive = true;
    // setBusy는 타이머 안에서 켠다 — 이펙트 본문에서 바로 부르면 렌더가 한 번 더 돈다
    const timer = window.setTimeout(async () => {
      setBusy(true);
      try {
        // 세로로 붙이면 폭을, 가로로 붙이면 높이를 기준으로 맞춘다
        const baseW = Math.max(...imgs.map(i => i.width));
        const baseH = Math.max(...imgs.map(i => i.height));

        const sized = imgs.map(i => {
          if (!fit) return { img: i, w: i.width, h: i.height };
          return dir === 'v'
            ? { img: i, w: baseW, h: Math.round((i.height * baseW) / i.width) }
            : { img: i, w: Math.round((i.width * baseH) / i.height), h: baseH };
        });

        const total = sized.reduce((a, s) => a + (dir === 'v' ? s.h : s.w), 0) + gap * (sized.length - 1);
        const canvasW = dir === 'v' ? Math.max(...sized.map(s => s.w)) : total;
        const canvasH = dir === 'v' ? total : Math.max(...sized.map(s => s.h));

        const canvas = document.createElement('canvas');
        canvas.width = canvasW;
        canvas.height = canvasH;
        const ctx = canvas.getContext('2d')!;
        ctx.imageSmoothingQuality = 'high';
        fillBackground(ctx, bg);

        let cursor = 0;
        for (const s of sized) {
          const x = dir === 'v' ? Math.round((canvasW - s.w) / 2) : cursor;
          const y = dir === 'v' ? cursor : Math.round((canvasH - s.h) / 2);
          ctx.drawImage(s.img.src, x, y, s.w, s.h);
          cursor += (dir === 'v' ? s.h : s.w) + gap;
        }

        const result = await canvasToBlob(canvas, { mime: 'image/jpeg', quality: 0.92 });
        if (!alive) return;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = URL.createObjectURL(result);
        setBlob(result);
        setUrl(urlRef.current);
        setOut({ w: canvasW, h: canvasH });
      } finally {
        if (alive) setBusy(false);
      }
    }, 220);
    return () => { alive = false; window.clearTimeout(timer); };
  }, [imgs, dir, fit, gap, bg]);

  if (imgs.length === 0) return <ImageDrop onFiles={accept} multiple hint={ui.hint} lang={lang} />;

  const totalSize = imgs.reduce((a, i) => a + i.size, 0);

  return (
    <div>
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={ui.alt} className="w-full max-h-[30rem] object-contain" />
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
          {ui.countLine(imgs.length)}
        </p>
        <div className="flex flex-col gap-1.5 mb-5">
          {imgs.map((i, idx) => (
            <div key={`${i.name}-${idx}`} className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2">
              <span className="w-6 h-6 shrink-0 rounded-md bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-[11px] font-black flex items-center justify-center">
                {idx + 1}
              </span>
              <span className="hub-card-body">
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{i.name}</span>
                <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
                  {i.width} × {i.height} · {formatBytes(i.size)}
                </span>
              </span>
              <button onClick={() => move(idx, -1)} disabled={idx === 0} aria-label={ui.up} className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-30">↑</button>
              <button onClick={() => move(idx, 1)} disabled={idx === imgs.length - 1} aria-label={ui.down} className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-30">↓</button>
              <button onClick={() => setImgs(p => p.filter((_, k) => k !== idx))} aria-label={ui.remove} className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 text-rose-500">✕</button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {([
            { d: 'v' as const },
            { d: 'h' as const },
          ] as const).map((b, i) => (
            <button
              key={b.d}
              onClick={() => setDir(b.d)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                dir === b.d
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-violet-200'
              }`}
            >
              {ui.dirs[i]}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 mt-4 cursor-pointer">
          <input type="checkbox" checked={fit} onChange={e => setFit(e.target.checked)} className="w-4 h-4 accent-violet-500" />
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {ui.matchLabel(dir === 'v' ? ui.widthWord : ui.heightWord)}
            <span className="block text-[11px] text-slate-400 dark:text-slate-500">
              {ui.matchOff}
            </span>
          </span>
        </label>

        <div className="flex items-baseline justify-between mt-4 mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.gap}</span>
          <span className="text-sm font-black text-violet-600 tabular-nums">{gap}px</span>
        </div>
        <input
          type="range" min={0} max={80} value={gap}
          onChange={e => setGap(Number(e.target.value))}
          className="w-full accent-violet-500" aria-label={ui.gap}
        />

        {(gap > 0 || !fit) && (
          <>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.gapColor}</p>
            <div className="flex items-center gap-2">
              {GAP_BG.map(c => (
                <button
                  key={c} onClick={() => setBg(c)} aria-label={`${ui.gapColorAria} ${c}`} style={{ background: c }}
                  className={`w-9 h-9 rounded-lg border-2 transition-transform ${bg === c ? 'border-violet-500 scale-110' : 'border-slate-200 dark:border-slate-700'}`}
                />
              ))}
              <input
                type="color" value={bg} onChange={e => setBg(e.target.value)}
                aria-label={ui.pickGapColor}
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer"
              />
            </div>
          </>
        )}

        <div className="mt-5">
          <ImageDrop onFiles={accept} multiple hint={ui.hintMore} lang={lang} />
        </div>
      </div>

      <ResultActions
        lang={lang}
        originalSize={totalSize}
        resultSize={blob?.size}
        dimension={`${out.w} × ${out.h}`}
        busy={busy}
        onDownload={() => blob && download(blob, 'merged.jpg')}
        onReset={() => { setImgs([]); setBlob(null); setUrl(''); }}
      />
    </div>
  );
}
