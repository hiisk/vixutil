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
import { ERR_ICON, errItem } from '@/lib/errmsg/list';
import { errFacts } from '@/lib/errmsg/facts';
import { errDesc } from '@/lib/errmsg/desc';
import { ERR_UI } from '@/lib/errmsg/ui';
import CopyLine from '@/components/cmd/CopyLine';
import LangPicker from '@/components/LangPicker';

/**
 * 오류 한 장 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 맨 위가 오류 문구다. 붙여 넣고 검색해 여기까지 온 사람은 자기가 본 그 문구가
 * 이 페이지에 정말 있는지를 먼저 확인한다 — 그것이 맞으면 아래를 읽는다.
 *
 * 그 다음이 뜻이고, 고치는 명령은 그 아래다. 순서를 뒤집어 명령을 맨 위에 두면
 * 무엇을 버리는지 읽지 않고 붙여 넣는다. 이 섹션에서는 그것이 가장 큰 손해다.
 */
export default function ErrPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = errItem(slug);
  if (!x) return null;

  const ui = ERR_UI[lang];
  const f = errFacts(x);
  const desc = errDesc(slug, lang);
  const cat = ui.catLabel[x.category];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/error`;
  const path = `${prefix}/error/${slug}`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/error` },
          { name: x.message, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(x.message, ui.metaDesc(x.message, desc), path)} />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-800 to-rose-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/error`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/error/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-rose-800 to-rose-400">
            <ToolIcon emoji={ERR_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">{x.tool} · {cat}</p>
        </div>

        {/* 문구가 먼저다 — 붙여 넣고 온 사람이 같은 오류인지 확인하는 자리 */}
        <section className="mb-6" aria-label={ui.messageTitle}>
          <p className="label-caps mb-2">{ui.messageTitle}</p>
          <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 font-mono leading-relaxed break-words rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/20 px-4 py-4">
            {x.message}
          </h1>
        </section>

        <section className="mb-6" aria-label={ui.meaningTitle}>
          <p className="label-caps mb-2">{ui.meaningTitle}</p>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-4">
            {desc}
          </p>
        </section>

        <section className="mb-6" aria-label={ui.fixTitle}>
          <p className="label-caps mb-2">{ui.fixTitle}</p>
          {f.fixable ? (
            <CopyLine text={x.fix} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3">
              {ui.noFixNote}
            </p>
          )}
        </section>

        <dl className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
            <dt className="label-caps mb-1">{ui.toolLabel}</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono">{x.tool}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
            <dt className="label-caps mb-1">{ui.catLabel[x.category]}</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100">{f.siblings.length + 1}</dd>
          </div>
        </dl>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3">
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
          <div className="flex flex-col gap-2">
            {f.related.map(s => {
              const o = errItem(s);
              if (!o) return null;
              return (
                <Link
                  key={s}
                  href={`${prefix}/error/${s}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-rose-300 hover:shadow-sm transition-all"
                >
                  <span className="block text-[13px] font-bold text-slate-800 dark:text-slate-100 font-mono break-words line-clamp-2">
                    {o.message}
                  </span>
                  <span className="block mt-1 text-[11px] text-slate-400 dark:text-slate-500">{o.tool}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/error/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
