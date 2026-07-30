import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import type { Lang } from '@/lib/formula/terms';
import { FORMULA_LANGS } from '@/lib/formula/ui';
import { HANJA_UI, HANJA_CATEGORY_LABEL, HANJA_SECTION, idiomHeading } from '@/lib/hanja-ui';

/** 사자성어 허브 — 갈래별로 묶어 50개를 한 화면에 */
export default function HanjaHub({ lang }: { lang: Lang }) {
  const ui = HANJA_UI[lang];
  const s = HANJA_SECTION;
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  const homeHref = lang === 'ko' ? '/' : `${prefix}/hanja`;
  const label = HANJA_CATEGORY_LABEL[lang];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/hanja` },
        ])}
      />

      <PageGlow accent={s.accent} />
      <div className={`h-1 bg-gradient-to-r ${s.grad}`} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
            {FORMULA_LANGS.filter(l => l.lang !== lang).map(l => (
              <Link key={l.lang} href={`${l.prefix}/hanja`} hrefLang={l.lang} className={`${s.linkHover} transition-colors`}>
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-9">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
          <p className="mt-4 inline-block rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            {ui.hubNotice}
          </p>
        </div>

        {s.categories.map(cat => {
          const list = s.idioms.filter(i => i.category === cat);
          if (list.length === 0) return null;
          return (
            <section key={cat} className="mb-8">
              <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 mb-3 pl-1">
                {label[cat] ?? cat}
                <span className="ml-2 font-bold text-slate-300 dark:text-slate-600">{list.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {list.map(i => (
                  <Link
                    key={i.slug}
                    href={`${prefix}/hanja/${i.slug}`}
                    className={`group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 ${s.hoverBorder} hover:shadow-sm transition-all`}
                  >
                    <span className="text-xl shrink-0">{i.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-bold text-slate-800 dark:text-slate-100 ${s.hoverText} transition-colors`}>
                        {i.hanja}
                        <span className="ml-1.5 font-medium text-slate-500 dark:text-slate-400">{idiomHeading(i, lang)}</span>
                      </span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{i[lang].meaning}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-4 leading-relaxed">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang === 'ko' ? 'ko' : 'en'} />
    </div>
  );
}
