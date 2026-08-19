'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDrop from './ImageDrop';
import { canvasToBlob, download, formatBytes, loadImage, type LoadedImage } from '@/lib/image-canvas';
import { ICON_SIZES, headTags, manifestIcons, squareCrop, type IconSize } from '@/lib/image-more';
import { IMAGE_COMMON, type ImageLang } from '@/lib/image-ui-intl';
import { ICON_UI } from '@/lib/image-more-ui';

/**
 * 파비콘 만들기.
 *
 * 크기 목록은 지어낸 숫자가 아니라 각 플랫폼이 실제로 찾는 크기다 —
 * 16·32는 브라우저 탭, 180은 iOS 홈 화면, 192·512는 안드로이드 매니페스트.
 * 함께 내는 코드 조각의 파일 이름이 실제로 만드는 파일과 어긋나면 아이콘이
 * 안 뜨는데, 그건 사람이 눈으로 못 잡아서 검사가 대조한다.
 */
interface Made extends IconSize {
  url: string;
  blob: Blob;
}

/**
 * 코드 조각 상자.
 *
 * 컴포넌트 안에 두면 렌더마다 새 컴포넌트가 되어 pre 블록이 통째로 리마운트된다
 * (static-components, 2026-08-13). 닫아 쓰던 copy·copied·ui는 prop으로 받는다.
 */
function Snippet({ label, text, copied, onCopy, copyText, copiedText }: {
  label: string; text: string; copied: string;
  onCopy: (key: string, text: string) => void; copyText: string; copiedText: string;
}) {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
        <button
          onClick={() => onCopy(label, text)}
          className={`text-xs font-bold transition-colors ${copied === label ? 'text-emerald-600' : 'text-violet-600 hover:text-violet-700'}`}
        >
          {copied === label ? copiedText : copyText}
        </button>
      </div>
      <pre className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2.5 text-[11px] leading-relaxed font-mono text-slate-700 dark:text-slate-200 overflow-x-auto">
        {text}
      </pre>
    </div>
  );
}

export default function FaviconTool({ lang = 'ko' }: { lang?: ImageLang } = {}) {
  const ui = ICON_UI[lang];
  const common = IMAGE_COMMON[lang];
  const [img, setImg] = useState<LoadedImage | null>(null);
  const [made, setMade] = useState<Made[]>([]);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState('');
  const urlsRef = useRef<string[]>([]);

  const revoke = () => { urlsRef.current.forEach(URL.revokeObjectURL); urlsRef.current = []; };
  useEffect(() => revoke, []);

  const accept = useCallback(async (files: File[]) => { setImg(await loadImage(files[0])); }, []);

  useEffect(() => {
    if (!img) return;
    let alive = true;
    (async () => {
      setBusy(true);
      try {
        const crop = squareCrop(img.width, img.height);
        const out: Made[] = [];
        for (const s of ICON_SIZES) {
          const canvas = document.createElement('canvas');
          canvas.width = s.size;
          canvas.height = s.size;
          const ctx = canvas.getContext('2d')!;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img.src, crop.x, crop.y, crop.size, crop.size, 0, 0, s.size, s.size);
          const blob = await canvasToBlob(canvas, { mime: 'image/png', quality: 1 });
          out.push({ ...s, blob, url: URL.createObjectURL(blob) });
        }
        if (!alive) { out.forEach(o => URL.revokeObjectURL(o.url)); return; }
        revoke();
        urlsRef.current = out.map(o => o.url);
        setMade(out);
      } finally {
        if (alive) setBusy(false);
      }
    })();
    return () => { alive = false; };
  }, [img]);

  if (!img) return <ImageDrop onFiles={accept} hint={ui.hint} lang={lang} />;

  /* use로 시작하는 이름은 eslint가 훅으로 오인한다 — lib/lumen의 useOf와 같은 함정 */
  const labelOf = (use: IconSize['use']) =>
    use === 'apple' ? ui.useApple : use === 'android' || use === 'maskable' ? ui.useAndroid : ui.useFavicon;

  const copy = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    window.setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div>
      <div className="rounded-lg border chip-off p-5">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">{ui.sizes}</p>
        {busy && <p className="text-sm text-slate-400 dark:text-slate-500">{common.working}</p>}
        <div className="flex flex-col gap-2">
          {made.map(m => (
            <button
              key={m.size}
              onClick={() => download(m.blob, m.name)}
              className="fld flex items-center gap-3 text-left hover:border-slate-300 dark:hover:border-slate-700"
            >
              <span className="shrink-0 w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name} width={Math.min(m.size, 40)} height={Math.min(m.size, 40)} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">{m.size} × {m.size}</span>
                <span className="block text-[11px] text-slate-400 dark:text-slate-500 truncate">{m.name} · {labelOf(m.use)}</span>
              </span>
              <span className="shrink-0 text-xs font-bold text-slate-300 dark:text-slate-600">{formatBytes(m.blob.size)}</span>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">{ui.iconNote}</p>
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{ui.snippet}</p>
        <Snippet label={ui.headTitle} text={headTags()} copied={copied} onCopy={copy} copyText={ui.copy} copiedText={ui.copied} />
        <Snippet label={ui.manifest} text={manifestIcons()} copied={copied} onCopy={copy} copyText={ui.copy} copiedText={ui.copied} />
      </div>

      <button
        onClick={() => { revoke(); setImg(null); setMade([]); }}
        className="w-full mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
      >
        {common.otherPhoto}
      </button>
    </div>
  );
}
