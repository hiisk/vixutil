import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Cards from '@/components/poker/Cards';
import HandGrid from '@/components/poker/HandGrid';
import { LANGS10, localeOfLang10, prefix10, type Lang10 } from '@/lib/i18n/lang10';
import { HANDS, handOf, labelOf } from '@/lib/poker/list';
import { handFacts } from '@/lib/poker/facts';
import { fill, numFmt, pokerUi } from '@/lib/poker/ui';

/**
 * 시작 핸드 한 장 — 카드 두 장과 그 핸드에서 나오는 숫자들.
 *
 * 숫자는 전부 조합에서 나온다. 확률표를 옮겨 적지 않으므로 표가 바뀌어도
 * 문장과 어긋날 자리가 없다.
 */
export default function PokerHandPage({ slug, lang }: { slug: string; lang: Lang10 }) {
  const h = handOf(slug);
  if (!h) return null;
  const f = handFacts(h);
  const ui = pokerUi(lang);
  const prefix = prefix10(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/game/poker`;
  const path = `${hub}/${slug}`;
  // 바닥글과 FAQ 제목은 그 언어 그대로 — 중국어 페이지에 영어 바닥글이 붙지 않게 한다
  const base = localeOfLang10(lang);
  const n = HANDS.length;
  const pct = numFmt(lang, f.dealtPct, 3);
  const oneIn = numFmt(lang, f.oneIn, 1);

  const rows: [string, string][] = [
    [ui.combos, fill(ui.combosOf, { n: f.combos })],
    [ui.dealt, `${pct}%`],
    [ui.oneInLabel, fill(ui.oneIn, { n: oneIn })],
    [ui.score, String(f.score)],
    [ui.rankLabel, fill(ui.rankValue, { n: f.rank, total: n })],
    [ui.gapLabel, fill(ui.gapValue, { n: f.gap })],
    [ui.connected, f.connected ? ui.yes : ui.no],
    [ui.broadway, f.broadway ? ui.yes : ui.no],
  ];

  const faq = [
    { q: fill(ui.q1, { name: f.label }), a: fill(ui.a1, { combos: f.combos, pct, oneIn }) },
    { q: ui.q2, a: `${ui.kind[f.kind]} — ${ui.kindNote[f.kind]}` },
    { q: ui.q3, a: fill(ui.a3, { score: f.score, rank: f.rank, n, tier: ui.tier[f.tier] }) },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: f.label, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-600 to-teal-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{f.label}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mb-5">
          <Cards cards={f.cards} kind={f.kind} />
        </div>

        <div className="text-center mb-6">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">{ui.kind[f.kind]} · {ui.tier[f.tier]}</p>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2 font-mono">{f.label}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.tierNote[f.tier]}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.flopTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.flopNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.flop.filter(x => x.pct > 0).map(x => (
              <div key={x.key} className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-300 shrink-0 w-40 truncate">{ui.flop[x.key]}</span>
                <span className="relative h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(100, x.pct)}%` }}
                  />
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums shrink-0 w-16 text-right">
                  {numFmt(lang, x.pct)}%
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.score}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-4 py-3">
            {ui.scoreNote}
          </p>
        </section>

        {f.siblings.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.related}</h2>
            <div className="flex flex-wrap gap-2">
              {f.siblings.map(kin => {
                const other = handOf(kin);
                if (!other) return null;
                return (
                  <Link
                    key={kin}
                    href={`${hub}/${kin}`}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 font-mono text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  >
                    {labelOf(other)}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.chart}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.chartNote}</p>
          <HandGrid path={hub} current={slug} />
        </section>

        <Faq items={faq} lang={base} title={ui.faq} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS10.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/game/poker/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
