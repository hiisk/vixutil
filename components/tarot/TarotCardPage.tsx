import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { TAROT_ICON } from '@/lib/tarot/deck';
import { cardView, majorNeighbours, sameRank, sameSuit } from '@/lib/tarot/facts';
import { TAROT_UI } from '@/lib/tarot/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 타로 카드 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 메이저든 마이너든 같은 모양으로 그린다. 이름과 해석은 facts가 이미 만들어
 * 주므로, 여기서는 어느 쪽인지 구별할 필요가 없다.
 */
export default function TarotCardPage({ slug, lang }: { slug: string; lang: Lang }) {
  const v = cardView(slug, lang);
  if (!v) return null;

  const ui = TAROT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/fortune/card`;
  const path = `${prefix}/fortune/card/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const suitMates = sameSuit(slug);
  const rankMates = sameRank(slug);
  const neighbours = majorNeighbours(slug);

  const rows: { label: string; value: string }[] = [
    { label: ui.arcanaLabel, value: v.arcana === 'major' ? ui.majorWord : ui.minorWord },
    ...(v.number !== undefined ? [{ label: ui.numberLabel, value: String(v.number) }] : []),
    ...(v.suitName ? [{ label: ui.suitWord, value: v.suitName }] : []),
    ...(v.rankName ? [{ label: ui.rankWord, value: v.rankName }] : []),
    ...(v.elementName ? [{ label: ui.elementWord, value: v.elementName }] : []),
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/fortune/card` },
          { name: v.name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(v.name, ui.metaDesc(v.name, v.upright), path)} />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/fortune/card`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/fortune/card/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <ToolIcon emoji={TAROT_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{v.name}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">{v.kindLine}</p>
        </div>

        <section className="grid gap-3 mb-6">
          <div className="rounded-2xl border border-violet-200 dark:border-violet-900/50 bg-violet-50 dark:bg-violet-950/30 px-4 py-4">
            <p className="text-[11px] font-black text-violet-700 dark:text-violet-300 mb-1">{ui.uprightLabel}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{v.upright}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-4">
            <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 mb-1">{ui.reversedLabel}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{v.reversed}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-1/2 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cardFaq(v.name, v.upright, v.reversed, v.kindLine)} lang={base} title={ui.faqTitle} />

        {(suitMates.length > 0 || neighbours.length > 0) && (
          <section className="mt-8">
            <h2 className="sec-h2">
              {suitMates.length > 0 ? ui.sameSuitTitle : ui.majorTitle}
            </h2>
            <div className="flex flex-wrap gap-2">
              {(suitMates.length > 0 ? suitMates : neighbours).map(c => (
                <Link
                  key={c.slug}
                  href={`${prefix}/fortune/card/${c.slug}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  {cardView(c.slug, lang)?.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {rankMates.length > 0 && (
          <section className="mt-6">
            <h2 className="sec-h2">{ui.sameRankTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {rankMates.map(c => (
                <Link
                  key={c.slug}
                  href={`${prefix}/fortune/card/${c.slug}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  {cardView(c.slug, lang)?.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/fortune/card/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
