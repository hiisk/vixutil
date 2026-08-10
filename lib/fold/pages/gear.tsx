import type { Metadata } from 'next';
import GearHubPage from '@/components/gear/GearHubPage';
import { hubMetadata } from '@/lib/gear/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 아홉 언어가 이 모듈 하나를 같이 쓴다 — 허브는 언어마다 하나인
   app/(xx)/xx/[[...path]] 캐치올이 이것을 불러 굽는다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = hubMetadata(DATA_KEY[lang]);

  function Page() {
    return <GearHubPage lang={DATA_KEY[lang]} />;
  }

  return { metadata, Page };
}
