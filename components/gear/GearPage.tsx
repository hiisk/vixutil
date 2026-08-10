import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import GearList from '@/components/gear/GearList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/gear/list';
import { atFront, atRear, gearFacts } from '@/lib/gear/facts';
import { GEAR_UI } from '@/lib/gear/ui';

export default function GearPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = gearFacts(c);
  const ui = GEAR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/gear`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${c.front}${ui.teeth} × ${c.rear}${ui.teeth}`;

  const rows: [string, string][] = [
    [ui.frontLabel, `${c.front}${ui.teeth}`],
    [ui.rearLabel, `${c.rear}${ui.teeth}`],
    [ui.ratioLabel, `${f.ratio}`],
    [ui.developmentLabel, `${f.development} m`],
    [ui.inchLabel, `${f.gearInches}`],
  ];

  const near = [f.heavier, f.lighter, f.smallerRing, f.biggerRing]
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{here}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/gear/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.ratio}</div>
          <div className="mt-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">{ui.ratioLabel}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {ui.developmentLabel} {f.development} m
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.speedLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.chooseNote}</p>
          <ul className="list-card">
            {f.speeds.map(s => (
              <li key={s.cadence} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                  {ui.cadenceLabel} {s.cadence} rpm
                </span>
                <span className="cell-num shrink-0">{s.speed} km/h</span>
              </li>
            ))}
          </ul>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.sameFeel.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.sameTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.sameNote}</p>
            <GearList cells={f.sameFeel.map(n => ({ front: n.front, rear: n.rear }))} path={hub} by="rear" />
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <GearList cells={near.map(n => ({ front: n.front, rear: n.rear }))} path={hub} by="rear" />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.frontRowTitle}</h2>
          <GearList cells={atFront(c.front)} path={hub} by="rear" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.rearRowTitle}</h2>
          <GearList cells={atRear(c.rear)} path={hub} by="front" current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/gear/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
