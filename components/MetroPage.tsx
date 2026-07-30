import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import MetroGame from '@/components/metro/MetroGame';
import type { MetroLine } from '@/lib/metro/types';
import type { Lang } from '@/lib/formula/terms';
import { METRO_UI, METRO_LANGS } from '@/lib/metro/ui';
import { relatedLines } from '@/lib/metro-lines';

/**
 * 지하철 노선 상세 — 세 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 게임이 위, 읽을 거리가 아래다. 검색으로 들어온 사람은 이 노선이 어떤
 * 노선인지부터 알고 싶어 하므로 소개와 힌트를 게임 아래에 문장으로 둔다.
 */
export default function MetroPage({ line, lang }: { line: MetroLine; lang: Lang }) {
  const ui = METRO_UI[lang];
  const t = line[lang];
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  const homeHref = lang === 'ko' ? '/' : `${prefix}/metro`;
  const path = `${prefix}/metro/${line.slug}`;
  const related = relatedLines(line.slug);
  const title = `${t.city} ${t.line}`;

  const faq = [
    { q: ui.howTitle, a: ui.how.join(' ') },
    { q: `${title} — ${ui.stations}?`, a: `${line.stations.length}${lang === 'ko' ? '개입니다. ' : lang === 'zh' ? '站。' : '. '}${t.intro}` },
    { q: ui.hint, a: t.hint },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/metro` },
          { name: title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(title, t.intro, path)} />

      <PageGlow accent="indigo" />
      <div className="h-1" style={{ background: line.color }} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/metro`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
            {METRO_LANGS.filter(l => l.lang !== lang).map(l => (
              <Link key={l.lang} href={`${l.prefix}/metro/${line.slug}`} hrefLang={l.lang} className="hover:text-slate-700 transition-colors">
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg"
            style={{ background: line.color }}
          >
            <ToolIcon emoji={line.icon} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{title}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
            {t.country} · {line.stations.length} {ui.stations}
            {line.loop ? ` · ${ui.loopNote}` : ''}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">{t.intro}</p>
        </div>

        <MetroGame line={line} lang={lang} />

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`${prefix}/metro/${r.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:shadow-sm transition-all"
              >
                <span className="w-2.5 h-8 rounded-full shrink-0" style={{ background: r.color }} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                    {r[lang].city} {r[lang].line}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {r[lang].country} · {r.stations.length} {ui.stations}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
