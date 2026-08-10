import type { Metadata } from 'next';
import CalcIntlPage, { calcIntlMeta } from '@/components/calc/CalcIntlPage';
import { CALC_INTL_SLUGS } from '@/lib/calc-l10n';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/calculator/[...slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /**
   * 슬러그가 두 칸인 것이 있다 — dev/json, dev/base64처럼. [slug] 한 칸으로는
   * 그것들이 404가 되므로 catch-all로 받는다.
   */

  async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const { slug } = await params;
    return calcIntlMeta(lang, slug.join('/'));
  }

  async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    return <CalcIntlPage lang={lang} slug={slug.join('/')} />;
  }

  return { generateMetadata, Page };
}
