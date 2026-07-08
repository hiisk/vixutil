'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { hashBytes, getFaceReading, type FaceReadingResult } from '@/lib/face-reading-data';

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = '사진 한 장으로 보는 재미있는 관상 테스트 — vixutil.com';
    if (navigator.share) {
      try { await navigator.share({ title: text, url }); return; } catch { /* 사용자가 취소한 경우 */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch { /* 클립보드 권한 없음 */ }
  }, []);

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 border-white/30 text-white hover:bg-white/30"
    >
      {state === 'copied' ? '복사됨 ✓' : '공유'}
    </button>
  );
}

export default function FaceReadingPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<FaceReadingResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // 언마운트 시 미리보기용 objectURL 정리 (메모리 누수 방지)
    return () => { if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current); };
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    setResult(null);
    setAnalyzing(true);

    // 사진은 이 브라우저 안에서만 바이트 해시로 변환될 뿐, 어디에도 전송되지 않는다.
    const buf = await file.arrayBuffer();
    const hash = hashBytes(new Uint8Array(buf));

    // 짧은 "분석 중" 연출 — 실제 서버 통신 없이 로컬에서 즉시 계산됨
    setTimeout(() => {
      setResult(getFaceReading(hash));
      setAnalyzing(false);
      setTimeout(() => document.getElementById('face-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }, 900);
  }, []);

  function handleReset() {
    setPreview(null);
    setResult(null);
    setAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-teal-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">관상 테스트</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🪞</div>
          <h1 className="text-2xl font-black text-slate-900 mb-1.5">관상 테스트</h1>
          <p className="text-slate-500 text-sm">사진 한 장으로 보는 재미있는 관상 분석</p>
        </div>

        {/* 안내 · 개인정보 보호 고지 */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-6 text-xs text-teal-800 leading-relaxed">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>업로드한 사진은 이 브라우저 안에서만 분석되고 어디에도 저장·전송되지 않습니다. 과학적 근거가 없는 재미용 콘텐츠이니 참고용으로만 즐겨주세요.</p>
        </div>

        {/* 업로드 영역 */}
        {!preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white hover:border-teal-400 hover:bg-teal-50/50 transition-colors"
          >
            <span className="text-4xl">📷</span>
            <span className="text-sm font-bold text-slate-600">사진을 선택해주세요</span>
            <span className="text-xs text-slate-400">앨범에서 고르거나 바로 촬영할 수 있어요</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        {/* 미리보기 */}
        {preview && (
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="업로드한 사진 미리보기" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">관상 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 mx-auto block text-xs font-semibold text-slate-400 hover:text-teal-600 transition-colors"
              >
                다른 사진으로 다시 보기
              </button>
            )}
          </div>
        )}

        {/* 결과 */}
        {result && !analyzing && (
          <div id="face-result" className="space-y-4">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-700 rounded-2xl p-6 text-white text-center">
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <p className="text-sm font-semibold text-teal-100 mb-2">✨ 전체 인상</p>
              <p className="text-sm leading-relaxed">{result.overall}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {result.features.map(f => (
                <div key={f.key} className="bg-white border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{f.icon} {f.label}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">🔮 오늘의 관상운</p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.todayLuck}</p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white border-2 border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-600 transition-colors"
            >
              🔄 다른 사진으로 다시 해보기
            </button>

            <p className="text-center text-xs text-slate-300 pt-2">
              관상 테스트는 오락 목적의 콘텐츠이며 과학적·의학적 근거가 없습니다.
            </p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
