import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import type { FormulaTool } from '@/lib/formula/types';
import type { Lang } from '@/lib/formula/terms';
import { FORMULA_UI, FORMULA_LANGS } from '@/lib/formula/ui';
import { formulaFaq } from '@/lib/formula/faq';
import type { SectionConfig } from '@/lib/formula/section';

/**
 * 공식 도구 상세 화면 — 세 언어와 세 섹션이 이 컴포넌트 하나를 쓴다.
 *
 * 언어마다 화면을 따로 그리면 곧 서로 달라진다. 실제로 영어 페이지에 한국어
 * 푸터가 나간 적이 있다. 화면은 하나만 두고 문구만 갈아 끼운다.
 */
export function relatedTools(section: SectionConfig, slug: string, limit = 4): FormulaTool[] {
  const me = section.tools.find(t => t.slug === slug);
  if (!me) return [];
  const same = section.tools.filter(t => t.category === me.category && t.slug !== slug);
  // 같은 카테고리가 모자라면 다른 카테고리로 채운다 — 링크가 빈 칸으로 남는 것보다 낫다
  const others = section.tools.filter(t => t.category !== me.category && t.slug !== slug);
  return [...same, ...others].slice(0, limit);
}

/** 섹션마다 다른 클라이언트 진입점 — compute가 함수라서 경계를 넘길 수 없다 */
type EngineProps = { slug: string; lang: Lang; grad: string; textAccent: string; focusBorder: string };

export default function FormulaPage({
  tool,
  lang,
  section,
  Engine,
}: {
  tool: FormulaTool;
  lang: Lang;
  section: SectionConfig;
  Engine: (p: EngineProps) => React.ReactNode;
}) {
  const ui = FORMULA_UI[lang];
  const meta = section.meta[lang];
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  // /en·/zh 랜딩 페이지는 없다. 그 언어의 '홈'은 섹션 허브로 보낸다.
  const homeHref = lang === 'ko' ? '/' : `${prefix}/${section.key}`;
  const text = tool[lang];
  const path = `${prefix}/${section.key}/${tool.slug}`;
  const related = relatedTools(section, tool.slug);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: meta.section, path: `${prefix}/${section.key}` },
          { name: text.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(text.title, text.long, path)} />

      <PageGlow accent={section.accent} />
      <div className={`h-1 bg-gradient-to-r ${section.gradBar}`} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${section.linkHover} transition-colors font-medium shrink-0`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/${section.key}`} className={`text-sm text-slate-400 dark:text-slate-500 ${section.linkHover} transition-colors font-medium truncate`}>
            {meta.section}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
            {FORMULA_LANGS.filter(l => l.lang !== lang).map(l => (
              <Link key={l.lang} href={`${l.prefix}/${section.key}/${tool.slug}`} hrefLang={l.lang} className={`${section.linkHover} transition-colors`}>
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl bg-gradient-to-br ${section.grad} shadow-lg`}>
            <ToolIcon emoji={tool.icon} accent="rgba(255,255,255,0.55)" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{text.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">{text.long}</p>
        </div>

        <Engine
          slug={tool.slug}
          lang={lang}
          grad={section.grad}
          textAccent={section.textAccent}
          focusBorder={section.focusBorder}
        />

        <Faq items={formulaFaq(tool, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`${prefix}/${section.key}/${r.slug}`}
                className={`group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 ${section.hoverBorder} hover:shadow-sm transition-all`}
              >
                <ToolIcon emoji={r.icon} className="text-slate-800 dark:text-slate-100 w-5 h-5 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-bold text-slate-800 dark:text-slate-100 ${section.hoverText} transition-colors`}>
                    {r[lang].title}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{r[lang].desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">{meta.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
