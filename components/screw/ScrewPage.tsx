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
import ScrewList from '@/components/screw/ScrewList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { screwOf } from '@/lib/screw/list';
import { coarseOnly, screwFacts } from '@/lib/screw/facts';
import { SCREW_UI } from '@/lib/screw/ui';

/**
 * 나사 한 장 — 탭 드릴 지름이 맨 앞이다.
 *
 * 이 페이지를 여는 자리는 대개 드릴 앞이다. 골지름이나 응력단면적은 그다음에
 * 필요해진다.
 */
export default function ScrewPage({ slug, lang }: { slug: string; lang: Lang }) {
  const s = screwOf(slug);
  if (!s) return null;
  const f = screwFacts(s);
  const ui = SCREW_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/screw`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.diameterLabel, `${s.d} mm`],
    [ui.pitchLabel, `${s.p} mm (${s.coarse ? ui.coarseTag : ui.fineTag})`],
    [ui.pitchDiaLabel, `${f.pitchDia} mm`],
    [ui.minorMaleLabel, `${f.minorMale} mm`],
    [ui.minorFemaleLabel, `${f.minorFemale} mm`],
    [ui.threadHeightLabel, `${f.threadHeight} mm`],
    [ui.stressAreaLabel, `${f.stressArea} mm²`],
    [ui.tpiLabel, String(f.tpi)],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: f.label, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-slate-600 to-slate-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{f.label}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/screw/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-5 text-center shadow-lg">
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">{f.label}</div>
          <div className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">{ui.tapDrillLabel}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.tapDrill} mm</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">{s.coarse ? ui.coarseTag : ui.fineTag}</p>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="row-pair">
              <dt className="row-label">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.threadTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.threadNote}</p>
          <div className="rounded-2xl border chip-off px-4 py-3 text-center text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums">
            H = 0.866 × {s.p} = {f.h} mm · {f.pitchDia} = {s.d} − 0.75 × {f.h}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.stressTitle}</h2>
          <p className="note-xs">{ui.stressNote}</p>
        </section>

        {f.siblings.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.siblingTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.fineNote}</p>
            <ScrewList screws={f.siblings} path={hub} />
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <ScrewList screws={f.neighbours} path={hub} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.coarseTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.coarseNote}</p>
          <ScrewList screws={coarseOnly()} path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.screwFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/screw/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
