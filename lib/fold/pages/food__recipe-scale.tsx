import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/food/recipe-scale/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = foodMetaIntl(lang, 'recipe-scale');

  function Page() {
    return (
      <FoodShellIntl slug="recipe-scale" lang={lang}>
        <RecipeScaleTool lang={lang} />
      </FoodShellIntl>
    );
  }

  return { metadata, Page };
}
