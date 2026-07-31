import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SumBars from '@/components/dice/SumBars';
import { LANGS8, langPrefix, type Lang8 } from '@/lib/i18n/lang';
import { DICE_ICON, rollOf } from '@/lib/dice/list';
import { neighbourSums, rollFacts, similarOdds } from '@/lib/dice/facts';
import { DICE_UI } from '@/lib/dice/ui';

/**
 * 굴림 한 장 — 분포 그림 하나와 숫자 여섯 개.
 *
 * 확률만 적으면 감이 오지 않는다. 몇 번에 한 번인지, 이 값 이상이 얼마나
 * 자주 나오는지까지 있어야 판단이 선다.
 */
export default function DicePage({ slug, lang }: { slug: string; lang: Lang8 }) {
  const r = rollOf(slug);
  if (!r) return null;
  const f = rollFacts(r);
  const ui = DICE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/random/dice`;
  const path = `${hub}/${slug}`;
  const base = lang === 'ko' ? 'ko' : 'en';
  const faq = ui.rollFaq(f);
  const title = `${f.dice}d6 = ${f.sum}`;

  // 표에 적는 숫자도 글과 같은 소수점 기호를 쓴다 — 독일어는 12,5%다
  const n = ui.fmt;
  const rows: [string, string][] = [
    [ui.waysLabel, `${n(f.ways)} / ${n(f.total)}`],
    [ui.percentLabel, `${n(f.percent)}%`],
    [ui.oneInLabel, n(f.oneIn)],
    [ui.atLeastLabel, `${n(f.atLeast)}%`],
    [ui.atMostLabel, `${n(f.atMost)}%`],
    [ui.meanLabel, n(f.mean)],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: title, path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-600 to-orange-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{title}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-rose-600 to-orange-500">
            <ToolIcon emoji={DICE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <div className="rounded-2xl border-2 border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 px-4 py-4 mb-4 text-center">
          <div className="text-[11px] font-bold text-rose-700 dark:text-rose-400 mb-1">{ui.percentLabel}</div>
          <p className="text-3xl font-black text-slate-900 dark:text-slate-100 tabular-nums">{n(f.percent)}%</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 mb-4">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 px-1">{ui.curveTitle}</div>
          <SumBars curve={f.curve} active={f.sum} label={`${title} ${ui.curveTitle}`} className="w-full" />
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{k}</dt>
              <dd className="text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbourSums(slug).map(o => {
              const of_ = rollFacts(o);
              return (
                <Link
                  key={o.slug}
                  href={`${hub}/${o.slug}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors tabular-nums"
                >
                  {of_.sum} · {n(of_.percent)}%
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.similarTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.similarNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {similarOdds(slug).map(o => {
              const of_ = rollFacts(o);
              return (
                <Link
                  key={o.slug}
                  href={`${hub}/${o.slug}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-rose-700 dark:text-rose-400 font-mono shrink-0 w-[86px] tabular-nums">{of_.dice}d6 = {of_.sum}</span>
                  <span className="text-sm text-slate-700 dark:text-slate-200 tabular-nums">{n(of_.percent)}%</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS8.filter(x => x.lang !== lang).map(x => (
            <Link key={x.lang} href={`${x.prefix}/random/dice/${slug}`} hrefLang={x.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {x.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
