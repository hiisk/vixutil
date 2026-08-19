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
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CMD_ICON, cmdItem } from '@/lib/cmd/list';
import { cmdFacts } from '@/lib/cmd/facts';
import { cmdDesc } from '@/lib/cmd/desc';
import { CMD_UI } from '@/lib/cmd/ui';
import CopyLine from '@/components/cmd/CopyLine';
import LangPicker from '@/components/LangPicker';

/**
 * 명령 한 장 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 맨 위가 쓰는 꼴이다. "tar 압축 어떻게"로 들어온 사람은 설명보다 붙여 쓸 한
 * 줄을 먼저 찾는다. 그 아래에 뜻, 옵션 표, 예시가 온다.
 *
 * 명령·옵션·예시는 열 언어가 같은 문자열을 쓴다 — 번역하면 그대로 칠 수 없는
 * 글자가 된다. 언어를 따르는 것은 설명과 화면 틀뿐이다.
 */
export default function CmdPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = cmdItem(slug);
  if (!x) return null;

  const ui = CMD_UI[lang];
  const f = cmdFacts(x);
  const desc = cmdDesc(slug, lang);
  const cat = ui.catLabel[x.category];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/cmd`;
  const path = `${prefix}/cmd/${slug}`;
  const base = localeOfLang(lang);
  /** man은 첫 낱말만 받는다 — 'git reset'의 man 페이지는 git-reset이다 */
  const manName = x.name.includes(' ') ? x.name.replace(/ /g, '-') : x.name;

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/cmd` },
          { name: x.name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(x.name, ui.metaDesc(x.name, desc), path)} />

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
          <Link prefetch={false} href={`${prefix}/cmd`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/cmd/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={CMD_ICON} className="h-5 w-5" /></span>
          <div className="hero-band">
            <PageHero title={x.name} desc={cat} />
          </div>
        </div>

        {/* 쓰는 꼴이 먼저다 — 찾아온 사람이 붙여 갈 한 줄 */}
        <section className="mb-6" aria-label={ui.usageTitle}>
          <p className="label-caps mb-2">{ui.usageTitle}</p>
          <CopyLine text={x.usage} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
        </section>

        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-4 mb-6">
          {desc}
        </p>

        <section className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="label-caps">{ui.flagsTitle}</p>
          </div>
          <table className="kv-table w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                <th scope="col" className="text-left px-4 py-2 w-1/3">{ui.flagCol}</th>
                <th scope="col" className="text-left px-4 py-2">{ui.meaningCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {x.flags.map(fl => (
                <tr key={fl.flag}>
                  <th scope="row" className="text-left px-4 py-3 font-black text-slate-800 dark:text-slate-100 font-mono text-[13px] align-top">
                    {fl.flag}
                  </th>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 leading-relaxed">{fl.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6" aria-label={ui.examplesTitle}>
          <p className="label-caps mb-2">{ui.examplesTitle}</p>
          <div className="flex flex-col gap-3">
            {x.examples.map(ex => (
              <div key={ex.cmd}>
                <CopyLine text={ex.cmd} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
                <p className="mt-1.5 px-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ex.en}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-lg border chip-off px-4 py-3">
          {ui.catNote[x.category]}
        </p>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.itemFaq(f, desc, cat)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.relatedTitle}>
          <h2 className="sec-h2">{ui.relatedTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {f.related.map(n => (
              <Link prefetch={false}
                key={n}
                href={`${prefix}/cmd/${n}`}
                className="chip-mono"
              >
                {cmdItem(n)?.name ?? n}
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-6 text-center">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono">
            {ui.manLabel}: man {manName}
          </span>
        </p>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/cmd/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
