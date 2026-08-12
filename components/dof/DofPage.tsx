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
import DofList from '@/components/dof/DofList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/dof/list';
import { atAperture, atFocal, dofFacts } from '@/lib/dof/facts';
import { DOF_UI } from '@/lib/dof/ui';

export default function DofPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = dofFacts(c);
  const ui = DOF_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/dof`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${c.focal} mm f/${c.aperture}`;

  const near = [f.wider, f.tighter, f.shorter, f.longer]
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-400" />

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
            <LangPicker current={localeOfLang(lang)} route={`/dof/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-indigo-400 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.hyperfocal}</div>
          <div className="mt-1 text-sm font-bold text-indigo-700 dark:text-indigo-300">{ui.hyperfocalLabel}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {f.hyperfocalNear} m — {ui.fromLabel}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.subjectLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.cocNote}</p>
          <ul className="list-card">
            {f.spans.map(s => (
              <li key={s.subject} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums shrink-0">{s.subject} m</span>
                <span className="cell-num text-right">
                  {s.near} — {s.far === null ? ui.infinity : `${s.far} m`}
                  <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                    {ui.depthLabel} {s.depth === null ? ui.infinity : `${s.depth} m`}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.formatLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.formatNote}</p>
          <ul className="list-card">
            {f.formats.map(fmt => (
              <li key={fmt.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{ui.formatName(fmt.key)}</span>
                <span className="cell-num text-right shrink-0">
                  {fmt.hyperfocal} m
                  <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                    2 m · {fmt.atTwoMetres === null ? ui.infinity : `${fmt.atTwoMetres} m`}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.ruleTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.ruleNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <DofList cells={near.map(n => ({ focal: n.focal, aperture: n.aperture }))} path={hub} by="focal" />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.focalRowTitle}</h2>
          <DofList cells={atFocal(c.focal)} path={hub} by="aperture" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.apertureRowTitle}</h2>
          <DofList cells={atAperture(c.aperture)} path={hub} by="focal" current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/dof/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
