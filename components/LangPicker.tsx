'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ALL_LOCALES, localeHref, localeLabel, localeTag, type AnyLocale } from '@/lib/locales';

/**
 * 언어 선택 버튼.
 *
 * 언어가 둘일 때는 `한국어 · EN`처럼 링크를 나란히 두면 됐지만, 여덟 개가 되면
 * 그 줄이 화면 폭을 넘긴다. 그래서 지금 언어만 보여주고 나머지는 눌러서 펼친다.
 *
 * 각 항목은 그 언어의 이름을 그 언어로 적는다 — Español, 日本語, हिन्दी. 영어로
 * 'Spanish'라고 적으면 스페인어만 읽는 사람이 자기 언어를 못 찾는다.
 *
 * hreflang은 여기 링크가 아니라 metadata.alternates가 담당한다. 이 버튼은 사람이
 * 누르는 것이고, 검색 엔진에 알리는 일은 <head>에서 따로 한다 — 화면에 없는
 * 언어까지 alternates에 넣어야 하는 경우가 있어서 둘을 붙여 두면 한쪽이 막힌다.
 */
export default function LangPicker({
  current,
  route,
  available,
  align = 'right',
}: {
  /** 지금 보고 있는 언어 */
  current: AnyLocale;
  /** 언어 접두어를 뺀 경로. 예: '/color/palette' */
  route: string;
  /** 이 페이지가 실제로 있는 언어. 생략하면 여덟 개 전부 */
  available?: readonly AnyLocale[];
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const locales = (available ?? ALL_LOCALES).filter(l => ALL_LOCALES.includes(l));

  // 바깥을 누르면 닫는다. 열린 목록이 화면에 남아 있으면 다음 조작을 가린다.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // 이 페이지에 다른 언어가 없으면 버튼을 그리지 않는다
  if (locales.length < 2) return null;

  return (
    <div ref={boxRef} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
      >
        <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5 0 4.5-4.03 4.5-9S14.5 3 12 3 7.5 7.03 7.5 12s2 9 4.5 9zM3.6 9h16.8M3.6 15h16.8" />
        </svg>
        <span className="max-w-[6.5rem] truncate">{localeLabel(current)}</span>
        <svg aria-hidden="true" className={`w-3 h-3 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-50 mt-1.5 min-w-[9rem] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {locales.map(l => (
            <Link
              key={l}
              href={localeHref(l, route)}
              hrefLang={localeTag(l)}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`block px-3.5 py-2 text-xs font-bold transition-colors ${
                l === current
                  ? 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {localeLabel(l)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
