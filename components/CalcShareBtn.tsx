'use client';
import { useState } from 'react';
import { langOfLocale } from '@/lib/i18n/lang';
import type { AnyLocale10 } from '@/lib/locales';
import { SHARE_UI, shareOne } from '@/lib/share/ui';

/** lang을 안 넘기면 한국어다 — 한국어 CalcShell이 그대로 쓴다 */
export default function CalcShareBtn({ lang = 'ko' }: { lang?: AnyLocale10 }) {
  const ui = SHARE_UI[langOfLocale(lang)];
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    /* 제목은 <title> 전체(“… | 실생활 계산기”) 말고 h1까지만 — 검색엔진용
       꼬리표는 카톡에서 그냥 잡음이다. h1이 없으면 <title>로 물러난다. */
    const h1 = document.querySelector('h1')?.textContent?.trim();
    if (await shareOne(h1 || document.title)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="sh-chip"
      aria-label={ui.calcAria}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-blue-500">{ui.calcCopied}</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          {ui.calcShare}
        </>
      )}
    </button>
  );
}
