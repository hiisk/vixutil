import Link from 'next/link';
import { localeHref } from '@/lib/locales';
/*
 * 스타일시트를 여기서 직접 부른다.
 *
 * 이 화면은 RootShell 안이 아니라 그 **바깥**에서 그려진다 — 404 경계가 app/
 * 층에 서고 언어별 루트 레이아웃((ko)·(ja)…)은 그 아래라, 경계가 걸리는 순간
 * 레이아웃이 통째로 빠진다. 렌더해서 확인했다: <html id="__next_error__">에
 * <link rel="stylesheet">가 하나도 없다. globals.css를 안 부르면 page-wrap도
 * chip도 이름만 남고, Next 기본 404보다 나을 게 없어진다.
 */
import '@/app/globals.css';

/**
 * 주소가 어긋났을 때 나가는 화면 — 캐치올의 notFound()와 아무 데도 안 맞는 주소가
 * 여기로 온다. 전에는 Next 기본 404였고, 영문 한 줄에 링크가 하나도 없어서
 * 들어온 사람이 그대로 나갔다.
 *
 * **언어를 맞히지 않는다.** 없는 주소라 매칭된 세그먼트가 없어 어느 언어인지 알
 * 수 없고, 경로를 읽으려면 요청 때 그려야 한다. 그래서 한국어와 영어를 나란히
 * 놓아 양쪽 다 길을 준다 — 열 언어를 다 늘어놓으면 이 화면이 언어 고르기 화면이
 * 된다. 다른 여덟 언어 사용자에게는 영어 쪽이 가장 넓게 통한다(locales.ts의
 * x-default가 영어인 것과 같은 이유).
 *
 * 요청 때 그리는 코드(new Date()·cookies·headers)를 넣지 않는다. 넣는 순간 이
 * 화면이 정적으로 안 구워지고 404마다 원본까지 간다 — 404는 크롤러가 가장 자주
 * 밟는 화면이라 그 비용이 그대로 Origin Transfer가 된다.
 *
 * SiteFooter는 붙이지 않았다. 링크는 많아지지만 lang을 못 정해서 기본값인
 * 한국어로 그려지고(한국어 섹션 42개 + 한국어 계산기 인기 목록 + 제휴 카드),
 * 언어를 안 고르려고 만든 화면에 한국어 목록만 잔뜩 붙는 꼴이 된다.
 * 아래 손으로 적은 열두 줄이 같은 일을 양쪽 언어로 한다.
 */

/* 열 언어에 다 있는 섹션만 건다 — 없는 주소로 보내면 404에서 404로 간다 */
const SECTIONS: { route: string; ko: string; en: string }[] = [
  { route: '/calculator', ko: '계산기', en: 'Calculators' },
  { route: '/convert', ko: '단위 변환', en: 'Unit converters' },
  { route: '/time', ko: '시간 도구', en: 'Time tools' },
  { route: '/color', ko: '색상 도구', en: 'Color tools' },
  { route: '/text', ko: '텍스트 도구', en: 'Text tools' },
  { route: '/image', ko: '이미지 도구', en: 'Image tools' },
];

const COLUMNS = [
  { locale: 'ko', head: '한국어', home: '홈', search: '전체 검색' },
  { locale: 'en', head: 'English', home: 'Home', search: 'Search all' },
] as const;

export default function NotFound() {
  return (
    <div className="hero-band page-wrap flex flex-col">
      <div className="h-1 topbar" />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-14 w-full">
        <p className="text-6xl font-bold tabular-nums text-slate-200 dark:text-slate-700 mb-3">404</p>
        <h1 className="page-h1">페이지를 찾을 수 없습니다 · Page not found</h1>
        <p className="note-sm">주소가 바뀌었거나 지워진 페이지입니다. 아래에서 찾아보세요.</p>
        <p className="note-sm mb-10">This page doesn’t exist — it may have moved or been removed.</p>

        {/* lang을 칸마다 붙인다 — 바깥 <html>에는 lang이 없고(RootShell 밖이라
            우리가 못 정한다), 한 화면에 두 언어가 있으니 어차피 이쪽이 맞다 */}
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
          {COLUMNS.map((c) => (
            <section key={c.locale} lang={c.locale}>
              <h2 className="sec-h2">{c.head}</h2>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={localeHref(c.locale, '/')}
                  className="chip chip-off hover:border-slate-300 dark:hover:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  {c.home}
                </Link>
                <Link
                  href={localeHref(c.locale, '/search')}
                  className="chip chip-off hover:border-slate-300 dark:hover:border-slate-700 text-sm font-bold text-indigo-600 dark:text-indigo-400"
                >
                  {c.search}
                </Link>
                {SECTIONS.map((s) => (
                  <Link
                    key={s.route}
                    href={localeHref(c.locale, s.route)}
                    className="chip chip-off hover:border-slate-300 dark:hover:border-slate-700 text-sm text-slate-600 dark:text-slate-300"
                  >
                    {s[c.locale]}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
