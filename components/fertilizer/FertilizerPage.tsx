'use client';
/*
 * ── 왜 클라이언트 컴포넌트인가 (2026-08-13) ──────────────────
 * 서버 컴포넌트가 그린 마크업은 **요청마다 두 번** 나간다 — 브라우저가 볼 HTML과,
 * 그 옆에 인라인으로 붙는 RSC 짐(직렬화된 트리)이다. 클래스 문자열까지 두 번
 * 실린다. 재 보니 낱장 한 장에서 RSC 짐이 61%였고 보이는 글자는 6%였다.
 *
 * Hobby의 Fast Origin Transfer 한도가 30일에 10GB인데, 주소 20만 개를 한 번 훑는
 * 데만 6GB가 들어 사이트가 실제로 멈췄다(한도의 348%).
 *
 * 마크업을 클라이언트 컴포넌트로 옮기면 그 마크업은 **캐시되는 JS 묶음**으로
 * 가고, 요청마다 넘어가는 것은 props(slug·lang) 둘뿐이다. HTML은 그대로 서버에서
 * 그려지므로 크롤러가 읽는 내용은 하나도 줄지 않는다. 게다가 JS는 Fast Data
 * Transfer(한도 100GB, 여유 많음)로 세어지고 크롤러는 애초에 받아 가지 않는다.
 *
 * 실측: /laundry 낱장이 gzip 27.8KB → 14.0KB (RSC 61% → 17%).
 */
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FertilizerList from '@/components/fertilizer/FertilizerList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/fertilizer/list';
import { atArea, atFertilizer, fertilizerFacts, npkOf } from '@/lib/fertilizer/facts';
import { ELEMENT, FERTILIZER_UI, SYMBOL, labelOf, mass, num } from '@/lib/fertilizer/ui';

export default function FertilizerPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = fertilizerFacts(c);
  const ui = FERTILIZER_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/fertilizer`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${labelOf(f, lang)} · ${num(lang, c.area)} m²`;

  const rows: [string, string][] = [
    [ui.fertilizerLabel, `${labelOf(f, lang)} (${npkOf(f.fert)})`],
    [ui.areaLabel, `${num(lang, c.area)} m²`],
    [ui.basisLabel, SYMBOL[f.basis]],
    [ui.contentLabel, `${num(lang, f.content)}%`],
    [ui.needLabel, mass(lang, f.main.need)],
    [ui.perM2Label, `${num(lang, f.main.perM2)} g`],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-lime-500 to-emerald-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{here}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/fertilizer/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-lime-400 dark:border-lime-700 bg-lime-50 dark:bg-lime-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{labelOf(f, lang)}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{mass(lang, f.main.grams)}</div>
          <div className="mt-1 text-sm font-bold text-lime-700 dark:text-lime-300 tabular-nums">
            {num(lang, c.area)} m² · {SYMBOL[f.basis]} {num(lang, f.main.target)} g/m²
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {ui.contentLabel} {num(lang, f.content)}%
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.doseLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.divideNote}</p>
          <ul className="list-card">
            {f.doses.map(d => (
              <li key={d.target} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                  {SYMBOL[f.basis]} {num(lang, d.target)} g/m² · {num(lang, d.perM2)} g/m²
                </span>
                <span className="cell-num shrink-0">{mass(lang, d.grams)}</span>
              </li>
            ))}
          </ul>
        </section>

        {f.main.along.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.alongLabel}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.compoundNote}</p>
            <ul className="list-card">
              {f.main.along.map(a => (
                <li key={a.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                  <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                    {SYMBOL[a.key]} {num(lang, a.content)}% · {num(lang, a.perM2)} g/m²
                  </span>
                  <span className="cell-num shrink-0">
                    {mass(lang, a.grams)}
                    <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                      {ELEMENT[a.key]} {mass(lang, a.element)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <FertilizerList
            cells={f.neighbours.map(n => ({ fertilizer: n.fertilizer, area: n.area }))}
            path={hub}
            lang={lang}
            by="fertilizer"
          />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.fertilizerRowTitle}</h2>
          <FertilizerList cells={atFertilizer(c.fertilizer)} path={hub} lang={lang} by="area" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.areaRowTitle}</h2>
          <FertilizerList cells={atArea(c.area)} path={hub} lang={lang} by="fertilizer" current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/fertilizer/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
