import type { Metadata } from 'next';
import { GeneratorIntlHub, generatorIntlMeta } from '@/components/GeneratorIntlPage';
import type { FoldLang } from '../lang';
import type { GeneratorIntlLang } from '@/lib/generator-l10n';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/generator/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /* en은 등록부의 EN_*_OVERRIDES가 딴 모듈로 받는다 — 여기는 여덟 언어만 온다 */
  const glang = lang as GeneratorIntlLang;
  const metadata: Metadata = generatorIntlMeta(glang);

  function Page() {
    return <GeneratorIntlHub lang={glang} />;
  }

  return { metadata, Page };
}
