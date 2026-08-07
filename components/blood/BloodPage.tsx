import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BloodList from '@/components/blood/BloodList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { TYPES, cellOf, labelOf } from '@/lib/blood/list';
import { bloodFacts } from '@/lib/blood/facts';
import { BLOOD_UI } from '@/lib/blood/ui';

export default function BloodPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = bloodFacts(c);
  const ui = BLOOD_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/blood`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const pair = `${labelOf(f.donor)} → ${labelOf(f.recipient)}`;

  const setText = (has: { A: boolean; B: boolean; D?: boolean }) => {
    const on = [has.A ? 'A' : null, has.B ? 'B' : null, has.D ? 'D' : null].filter(Boolean);
    return on.length ? on.join(' · ') : ui.noneLabel;
  };

  const rows: [string, string][] = [
    [`${ui.donorLabel} · ${ui.antigenLabel}`, setText(f.donorAntigens)],
    [`${ui.donorLabel} · ${ui.antibodyLabel}`, setText(f.donorAntibodies)],
    [`${ui.recipientLabel} · ${ui.antigenLabel}`, setText(f.recipientAntigens)],
    [`${ui.recipientLabel} · ${ui.antibodyLabel}`, setText(f.recipientAntibodies)],
    [ui.reachLabel, `${f.reach} / ${TYPES.length}`],
    [ui.poolLabel, `${f.pool} / ${TYPES.length}`],
  ];

  const give = TYPES.map(r => ({ component: c.component, donor: c.donor, recipient: r.key }));
  const take = TYPES.map(d => ({ component: c.component, donor: d.key, recipient: c.recipient }));

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.componentName(c.component)} ${pair}`, path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-red-900 to-rose-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.componentName(c.component)} · {pair}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/blood/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div
          className={`mx-auto mb-5 w-72 rounded-2xl border-2 px-4 py-5 text-center shadow-lg ${
            f.ok
              ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40'
              : 'border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40'
          }`}
        >
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate">{ui.componentName(c.component)}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{pair}</div>
          <div className={`mt-1 text-sm font-bold ${f.ok ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
            {f.ok ? ui.verdictOk : ui.verdictNo}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.whyTitle}</h2>
          <p className="mb-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.componentNote(c.component)}</p>
          {f.reasons.length > 0 && (
            <ul className="list-card">
              {f.reasons.map(r => (
                <li key={r} className="cell-note">{ui.reasonText(r)}</li>
              ))}
            </ul>
          )}
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.reverseTitle}</h2>
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.reverseNote(f)}</p>
          <BloodList
            cells={[{ component: c.component, donor: c.recipient, recipient: c.donor }]}
            path={hub}
            ok={ui.verdictOk}
            no={ui.verdictNo}
          />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.otherTitle}</h2>
          <BloodList
            cells={f.others.map(o => ({ component: o.component, donor: c.donor, recipient: c.recipient }))}
            path={hub}
            ok={ui.verdictOk}
            no={ui.verdictNo}
          />
          <p className="mt-2 note-xs">{ui.otherNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.giveTitle}</h2>
          <BloodList cells={give} path={hub} ok={ui.verdictOk} no={ui.verdictNo} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.takeTitle}</h2>
          <BloodList cells={take} path={hub} ok={ui.verdictOk} no={ui.verdictNo} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.flipTitle}</h2>
          <p className="note-xs">{ui.flipNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.rhTitle}</h2>
          <p className="note-xs">{ui.rhNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.safetyTitle}</h2>
          <p className="note-xs">{ui.safetyNote}</p>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/blood/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
