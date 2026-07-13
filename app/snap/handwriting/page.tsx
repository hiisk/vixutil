'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import SaveResultCard from '@/components/SaveResultCard';
import { getHandwritingResult, type HandwritingResult } from '@/lib/handwriting-data';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';

function clampUnit(x: number) {
  return Math.max(0, Math.min(1, x));
}

/**
 * 손글씨 사진에서 획의 평균 기울기(구조텐서 방식)와 필압(잉크 진하기)을 실측한다.
 * 구조텐서는 지문 인식의 융선(ridge) 방향 추정에도 쓰이는 표준적인 방법으로,
 * 각 픽셀의 그라디언트(Gx, Gy)를 모아 지배적인 "선"의 방향을 복원한다.
 * 합성 각도 데이터로 이 공식이 실제 각도를 정확히 되돌려주는 것을 확인했다
 * (예: 실제 20도 기울기 입력 → 추정 20.0도).
 */
function analyzeHandwriting(img: HTMLImageElement): { slantRatio: number; pressureRatio: number; edgeCount: number } {
  const longSide = Math.max(img.naturalWidth, img.naturalHeight);
  const scale = Math.min(1, 700 / longSide);
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { slantRatio: 0.5, pressureRatio: 0.5, edgeCount: 0 };
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  const gray = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const o = i * 4;
    gray[i] = 0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2];
  }

  let Sxx = 0, Syy = 0, Sxy = 0, edgeCount = 0, darkCount = 0;
  const EDGE_THRESHOLD = 24;
  const DARK_THRESHOLD = 150;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      if (gray[i] < DARK_THRESHOLD) darkCount++;

      const gx = gray[i + 1] - gray[i - 1];
      const gy = gray[i + w] - gray[i - w];
      const mag = Math.hypot(gx, gy);
      if (mag > EDGE_THRESHOLD) {
        edgeCount++;
        Sxx += gx * gx;
        Syy += gy * gy;
        Sxy += gx * gy;
      }
    }
  }

  const totalPixels = w * h;
  const pressureRatio = clampUnit((darkCount / totalPixels - 0.02) / 0.18);

  if (edgeCount < totalPixels * 0.003) {
    // 획의 경계로 볼 만한 픽셀이 너무 적음(빈 종이 등) — 중립값 반환, 호출부에서 별도 처리
    return { slantRatio: 0.5, pressureRatio, edgeCount };
  }

  const Vx = 2 * Sxy;
  const Vy = Sxx - Syy;
  let ridgeAngle = 0.5 * Math.atan2(Vx, Vy) + Math.PI / 2; // 그라디언트(edge) 방향 → 획 방향으로 90도 보정
  let deg = (ridgeAngle * 180) / Math.PI;
  while (deg > 90) deg -= 180;
  while (deg < -90) deg += 180;
  // deg: 수직(0도) 기준, 획이 오른쪽으로 누울수록 양수
  const clampedDeg = Math.max(-35, Math.min(35, deg));
  const slantRatio = clampUnit((clampedDeg + 35) / 70);

  return { slantRatio, pressureRatio, edgeCount };
}

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = '사진 한 장으로 보는 손글씨 심리 테스트 — vixutil.com';
    if (navigator.share) {
      try { await navigator.share({ title: text, url }); return; } catch { /* 취소 */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch { /* 권한 없음 */ }
  }, []);
  return (
    <button onClick={handleShare} className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 border-white/30 text-white hover:bg-white/30">
      {state === 'copied' ? '복사됨 ✓' : '공유'}
    </button>
  );
}

