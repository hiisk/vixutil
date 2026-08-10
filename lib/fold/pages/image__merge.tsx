import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/image/merge/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = imageMetaIntl(lang, 'merge');

  function Page() {
    return (
      <ImageShellIntl slug="merge" lang={lang}>
        <MergeTool lang={lang} />
      </ImageShellIntl>
    );
  }

  return { metadata, Page };
}
