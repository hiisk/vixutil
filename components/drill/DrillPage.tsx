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
import DrillList from '@/components/drill/DrillList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { bitOf } from '@/lib/drill/list';
import { drillFacts, ofKind } from '@/lib/drill/facts';
import { DRILL_UI } from '@/lib/drill/ui';

/**
 * 비트 한 장 — 다른 계열의 짝을 함께 둔다.
 *
 * 지름만 적으면 이미 아는 것을 다시 말하는 셈이다. 이 표의 값은 "손에 있는
 * 다른 계열 드릴 중 무엇을 쓰면 되는가"에 있다.
 */
export default function DrillPage({ slug, lang }: { slug: string; lang: Lang }) {
  const b = bitOf(slug);
  if (!b) return null;
  const f = drillFacts(b);
  const ui = DRILL_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/drill`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.mmLabel, `${b.mm} mm`],
    [ui.inchLabel, `${f.inch} in`],
    ...(f.reduced ? ([[ui.reducedLabel, `${f.reduced}"`]] as [string, string][]) : []),
    [ui.areaLabel, `${f.area} mm²`],
  ];

  const near = [f.smaller, f.larger].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${b.name} · ${b.mm}mm`, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-neutral-600 to-slate-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{b.name}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/drill/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-neutral-400 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{ui.kindName(b.kind)}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{b.name}</div>
          <div className="mt-1 text-sm font-bold text-neutral-700 dark:text-neutral-300 tabular-nums">{b.mm} mm · {f.inch} in</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.nearLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.nearNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.near.map(n => (
              <Link
                key={n.slug}
                href={`${hub}/${n.slug}`}
                className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="text-xs text-slate-500 dark:text-slate-400">{ui.kindName(n.kind)}</span>
                <span className="cell-num text-right">
                  {n.name} · {n.mm} mm
                  <span className="ml-2 text-[11px] font-normal text-slate-400 dark:text-slate-500">
                    {n.diff > 0 ? '+' : ''}{n.diff}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {f.taps.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.tapLabel}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tapNote}</p>
            <div className="flex flex-wrap gap-2">
              {f.taps.map(t => (
                <Link
                  key={t.slug}
                  href={`${prefix}/screw/${t.slug}`}
                  className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 tabular-nums hover:border-neutral-500 transition-colors"
                >
                  {t.label} · {t.tapDrill}mm
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <DrillList bits={near} path={hub} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.kindName(b.kind)}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.seriesNote}</p>
          <DrillList bits={ofKind(b.kind)} path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.drillFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/drill/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
