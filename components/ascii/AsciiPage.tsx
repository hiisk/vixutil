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
import AsciiTable from '@/components/ascii/AsciiTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { codeOf, controlOf } from '@/lib/ascii/list';
import { asciiFacts, neighbours } from '@/lib/ascii/facts';
import { ASCII_UI } from '@/lib/ascii/ui';

/**
 * ASCII 한 자 — 번호 하나에서 나온 것만 싣는다.
 *
 * 큰 카드에 글자와 일곱 비트를 함께 둔다. 비트를 보여 주는 이유는 대소문자가
 * 왜 32 차이인지가 그 그림에서만 보이기 때문이다 — 여섯 번째 칸 하나만 다르다.
 */
export default function AsciiPage({ slug, lang }: { slug: string; lang: Lang }) {
  const code = codeOf(slug);
  if (code === undefined) return null;
  const f = asciiFacts(code);
  const ui = ASCII_UI[lang];
  const control = controlOf(code);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/ascii`;
  const path = `${hub}/${code}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.kindRowLabel, ui.kindLabel[f.kind]],
    [ui.decLabel, String(f.code)],
    [ui.hexLabel, `0x${f.hex}`],
    [ui.octLabel, f.oct],
    [ui.binLabel, f.bin],
    [ui.entityLabel, f.entity],
    ...(f.namedEntity ? ([[ui.namedEntityLabel, f.namedEntity]] as [string, string][]) : []),
    [ui.urlLabel, f.urlEncoded],
    [ui.cssLabel, f.cssEscape],
    ...(f.escape ? ([[ui.escapeLabel, f.escape]] as [string, string][]) : []),
    ...(f.ctrl ? ([[ui.ctrlLabel, f.ctrl]] as [string, string][]) : []),
    ...(f.ctrlOf !== undefined ? ([[ui.ctrlOfLabel, `${asciiFacts(f.ctrlOf).label} (${f.ctrlOf})`]] as [string, string][]) : []),
    ...(f.pair !== undefined ? ([[ui.pairLabel, `${String.fromCharCode(f.pair)} (${f.pair})`]] as [string, string][]) : []),
    ...(f.digitValue !== undefined ? ([[ui.digitValueLabel, String(f.digitValue)]] as [string, string][]) : []),
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${f.label} (${code})`, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-600 to-emerald-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{f.label}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/ascii/${code}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-52 rounded-2xl border-2 border-teal-400 dark:border-teal-700 bg-teal-50 dark:bg-teal-950/40 px-4 py-4 text-center shadow-lg">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">{code}</div>
          <div className={`font-black text-slate-900 dark:text-slate-100 leading-tight my-1 ${f.printable ? 'text-5xl' : 'text-3xl'}`}>
            {f.label}
          </div>
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">0x{f.hex} · {f.bin}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-2">
            {f.printable ? ui.kindLabel[f.kind] : ui.invisible}
          </p>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-4">
          {ui.kindNote[f.kind]}
        </p>

        {control && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.controlTitle}</h2>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{control.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                {ui.groupLabel[control.group]} · {ui.groupNote[control.group]}
              </p>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.bitsTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.bitsNote}</p>
          <div className="flex gap-1.5">
            {f.bin.split('').map((bit, i) => {
              // 왼쪽이 64 자리다. 32 자리(둘째 칸)가 대소문자를 가르는 비트다
              const caseBit = i === 1;
              return (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-black tabular-nums ${
                    bit === '1'
                      ? 'border-teal-400 bg-teal-500 text-white dark:border-teal-600'
                      : 'border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600'
                  } ${caseBit ? 'ring-2 ring-offset-1 ring-amber-400 dark:ring-offset-slate-900' : ''}`}
                >
                  {bit}
                </span>
              );
            })}
          </div>
          <p className="note-xs mt-2">{ui.caseBitNote}</p>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.escape && (
          <p className="note-xs mb-8">{ui.escapeNote}</p>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tableNote}</p>
          <AsciiTable path={hub} current={code} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(code).map(o => (
              <Link
                key={o}
                href={`${hub}/${o}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {o} · {asciiFacts(o).label}
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

        <Faq items={ui.charFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/ascii/${code}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
