import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import type { Idiom } from '@/lib/hanja/types';
import type { Lang } from '@/lib/formula/terms';
import { FORMULA_LANGS } from '@/lib/formula/ui';
import { HANJA_UI, HANJA_CATEGORY_LABEL, HANJA_SECTION, hanjaFaq, idiomHeading } from '@/lib/hanja-ui';
import { relatedIdioms } from '@/lib/hanja-tools';
import { GLOSS_EN } from '@/lib/hanja/gloss-en';

/**
 * 사자성어 상세 — 세 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 네 글자를 한 덩어리로만 보여주면 외울 수밖에 없다. 글자마다 새김을 붙여
 * 쪼개 보여주면 왜 그 뜻이 되는지가 보인다.
 */
export default function HanjaPage({ idiom: i, lang }: { idiom: Idiom; lang: Lang }) {
  const ui = HANJA_UI[lang];
  const t = i[lang];
  const s = HANJA_SECTION;
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  const homeHref = lang === 'ko' ? '/' : `${prefix}/hanja`;
  const path = `${prefix}/hanja/${i.slug}`;
  const related = relatedIdioms(i.slug);
  const chars = [...i.hanja];
  /*
    새김은 언어마다 쓸모가 다르다. 한국어는 훈음("넉 사"), 영어는 글자의 뜻,
    중국어 독자는 글자를 이미 알므로 그 글자의 한국어 음을 보여주는 편이 낫다.
  */
  const glossOf = (n: number): string =>
    lang === 'ko' ? i.chars[n]
    : lang === 'en' ? (GLOSS_EN[i.slug]?.[n] ?? i.chars[n])
    : [...i.reading][n];

  const block = (label: string, body: string) => (
    <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5">
      <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1.5">{label}</p>
      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{body}</p>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/hanja` },
          { name: idiomHeading(i, lang), path },
        ])}
      />
      <JsonLd data={webAppJsonLd(idiomHeading(i, lang), t.meaning, path)} />

      <PageGlow accent={s.accent} />
      <div className={`h-1 bg-gradient-to-r ${s.grad}`} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium shrink-0`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/hanja`} className={`text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium truncate`}>
            {ui.section}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
            {FORMULA_LANGS.filter(l => l.lang !== lang).map(l => (
              <Link key={l.lang} href={`${l.prefix}/hanja/${i.slug}`} hrefLang={l.lang} className={`${s.linkHover} transition-colors`}>
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-3">
            {HANJA_CATEGORY_LABEL[lang][i.category] ?? i.category}
          </p>
          <div className={`rounded-2xl bg-gradient-to-br ${s.grad} text-white px-6 py-7`}>
            <p className="text-4xl sm:text-5xl font-black tracking-[0.15em]">{i.hanja}</p>
            <p className="text-base font-bold text-white/85 mt-3">{i.reading}</p>
            <p className="text-xs text-white/65 mt-1">{i.pinyin}</p>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-5">
            {idiomHeading(i, lang)}
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {chars.map((ch, n) => (
            <div key={n} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-3 text-center">
              <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{ch}</p>
              <p className="mt-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-tight">
                {glossOf(n)}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">{ui.charsTitle}</p>

        {block(ui.meaningTitle, t.meaning)}
        {block(ui.originTitle, t.origin)}
        {block(ui.usageTitle, t.usage)}

        <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 overflow-hidden">
          {([[ui.hanjaLabel, i.hanja], [ui.simplified, i.simplified], [ui.reading, i.reading], [ui.pinyin, i.pinyin]] as const).map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-3 px-4 py-2.5 border-b border-slate-200/70 dark:border-slate-700/70 last:border-0">
              <span className="w-20 shrink-0 text-xs font-bold text-slate-400 dark:text-slate-500">{label}</span>
              <span className="flex-1 text-sm font-bold text-slate-800 dark:text-slate-100">{value}</span>
            </div>
          ))}
        </div>

        <Faq items={hanjaFaq(i, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`${prefix}/hanja/${r.slug}`}
                className={`group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 ${s.hoverBorder} hover:shadow-sm transition-all`}
              >
                <span className="text-xl shrink-0">{r.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-bold text-slate-800 dark:text-slate-100 ${s.hoverText} transition-colors`}>
                    {r.hanja} <span className="font-medium text-slate-500 dark:text-slate-400">{idiomHeading(r, lang)}</span>
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{r[lang].meaning}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang === 'ko' ? 'ko' : 'en'} />
    </div>
  );
}
