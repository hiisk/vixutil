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
import DpiList from '@/components/dpi/DpiList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf, pairsFrom, pointsOf } from '@/lib/dpi/list';
import { REF_CM, dpiFacts, pairsTo, pointsAt } from '@/lib/dpi/facts';
import { DPI_UI, backText, cellName, factorText, fmtNum } from '@/lib/dpi/ui';

export default function DpiPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = dpiFacts(c);
  const ui = DPI_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/dpi`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = cellName(lang, f);
  const n = (x: number) => fmtNum(lang, x);

  /* 머리의 큰 숫자 — 쌍은 곱수, 낱점은 대표 거리의 감도다 */
  const headline = f.kind === 'pair' ? factorText(lang, f) : n(f.pick.sens);

  const rows: [string, string][] = f.kind === 'pair'
    ? [
      [ui.gameLabel, `${f.from.name} → ${f.to.name}`],
      [`${ui.yawLabel} · ${f.from.short}`, n(f.from.yaw)],
      [`${ui.yawLabel} · ${f.to.short}`, n(f.to.yaw)],
      [ui.factorLabel, factorText(lang, f)],
      [ui.backLabel, backText(lang, f)],
      [ui.dpiLabel, `${f.dpi}`],
      [`${ui.targetLabel} · ${REF_CM} cm`, `${f.from.short} ${n(f.pick.from)} · ${f.to.short} ${n(f.pick.to)}`],
      [ui.edpiLabel, `${f.from.short} ${f.pick.fromEdpi} · ${f.to.short} ${f.pick.toEdpi}`],
    ]
    : [
      [ui.gameLabel, f.game.name],
      [ui.dpiLabel, `${f.dpi}`],
      [ui.yawLabel, n(f.game.yaw)],
      [`${ui.targetLabel} · ${REF_CM} cm`, n(f.pick.sens)],
      [ui.edpiLabel, `${f.pick.edpi}`],
      [ui.inchLabel, n(f.pick.inch)],
      [ui.countsLabel, `${f.pick.counts}`],
    ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{here}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/dpi/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-violet-400 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{headline}</div>
          {f.kind === 'pair' ? (
            <div className="mt-1 text-sm font-bold text-violet-700 dark:text-violet-300 tabular-nums">
              {ui.backLabel} {backText(lang, f)}
            </div>
          ) : (
            <div className="mt-1 text-sm font-bold text-violet-700 dark:text-violet-300 tabular-nums">
              {REF_CM} cm/360° · {ui.edpiLabel} {f.pick.edpi}
            </div>
          )}
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {ui.yawLabel} {f.kind === 'pair' ? `${n(f.from.yaw)} → ${n(f.to.yaw)}` : n(f.game.yaw)}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-3">
          {rows.map(([k, v]) => (
            <div key={k} className="row-pair">
              <dt className="row-label">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>
        {f.kind === 'pair' && <p className="note-xs mb-8">{ui.refDpiNote}</p>}
        {f.kind === 'point' && <p className="note-xs mb-8">{ui.targetNote}</p>}

        {/* 목표 거리 여덟 줄 — 감도는 여기서 거꾸로 나온다 */}
        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead>
                <tr className="text-xs text-slate-500 dark:text-slate-400">
                  <th className="text-left font-normal py-1.5">{ui.targetLabel}</th>
                  <th className="text-right font-normal py-1.5">{ui.inchLabel}</th>
                  {f.kind === 'pair' ? (
                    <>
                      <th className="text-right font-normal py-1.5">{f.from.short}</th>
                      <th className="text-right font-normal py-1.5">{f.to.short}</th>
                    </>
                  ) : (
                    <>
                      <th className="text-right font-normal py-1.5">{ui.sensLabel}</th>
                      <th className="text-right font-normal py-1.5">{ui.edpiLabel}</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {f.kind === 'pair'
                  ? f.rows.map(r => (
                    <tr key={r.cm} className={r.cm === REF_CM ? 'font-bold' : undefined}>
                      <td className="py-1.5 text-left">{r.cm} cm</td>
                      <td className="py-1.5 text-right text-slate-400 dark:text-slate-500">{n(r.inch)}</td>
                      <td className="py-1.5 text-right">{n(r.from)}</td>
                      <td className="py-1.5 text-right">{n(r.to)}</td>
                    </tr>
                  ))
                  : f.rows.map(r => (
                    <tr key={r.cm} className={r.cm === REF_CM ? 'font-bold' : undefined}>
                      <td className="py-1.5 text-left">{r.cm} cm</td>
                      <td className="py-1.5 text-right text-slate-400 dark:text-slate-500">{n(r.inch)}</td>
                      <td className="py-1.5 text-right">{n(r.sens)}</td>
                      <td className="py-1.5 text-right">{r.edpi}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 낱점 칸에만 — DPI를 두 배로 하면 감도가 반이 되는 것이 이 표에서 보인다 */}
        {f.kind === 'point' && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.dpiTableTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">
              {REF_CM} cm/360° · {ui.edpiLabel} {f.pick.edpi}
            </p>
            <ul className="list-card">
              {f.dpiRows.map(r => (
                <li
                  key={r.dpi}
                  className={`flex items-baseline justify-between gap-3 px-4 py-2.5 ${r.here ? 'font-bold' : ''}`}
                >
                  <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">{r.dpi} DPI</span>
                  <span className="cell-num shrink-0">{n(r.sens)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {f.kind === 'pair' && f.same && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.sameNumber}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.sameNote}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{f.kind === 'pair' ? ui.convertTitle : ui.formulaTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            {f.kind === 'pair' ? ui.convertNote : ui.formulaNote}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.edpiTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.edpiNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.limitTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.limitNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.aimTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.aimNote}</p>
          <Link prefetch={false} href={`${prefix}/game/aim`} className="mt-2 inline-block text-sm font-bold text-violet-700 dark:text-violet-300 hover:underline">
            {ui.aimLink}
          </Link>
        </section>

        {f.kind === 'pair' && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.reverseLabel}</h2>
            <DpiList cells={[cellOf(f.reverse)!]} path={hub} lang={lang} by="full" />
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <DpiList cells={f.neighbours} path={hub} lang={lang} by="full" />
        </section>

        {f.kind === 'pair' ? (
          <>
            <section className="mb-8">
              <h2 className="sec-h2">{ui.pairRowTitle}</h2>
              <DpiList cells={pairsFrom(f.from.slug)} path={hub} lang={lang} by="to" current={slug} />
            </section>
            <section className="mb-8">
              <h2 className="sec-h2">{ui.pointRowTitle}</h2>
              <DpiList cells={pointsOf(f.from.slug)} path={hub} lang={lang} by="dpi" />
            </section>
          </>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="sec-h2">{ui.pointRowTitle}</h2>
              <DpiList cells={pointsOf(f.game.slug)} path={hub} lang={lang} by="dpi" current={slug} />
            </section>
            <section className="mb-8">
              <h2 className="sec-h2">{ui.pairRowTitle}</h2>
              <DpiList cells={pairsFrom(f.game.slug)} path={hub} lang={lang} by="to" />
            </section>
            <section className="mb-8">
              <h2 className="sec-h2">{`${f.dpi} DPI`}</h2>
              <DpiList cells={pointsAt(f.dpi)} path={hub} lang={lang} by="game" current={slug} />
            </section>
          </>
        )}

        {/* 이 게임으로 들어오는 쌍 — 화살표만으로 방향이 읽히므로 언어를 가리지 않는다 */}
        {f.kind === 'pair' && (
          <section className="mb-8">
            <h2 className="sec-h2">{`→ ${f.to.short}`}</h2>
            <DpiList cells={pairsTo(f.to.slug)} path={hub} lang={lang} by="from" current={slug} />
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/dpi/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
