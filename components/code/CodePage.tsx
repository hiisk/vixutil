import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BrailleCell from '@/components/code/BrailleCell';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf, cellSlug, charOf, charSlug } from '@/lib/code/list';
import { cellFacts, charFacts, neighbours } from '@/lib/code/facts';
import { CODE_UI } from '@/lib/code/ui';

/**
 * 부호 한 장 — 글자 쪽과 셀 쪽이 한 파일에 있다.
 *
 * 두 갈래가 묻는 것은 다르지만 화면 틀은 같다. 파일을 가르면 헤더와 언어
 * 목록이 두 벌이 되고, 한쪽만 고쳐 놓는 일이 생긴다.
 */
export default function CodePage({ slug, lang }: { slug: string; lang: Lang }) {
  const ui = CODE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/code`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const char = charOf(slug);
  const mask = char ? undefined : cellOf(slug);
  if (!char && mask === undefined) return null;

  const f = char ? charFacts(char) : undefined;
  const cell = mask === undefined ? undefined : cellFacts(mask);
  const title = f ? ui.charMetaTitle(f) : ui.cellMetaTitle(cell!);
  const crumb = f ? f.char : cell!.char;

  const rows: [string, string][] = f
    ? [
      [ui.morseLabel, f.morse],
      ...(f.nato ? ([[ui.natoLabel, f.nato]] as [string, string][]) : []),
      ...(f.dots ? ([[ui.dotsLabel, f.dots], [ui.brailleLabel, f.braille!]] as [string, string][]) : []),
      [ui.unitsLabel, String(f.units)],
      [ui.msLabel, `${f.ms} ms`],
      [ui.asciiLabel, String(f.ascii)],
    ]
    : [
      [ui.dotsLabel, cell!.dots || ui.noneLabel],
      [ui.raisedLabel, String(cell!.raised)],
      [ui.unicodeLabel, cell!.codePoint],
      [ui.usedByLabel, cell!.chars.length ? cell!.chars.map(c => c.char).join(', ') : ui.noneLabel],
    ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: crumb, path },
        ])}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 to-purple-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{crumb}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/code/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 flex w-56 flex-col items-center gap-2 rounded-2xl border-2 border-violet-400 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/40 px-4 py-4 shadow-lg">
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-none">{crumb}</div>
          {f ? (
            <div className="text-xl font-bold tracking-[0.2em] text-violet-700 dark:text-violet-300">{f.morse}</div>
          ) : (
            <BrailleCell mask={cell!.mask} />
          )}
          {f?.nato && <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{f.nato}</div>}
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{title}</h1>
          {f && <p className="text-xs font-bold text-violet-700 dark:text-violet-400 mb-2">{ui.kindLabel[f.kind]}</p>}
          <p className="note-sm">
            {f ? ui.charDesc(f) : ui.cellDesc(cell!)}
          </p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-4">
          {f ? ui.kindNote[f.kind] : ui.brailleNote}
        </p>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.morseTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.morseNote}</p>
            {/* 점은 한 칸, 선은 세 칸 — 실제 길이 비율 그대로 그린다 */}
            <div className="flex items-center gap-1">
              {[...f.morse].map((m, i) => (
                <span
                  key={i}
                  className={`h-4 rounded-sm bg-violet-500 dark:bg-violet-400 ${m === '·' ? 'w-2' : 'w-6'}`}
                />
              ))}
            </div>
          </section>
        )}

        {f?.nato && (
          <p className="note-xs mb-8">{ui.natoNote}</p>
        )}

        {f && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.neighbourTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {neighbours(char!).map(o => (
                <Link
                  key={o.name}
                  href={`${hub}/${charSlug(o)}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  {o.char} <span className="tracking-widest text-slate-400 dark:text-slate-500">{o.morse}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {cell && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.raisedGroup(cell.raised)}</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 64 }, (_, m) => m)
                .filter(m => cellFacts(m).raised === cell.raised && m !== cell.mask)
                .map(m => (
                  <Link
                    key={m}
                    href={`${hub}/${cellSlug(m)}`}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <BrailleCell mask={m} size="sm" />
                    {cellFacts(m).dots || '0'}
                  </Link>
                ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={f ? ui.charFaq(f) : ui.cellFaq(cell!)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/code/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
