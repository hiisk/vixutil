import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Lang } from '@/lib/formula/terms';
import { FORMULA_UI, FORMULA_LANGS } from '@/lib/formula/ui';
import type { SectionConfig } from '@/lib/rate-section';

/**
 * 공식 도구 허브 — 카테고리별로 묶어 쉰 개를 한 화면에 보여준다.
 *
 * 쉰 개를 한 줄로 늘어놓으면 아무것도 찾을 수 없다. 카테고리 제목이 스크롤
 * 중에도 어디쯤인지 알려주는 표지가 된다.
 */
export default function FormulaHub({ lang, section }: { lang: Lang; section: SectionConfig }) {
  const ui = FORMULA_UI[lang];
  const meta = section.meta[lang];
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  const homeHref = lang === 'ko' ? '/' : `${prefix}/${section.key}`;
  const label = section.categoryLabel[lang];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: meta.section, path: `${prefix}/${section.key}` },
        ])}
      />

      <PageGlow accent={section.accent} />
      <div className={`h-1 bg-gradient-to-r ${section.gradBar}`} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${section.linkHover} transition-colors font-medium`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
            {FORMULA_LANGS.filter(l => l.lang !== lang).map(l => (
              <Link key={l.lang} href={`${l.prefix}/${section.key}`} hrefLang={l.lang} className={`${section.linkHover} transition-colors`}>
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-9">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{meta.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{meta.hubLead}</p>
          <p className="mt-4 inline-block rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            {meta.hubNotice}
          </p>
        </div>

        {section.categories.map(cat => {
          const tools = section.tools.filter(t => t.category === cat);
          if (tools.length === 0) return null;
          return (
            <section key={cat} className="mb-8">
              <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 mb-3 pl-1">
                {label[cat] ?? cat}
                <span className="ml-2 font-bold text-slate-300 dark:text-slate-600">{tools.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {tools.map(t => (
                  <Link
                    key={t.slug}
                    href={`${prefix}/${section.key}/${t.slug}`}
                    className={`group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 ${section.hoverBorder} hover:shadow-sm transition-all`}
                  >
                    <span className="text-xl shrink-0">{t.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-bold text-slate-800 dark:text-slate-100 ${section.hoverText} transition-colors`}>
                        {t[lang].title}
                      </span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{t[lang].desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-4 leading-relaxed">{meta.footNote}</p>
      </main>

      <SiteFooter lang={lang === 'ko' ? 'ko' : 'en'} />
    </div>
  );
}
