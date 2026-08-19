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
import PortBar from '@/components/port/PortBar';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { portOf } from '@/lib/port/list';
import { neighbours, portFacts, sameGroup } from '@/lib/port/facts';
import { PORT_UI } from '@/lib/port/ui';

/**
 * 포트 한 장 — 번호에서 나온 것과, 자료에 적어 둔 서비스 하나.
 *
 * 65535짜리 띠를 함께 두는 이유는 "1023 이하"라는 말이 얼마나 좁은 자리인지
 * 글로는 안 와닿기 때문이다. 실제로 그 구간은 전체의 1.6%다.
 */
export default function PortPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = portOf(slug);
  if (!x) return null;
  const f = portFacts(x);
  const ui = PORT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/port`;
  const path = `${hub}/${x.port}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.serviceLabel, `${f.service} (${f.name})`],
    [ui.groupRowLabel, ui.groupLabel[f.group]],
    [ui.protoRowLabel, ui.protoLabel[f.proto]],
    [ui.rangeRowLabel, ui.rangeLabel[f.range]],
    [ui.privilegedLabel, f.privileged ? ui.privilegedYes : ui.privilegedNo],
    [ui.hexLabel, `0x${f.hex}`],
    [ui.binLabel, f.bin],
    [ui.bytesLabel, `${f.bytes[0]} · ${f.bytes[1]}`],
    ...(f.secure ? ([[ui.secureLabel, String(f.secure)]] as [string, string][]) : []),
    ...(f.plain ? ([[ui.plainLabel, String(f.plain)]] as [string, string][]) : []),
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${x.port} · ${f.name}`, path },
        ])}
      />

      <PageGlow accent="violet" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{x.port}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/port/${x.port}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-52 rounded-lg border-2 border-fuchsia-400 dark:border-fuchsia-700 bg-fuchsia-50 dark:bg-fuchsia-950/40 px-4 py-4 text-center shadow-sm">
          <div className="text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{x.port}</div>
          <div className="mt-1 text-sm font-bold text-fuchsia-700 dark:text-fuchsia-300 font-mono">{f.name}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ui.protoLabel[f.proto]} · 0x{f.hex}</div>
        </div>

        <div className="hero-band ">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-2">{ui.groupLabel[f.group]}</p>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <p className="rounded-lg border border-slate-200 dark:border-slate-700 cell-note mb-4">
          {ui.rangeNote[f.range]}
        </p>

        {f.custom && (
          <p className="note mb-4">
            <span className="font-bold">{ui.customLabel}</span> · {ui.customNote}
          </p>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.barTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.barNote}</p>
          <PortBar port={x.port} label={`${x.port}`} />
          <div className="mt-2 flex justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 tabular-nums">
            <span>0</span>
            <span>65535</span>
          </div>
        </section>

        <dl className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="row-pair">
              <dt className="row-label">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.sameGroupTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.groupNote[f.group]}</p>
          <div className="flex flex-wrap gap-2">
            {sameGroup(x).map(o => (
              <Link prefetch={false}
                key={o.port}
                href={`${hub}/${o.port}`}
                className="rounded-xl border chip-off px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-fuchsia-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
              >
                <span className="tabular-nums text-slate-400 dark:text-slate-500">{o.port}</span> {o.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {neighbours(x.port).map(o => (
              <Link prefetch={false}
                key={o.port}
                href={`${hub}/${o.port}`}
                className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0 w-[44px] text-right">{o.port}</span>
                <span className="text-sm font-bold text-fuchsia-700 dark:text-fuchsia-400 font-mono shrink-0">{o.name}</span>
                <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{o.service}</span>
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

        <Faq items={ui.portFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/port/${x.port}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
