import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PasswordList from '@/components/password/PasswordList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CHARSETS, PASSWORD_ICON, RATES } from '@/lib/password/list';
import { atCharset, passwordFacts, timeParts } from '@/lib/password/facts';
import { PASSWORD_UI } from '@/lib/password/ui';

export default function PasswordHubPage({ lang }: { lang: Lang }) {
  const ui = PASSWORD_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/password`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.bitTitle, ui.bitNote],
    [ui.storeTitle, ui.storeNote],
    [ui.hangulTitle, ui.hangulNote],
    [ui.assumeTitle, ui.assumeNote],
    [ui.reuseTitle, ui.reuseNote],
  ];
  const sample = passwordFacts({ charset: 'ascii', length: 12 });

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />

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
            <LangPicker current={localeOfLang(lang)} route="/password" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-sec-soft">
            <ToolIcon emoji={PASSWORD_ICON} className="w-7 h-7" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2">
            {ui.charsetName('ascii')} 12 · {sample.bits} bit
          </h2>
          <ul className="list-card">
            {sample.cracks.map(k => (
              <li key={k.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{ui.rateName(k.key)}</span>
                <span className="cell-num shrink-0">{ui.timeLabel(timeParts(k.seconds))}</span>
              </li>
            ))}
          </ul>
        </section>

        {notes.map(([title, note]) => (
          <section key={title} className="mb-6">
            <h2 className="sec-h2-tight">{title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{note}</p>
          </section>
        ))}

        <section className="mb-4 mt-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.sizeLabel} · {ui.lengthLabel}</p>
        </section>

        {CHARSETS.map(set => (
          <section key={set.key} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {ui.charsetName(set.key)}
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                {ui.sizeLabel} {set.size}
              </span>
            </h3>
            <PasswordList cells={atCharset(set.key)} name={ui.charsetName} />
          </section>
        ))}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <ul className="list-card">
            {RATES.map(r => (
              <li key={r.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{ui.rateName(r.key)}</span>
                <span className="cell-num shrink-0">{r.perSecond.toExponential(2)} /s</span>
              </li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/password`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
