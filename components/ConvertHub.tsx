import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { CONVERT_TOOLS, CONVERT_CATEGORIES, convert, format } from '@/lib/convert-tools';
import { CONVERT_CATEGORY } from '@/lib/convert-i18n';
import { CONVERT_UI, CONVERT_HUB_FAQ, type ConvertLang } from '@/lib/convert-ui-intl';
import LangPicker from '@/components/LangPicker';
import { localized } from '@/lib/convert-localized';
import { localeHref, localePrefix } from '@/lib/locales';

/** 허브도 여덟 언어가 공유한다 */
export default function ConvertHub({ lang, faq }: { lang: ConvertLang; faq?: { q: string; a: string }[] }) {
  const ui = CONVERT_UI[lang];
  const prefix = localePrefix(lang);
  const homeHref = localeHref(lang, '/');
  const categoryLabel = (c: string) => CONVERT_CATEGORY[lang][c] ?? c;

  const grouped = CONVERT_CATEGORIES.map(c => ({
    category: c,
    tools: CONVERT_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path: `${prefix}/convert` }])} />
      <JsonLd
        data={itemListJsonLd(
          ui.section,
          `${prefix}/convert`,
          CONVERT_TOOLS.map(t => ({ name: localized(t, lang).title, path: `${prefix}/convert/${t.slug}` })),
        )}
      />

      <PageGlow accent="blue" />
      <div className="h-1 topbar" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={'/convert'} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-9">
          <ToolIcon emoji="🔄" className="w-12 h-12 mx-auto mb-4 text-slate-800 dark:text-slate-100" />
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            {ui.hubLead} · {CONVERT_TOOLS.length}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/70 dark:bg-blue-950/30 px-4 py-3.5 mb-7 text-xs text-blue-800 dark:text-blue-200 leading-relaxed text-center">
          {ui.hubNotice}
        </div>

        <div className="flex flex-col gap-7">
          {grouped.map(g => (
            <section key={g.category} aria-label={categoryLabel(g.category)}>
              <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                {categoryLabel(g.category)} <span className="text-slate-300 dark:text-slate-600">{g.tools.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {g.tools.map(t => {
                  const lt = localized(t, lang);
                  return (
                  <Link prefetch={false}
                    key={t.slug}
                    href={`${prefix}/convert/${t.slug}`}
                    className="group hub-card hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <ToolIcon emoji={t.icon} className="hub-card-icon" />
                    <span className="hub-card-body">
                      <span className="hub-card-title group-hover:text-blue-700 transition-colors">
                        {lt.title}
                      </span>
                      <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
                        1{lt.from} = {format(convert(1, t), Math.max(t.digits, 2))}{lt.to}
                      </span>
                    </span>
                  </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <Faq items={faq ?? (lang === 'ko' ? SECTION_FAQ.convert : CONVERT_HUB_FAQ[lang])} lang={lang} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
