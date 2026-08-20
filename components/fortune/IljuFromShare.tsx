'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

/**
 * 공유로 들어온 사람에게 «그 생년월일의 전체 사주»로 가는 길.
 *
 * 사주를 본 사람이 공유하면 주소에 생년월일이 실려 온다
 * (/fortune/ilju/byeongja?y=1997&m=10&d=1&h=12:00&g=male). 일주 장은 구워서
 * 캐시에 두므로 서버에서 그 물음표를 읽으면 안 된다 — 읽는 순간 요청마다
 * 그려야 하고 캐시가 사라진다. 그래서 붙은 뒤 손님 쪽에서 읽는다.
 *
 * 물음표가 없으면(검색으로 들어온 사람) 아무것도 안 그린다. 그쪽에는 이미
 * 아래에 「내 일주를 모르면」 안내가 있다.
 */
const SEARCH = () => (typeof location === 'undefined' ? '' : location.search);

export default function IljuFromShare({ label }: { label: string }) {
  const search = useSyncExternalStore(() => () => {}, SEARCH, () => '');
  if (!search) return null;

  const q = new URLSearchParams(search);
  const y = q.get('y');
  const m = q.get('m');
  const d = q.get('d');
  if (!y || !m || !d) return null;

  return (
    <Link
      href={`/fortune/saju${search}`}
      className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-sec px-4 py-3.5 active:scale-[0.99] transition-transform"
    >
      <span className="min-w-0">
        <span className="block text-[11px] font-medium text-white/75">
          {y}년 {m}월 {d}일생
        </span>
        <span className="block text-sm font-bold text-white">{label}</span>
      </span>
      <svg className="h-4 w-4 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </Link>
  );
}
