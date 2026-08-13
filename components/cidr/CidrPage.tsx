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
import { prefixOf, slugOf } from '@/lib/cidr/list';
import { blocksOf, cidrFacts, neighbours } from '@/lib/cidr/facts';
import { CIDR_UI } from '@/lib/cidr/ui';

/**
 * 프리픽스 한 장 — 길이 하나에서 나온 것만 싣는다.
 *
 * IPv4에서는 비트 그림을 함께 그린다. /23이 왜 512개인지는 1이 스물셋 늘어선
 * 줄을 보면 설명이 필요 없다.
 */
export default function CidrPage({ slug, lang }: { slug: string; lang: Lang }) {
  const p = prefixOf(slug);
  if (!p) return null;
  const f = cidrFacts(p);
  const ui = CIDR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/cidr`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const blocks = blocksOf(p);

  const rows: [string, string][] = [
    [ui.prefixLabel, `/${f.bits}`],
    ...(f.mask ? ([[ui.maskLabel, f.mask]] as [string, string][]) : []),
    ...(f.wildcard ? ([[ui.wildcardLabel, f.wildcard]] as [string, string][]) : []),
    ...(f.maskHex ? ([[ui.maskHexLabel, f.maskHex]] as [string, string][]) : []),
    [ui.hostBitsLabel, String(f.hostBits)],
    [ui.addressesLabel, ui.count(f.addresses, f.hostBits)],
    [ui.usableLabel, ui.count(f.usable, f.hostBits)],
    [ui.subnetsLabel(f.family), f.subnets > BigInt(0) ? ui.count(f.subnets, f.hostBits) : ui.noneLabel],
    ...(f.classful ? ([[ui.classfulLabel, f.classful]] as [string, string][]) : []),
    [ui.nibbleLabel, f.nibble ? ui.yes : ui.no],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.familyLabel[f.family]} /${f.bits}`, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-600 to-blue-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.familyLabel[f.family]} /{f.bits}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/cidr/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-56 rounded-2xl border-2 border-cyan-400 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-4 text-center shadow-lg">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.familyLabel[f.family]}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">/{f.bits}</div>
          <div className="mt-1 text-sm font-bold text-cyan-700 dark:text-cyan-300 font-mono">{f.mask ?? ui.count(f.addresses, f.hostBits)}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-4">
          {ui.familyNote[f.family]}
        </p>

        {f.family === 'v4' && f.bits >= 31 && (
          <p className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 leading-relaxed mb-4">
            {ui.exceptionNote}
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

        {f.family === 'v4' && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.binTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.binNote}</p>
            <div className="flex gap-[2px] overflow-x-auto pb-1" aria-hidden>
              {f.bin.split('').map((bit, i) => (
                <span
                  key={i}
                  className={`flex h-6 w-[9px] shrink-0 items-center justify-center rounded-[2px] text-[8px] font-black ${
                    bit === '1'
                      ? 'bg-cyan-500 text-white dark:bg-cyan-600'
                      : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                  } ${i % 8 === 7 && i !== 31 ? 'mr-1.5' : ''}`}
                >
                  {bit}
                </span>
              ))}
            </div>
          </section>
        )}

        {blocks.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.blocksTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.blocksNote}</p>
            <div className="flex flex-wrap gap-2">
              {blocks.map(b => (
                <span key={b} className="rounded-xl border chip-off px-3 py-1.5 text-xs font-bold font-mono text-slate-600 dark:text-slate-300">
                  {b}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {neighbours(p).map(o => {
              const g = cidrFacts(o);
              return (
                <Link prefetch={false}
                  key={slugOf(o)}
                  href={`${hub}/${slugOf(o)}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-cyan-700 dark:text-cyan-400 tabular-nums shrink-0 w-[44px] text-right">/{o.bits}</span>
                  <span className="text-sm font-mono text-slate-700 dark:text-slate-200">{g.mask ?? ui.count(g.addresses, g.hostBits)}</span>
                  <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">{ui.count(g.usable, g.hostBits)}</span>
                </Link>
              );
            })}
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

        <Faq items={ui.prefixFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/cidr/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
