import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import HandGrid from '@/components/poker/HandGrid';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { HANDS, labelOf } from '@/lib/poker/list';
import { chenScore, handFacts, kindCounts, tierCounts, tierOf, type Tier } from '@/lib/poker/facts';
import { fill, numFmt, pokerUi } from '@/lib/poker/ui';
import LangPicker from '@/components/LangPicker';

const TIER_ORDER: Tier[] = ['premium', 'strong', 'playable', 'marginal', 'weak'];

/**
 * 시작 핸드 목록 — 13×13 표를 먼저 보이고 그 아래에 등급별 목록을 둔다.
 *
 * 표가 곧 목차다. 169줄을 훑는 것보다 표에서 칸을 누르는 편이 빠르다.
 */
export default function PokerHubPage({ lang }: { lang: Lang }) {
  const ui = pokerUi(lang);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/game/poker`;
  // 바닥글과 FAQ 제목은 그 언어 그대로 — 중국어 페이지에 영어 바닥글이 붙지 않게 한다
  const base = localeOfLang(lang);
  const n = HANDS.length;
  const kinds = kindCounts();
  const tiers = tierCounts();
  const suited = handFacts(HANDS.find(h => h.slug === 'aks')!);

  const faq = [
    { q: fill(ui.hq1, { n }), a: fill(ui.ha1, { n, pair: kinds.pair, suited: kinds.suited, offsuit: kinds.offsuit }) },
    { q: ui.hq2, a: ui.scoreNote },
    {
      q: ui.hq3,
      a: fill(ui.ha3, {
        draw: numFmt(lang, suited.flop.find(x => x.key === 'flushDraw')?.pct ?? 0),
        flush: numFmt(lang, suited.flop.find(x => x.key === 'flush')?.pct ?? 0),
      }),
    },
  ];

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path }])} />
      <JsonLd
        data={itemListJsonLd(
          fill(ui.hubTitle, { n }),
          path,
          HANDS.map(h => ({ name: labelOf(h), path: `${path}/${h.slug}` })),
        )}
      />

      <PageGlow accent="emerald" />
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
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/game/poker`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <h1 className="page-h1">{fill(ui.hubTitle, { n })}</h1>
          <p className="note-sm">{fill(ui.hubLead, { n })}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.chart}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.chartNote}</p>
          <HandGrid path={path} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.byKind}</h2>
          <dl className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {(['pair', 'suited', 'offsuit'] as const).map(k => (
              <div key={k} className="px-4 py-3 bg-white dark:bg-slate-900">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-sm font-bold text-slate-800 dark:text-slate-100">{ui.kind[k]}</dt>
                  <dd className="text-sm font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">{kinds[k]}</dd>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.kindNote[k]}</p>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="sec-h2">{ui.byTier}</h2>
          {TIER_ORDER.map(tier => {
            const rows = HANDS.filter(h => tierOf(chenScore(h)) === tier)
              .map(handFacts)
              .sort((a, b) => a.rank - b.rank);
            return (
              <div key={tier} className="mb-7">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-black text-emerald-700 dark:text-emerald-400">{ui.tier[tier]}</h3>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">{tiers[tier]}</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 leading-relaxed">{ui.tierNote[tier]}</p>
                <div className="flex flex-wrap gap-1.5">
                  {rows.map(f => (
                    <Link prefetch={false}
                      key={f.slug}
                      href={`${path}/${f.slug}`}
                      className="rounded-lg border chip-off px-2 py-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <Faq items={faq} lang={base} title={ui.faq} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/game/poker`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
