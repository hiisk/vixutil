'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ALL_LOCALES10, localeFlag, localeHref, localeLabel, localeTag, type AnyLocale10 } from '@/lib/locales';

/**
 * 언어 선택 버튼.
 *
 * 언어가 둘일 때는 `한국어 · EN`처럼 링크를 나란히 두면 됐지만, 열 개가 되면
 * 그 줄이 화면 폭을 넘긴다. 그래서 지금 언어만 보여주고 나머지는 눌러서 펼친다.
 *
 * 각 항목은 그 언어의 이름을 그 언어로 적는다 — Español, 日本語, हिन्दी. 영어로
 * 'Spanish'라고 적으면 스페인어만 읽는 사람이 자기 언어를 못 찾는다.
 *
 * 이름 앞에 깃발을 곁들인다. 열 줄을 눈으로 훑을 때 글자보다 그림이 먼저 걸려서
 * 자기 언어를 찾는 속도가 눈에 띄게 빠르다. 다만 깃발은 나라이지 언어가 아니므로
 * (영어는 미국만의 말이 아니다) 이름을 대신하지 않고 곁들이기만 한다 — 이모지를
 * 못 그리는 환경에서도 목록이 그대로 읽혀야 한다.
 *
 * hreflang은 여기 링크가 아니라 metadata.alternates가 담당한다. 이 버튼은 사람이
 * 누르는 것이고, 검색 엔진에 알리는 일은 <head>에서 따로 한다 — 화면에 없는
 * 언어까지 alternates에 넣어야 하는 경우가 있어서 둘을 붙여 두면 한쪽이 막힌다.
 */
export default function LangPicker({
  current,
  route,
  available,
  overrides,
  align = 'right',
}: {
  /** 지금 보고 있는 언어 */
  current: AnyLocale10;
  /** 언어 접두어를 뺀 경로. 예: '/color/palette' */
  route: string;
  /** 이 페이지가 실제로 있는 언어. 생략하면 열 개 전부 */
  available?: readonly AnyLocale10[];
  /**
   * 그 언어만 주소가 다를 때 쓴다.
   *
   * 행운의 숫자가 그렇다 — 한국어는 /fortune/lucky-lotto다. 한국 로또(6/45)
   * 전용으로 만든 도구라 그 이름이 붙었는데, 다른 나라에서는 복권 형식이 달라
   * 틀린 말이 되므로 다국어는 lucky-numbers로 두었다. 같은 도구이므로 목록에는
   * 있어야 하고, 주소만 갈아 끼운다.
   */
  overrides?: Partial<Record<AnyLocale10, string>>;
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  /*
   * 기본값이 열 언어다.
   *
   * 한때는 여덟 개짜리 ALL_LOCALES가 기본이었다. 중국어를 더할 때 "새로 갖춘
   * 섹션만 available로 넘기면 나머지는 예전대로"라고 두었는데, 그 뒤 모든
   * 섹션이 열 언어가 되고 나서도 available을 안 넘긴 열여덟 군데는 계속 여덟
   * 개만 보여줬다 — 이미지·변환·색·게임·시간·소리·음식·기기·텍스트가 그랬다.
   * 페이지는 열 언어가 다 있는데 버튼에서만 중국어 둘이 빠져 있었다.
   *
   * 이제 반대로 뒤집는다. 일부 언어에만 있는 페이지가 available로 좁힌다.
   */
  const locales = (available ?? ALL_LOCALES10).filter(l => ALL_LOCALES10.includes(l));

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
        className="flex items-center min-h-10 gap-1.5 rounded-xl border chip-off px-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
      >
        <span aria-hidden="true" className="text-sm leading-none">{localeFlag(current)}</span>
        <span className="max-w-[6.5rem] truncate">{localeLabel(current)}</span>
        <svg aria-hidden="true" className={`w-3 h-3 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-50 mt-1.5 min-w-[9rem] rounded-xl border chip-off shadow-lg overflow-hidden ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {locales.map(l => (
            <Link prefetch={false}
              key={l}
              href={localeHref(l, overrides?.[l] ?? route)}
              hrefLang={localeTag(l)}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold transition-colors ${
                l === current
                  ? 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span aria-hidden="true" className="text-sm leading-none">{localeFlag(l)}</span>
              <span className="truncate">{localeLabel(l)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
