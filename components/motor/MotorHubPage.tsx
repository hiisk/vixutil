import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import MotorList from '@/components/motor/MotorList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, MOTOR_ICON, POWERS, SPEEDS, slugOf } from '@/lib/motor/list';
import { atPower } from '@/lib/motor/facts';
import { MOTOR_UI, cellName, fmtNum } from '@/lib/motor/ui';

export default function MotorHubPage({ lang }: { lang: Lang }) {
  const ui = MOTOR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/motor`;
  const base = localeOfLang(lang);
  const n = (x: number) => fmtNum(lang, x);
  const notes: [string, string][] = [
    [ui.formulaTitle, ui.formulaNote],
    [ui.hzTitle, ui.hzNote],
    [ui.hpTitle, ui.hpNote],
    [ui.gearTitle, ui.gearNote],
    [ui.currentTitle, ui.currentNote],
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
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({ name: cellName(lang, c), path: `${path}/${slugOf(c)}` })))}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-600 to-sky-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/motor" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-indigo-600 to-sky-400">
            <ToolIcon emoji={MOTOR_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
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

        {/* 회전수 여덟이 어디서 온 값인지 표 앞에 한 줄로 둔다 — 120 × Hz ÷ 극수 */}
        <section className="mb-4 mt-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.torqueLabel}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SPEEDS.map(s => (
              <span key={`${s.hz}-${s.poles}`} className="rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                {s.hz} Hz · {s.poles}P · {s.rpm} rpm
              </span>
            ))}
          </div>
        </section>

        {POWERS.map(kw => (
          <section key={kw} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 tabular-nums">
              {n(kw)} kW
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                {Math.round(kw * 1000)} W
              </span>
            </h3>
            <MotorList cells={atPower(kw)} path={path} lang={lang} by="rpm" />
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

        {/* 이어 보기 — 이름이 겹치는 두 섹션으로 길을 낸다(낱장과 같은 자리) */}
        <section className="mb-8">
          <h2 className="sec-h2">{ui.linkTitle}</h2>
          <ul className="list-card">
            <li className="px-4 py-2.5">
              <Link href={`${prefix}/torque`} className="cell-note hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                {ui.torqueLink}
              </Link>
            </li>
            <li className="px-4 py-2.5">
              <Link href={`${prefix}/ampere`} className="cell-note hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                {ui.ampereLink}
              </Link>
            </li>
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/motor`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
