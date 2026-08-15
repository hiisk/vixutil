'use client';
import { useState } from 'react';
import { langOfLocale } from '@/lib/i18n/lang';
import type { AnyLocale10 } from '@/lib/locales';
import { SHARE_UI } from '@/lib/share/ui';

/** lang을 안 넘기면 한국어다 — 한국어 CalcShell이 그대로 쓴다 */
export default function CalcShareBtn({ lang = 'ko' }: { lang?: AnyLocale10 }) {
  const ui = SHARE_UI[langOfLocale(lang)];
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-blue-600 border border-slate-200 dark:border-slate-700 hover:border-blue-300 rounded-xl px-3 py-1.5 transition-all relative"
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
