import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS8, prefix8, type Lang8 } from '@/lib/i18n/lang8';
import { HTTP_ITEMS, HTTP_ICON, headersOfSide, statusesOfClass, type StatusClass } from '@/lib/http/list';
import { httpDesc } from '@/lib/http/desc';
import { HTTP_UI } from '@/lib/http/ui';

const CLASSES: StatusClass[] = ['1xx', '2xx', '3xx', '4xx', '5xx'];
const SIDES: ('request' | 'response' | 'both')[] = ['request', 'response', 'both'];

/**
 * 상태 코드와 헤더 목록 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 상태 코드는 첫 자리로, 헤더는 요청·응답으로 나눈다. 줄마다 한 줄 설명을
 * 붙여 목록만 훑어도 답이 보이게 한다.
 */
export default function HttpHubPage({ lang }: { lang: Lang8 }) {
  const ui = HTTP_UI[lang];
  const prefix = prefix8(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/http`;
  const base = lang === 'ko' ? 'ko' : 'en';

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, HTTP_ITEMS.map(x => ({ name: x.name, path: `${path}/${x.slug}` })))} />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-600 to-emerald-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-teal-600 to-emerald-500">
            <ToolIcon emoji={HTTP_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.statusTitle}</h2>
        {CLASSES.map(c => (
          <section key={c} className="mb-8">
            <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-1">
              {ui.classLabel[c]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{statusesOfClass(c).length}</span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.classNote[c]}</p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {statusesOfClass(c).map(x => (
                <Link
                  key={x.slug}
                  href={`${path}/${x.slug}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-teal-700 dark:text-teal-400 font-mono shrink-0 tabular-nums">{x.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{httpDesc(x.slug, lang)}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.headerTitle}</h2>
        {SIDES.map(s => (
          <section key={s} className="mb-8">
            <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-1">
              {ui.sideLabel[s]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{headersOfSide(s).length}</span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.sideNote[s]}</p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {headersOfSide(s).map(x => (
                <Link
                  key={x.slug}
                  href={`${path}/${x.slug}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-teal-700 dark:text-teal-400 font-mono shrink-0">{x.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{httpDesc(x.slug, lang)}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS8.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/http`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
