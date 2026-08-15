import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { CALC_SHELL, CALC_INTL_SLUGS, calcCopy } from '@/lib/calc-l10n';
import { CALC_GROUPS, CALC_GROUP_LABEL } from '@/lib/calc-l10n/groups';
import { crossCalcs } from '@/lib/calc-l10n/cross';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { alternateLanguages10, localeHref, openGraphFor, ALL_LOCALES10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/**
 * 다국어 계산기 허브.
 *
 * 한동안 목록을 갈래 없이 한 줄로 두었다. 열넷일 때는 그게 맞았다 — 나누면
 * 갈래마다 한두 개씩 놓였다. 쉰여섯이 되면서 반대가 됐으므로 여섯 갈래로
 * 나눈다(lib/calc-l10n/groups.ts). 갈래는 한국어 허브의 여덟과 다르다 —
 * 저쪽은 직장인·세금처럼 한국 제도에 붙은 갈래가 반이다.
 */
export function calcIntlHubMeta(lang: CalcLang) {
  const ui = CALC_SHELL[lang];
  // 허브까지 통째로 카드가 없었다 — /og/<언어>/calculator를 canonical에서 찾아 붙인다
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/calculator'),
      languages: alternateLanguages10('/calculator'),
    },
  });
}

export default function CalcIntlHub({ lang }: { lang: CalcLang }) {
  const ui = CALC_SHELL[lang];
  const items = CALC_INTL_SLUGS.map(slug => ({ slug, copy: calcCopy(lang, slug)! }));
  const cross = crossCalcs(lang);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="blue" />
      <JsonLd data={breadcrumbJsonLd([
        { name: ui.home, path: localeHref(lang, '/') },
        { name: ui.calculators, path: localeHref(lang, '/calculator') },
      ])} />
      <JsonLd data={itemListJsonLd(ui.hubTitle, localeHref(lang, '/calculator'), items.map(i => ({
        name: i.copy.title,
        path: localeHref(lang, `/calculator/${i.slug}`),
      })))} />

      <div className="relative">
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400" />

        <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/60 dark:border-slate-700/60 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
            <Link href={localeHref(lang, '/')} className="font-black text-blue-600 text-lg shrink-0">vixutil</Link>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.calculators}</span>
            <span className="ml-auto shrink-0">
              <LangPicker current={lang} route="/calculator" available={ALL_LOCALES10} />
            </span>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">{ui.hubLead}</p>

          {CALC_GROUPS.map(g => (
            <section key={g.id} className="mb-8">
              <h2 className="mb-3 flex items-center gap-2 label-caps">
                <span aria-hidden="true">{g.icon}</span>
                {CALC_GROUP_LABEL[lang][g.id]}
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {g.slugs.map(slug => (
                  <Link
                    key={slug}
                    href={localeHref(lang, `/calculator/${slug}`)}
                    className="group rounded-xl border chip-off px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <span className="hub-card-title group-hover:text-blue-700 transition-colors">
                      {calcCopy(lang, slug)!.title}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {calcCopy(lang, slug)!.short}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* /rate·/body에 이미 열 언어로 있는 것들. 여기서 다시 내면 같은 도구가
              주소 둘을 갖게 되므로, 목록에서 빼는 대신 그쪽으로 넘겨준다. */}
          <h2 className="mt-10 mb-3 label-caps">
            {ui.crossTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {cross.map(x => (
              <Link
                key={x.slug}
                href={localeHref(lang, `/${x.section}/${x.slug}`)}
                className="group rounded-xl border chip-off px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="hub-card-title group-hover:text-blue-700 transition-colors">
                  {x.title}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{x.desc}</span>
              </Link>
            ))}
          </div>
        </main>

        {/* 허브는 본문에 자기 카드를 세우지 않으므로 푸터 자리를 끄지 않는다.
            끄면 이 화면에는 제휴 카드가 한 장도 남지 않는다. */}
        <SiteFooter lang={lang} />
      </div>
    </div>
  );
}