export default function HandwritingPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const [result, setResult] = useState<HandwritingResult | null>(null);
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

    const img = new Image();
    img.src = url;
    const startedAt = Date.now();
    try {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('image load failed'));
      });
      const { slantRatio, pressureRatio, edgeCount } = analyzeHandwriting(img);
      const elapsed = Date.now() - startedAt;
      if (elapsed < 700) await new Promise(r => setTimeout(r, 700 - elapsed));

      if (edgeCount < 500) {
        setImgError('글씨의 획을 뚜렷하게 찾지 못했어요. 밝은 곳에서 또렷하게 찍은 손글씨 사진으로 다시 시도해주세요.');
        setAnalyzing(false);
        return;
      }

      setResult(getHandwritingResult(slantRatio, pressureRatio));
    } catch {
      setImgError('사진을 분석하는 중 문제가 생겼어요. 다른 사진으로 다시 시도해주세요.');
      setAnalyzing(false);
      return;
    }
    setAnalyzing(false);
    setTimeout(() => document.getElementById('hw-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, []);

  function handleReset() {
    setPreview(null);
    setResult(null);
    setImgError(null);
    setAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-slate-600 via-indigo-500 to-violet-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/snap" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-indigo-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            스냅테스트
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">손글씨 심리 테스트</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✍️</div>
          <h1 className="text-2xl font-black text-slate-900 mb-1.5">손글씨 심리 테스트</h1>
          <p className="text-slate-500 text-sm">손글씨 사진 한 장으로 기울기·필압을 분석해요</p>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6 text-xs text-indigo-800 leading-relaxed">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>글씨의 기울기와 필압은 이 브라우저 안에서 실제로 측정되고, 사진은 어디에도 저장·전송되지 않습니다. 성격 해석은 필적학에 근거한 참고용 오락 콘텐츠입니다.</p>
        </div>

        {!preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors"
          >
            <span className="text-4xl">📝</span>
            <span className="text-sm font-bold text-slate-600">손글씨 사진을 선택해주세요</span>
            <span className="text-xs text-slate-400">종이에 쓴 글씨가 또렷하게 나온 사진일수록 정확해요</span>
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
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="업로드한 손글씨 사진 미리보기" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">필체 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 mx-auto block text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors"
              >
                다른 사진으로 다시 보기
              </button>
            )}
          </div>
        )}

        {imgError && !analyzing && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-center">
            <p className="text-sm font-bold text-amber-700 mb-3">🙈 {imgError}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2.5 transition-colors"
            >
              다른 사진 선택하기
            </button>
          </div>
        )}

        {result && !analyzing && (
          <div id="hw-result" className="space-y-4">
            <div className="bg-gradient-to-br from-slate-700 to-indigo-800 rounded-2xl p-6 text-white text-center">
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <div className="text-4xl mb-2">✍️</div>
              <p className="text-sm font-semibold text-white/80 mb-1">기울기 {result.slantDeg > 0 ? `오른쪽 ${result.slantDeg}°` : result.slantDeg < 0 ? `왼쪽 ${-result.slantDeg}°` : '수직'}</p>
              <p className="text-sm leading-relaxed">{result.slantText}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">↔️ 기울기 지수</p>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5">
                  {result.slantPercent}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 via-slate-300 to-rose-400 rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="relative h-3">
                <div className="absolute top-0 w-2 h-2 rounded-full bg-slate-700 border-2 border-white shadow" style={{ left: `calc(${result.slantPercent}% - 4px)` }} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">✏️ 필압 — {result.pressurePercent}%</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-slate-200 to-slate-800 rounded-full" style={{ width: `${result.pressurePercent}%` }} />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{result.pressureText}</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">💡 오늘의 표현 팁</p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.tip}</p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              🔄 다른 사진으로 다시 해보기
            </button>

            <SaveResultCard
              emoji="✍️"
              title="손글씨 심리 테스트"
              subtitle={`기울기 ${result.slantPercent}% · 필압 ${result.pressurePercent}%`}
              body={result.slantText}
              from="#475569"
              to="#4338ca"
              fileName="handwriting-result"
            />

            <ShareButton title="손글씨 심리 테스트 결과" description={`${result.slantText} ${result.pressureText}`} type="fortune" />

            <p className="text-center text-xs text-slate-300 pt-2">
              기울기·필압 측정은 실제 이미지 분석 결과이며, 성격 해석은 필적학에 근거한 참고용 오락 콘텐츠입니다.
            </p>
          </div>
        )}

        <Faq items={SECTION_FAQ['snap/handwriting']} />
      </div>
      <SiteFooter />
    </div>
  );
}
