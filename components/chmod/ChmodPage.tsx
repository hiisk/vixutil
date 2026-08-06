import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PermGrid from '@/components/chmod/PermGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { COMMON, modeOf } from '@/lib/chmod/list';
import { chmodFacts, neighbours } from '@/lib/chmod/facts';
import { CHMOD_UI } from '@/lib/chmod/ui';

/**
 * 권한 모드 한 장 — 세 자리에서 나온 것만 싣는다.
 *
 * 표를 두 벌 그린다. 파일일 때와 폴더일 때 실행 비트의 뜻이 달라서다 —
 * 같은 755라도 파일에서는 "실행", 폴더에서는 "들어가기"다.
 */
export default function ChmodPage({ slug, lang }: { slug: string; lang: Lang }) {
  const mode = modeOf(slug);
  if (!mode) return null;
  const f = chmodFacts(mode);
  const ui = CHMOD_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/chmod`;
  const path = `${hub}/${mode}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.symbolicLabel, f.symbolic],
    [ui.lsFileLabel, f.lsFile],
    [ui.lsDirLabel, f.lsDir],
    [ui.assignLabel, `chmod ${f.assign}`],
    [ui.commandLabel, `chmod ${mode} <file>`],
    [ui.binLabel, f.bin],
    [ui.decimalLabel, String(f.decimal)],
    [ui.umaskDirLabel, f.umaskDir],
    [ui.umaskFileLabel, f.umaskFile ?? ui.umaskNone],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: mode, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-orange-600 to-amber-500" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{mode}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/chmod/${mode}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-56 rounded-2xl border-2 border-orange-400 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/40 px-4 py-4 text-center shadow-lg">
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{mode}</div>
          <div className="mt-1 text-sm font-bold text-orange-700 dark:text-orange-300 font-mono tracking-wider">{f.symbolic}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{f.lsFile}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          {COMMON.includes(mode) && (
            <p className="text-xs font-bold text-orange-700 dark:text-orange-400 mb-2">{ui.commonUse[mode]}</p>
          )}
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        {f.worldWritable && (
          <p className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 px-4 py-3 text-sm text-rose-800 dark:text-rose-200 leading-relaxed mb-4">
            <span className="font-bold">{ui.dangerTitle}</span> · {ui.dangerNote}
          </p>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.gridTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.gridNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
            <PermGrid facts={f} whoLabel={ui.whoLabel} cols={[ui.readLabel, ui.writeLabel, ui.execLabel]} />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-2">{ui.fileDirNote}</p>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(mode).map(o => (
              <Link
                key={o}
                href={`${hub}/${o}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                {o} <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{chmodFacts(o).symbolic}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.modeFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/chmod/${mode}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
