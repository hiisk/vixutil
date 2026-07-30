import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { LANGS8, prefix8, type Lang8 } from '@/lib/i18n/lang8';
import { COLOR_FAMILIES, colorsOfFamily } from '@/lib/color/named8';
import { COLOR_UI } from '@/lib/color/ui';

/**
 * 색 이름 허브 — 계열로 묶어 보여 준다.
 *
 * 110색을 한 줄로 늘어놓으면 찾을 수 없다. 빨강·주황·노랑 순으로 묶으면 눈이
 * 색상환을 따라가므로 원하는 색 근처까지 단번에 온다. 이름만 적지 않고 견본을
 * 함께 두는 것도 같은 이유다 — "테라코타"라는 글자는 색을 알려 주지 않는다.
 */
export default function ColorHub({ lang }: { lang: Lang8 }) {
  const ui = COLOR_UI[lang];
  const prefix = prefix8(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/color`;
  const base = lang === 'ko' ? 'ko' : 'en';

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path: `${prefix}/color` }])} />
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-amber-400 to-sky-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 font-medium shrink-0">
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{ui.hubLead}</p>
        </div>

        {COLOR_FAMILIES.map(family => (
          <section key={family} className="mb-7">
            <h2 className="flex items-baseline gap-2 text-sm font-black text-slate-700 dark:text-slate-200 mb-2.5">
              {ui.familyLabel[family]}
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{colorsOfFamily(family).length}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {colorsOfFamily(family).map(c => (
                <Link
                  key={c.slug}
                  href={`${prefix}/color/${c.slug}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-sm hover:border-slate-400 transition-all"
                >
                  <span className="block h-14" style={{ background: c.hex }} />
                  <span className="block px-2.5 py-2 bg-white dark:bg-slate-900">
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{c.name[lang]}</span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 tabular-nums">{c.hex.toUpperCase()}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS8.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/color`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
