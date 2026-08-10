import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/color/palette/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = colorMetaIntl(lang, 'palette');

  function Page() {
    return (
      <ColorShellIntl slug="palette" lang={lang}>
        <PaletteTool lang={lang} />
      </ColorShellIntl>
    );
  }

  return { metadata, Page };
}
