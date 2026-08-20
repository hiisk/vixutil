import type { Metadata } from 'next';
import HolidaysHubPage from '@/components/holidays/HolidaysHubPage';
import { hubMetadata } from '@/lib/holidays/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 아홉 언어가 이 모듈 하나를 같이 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = hubMetadata(DATA_KEY[lang]);

  function Page() {
    /* 굽는 시점의 해다. 배포마다 다시 구우므로 주 단위로 따라온다 —
       사람이 보는 「다음 공휴일」은 손님 쪽에서 세니 여기서 굳어도 안 틀린다 */
    return <HolidaysHubPage lang={DATA_KEY[lang]} now={new Date().getFullYear()} />;
  }

  return { metadata, Page };
}
