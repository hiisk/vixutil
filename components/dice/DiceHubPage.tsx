import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import SumBars from '@/components/dice/SumBars';
import { LANGS8, langPrefix, type Lang8 } from '@/lib/i18n/lang';
import { DICE_COUNTS, DICE_ICON, ROLLS, rollsOfDice } from '@/lib/dice/list';
import { rollFacts } from '@/lib/dice/facts';
import { DICE_UI } from '@/lib/dice/ui';

/**
 * 주사위 확률 목록 — 개수별로 끊어 늘어놓는다.
 *
 * 개수마다 분포 그림을 한 장 두면, 표를 읽기 전에 모양이 먼저 들어온다.
 */
export default function DiceHubPage({ lang }: { lang: Lang8 }) {
  const ui = DICE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/random/dice`;
  const base = lang === 'ko' ? 'ko' : 'en';
  const n = ui.fmt;

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, ROLLS.map(r => ({ name: `${r.dice}d6 = ${r.sum}`, path: `${path}/${r.slug}` })))}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-600 to-orange-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-rose-600 to-orange-500">
            <ToolIcon emoji={DICE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        {DICE_COUNTS.map(d => {
          const rolls = rollsOfDice(d);
          const curve = rollFacts(rolls[0]).curve;
          return (
            <section key={d} className="mb-9">
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">
                {ui.diceTitle(d)}
                <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">{rolls.length}</span>
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.diceNote(d)}</p>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 mb-3">
                <SumBars curve={curve} label={`${ui.diceTitle(d)} ${ui.curveTitle}`} className="w-full" />
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                {rolls.map(r => {
                  const f = rollFacts(r);
                  return (
                    <Link
                      key={r.slug}
                      href={`${path}/${r.slug}`}
                      className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <span className="text-sm font-black text-rose-700 dark:text-rose-400 font-mono shrink-0 w-[52px] tabular-nums">{f.sum}</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums shrink-0 w-[72px]">{n(f.percent)}%</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {ui.waysLabel} {n(f.ways)}
                        {f.isPeak ? ` · ${ui.peakLabel}` : ''}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS8.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/random/dice`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
