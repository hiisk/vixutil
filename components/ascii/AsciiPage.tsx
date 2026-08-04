import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AsciiTable from '@/components/ascii/AsciiTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { codeOf, controlOf } from '@/lib/ascii/list';
import { asciiFacts, neighbours } from '@/lib/ascii/facts';
import { ASCII_UI } from '@/lib/ascii/ui';

/**
 * ASCII 한 자 — 번호 하나에서 나온 것만 싣는다.
 *
 * 큰 카드에 글자와 일곱 비트를 함께 둔다. 비트를 보여 주는 이유는 대소문자가
 * 왜 32 차이인지가 그 그림에서만 보이기 때문이다 — 여섯 번째 칸 하나만 다르다.
 */
export default function AsciiPage({ slug, lang }: { slug: string; lang: Lang }) {
  const code = codeOf(slug);
  if (code === undefined) return null;
  const f = asciiFacts(code);
  const ui = ASCII_UI[lang];
  const control = controlOf(code);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/ascii`;
  const path = `${hub}/${code}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.kindRowLabel, ui.kindLabel[f.kind]],
    [ui.decLabel, String(f.code)],
    [ui.hexLabel, `0x${f.hex}`],
    [ui.octLabel, f.oct],
    [ui.binLabel, f.bin],
    [ui.entityLabel, f.entity],
    ...(f.namedEntity ? ([[ui.namedEntityLabel, f.namedEntity]] as [string, string][]) : []),
    [ui.urlLabel, f.urlEncoded],
    [ui.cssLabel, f.cssEscape],
    ...(f.escape ? ([[ui.escapeLabel, f.escape]] as [string, string][]) : []),
    ...(f.ctrl ? ([[ui.ctrlLabel, f.ctrl]] as [string, string][]) : []),
    ...(f.ctrlOf !== undefined ? ([[ui.ctrlOfLabel, `${asciiFacts(f.ctrlOf).label} (${f.ctrlOf})`]] as [string, string][]) : []),
    ...(f.pair !== undefined ? ([[ui.pairLabel, `${String.fromCharCode(f.pair)} (${f.pair})`]] as [string, string][]) : []),
    ...(f.digitValue !== undefined ? ([[ui.digitValueLabel, String(f.digitValue)]] as [string, string][]) : []),
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${f.label} (${code})`, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-600 to-emerald-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{f.label}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/ascii/${code}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-52 rounded-2xl border-2 border-teal-400 dark:border-teal-700 bg-teal-50 dark:bg-teal-950/40 px-4 py-4 text-center shadow-lg">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">{code}</div>
          <div className={`font-black text-slate-900 dark:text-slate-100 leading-tight my-1 ${f.printable ? 'text-5xl' : 'text-3xl'}`}>
            {f.label}
          </div>
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">0x{f.hex} · {f.bin}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-2">
            {f.printable ? ui.kindLabel[f.kind] : ui.invisible}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {ui.kindNote[f.kind]}
        </p>

        {control && (
          <section className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.controlTitle}</h2>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{control.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                {ui.groupLabel[control.group]} · {ui.groupNote[control.group]}
              </p>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.bitsTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.bitsNote}</p>
          <div className="flex gap-1.5">
            {f.bin.split('').map((bit, i) => {
              // 왼쪽이 64 자리다. 32 자리(둘째 칸)가 대소문자를 가르는 비트다
              const caseBit = i === 1;
              return (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-black tabular-nums ${
                    bit === '1'
                      ? 'border-teal-400 bg-teal-500 text-white dark:border-teal-600'
                      : 'border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600'
                  } ${caseBit ? 'ring-2 ring-offset-1 ring-amber-400 dark:ring-offset-slate-900' : ''}`}
                >
                  {bit}
                </span>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-2">{ui.caseBitNote}</p>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.escape && (
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mb-8">{ui.escapeNote}</p>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tableNote}</p>
          <AsciiTable path={hub} current={code} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(code).map(o => (
              <Link
                key={o}
                href={`${hub}/${o}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {o} · {asciiFacts(o).label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.charFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/ascii/${code}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
