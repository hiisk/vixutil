import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang } from '@/lib/i18n/lang';
import { CSS_PROPS, CSS_ICON, PROP_KINDS, propsOfKind } from '@/lib/css/props';
import { propDesc } from '@/lib/css/desc';
import { CSS_UI } from '@/lib/css/ui';

/**
 * CSS 속성 목록 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 갈래로 나누고 줄마다 한 줄 설명을 함께 적는다. 목록만 훑어도 어느 속성을
 * 골라야 하는지 보이는 것이 이 화면의 몫이다.
 */
export default function PropHubPage({ lang }: { lang: Lang }) {
  const ui = CSS_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/css`;
  const base = lang === 'ko' ? 'ko' : 'en';

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, CSS_PROPS.map(p => ({ name: p.name, path: `${path}/${p.name}` })))} />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-600 to-sky-500" />

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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-blue-600 to-sky-500">
            <ToolIcon emoji={CSS_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        {PROP_KINDS.map(kind => (
          <section key={kind} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">
              {ui.kindLabel[kind]}
              <span className="ml-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">{propsOfKind(kind).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.kindNote[kind]}</p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {propsOfKind(kind).map(p => (
                <Link
                  key={p.name}
                  href={`${path}/${p.name}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-blue-600 dark:text-blue-400 font-mono shrink-0">{p.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{propDesc(p.name, lang)}</span>
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
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/css`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
