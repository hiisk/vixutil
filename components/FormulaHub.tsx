import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { FormulaLang } from '@/lib/formula/terms';
import { textOf } from '@/lib/formula/text';
import { FORMULA_UI, formulaLocales } from '@/lib/formula/ui';
import LangPicker from '@/components/LangPicker';
import { sectionCategories, sectionMeta, type SectionConfig } from '@/lib/formula/section';
import { localeHref, localePrefix } from '@/lib/locales';

/**
 * 공식 도구 허브 — 카테고리별로 묶어 쉰 개를 한 화면에 보여준다.
 *
 * 쉰 개를 한 줄로 늘어놓으면 아무것도 찾을 수 없다. 카테고리 제목이 스크롤
 * 중에도 어디쯤인지 알려주는 표지가 된다.
 */
export default function FormulaHub({ lang, section }: { lang: FormulaLang; section: SectionConfig }) {
  const ui = FORMULA_UI[lang];
  const meta = sectionMeta(section, lang);
  const prefix = localePrefix(lang);
  const homeHref = localeHref(lang, '/');
  const label = sectionCategories(section, lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: meta.section, path: `${prefix}/${section.key}` },
        ])}
      />

      <PageGlow accent={section.accent} />
      <div className={`h-1 bg-gradient-to-r ${section.gradBar}`} />

      <header className="page-head">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link prefetch={false} href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${section.linkHover} transition-colors font-medium`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/${section.key}`} available={formulaLocales(section)} />
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-9">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{meta.hubTitle}</h1>
          <p className="note-sm">{meta.hubLead}</p>
          <p className="mt-4 inline-block rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            {meta.hubNotice}
          </p>
        </div>

        {section.categories.map(cat => {
          const tools = section.tools.filter(t => t.category === cat);
          if (tools.length === 0) return null;
          return (
            <section key={cat} className="mb-8">
              <h2 className="hub-cat-h2">
                {label[cat] ?? cat}
                <span className="hub-cat-count">{tools.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {tools.map(t => (
                  <Link prefetch={false}
                    key={t.slug}
                    href={`${prefix}/${section.key}/${t.slug}`}
                    className={`group hub-card ${section.hoverBorder}`}
                  >
                    <ToolIcon emoji={t.icon} className="hub-card-icon" />
                    <span className="hub-card-body">
                      <span className={`hub-card-title ${section.hoverText}`}>
                        {textOf(t, lang).title}
                      </span>
                      <span className="hub-card-desc">{textOf(t, lang).desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-4 leading-relaxed">{meta.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
