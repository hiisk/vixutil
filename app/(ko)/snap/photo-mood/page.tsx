'use client';
import { shareOne } from '@/lib/share/ui';
import ToolIcon from '@/components/ToolIcon';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import SaveResultCard from '@/components/SaveResultCard';
import { getPhotoMood, type PhotoMoodResult } from '@/lib/photo-mood-data';
import { rgbToLab } from '@/lib/color-lab';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useDropPaste } from '@/lib/snap/useDropPaste';

function clampUnit(x: number) {
  return Math.max(0, Math.min(1, x));
}

function saturationOf(r: number, g: number, b: number) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

interface AnalyzeResult {
  brightnessRatio: number;
  saturationRatio: number;
  warmthRatio: number;
  contrastRatio: number;
  palette: string[];
}

/**
 * 이미지를 작은 캔버스(최대 변 120px)로 축소해 전체 픽셀을 훑는다.
 * 원본 해상도 그대로 분석하면 수백만 픽셀을 순회해야 해 느려지므로,
 * 색·밝기 통계는 축소본으로도 충분히 정확하게 재현된다.
 */
function analyzeImage(img: HTMLImageElement): AnalyzeResult {
  const longSide = Math.max(img.naturalWidth, img.naturalHeight);
  const scale = Math.min(1, 120 / longSide);
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    return { brightnessRatio: 0.5, saturationRatio: 0.5, warmthRatio: 0.5, contrastRatio: 0.5, palette: [] };
  }
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  let sumR = 0, sumG = 0, sumB = 0, sumLum = 0, sumLumSq = 0, sumSat = 0;
  const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();
  const n = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    sumR += r; sumG += g; sumB += b;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    sumLum += lum; sumLumSq += lum * lum;
    sumSat += saturationOf(r, g, b);

    // 색상을 32단계로 양자화해 도미넌트 컬러 후보를 집계한다.
    const qr = Math.round(r / 32) * 32, qg = Math.round(g / 32) * 32, qb = Math.round(b / 32) * 32;
    const key = `${qr},${qg},${qb}`;
    const bucket = buckets.get(key);
    if (bucket) { bucket.count++; bucket.r += r; bucket.g += g; bucket.b += b; }
    else buckets.set(key, { count: 1, r, g, b });
  }

  const avgR = sumR / n, avgG = sumG / n, avgB = sumB / n;
  const avgLum = sumLum / n;
  const variance = Math.max(0, sumLumSq / n - avgLum * avgLum);
  const stddev = Math.sqrt(variance);
  const avgSat = sumSat / n;
  const lab = rgbToLab(avgR, avgG, avgB);

  const brightnessRatio = clampUnit(avgLum / 255);
  const contrastRatio = clampUnit(stddev / 70);
  const saturationRatio = clampUnit((avgSat - 0.05) / 0.45);
  const warmthRatio = clampUnit(0.5 + (lab.b - lab.a) / 60);

  const palette = [...buckets.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(bk => {
      const r = Math.round(bk.r / bk.count), g = Math.round(bk.g / bk.count), b = Math.round(bk.b / bk.count);
      return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
    });

  return { brightnessRatio, saturationRatio, warmthRatio, contrastRatio, palette };
}

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const handleShare = useCallback(async () => {
    // 문구와 주소가 한 덩이로 나간다 — 예전엔 title 칸이라 카톡이 통째로 버렸다
    if (await shareOne('사진 한 장으로 보는 내 감성 타입 분석')) {
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    }
  }, []);

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 dark:bg-slate-900/20 border-white/30 dark:border-slate-700/30 text-white hover:bg-white/30"
    >
      {state === 'copied' ? '복사됨 ✓' : '공유'}
    </button>
  );
}

