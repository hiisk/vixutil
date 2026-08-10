import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/snap/face-thirds/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = newSnapMetadata(lang, 'face-thirds');

  function Page() {
    return (
      <>
        <JsonLd data={breadcrumbJsonLd([
          { name: 'vixutil', path: `/${lang}` },
          { name: newSnapHubTitle(lang), path: `/${lang}/snap` },
          { name: TOOL_TEXT[lang].tools['face-thirds'].title, path: `/${lang}/snap/face-thirds` },
        ])} />
        <MeasuredTest lang={lang} slug="face-thirds" />
      </>
    );
  }

  return { metadata, Page };
}
