import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { DISKS, LEVELS, RAID_ICON, levelLabel } from '@/lib/raid/list';
import { raidFacts } from '@/lib/raid/facts';
import { RAID_UI } from '@/lib/raid/ui';

export default function RaidHubPage({ lang }: { lang: Lang }) {
  const ui = RAID_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/raid`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.splitTitle, ui.splitNote],
    [ui.sizeTitle, ui.sizeNote],
    [ui.rebuildTitle, ui.rebuildNote],
    [ui.backupTitle, ui.backupNote],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-800 to-emerald-400" />

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
            <LangPicker current={localeOfLang(lang)} route="/raid" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-teal-800 to-emerald-400">
            <ToolIcon emoji={RAID_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.usableLabel}</h2>
          <p className="mb-3 note-xs">{ui.diskLabel}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse tabular-nums">
              <caption className="sr-only">{ui.hubMetaTitle}</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-1 py-1 text-[10px] font-medium text-slate-400 dark:text-slate-500 text-left" />
                  {DISKS.map(n => (
                    <th key={n} scope="col" className="px-0.5 py-1 text-[9px] font-bold text-slate-600 dark:text-slate-300">
                      {n}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEVELS.map(l => (
                  <tr key={l.key}>
                    <th scope="row" className="px-1 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 text-left whitespace-nowrap">
                      {levelLabel(l)}
                    </th>
                    {DISKS.map(n => {
                      const f = raidFacts({ level: l.key, disks: n });
                      // 낱장은 표의 칸 하나를 옮긴 것뿐이라 지웠다 — 값만 남긴다
                      return (
                        <td key={n} className="p-px" aria-label={`${levelLabel(l)} ${n} · ${f.possible ? f.usable : ui.verdictNo}`}>
                          <div
                            className={`rounded py-1 text-[10px] font-bold ${
                              f.possible
                                ? 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
                                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                            }`}
                          >
                            {f.possible ? f.usable : '·'}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 note-xs">{ui.hubMetaDesc}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.section}</h2>
          <ul className="list-card">
            {LEVELS.map(l => (
              <li key={l.key} className="px-4 py-2.5">
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {levelLabel(l)}
                  <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                    {ui.minLabel} {DISKS.find(n => raidFacts({ level: l.key, disks: n }).possible)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.levelDesc(l.key)}</p>
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

        <section className="mb-8 mt-8">
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/raid`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
