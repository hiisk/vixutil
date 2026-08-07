import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PetFoodList from '@/components/petfood/PetFoodList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/petfood/list';
import { atState, atWeight, petFacts } from '@/lib/petfood/facts';
import { PETFOOD_UI } from '@/lib/petfood/ui';

export default function PetFoodPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = petFacts(c);
  const ui = PETFOOD_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/petfood`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.weightLabel, `${c.kg} kg`],
    [ui.rerLabel, `${f.rer} kcal`],
    [ui.factorLabel, `${f.lo} ~ ${f.hi}`],
    [ui.kcalLabel, `${f.kcalLo} ~ ${f.kcalHi} kcal`],
    ...f.bowls.map(b => [`${ui.gramLabel} (${b.density} kcal/g)`, `${b.lo} ~ ${b.hi} g`] as [string, string]),
    [ui.linearLabel, `${f.linear} kcal`],
    [ui.gapLabel, `${f.gap > 0 ? '+' : ''}${f.gap} %`],
  ];

  const near = [f.lighter, f.heavier].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.stateName(c.state)} ${c.kg}kg`, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-orange-600 to-amber-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.stateName(c.state)} {c.kg}kg</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/petfood/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-orange-400 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{ui.stateName(c.state)} · {c.kg}kg</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.kcalLo}~{f.kcalHi}</div>
          <div className="mt-1 text-sm font-bold text-orange-700 dark:text-orange-300 tabular-nums">kcal · {f.bowls[0].lo}~{f.bowls[0].hi}g</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.rerTitle}</h2>
          <p className="note-xs">{ui.rerNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.rangeTitle}</h2>
          <p className="note-xs">{ui.rangeNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <PetFoodList cells={near.map(n => ({ state: n.state, kg: n.kg }))} path={hub} name={ui.stateName} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.stateRowTitle}</h2>
          <PetFoodList cells={atState(c.state)} path={hub} name={ui.stateName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.weightRowTitle}</h2>
          <PetFoodList cells={atWeight(c.state, c.kg)} path={hub} name={ui.stateName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.vetTitle}</h2>
          <p className="note-xs">{ui.vetNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/petfood/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
