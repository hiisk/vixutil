import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import ConvertEngine from '@/components/ConvertEngine';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { relatedConvertTools, type ConvertTool } from '@/lib/convert-tools';
import { convertFaq } from '@/lib/convert-faq';
import { CONVERT_UI, type ConvertLang } from '@/lib/convert-ui-intl';
import LangPicker from '@/components/LangPicker';
import { convertL10n } from '@/lib/convert-i18n';
import { localeHref, localePrefix } from '@/lib/locales';

/**
 * 단위 변환 상세 화면 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
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
  const l = convertL10n(tool.slug, lang);
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
  // 경로는 레지스트리에서 만든다 — pt-BR은 hreflang이 pt-BR이고 경로는 /pt-br이다
  const prefix = localePrefix(lang);
  const homeHref = localeHref(lang, '/');
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

      <header className="page-head">
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
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/convert/${tool.slug}`} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <ToolIcon emoji={tool.icon} accent="rgba(255,255,255,0.55)" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">
            {text.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">{text.long}</p>
        </div>

        <ConvertEngine tool={{ ...tool, note: text.note, from: text.from, to: text.to }} lang={lang} />

        <Faq items={convertFaq(tool, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="sec-h2">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => {
              const rt = localized(r, lang);
              return (
                <Link
                  key={r.slug}
                  href={`${prefix}/convert/${r.slug}`}
                  className="group hub-card hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <ToolIcon emoji={r.icon} className="hub-card-icon" />
                  <span className="hub-card-body">
                    <span className="hub-card-title group-hover:text-blue-700 transition-colors">
                      {rt.title}
                    </span>
                    <span className="hub-card-desc">{rt.desc}</span>
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
