'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window { Kakao: any; }
}

export default function ShareButtons({ title, description }: { title: string; description: string }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  const pageUrl = mounted ? window.location.href : '';
  const enc = (s: string) => encodeURIComponent(s);

  function onKakaoLoad() {
    const key = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (key && window.Kakao && !window.Kakao.isInitialized()) window.Kakao.init(key);
  }

  function shareKakao() {
    if (!window.Kakao?.isInitialized()) return alert('카카오 공유 키가 설정되지 않았습니다.');
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: 'https://vixutil.com/og-image.png',
        link: { webUrl: pageUrl, mobileWebUrl: pageUrl },
      },
    });
  }

  function open(url: string) { window.open(url, '_blank', 'noopener,noreferrer'); }

  async function shareNative() {
    try { await navigator.share({ title, text: description, url: pageUrl }); } catch {}
  }

  async function copyLink() {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!mounted) return null;

  return (
    <>
      {process.env.NEXT_PUBLIC_KAKAO_APP_KEY && (
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          crossOrigin="anonymous"
          onLoad={onKakaoLoad}
        />
      )}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-xs text-slate-400 mb-3 text-center font-semibold tracking-wide">공유하기</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {process.env.NEXT_PUBLIC_KAKAO_APP_KEY && (
            <button onClick={shareKakao} className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FEE500] text-[#3A1D1D] rounded-xl text-xs font-bold hover:brightness-95 transition">
              <span className="text-base">💬</span> 카카오톡
            </button>
          )}
          <button onClick={() => open(`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(pageUrl)}`)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-black text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition">
            <span className="text-base">𝕏</span> X
          </button>
          <button onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}`)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1877F2] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition">
            <span className="text-base">f</span> 페이스북
          </button>
          <button onClick={() => open(`https://social-plugins.line.me/lineit/share?url=${enc(pageUrl)}`)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#00B900] text-white rounded-xl text-xs font-bold hover:bg-green-700 transition">
            <span className="text-base">💚</span> 라인
          </button>
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button onClick={shareNative}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition">
              📤 더보기
            </button>
          )}
          <button onClick={copyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition">
            {copied ? '✅ 복사됨' : '🔗 링크복사'}
          </button>
        </div>
      </div>
    </>
  );
}
