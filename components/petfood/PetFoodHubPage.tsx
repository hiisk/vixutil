import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import PetFoodList from '@/components/petfood/PetFoodList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, PETFOOD_ICON, STATES, slugOf } from '@/lib/petfood/list';
import { atState, petFacts } from '@/lib/petfood/facts';
import { PETFOOD_UI } from '@/lib/petfood/ui';

export default function PetFoodHubPage({ lang }: { lang: Lang }) {
  const ui = PETFOOD_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/petfood`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.rerTitle, ui.rerNote],
    [ui.rangeTitle, ui.rangeNote],
    [ui.linearTitle, ui.linearNote],
    [ui.foodTitle, ui.foodNote],
    [ui.vetTitle, ui.vetNote],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({ name: `${ui.stateName(c.state)} ${c.kg}kg`, path: `${path}/${slugOf(c)}` })))}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-orange-600 to-amber-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/petfood" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-orange-600 to-amber-400">
            <ToolIcon emoji={PETFOOD_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {notes.map(([title, note]) => (
          <section key={title} className="mb-6">
            <h2 className="sec-h2-tight">{title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{note}</p>
          </section>
        ))}

        <section className="mb-4 mt-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.weightLabel} · {ui.factorLabel}</p>
        </section>

        {STATES.map(s => (
          <section key={s.key} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {ui.stateName(s.key)}
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                {ui.factorLabel} {s.lo}~{s.hi}
              </span>
            </h3>
            <PetFoodList cells={atState(s.key)} path={path} name={ui.stateName} />
          </section>
        ))}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.linearLabel}</h2>
          <ul className="list-card">
            {[2, 4, 10, 20, 40].map(kg => {
              const f = petFacts({ state: 'dog-neutered', kg });
              return (
                <li key={kg} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                  <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">{kg} kg</span>
                  <span className="cell-num shrink-0">
                    {f.rer} / {f.linear} kcal · {f.gap > 0 ? '+' : ''}{f.gap}%
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/petfood`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
