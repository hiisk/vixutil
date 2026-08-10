import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DofList from '@/components/dof/DofList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/dof/list';
import { atAperture, atFocal, dofFacts } from '@/lib/dof/facts';
import { DOF_UI } from '@/lib/dof/ui';

export default function DofPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = dofFacts(c);
  const ui = DOF_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/dof`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${c.focal} mm f/${c.aperture}`;

  const near = [f.wider, f.tighter, f.shorter, f.longer]
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

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-400" />

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
            <LangPicker current={localeOfLang(lang)} route={`/dof/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-indigo-400 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.hyperfocal}</div>
          <div className="mt-1 text-sm font-bold text-indigo-700 dark:text-indigo-300">{ui.hyperfocalLabel}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {f.hyperfocalNear} m — {ui.fromLabel}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.subjectLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.cocNote}</p>
          <ul className="list-card">
            {f.spans.map(s => (
              <li key={s.subject} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums shrink-0">{s.subject} m</span>
                <span className="cell-num text-right">
                  {s.near} — {s.far === null ? ui.infinity : `${s.far} m`}
                  <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                    {ui.depthLabel} {s.depth === null ? ui.infinity : `${s.depth} m`}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.formatLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.formatNote}</p>
          <ul className="list-card">
            {f.formats.map(fmt => (
              <li key={fmt.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{ui.formatName(fmt.key)}</span>
                <span className="cell-num text-right shrink-0">
                  {fmt.hyperfocal} m
                  <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                    2 m · {fmt.atTwoMetres === null ? ui.infinity : `${fmt.atTwoMetres} m`}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.ruleTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.ruleNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <DofList cells={near.map(n => ({ focal: n.focal, aperture: n.aperture }))} path={hub} by="focal" />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.focalRowTitle}</h2>
          <DofList cells={atFocal(c.focal)} path={hub} by="aperture" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.apertureRowTitle}</h2>
          <DofList cells={atAperture(c.aperture)} path={hub} by="focal" current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/dof/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
