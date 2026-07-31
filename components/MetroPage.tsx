import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import MetroGame from '@/components/metro/MetroGame';
import { LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { countryName, lineCopy, lineIcon, lineTitle, type MetroLine } from '@/lib/metro/types';
import { METRO_LANGS, metroPrefix, type MetroLang } from '@/lib/metro/lang';
import { METRO_UI } from '@/lib/metro/ui';
import { relatedLines } from '@/lib/metro-lines';
import { lineFacts } from '@/lib/metro/facts';
import LangPicker from '@/components/LangPicker';

/**
 * 지하철 노선 상세 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 게임이 위, 읽을 거리가 아래다. 검색으로 들어온 사람은 이 노선이 어떤
 * 노선인지부터 알고 싶어 하므로 소개와 힌트를 게임 아래에 문장으로 둔다.
 *
 * 푸터와 FAQ 컴포넌트는 ko·en 두 언어만 아니까, 나머지 여섯 언어는 영어 쪽을
 * 준다 — 그 언어로 실제 페이지가 있는 섹션이 아직 지하철뿐이기 때문이다.
 */
export default function MetroPage({ line, lang }: { line: MetroLine; lang: MetroLang }) {
  const ui = METRO_UI[lang];
  const t = lineCopy(line, lang);
  const prefix = metroPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/metro`;
  const path = `${prefix}/metro/${line.slug}`;
  const related = relatedLines(line.slug);
  const title = lineTitle(line, lang);
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);

  const faq = [
    ...ui.lineFaq(lineFacts(line, lang)),
    { q: ui.howTitle, a: ui.how.join(' ') },
    { q: `${title} — ${ui.hint}`, a: t.hint },
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
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/metro/${line.slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg"
            style={{ background: line.color }}
          >
            <ToolIcon emoji={lineIcon(line)} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{title}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
            {countryName(line.city, lang)} · {ui.stationCount(line.stations.length)}
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

        <Faq items={faq} lang={base} title={ui.faqTitle} />

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
                    {lineTitle(r, lang)}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {countryName(r.city, lang)} · {ui.stationCount(r.stations.length)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {METRO_LANGS.filter(l => l.lang !== lang).map(l => (
            <Link
              key={l.lang}
              href={`${l.prefix}/metro/${line.slug}`}
              hrefLang={l.hreflang}
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
