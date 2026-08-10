import type { Metadata } from 'next';
import TimeHubIntl from '@/components/TimeHubIntl';
import { timeHubMetaIntl } from '@/lib/time-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/time/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /* 화면은 components/TimeHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
  const metadata: Metadata = timeHubMetaIntl(lang);

  function Page() {
    return <TimeHubIntl lang={lang} />;
  }

  return { metadata, Page };
}
