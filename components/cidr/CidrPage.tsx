import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { prefixOf, slugOf } from '@/lib/cidr/list';
import { blocksOf, cidrFacts, neighbours } from '@/lib/cidr/facts';
import { CIDR_UI } from '@/lib/cidr/ui';

/**
 * 프리픽스 한 장 — 길이 하나에서 나온 것만 싣는다.
 *
 * IPv4에서는 비트 그림을 함께 그린다. /23이 왜 512개인지는 1이 스물셋 늘어선
 * 줄을 보면 설명이 필요 없다.
 */
export default function CidrPage({ slug, lang }: { slug: string; lang: Lang }) {
  const p = prefixOf(slug);
  if (!p) return null;
  const f = cidrFacts(p);
  const ui = CIDR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/cidr`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const blocks = blocksOf(p);

  const rows: [string, string][] = [
    [ui.prefixLabel, `/${f.bits}`],
    ...(f.mask ? ([[ui.maskLabel, f.mask]] as [string, string][]) : []),
    ...(f.wildcard ? ([[ui.wildcardLabel, f.wildcard]] as [string, string][]) : []),
    ...(f.maskHex ? ([[ui.maskHexLabel, f.maskHex]] as [string, string][]) : []),
    [ui.hostBitsLabel, String(f.hostBits)],
    [ui.addressesLabel, ui.count(f.addresses, f.hostBits)],
    [ui.usableLabel, ui.count(f.usable, f.hostBits)],
    [ui.subnetsLabel(f.family), f.subnets > BigInt(0) ? ui.count(f.subnets, f.hostBits) : ui.noneLabel],
    ...(f.classful ? ([[ui.classfulLabel, f.classful]] as [string, string][]) : []),
    [ui.nibbleLabel, f.nibble ? ui.yes : ui.no],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.familyLabel[f.family]} /${f.bits}`, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-600 to-blue-500" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{ui.familyLabel[f.family]} /{f.bits}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/cidr/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-56 rounded-2xl border-2 border-cyan-400 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-4 text-center shadow-lg">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.familyLabel[f.family]}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">/{f.bits}</div>
          <div className="mt-1 text-sm font-bold text-cyan-700 dark:text-cyan-300 font-mono">{f.mask ?? ui.count(f.addresses, f.hostBits)}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-4">
          {ui.familyNote[f.family]}
        </p>

        {f.family === 'v4' && f.bits >= 31 && (
          <p className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 leading-relaxed mb-4">
            {ui.exceptionNote}
          </p>
        )}

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.family === 'v4' && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.binTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.binNote}</p>
            <div className="flex gap-[2px] overflow-x-auto pb-1" aria-hidden>
              {f.bin.split('').map((bit, i) => (
                <span
                  key={i}
                  className={`flex h-6 w-[9px] shrink-0 items-center justify-center rounded-[2px] text-[8px] font-black ${
                    bit === '1'
                      ? 'bg-cyan-500 text-white dark:bg-cyan-600'
                      : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                  } ${i % 8 === 7 && i !== 31 ? 'mr-1.5' : ''}`}
                >
                  {bit}
                </span>
              ))}
            </div>
          </section>
        )}

        {blocks.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.blocksTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.blocksNote}</p>
            <div className="flex flex-wrap gap-2">
              {blocks.map(b => (
                <span key={b} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold font-mono text-slate-600 dark:text-slate-300">
                  {b}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {neighbours(p).map(o => {
              const g = cidrFacts(o);
              return (
                <Link
                  key={slugOf(o)}
                  href={`${hub}/${slugOf(o)}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-cyan-700 dark:text-cyan-400 tabular-nums shrink-0 w-[44px] text-right">/{o.bits}</span>
                  <span className="text-sm font-mono text-slate-700 dark:text-slate-200">{g.mask ?? ui.count(g.addresses, g.hostBits)}</span>
                  <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">{ui.count(g.usable, g.hostBits)}</span>
                </Link>
              );
            })}
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

        <Faq items={ui.prefixFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/cidr/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
