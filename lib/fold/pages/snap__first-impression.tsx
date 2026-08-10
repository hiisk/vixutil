import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FirstImpression from '@/components/snap/FirstImpression';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/snap/first-impression/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = snapToolMetadata(lang, 'first-impression');

  function Page() {
    return (
      <>
        <JsonLd data={breadcrumbJsonLd([
          { name: 'vixutil', path: `/${lang}` },
          { name: snapHubCopy(lang).title, path: `/${lang}/snap` },
          { name: snapToolCopy(lang, 'first-impression').title, path: `/${lang}/snap/first-impression` },
        ])} />
        <FirstImpression lang={lang} />
      </>
    );
  }

  return { metadata, Page };
}
