/*
 * ── 이 화면만 서버 컴포넌트로 남긴다 (2026-08-13) ─────────────
 * 낱장 103개를 클라이언트 컴포넌트로 옮겨 요청마다 나가는 RSC 짐을 절반으로
 * 줄였는데(gzip 27.8KB → 14KB), 이 파일은 되돌렸다.
 *
 * 공식 계열 셋(/rate·/body·/geometry)이 이 화면 하나를 함께 쓰고, 셸이 **함수를
 * 담은 tool 객체와 Engine 컴포넌트**를 props로 넘긴다. 클라이언트 경계는 함수를
 * 직렬화할 수 없어서 요청이 500으로 떨어졌다.
 *
 *   Functions cannot be passed directly to Client Components
 *
 * 고칠 수는 있다 — 셸이 slug와 섹션 열쇠만 넘기고 이 화면이 tool과 Engine을
 * 안에서 찾게 하면 된다. 하지만 세 섹션을 합쳐 **주소의 2.1%(4,280개)**이고
 * 한 번 훑기 차이가 0.06GB다. 그 값에 세 섹션의 계산 화면을 건드릴 이유가 없다.
 * 주소가 크게 늘거나 이 셋이 커지면 그때 고쳐라.
 */
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import FormulaArticle from '@/components/FormulaArticle';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import type { FormulaTool } from '@/lib/formula/types';
import { textOf } from '@/lib/formula/text';
import type { FormulaLang } from '@/lib/formula/terms';
import { FORMULA_UI, formulaLocales } from '@/lib/formula/ui';
import LangPicker from '@/components/LangPicker';
import { sectionMeta } from '@/lib/formula/section';
import { localeHref, localePrefix } from '@/lib/locales';
import { formulaFaq, renderFormula } from '@/lib/formula/faq';
import { engineLabels } from '@/lib/formula/engine-labels';
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
type EngineProps = {
  slug: string; lang: FormulaLang; grad: string; textAccent: string; focusBorder: string;
  labels: Record<string, string>; units: Record<string, string>; note: string; formulaText: string;
};

export default function FormulaPage({
  tool,
  lang,
  section,
  Engine,
}: {
  tool: FormulaTool;
  lang: FormulaLang;
  section: SectionConfig;
  Engine: (p: EngineProps) => React.ReactNode;
}) {
  const ui = FORMULA_UI[lang];
  const meta = sectionMeta(section, lang);
  const prefix = localePrefix(lang);
  // /en·/zh 랜딩 페이지는 없다. 그 언어의 '홈'은 섹션 허브로 보낸다.
  const homeHref = localeHref(lang, '/');
  const text = textOf(tool, lang);
  const path = `${prefix}/${section.key}/${tool.slug}`;
  const related = relatedTools(section, tool.slug);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: meta.section, path: `${prefix}/${section.key}` },
          { name: text.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(text.title, text.long, path)} />

      <PageGlow accent={section.accent} />
      <div className={`h-1 topbar`} />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 ${section.linkHover} transition-colors font-medium shrink-0`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/${section.key}`} className={`text-sm text-slate-500 dark:text-slate-400 ${section.linkHover} transition-colors font-medium truncate`}>
            {meta.section}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/${section.key}/${tool.slug}`} available={formulaLocales(section)} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        {/* 모바일에서는 계산칸이 첫 화면에 들어와야 한다 — 아이콘·제목만 한 급씩 줄인다 */}
        <div className="text-center mb-5 sm:mb-7">
          <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg mb-3 sm:mb-4 text-3xl bg-sec-soft shadow-sm`}>
            <ToolIcon emoji={tool.icon} className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="hero-band">
            <PageHero title={text.title} desc={text.long} />
          </div>
        </div>

        <Engine
          slug={tool.slug}
          lang={lang}
          grad={section.grad}
          textAccent={section.textAccent}
          focusBorder={section.focusBorder}
          {...engineLabels(tool, lang)}
          note={text.note}
          formulaText={renderFormula(tool.formula, lang)}
        />

        <FormulaArticle tool={tool} lang={lang} section={section} />

        <Faq items={formulaFaq(tool, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="sec-h2">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link prefetch={false}
                key={r.slug}
                href={`${prefix}/${section.key}/${r.slug}`}
                className={`group hub-card ${section.hoverBorder}`}
              >
                <ToolIcon emoji={r.icon} className="hub-card-icon" />
                <span className="hub-card-body">
                  <span className={`hub-card-title ${section.hoverText}`}>
                    {textOf(r, lang).title}
                  </span>
                  <span className="hub-card-desc">{textOf(r, lang).desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-9 leading-relaxed">{meta.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
