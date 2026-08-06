import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import RomanTable from '@/components/roman/RomanTable';
import RomanDecades from '@/components/roman/RomanDecades';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { yearOf } from '@/lib/roman/list';
import { neighbours, romanFacts, toRoman } from '@/lib/roman/facts';
import { ROMAN_UI } from '@/lib/roman/ui';

/**
 * 연도 한 장 — 글자를 조각내어 왜 그렇게 적히는지 보인다.
 *
 * 답만 크게 적으면 베껴 갈 수는 있어도 옆 해를 스스로 적지는 못한다. 조각과
 * 자릿수를 나란히 두면 규칙이 따라 붙는다.
 */
export default function RomanPage({ slug, lang }: { slug: string; lang: Lang }) {
  const year = yearOf(slug);
  if (year === undefined) return null;
  const f = romanFacts(year);
  const ui = ROMAN_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/roman`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.romanLabel, f.roman],
    [ui.partsLabel, f.parts.map(p => `${p.letters}=${p.value}`).join(' + ')],
    [ui.digitsLabel, f.digits.map(d => `${d.value} = ${d.letters}`).join(' · ')],
    [ui.lengthLabel, ui.letterUnit(f.length)],
    [ui.subtractiveLabel, f.hasSubtractive ? `${ui.usedTag} — ${f.parts.filter(p => p.subtractive).map(p => p.letters).join(', ')}` : ui.noneTag],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${year} — ${f.roman}`, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-700 to-yellow-500" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{year}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/roman/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-lg font-bold text-slate-600 dark:text-slate-300 tabular-nums">{year}</div>
          <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tracking-wide break-all">{f.roman}</div>
          <div className="mt-1 text-sm font-bold text-amber-800 dark:text-amber-300">{ui.letterUnit(f.length)}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-1.5">
          {f.parts.map((p, i) => (
            <div
              key={`${p.letters}-${i}`}
              className={[
                'rounded-xl border px-3 py-2 text-center',
                p.subtractive
                  ? 'border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900',
              ].join(' ')}
            >
              <div className="text-lg font-black text-slate-800 dark:text-slate-100">{p.letters}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">{p.value}</div>
            </div>
          ))}
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.hasSubtractive && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.subtractiveTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.subtractiveNote}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(year).map(y => (
              <Link
                key={y}
                href={`${hub}/${y}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              >
                {y} · {toRoman(y)}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tableNote}</p>
          <RomanTable />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.decadeTitle}</h2>
          <RomanDecades path={hub} current={year} name={ui.decadeName} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.yearFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/roman/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
