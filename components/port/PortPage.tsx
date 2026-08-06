import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PortBar from '@/components/port/PortBar';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { portOf } from '@/lib/port/list';
import { neighbours, portFacts, sameGroup } from '@/lib/port/facts';
import { PORT_UI } from '@/lib/port/ui';

/**
 * 포트 한 장 — 번호에서 나온 것과, 자료에 적어 둔 서비스 하나.
 *
 * 65535짜리 띠를 함께 두는 이유는 "1023 이하"라는 말이 얼마나 좁은 자리인지
 * 글로는 안 와닿기 때문이다. 실제로 그 구간은 전체의 1.6%다.
 */
export default function PortPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = portOf(slug);
  if (!x) return null;
  const f = portFacts(x);
  const ui = PORT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/port`;
  const path = `${hub}/${x.port}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.serviceLabel, `${f.service} (${f.name})`],
    [ui.groupRowLabel, ui.groupLabel[f.group]],
    [ui.protoRowLabel, ui.protoLabel[f.proto]],
    [ui.rangeRowLabel, ui.rangeLabel[f.range]],
    [ui.privilegedLabel, f.privileged ? ui.privilegedYes : ui.privilegedNo],
    [ui.hexLabel, `0x${f.hex}`],
    [ui.binLabel, f.bin],
    [ui.bytesLabel, `${f.bytes[0]} · ${f.bytes[1]}`],
    ...(f.secure ? ([[ui.secureLabel, String(f.secure)]] as [string, string][]) : []),
    ...(f.plain ? ([[ui.plainLabel, String(f.plain)]] as [string, string][]) : []),
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${x.port} · ${f.name}`, path },
        ])}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-fuchsia-600 to-purple-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{x.port}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/port/${x.port}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-52 rounded-2xl border-2 border-fuchsia-400 dark:border-fuchsia-700 bg-fuchsia-50 dark:bg-fuchsia-950/40 px-4 py-4 text-center shadow-lg">
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{x.port}</div>
          <div className="mt-1 text-sm font-bold text-fuchsia-700 dark:text-fuchsia-300 font-mono">{f.name}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ui.protoLabel[f.proto]} · 0x{f.hex}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-2">{ui.groupLabel[f.group]}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {ui.rangeNote[f.range]}
        </p>

        {f.custom && (
          <p className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 leading-relaxed mb-4">
            <span className="font-bold">{ui.customLabel}</span> · {ui.customNote}
          </p>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.barTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.barNote}</p>
          <PortBar port={x.port} label={`${x.port}`} />
          <div className="mt-2 flex justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 tabular-nums">
            <span>0</span>
            <span>65535</span>
          </div>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.sameGroupTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.groupNote[f.group]}</p>
          <div className="flex flex-wrap gap-2">
            {sameGroup(x).map(o => (
              <Link
                key={o.port}
                href={`${hub}/${o.port}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-fuchsia-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
              >
                <span className="tabular-nums text-slate-400 dark:text-slate-500">{o.port}</span> {o.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {neighbours(x.port).map(o => (
              <Link
                key={o.port}
                href={`${hub}/${o.port}`}
                className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0 w-[44px] text-right">{o.port}</span>
                <span className="text-sm font-black text-fuchsia-700 dark:text-fuchsia-400 font-mono shrink-0">{o.name}</span>
                <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{o.service}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.portFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/port/${x.port}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
