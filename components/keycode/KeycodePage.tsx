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
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { keyOf, slugOf } from '@/lib/keycode/list';
import { keyFacts, neighbours } from '@/lib/keycode/facts';
import { KEYCODE_UI } from '@/lib/keycode/ui';

/**
 * 키 한 장 — KeyboardEvent가 주는 값만 싣는다.
 *
 * 코드 조각을 함께 두는 이유는, 이 페이지에 오는 사람이 값을 외우러 온 게
 * 아니라 조건문 한 줄을 쓰러 왔기 때문이다.
 */
export default function KeycodePage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = keyOf(slug);
  if (!x) return null;
  const f = keyFacts(x);
  const ui = KEYCODE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/keycode`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.codeLabel, f.code],
    [ui.keyLabel, f.printable ? `"${f.label}"` : f.key],
    ...(f.shift ? ([[ui.shiftLabel, `"${f.shift}"`]] as [string, string][]) : []),
    [ui.keyCodeLabel, String(f.keyCode)],
    [ui.hexLabel, f.hex],
    [ui.locationLabel, `${f.location} · ${ui.locationName[f.location]}`],
    [ui.printableLabel, f.printable ? ui.yes : ui.no],
    [ui.sharesLabel, f.shares.length ? f.shares.join(', ') : ui.noneLabel],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: f.code, path },
        ])}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-slate-600 to-zinc-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{f.code}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/keycode/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        {/* 자판의 키 모양 — 눌린 키를 그대로 그린다 */}
        <div className="mx-auto mb-5 flex w-48 flex-col items-center justify-center rounded-2xl border-2 border-b-4 border-slate-300 bg-slate-50 px-4 py-5 shadow-lg dark:border-slate-600 dark:bg-slate-800">
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-none">{f.label}</div>
          <div className="mt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">{f.code}</div>
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tabular-nums">keyCode {f.keyCode}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">{ui.groupLabel[f.group]}</p>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-4">
          {ui.groupNote[f.group]}
        </p>

        {f.varies !== undefined && (
          <p className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 leading-relaxed mb-4">
            {ui.variesNote(f.varies)}
          </p>
        )}

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="row-pair">
              <dt className="row-label">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.snippetTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.snippetNote}</p>
          <pre className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900 px-4 py-3 text-xs leading-relaxed text-slate-100">
            <code>{`window.addEventListener('keydown', e => {\n  if (e.code === '${f.code}') {\n    // ${f.label}\n  }\n});`}</code>
          </pre>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.layoutTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.layoutNote}</p>
          <p className="note-xs mt-2">{ui.deprecatedNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(x).map(o => (
              <Link prefetch={false}
                key={o.code}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-xl border chip-off px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 font-mono hover:border-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {o.code}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.keyFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/keycode/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
