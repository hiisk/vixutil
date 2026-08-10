import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/hanja/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /* 화면은 components/HanjaHub.tsx 하나를 열 언어가 같이 쓴다 */
  const ui = HANJA_UI[lang];

  const metadata: Metadata = withCard({
    title: ui.metaTitle,
    description: ui.metaDesc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, '/hanja'), languages: hanjaAlternates() },
  });

  function Page() {
    return <HanjaHub lang={lang} />;
  }

  return { metadata, Page };
}
