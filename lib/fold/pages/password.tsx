import type { Metadata } from 'next';
import PasswordHubPage from '@/components/password/PasswordHubPage';
import { hubMetadata } from '@/lib/password/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/password/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = hubMetadata(DATA_KEY[lang]);

  function Page() {
    return <PasswordHubPage lang={DATA_KEY[lang]} />;
  }

  return { metadata, Page };
}
