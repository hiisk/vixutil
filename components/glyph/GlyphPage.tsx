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
import CopyGlyph from '@/components/glyph/CopyGlyph';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { GLYPH_ICON, glyphOf } from '@/lib/glyph/list';
import { glyphFacts, relatedGlyphs } from '@/lib/glyph/facts';
import { GLYPH_UI } from '@/lib/glyph/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 특수문자 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 복사 단추가 맨 위다. 유니코드 번호나 엔티티는 복사한 다음에 필요한 값이라
 * 그 아래에 둔다.
 */
export default function GlyphPage({ slug, lang }: { slug: string; lang: Lang }) {
  const g = glyphOf(slug);
  if (!g) return null;

  const ui = GLYPH_UI[lang];
  const f = glyphFacts(g);
  const kind = ui.kindLabel[g.kind];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/text/char`;
  const path = `${prefix}/text/char/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const related = relatedGlyphs(slug);

  const rows: { label: string; value: string }[] = [
    { label: ui.unicodeLabel, value: `${f.unicode} (${f.code})` },
    { label: ui.entityLabel, value: f.entity },
    ...(f.namedEntity ? [{ label: ui.namedEntityLabel, value: f.namedEntity }] : []),
    { label: ui.cssLabel, value: `content: "${f.cssEscape}"` },
    { label: ui.jsLabel, value: `"${f.jsEscape}"` },
    { label: ui.urlLabel, value: f.urlEncoded },
    { label: ui.bytesLabel, value: ui.bytesValue(f.utf8Bytes) },
    { label: ui.kindTitle, value: kind },
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/text/char` },
          { name: g.char, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(g.char, ui.metaDesc(f, kind), path)} />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/text/char`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/text/char/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-cyan-500 to-blue-600">
            <ToolIcon emoji={GLYPH_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white" />
          </div>
          {/* 제목은 글자 자체다 — 이름을 여덟 언어로 붙이지 않는 이유이기도 하다 */}
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">
            {g.char} {ui.section}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">{kind} · {f.unicode}</p>
        </div>

        <div className="mb-6">
          <CopyGlyph char={g.char} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-2/5 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 break-all font-mono text-[13px]">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3">
          {ui.kindNote[g.kind]}
        </p>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.glyphFaq(f, kind)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.relatedTitle}>
          <h2 className="sec-h2">{ui.relatedTitle}</h2>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {related.map(o => (
              <CopyGlyph key={o.slug} char={o.char} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} size="sm" />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.slice(0, 6).map(o => (
              <Link
                key={o.slug}
                href={`${prefix}/text/char/${o.slug}`}
                className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-cyan-600 transition-colors"
              >
                {o.char}
              </Link>
            ))}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/text/char/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
