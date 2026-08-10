import type { Metadata } from 'next';
import TextHubIntl from '@/components/TextHubIntl';
import { textHubMetaIntl } from '@/lib/text-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/text/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /* 화면은 components/TextHubIntl.tsx 하나를 열 언어가 같이 쓴다 */
  const metadata: Metadata = textHubMetaIntl(lang);

  function Page() {
    return <TextHubIntl lang={lang} />;
  }

  return { metadata, Page };
}
