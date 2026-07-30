import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { HOME_UI, homeSections } from '@/lib/locale-home';
import { localeHref, type AnyLocale } from '@/lib/locales';

/**
 * 번역 언어의 첫 화면 — 일곱 언어가 이 하나를 쓴다.
 *
 * 섹션 허브만 있고 그걸 묶는 루트 페이지가 없으면, /es/color로 바로 들어온 방문자가
 * "이 사이트에 또 뭐가 있나"를 볼 방법이 없다. 허브 헤더의 로고가 /es를 가리키고
 * 있으니 그 링크는 404이기도 하다.
 *
 * 실을 섹션은 lib/locale-home.ts가 정한다. 여기서는 그리는 일만 한다.
 */
export default function LocaleHome({ lang }: { lang: Exclude<AnyLocale, 'ko'> }) {
  const ui = HOME_UI[lang];
  const sections = homeSections(lang);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500" />

      <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <div className="mb-14 text-center">
          <h1 className="inline-flex items-center gap-1 mb-4">
            <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tighter">util</span>
            <span className="sr-only">{ui.srTagline}</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-base">{ui.tagline}</p>
          {/* 첫 화면은 여덟 언어 전부 있으니 available을 좁히지 않는다 */}
          <div className="mt-5 flex justify-center">
            <LangPicker current={lang} route="/" align="left" />
          </div>
        </div>

        {/* 통합 검색 진입점 — 어느 섹션에 있는지 몰라도 찾을 수 있게 한다 */}
        {ui.search && (
          <Link
            href={localeHref(lang, '/search')}
            className="group flex items-center gap-3 mb-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-white/70 dark:border-slate-700/70 rounded-2xl px-4 py-3.5 shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all"
          >
            <svg aria-hidden="true" className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="text-base text-slate-400 dark:text-slate-500 group-hover:text-slate-500 transition-colors">{ui.search.placeholder}</span>
            <span className="ml-auto text-xs font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0">{ui.search.cta}</span>
          </Link>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {sections.map(s => (
            <Link
              key={s.route}
              href={localeHref(lang, s.route)}
              className={`group relative overflow-hidden rounded-2xl border ${s.border} ${s.bg} backdrop-blur-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <ToolIcon emoji={s.icon} className="text-slate-800 dark:text-slate-100 w-9 h-9 block mb-4" />
                <h2 className={`text-lg font-black ${s.accent} mb-1`}>{s.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{s.desc}</p>
                <div className={`flex items-center gap-1 text-xs font-semibold ${s.accent}`}>
                  {ui.open}
                  <svg aria-hidden="true" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10 leading-relaxed">{ui.notice}</p>
      </div>

      <footer className="text-center pb-8">
        <p className="text-xs text-slate-300 dark:text-slate-600">vixutil.com</p>
      </footer>
    </div>
  );
}
