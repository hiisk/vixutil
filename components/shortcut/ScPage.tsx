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
import { SC_ICON, scItem, primaryCombo } from '@/lib/shortcut/list';
import { scFacts } from '@/lib/shortcut/facts';
import { scDesc } from '@/lib/shortcut/desc';
import { SC_UI } from '@/lib/shortcut/ui';
import KeyCombo from '@/components/shortcut/KeyCombo';
import LangPicker from '@/components/LangPicker';

/**
 * 단축키 한 장 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 맨 위가 키다. "엑셀 절대참조 단축키"로 들어온 사람은 설명보다 누를 키를 먼저
 * 찾는다. 윈도우와 맥을 나란히 두는 것이 이 섹션의 값이다 — 검색 결과 대부분이
 * 한쪽만 적어 두고, 다른 쪽 사람은 그걸 보고 눌러도 안 되는 경험을 한다.
 */
export default function ScPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = scItem(slug);
  if (!x) return null;

  const ui = SC_UI[lang];
  const f = scFacts(x);
  const desc = scDesc(slug, lang);
  const app = ui.appLabel[x.app];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/shortcut`;
  const path = `${prefix}/shortcut/${slug}`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/shortcut` },
          { name: `${app} ${x.action}`, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(`${app} ${x.action}`, ui.metaDesc(x.win, x.mac, desc), path)} />

      <PageGlow accent="sky" />
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
          <Link prefetch={false} href={`${prefix}/shortcut`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/shortcut/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={SC_ICON} className="h-5 w-5" /></span>
          <div className="hero-band">
            <PageHero title={`${app} · ${x.action}`} desc={x.group} />
          </div>
        </div>

        {/* 키가 먼저다 — 찾아온 사람이 눌러야 할 것 */}
        <section className="mb-6" aria-label={ui.keysCol}>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-4 text-center">
              <p className="label-caps mb-2.5">{ui.winTitle}</p>
              <KeyCombo combo={x.win} size="lg" naLabel={ui.naNote} />
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-4 text-center">
              <p className="label-caps mb-2.5">{ui.macTitle}</p>
              <KeyCombo combo={x.mac} size="lg" naLabel={ui.naNote} />
            </div>
          </div>
          {!f.differs && (
            <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">{ui.sameNote}</p>
          )}
        </section>

        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed rounded-lg border chip-off px-4 py-4 mb-6">
          {desc}
        </p>

        <dl className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
            <dt className="label-caps mb-1">{ui.groupLabel}</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100">{x.group}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
            <dt className="label-caps mb-1">{ui.keysLabel}</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100">{f.keyCount}</dd>
          </div>
        </dl>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3">
          {ui.appNote[x.app]}
        </p>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.itemFaq(f, desc, app)} lang={base} title={ui.faqTitle} />

        {f.crossApp.length > 0 && (
          <section className="mt-8" aria-label={ui.crossTitle}>
            <h2 className="sec-h2">{ui.crossTitle}</h2>
            <div className="flex flex-col gap-2">
              {f.crossApp.map(s => {
                const o = scItem(s);
                if (!o) return null;
                return (
                  <Link prefetch={false}
                    key={s}
                    href={`${prefix}/shortcut/${s}`}
                    className="flex items-center justify-between gap-3 rounded-xl border chip-off px-4 py-3 hover:border-sky-300 hover:shadow-sm transition-all"
                  >
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.appLabel[o.app]}</span>
                    <KeyCombo combo={primaryCombo(o)} size="sm" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-8" aria-label={ui.relatedTitle}>
          <h2 className="sec-h2">{ui.relatedTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {f.related.map(s => {
              const o = scItem(s);
              if (!o) return null;
              return (
                <Link prefetch={false}
                  key={s}
                  href={`${prefix}/shortcut/${s}`}
                  className="rounded-xl border chip-off px-4 py-3 hover:border-sky-300 hover:shadow-sm transition-all"
                >
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 mb-1.5">{o.action}</span>
                  <KeyCombo combo={primaryCombo(o)} size="sm" />
                </Link>
              );
            })}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/shortcut/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
