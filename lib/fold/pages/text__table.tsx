import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/text/table/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = textMetaIntl(lang, 'table');

  function Page() {
    return (
      <TextShellIntl slug="table" lang={lang}>
        <TableTool lang={lang} />
      </TextShellIntl>
    );
  }

  return { metadata, Page };
}
