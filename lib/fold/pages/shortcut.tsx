import type { Metadata } from 'next';
import ScHubPage from '@/components/shortcut/ScHubPage';
import { hubMetadata } from '@/lib/shortcut/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 허브는 아홉 언어가 이 모듈 하나를 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = hubMetadata(DATA_KEY[lang]);

  function Page() {
    return <ScHubPage lang={DATA_KEY[lang]} />;
  }

  return { metadata, Page };
}
