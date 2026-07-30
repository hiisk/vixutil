import Link from 'next/link';
import ConvertEngine from '@/components/ConvertEngine';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { relatedConvertTools, type ConvertTool } from '@/lib/convert-tools';
import { convertFaq } from '@/lib/convert-faq';
import { CONVERT_UI, LANG_LINKS, type ConvertLang } from '@/lib/convert-ui-intl';
import { CONVERT_EN, CONVERT_ZH } from '@/lib/convert-i18n';

/**
 * 단위 변환 상세 화면 — 세 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 언어마다 페이지를 따로 그리면 곧 서로 달라진다. 실제로 다른 섹션에서 영어
 * 페이지에 한국어 푸터가 나가는 일이 있었다. 화면은 하나만 두고 문구만 갈아 끼운다.
 */
export function localized(tool: ConvertTool, lang: ConvertLang) {
  /*
    단위 기호도 언어별로 바꾼다. '리'·'자'·'돈'을 영어 페이지에 그대로 두면
    읽을 수 없는 글자가 입력칸 라벨에 박힌다. 한자권에서는 같은 한자라도 값이
    달라서(근 600g ↔ 斤 500g) '근(斤)'처럼 둘을 함께 적어 오해를 막는다.
  */
  const l = lang === 'en' ? CONVERT_EN[tool.slug] : lang === 'zh' ? CONVERT_ZH[tool.slug] : undefined;
  return {
    title: l?.title ?? tool.title,
    desc: l?.desc ?? tool.desc,
    long: l?.long ?? tool.long,
    note: l?.note ?? tool.note,
    from: l?.from ?? tool.from,
    to: l?.to ?? tool.to,
  };
}

export default function ConvertPage({ tool, lang }: { tool: ConvertTool; lang: ConvertLang }) {
  const ui = CONVERT_UI[lang];
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  // /en·/zh 랜딩 페이지는 없다. 그 언어의 '홈'은 섹션 허브로 보낸다.
  const homeHref = lang === 'ko' ? '/' : `${prefix}/convert`;
  const text = localized(tool, lang);
  const path = `${prefix}/convert/${tool.slug}`;
  const related = relatedConvertTools(tool.slug);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/convert` },
          { name: text.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(text.title, text.long, path)} />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/convert`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
            {LANG_LINKS.filter(l => l.lang !== lang).map(l => (
              <Link key={l.lang} href={`${l.prefix}/convert/${tool.slug}`} hrefLang={l.lang} className="hover:text-blue-600 transition-colors">
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <span>{tool.icon}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">
            {text.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">{text.long}</p>
        </div>

        <ConvertEngine tool={{ ...tool, note: text.note, from: text.from, to: text.to }} lang={lang} />

        <Faq items={convertFaq(tool, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => {
              const rt = localized(r, lang);
              return (
                <Link
                  key={r.slug}
                  href={`${prefix}/convert/${r.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <span className="text-xl shrink-0">{r.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 transition-colors">
                      {rt.title}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{rt.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
