import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import UvList from '@/components/uv/UvList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/uv/list';
import { atIndex, atSkin, uvFacts } from '@/lib/uv/facts';
import { UV_UI } from '@/lib/uv/ui';

export default function UvPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = uvFacts(c);
  const ui = UV_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/uv`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.indexLabel, `${c.uv}`],
    [ui.bandLabel, ui.bandName(f.band)],
    [ui.irradianceLabel, `${f.irradiance} W/m²`],
    [ui.medLabel, `${f.med} J/m²`],
    [ui.burnLabel, `${f.minutes} min`],
    [ui.needLabel, `SPF ${f.needSpf}`],
    [ui.shadowLabel, f.shortShadow ? ui.shadowShort : ui.shadowLong],
  ];

  const near = [f.weaker, f.stronger, f.fairer, f.darker].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `UV ${c.uv} · ${ui.skinName(c.skin).split(' —')[0]}`, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-400" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">UV {c.uv} · {ui.skinName(c.skin).split(' —')[0]}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/uv/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-orange-400 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">UV {c.uv} · {ui.bandName(f.band)}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.minutes}</div>
          <div className="mt-1 text-sm font-bold text-orange-700 dark:text-orange-300">{ui.burnLabel}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <p className="mb-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.skinName(c.skin)}
        </p>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.shieldLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.spfNote}</p>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {f.shields.map(s => (
              <li key={s.spf} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">SPF {s.spf}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{s.minutes} min</span>
              </li>
            ))}
          </ul>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.neighbourTitle}</h2>
          <UvList cells={near.map(n => ({ uv: n.uv, skin: n.skin }))} path={hub} name={ui.skinName} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.skinRowTitle}</h2>
          <UvList cells={atIndex(c.uv)} path={hub} name={ui.skinName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.indexRowTitle}</h2>
          <UvList cells={atSkin(c.skin)} path={hub} name={ui.skinName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/uv/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