export default function PhotoMoodPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const [result, setResult] = useState<PhotoMoodResult | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => { if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current); };
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    setResult(null);
    setImgError(null);
    setAnalyzing(true);

    // 사진은 이 브라우저 안에서만 픽셀 단위로 분석될 뿐, 어디로도 전송되지 않는다.
    const img = new Image();
    img.src = url;
    const startedAt = Date.now();
    try {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('image load failed'));
      });
      const { brightnessRatio, saturationRatio, warmthRatio, contrastRatio, palette: pal } = analyzeImage(img);
      const elapsed = Date.now() - startedAt;
      if (elapsed < 600) await new Promise(r => setTimeout(r, 600 - elapsed));
      setPalette(pal);
      setResult(getPhotoMood(brightnessRatio, saturationRatio, warmthRatio, contrastRatio));
    } catch {
      setImgError('사진을 불러오지 못했어요. 다른 사진으로 다시 시도해주세요.');
      setAnalyzing(false);
      return;
    }
    setAnalyzing(false);
    setTimeout(() => document.getElementById('mood-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, []);

  /* 끌어다 놓기·붙여넣기로도 받는다 — 까닭은 lib/snap/useDropPaste.ts */
  useDropPaste(handleFile);

  function handleReset() {
    setPreview(null);
    setResult(null);
    setImgError(null);
    setAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/snap" className="page-back hover:text-fuchsia-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            스냅테스트
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">사진 감성 분석</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/snap/photo-mood" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🎞️" className="h-6 w-6" /></span>
          <h1 className="page-h1">사진 감성 분석</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">아무 사진이나 올려도 돼요 — 실제 색감을 분석해드려요</p>
        </div>

        <div className="note mb-6">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>얼굴 인식이 필요 없는 기능이라 인물·풍경·음식 등 어떤 사진이든 올릴 수 있어요. 밝기·채도·대비·색감은 이 브라우저 안에서 실제로 측정되고, 사진은 어디에도 저장·전송되지 않습니다.</p>
        </div>

        {!preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-lg py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900 hover:border-fuchsia-400 hover:bg-fuchsia-50/50 dark:hover:bg-fuchsia-950/40 transition-colors"
          >
            <ToolIcon emoji="📷" className="w-9 h-9 text-slate-800 dark:text-slate-100" />
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">사진을 선택해주세요</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">인생샷, 풍경, 음식 사진 다 좋아요</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        {preview && (
          <div className="mb-6">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="업로드한 사진 미리보기" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 dark:border-slate-700/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">색감 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 mx-auto block text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-fuchsia-600 transition-colors"
              >
                다른 사진으로 다시 보기
              </button>
            )}
          </div>
        )}

        {imgError && !analyzing && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-5 mb-6 text-center">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-3">🙈 {imgError}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-bold text-amber-950 bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2.5 transition-colors"
            >
              다른 사진 선택하기
            </button>
          </div>
        )}

        {result && !analyzing && (
          <div id="mood-result" className="space-y-4">
            <div
              className="rounded-lg p-6 text-white text-center"
              style={{ background: `linear-gradient(135deg, ${result.from} 0%, ${result.to} 100%)` }}
            >
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <div className="text-4xl mb-2">{result.emoji}</div>
              <p className="text-sm font-semibold text-white/80 mb-1">{result.vibe}</p>
              <p className="text-xl font-bold mb-3">{result.label}</p>
              <p className="text-sm leading-relaxed">{result.text}</p>
            </div>

            {palette.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
                <p className="label-caps mb-3">이 사진의 컬러 팔레트</p>
                <div className="flex gap-2">
                  {palette.map(hex => (
                    <div key={hex} className="flex-1 text-center">
                      <div className="w-full aspect-square rounded-xl mb-1.5 border border-slate-200 dark:border-slate-700 shadow-sm" style={{ background: hex }} />
                      <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">{hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">☀️ 밝기</p>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{result.brightnessPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sec rounded-full" style={{ width: `${result.brightnessPercent}%` }} />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">채도</p>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{result.saturationPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sec rounded-full" style={{ width: `${result.saturationPercent}%` }} />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">🌡️ 웜/쿨</p>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{result.warmthPercent}% {result.warmthPercent >= 50 ? '웜' : '쿨'}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sec rounded-full" style={{ width: `${result.warmthPercent}%` }} />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">◐ 대비</p>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{result.contrastPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sec rounded-full" style={{ width: `${result.contrastPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-lg p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">캡션 팁</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.captionTip}</p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-lg font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-fuchsia-300 hover:text-fuchsia-600 transition-colors"
            >다른 사진으로 다시 해보기
            </button>

            <SaveResultCard
              emoji={result.emoji}
              title={result.label}
              subtitle={result.vibe}
              body={result.text}
              from={result.from}
              to={result.to}
              fileName="photo-mood-result"
            />

            <ShareButton title="사진 감성 분석 결과" description={`${result.label} — ${result.text}`} type="fortune" />

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              밝기·채도·색감 측정은 실제 픽셀 데이터를 분석한 결과이며, 감성 타입 해석은 참고용 오락 콘텐츠입니다.
            </p>
          </div>
        )}

        <Faq items={SECTION_FAQ['snap/photo-mood']} />
      </div>
      <SiteFooter />
    </div>
  );
}
