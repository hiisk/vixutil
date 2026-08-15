'use client';
/* 클라이언트 컴포넌트인 까닭은 components/sqrt/SqrtPage.tsx 머리말과 같다 */
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { parsePercentSlug, percentSlug } from '@/lib/percent/list';
import { percentFacts, neighborCells } from '@/lib/percent/facts';
import { PERCENT_UI } from '@/lib/percent/ui';

/**
 * 퍼센트 한 장 — 답을 맨 위에 크게 둔다.
 *
 * 이 화면에 오는 사람은 숫자 하나를 가지러 온다. 할인·세금·비율은 그 바로
 * 아래에 있고, 표는 "옆 값도 궁금해서" 내려오는 사람 몫이다.
 */
export default function PercentPage({ slug, lang }: { slug: string; lang: Lang }) {
  const cell = parsePercentSlug(slug);
  if (!cell) return null;
  const f = percentFacts(cell.percent, cell.base);
  const ui = PERCENT_UI[lang];
  const num = ui.num;
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/percent`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: ui.home, path: homeHref },
        { name: ui.section, path: hub },
        { name: ui.metaTitle(f), path },
      ])} />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-500 to-blue-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-sky-600 shrink-0">{ui.home}</Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={hub} className="text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={base} route={`/percent/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">
          {ui.metaTitle(f)}
        </h1>

        {/* 답 숫자를 눌러 복사한다 — 세 글자(` cv`)만 늘고 나머지는 globals.css가 한다 */}
        <div className="mt-4 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 p-6 text-white">
          <p className="cv text-4xl font-black leading-none tabular-nums">{num(f.value)}</p>
          <p className="mt-2 text-sm text-sky-100">{ui.headline(f)}</p>
        </div>

        <section className="mt-6">
          <h2 className="sec-h2">{ui.workingTitle}</h2>
          <p className="text-lg font-black text-slate-800 dark:text-slate-100 tabular-nums">{ui.working(f)}</p>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{ui.offTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <div className="row-pair">
              <span className="row-label">{ui.offLabel}</span>
              <span className="val">{num(f.decreased)}</span>
            </div>
            <div className="row-pair">
              <span className="row-label">{ui.addLabel}</span>
              <span className="val">{num(f.increased)}</span>
            </div>
          </div>
          <p className="mt-2 note-xs">{ui.offNote(f)}</p>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{ui.ratioTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <div className="row-pair">
              <span className="row-label">
                {num(f.percent)} / {num(f.base)}
              </span>
              <span className="val">
                {num(f.reverseRatio)}%
                {f.ratioRounded && <span className="val-unit"> {ui.roundedTag}</span>}
              </span>
            </div>
            <div className="row-pair">
              <span className="row-label">{ui.wholeLabel}</span>
              <span className="val">{num(f.wholeFromValue)}</span>
            </div>
          </div>
          <p className="mt-2 note-xs">{ui.ratioNote(f)}</p>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{ui.byPercentTitle(f)}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {f.byPercent.map(r => (
              <Link prefetch={false} key={r.percent} href={`${hub}/${percentSlug(r.percent, f.base)}`}
                className={`chip-v${r.percent === f.percent ? ' chip-now' : ''}`}>
                {r.percent}% → {num(r.value)}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{ui.byBaseTitle(f)}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {f.byBase.map(r => (
              <Link prefetch={false} key={r.base} href={`${hub}/${percentSlug(f.percent, r.base)}`}
                className={`chip-v${r.base === f.base ? ' chip-now' : ''}`}>
                {num(r.base)} → {num(r.value)}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => <li key={h} className="cell-note">{h}</li>)}
          </ul>
        </section>

        <Faq items={ui.itemFaq(f)} lang={base} title={ui.faqTitle} />

        <section className="mt-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-1.5">
            {neighborCells(f.percent, f.base).map(c => (
              <Link prefetch={false} key={percentSlug(c.percent, c.base)} href={`${hub}/${percentSlug(c.percent, c.base)}`}
                className="chip-v">
                {c.percent}% / {num(c.base)}
              </Link>
            ))}
          </div>
          {/* 여기가 낱장의 끝이었다 — 답을 얻고 칩 여든 개를 지나오면 푸터였다.
              자기 숫자를 넣어 보는 길을 한 줄 놓는다. 옆으로가 아니라 앞으로 가는 길이다. */}
          <Link prefetch={false} href={hub} className="next-step">
            {ui.openHub} →
          </Link>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/percent/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
