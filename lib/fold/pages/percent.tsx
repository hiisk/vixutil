import type { Metadata } from 'next';
import PercentHubPage from '@/components/percent/PercentHubPage';
import { hubMetadata } from '@/lib/percent/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 아홉 언어가 이 모듈 하나를 같이 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = hubMetadata(DATA_KEY[lang]);

  function Page() {
    return <PercentHubPage lang={DATA_KEY[lang]} />;
  }

  return { metadata, Page };
}
