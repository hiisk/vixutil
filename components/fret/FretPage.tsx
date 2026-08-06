import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FretBoard from '@/components/fret/FretBoard';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { MAX_FRET, slugOf, spotOf } from '@/lib/fret/list';
import { fretFacts, nameOf } from '@/lib/fret/facts';
import { FRET_UI } from '@/lib/fret/ui';

/**
 * 지판 한 자리 — 음 이름과 같은 음이 나는 다른 자리.
 *
 * 음만 크게 적으면 지판 위에서 길을 잃는다. 다른 줄의 같은 음을 함께 두면
 * "여기 말고 저기서도 잡을 수 있다"가 손에 남는다.
 */
export default function FretPage({ slug, lang }: { slug: string; lang: Lang }) {
  const p = spotOf(slug);
  if (!p) return null;
  const f = fretFacts(p);
  const note = nameOf(p, lang);
  const ui = FRET_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/fret`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.noteLabel, `${note}${f.octave}`],
    [ui.hzLabel, `${f.hz} Hz`],
    [ui.midiLabel, String(f.midi)],
    ...f.distances.map(d => [`${ui.distanceLabel} · ${ui.scaleName(d.key)}`, `${d.mm} mm`] as [string, string]),
    [ui.ringingLabel, `${f.distances[0].from} mm`],
  ];

  const near = Array.from({ length: 7 }, (_, i) => p.fret - 3 + i).filter(x => x >= 0 && x <= MAX_FRET && x !== p.fret);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.stringName(p.string)} ${ui.fretName(p.fret)}`, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-yellow-700 to-amber-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
            {ui.stringName(p.string)} {ui.fretName(p.fret)}
          </span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/fret/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-amber-400 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
            {ui.stringName(p.string)} · {ui.fretName(p.fret)}
          </div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight">{note}<span className="text-2xl">{f.octave}</span></div>
          <div className="mt-1 text-sm font-bold text-amber-800 dark:text-amber-300 tabular-nums">{f.hz} Hz</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.metaTitle(f, note)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f, note)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.sameNote.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.sameNoteTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.sameNoteNote}</p>
            <div className="flex flex-wrap gap-2">
              {f.sameNote.map(o => (
                <Link
                  key={slugOf(o)}
                  href={`${hub}/${slugOf(o)}`}
                  className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 tabular-nums hover:border-amber-500 transition-colors"
                >
                  {ui.stringName(o.string)} {ui.fretName(o.fret)}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.distanceTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.distanceNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {near.map(fret => (
              <Link
                key={fret}
                href={`${hub}/${slugOf({ string: p.string, fret })}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              >
                {ui.fretName(fret)} · {nameOf({ string: p.string, fret }, lang)}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.stringTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.stringNote}</p>
          <FretBoard path={hub} lang={lang} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.fretFaq(f, note)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/fret/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
