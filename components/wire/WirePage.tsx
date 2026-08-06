import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import WireList from '@/components/wire/WireList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { KNOWN, SIZES, cellOf, sizeSlug } from '@/lib/wire/list';
import { atAmp, atSize, wireFacts } from '@/lib/wire/facts';
import { WIRE_UI } from '@/lib/wire/ui';

/**
 * 칸 한 장 — 3% 안에 드는 길이를 크게, 그 값이 어디서 왔는지를 그 아래에.
 */
export default function WirePage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = wireFacts(c);
  const ui = WIRE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/wire`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.diaLabel, `${f.dia} mm`],
    [ui.areaLabel, `${f.area} mm²`],
    [ui.ohmLabel, `${f.ohmPerM} Ω`],
    [ui.safeLabel, `${f.safeAmp} A`],
    [ui.dropLabel, `${f.dropPer10m} V`],
    [ui.heatLabel, `${f.heatPerM} W`],
  ];

  const near = [f.thicker, f.thinner].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${f.label} · ${c.amp}A`, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{f.label} · {c.amp}A</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/wire/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums">
            {f.label}
            {KNOWN[sizeSlug(c.size)] && <span className="ml-1 font-normal text-slate-400 dark:text-slate-500">{ui.knownName(KNOWN[sizeSlug(c.size)])}</span>}
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.reach[3].metres}m</div>
          <div className="mt-1 text-sm font-bold text-amber-700 dark:text-amber-300 tabular-nums">
            {c.amp}A · {ui.systemName('eu')}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <p className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-bold ${
          f.fits
            ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
            : 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
        }`}>
          {f.fits ? ui.fitsYes : ui.fitsNo} · {ui.safeLabel} {f.safeAmp}A
        </p>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.reachLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.dropNote}</p>
          <ul className="list-card">
            {f.reach.map(r => (
              <li key={r.volt} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{ui.systemName(r.key)}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{r.metres} m</span>
              </li>
            ))}
          </ul>
        </section>

        {f.twin && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.twinLabel}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.twinNote}</p>
            <Link
              href={`${hub}/${f.twin.slug}-${c.amp}`}
              className="inline-flex items-baseline gap-2 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 text-sm font-bold text-amber-800 dark:text-amber-200 tabular-nums hover:border-amber-500 transition-colors"
            >
              {f.twin.label}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{f.twin.area}mm²</span>
            </Link>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <WireList cells={near.map(n => ({ size: SIZES.find(s => sizeSlug(s) === n.slug)!, amp: c.amp }))} path={hub} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.ampTitle}</h2>
          <WireList cells={atSize(c.size)} path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.sizeTitle}</h2>
          <WireList cells={atAmp(c.amp)} path={hub} current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/wire/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
