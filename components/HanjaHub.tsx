import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { idiomText } from '@/lib/hanja/types';
import { localeHref } from '@/lib/locales';
import LangPicker from '@/components/LangPicker';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { FormulaLang } from '@/lib/formula/terms';
import { HANJA_UI, hanjaCategories, HANJA_SECTION, idiomHeading, HANJA_LANGS } from '@/lib/hanja-ui';

/** 사자성어 허브 — 갈래별로 묶어 50개를 한 화면에 */
export default function HanjaHub({ lang }: { lang: FormulaLang }) {
  const ui = HANJA_UI[lang];
  const s = HANJA_SECTION;
  const homeHref = localeHref(lang, '/hanja');
  const label = hanjaCategories(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: localeHref(lang, '/hanja') },
        ])}
      />

      <PageGlow accent={s.accent} />
      <div className={`h-1 topbar`} />

      <header className="page-head">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link prefetch={false} href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route="/hanja" available={HANJA_LANGS} />
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-9">
        <div className="text-center mb-8">
          <PageHero title={ui.hubTitle} desc={ui.hubLead} />
          <p className="mt-4 inline-block rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            {ui.hubNotice}
          </p>
        </div>

        {s.categories.map(cat => {
          const list = s.idioms.filter(i => i.category === cat);
          if (list.length === 0) return null;
          return (
            <section key={cat} className="mb-8">
              <h2 className="hub-cat-h2">
                {label[cat] ?? cat}
                <span className="hub-cat-count">{list.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {list.map(i => (
                  <Link prefetch={false}
                    key={i.slug}
                    href={localeHref(lang, `/hanja/${i.slug}`)}
                    className={`group hub-card ${s.hoverBorder}`}
                  >
                    <ToolIcon emoji={i.icon} className="hub-card-icon" />
                    <span className="hub-card-body">
                      <span className={`hub-card-title ${s.hoverText}`}>
                        {i.hanja}
                        <span className="ml-1.5 font-medium text-slate-500 dark:text-slate-400">{idiomHeading(i, lang)}</span>
                      </span>
                      <span className="hub-card-desc">{idiomText(i, lang).meaning}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-4 leading-relaxed">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
