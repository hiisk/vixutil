import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import WifiBand from '@/components/wifi/WifiBand';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { channelOf, labelOf, slugOf } from '@/lib/wifi/list';
import { centerOf, cleanSet, neighbours, wifiFacts } from '@/lib/wifi/facts';
import { WIFI_UI } from '@/lib/wifi/ui';

/**
 * 채널 한 장 — 겹치는 채널을 이름으로 보인다.
 *
 * "6번은 2437MHz"만 적으면 공유기 앞에서 할 일이 없다. 어느 번호와 부딪치는지가
 * 보여야 옆집이 6번을 쓰고 있을 때 어디로 옮길지 정해진다.
 */
export default function WifiPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = channelOf(slug);
  if (!c) return null;
  const f = wifiFacts(c);
  const ui = WIFI_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/wifi`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const clean = new Set(cleanSet(c.band).map(x => x.n));

  const rows: [string, string][] = [
    [ui.centerLabel, `${f.center} MHz`],
    [ui.spanLabel, `${f.span.from} – ${f.span.to} MHz`],
    [ui.overlapLabel, f.overlaps.length ? f.overlaps.map(o => o.n).join(', ') : ui.noneTag],
    [ui.pairLabel, f.pair ? String(f.pair.n) : ui.noneTag],
    [ui.dfsLabel, f.dfs ? ui.yesTag : ui.noneTag],
    [ui.restrictedLabel, f.restricted ? ui.yesTag : ui.noneTag],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: labelOf(c), path },
        ])}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-700 to-sky-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{labelOf(c)}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/wifi/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-blue-400 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-lg font-bold text-slate-600 dark:text-slate-300">{ui.bandName(c.band)}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{c.n}</div>
          <div className="mt-1 text-sm font-bold text-blue-800 dark:text-blue-300 tabular-nums">{f.center} MHz</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.overlaps.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.overlapTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.overlapNote}</p>
            <div className="flex flex-wrap gap-2">
              {f.overlaps.map(o => (
                <Link
                  key={slugOf(o)}
                  href={`${hub}/${slugOf(o)}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  {o.n} · {centerOf(o)}MHz
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.cleanTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.cleanNote}</p>
          <div className="flex flex-wrap gap-2">
            {cleanSet(c.band).slice(0, 12).map(o => (
              <Link
                key={slugOf(o)}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 text-xs font-bold text-blue-800 dark:text-blue-300 tabular-nums hover:border-blue-500 transition-colors"
              >
                {o.n}
              </Link>
            ))}
          </div>
        </section>

        {f.dfs && (
          <section className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.dfsTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.dfsNote}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(c).map(o => (
              <Link
                key={slugOf(o)}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                {o.n} · {centerOf(o)}MHz
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.bandName(c.band)}</h2>
          <WifiBand band={c.band} path={hub} current={slug} clean={clean} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <p className="mb-8 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          {ui.caution}
        </p>

        <Faq items={ui.wifiFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/wifi/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
