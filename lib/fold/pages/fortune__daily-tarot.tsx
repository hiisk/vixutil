import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TarotIntl from '@/components/fortune/TarotIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/fortune/daily-tarot/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = fortuneToolMetadata(lang, 'daily-tarot');

  function Page() {
    return (
      <>
        <JsonLd data={breadcrumbJsonLd([
          { name: 'vixutil', path: `/${lang}` },
          { name: fortuneHubCopy(lang).title, path: `/${lang}/fortune` },
          { name: fortuneToolCopy(lang, 'daily-tarot').title, path: `/${lang}/fortune/daily-tarot` },
        ])} />
        <TarotIntl mode="daily" lang={lang} />
      </>
    );
  }

  return { metadata, Page };
}
