import Link from 'next/link';
import Image from 'next/image';
import ToolIcon from '@/components/ToolIcon';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { HOME_UI, homeSections } from '@/lib/locale-home';
import { ALL_LOCALES10, localeHref, type AnyLocale10 } from '@/lib/locales';
import { thumbUrl } from '@/lib/og-cards';

/**
 * 번역 언어의 첫 화면 — 일곱 언어가 이 하나를 쓴다.
 *
 * 섹션 허브만 있고 그걸 묶는 루트 페이지가 없으면, /es/color로 바로 들어온 방문자가
 * "이 사이트에 또 뭐가 있나"를 볼 방법이 없다. 허브 헤더의 로고가 /es를 가리키고
 * 있으니 그 링크는 404이기도 하다.
 *
 * 실을 섹션은 lib/locale-home.ts가 정한다. 여기서는 그리는 일만 한다.
 */
export default function LocaleHome({ lang }: { lang: Exclude<AnyLocale10, 'ko'> }) {
  const ui = HOME_UI[lang];
  const sections = homeSections(lang);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />

      <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-20">
        <div className="mb-8 sm:mb-14">
          <h1 className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tighter">util</span>
            <span className="sr-only">{ui.srTagline}</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-base">{ui.tagline}</p>
          {/* 첫 화면은 여덟 언어 전부 있으니 available을 좁히지 않는다 */}
          <div className="mt-5 flex justify-center">
            <LangPicker current={lang} route="/" align="left" available={ALL_LOCALES10} />
          </div>
        </div>

        {/* 통합 검색 진입점 — 어느 섹션에 있는지 몰라도 찾을 수 있게 한다 */}
        {ui.search && (
          <Link
            href={localeHref(lang, '/search')}
            className="group flex items-center gap-3 mb-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3.5 shadow-sm hover:border-indigo-300 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <svg aria-hidden="true" className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="text-base text-slate-400 dark:text-slate-500 group-hover:text-slate-500 transition-colors">{ui.search.placeholder}</span>
            <span className="ml-auto text-xs font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0">{ui.search.cta}</span>
          </Link>
        )}

        {/* 칸의 그림이 곧 공유 카드다 — globals.css의 .home-card 머리말에 적었다 */}
        <div className="home-grid">
          {sections.map(s => {
            const href = localeHref(lang, s.route);
            const thumb = thumbUrl(href);
            return (
              <Link key={s.route} href={href} className="group home-card">
                {thumb ? (
                  /* next/image를 쓰는 이유와 실측은 app/(ko)/page.tsx에 적었다 */
                  <Image src={thumb} alt="" width={600} height={315} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw" className="home-thumb" />
                ) : (
                  <span className="home-thumb flex items-center justify-center">
                    <ToolIcon emoji={s.icon} className="w-7 h-7 text-slate-400 dark:text-slate-500" />
                  </span>
                )}
                <div className="home-card-body">
                  <h2 className="home-card-title">{s.title}</h2>
                  <p className="home-card-desc">{s.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10 leading-relaxed">{ui.notice}</p>
      </div>

      <footer className="text-center pb-8">
        <p className="text-xs text-slate-300 dark:text-slate-600">vixutil.com</p>
      </footer>
    </div>
  );
}
