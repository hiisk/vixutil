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
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { EXT_ICON, extOf } from '@/lib/ext/list';
import { extFacts, relatedExts } from '@/lib/ext/facts';
import { EXT_UI } from '@/lib/ext/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 확장자 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * "이거 뭘로 열지"가 이 화면에 오는 이유다. 그래서 여는 프로그램을 맨 위에 놓고,
 * MIME 타입과 갈래 설명은 그 뒤에 둔다.
 */
export default function ExtPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = extOf(slug);
  if (!x) return null;

  const ui = EXT_UI[lang];
  const f = extFacts(x);
  const kind = ui.kindLabel[x.kind];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/ext`;
  const path = `${prefix}/ext/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const related = relatedExts(slug);

  const rows: { label: string; value: string }[] = [
    { label: ui.mimeLabel, value: f.mime },
    { label: ui.kindTitle, value: kind },
    { label: ui.webLabel, value: f.web ? ui.webYes : ui.webNo },
    { label: ui.textLabel, value: f.text ? ui.textYes : ui.textNo },
    { label: ui.officialLabel, value: f.official ? ui.officialYes : ui.officialNo },
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/ext` },
          { name: `.${x.ext}`, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(`.${x.ext}`, ui.metaDesc(f, kind), path)} />

      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/ext`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/ext/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={EXT_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">.{x.ext}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{kind} · {f.mime}</p>
        </div>

        {/* 이 화면에 오는 이유가 이것이다 — 무엇으로 여는가 */}
        <section className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-4 mb-6">
          <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-2">{ui.openWith}</p>
          <div className="flex flex-wrap gap-1.5">
            {f.apps.map(a => (
              <span key={a} className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                {a}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.kindNote[x.kind]}</p>
        </section>

        <section className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="kv-table w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-1/2">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-100 break-all">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {f.twins.length > 0 && (
          <section className="mt-6">
            <h2 className="sec-h2-tight">{ui.twinsTitle}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{ui.twinsNote}</p>
            <div className="flex flex-wrap gap-2">
              {f.twins.map(t => (
                <Link prefetch={false}
                  key={t}
                  href={`${prefix}/ext/${t}`}
                  className="rounded-xl border chip-off px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-100 hover:shadow-sm transition-all"
                >
                  .{t}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.extFaq(f, kind)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.relatedTitle}>
          <h2 className="sec-h2">{ui.relatedTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {related.map(r => (
              <Link prefetch={false}
                key={r}
                href={`${prefix}/ext/${r}`}
                className="rounded-xl border chip-off px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:shadow-sm hover:-translate-y-0.5 transition-all"
              >
                .{r}
              </Link>
            ))}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/ext/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
